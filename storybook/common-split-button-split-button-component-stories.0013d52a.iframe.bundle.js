(self.webpackChunkxpert_ai=self.webpackChunkxpert_ai||[]).push([[9234],{"./packages/angular/common/split-button/split-button.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,".ngm-split-button__main {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n\n.ngm-split-button__more {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  min-width: 40px;\n  padding: 0;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./packages/angular/core/core.module.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{T:()=>OcapCoreModule,s:()=>provideOcapCore});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_core_service__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/angular/core/core.service.ts"),_directives__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/angular/core/directives/displayDensity.ts"),_directives__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./packages/angular/core/directives/appearance.ts"),_directives__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/angular/core/directives/button-group.directive.ts"),_services__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/angular/core/services/core.service.ts");let OcapCoreModule=class OcapCoreModule{};function provideOcapCore(){return[_core_service__WEBPACK_IMPORTED_MODULE_5__.g,_services__WEBPACK_IMPORTED_MODULE_6__.s]}OcapCoreModule=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({imports:[_directives__WEBPACK_IMPORTED_MODULE_2__.sP,_directives__WEBPACK_IMPORTED_MODULE_3__.A,_directives__WEBPACK_IMPORTED_MODULE_4__.R],exports:[_directives__WEBPACK_IMPORTED_MODULE_2__.sP,_directives__WEBPACK_IMPORTED_MODULE_3__.A,_directives__WEBPACK_IMPORTED_MODULE_4__.R],declarations:[],providers:[]})],OcapCoreModule)},"./packages/angular/core/core.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{g:()=>NgmDSCoreService});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),src=__webpack_require__("./packages/core/src/index.ts"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),merge=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/merge.js"),empty=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/empty.js"),types=__webpack_require__("./packages/angular/core/types.ts");let NgmAgentService=class NgmAgentService{constructor(agents){this.agents=agents,this.error$=new Subject.B,this._error$=(0,merge.h)(...this.agents.map((agent=>agent.selectError())))}selectLocalAgentStatus(){const localAgent=this.agents.find((agent=>agent.type===src.Eoi.Local));if(!localAgent)throw new Error("Can't found Local Agent config");return localAgent?.selectStatus()??empty.w}error(err){this.error$.next(err)}selectError(){return this._error$}static#_=this.ctorParameters=()=>[{type:Array,decorators:[{type:core.Inject,args:[types.s2]}]}]};NgmAgentService=(0,tslib_es6.Cg)([(0,core.Injectable)(),(0,tslib_es6.Sn)("design:paramtypes",[Array])],NgmAgentService);let NgmDSCacheService=class NgmDSCacheService extends src.FMq{constructor(){super()}static#_=this.ctorParameters=()=>[]};NgmDSCacheService=(0,tslib_es6.Cg)([(0,core.Injectable)(),(0,tslib_es6.Sn)("design:paramtypes",[])],NgmDSCacheService);let NgmDSCoreService=class NgmDSCoreService extends src._R7{constructor(agents,models,dataSourceFactory,cacheService){super(agents,models,dataSourceFactory,cacheService),this.agents=agents,this.models=models,this.dataSourceFactory=dataSourceFactory}ngOnDestroy(){super.onDestroy()}static#_=this.ctorParameters=()=>[{type:Array,decorators:[{type:core.Inject,args:[types.s2]}]},{type:Array,decorators:[{type:core.Optional},{type:core.Inject,args:[types._l]}]},{type:Array,decorators:[{type:core.Optional},{type:core.Inject,args:[types.ox]}]},{type:NgmDSCacheService,decorators:[{type:core.Optional}]}]};NgmDSCoreService=(0,tslib_es6.Cg)([(0,core.Injectable)(),(0,tslib_es6.Sn)("design:paramtypes",[Array,Array,Array,NgmDSCacheService])],NgmDSCoreService)},"./packages/angular/core/directives/appearance.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>AppearanceDirective});var tslib__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/coercion.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_material_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/material/fesm2022/core.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js");const _NgmAppearanceBase=(0,_angular_material_core__WEBPACK_IMPORTED_MODULE_0__.Zc)(class{constructor(_elementRef){this._elementRef=_elementRef}});let AppearanceDirective=class AppearanceDirective extends _NgmAppearanceBase{get outline(){return"outline"===this.ngmAppearance}set outline(value){(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.he)(value)&&(this.ngmAppearance="outline")}get hero(){return"hero"===this.ngmAppearance}set hero(value){(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.he)(value)&&(this.ngmAppearance="hero")}get acrylic(){return"acrylic"===this.ngmAppearance}set acrylic(value){(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.he)(value)&&(this.ngmAppearance="acrylic")}get opacity(){return"opacity"===this.ngmAppearance}set opacity(value){(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.he)(value)&&(this.ngmAppearance="opacity")}get dashed(){return"dashed"===this.ngmAppearance}set dashed(value){(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.he)(value)&&(this.ngmAppearance="dashed")}get danger(){return"danger"===this.ngmAppearance}set danger(value){(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__.he)(value)&&(this.ngmAppearance="danger")}constructor(elementRef){super(elementRef),this.ngmAppearance="filled",this._onFocus=new rxjs__WEBPACK_IMPORTED_MODULE_2__.B,this._hasFocus=!1}focus(){this._hasFocus||(this._elementRef.nativeElement.focus(),this._onFocus.next({chip:this})),this._hasFocus=!0}getLabel(){throw new Error("Method not implemented.")}static#_=this.ctorParameters=()=>[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef}];static#_2=this.propDecorators={ngmAppearance:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input}],outline:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input},{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.HostBinding,args:["class.ngm-appearance-outline"]}],hero:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input},{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.HostBinding,args:["class.ngm-appearance-hero"]}],acrylic:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input},{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.HostBinding,args:["class.ngm-appearance-acrylic"]}],opacity:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input},{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.HostBinding,args:["class.ngm-appearance-opacity"]}],dashed:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input},{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.HostBinding,args:["class.ngm-appearance-dashed"]}],danger:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.Input},{type:_angular_core__WEBPACK_IMPORTED_MODULE_3__.HostBinding,args:["class.ngm-appearance-danger"]}]}};AppearanceDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Directive)({standalone:!0,selector:"[ngmAppearance]",inputs:["color"],host:{"(focus)":"focus()"}}),(0,tslib__WEBPACK_IMPORTED_MODULE_4__.Sn)("design:paramtypes",[_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef])],AppearanceDirective)},"./packages/angular/core/directives/button-group.directive.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{R:()=>ButtonGroupDirective});var tslib__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let ButtonGroupDirective=class ButtonGroupDirective{};ButtonGroupDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_0__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive)({standalone:!0,selector:"[ngmButtonGroup]",host:{class:"ngm-button-group"}})],ButtonGroupDirective)},"./packages/angular/core/directives/displayDensity.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{WG:()=>NgmDensityDirective,X4:()=>DisplayDensity,sP:()=>DensityDirective});var DisplayDensity,tslib__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");!function(DisplayDensity){DisplayDensity.comfortable="comfortable",DisplayDensity.cosy="cosy",DisplayDensity.compact="compact"}(DisplayDensity||(DisplayDensity={}));let DensityDirective=class DensityDirective{get densityCosy(){return this.displayDensity===DisplayDensity.comfortable}get densityCompact(){return this.displayDensity===DisplayDensity.compact}get densityComfortable(){return this.displayDensity===DisplayDensity.cosy}static#_=this.propDecorators={displayDensity:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],densityCosy:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostBinding,args:["class.ngm-density__comfortable"]}],densityCompact:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostBinding,args:["class.ngm-density__compact"]}],densityComfortable:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostBinding,args:["class.ngm-density__cosy"]}]}};DensityDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({standalone:!0,selector:"[displayDensity]"})],DensityDirective);let NgmDensityDirective=class NgmDensityDirective{constructor(){this.ngmDensity=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(null,{alias:"ngm-density"}),this.small=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(!1,{transform:_angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute}),this.large=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.input)(!1,{transform:_angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute}),this.cosy=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.computed)((()=>!this.ngmDensity()&&!this.small()&&!this.large()))}static#_=this.propDecorators={ngmDensity:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"ngm-density",required:!1,transform:void 0}]}],small:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"small",required:!1,transform:void 0}]}],large:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:[{isSignal:!0,alias:"large",required:!1,transform:void 0}]}]}};NgmDensityDirective=(0,tslib__WEBPACK_IMPORTED_MODULE_1__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({standalone:!0,selector:"[ngmDensity],[ngm-density]",host:{"[class.ngm-density__cosy]":"cosy()","[class.ngm-density__compact]":"small()","[class.small]":"small()","[class.ngm-density__comfortable]":"large()","[class.large]":"large()","[class]":"ngmDensity()"}})],NgmDensityDirective)},"./packages/angular/core/models/date-function.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c5:()=>NGM_DATE_VARIABLES,iI:()=>DateVariableEnum});var _angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/core/src/index.ts"),date_fns__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/date-fns/subDays.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/date-fns/startOfWeek.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/date-fns/startOfMonth.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/date-fns/subMonths.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/date-fns/endOfMonth.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/date-fns/startOfQuarter.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/date-fns/endOfWeek.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/date-fns/endOfQuarter.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/date-fns/startOfYear.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/date-fns/endOfYear.mjs"),date_fns__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/date-fns/subYears.mjs");const NGM_DATE_VARIABLES=new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken("Date Variables",{providedIn:"root",factory:function NX_DATE_VARIABLES_FACTORY(){return[{id:DateVariableEnum.SYSTEMTIME,name:"系统时间",deps:[],useFactory:()=>new Date},{id:DateVariableEnum.TODAY,name:"当前日期",deps:["SYSTEMTIME"],useFactory:([systemTime])=>systemTime,dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Standard,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:0,lookAhead:0}},{id:DateVariableEnum.YESTERDAY,name:"昨天",deps:["TODAY"],useFactory:([today])=>(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,1),dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,amount:1}}},{id:DateVariableEnum.DBY,name:"前天",deps:["TODAY"],useFactory:([today])=>(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,2),dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,amount:2}}},{id:DateVariableEnum.DAYS_7_AGO,name:"七天前",deps:["TODAY"],useFactory:([today])=>(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,7),dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,amount:7}}},{id:DateVariableEnum.DAYS_8_AGO,name:"八天前",deps:["TODAY"],useFactory:([today])=>(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,8),dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,amount:8}}},{id:DateVariableEnum.DAYS_14_AGO,name:"十四天前",deps:["TODAY"],useFactory:([today])=>(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,14),dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,amount:14}}},{id:DateVariableEnum.DAYS_15_AGO,name:"十五天前",deps:["TODAY"],useFactory:([today])=>(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,15),dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,amount:15}}},{id:DateVariableEnum.DAYS_30_AGO,name:"三十天前",deps:["TODAY"],useFactory:([today])=>(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,30),dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,amount:30}}},{id:DateVariableEnum.DAYS_31_AGO,name:"三十一天前",deps:["TODAY"],useFactory:([today])=>(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,31),dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,amount:31}}},{id:DateVariableEnum.RECENT_7_DAYS,name:"最近七天",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,7),today],dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Standard,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:7,lookAhead:0}},{id:DateVariableEnum.RECENT_14_DAYS,name:"最近十四天",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,14),today],dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Standard,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:14,lookAhead:0}},{id:DateVariableEnum.RECENT_30_DAYS,name:"最近三十天",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,30),today],dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Standard,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:30,lookAhead:0}},{id:DateVariableEnum.RECENT_90_DAYS,name:"最近九十天",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,90),today],dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Standard,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:90,lookAhead:0}},{id:DateVariableEnum.RECENT_180_DAYS,name:"最近一百八十天",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,180),today],dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Standard,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Day,lookBack:180,lookAhead:0}},{id:DateVariableEnum.THIS_WEEK,name:"本周",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_3__.k)(today,{weekStartsOn:1}),today]},{id:DateVariableEnum.THIS_MONTH,name:"本月",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_4__.w)(today),today],dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Standard,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Month,lookBack:0,lookAhead:0}},{id:DateVariableEnum.PREVIOUS_MONTH,name:"上月",deps:["TODAY"],useFactory:([today])=>{const start=(0,date_fns__WEBPACK_IMPORTED_MODULE_5__.a)(today,1);return[start,(0,date_fns__WEBPACK_IMPORTED_MODULE_6__.p)(start)]},dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Month,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Month,amount:1}}},{id:DateVariableEnum.THIS_QUARTER,name:"本季度",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_7__.a)(today),today],dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Standard,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Quarter,lookBack:0,lookAhead:0}},{id:DateVariableEnum.YEAR_TO_TODAY,name:"当前年至当天",deps:["TODAY"],useFactory:([today])=>[new Date(today.getFullYear(),0,1),today]},{id:DateVariableEnum.YEAR_TO_YESTERDAY,name:"当前年至昨天",deps:["TODAY"],useFactory:([today])=>[new Date(today.getFullYear(),0,1),(0,date_fns__WEBPACK_IMPORTED_MODULE_2__.e)(today,1)]},{id:DateVariableEnum.THIS_WHOLE_WEEK,name:"本周(包含整周)",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_3__.k)(today,{weekStartsOn:1}),(0,date_fns__WEBPACK_IMPORTED_MODULE_8__.$)(today,{weekStartsOn:1})]},{id:DateVariableEnum.THIS_WHOLE_MONTH,name:"本月(包含整月)",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_4__.w)(today),(0,date_fns__WEBPACK_IMPORTED_MODULE_6__.p)(today)]},{id:DateVariableEnum.THIS_WHOLE_QUARTER,name:"本季度(包含整季度)",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_7__.a)(today),(0,date_fns__WEBPACK_IMPORTED_MODULE_9__.j)(today)]},{id:DateVariableEnum.THIS_WHOLE_YEAR,name:"今年(包含整年)",deps:["TODAY"],useFactory:([today])=>[(0,date_fns__WEBPACK_IMPORTED_MODULE_10__.D)(today),(0,date_fns__WEBPACK_IMPORTED_MODULE_11__.Q)(today)]},{id:DateVariableEnum.PREVIOUS_YEAR,name:"去年",deps:["TODAY"],useFactory:([today])=>{const lastYear=(0,date_fns__WEBPACK_IMPORTED_MODULE_12__.d)(today,1);return[(0,date_fns__WEBPACK_IMPORTED_MODULE_10__.D)(lastYear),(0,date_fns__WEBPACK_IMPORTED_MODULE_11__.Q)(lastYear)]},dateRange:{type:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.bJ0.Offset,granularity:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.iG7.Year,lookBack:0,lookAhead:0,current:{direction:_metad_ocap_core__WEBPACK_IMPORTED_MODULE_0__.TGZ.LookBack,amount:1}}}]}});var DateVariableEnum;!function(DateVariableEnum){DateVariableEnum.SYSTEMTIME="SYSTEMTIME",DateVariableEnum.TODAY="TODAY",DateVariableEnum.YESTERDAY="YESTERDAY",DateVariableEnum.DBY="DBY",DateVariableEnum.DAYS_7_AGO="DAYS_7_AGO",DateVariableEnum.DAYS_8_AGO="DAYS_8_AGO",DateVariableEnum.DAYS_14_AGO="DAYS_14_AGO",DateVariableEnum.DAYS_15_AGO="DAYS_15_AGO",DateVariableEnum.DAYS_30_AGO="DAYS_30_AGO",DateVariableEnum.DAYS_31_AGO="DAYS_31_AGO",DateVariableEnum.RECENT_7_DAYS="RECENT_7_DAYS",DateVariableEnum.RECENT_14_DAYS="RECENT_14_DAYS",DateVariableEnum.RECENT_30_DAYS="RECENT_30_DAYS",DateVariableEnum.RECENT_90_DAYS="RECENT_90_DAYS",DateVariableEnum.RECENT_180_DAYS="RECENT_180_DAYS",DateVariableEnum.THIS_WEEK="THIS_WEEK",DateVariableEnum.THIS_MONTH="THIS_MONTH",DateVariableEnum.PREVIOUS_MONTH="PREVIOUS_MONTH",DateVariableEnum.THIS_QUARTER="THIS_QUARTER",DateVariableEnum.THIS_WHOLE_WEEK="THIS_WHOLE_WEEK",DateVariableEnum.THIS_WHOLE_MONTH="THIS_WHOLE_MONTH",DateVariableEnum.THIS_WHOLE_QUARTER="THIS_WHOLE_QUARTER",DateVariableEnum.THIS_WHOLE_YEAR="THIS_WHOLE_YEAR",DateVariableEnum.YEAR_TO_TODAY="YEAR_TO_TODAY",DateVariableEnum.YEAR_TO_YESTERDAY="YEAR_TO_YESTERDAY",DateVariableEnum.PREVIOUS_YEAR="PREVIOUS_YEAR"}(DateVariableEnum||(DateVariableEnum={}))},"./packages/angular/core/services/core.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{s:()=>NgmOcapCoreService});var tslib__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),rxjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/empty.js"),rxjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),rxjs__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),_models__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/angular/core/models/date-function.ts");let NgmOcapCoreService=class NgmOcapCoreService{constructor(){this.dateVariables=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_models__WEBPACK_IMPORTED_MODULE_1__.c5),this.#entityUpdateEvent$=new rxjs__WEBPACK_IMPORTED_MODULE_2__.B,this.#openCalculation=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.signal)((params=>rxjs__WEBPACK_IMPORTED_MODULE_3__.w))}#entityUpdateEvent$;#openCalculation;updateEntity(event){this.#entityUpdateEvent$.next(event)}onEntityUpdate(){return this.#entityUpdateEvent$.asObservable()}getDateVariables(){return this.dateVariables}execDateVariables(id){const dateVariable=this.dateVariables.find((item=>item.id===id));if(!dateVariable)try{return new Date(id)}catch(err){throw new Error(`Can't found date variable or date '${id}'`)}return dateVariable.useFactory(dateVariable.deps?.map((dep=>this.execDateVariables(dep))))}openCalculation(params){return(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.of)(params).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.n)(this.#openCalculation()))}setCalculationHandler(handler){this.#openCalculation.set(handler)}};NgmOcapCoreService=(0,tslib__WEBPACK_IMPORTED_MODULE_6__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable)()],NgmOcapCoreService)},"./packages/angular/core/types.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Uw:()=>EntityCapacity,_l:()=>OCAP_MODEL_TOKEN,ox:()=>OCAP_DATASOURCE_TOKEN,s2:()=>OCAP_AGENT_TOKEN});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");const OCAP_AGENT_TOKEN=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("OCAP-Agent"),OCAP_MODEL_TOKEN=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("OCAP-Model"),OCAP_DATASOURCE_TOKEN=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("OCAP-DataSource");var EntityCapacity;!function(EntityCapacity){EntityCapacity.Dimension="Dimension",EntityCapacity.Hierarchy="Hierarchy",EntityCapacity.Measure="Measure",EntityCapacity.Indicator="Indicator",EntityCapacity.Calculation="Calculation",EntityCapacity.Parameter="Parameter"}(EntityCapacity||(EntityCapacity={}))},"./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/@angular-devkit/build-angular/node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./packages/angular/common/split-button/split-button.component.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{SplitButton:()=>SplitButton,__namedExportsOrder:()=>__namedExportsOrder,default:()=>split_button_component_stories});var common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core_module=__webpack_require__("./packages/angular/core/core.module.ts"),dist=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var split_button_componentngResource=__webpack_require__("./packages/angular/common/split-button/split-button.component.scss?ngResource"),split_button_componentngResource_default=__webpack_require__.n(split_button_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let SplitButtonComponent=class SplitButtonComponent{constructor(){}ngOnInit(){}static#_=this.ctorParameters=()=>[]};SplitButtonComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ngm-split-button",template:'\x3c!-- <button mat-button class="ngm-split-button__main">Basic</button>\n<button mat-button class="ngm-split-button__more">\n  <mat-icon>more_vert</mat-icon>\n</button> --\x3e\n\n<button mat-raised-button class="ngm-split-button__main">Basic</button>\n<button mat-raised-button class="ngm-split-button__more">\n  <mat-icon>expand_more</mat-icon>\n</button>\n',styles:[split_button_componentngResource_default()]}),(0,tslib_es6.Sn)("design:paramtypes",[])],SplitButtonComponent);var fesm2022_button=__webpack_require__("./node_modules/@angular/material/fesm2022/button.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs");let SplitButtonModule=class SplitButtonModule{};SplitButtonModule=(0,tslib_es6.Cg)([(0,core.NgModule)({imports:[fesm2022_button.Hl,icon.m_],exports:[SplitButtonComponent],declarations:[SplitButtonComponent],providers:[]})],SplitButtonModule);const split_button_component_stories={title:"Common/SplitButton",component:SplitButtonComponent,decorators:[(0,dist.moduleMetadata)({imports:[common.CommonModule,SplitButtonModule,core_module.T],declarations:[]})]},SplitButton={args:{}};SplitButton.parameters={...SplitButton.parameters,docs:{...SplitButton.parameters?.docs,source:{originalSource:"{\n  args: {}\n}",...SplitButton.parameters?.docs?.source}}};const __namedExportsOrder=["SplitButton"]}}]);