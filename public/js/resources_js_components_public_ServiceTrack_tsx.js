"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_public_ServiceTrack_tsx"],{

/***/ "./resources/js/components/public/ConfirmProvider.tsx":
/*!************************************************************!*\
  !*** ./resources/js/components/public/ConfirmProvider.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/components/AnimatePresence/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
};
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};




var BackButton = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    outline: none;\n    background: none;\n    border: none;\n    display: flex;\n    font-size: 17px;\n"], ["\n    outline: none;\n    background: none;\n    border: none;\n    display: flex;\n    font-size: 17px;\n"])));
var Card = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    position: relative;\n    border: none;\n    box-shadow: rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(64 68 82 / 16%) 0 0 0 1px, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0;\n    transition: all .3s ease;\n    .activeCard {\n        border-radius: 8px;\n        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, #17629f 0px 0px 0px 3px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px !important;\n    }\n"], ["\n    position: relative;\n    border: none;\n    box-shadow: rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(64 68 82 / 16%) 0 0 0 1px, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0;\n    transition: all .3s ease;\n    .activeCard {\n        border-radius: 8px;\n        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, #17629f 0px 0px 0px 3px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px !important;\n    }\n"])));
var localeData = {
  "Janvier": "Janvye",
  "Février": "Fevriye",
  "Mars": "Mas",
  "Avril": "Avril",
  "Mai": "Me",
  "Juin": "Jen",
  "Juillet": "Jiyè",
  "Aout": "Dawout",
  "Septembre": "Septanm",
  "Octobre": "Octòb",
  "Novembre": "Novanm",
  "Décembre": "Desanm"
};
var ConfirmProvider = function ConfirmProvider(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    choices = _a[0],
    setChoices = _a[1];
  var details = __spreadArray([], props.details, true);
  var handleChoiceSelect = function handleChoiceSelect(service) {
    setChoices(function (prevState) {
      var choice = __spreadArray([], prevState, true);
      choice[props.currentPage - 1] = service;
      if (choice[props.currentPage - 1]) props.canNext(true);
      return choice;
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_3__.AnimatePresence, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
    initial: {
      x: 20,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -20,
      opacity: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(BackButton, {
    onClick: function onClick() {
      return props.onBack();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "mdi mdi-chevron-left"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Retounen")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "scheme_default d-flex justify-content-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h6", {
    className: "mt-2"
  }, "Chwazi yon founis\xE8"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Chwa ", props.currentPage, " sou ", props.maxPage)), details.map(function (detail, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
      key: key,
      initial: {
        x: 100,
        opacity: 0
      },
      className: "".concat(key === 0 ? 'mt-2' : ''),
      animate: {
        x: 0,
        opacity: 1
      },
      exit: {
        x: -100,
        opacity: 0
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Card, {
      className: "card mb-3",
      style: {
        cursor: 'pointer'
      },
      onClick: function onClick() {
        return handleChoiceSelect(detail);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "card-body pt-2 pb-1".concat(choices[props.currentPage - 1] && detail.provider_id === choices[props.currentPage - 1].provider_id ? " activeCard" : "")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "flex justify-content-between mb-1"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "d-inline-block"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: 'text-muted mb-0 text-dark'
    }, detail.provider.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "align-self-center",
      style: {
        padding: '0 5px'
      }
    }, detail.provider.name_short)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "flex mt-1 justify-content-between"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: 'card-title mb-0 text-dark',
      style: {
        fontSize: '1rem'
      }
    }, "Espesyalis: ", detail.specialist.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "text-danger mt-1 mb-1"
    }, "Date: ", "".concat(moment__WEBPACK_IMPORTED_MODULE_1___default()(detail.date_slot).format("D MMMM YYYY"), " ant ").concat(detail.time_slot))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      className: "text-muted mb-0 d-flex justify-content-between mt-0",
      style: {
        borderTopWidth: "1px",
        borderTopStyle: "solid",
        borderTopColor: "rgb(238, 238, 238)"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "pt-1",
      style: {
        verticalAlign: 'sub'
      }
    }, "Adr\xE8s: ", detail.provider.address_line_1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "pt-1",
      style: {
        verticalAlign: 'sub'
      }
    }, "Telef\xF2n: ", detail.provider.phone))))));
  })), props.maxPage === props.currentPage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    disabled: !choices[props.currentPage - 1],
    type: "button",
    onClick: function onClick() {
      return props.onDone(choices);
    },
    className: "give-btn give-btn-modal sc_button_hover_slide_left border-0"
  }, "Mwen fini"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmProvider);
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./resources/js/components/public/DisplayConfirmed.tsx":
/*!*************************************************************!*\
  !*** ./resources/js/components/public/DisplayConfirmed.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/components/AnimatePresence/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_moment__WEBPACK_IMPORTED_MODULE_1__);



var DisplayConfirmed = function DisplayConfirmed(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
    initial: {
      x: -20,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 20,
      opacity: 0
    },
    className: "results-set"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "scheme_default"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "posts_container"
  }, Object.values(props.details).map(function (result, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("article", {
      key: key,
      className: "post_item ".concat(key > 0 ? "mt-2" : "mt-3")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "pt-1 pb-0 ps-3 pe-3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "post_header entry-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h6", {
      className: "m-0"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, result[0].provider.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "widget widget_categories"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "post_meta scheme_default d-flex justify-content-between"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
      className: "mt-0 cat-item cat-item-41"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
      className: "post_meta_item",
      style: {
        fontSize: '16px',
        fontWeight: "normal"
      }
    }, result[0].specialist.name))))), result.length === 1 && result[0].decision === "accepted" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "post_content entry-content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "text-primary font-weight-bold mt-1 mb-1"
    }, "Randevou le ", "".concat(moment_moment__WEBPACK_IMPORTED_MODULE_1___default()(result[0].date_slot).format("D MMMM YYYY"), " ant ").concat(result[0].time_slot)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "pt-1",
      style: {
        verticalAlign: 'sub'
      }
    }, "Adr\xE8s: ", result[0].provider.address_line_1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "post_content_inner"
    }, result[0].secure_message))));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "divider-inner mt-3"
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayConfirmed);

/***/ }),

/***/ "./resources/js/components/public/DisplayTrack.tsx":
/*!*********************************************************!*\
  !*** ./resources/js/components/public/DisplayTrack.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/components/AnimatePresence/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment_moment__WEBPACK_IMPORTED_MODULE_1__);



var DisplayTrack = function DisplayTrack(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_2__.AnimatePresence, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_3__.motion.div, {
    initial: {
      x: -20,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 20,
      opacity: 0
    },
    className: "results-set"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "scheme_default"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "posts_container"
  }, Object.values(props.details.services).map(function (result, key) {
    var providers = {};
    result.map(function (prov, key) {
      return providers[prov.provider.id] = prov.provider.name_short;
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("article", {
      key: key,
      className: "post_item ".concat(key > 0 ? "mt-2" : "mt-3")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "pt-1 pb-0 ps-3 pe-3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "post_header entry-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h6", {
      className: "m-0"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Gen ".concat(result.length === 1 ? "yon" : result.length, " founis\xE8 ki aksepte dosye w la."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "widget widget_categories"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "post_meta scheme_default d-flex justify-content-between"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", {
      className: "mt-0 cat-item cat-item-41"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
      className: "post_meta_item",
      style: {
        fontSize: '16px',
        fontWeight: "normal"
      }
    }, result[0].specialist.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, Object.values(providers).join(", ").replace(/, ([^,]*)$/, ' ak $1'))))), result.length === 1 && result[0].decision === "accepted" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "post_content entry-content"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "text-danger mt-1 mb-1"
    }, "Randevou le ", "".concat(moment_moment__WEBPACK_IMPORTED_MODULE_1___default()(result[0].date_slot).format("D MMMM YYYY"), " ant ").concat(result[0].time_slot)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "pt-1",
      style: {
        verticalAlign: 'sub'
      }
    }, "Adr\xE8s: ", result[0].provider.address_line_1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "post_content_inner"
    }, result[0].secure_message))), props.details.services.length - 1 !== key && props.details.services.length > 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("hr", {
      className: "m-0 mt-2"
    }));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "divider-inner mt-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return typeof props.onWillConfirmProvider === "function" ? props.onWillConfirmProvider(true) : undefined;
    },
    className: "give-btn give-btn-modal sc_button_hover_slide_left border-0"
  }, "Klike pou konfime"))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayTrack);

/***/ }),

/***/ "./resources/js/components/public/ServiceTrack.tsx":
/*!*********************************************************!*\
  !*** ./resources/js/components/public/ServiceTrack.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_Popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Popup */ "./resources/js/components/utils/Popup.tsx");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment_moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ConfirmProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConfirmProvider */ "./resources/js/components/public/ConfirmProvider.tsx");
/* harmony import */ var _DisplayTrack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DisplayTrack */ "./resources/js/components/public/DisplayTrack.tsx");
/* harmony import */ var _DisplayConfirmed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DisplayConfirmed */ "./resources/js/components/public/DisplayConfirmed.tsx");
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};







var calendarStrings = {
  lastDay: '[Yè v`] LT',
  sameDay: '[Jodi a vè] LT',
  nextDay: '[Demen vè] LT',
  lastWeek: 'dddd [dènye] [vè] LT',
  nextWeek: 'dddd [vè] LT',
  sameElse: 'L'
};
var ServiceTrack = function ServiceTrack(props) {
  moment_moment__WEBPACK_IMPORTED_MODULE_3___default().locale('fr');
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    tracking = _a[0],
    setTracking = _a[1],
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    results = _b[0],
    setResults = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    confirmed = _c[0],
    setConfirmed = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showPopup = _d[0],
    setShowPopup = _d[1],
    _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showConfirmProvider = _e[0],
    setShowConfirmProvider = _e[1],
    _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    canNext = _f[0],
    setCanNext = _f[1],
    _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    current = _g[0],
    setCurrent = _g[1];
  var getData = function getData() {
    axios__WEBPACK_IMPORTED_MODULE_1___default().get("/api/track/".concat(tracking)).then(function (rep) {
      setConfirmed(rep.data.data.confirmed);
      var data = __assign({}, rep.data.data);
      delete data['confirmed'];
      setResults(data);
      setShowPopup(true);
    });
  };
  var handleTrack = function handleTrack(e) {
    e.preventDefault();
    getData();
  };
  var handleSubmit = function handleSubmit(data) {
    var form = new FormData();
    var choices = [];
    data.forEach(function (d) {
      choices.push({
        service_id: d.service_id,
        provider_id: d.provider_id,
        request_id: d.request_id,
        speciality_id: d.speciality_id
      });
    });
    form.append("confirm", JSON.stringify(choices));
    axios__WEBPACK_IMPORTED_MODULE_1___default().post("/api/track/confirm", form).then(function (rep) {
      setShowConfirmProvider(false);
      setCurrent(0);
      getData();
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "col-12 col-md-8 pb-4 mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "position-relative service-form-request-wrap"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("section", {
    className: "vighor-section vighor-top-section vighor-element vighor-element-21b3bff vighor-section-boxed vighor-section-height-default vighor-section-height-default"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "vighor-container vighor-column-gap-extended"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "vighor-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-51472d7 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "vighor-column-wrap vighor-element-populated"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "vighor-widget-wrap service-follow-up"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "vighor-element vighor-element-ca6ee5d sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "vighor-widget-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      width: "250px",
      margin: "10px auto"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "/images/4967841.png",
    alt: ""
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "sc_item_title sc_title_title sc_item_title_style_decoration"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "sc_item_title_text"
  }, "Swiv dosye w la")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Antre nimewo dosye ou a nan f\xF2mil\xE8 ki anba a pouw ka gade tout d\xE8nye aktivite ki f\xE8t nan dosye ou a."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "scheme_default text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "col-12 col-md-6 mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h6", {
    className: "mt-2 text-start mb-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "vighor-title"
  }, "Ki nimewo dosye w la?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "QuestionBody"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "ChoiceStructure"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "dk-speakout-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    autoComplete: "off",
    name: "DS~NO~990",
    id: "folderN",
    type: "text",
    onChange: function onChange(e) {
      return setTracking(e.target.value);
    },
    placeholder: "Mete nimewo dosye w la",
    className: "fill_inited"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "dk-speakout-submit-wrap mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    disabled: !tracking,
    onClick: handleTrack,
    className: "dk-speakout-submit sc_button_hover_slide_left Question-Next-Button"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: ""
  }, "Verifye eta demand lan"))))))))), (results === null || results === void 0 ? void 0 : results.services.length) === 0 && confirmed.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onPopupClose: function onPopupClose() {
      return setShowPopup(false);
    },
    parentId: 1900
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "results-set mt-4 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      width: "200px",
      margin: "0 auto"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "/images/novelist-writing-animate.svg",
    alt: ""
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", {
    className: "mt-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: ""
  }, "Demand ou an poko trete")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mb-2"
  }, "Okenn prestat\xE8 poko aksepte trete dosye w la. Pa enkyete w yap reponn ou nan yon ti tan!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "text-center m-0 mb-2",
    style: {
      fontSize: "20px",
      fontWeight: "600"
    }
  }, "Dosye ", results.request.ticket_number))), ((results === null || results === void 0 ? void 0 : results.services.length) > 0 || confirmed.length > 0) && showPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onPopupClose: function onPopupClose() {
      setShowPopup(false);
      setCurrent(0);
      setShowConfirmProvider(false);
    },
    parentId: 1900
  }, !showConfirmProvider && results.services.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DisplayTrack__WEBPACK_IMPORTED_MODULE_5__["default"], {
    details: results,
    onWillConfirmProvider: function onWillConfirmProvider() {
      return setShowConfirmProvider(true);
    }
  }), showConfirmProvider && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ConfirmProvider__WEBPACK_IMPORTED_MODULE_4__["default"], {
    currentPage: current + 1,
    maxPage: results === null || results === void 0 ? void 0 : results.services.length,
    onBack: function onBack() {
      if (current === 0) setShowConfirmProvider(false);
      if (current === 1) setCurrent(function (prevState) {
        return prevState - 1;
      });
    },
    details: results.services[current],
    onDone: handleSubmit,
    canNext: function canNext(e) {
      return setCanNext(e);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center mb-2"
  }, showConfirmProvider && current + 1 < (results === null || results === void 0 ? void 0 : results.services.length) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    disabled: !canNext,
    type: "button",
    onClick: function onClick() {
      setCurrent(function (cu) {
        return cu + 1;
      });
      setCanNext(false);
    },
    className: "give-btn give-btn-modal sc_button_hover_slide_left border-0 mb-1"
  }, "Ale nan pwochen an")), !showConfirmProvider && confirmed.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_DisplayConfirmed__WEBPACK_IMPORTED_MODULE_6__["default"], {
    details: confirmed,
    onWillConfirmProvider: function onWillConfirmProvider() {
      return setShowConfirmProvider(true);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "text-danger"
  }, "Sonje, nou pa antite k ap founi s\xE8vis la. Nou jis f\xE8 yon pon ant oumenm ansanm ak founis\xE8 a.")))))))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServiceTrack);

/***/ }),

/***/ "./node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PresenceChild": () => (/* binding */ PresenceChild)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _context_PresenceContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/PresenceContext.js */ "./node_modules/framer-motion/dist/es/context/PresenceContext.js");
/* harmony import */ var _utils_use_constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/use-constant.js */ "./node_modules/framer-motion/dist/es/utils/use-constant.js");





var presenceId = 0;
function getPresenceId() {
    var id = presenceId;
    presenceId++;
    return id;
}
var PresenceChild = function (_a) {
    var children = _a.children, initial = _a.initial, isPresent = _a.isPresent, onExitComplete = _a.onExitComplete, custom = _a.custom, presenceAffectsLayout = _a.presenceAffectsLayout;
    var presenceChildren = (0,_utils_use_constant_js__WEBPACK_IMPORTED_MODULE_1__.useConstant)(newChildrenMap);
    var id = (0,_utils_use_constant_js__WEBPACK_IMPORTED_MODULE_1__.useConstant)(getPresenceId);
    var context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () { return ({
        id: id,
        initial: initial,
        isPresent: isPresent,
        custom: custom,
        onExitComplete: function (childId) {
            presenceChildren.set(childId, true);
            var allComplete = true;
            presenceChildren.forEach(function (isComplete) {
                if (!isComplete)
                    allComplete = false;
            });
            allComplete && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
        },
        register: function (childId) {
            presenceChildren.set(childId, false);
            return function () { return presenceChildren.delete(childId); };
        },
    }); }, 
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    presenceAffectsLayout ? undefined : [isPresent]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
        presenceChildren.forEach(function (_, key) { return presenceChildren.set(key, false); });
    }, [isPresent]);
    /**
     * If there's no `motion` components to fire exit animations, we want to remove this
     * component immediately.
     */
    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {
        !isPresent && !presenceChildren.size && (onExitComplete === null || onExitComplete === void 0 ? void 0 : onExitComplete());
    }, [isPresent]);
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_context_PresenceContext_js__WEBPACK_IMPORTED_MODULE_2__.PresenceContext.Provider, { value: context }, children));
};
function newChildrenMap() {
    return new Map();
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/components/AnimatePresence/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/components/AnimatePresence/index.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimatePresence": () => (/* binding */ AnimatePresence)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_use_force_update_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/use-force-update.js */ "./node_modules/framer-motion/dist/es/utils/use-force-update.js");
/* harmony import */ var _PresenceChild_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PresenceChild.js */ "./node_modules/framer-motion/dist/es/components/AnimatePresence/PresenceChild.js");
/* harmony import */ var _context_SharedLayoutContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/SharedLayoutContext.js */ "./node_modules/framer-motion/dist/es/context/SharedLayoutContext.js");







function getChildKey(child) {
    return child.key || "";
}
function updateChildLookup(children, allChildren) {
    var seenChildren =  true ? new Set() : 0;
    children.forEach(function (child) {
        var key = getChildKey(child);
        if ( true && seenChildren) {
            if (seenChildren.has(key)) {
                console.warn("Children of AnimatePresence require unique keys. \"" + key + "\" is a duplicate.");
            }
            seenChildren.add(key);
        }
        allChildren.set(key, child);
    });
}
function onlyElements(children) {
    var filtered = [];
    // We use forEach here instead of map as map mutates the component key by preprending `.$`
    react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, function (child) {
        if ((0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(child))
            filtered.push(child);
    });
    return filtered;
}
/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * @library
 *
 * Any `Frame` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { Frame, AnimatePresence } from 'framer'
 *
 * // As items are added and removed from `items`
 * export function Items({ items }) {
 *   return (
 *     <AnimatePresence>
 *       {items.map(item => (
 *         <Frame
 *           key={item.id}
 *           initial={{ opacity: 0 }}
 *           animate={{ opacity: 1 }}
 *           exit={{ opacity: 0 }}
 *         />
 *       ))}
 *     </AnimatePresence>
 *   )
 * }
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * @motion
 *
 * Any `motion` components that have an `exit` property defined will animate out when removed from
 * the tree.
 *
 * ```jsx
 * import { motion, AnimatePresence } from 'framer-motion'
 *
 * export const Items = ({ items }) => (
 *   <AnimatePresence>
 *     {items.map(item => (
 *       <motion.div
 *         key={item.id}
 *         initial={{ opacity: 0 }}
 *         animate={{ opacity: 1 }}
 *         exit={{ opacity: 0 }}
 *       />
 *     ))}
 *   </AnimatePresence>
 * )
 * ```
 *
 * You can sequence exit animations throughout a tree using variants.
 *
 * If a child contains multiple `motion` components with `exit` props, it will only unmount the child
 * once all `motion` components have finished animating out. Likewise, any components using
 * `usePresence` all need to call `safeToRemove`.
 *
 * @public
 */
var AnimatePresence = function (_a) {
    var children = _a.children, custom = _a.custom, _b = _a.initial, initial = _b === void 0 ? true : _b, onExitComplete = _a.onExitComplete, exitBeforeEnter = _a.exitBeforeEnter, _c = _a.presenceAffectsLayout, presenceAffectsLayout = _c === void 0 ? true : _c;
    // We want to force a re-render once all exiting animations have finished. We
    // either use a local forceRender function, or one from a parent context if it exists.
    var forceRender = (0,_utils_use_force_update_js__WEBPACK_IMPORTED_MODULE_1__.useForceUpdate)();
    var layoutContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_SharedLayoutContext_js__WEBPACK_IMPORTED_MODULE_2__.SharedLayoutContext);
    if ((0,_context_SharedLayoutContext_js__WEBPACK_IMPORTED_MODULE_2__.isSharedLayout)(layoutContext)) {
        forceRender = layoutContext.forceUpdate;
    }
    var isInitialRender = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
    // Filter out any children that aren't ReactElements. We can only track ReactElements with a props.key
    var filteredChildren = onlyElements(children);
    // Keep a living record of the children we're actually rendering so we
    // can diff to figure out which are entering and exiting
    var presentChildren = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(filteredChildren);
    // A lookup table to quickly reference components by key
    var allChildren = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Map())
        .current;
    // A living record of all currently exiting components.
    var exiting = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Set()).current;
    updateChildLookup(filteredChildren, allChildren);
    // If this is the initial component render, just deal with logic surrounding whether
    // we play onMount animations or not.
    if (isInitialRender.current) {
        isInitialRender.current = false;
        return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, filteredChildren.map(function (child) { return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PresenceChild_js__WEBPACK_IMPORTED_MODULE_3__.PresenceChild, { key: getChildKey(child), isPresent: true, initial: initial ? undefined : false, presenceAffectsLayout: presenceAffectsLayout }, child)); })));
    }
    // If this is a subsequent render, deal with entering and exiting children
    var childrenToRender = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__spreadArray)([], (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__read)(filteredChildren));
    // Diff the keys of the currently-present and target children to update our
    // exiting list.
    var presentKeys = presentChildren.current.map(getChildKey);
    var targetKeys = filteredChildren.map(getChildKey);
    // Diff the present children with our target children and mark those that are exiting
    var numPresent = presentKeys.length;
    for (var i = 0; i < numPresent; i++) {
        var key = presentKeys[i];
        if (targetKeys.indexOf(key) === -1) {
            exiting.add(key);
        }
        else {
            // In case this key has re-entered, remove from the exiting list
            exiting.delete(key);
        }
    }
    // If we currently have exiting children, and we're deferring rendering incoming children
    // until after all current children have exiting, empty the childrenToRender array
    if (exitBeforeEnter && exiting.size) {
        childrenToRender = [];
    }
    // Loop through all currently exiting components and clone them to overwrite `animate`
    // with any `exit` prop they might have defined.
    exiting.forEach(function (key) {
        // If this component is actually entering again, early return
        if (targetKeys.indexOf(key) !== -1)
            return;
        var child = allChildren.get(key);
        if (!child)
            return;
        var insertionIndex = presentKeys.indexOf(key);
        var onExit = function () {
            allChildren.delete(key);
            exiting.delete(key);
            // Remove this child from the present children
            var removeIndex = presentChildren.current.findIndex(function (presentChild) { return presentChild.key === key; });
            presentChildren.current.splice(removeIndex, 1);
            // Defer re-rendering until all exiting children have indeed left
            if (!exiting.size) {
                presentChildren.current = filteredChildren;
                forceRender();
                onExitComplete && onExitComplete();
            }
        };
        childrenToRender.splice(insertionIndex, 0, react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PresenceChild_js__WEBPACK_IMPORTED_MODULE_3__.PresenceChild, { key: getChildKey(child), isPresent: false, onExitComplete: onExit, custom: custom, presenceAffectsLayout: presenceAffectsLayout }, child));
    });
    // Add `MotionContext` even to children that don't need it to ensure we're rendering
    // the same tree between renders
    childrenToRender = childrenToRender.map(function (child) {
        var key = child.key;
        return exiting.has(key) ? (child) : (react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PresenceChild_js__WEBPACK_IMPORTED_MODULE_3__.PresenceChild, { key: getChildKey(child), isPresent: true, presenceAffectsLayout: presenceAffectsLayout }, child));
    });
    presentChildren.current = childrenToRender;
    if ( true &&
        exitBeforeEnter &&
        childrenToRender.length > 1) {
        console.warn("You're attempting to animate multiple children within AnimatePresence, but its exitBeforeEnter prop is set to true. This will lead to odd visual behaviour.");
    }
    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, exiting.size
        ? childrenToRender
        : childrenToRender.map(function (child) { return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(child); })));
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/use-force-update.js":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/use-force-update.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useForceUpdate": () => (/* binding */ useForceUpdate)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _use_unmount_effect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-unmount-effect.js */ "./node_modules/framer-motion/dist/es/utils/use-unmount-effect.js");




function useForceUpdate() {
    var unloadingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    var _a = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__read)((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0), 2), forcedRenderCount = _a[0], setForcedRenderCount = _a[1];
    (0,_use_unmount_effect_js__WEBPACK_IMPORTED_MODULE_2__.useUnmountEffect)(function () { return (unloadingRef.current = true); });
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
        !unloadingRef.current && setForcedRenderCount(forcedRenderCount + 1);
    }, [forcedRenderCount]);
}




/***/ })

}]);