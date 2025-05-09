import { Injectable, NestMiddleware } from '@nestjs/common';
import cls from 'cls-hooked';

import { RequestContext } from './request-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
	use(req, res, next) {
		const requestContext = new RequestContext(req, res);
		const session =
			cls.getNamespace(RequestContext.name) ||
			cls.createNamespace(RequestContext.name);

		session.run(async () => {
			session.set(RequestContext.name, requestContext);
			next();
		});
	}
}

export function runWithRequestContext(req, next: () => void) {
	const requestContext = new RequestContext(req, null);
	const session =
		cls.getNamespace(RequestContext.name) ||
		cls.createNamespace(RequestContext.name);

	session.run(async () => {
		session.set(RequestContext.name, requestContext);
		next();
	});
}