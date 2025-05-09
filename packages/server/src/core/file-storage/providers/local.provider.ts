import { FileStorageOption, FileStorageProviderEnum, UploadedFile } from '@metad/contracts';
import multer from 'multer';
import fs from 'fs';
import moment from 'moment';
import { environment, getConfig } from '@metad/server-config';
import { Provider } from './provider';
import { basename, join, resolve } from 'path';
import { RequestContext } from '../../context';
import { v4 as uuid } from 'uuid';

const config = getConfig();

export class LocalProvider extends Provider<LocalProvider> {
	static instance: LocalProvider;
	name = FileStorageProviderEnum.LOCAL;
	tenantId = '';
	config = {
		rootPath: config.assetOptions.assetPublicPath ||
			  resolve(process.cwd(), 'apps', 'api', 'public'),
		baseUrl: environment.baseUrl + '/public'
	};

	getInstance() {
		if (!LocalProvider.instance) {
			LocalProvider.instance = new LocalProvider();
		}
		return LocalProvider.instance;
	}

	url(filePath: string) {
		if (filePath && filePath.startsWith('http')) {
			return filePath;
		}
		return filePath ? `${this.config.baseUrl}/${filePath}` : null;
	}

	path(filePath: string) {
		return filePath ? `${this.config.rootPath}/${filePath}` : null;
	}

	handler({
		dest,
		filename,
		prefix
	}: FileStorageOption): multer.StorageEngine {
		return multer.diskStorage({
			destination: (_req, file, callback) => {
				let dir;
				if (dest instanceof Function) {
					dir = dest(file);
				} else {
					dir = dest;
				}

				const tenantId = RequestContext.currentTenantId();
				const fullPath = join(
					this.config.rootPath,
					dir,
					tenantId || uuid()
				);

				fs.mkdirSync(fullPath, {
					recursive: true
				});

				callback(null, fullPath);
			},
			filename: (_req, file, callback) => {
				let fileNameString = '';
				const ext = file.originalname.split('.').pop();
				if (filename) {
					if (typeof filename === 'string') {
						fileNameString = filename;
					} else {
						fileNameString = filename(file, ext);
					}
				} else {
					if (!prefix) {
						prefix = 'file';
					}
					fileNameString = `${prefix}-${moment().unix()}-${parseInt(
						'' + Math.random() * 1000,
						10
					)}.${ext}`;
				}
				callback(null, fileNameString);
			}
		});
	}

	async getFile(file: string): Promise<Buffer> {
		return await fs.promises.readFile(this.path(file));
	}

	async deleteFile(file: string): Promise<void> {
		if (fs.existsSync(this.path(file))) {
			return await fs.promises.unlink(this.path(file));
		}
	}

	async putFile(fileContent: any, path = ''): Promise<UploadedFile> {
		return new Promise((putFileResolve, reject) => {
			const fullPath = join(this.config.rootPath, path);
			fs.writeFile(fullPath, fileContent, (err) => {
				if (err) {
					reject(err);
					return;
				}

				const stats = fs.statSync(fullPath);
				const baseName = basename(path);
				const file = {
					originalname: baseName,
					size: stats.size,
					filename: baseName,
					path: fullPath
				};
				putFileResolve(this.mapUploadedFile(file));
			});
		});
	}

	mapUploadedFile(file): UploadedFile {
		const separator = process.platform === 'win32' ? '\\' : '/';

		if (file.path) {
			file.key = file.path.replace(this.config.rootPath + separator, '');
		}

		file.url = this.url(file.key);
		return file;
	}
}
