"use strict";(self.webpackChunkxpert_ai=self.webpackChunkxpert_ai||[]).push([[8622],{"./node_modules/@angular/material/fesm2022/badge.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Y:()=>MatBadgeModule});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_material_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/material/fesm2022/core.mjs"),_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/a11y.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs");let nextId=0;const badgeApps=new Set;class _MatBadgeStyleLoader{static#_=this.ɵfac=function _MatBadgeStyleLoader_Factory(t){return new(t||_MatBadgeStyleLoader)};static#_2=this.ɵcmp=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({type:_MatBadgeStyleLoader,selectors:[["ng-component"]],standalone:!0,features:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],decls:0,vars:0,template:function _MatBadgeStyleLoader_Template(rf,ctx){},styles:[".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color);color:var(--mat-badge-text-color);font-family:var(--mat-badge-text-font);font-weight:var(--mat-badge-text-weight);border-radius:var(--mat-badge-container-shape)}.cdk-high-contrast-active .mat-badge-content{outline:solid 1px;border-radius:0}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color);color:var(--mat-badge-disabled-state-text-color)}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, unset);min-height:var(--mat-badge-small-size-container-size, unset);line-height:var(--mat-badge-legacy-small-size-container-size, var(--mat-badge-small-size-container-size));padding:var(--mat-badge-small-size-container-padding);font-size:var(--mat-badge-small-size-text-size);margin:var(--mat-badge-small-size-container-offset)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, unset);min-height:var(--mat-badge-container-size, unset);line-height:var(--mat-badge-legacy-container-size, var(--mat-badge-container-size));padding:var(--mat-badge-container-padding);font-size:var(--mat-badge-text-size);margin:var(--mat-badge-container-offset)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, unset);min-height:var(--mat-badge-large-size-container-size, unset);line-height:var(--mat-badge-legacy-large-size-container-size, var(--mat-badge-large-size-container-size));padding:var(--mat-badge-large-size-container-padding);font-size:var(--mat-badge-large-size-text-size);margin:var(--mat-badge-large-size-container-offset)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset)}"],encapsulation:2,changeDetection:0})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](_MatBadgeStyleLoader,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,args:[{standalone:!0,encapsulation:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,template:"",changeDetection:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,styles:[".mat-badge{position:relative}.mat-badge.mat-badge{overflow:visible}.mat-badge-content{position:absolute;text-align:center;display:inline-block;transition:transform 200ms ease-in-out;transform:scale(0.6);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;box-sizing:border-box;pointer-events:none;background-color:var(--mat-badge-background-color);color:var(--mat-badge-text-color);font-family:var(--mat-badge-text-font);font-weight:var(--mat-badge-text-weight);border-radius:var(--mat-badge-container-shape)}.cdk-high-contrast-active .mat-badge-content{outline:solid 1px;border-radius:0}.mat-badge-above .mat-badge-content{bottom:100%}.mat-badge-below .mat-badge-content{top:100%}.mat-badge-before .mat-badge-content{right:100%}[dir=rtl] .mat-badge-before .mat-badge-content{right:auto;left:100%}.mat-badge-after .mat-badge-content{left:100%}[dir=rtl] .mat-badge-after .mat-badge-content{left:auto;right:100%}.mat-badge-disabled .mat-badge-content{background-color:var(--mat-badge-disabled-state-background-color);color:var(--mat-badge-disabled-state-text-color)}.mat-badge-hidden .mat-badge-content{display:none}.ng-animate-disabled .mat-badge-content,.mat-badge-content._mat-animation-noopable{transition:none}.mat-badge-content.mat-badge-active{transform:none}.mat-badge-small .mat-badge-content{width:var(--mat-badge-legacy-small-size-container-size, unset);height:var(--mat-badge-legacy-small-size-container-size, unset);min-width:var(--mat-badge-small-size-container-size, unset);min-height:var(--mat-badge-small-size-container-size, unset);line-height:var(--mat-badge-legacy-small-size-container-size, var(--mat-badge-small-size-container-size));padding:var(--mat-badge-small-size-container-padding);font-size:var(--mat-badge-small-size-text-size);margin:var(--mat-badge-small-size-container-offset)}.mat-badge-small.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-small-size-container-overlap-offset)}.mat-badge-medium .mat-badge-content{width:var(--mat-badge-legacy-container-size, unset);height:var(--mat-badge-legacy-container-size, unset);min-width:var(--mat-badge-container-size, unset);min-height:var(--mat-badge-container-size, unset);line-height:var(--mat-badge-legacy-container-size, var(--mat-badge-container-size));padding:var(--mat-badge-container-padding);font-size:var(--mat-badge-text-size);margin:var(--mat-badge-container-offset)}.mat-badge-medium.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-container-overlap-offset)}.mat-badge-large .mat-badge-content{width:var(--mat-badge-legacy-large-size-container-size, unset);height:var(--mat-badge-legacy-large-size-container-size, unset);min-width:var(--mat-badge-large-size-container-size, unset);min-height:var(--mat-badge-large-size-container-size, unset);line-height:var(--mat-badge-legacy-large-size-container-size, var(--mat-badge-large-size-container-size));padding:var(--mat-badge-large-size-container-padding);font-size:var(--mat-badge-large-size-text-size);margin:var(--mat-badge-large-size-container-offset)}.mat-badge-large.mat-badge-overlap .mat-badge-content{margin:var(--mat-badge-large-size-container-overlap-offset)}"]}]}],null,null);class MatBadge{get color(){return this._color}set color(value){this._setColor(value),this._color=value}get content(){return this._content}set content(newContent){this._updateRenderedContent(newContent)}get description(){return this._description}set description(newDescription){this._updateDescription(newDescription)}constructor(_ngZone,_elementRef,_ariaDescriber,_renderer,_animationMode){this._ngZone=_ngZone,this._elementRef=_elementRef,this._ariaDescriber=_ariaDescriber,this._renderer=_renderer,this._animationMode=_animationMode,this._color="primary",this.overlap=!0,this.position="above after",this.size="medium",this._id=nextId++,this._isInitialized=!1,this._interactivityChecker=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.Z7),this._document=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_common__WEBPACK_IMPORTED_MODULE_2__.DOCUMENT);const appRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ApplicationRef);if(!badgeApps.has(appRef)){badgeApps.add(appRef);const componentRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.createComponent)(_MatBadgeStyleLoader,{environmentInjector:(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.EnvironmentInjector)});appRef.onDestroy((()=>{badgeApps.delete(appRef),0===badgeApps.size&&componentRef.destroy()}))}if("undefined"==typeof ngDevMode||ngDevMode){const nativeElement=_elementRef.nativeElement;if(nativeElement.nodeType!==nativeElement.ELEMENT_NODE)throw Error("matBadge must be attached to an element node.");const matIconTagName="mat-icon";nativeElement.tagName.toLowerCase()===matIconTagName&&"true"===nativeElement.getAttribute("aria-hidden")&&console.warn(`Detected a matBadge on an "aria-hidden" "<mat-icon>". Consider setting aria-hidden="false" in order to surface the information assistive technology.\n${nativeElement.outerHTML}`)}}isAbove(){return-1===this.position.indexOf("below")}isAfter(){return-1===this.position.indexOf("before")}getBadgeElement(){return this._badgeElement}ngOnInit(){this._clearExistingBadges(),this.content&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement(),this._updateRenderedContent(this.content)),this._isInitialized=!0}ngOnDestroy(){this._renderer.destroyNode&&(this._renderer.destroyNode(this._badgeElement),this._inlineBadgeDescription?.remove()),this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description)}_isHostInteractive(){return this._interactivityChecker.isFocusable(this._elementRef.nativeElement,{ignoreVisibility:!0})}_createBadgeElement(){const badgeElement=this._renderer.createElement("span");return badgeElement.setAttribute("id",`mat-badge-content-${this._id}`),badgeElement.setAttribute("aria-hidden","true"),badgeElement.classList.add("mat-badge-content"),"NoopAnimations"===this._animationMode&&badgeElement.classList.add("_mat-animation-noopable"),this._elementRef.nativeElement.appendChild(badgeElement),"function"==typeof requestAnimationFrame&&"NoopAnimations"!==this._animationMode?this._ngZone.runOutsideAngular((()=>{requestAnimationFrame((()=>{badgeElement.classList.add("mat-badge-active")}))})):badgeElement.classList.add("mat-badge-active"),badgeElement}_updateRenderedContent(newContent){const newContentNormalized=`${newContent??""}`.trim();this._isInitialized&&newContentNormalized&&!this._badgeElement&&(this._badgeElement=this._createBadgeElement()),this._badgeElement&&(this._badgeElement.textContent=newContentNormalized),this._content=newContentNormalized}_updateDescription(newDescription){this._ariaDescriber.removeDescription(this._elementRef.nativeElement,this.description),newDescription&&!this._isHostInteractive()||this._removeInlineDescription(),this._description=newDescription,this._isHostInteractive()?this._ariaDescriber.describe(this._elementRef.nativeElement,newDescription):this._updateInlineDescription()}_updateInlineDescription(){this._inlineBadgeDescription||(this._inlineBadgeDescription=this._document.createElement("span"),this._inlineBadgeDescription.classList.add("cdk-visually-hidden")),this._inlineBadgeDescription.textContent=this.description,this._badgeElement?.appendChild(this._inlineBadgeDescription)}_removeInlineDescription(){this._inlineBadgeDescription?.remove(),this._inlineBadgeDescription=void 0}_setColor(colorPalette){const classList=this._elementRef.nativeElement.classList;classList.remove(`mat-badge-${this._color}`),colorPalette&&classList.add(`mat-badge-${colorPalette}`)}_clearExistingBadges(){const badges=this._elementRef.nativeElement.querySelectorAll(":scope > .mat-badge-content");for(const badgeElement of Array.from(badges))badgeElement!==this._badgeElement&&badgeElement.remove()}static#_=this.ɵfac=function MatBadge_Factory(t){return new(t||MatBadge)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.vr),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE,8))};static#_2=this.ɵdir=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({type:MatBadge,selectors:[["","matBadge",""]],hostAttrs:[1,"mat-badge"],hostVars:20,hostBindings:function MatBadge_HostBindings(rf,ctx){2&rf&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-badge-overlap",ctx.overlap)("mat-badge-above",ctx.isAbove())("mat-badge-below",!ctx.isAbove())("mat-badge-before",!ctx.isAfter())("mat-badge-after",ctx.isAfter())("mat-badge-small","small"===ctx.size)("mat-badge-medium","medium"===ctx.size)("mat-badge-large","large"===ctx.size)("mat-badge-hidden",ctx.hidden||!ctx.content)("mat-badge-disabled",ctx.disabled)},inputs:{color:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].None,"matBadgeColor","color"],overlap:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform,"matBadgeOverlap","overlap",_angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute],disabled:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform,"matBadgeDisabled","disabled",_angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute],position:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].None,"matBadgePosition","position"],content:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].None,"matBadge","content"],description:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].None,"matBadgeDescription","description"],size:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].None,"matBadgeSize","size"],hidden:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform,"matBadgeHidden","hidden",_angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute]},standalone:!0,features:[_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputTransformsFeature"]]})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatBadge,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,args:[{selector:"[matBadge]",host:{class:"mat-badge","[class.mat-badge-overlap]":"overlap","[class.mat-badge-above]":"isAbove()","[class.mat-badge-below]":"!isAbove()","[class.mat-badge-before]":"!isAfter()","[class.mat-badge-after]":"isAfter()","[class.mat-badge-small]":'size === "small"',"[class.mat-badge-medium]":'size === "medium"',"[class.mat-badge-large]":'size === "large"',"[class.mat-badge-hidden]":"hidden || !content","[class.mat-badge-disabled]":"disabled"},standalone:!0}]}],(()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone},{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef},{type:_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.vr},{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2},{type:void 0,decorators:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional},{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,args:[_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]}]}]),{color:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matBadgeColor"]}],overlap:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{alias:"matBadgeOverlap",transform:_angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute}]}],disabled:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{alias:"matBadgeDisabled",transform:_angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute}]}],position:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matBadgePosition"]}],content:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matBadge"]}],description:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matBadgeDescription"]}],size:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matBadgeSize"]}],hidden:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{alias:"matBadgeHidden",transform:_angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute}]}]});class MatBadgeModule{static#_=this.ɵfac=function MatBadgeModule_Factory(t){return new(t||MatBadgeModule)};static#_2=this.ɵmod=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({type:MatBadgeModule,imports:[_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.Pd,_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.yE,MatBadge,_MatBadgeStyleLoader],exports:[MatBadge,_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.yE]});static#_3=this.ɵinj=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({imports:[_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.Pd,_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.yE,_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.yE]})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatBadgeModule,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,args:[{imports:[_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__.Pd,_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.yE,MatBadge,_MatBadgeStyleLoader],exports:[MatBadge,_angular_material_core__WEBPACK_IMPORTED_MODULE_3__.yE]}]}],null,null)},"./node_modules/lodash-es/_baseFlatten.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>_baseFlatten});var _arrayPush=__webpack_require__("./node_modules/lodash-es/_arrayPush.js"),_Symbol=__webpack_require__("./node_modules/lodash-es/_Symbol.js"),isArguments=__webpack_require__("./node_modules/lodash-es/isArguments.js"),isArray=__webpack_require__("./node_modules/lodash-es/isArray.js"),spreadableSymbol=_Symbol.A?_Symbol.A.isConcatSpreadable:void 0;const _isFlattenable=function isFlattenable(value){return(0,isArray.A)(value)||(0,isArguments.A)(value)||!!(spreadableSymbol&&value&&value[spreadableSymbol])};const _baseFlatten=function baseFlatten(array,depth,predicate,isStrict,result){var index=-1,length=array.length;for(predicate||(predicate=_isFlattenable),result||(result=[]);++index<length;){var value=array[index];depth>0&&predicate(value)?depth>1?baseFlatten(value,depth-1,predicate,isStrict,result):(0,_arrayPush.A)(result,value):isStrict||(result[result.length]=value)}return result}},"./node_modules/lodash-es/cloneDeep.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>lodash_es_cloneDeep});var _Stack=__webpack_require__("./node_modules/lodash-es/_Stack.js");const _arrayEach=function arrayEach(array,iteratee){for(var index=-1,length=null==array?0:array.length;++index<length&&!1!==iteratee(array[index],index,array););return array};var _assignValue=__webpack_require__("./node_modules/lodash-es/_assignValue.js"),_copyObject=__webpack_require__("./node_modules/lodash-es/_copyObject.js"),keys=__webpack_require__("./node_modules/lodash-es/keys.js");const _baseAssign=function baseAssign(object,source){return object&&(0,_copyObject.A)(source,(0,keys.A)(source),object)};var keysIn=__webpack_require__("./node_modules/lodash-es/keysIn.js");const _baseAssignIn=function baseAssignIn(object,source){return object&&(0,_copyObject.A)(source,(0,keysIn.A)(source),object)};var _cloneBuffer=__webpack_require__("./node_modules/lodash-es/_cloneBuffer.js"),_copyArray=__webpack_require__("./node_modules/lodash-es/_copyArray.js"),_getSymbols=__webpack_require__("./node_modules/lodash-es/_getSymbols.js");const _copySymbols=function copySymbols(source,object){return(0,_copyObject.A)(source,(0,_getSymbols.A)(source),object)};var _arrayPush=__webpack_require__("./node_modules/lodash-es/_arrayPush.js"),_getPrototype=__webpack_require__("./node_modules/lodash-es/_getPrototype.js"),stubArray=__webpack_require__("./node_modules/lodash-es/stubArray.js");const _getSymbolsIn=Object.getOwnPropertySymbols?function(object){for(var result=[];object;)(0,_arrayPush.A)(result,(0,_getSymbols.A)(object)),object=(0,_getPrototype.A)(object);return result}:stubArray.A;const _copySymbolsIn=function copySymbolsIn(source,object){return(0,_copyObject.A)(source,_getSymbolsIn(source),object)};var _getAllKeys=__webpack_require__("./node_modules/lodash-es/_getAllKeys.js"),_baseGetAllKeys=__webpack_require__("./node_modules/lodash-es/_baseGetAllKeys.js");const _getAllKeysIn=function getAllKeysIn(object){return(0,_baseGetAllKeys.A)(object,keysIn.A,_getSymbolsIn)};var _getTag=__webpack_require__("./node_modules/lodash-es/_getTag.js"),_initCloneArray_hasOwnProperty=Object.prototype.hasOwnProperty;const _initCloneArray=function initCloneArray(array){var length=array.length,result=new array.constructor(length);return length&&"string"==typeof array[0]&&_initCloneArray_hasOwnProperty.call(array,"index")&&(result.index=array.index,result.input=array.input),result};var _cloneArrayBuffer=__webpack_require__("./node_modules/lodash-es/_cloneArrayBuffer.js");const _cloneDataView=function cloneDataView(dataView,isDeep){var buffer=isDeep?(0,_cloneArrayBuffer.A)(dataView.buffer):dataView.buffer;return new dataView.constructor(buffer,dataView.byteOffset,dataView.byteLength)};var reFlags=/\w*$/;const _cloneRegExp=function cloneRegExp(regexp){var result=new regexp.constructor(regexp.source,reFlags.exec(regexp));return result.lastIndex=regexp.lastIndex,result};var _Symbol=__webpack_require__("./node_modules/lodash-es/_Symbol.js"),symbolProto=_Symbol.A?_Symbol.A.prototype:void 0,symbolValueOf=symbolProto?symbolProto.valueOf:void 0;const _cloneSymbol=function cloneSymbol(symbol){return symbolValueOf?Object(symbolValueOf.call(symbol)):{}};var _cloneTypedArray=__webpack_require__("./node_modules/lodash-es/_cloneTypedArray.js");const _initCloneByTag=function initCloneByTag(object,tag,isDeep){var Ctor=object.constructor;switch(tag){case"[object ArrayBuffer]":return(0,_cloneArrayBuffer.A)(object);case"[object Boolean]":case"[object Date]":return new Ctor(+object);case"[object DataView]":return _cloneDataView(object,isDeep);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return(0,_cloneTypedArray.A)(object,isDeep);case"[object Map]":case"[object Set]":return new Ctor;case"[object Number]":case"[object String]":return new Ctor(object);case"[object RegExp]":return _cloneRegExp(object);case"[object Symbol]":return _cloneSymbol(object)}};var _initCloneObject=__webpack_require__("./node_modules/lodash-es/_initCloneObject.js"),isArray=__webpack_require__("./node_modules/lodash-es/isArray.js"),isBuffer=__webpack_require__("./node_modules/lodash-es/isBuffer.js"),isObjectLike=__webpack_require__("./node_modules/lodash-es/isObjectLike.js");const _baseIsMap=function baseIsMap(value){return(0,isObjectLike.A)(value)&&"[object Map]"==(0,_getTag.A)(value)};var _baseUnary=__webpack_require__("./node_modules/lodash-es/_baseUnary.js"),_nodeUtil=__webpack_require__("./node_modules/lodash-es/_nodeUtil.js"),nodeIsMap=_nodeUtil.A&&_nodeUtil.A.isMap;const lodash_es_isMap=nodeIsMap?(0,_baseUnary.A)(nodeIsMap):_baseIsMap;var isObject=__webpack_require__("./node_modules/lodash-es/isObject.js");const _baseIsSet=function baseIsSet(value){return(0,isObjectLike.A)(value)&&"[object Set]"==(0,_getTag.A)(value)};var nodeIsSet=_nodeUtil.A&&_nodeUtil.A.isSet;const lodash_es_isSet=nodeIsSet?(0,_baseUnary.A)(nodeIsSet):_baseIsSet;var cloneableTags={};cloneableTags["[object Arguments]"]=cloneableTags["[object Array]"]=cloneableTags["[object ArrayBuffer]"]=cloneableTags["[object DataView]"]=cloneableTags["[object Boolean]"]=cloneableTags["[object Date]"]=cloneableTags["[object Float32Array]"]=cloneableTags["[object Float64Array]"]=cloneableTags["[object Int8Array]"]=cloneableTags["[object Int16Array]"]=cloneableTags["[object Int32Array]"]=cloneableTags["[object Map]"]=cloneableTags["[object Number]"]=cloneableTags["[object Object]"]=cloneableTags["[object RegExp]"]=cloneableTags["[object Set]"]=cloneableTags["[object String]"]=cloneableTags["[object Symbol]"]=cloneableTags["[object Uint8Array]"]=cloneableTags["[object Uint8ClampedArray]"]=cloneableTags["[object Uint16Array]"]=cloneableTags["[object Uint32Array]"]=!0,cloneableTags["[object Error]"]=cloneableTags["[object Function]"]=cloneableTags["[object WeakMap]"]=!1;const _baseClone=function baseClone(value,bitmask,customizer,key,object,stack){var result,isDeep=1&bitmask,isFlat=2&bitmask,isFull=4&bitmask;if(customizer&&(result=object?customizer(value,key,object,stack):customizer(value)),void 0!==result)return result;if(!(0,isObject.A)(value))return value;var isArr=(0,isArray.A)(value);if(isArr){if(result=_initCloneArray(value),!isDeep)return(0,_copyArray.A)(value,result)}else{var tag=(0,_getTag.A)(value),isFunc="[object Function]"==tag||"[object GeneratorFunction]"==tag;if((0,isBuffer.A)(value))return(0,_cloneBuffer.A)(value,isDeep);if("[object Object]"==tag||"[object Arguments]"==tag||isFunc&&!object){if(result=isFlat||isFunc?{}:(0,_initCloneObject.A)(value),!isDeep)return isFlat?_copySymbolsIn(value,_baseAssignIn(result,value)):_copySymbols(value,_baseAssign(result,value))}else{if(!cloneableTags[tag])return object?value:{};result=_initCloneByTag(value,tag,isDeep)}}stack||(stack=new _Stack.A);var stacked=stack.get(value);if(stacked)return stacked;stack.set(value,result),lodash_es_isSet(value)?value.forEach((function(subValue){result.add(baseClone(subValue,bitmask,customizer,subValue,value,stack))})):lodash_es_isMap(value)&&value.forEach((function(subValue,key){result.set(key,baseClone(subValue,bitmask,customizer,key,value,stack))}));var keysFunc=isFull?isFlat?_getAllKeysIn:_getAllKeys.A:isFlat?keysIn.A:keys.A,props=isArr?void 0:keysFunc(value);return _arrayEach(props||value,(function(subValue,key){props&&(subValue=value[key=subValue]),(0,_assignValue.A)(result,key,baseClone(subValue,bitmask,customizer,key,value,stack))})),result};const lodash_es_cloneDeep=function cloneDeep(value){return _baseClone(value,5)}},"./node_modules/lodash-es/hasIn.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>lodash_es_hasIn});const _baseHasIn=function baseHasIn(object,key){return null!=object&&key in Object(object)};var _castPath=__webpack_require__("./node_modules/lodash-es/_castPath.js"),isArguments=__webpack_require__("./node_modules/lodash-es/isArguments.js"),isArray=__webpack_require__("./node_modules/lodash-es/isArray.js"),_isIndex=__webpack_require__("./node_modules/lodash-es/_isIndex.js"),isLength=__webpack_require__("./node_modules/lodash-es/isLength.js"),_toKey=__webpack_require__("./node_modules/lodash-es/_toKey.js");const _hasPath=function hasPath(object,path,hasFunc){for(var index=-1,length=(path=(0,_castPath.A)(path,object)).length,result=!1;++index<length;){var key=(0,_toKey.A)(path[index]);if(!(result=null!=object&&hasFunc(object,key)))break;object=object[key]}return result||++index!=length?result:!!(length=null==object?0:object.length)&&(0,isLength.A)(length)&&(0,_isIndex.A)(key,length)&&((0,isArray.A)(object)||(0,isArguments.A)(object))};const lodash_es_hasIn=function hasIn(object,path){return null!=object&&_hasPath(object,path,_baseHasIn)}},"./node_modules/lodash-es/pick.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>lodash_es_pick});var _baseGet=__webpack_require__("./node_modules/lodash-es/_baseGet.js"),_assignValue=__webpack_require__("./node_modules/lodash-es/_assignValue.js"),_castPath=__webpack_require__("./node_modules/lodash-es/_castPath.js"),_isIndex=__webpack_require__("./node_modules/lodash-es/_isIndex.js"),isObject=__webpack_require__("./node_modules/lodash-es/isObject.js"),_toKey=__webpack_require__("./node_modules/lodash-es/_toKey.js");const _baseSet=function baseSet(object,path,value,customizer){if(!(0,isObject.A)(object))return object;for(var index=-1,length=(path=(0,_castPath.A)(path,object)).length,lastIndex=length-1,nested=object;null!=nested&&++index<length;){var key=(0,_toKey.A)(path[index]),newValue=value;if("__proto__"===key||"constructor"===key||"prototype"===key)return object;if(index!=lastIndex){var objValue=nested[key];void 0===(newValue=customizer?customizer(objValue,key,nested):void 0)&&(newValue=(0,isObject.A)(objValue)?objValue:(0,_isIndex.A)(path[index+1])?[]:{})}(0,_assignValue.A)(nested,key,newValue),nested=nested[key]}return object};const _basePickBy=function basePickBy(object,paths,predicate){for(var index=-1,length=paths.length,result={};++index<length;){var path=paths[index],value=(0,_baseGet.A)(object,path);predicate(value,path)&&_baseSet(result,(0,_castPath.A)(path,object),value)}return result};var hasIn=__webpack_require__("./node_modules/lodash-es/hasIn.js");const _basePick=function basePick(object,paths){return _basePickBy(object,paths,(function(value,path){return(0,hasIn.A)(object,path)}))};var _baseFlatten=__webpack_require__("./node_modules/lodash-es/_baseFlatten.js");const lodash_es_flatten=function flatten(array){return(null==array?0:array.length)?(0,_baseFlatten.A)(array,1):[]};var _overRest=__webpack_require__("./node_modules/lodash-es/_overRest.js"),_setToString=__webpack_require__("./node_modules/lodash-es/_setToString.js");const lodash_es_pick=function flatRest(func){return(0,_setToString.A)((0,_overRest.A)(func,void 0,lodash_es_flatten),func+"")}((function(object,paths){return null==object?{}:_basePick(object,paths)}))},"./packages/angular/entity/property-select/property-select.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DimensionWithHierarchy:()=>DimensionWithHierarchy,Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_angular_common_http__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_metad_ocap_angular_mock__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/angular/mock/provider.ts"),_metad_ocap_angular_mock__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/angular/mock/translate.ts"),_metad_ocap_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/core/src/index.ts"),_property_select_property_select_component__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/angular/entity/property-select/property-select.component.ts"),_angular_forms__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),_types__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./packages/angular/entity/types.ts");const ENTITY_TYPE={name:"Sales",visible:!0,properties:{A:{name:"A",caption:"Field A",role:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_1__.H$f.dimension,hierarchies:[{name:"[A]",caption:"H-A",role:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_1__.H$f.hierarchy,levels:[{name:"[A].[All]",caption:"[A] Level 00",role:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_1__.H$f.level,levelNumber:0},{name:"[A].[Description]",caption:"[A] Level 01",role:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_1__.H$f.level,levelNumber:1,properties:[{name:"[TEXTSH]",caption:"短文本"},{name:"[TEXTMD]",caption:"中文本"},{name:"[TEXTLG]",caption:"长文本"}]}]}]},B:{name:"B",caption:"Field B",role:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_1__.H$f.dimension},C:{name:"C",caption:"Field C",role:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_1__.H$f.measure},D:{name:"D",caption:"Field D",role:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_1__.H$f.measure,calculationType:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_1__.ASJ.Calculated,formula:"C / 100"}}},__WEBPACK_DEFAULT_EXPORT__={title:"Entity/PropertySelect",component:_property_select_property_select_component__WEBPACK_IMPORTED_MODULE_2__.t,excludeStories:/.*Data$/,tags:["autodocs"],decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__.provideAnimations)(),(0,_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.$R)(),(0,_metad_ocap_angular_mock__WEBPACK_IMPORTED_MODULE_5__.p)(),(0,_metad_ocap_angular_mock__WEBPACK_IMPORTED_MODULE_6__.En)()]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({declarations:[],imports:[_angular_forms__WEBPACK_IMPORTED_MODULE_7__.YN,_property_select_property_select_component__WEBPACK_IMPORTED_MODULE_2__.t]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>`<div style="margin: 3em">${story}</div>`))],render:args=>({props:{...args},template:`<ngm-property-select [(ngModel)]="inputValue" ${(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.argsToTemplate)(args)}></ngm-property-select>`})},Primary={args:{label:"Property Select",dataSettings:{dataSource:"key_sales",entitySet:"SalesOrder"},entityType:ENTITY_TYPE,capacities:[_types__WEBPACK_IMPORTED_MODULE_8__.w.Dimension,_types__WEBPACK_IMPORTED_MODULE_8__.w.Measure,_types__WEBPACK_IMPORTED_MODULE_8__.w.Parameter],inputValue:{dimension:"A",hierarchy:"[A]"}}},DimensionWithHierarchy={args:{label:"Property Select",dataSettings:{dataSource:"key_sales",entitySet:"SalesOrder"},entityType:ENTITY_TYPE,capacities:[_types__WEBPACK_IMPORTED_MODULE_8__.w.Dimension,_types__WEBPACK_IMPORTED_MODULE_8__.w.Measure,_types__WEBPACK_IMPORTED_MODULE_8__.w.Parameter],inputValue:{dimension:"[Customers]",hierarchy:"[Customers]",level:"[Customers].[Country]"}}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Property Select',\n    dataSettings: {\n      dataSource: 'key_sales',\n      entitySet: 'SalesOrder'\n    },\n    entityType: ENTITY_TYPE,\n    capacities: [PropertyCapacity.Dimension, PropertyCapacity.Measure, PropertyCapacity.Parameter],\n    inputValue: {\n      dimension: 'A',\n      hierarchy: '[A]'\n    }\n  }\n}",...Primary.parameters?.docs?.source}}},DimensionWithHierarchy.parameters={...DimensionWithHierarchy.parameters,docs:{...DimensionWithHierarchy.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Property Select',\n    dataSettings: {\n      dataSource: 'key_sales',\n      entitySet: 'SalesOrder'\n    },\n    entityType: ENTITY_TYPE,\n    capacities: [PropertyCapacity.Dimension, PropertyCapacity.Measure, PropertyCapacity.Parameter],\n    inputValue: {\n      dimension: '[Customers]',\n      hierarchy: '[Customers]',\n      level: '[Customers].[Country]'\n    }\n  }\n}",...DimensionWithHierarchy.parameters?.docs?.source}}};const __namedExportsOrder=["Primary","DimensionWithHierarchy"]}}]);