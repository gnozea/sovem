"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_service_Service_tsx"],{

/***/ "./resources/js/components/admin/service/Add.tsx":
/*!*******************************************************!*\
  !*** ./resources/js/components/admin/service/Add.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/form-components/Select2 */ "./resources/js/components/utils/form-components/Select2.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _context_ServiceContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/ServiceContext */ "./resources/js/context/ServiceContext.tsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var _specialist_Add__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../specialist/Add */ "./resources/js/components/admin/specialist/Add.tsx");
/* harmony import */ var _utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/BrowserTitle */ "./resources/js/components/utils/BrowserTitle.tsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
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
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};











var Add = function Add(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    addProviders = _a[0],
    setAddProviders = _a[1],
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    providers = _b[0],
    setProviders = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    name = _c[0],
    setName = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    query = _d[0],
    setQuery = _d[1],
    _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    addSpecialist = _e[0],
    setAddSpecialist = _e[1],
    _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    loading = _f[0],
    setLoading = _f[1],
    url = "/api/dashboard/provider/search?names=".concat(JSON.stringify(query)),
    _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showServiceAdd = _g[0],
    setShowServiceAdd = _g[1],
    dispatch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_ServiceContext__WEBPACK_IMPORTED_MODULE_2__["default"]).dispatch;
  var handleAddService = function handleAddService(e) {
    e.preventDefault();
    var form = new FormData();
    form.append("name", name);
    var id = [];
    providers.map(function (provider) {
      id = __spreadArray(__spreadArray([], id, true), [provider.id], false);
      form.append("providers[]", provider.id);
    });
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/service", form).then(function (rep) {
      setLoading(false);
      setShowServiceAdd({
        service: __assign({}, rep.data.data),
        providers: providers
      });
      react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.success("Le nouveau service a été ajouté.");
      dispatch({
        type: "ADD_SERVICE",
        payload: __assign(__assign({}, rep.data.data), {
          providers_count: providers.length
        })
      });
      setProviders([]);
      setName(undefined);
    });
  };
  var handleProviderSelect = function handleProviderSelect(e) {
    setProviders(function (prevState) {
      return __spreadArray(__spreadArray([], prevState, true), [e], false);
    });
    if (query.indexOf(e.name_short) < 0) setQuery(function (prevQuery) {
      return __spreadArray(__spreadArray([], prevQuery, true), ["".concat(e.name_short)], false);
    });
  };
  var providerSelected = function providerSelected() {
    if (providers.length > 0) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "tags mt-3 mb-2"
      }, providers.map(function (provider, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "pt-1 pt-1 pe-1 d-inline-block",
          key: index
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
          className: "tag",
          key: index
        }, provider === null || provider === void 0 ? void 0 : provider.name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
          type: "button",
          style: {
            border: "none"
          },
          className: "tag-addon"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
          className: "fe fe-x",
          onClick: function onClick() {
            setProviders(function (prevState) {
              var all = __spreadArray([], prevState, true);
              all.splice(index, 1);
              return all;
            });
            setQuery(function (prevState) {
              var all = __spreadArray([], prevState, true);
              all.splice(index, 1);
              return all;
            });
          }
        }))));
      }));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
    }
  };
  var handleBack = function handleBack(data) {
    setShowServiceAdd(undefined);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: "Ajouter service"
  }), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_4__["default"], null), showServiceAdd && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_specialist_Add__WEBPACK_IMPORTED_MODULE_5__.Add, {
    "default": showServiceAdd,
    onBack: handleBack
  }), !showServiceAdd && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    action: "",
    onSubmit: handleAddService
  }, !addProviders && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_8__.motion.div, {
    initial: {
      x: -10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 10,
      opacity: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-label m-0 mb-2"
  }, "Ajouter service"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      boxShadow: "rgb(227, 232, 238) 0px -1px inset",
      width: "100%",
      height: "1px",
      marginTop: "-1px",
      marginLeft: "-22px"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("fieldset", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Nom", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: function onChange(e) {
      return setName(e.target.value);
    },
    defaultValue: name,
    type: "text",
    name: "name",
    required: true,
    placeholder: "Nom du service",
    className: "form-control"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(List, {
    haveItem: providers.length
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Link, {
    to: "#",
    className: "form-label",
    onClick: function onClick(e) {
      return setAddProviders(!addProviders);
    }
  }, "Lier \xE0 des prestataires?"), providerSelected()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-check mt-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: function onChange(e) {
      return setAddSpecialist(e.target.checked);
    },
    defaultChecked: addSpecialist,
    className: "form-check-input",
    type: "checkbox",
    id: "addSpecialist"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-check-label",
    htmlFor: "addSpecialist"
  }, "Ajouter sp\xE9cialiste")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    disabled: name && name.trim() === "",
    className: "btn btn-primary btn-sm"
  }, "Enregistrer".concat(addSpecialist ? " & ajouter spécialiste" : "")))), addProviders && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Select, {
    initial: {
      x: -10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 10,
      opacity: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-label m-0 mb-2"
  }, "S\xE9lectionner prestataire"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      boxShadow: "rgb(227, 232, 238) 0px -1px inset",
      width: "100%",
      height: "1px",
      marginTop: "-1px",
      marginLeft: "-22px"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mb-3 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      cursor: "pointer"
    },
    onClick: function onClick() {
      return setAddProviders(false);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "fe fe-arrow-left"
  }), " Back")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_1__["default"], {
    classes: "service-form",
    multiple: false,
    selectedValue: undefined,
    onSearch: function onSearch(e) {},
    searchKeys: {
      id: 'id',
      text: ['name']
    },
    searchUrl: url,
    onSelect: handleProviderSelect,
    searchable: true,
    placeholder: "Nom du prestataire",
    id: "pname"
  }), providerSelected())));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Add);
var List = styled_components__WEBPACK_IMPORTED_MODULE_10__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    a{\n        border: ", ";\n        padding: ", ";\n        border-radius: ", ";\n        margin: 0;\n    }\n    .tags{\n        margin: 1rem 0 2rem;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n        font-size: 0.9375rem;\n        max-height: 40rem;\n        overflow: auto;\n        background: #fcfcfc;\n        border-top: none;\n        margin-top: 0!important;\n        border-radius: 0 0 3px 3px;\n        padding: .5rem!important;\n        max-height: 62px;\n        padding-top: 0!important;\n        position: relative;\n        overflow: hidden;\n        &:after{\n            position: absolute;\n            content: \"Voir plus\"\n            font-size: 12px;\n        }\n        &:before{\n            position: absolute;\n            content: \"\"\n            width: 100%;\n            height: 5px;\n            background: \"#000\";\n        }\n    }\n"], ["\n    a{\n        border: ", ";\n        padding: ", ";\n        border-radius: ", ";\n        margin: 0;\n    }\n    .tags{\n        margin: 1rem 0 2rem;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n        font-size: 0.9375rem;\n        max-height: 40rem;\n        overflow: auto;\n        background: #fcfcfc;\n        border-top: none;\n        margin-top: 0!important;\n        border-radius: 0 0 3px 3px;\n        padding: .5rem!important;\n        max-height: 62px;\n        padding-top: 0!important;\n        position: relative;\n        overflow: hidden;\n        &:after{\n            position: absolute;\n            content: \"Voir plus\"\n            font-size: 12px;\n        }\n        &:before{\n            position: absolute;\n            content: \"\"\n            width: 100%;\n            height: 5px;\n            background: \"#000\";\n        }\n    }\n"])), function (props) {
  return props.haveItem ? "1px solid rgba(0, 40, 100, 0.12)" : "none";
}, function (props) {
  return props.haveItem ? ".5rem" : 0;
}, function (props) {
  return props.haveItem ? "3px 3px 0 0" : 0;
});
var Select = (0,styled_components__WEBPACK_IMPORTED_MODULE_10__["default"])(framer_motion__WEBPACK_IMPORTED_MODULE_8__.motion.div)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"], ["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"])));
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./resources/js/components/admin/service/LinkProvider.tsx":
/*!****************************************************************!*\
  !*** ./resources/js/components/admin/service/LinkProvider.tsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var _utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/BrowserTitle */ "./resources/js/components/utils/BrowserTitle.tsx");
/* harmony import */ var _utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/form-components/Select2 */ "./resources/js/components/utils/form-components/Select2.tsx");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
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








var LinkProvider = function LinkProvider(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    providers = _a[0],
    setProviders = _a[1],
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    loading = _b[0],
    setLoading = _b[1];
  var handleProviderSelect = function handleProviderSelect(e) {
    setProviders(function (prevState) {
      return __spreadArray(__spreadArray([], prevState, true), [e], false);
    });
  };
  var handleSubmitLink = function handleSubmitLink(e) {
    var form = new FormData();
    providers.map(function (provider) {
      return form.append("providers[]", provider.id);
    });
    form.append("service_id", props.service.id);
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_4___default().post("/api/dashboard/service/link-provider", form).then(function (rep) {
      setLoading(false);
      props.onDone();
      react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Le nouveau prestataire a été lié.");
    });
  };
  var providerSelected = function providerSelected() {
    if (providers.length > 0) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "tags mt-2 mb-2"
      }, providers.map(function (provider, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "pt-1 pt-1 pe-1 d-inline-block",
          key: index
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
          className: "tag",
          key: index
        }, provider === null || provider === void 0 ? void 0 : provider.name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
          type: "button",
          style: {
            border: "none"
          },
          className: "tag-addon"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
          className: "fe fe-x",
          onClick: function onClick() {
            setProviders(function (prevState) {
              var all = __spreadArray([], prevState, true);
              all.splice(index, 1);
              return all;
            });
          }
        }))));
      }));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Select, {
    initial: {
      x: -10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 10,
      opacity: 0
    }
  }, loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Lier à des prestataires"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-label m-0 mb-2"
  }, "Lier prestataires"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      boxShadow: "rgb(227, 232, 238) 0px -1px inset",
      width: "100%",
      height: "1px",
      marginTop: "-1px",
      marginLeft: "-22px"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_6__.motion.div, {
    className: "mt-3",
    initial: {
      x: -10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 10,
      opacity: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Choisir prestataires"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_3__["default"], {
    classes: "service-form",
    multiple: false,
    selectedValue: undefined,
    onSearch: function onSearch(e) {},
    searchKeys: {
      id: 'id',
      text: ['name']
    },
    searchUrl: '/api/dashboard/provider/search',
    onSelect: handleProviderSelect,
    searchable: true,
    placeholder: "Nom du prestataire",
    id: "pname"
  }), providerSelected(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-3 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: handleSubmitLink,
    disabled: providers.length === 0,
    className: "btn btn-primary btn-sm"
  }, "Enregistrer"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkProvider);
var Select = (0,styled_components__WEBPACK_IMPORTED_MODULE_7__["default"])(framer_motion__WEBPACK_IMPORTED_MODULE_6__.motion.div)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"], ["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"])));
var templateObject_1;

/***/ }),

/***/ "./resources/js/components/admin/service/Service.tsx":
/*!***********************************************************!*\
  !*** ./resources/js/components/admin/service/Service.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/BrowserTitle */ "./resources/js/components/utils/BrowserTitle.tsx");
/* harmony import */ var _context_ServiceContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/ServiceContext */ "./resources/js/context/ServiceContext.tsx");
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var _utils_Restricted__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Restricted */ "./resources/js/components/utils/Restricted.tsx");
/* harmony import */ var _context_AccountContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/AccountContext */ "./resources/js/context/AccountContext.tsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_Popup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/Popup */ "./resources/js/components/utils/Popup.tsx");
/* harmony import */ var _Add__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Add */ "./resources/js/components/admin/service/Add.tsx");
/* harmony import */ var _specialist_AddFromService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../specialist/AddFromService */ "./resources/js/components/admin/specialist/AddFromService.tsx");
/* harmony import */ var _LinkProvider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./LinkProvider */ "./resources/js/components/admin/service/LinkProvider.tsx");
var __spreadArray = undefined && undefined.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};












var Service = function Service(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_ServiceContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
    state = _a.state,
    dispatch = _a.dispatch,
    user = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AccountContext__WEBPACK_IMPORTED_MODULE_5__["default"]).user,
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showAdd = _b[0],
    setShowAdd = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showAddSpecialist = _c[0],
    setShowAddSpecialist = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showLinkProvider = _d[0],
    setShowLinkProvider = _d[1],
    _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    loading = _e[0],
    setLoading = _e[1],
    _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    reload = _f[0],
    setReload = _f[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    axios__WEBPACK_IMPORTED_MODULE_6___default().get("/api/dashboard/services").then(function (rep) {
      var data = __spreadArray([], rep.data.data, true);
      dispatch({
        type: "ADD_SERVICES",
        payload: data
      });
      setLoading(false);
    });
    if (reload) setReload(false);
  }, [reload]);
  if (user.provider_id) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Restricted__WEBPACK_IMPORTED_MODULE_4__["default"], null);
  if (!state.length) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "row"
  }, showLinkProvider && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_8__["default"], {
    onPopupClose: function onPopupClose() {
      setShowLinkProvider(undefined);
    },
    isSmall: true,
    parentId: "2455n",
    children: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_LinkProvider__WEBPACK_IMPORTED_MODULE_11__["default"], {
      service: showLinkProvider,
      onDone: function onDone() {
        setReload(true);
        setShowLinkProvider(false);
        setLoading(false);
      }
    })
  }), showAddSpecialist && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_8__["default"], {
    onPopupClose: function onPopupClose() {
      setShowAddSpecialist(undefined);
    },
    isSmall: true,
    parentId: "2437n",
    children: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_specialist_AddFromService__WEBPACK_IMPORTED_MODULE_10__.AddFromService, {
      service: showAddSpecialist,
      onBack: function onBack() {
        setReload(true);
        setShowAddSpecialist(false);
      }
    })
  }), showAdd && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_8__["default"], {
    onPopupClose: function onPopupClose() {
      setShowAdd(undefined);
    },
    isSmall: true,
    parentId: "2434n",
    children: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Add__WEBPACK_IMPORTED_MODULE_9__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "Services"
  }), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    className: "card-title"
  }, "Services"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: function onClick() {
      return setShowAdd(true);
    },
    className: "btn btn-outline-primary btn-sm ms-auto"
  }, "Ajouter service")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("table", {
    className: "table table-hover table-outline table-vcenter text-nowrap card-table",
    role: "grid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", {
    role: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "w-1",
    tabIndex: 0,
    "aria-controls": "DataTables_Table_0",
    rowSpan: 1,
    colSpan: 1,
    "aria-sort": "ascending",
    "aria-label": "No.: activate to sort column descending",
    style: {
      width: "4.7344px"
    }
  }, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "",
    tabIndex: 0,
    rowSpan: 1,
    colSpan: 1,
    "aria-label": "Invoice Subject: activate to sort column ascending",
    style: {
      width: "71.727px"
    }
  }, "Nom"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    tabIndex: 0,
    rowSpan: 1,
    colSpan: 1,
    "aria-label": "Invoice Subject: activate to sort column ascending",
    style: {
      width: "20px"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    tabIndex: 0,
    rowSpan: 1,
    colSpan: 1,
    "aria-label": "Invoice Subject: activate to sort column ascending",
    style: {
      width: "20px"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    tabIndex: 0,
    className: "no-sort",
    rowSpan: 1,
    colSpan: 1,
    "aria-label": ": activate to sort column ascending",
    style: {
      width: "81px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tbody", null, state.map(function (rep, key) {
    var specialists = rep.specialists.map(function (spec) {
      return spec.name;
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", {
      key: key,
      role: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "text-muted"
    }, key + 1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      title: rep.name,
      className: "text-inherit"
    }, lodash__WEBPACK_IMPORTED_MODULE_7___default().truncate(rep.name, {
      'length': 100
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "".concat(rep.providers_count === 0 ? "text-danger" : "text-primary")
    }, rep.providers_count === 0 ? "Pas de prestataire" : "", rep.providers_count > 0 ? "".concat(rep.providers_count, " prestataire").concat(rep.providers_count > 1 ? "s" : '') : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: ""
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      "data-bs-toggle": "tooltip",
      "data-bs-placement": "top",
      className: "".concat(rep.specialists.length === 0 ? "text-danger" : "text-primary"),
      title: specialists.join(", ").replace(/, ([^,]*)$/, ' et $1')
    }, rep.specialists.length === 0 ? "Pas de spécialiste" : "", rep.specialists.length > 0 ? "".concat(rep.specialists.length, " sp\xE9caliste").concat(rep.specialists.length > 1 ? "s" : '') : "")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "text-right"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "item-action dropdown"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
      href: "",
      "data-toggle": "dropdown",
      "data-boundary": "viewport",
      className: "icon",
      "aria-expanded": "false"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "fe fe-more-vertical"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "dropdown-menu dropdown-menu-right",
      "x-placement": "bottom-center",
      style: {
        position: "absolute",
        transform: "translate3d(15px, 20px, 0px)",
        top: "0px",
        left: "0px",
        willChange: "transform"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
      href: "",
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-layers"
    }), " Details "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-edit-2"
    }), " Modifier"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "dropdown-divider"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return setShowLinkProvider(rep);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-user-check"
    }), " Lier \xE0 des prestataires"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return setShowAddSpecialist(rep);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-git-pull-request"
    }), " Ajouter sp\xE9cialit\xE9")))));
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Service);

/***/ }),

/***/ "./resources/js/components/admin/specialist/Add.tsx":
/*!**********************************************************!*\
  !*** ./resources/js/components/admin/specialist/Add.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Add": () => (/* binding */ Add)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/BrowserTitle */ "./resources/js/components/utils/BrowserTitle.tsx");
/* harmony import */ var _utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/form-components/Select2 */ "./resources/js/components/utils/form-components/Select2.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
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








var Add = function Add(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props["default"].providers ? props["default"].providers : []),
    providers = _a[0],
    setProviders = _a[1],
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    selected = _b[0],
    setSelected = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    loading = _c[0],
    setLoading = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    name = _d[0],
    setName = _d[1];
  var handleAddSpecialist = function handleAddSpecialist(e) {
    e.preventDefault();
    var form = new FormData();
    form.append("name", name);
    form.append("service_id", props["default"].service.id);
    var id = [];
    setLoading(true);
    providers.map(function (provider) {
      id = __spreadArray(__spreadArray([], id, true), [provider.id], false);
      form.append("providers[]", provider.id);
    });
    react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Le nouveau spécialiste a été ajouté.");
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/specialist", form).then(function (rep) {
      setLoading(false);
      props.onBack(rep.data);
    });
  };
  var providerSelected = function providerSelected() {
    if (selected.length > 0) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "tags mt-3 mb-2"
      }, selected.map(function (provider, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "pt-1 pt-1 pe-1 d-inline-block",
          key: index
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
          className: "tag",
          key: index
        }, provider === null || provider === void 0 ? void 0 : provider.name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
          type: "button",
          style: {
            border: "none"
          },
          className: "tag-addon"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
          className: "fe fe-x",
          onClick: function onClick() {
            setSelected(function (prevState) {
              var all = __spreadArray([], prevState, true);
              all.splice(index, 1);
              return all;
            });
          }
        }))));
      }));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
    }
  };
  var handleProviderSelect = function handleProviderSelect(e) {
    setSelected(function (prevState) {
      return __spreadArray(__spreadArray([], prevState, true), [e], false);
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Select, {
    initial: {
      x: -10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 10,
      opacity: 0
    }
  }, loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "Ajouter spécialité"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-label m-0 mb-2"
  }, "Ajouter sp\xE9cialiste"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      boxShadow: "rgb(227, 232, 238) 0px -1px inset",
      width: "100%",
      height: "1px",
      marginTop: "-1px",
      marginLeft: "-22px"
    }
  }), props["default"].providers && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mb-3 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    style: {
      cursor: "pointer"
    },
    onClick: function onClick() {
      return props.onBack();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
    className: "fe fe-arrow-left"
  }), " Back")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleAddSpecialist
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("fieldset", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Nom", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: function onChange(e) {
      return setName(e.target.value);
    },
    defaultValue: name,
    type: "text",
    name: "name",
    required: true,
    placeholder: "Nom du service",
    className: "form-control"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Choisir prestataire"), props["default"].providers && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_2__["default"], {
    classes: "service-form",
    multiple: false,
    selectedValue: undefined,
    data: providers,
    onSelect: handleProviderSelect,
    searchable: true,
    placeholder: "Nom du prestataire",
    id: "names"
  }), !props["default"].providers && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_2__["default"], {
    classes: "service-form",
    multiple: false,
    selectedValue: undefined,
    onSearch: function onSearch(e) {},
    searchKeys: {
      id: 'id',
      text: ['name']
    },
    searchUrl: "/api/dashboard/service/".concat(props["default"].service.id, "/search_specialist"),
    onSelect: handleProviderSelect,
    searchable: true,
    placeholder: "Nom du prestataire",
    id: "pname"
  }), selected.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(List, {
    className: "pt-2",
    haveItem: selected.length
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Vos s\xE9lections"), providerSelected()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    disabled: name && name.trim() === "",
    className: "btn btn-primary btn-sm"
  }, "Enregistrer"))));
};
var List = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    label{\n        border: ", ";\n        padding: ", ";\n        border-radius: ", ";\n        margin: 0;\n    }\n    .tags{\n        margin: 1rem 0 2rem;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n        font-size: 0.9375rem;\n        max-height: 40rem;\n        overflow: auto;\n        background: #fcfcfc;\n        border-top: none;\n        margin-top: 0!important;\n        border-radius: 0 0 3px 3px;\n        padding: .5rem!important;\n        max-height: 62px;\n        padding-top: 0!important;\n        position: relative;\n        overflow: hidden;\n        &:after{\n            position: absolute;\n            content: \"Voir plus\"\n            font-size: 12px;\n        }\n        &:before{\n            position: absolute;\n            content: \"\"\n            width: 100%;\n            height: 5px;\n            background: \"#000\";\n        }\n    }\n"], ["\n    label{\n        border: ", ";\n        padding: ", ";\n        border-radius: ", ";\n        margin: 0;\n    }\n    .tags{\n        margin: 1rem 0 2rem;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n        font-size: 0.9375rem;\n        max-height: 40rem;\n        overflow: auto;\n        background: #fcfcfc;\n        border-top: none;\n        margin-top: 0!important;\n        border-radius: 0 0 3px 3px;\n        padding: .5rem!important;\n        max-height: 62px;\n        padding-top: 0!important;\n        position: relative;\n        overflow: hidden;\n        &:after{\n            position: absolute;\n            content: \"Voir plus\"\n            font-size: 12px;\n        }\n        &:before{\n            position: absolute;\n            content: \"\"\n            width: 100%;\n            height: 5px;\n            background: \"#000\";\n        }\n    }\n"])), function (props) {
  return props.haveItem ? "1px solid rgba(0, 40, 100, 0.12)" : "none";
}, function (props) {
  return props.haveItem ? ".5rem" : 0;
}, function (props) {
  return props.haveItem ? "3px 3px 0 0" : 0;
});
var Select = (0,styled_components__WEBPACK_IMPORTED_MODULE_6__["default"])(framer_motion__WEBPACK_IMPORTED_MODULE_7__.motion.div)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"], ["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"])));
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./resources/js/components/admin/specialist/AddFromService.tsx":
/*!*********************************************************************!*\
  !*** ./resources/js/components/admin/specialist/AddFromService.tsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddFromService": () => (/* binding */ AddFromService)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/BrowserTitle */ "./resources/js/components/utils/BrowserTitle.tsx");
/* harmony import */ var _utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/form-components/Select2 */ "./resources/js/components/utils/form-components/Select2.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
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









var AddFromService = function AddFromService(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    providers = _a[0],
    setProviders = _a[1],
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    specialistSelected = _b[0],
    setSpecialistSelected = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    loading = _c[0],
    setLoading = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    error = _d[0],
    setError = _d[1],
    _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    chooseExisting = _e[0],
    setChooseExisting = _e[1],
    _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    name = _f[0],
    setName = _f[1];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (name.trim().length === 0 && specialistSelected.length === 0) return setError("Veuillez choisir ou entrer le nom d'au moins un spécialiste");
    var form = new FormData();
    if (!chooseExisting) {
      form.append("name", name);
      form.append("new", "1");
    } else {
      var id_1 = [];
      specialistSelected.map(function (specialist) {
        id_1 = __spreadArray(__spreadArray([], id_1, true), [specialist.id], false);
        form.append("specialist[]", specialist.id);
      });
    }
    form.append("service_id", props.service.id);
    if (providers) {
      var id_2 = [];
      providers.map(function (provider) {
        id_2 = __spreadArray(__spreadArray([], id_2, true), [provider.id], false);
        form.append("providers[]", provider.id);
      });
    }
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/specialist/add_from_service", form).then(function (rep) {
      setLoading(false);
      react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Service mis à jour avec succès.");
      props.onBack();
    });
  };
  var providerSelected = function providerSelected() {
    if (providers.length > 0) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "tags mt-2 mb-2"
      }, providers.map(function (provider, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "pt-1 pt-1 pe-1 d-inline-block",
          key: index
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
          className: "tag",
          key: index
        }, provider === null || provider === void 0 ? void 0 : provider.name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
          type: "button",
          style: {
            border: "none"
          },
          className: "tag-addon"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
          className: "fe fe-x",
          onClick: function onClick() {
            setProviders(function (prevState) {
              var all = __spreadArray([], prevState, true);
              all.splice(index, 1);
              return all;
            });
          }
        }))));
      }));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
    }
  };
  var specialistSelectedList = function specialistSelectedList() {
    if (specialistSelected.length > 0) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        className: "tags mt-3 mb-2"
      }, specialistSelected.map(function (provider, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          className: "pt-1 pt-1 pe-1 d-inline-block",
          key: index
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
          className: "tag",
          key: index
        }, provider === null || provider === void 0 ? void 0 : provider.name, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
          type: "button",
          style: {
            border: "none"
          },
          className: "tag-addon"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
          className: "fe fe-x",
          onClick: function onClick() {
            setSpecialistSelected(function (prevState) {
              var all = __spreadArray([], prevState, true);
              all.splice(index, 1);
              return all;
            });
          }
        }))));
      }));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
    }
  };
  var handleProviderSelect = function handleProviderSelect(e) {
    setProviders(function (prevState) {
      return __spreadArray(__spreadArray([], prevState, true), [e], false);
    });
  };
  var handleSpecialistSelect = function handleSpecialistSelect(e) {
    setError("");
    setSpecialistSelected(function (prevState) {
      return __spreadArray(__spreadArray([], prevState, true), [e], false);
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Select, {
    initial: {
      x: -10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 10,
      opacity: 0
    }
  }, loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "Ajouter spécialiste"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-label m-0 mb-2"
  }, "Ajouter sp\xE9cialiste"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      boxShadow: "rgb(227, 232, 238) 0px -1px inset",
      width: "100%",
      height: "1px",
      marginTop: "-1px",
      marginLeft: "-22px"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("fieldset", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, !chooseExisting && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_6__.motion.div, {
    initial: {
      x: 10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: -10,
      opacity: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Nom sp\xE9cialiste", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: function onChange(e) {
      setName(e.target.value);
      setError("");
    },
    defaultValue: name,
    type: "text",
    name: "name",
    required: true,
    placeholder: "Nom du sp\xE9cialiste",
    className: "form-control"
  })), chooseExisting && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_6__.motion.div, {
    initial: {
      x: -10,
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: 10,
      opacity: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Rechercher existant", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_2__["default"], {
    classes: "service-form",
    multiple: false,
    selectedValue: undefined,
    onSearch: function onSearch(e) {},
    searchKeys: {
      id: 'id',
      text: ['name']
    },
    searchUrl: "/api/dashboard/service/".concat(props.service.id, "/search_specialist"),
    onSelect: handleSpecialistSelect,
    searchable: true,
    placeholder: "Nom du sp\xE9cialiste",
    id: "sname"
  }))), specialistSelected.length > 0 && chooseExisting && specialistSelectedList(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "ou ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Link, {
    to: "#",
    onClick: function onClick() {
      return setChooseExisting(function (prevState) {
        return !prevState;
      });
    }
  }, !chooseExisting ? "choisir existant" : "taper un nouveau")), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "text-danger",
    style: {
      fontSize: "13px"
    }
  }, error)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      boxShadow: "rgb(227, 232, 238) 0px -1px inset",
      width: "100%",
      height: "1px",
      marginTop: ".5em",
      marginBottom: ".5em"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Choisir prestataire"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_2__["default"], {
    classes: "service-form",
    multiple: false,
    selectedValue: undefined,
    onSearch: function onSearch(e) {},
    searchKeys: {
      id: 'id',
      text: ['name']
    },
    searchUrl: '/api/dashboard/provider/search',
    onSelect: handleProviderSelect,
    searchable: true,
    placeholder: "Nom du prestataire",
    id: "pname"
  }), providerSelected(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-3 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "btn btn-primary btn-sm"
  }, "Enregistrer"))));
};
var List = styled_components__WEBPACK_IMPORTED_MODULE_8__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    label{\n        border: ", ";\n        padding: ", ";\n        border-radius: ", ";\n        margin: 0;\n    }\n    .tags{\n        margin: 1rem 0 2rem;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n        font-size: 0.9375rem;\n        max-height: 40rem;\n        overflow: auto;\n        background: #fcfcfc;\n        border-top: none;\n        margin-top: 0!important;\n        border-radius: 0 0 3px 3px;\n        padding: .5rem!important;\n        max-height: 62px;\n        padding-top: 0!important;\n        position: relative;\n        overflow: hidden;\n        &:after{\n            position: absolute;\n            content: \"Voir plus\"\n            font-size: 12px;\n        }\n        &:before{\n            position: absolute;\n            content: \"\"\n            width: 100%;\n            height: 5px;\n            background: \"#000\";\n        }\n    }\n"], ["\n    label{\n        border: ", ";\n        padding: ", ";\n        border-radius: ", ";\n        margin: 0;\n    }\n    .tags{\n        margin: 1rem 0 2rem;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n        font-size: 0.9375rem;\n        max-height: 40rem;\n        overflow: auto;\n        background: #fcfcfc;\n        border-top: none;\n        margin-top: 0!important;\n        border-radius: 0 0 3px 3px;\n        padding: .5rem!important;\n        max-height: 62px;\n        padding-top: 0!important;\n        position: relative;\n        overflow: hidden;\n        &:after{\n            position: absolute;\n            content: \"Voir plus\"\n            font-size: 12px;\n        }\n        &:before{\n            position: absolute;\n            content: \"\"\n            width: 100%;\n            height: 5px;\n            background: \"#000\";\n        }\n    }\n"])), function (props) {
  return props.haveItem ? "1px solid rgba(0, 40, 100, 0.12)" : "none";
}, function (props) {
  return props.haveItem ? ".5rem" : 0;
}, function (props) {
  return props.haveItem ? "3px 3px 0 0" : 0;
});
var Select = (0,styled_components__WEBPACK_IMPORTED_MODULE_8__["default"])(framer_motion__WEBPACK_IMPORTED_MODULE_6__.motion.div)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"], ["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"])));
var templateObject_1, templateObject_2;

/***/ }),

/***/ "./resources/js/components/utils/BrowserTitle.tsx":
/*!********************************************************!*\
  !*** ./resources/js/components/utils/BrowserTitle.tsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var BrowserTitle = function BrowserTitle(props) {
  var title = "Global communication";
  document.title = "".concat(props.title, " | ").concat(title);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BrowserTitle);

/***/ }),

/***/ "./resources/js/components/utils/Restricted.tsx":
/*!******************************************************!*\
  !*** ./resources/js/components/utils/Restricted.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Popup */ "./resources/js/components/utils/Popup.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _BrowserTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BrowserTitle */ "./resources/js/components/utils/BrowserTitle.tsx");
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




var PermissionWrapper = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n"], ["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    height: 100%;\n"])));
var ImgWrapper = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    width: 300px;\n"], ["\n    width: 300px;\n"])));
var BackButton = styled_components__WEBPACK_IMPORTED_MODULE_3__["default"].button(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    border: none;\n    background: none;\n"], ["\n    border: none;\n    background: none;\n"])));
var Restricted = function Restricted(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onPopupClose: function onPopupClose() {},
    parentId: 20943,
    closable: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BrowserTitle__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Permission denied"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(PermissionWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ImgWrapper, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "/images/fingerprint-animate.svg",
    alt: ""
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx-auto text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Acc\xE8s refus\xE9"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "D\xE9sol\xE9, vous ne disposez pas des autorisations n\xE9cessaires pour acc\xE9der \xE0 cette page."))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Restricted);
var templateObject_1, templateObject_2, templateObject_3;

/***/ })

}]);