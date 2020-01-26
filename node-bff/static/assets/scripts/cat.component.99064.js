(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cat.component"],{

/***/ "./src/web/components/banner-component/banner.component.js":
/*!*****************************************************************!*\
  !*** ./src/web/components/banner-component/banner.component.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst banner = {\n  init(){\n    console.warn('==Banner init==')\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (banner);\n\n//# sourceURL=webpack:///./src/web/components/banner-component/banner.component.js?");

/***/ }),

/***/ "./src/web/views/cat-component/cat.component.js":
/*!******************************************************!*\
  !*** ./src/web/views/cat-component/cat.component.js ***!
  \******************************************************/
/*! exports provided: Cat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cat\", function() { return Cat; });\n/* harmony import */ var _components_banner_component_banner_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~components/banner-component/banner.component */ \"./src/web/components/banner-component/banner.component.js\");\n\n_components_banner_component_banner_component__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init()\n\nclass Cat {\n  init(){\n    new Vue({\n      el:'#app',\n      methods:{\n        getRandomPic(){\n          window.location.reload()\n        }\n      }\n    })\n  }\n}\n\nnew Cat().init()\n\n//# sourceURL=webpack:///./src/web/views/cat-component/cat.component.js?");

/***/ })

},[["./src/web/views/cat-component/cat.component.js","webpack-runtime"]]]);