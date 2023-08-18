"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_Provider_tsx"],{

/***/ "./resources/js/components/admin/Provider.tsx":
/*!****************************************************!*\
  !*** ./resources/js/components/admin/Provider.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/BrowserTitle */ "./resources/js/components/utils/BrowserTitle.tsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var _context_AccountContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../context/AccountContext */ "./resources/js/context/AccountContext.tsx");
/* harmony import */ var _utils_Restricted__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/Restricted */ "./resources/js/components/utils/Restricted.tsx");
/* harmony import */ var _providers_Edit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./providers/Edit */ "./resources/js/components/admin/providers/Edit.tsx");
/* harmony import */ var _providers_Add__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./providers/Add */ "./resources/js/components/admin/providers/Add.tsx");
/* harmony import */ var _context_ProviderContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../context/ProviderContext */ "./resources/js/context/ProviderContext.tsx");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _providers_AddSpecialist__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./providers/AddSpecialist */ "./resources/js/components/admin/providers/AddSpecialist.tsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _providers_AddressChange__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./providers/AddressChange */ "./resources/js/components/admin/providers/AddressChange.tsx");
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













var status = {
  "active": "Actif",
  "disabled": "Désactivé",
  "inactive": "Inactif",
  "pending": "En attente"
};
var Provider = function Provider(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    paginate = _a[0],
    setPaginate = _a[1],
    user = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AccountContext__WEBPACK_IMPORTED_MODULE_4__["default"]).user,
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_ProviderContext__WEBPACK_IMPORTED_MODULE_8__["default"]),
    providers = _b.providers,
    dispatch = _b.dispatch,
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    busy = _c[0],
    setBusy = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    addressChange = _d[0],
    setAddressChange = _d[1],
    _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showEdit = _e[0],
    setShowEdit = _e[1],
    _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showAddSpecialist = _f[0],
    setShowAddSpecialist = _f[1],
    _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showAdd = _g[0],
    setShowAdd = _g[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    axios__WEBPACK_IMPORTED_MODULE_2___default().get("/api/dashboard/providers").then(function (rep) {
      var data = __assign({}, rep.data);
      dispatch({
        type: "SET_PROVIDERS",
        payload: data.data
      });
      delete data.data;
      setPaginate(data);
      setBusy(false);
    });
  }, []);
  var handleDisableEnable = function handleDisableEnable(e, action) {
    var provider = providers[e];
    var url = action === "disable" ? "disable" : "activate";
    setBusy(true);
    axios__WEBPACK_IMPORTED_MODULE_2___default().post("/api/dashboard/provider/".concat(provider.id, "/").concat(url)).then(function (rep) {
      dispatch({
        type: "ENABLE_DISABLE",
        payload: {
          index: e,
          status: action === "disable" ? "inactive" : "active"
        }
      });
      setBusy(false);
    });
  };
  var setAddSpeciality = function setAddSpeciality(key) {
    setShowAddSpecialist(providers[key]);
  };
  var handleSendVerificationEmail = function handleSendVerificationEmail(user) {
    setBusy(true);
    axios__WEBPACK_IMPORTED_MODULE_2___default().post("/api/dashboard/resend-verification", {
      user: user
    }).then(function (rep) {
      react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.success(rep.data.msg);
      setBusy(false);
    });
  };
  var handlePasswordReset = function handlePasswordReset(user) {
    axios__WEBPACK_IMPORTED_MODULE_2___default().post("/api/dashboard/reset-password", {
      email: user
    }).then(function (rep) {
      return react_toastify__WEBPACK_IMPORTED_MODULE_11__.toast.success("Un lien de restauration à été envoyé.");
    });
  };
  if (user.provider_id) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Restricted__WEBPACK_IMPORTED_MODULE_5__["default"], null);
  if (busy && (!providers.length || !paginate)) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  if (!providers.length) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "row",
    style: {
      height: "100vh",
      alignItems: "center"
    }
  }, showAdd && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_providers_Add__WEBPACK_IMPORTED_MODULE_7__["default"], {
    onClose: function onClose() {
      return setShowAdd(undefined);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "col-12",
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Il n'y a pas encore de prestataire"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: function onClick() {
      return setShowAdd(true);
    },
    className: "btn btn-outline-primary btn-sm ms-auto"
  }, "Ajouter prestataire")));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_1__["default"], {
    title: "Prestataires"
  }), busy && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_3__["default"], null), showEdit !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_providers_Edit__WEBPACK_IMPORTED_MODULE_6__["default"], {
    provider: showEdit,
    onClose: function onClose() {
      return setShowEdit(undefined);
    }
  }), addressChange !== undefined && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_providers_AddressChange__WEBPACK_IMPORTED_MODULE_12__["default"], {
    provider: addressChange,
    onClose: function onClose() {
      return setAddressChange(undefined);
    }
  }), showAddSpecialist && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_providers_AddSpecialist__WEBPACK_IMPORTED_MODULE_10__["default"], {
    provider: showAddSpecialist,
    onClose: function onClose() {
      return setShowAddSpecialist(undefined);
    },
    service: showAddSpecialist
  }), showAdd && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_providers_Add__WEBPACK_IMPORTED_MODULE_7__["default"], {
    onClose: function onClose() {
      return setShowAdd(undefined);
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    className: "card-title"
  }, "Prestataires"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: function onClick() {
      return setShowAdd(true);
    },
    className: "btn btn-outline-primary btn-sm ms-auto"
  }, "Ajouter prestataire")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    id: "DataTables_Table_0_wrapper",
    className: "dataTables_wrapper no-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    id: "DataTables_Table_0_filter",
    className: "dataTables_filter mt-2 mb-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "search",
    className: "",
    placeholder: "Rechercher",
    "aria-controls": "DataTables_Table_0"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("table", {
    className: "table card-table table-vcenter text-nowrap datatable dataTable no-footer",
    id: "DataTables_Table_0",
    role: "grid",
    "aria-describedby": "DataTables_Table_0_info"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", {
    role: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "w-1 sorting_asc",
    tabIndex: 0,
    "aria-controls": "DataTables_Table_0",
    rowSpan: 1,
    colSpan: 1,
    "aria-sort": "ascending",
    "aria-label": "No.: activate to sort column descending",
    style: {
      width: "44.7344px"
    }
  }, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "sorting",
    tabIndex: 0,
    "aria-controls": "DataTables_Table_0",
    rowSpan: 1,
    colSpan: 1,
    "aria-label": "Invoice Subject: activate to sort column ascending",
    style: {
      width: "171.727px"
    }
  }, "Nom"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "sorting",
    tabIndex: 0,
    "aria-controls": "DataTables_Table_0",
    rowSpan: 1,
    colSpan: 1,
    "aria-label": "Client: activate to sort column ascending",
    style: {
      width: "131.039px"
    }
  }, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "sorting",
    tabIndex: 0,
    "aria-controls": "DataTables_Table_0",
    rowSpan: 1,
    colSpan: 1,
    "aria-label": "VAT No.: activate to sort column ascending",
    style: {
      width: "81.852px"
    }
  }, "Phone"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "sorting",
    tabIndex: 0,
    "aria-controls": "DataTables_Table_0",
    rowSpan: 1,
    colSpan: 1,
    "aria-label": "Created: activate to sort column ascending",
    style: {
      width: "171.812px"
    }
  }, "Adresse"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "no-sorting",
    tabIndex: 0,
    "aria-controls": "DataTables_Table_0",
    rowSpan: 1,
    colSpan: 1,
    "aria-label": "Status: activate to sort column ascending",
    style: {
      width: "81.297px"
    }
  }, "Statut"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    tabIndex: 0,
    className: "no-sort",
    "aria-controls": "DataTables_Table_0",
    rowSpan: 1,
    colSpan: 1,
    "aria-label": ": activate to sort column ascending",
    style: {
      width: "81px"
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tbody", null, providers.map(function (rep, key) {
    var colors = {
      "pending": "secondary",
      "active": "primary",
      "disabled": "danger",
      "inactive": "warning"
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", {
      key: key,
      role: "row",
      className: "odd"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "sorting_1"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "text-muted"
    }, key + 1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      title: rep.name,
      className: "text-inherit"
    }, lodash__WEBPACK_IMPORTED_MODULE_9___default().truncate(rep.name, {
      'length': 24
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, rep.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, rep.phone), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, rep.address_line_1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "status-icon bg-".concat(colors[rep.status])
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "text-".concat(colors[rep.status])
    }, status[rep.status])), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return setShowEdit(key);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-edit-2"
    }), " Modifier"), rep.status === "active" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return handleDisableEnable(key, "disable");
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-lock"
    }), " D\xE9sactiver"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return setAddressChange(__assign(__assign({}, rep), {
          index: key
        }));
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-home"
    }), " Changer l'adresse"), rep.status === "active" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return handlePasswordReset(rep.email);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-shield"
    }), " Restaurer password"), (rep.status === "inactive" || rep.status === "disabled") && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return handleDisableEnable(key, "enable");
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-lock"
    }), " Activer"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return setAddSpeciality(key);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-git-pull-request"
    }), " Lier sp\xE9cialit\xE9"), rep.status === "pending" && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
      className: "dropdown-divider"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return handleSendVerificationEmail(rep.id);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-edit-2"
    }), " Renvoyer email verification"))))));
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "dataTables_paginate paging_simple_numbers",
    id: "DataTables_Table_0_paginate"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "paginate_button previous",
    disabled: !paginate.prev_page_url,
    "aria-controls": "DataTables_Table_0",
    "data-dt-idx": 0,
    tabIndex: 0,
    id: "DataTables_Table_0_previous"
  }, "Pr\xE9c\xE9dente"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "paginate_button next",
    disabled: !paginate.next_page_url,
    "aria-controls": "DataTables_Table_0",
    "data-dt-idx": "3",
    tabIndex: 0,
    id: "DataTables_Table_0_next"
  }, "Suivante")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Provider);

/***/ }),

/***/ "./resources/js/components/admin/providers/Add.tsx":
/*!*********************************************************!*\
  !*** ./resources/js/components/admin/providers/Add.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Popup */ "./resources/js/components/utils/Popup.tsx");
/* harmony import */ var react_input_mask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-input-mask */ "./node_modules/react-input-mask/index.js");
/* harmony import */ var react_input_mask__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_input_mask__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_Restricted__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Restricted */ "./resources/js/components/utils/Restricted.tsx");
/* harmony import */ var _context_AccountContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/AccountContext */ "./resources/js/context/AccountContext.tsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _utils_DragAndDrop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/DragAndDrop */ "./resources/js/components/utils/DragAndDrop.tsx");
/* harmony import */ var _utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/form-components/Select2 */ "./resources/js/components/utils/form-components/Select2.tsx");
/* harmony import */ var _context_ProviderContext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../context/ProviderContext */ "./resources/js/context/ProviderContext.tsx");
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
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













var Container = styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    @media all and (max-width: 768px){\n        flex-direction: column;\n    }\n"], ["\n    display: flex;\n    @media all and (max-width: 768px){\n        flex-direction: column;\n    }\n"])));
var Uploader = styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    flex-basis: 350px;\n    align-self: center;\n    margin-top: -3em;\n    @media all and (max-width: 768px){\n        flex-basis: auto;\n        align-self: auto;\n        margin-top: 0;\n    }\n"], ["\n    flex-basis: 350px;\n    align-self: center;\n    margin-top: -3em;\n    @media all and (max-width: 768px){\n        flex-basis: auto;\n        align-self: auto;\n        margin-top: 0;\n    }\n"])));
var Contents = styled_components__WEBPACK_IMPORTED_MODULE_12__["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    flex: 3;\n"], ["\n    flex: 3;\n"])));
var fileTypes = ["JPG", "PNG", "GIF", "JPEG", 'SVG'];
var Add = function Add(props) {
  var user = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AccountContext__WEBPACK_IMPORTED_MODULE_6__["default"]).user,
    dispatch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_ProviderContext__WEBPACK_IMPORTED_MODULE_10__["default"]).dispatch,
    _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    logo = _a[0],
    setLogo = _a[1],
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    email = _b[0],
    setEmail = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    sendNotificationTo = _c[0],
    setSendNotificationTo = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    uniqueEmail = _d[0],
    setUniqueEmail = _d[1],
    _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    busy = _e[0],
    setBusy = _e[1];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    form["delete"]('logoFile');
    if (logo) form.append("logoFile", logo[0]);
    setBusy(true);
    axios__WEBPACK_IMPORTED_MODULE_4___default().post("/api/dashboard/provider", form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(function (rep) {
      setBusy(false);
      react_toastify__WEBPACK_IMPORTED_MODULE_7__.toast.success("Vos données ont été enregistrées!");
      dispatch({
        type: "ADD_PROVIDER",
        payload: rep.data.created
      });
      props.onClose();
    });
  };
  var checkEmail = function checkEmail(e) {
    if (e.target.value.trim() === "") return;
    setUniqueEmail(true);
    axios__WEBPACK_IMPORTED_MODULE_4___default().get("/api/dashboard/checkByEmail", {
      params: {
        email: e.target.value
      }
    }).then(function (rep) {
      var _a, _b;
      if (((_a = rep.data) === null || _a === void 0 ? void 0 : _a.status) && ((_b = rep.data) === null || _b === void 0 ? void 0 : _b.status) === "error") {
        setUniqueEmail(false);
        setEmail(undefined);
      } else {
        setEmail(e.target.value.trim());
      }
    });
  };
  if (user.provider_id) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Restricted__WEBPACK_IMPORTED_MODULE_5__["default"], null);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onPopupClose: function onPopupClose() {
      return typeof props.onClose === "function" ? props.onClose() : undefined;
    },
    parentId: "2434sgs"
  }, busy && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_11__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    action: "",
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Container, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Uploader, {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_DragAndDrop__WEBPACK_IMPORTED_MODULE_8__["default"], {
    previousImage: undefined,
    styles: {
      minHeight: '200px'
    },
    labelTitle: "Selectionner ou drager logo",
    fileTypes: fileTypes,
    maxMBSize: 1,
    handleChange: function handleChange(e) {
      console.log(e);
    },
    name: "logoFile",
    onFinished: function onFinished(files) {
      return setLogo(files);
    }
  }), email && uniqueEmail && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-check text-left px-3",
    style: {
      marginTop: "40px"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    defaultChecked: sendNotificationTo,
    onChange: function onChange(e) {
      return setSendNotificationTo(e.target.checked);
    },
    className: "form-check-input",
    type: "checkbox",
    value: "",
    id: "sendNotif",
    style: {
      marginLeft: "0"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-check-label text-primary",
    style: {
      fontStyle: "13px",
      padding: "0 20px"
    },
    htmlFor: "sendNotif"
  }, "Envoyer notification \xE0 ", email, "?"), !sendNotificationTo && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_input_mask__WEBPACK_IMPORTED_MODULE_2___default()), {
    type: "email",
    defaultValue: email,
    name: "notification-email",
    placeholder: "e.g. email@vighor.com",
    style: {
      marginTop: "1em"
    },
    required: true,
    className: "form-control",
    mask: ""
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Contents, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("fieldset", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Nom", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    name: "name",
    required: true,
    placeholder: "Nom du prestataire",
    className: "form-control"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Abr\xE9viation", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    name: "name_short",
    required: true,
    placeholder: "Abr\xE9viation prestataire",
    className: "form-control"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Email", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_input_mask__WEBPACK_IMPORTED_MODULE_2___default()), {
    type: "email",
    onChange: (0,lodash__WEBPACK_IMPORTED_MODULE_3__.debounce)(checkEmail, 1500),
    name: "email",
    placeholder: "e.g. email@vighor.com",
    required: true,
    className: "form-control".concat(!uniqueEmail ? " is-invalid" : ""),
    mask: ""
  }), !uniqueEmail && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "text-danger"
  }, "Cet email n'est pas disponible.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Phone number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_input_mask__WEBPACK_IMPORTED_MODULE_2___default()), {
    type: "tel",
    name: "phone",
    required: true,
    mask: "9999-9999",
    maskPlaceholder: null,
    placeholder: "e.g. 3700-0000",
    className: "form-control"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("fieldset", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Adresse", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    name: "address_line_1",
    required: true,
    placeholder: "e.g. 2, Delmas 19",
    className: "form-control"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Ville", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_9__["default"], {
    classes: "dashboard-select2",
    multiple: false,
    onSearch: function onSearch(e) {},
    searchKeys: {
      id: 'id',
      text: ['name']
    },
    searchUrl: "/api/city/search",
    selectedValue: undefined,
    onSelect: undefined,
    searchable: true,
    name: "city",
    placeholder: "e.g. Delmas",
    id: "city"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-right p-0 pt-2 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit",
    disabled: !uniqueEmail,
    className: "btn btn-primary ml-auto"
  }, "Enregistrer")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Add);
var templateObject_1, templateObject_2, templateObject_3;

/***/ }),

/***/ "./resources/js/components/admin/providers/AddSpecialist.tsx":
/*!*******************************************************************!*\
  !*** ./resources/js/components/admin/providers/AddSpecialist.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/form-components/Select2 */ "./resources/js/components/utils/form-components/Select2.tsx");
/* harmony import */ var _utils_Popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Popup */ "./resources/js/components/utils/Popup.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
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







var AddSpecialist = function AddSpecialist(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    specialistSelected = _a[0],
    setSpecialistSelected = _a[1],
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    error = _b[0],
    setError = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var handleSpecialistSelect = function handleSpecialistSelect(e) {
    setError("");
    setSpecialistSelected(function (prevState) {
      return __spreadArray(__spreadArray([], prevState, true), [e], false);
    });
  };
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var form = new FormData();
    var id = [];
    setIsLoading(true);
    specialistSelected.map(function (specialist) {
      id = __spreadArray(__spreadArray([], id, true), [specialist.id], false);
      form.append("specialists[]", specialist.id);
    });
    axios__WEBPACK_IMPORTED_MODULE_4___default().post("/api/dashboard/provider/".concat(props.provider.id, "/add-specialist"), form).then(function (rep) {
      if (rep.data.status === "success") {
        react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success(rep.data.msg);
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error(rep.data.msg);
      }
      setIsLoading(false);
      props.onClose();
    });
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
  if (isLoading) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_2__["default"], {
    onPopupClose: function onPopupClose() {
      return typeof props.onClose === "function" ? props.onClose() : undefined;
    },
    isSmall: true,
    parentId: "24341123"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Ajouter sp\xE9cialit\xE9 pour ", props.provider.name_short), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Select, {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Rechercher sp\xE9cialist", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_1__["default"], {
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
  })), specialistSelected.length > 0 && specialistSelectedList(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-3 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    disabled: !specialistSelected.length,
    onClick: handleSubmit,
    className: "btn btn-primary btn-sm"
  }, "Enregistrer")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddSpecialist);
var Select = styled_components__WEBPACK_IMPORTED_MODULE_6__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin-top: 30px;\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"], ["\n    margin-top: 30px;\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"])));
var templateObject_1;

/***/ }),

/***/ "./resources/js/components/admin/providers/AddressChange.tsx":
/*!*******************************************************************!*\
  !*** ./resources/js/components/admin/providers/AddressChange.tsx ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Popup */ "./resources/js/components/utils/Popup.tsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_Restricted__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/Restricted */ "./resources/js/components/utils/Restricted.tsx");
/* harmony import */ var _context_AccountContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../context/AccountContext */ "./resources/js/context/AccountContext.tsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _context_ProviderContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../context/ProviderContext */ "./resources/js/context/ProviderContext.tsx");
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var _utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/form-components/Select2 */ "./resources/js/components/utils/form-components/Select2.tsx");









var AddressChange = function AddressChange(props) {
  var user = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AccountContext__WEBPACK_IMPORTED_MODULE_4__["default"]).user,
    _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_ProviderContext__WEBPACK_IMPORTED_MODULE_6__["default"]),
    providers = _a.providers,
    dispatch = _a.dispatch,
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    busy = _b[0],
    setBusy = _b[1];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    form.append("_method", "PUT");
    setBusy(true);
    axios__WEBPACK_IMPORTED_MODULE_2___default().post("/api/dashboard/provider/".concat(props.provider.id, "/change-address"), form).then(function (rep) {
      dispatch({
        type: "EDIT_PROVIDER",
        payload: {
          index: props.provider.index,
          update: rep.data.update
        }
      });
      react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.success("Vos données ont été mis à jours!");
      setBusy(false);
      props.onClose();
    })["catch"](function (error) {
      react_toastify__WEBPACK_IMPORTED_MODULE_5__.toast.error(error.response.data.message);
      setBusy(false);
      props.onClose();
    });
  };
  if (user.provider_id) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Restricted__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onPopupClose: function onPopupClose() {
      return typeof props.onClose === "function" ? props.onClose() : undefined;
    },
    title: "Changement d'adresse",
    isSmall: true,
    parentId: "24634sgs"
  }, busy && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    action: "",
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("fieldset", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Adresse", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    name: "address_line_1",
    required: true,
    placeholder: "Nom du prestataire",
    defaultValue: props.provider.address_line_1,
    className: "form-control"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("fieldset", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Ville", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_8__["default"], {
    classes: "dashboard-select2",
    multiple: false,
    onSearch: function onSearch(e) {},
    searchKeys: {
      id: 'id',
      text: ['name']
    },
    searchUrl: "/api/city/search?all=true",
    selectedValue: undefined,
    onSelect: undefined,
    searchable: true,
    name: "city",
    placeholder: "e.g. Delmas",
    id: "city"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card-footer text-right p-0 pt-2 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit",
    className: "btn btn-primary ml-auto"
  }, "Mettre \xE0 jour")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddressChange);

/***/ }),

/***/ "./resources/js/components/admin/providers/Edit.tsx":
/*!**********************************************************!*\
  !*** ./resources/js/components/admin/providers/Edit.tsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/Popup */ "./resources/js/components/utils/Popup.tsx");
/* harmony import */ var react_input_mask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-input-mask */ "./node_modules/react-input-mask/index.js");
/* harmony import */ var react_input_mask__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_input_mask__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_Restricted__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Restricted */ "./resources/js/components/utils/Restricted.tsx");
/* harmony import */ var _context_AccountContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../context/AccountContext */ "./resources/js/context/AccountContext.tsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _context_ProviderContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../context/ProviderContext */ "./resources/js/context/ProviderContext.tsx");
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_9__);










var Edit = function Edit(props) {
  var user = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AccountContext__WEBPACK_IMPORTED_MODULE_5__["default"]).user,
    _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_ProviderContext__WEBPACK_IMPORTED_MODULE_7__["default"]),
    providers = _a.providers,
    dispatch = _a.dispatch,
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    email = _b[0],
    setEmail = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    uniqueEmail = _c[0],
    setUniqueEmail = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    busy = _d[0],
    setBusy = _d[1];
  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    var form = new FormData(e.target);
    if (email && email.trim().length) form.append("email", email);
    form.append("_method", "PUT");
    setBusy(true);
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/provider/".concat(providers[props.provider].id), form).then(function (rep) {
      dispatch({
        type: "EDIT_PROVIDER",
        payload: {
          index: props.provider,
          update: rep.data.update
        }
      });
      react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.success("Vos données ont été mis à jours!");
      setBusy(false);
      props.onClose();
    });
  };
  var checkEmail = function checkEmail(e) {
    if (e.target.value.trim() === "") return;
    setUniqueEmail(true);
    axios__WEBPACK_IMPORTED_MODULE_3___default().get("/api/dashboard/checkByEmail", {
      params: {
        email: e.target.value
      }
    }).then(function (rep) {
      var _a, _b;
      if (((_a = rep.data) === null || _a === void 0 ? void 0 : _a.status) && ((_b = rep.data) === null || _b === void 0 ? void 0 : _b.status) === "error" && rep.data.data.email !== providers[props.provider].email) {
        setEmail(undefined);
        setUniqueEmail(false);
      } else {
        setEmail(e.target.value.trim());
      }
    });
  };
  if (user.provider_id) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Restricted__WEBPACK_IMPORTED_MODULE_4__["default"], null);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onPopupClose: function onPopupClose() {
      return typeof props.onClose === "function" ? props.onClose() : undefined;
    },
    isSmall: true,
    parentId: "2434sgs"
  }, busy && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    action: "",
    onSubmit: handleSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("fieldset", {
    className: "mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Nom", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    name: "name",
    required: true,
    placeholder: "Nom du prestataire",
    defaultValue: providers[props.provider].name,
    className: "form-control"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Abr\xE9viation", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "text",
    name: "name_short",
    required: true,
    placeholder: "Abr\xE9viation prestataire",
    defaultValue: providers[props.provider].name_short,
    className: "form-control"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Email", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_input_mask__WEBPACK_IMPORTED_MODULE_2___default()), {
    type: "email",
    name: "email",
    onChange: (0,lodash__WEBPACK_IMPORTED_MODULE_9__.debounce)(checkEmail, 1500),
    placeholder: "e.g. email@vighor.com",
    required: true,
    className: "form-control",
    defaultValue: email ? email : providers[props.provider].email,
    mask: ""
  }), !uniqueEmail && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "text-danger"
  }, "Cet email n'est pas disponible.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Phone number"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement((react_input_mask__WEBPACK_IMPORTED_MODULE_2___default()), {
    type: "tel",
    name: "phone",
    disabled: !uniqueEmail,
    required: true,
    mask: "9999-9999",
    maskPlaceholder: null,
    placeholder: "e.g. 3700-0000",
    className: "form-control",
    defaultValue: providers[props.provider].phone
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card-footer text-right p-0 pt-2 mt-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "submit",
    className: "btn btn-primary ml-auto"
  }, "Mettre \xE0 jour")))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./resources/js/components/utils/DragAndDrop.tsx":
/*!*******************************************************!*\
  !*** ./resources/js/components/utils/DragAndDrop.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
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


var DragOverBounce = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__.keyframes)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% {\n    transform: scale(1, 1);\n  }\n  50% {\n    transform: scale(1.5, 1.5);\n  }\n  100% {\n    transform: scale(1, 1);\n  }\n"], ["\n  0% {\n    transform: scale(1, 1);\n  }\n  50% {\n    transform: scale(1.5, 1.5);\n  }\n  100% {\n    transform: scale(1, 1);\n  }\n"])));
var Label = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].label(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    position: relative;\n    align-items: center;\n    background: none;\n    border: none;\n    justify-content: center;\n    flex-direction: row;\n    width: 100%;\n    min-height: 100px;\n    border-radius: 5px;\n    border: none;\n    transition: background-color 160ms ease, border-color 400ms ease;\n    cursor: pointer;\n    &.DragOver{\n        animation: ", " 1s ease infinite;\n        img{\n            transform: scale(1.2);\n        }\n    }\n    img{\n        width: 50%;\n        transition: .3s ease;\n    }\n"], ["\n    display: flex;\n    position: relative;\n    align-items: center;\n    background: none;\n    border: none;\n    justify-content: center;\n    flex-direction: row;\n    width: 100%;\n    min-height: 100px;\n    border-radius: 5px;\n    border: none;\n    transition: background-color 160ms ease, border-color 400ms ease;\n    cursor: pointer;\n    &.DragOver{\n        animation: ", " 1s ease infinite;\n        img{\n            transform: scale(1.2);\n        }\n    }\n    img{\n        width: 50%;\n        transition: .3s ease;\n    }\n"])), DragOverBounce);
var Illustration = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    width: 55%;\n    position: absolute;\n    height: 100%;\n    background: url(/images/dots--uploads.svg) no-repeat center;\n    background-size: cover;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transition: .3s ease;\n    margin-left: auto;\n    margin-right: auto;\n    @media all and (max-width: 768px){\n        width: 35%;\n    }\n"], ["\n    width: 55%;\n    position: absolute;\n    height: 100%;\n    background: url(/images/dots--uploads.svg) no-repeat center;\n    background-size: cover;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    transition: .3s ease;\n    margin-left: auto;\n    margin-right: auto;\n    @media all and (max-width: 768px){\n        width: 35%;\n    }\n"])));
var Hints = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    margin-top: 8px;\n    position: absolute;\n    bottom: -20px;\n    transition: .3s ease;\n    text-align: center;\n    p{\n        margin-bottom: 0.5rem;\n        line-height: 0;\n        transition: .3s ease;\n    }\n    span{\n        color: #6c757d;\n        font-size: 14px;\n    }\n"], ["\n    margin-top: 8px;\n    position: absolute;\n    bottom: -20px;\n    transition: .3s ease;\n    text-align: center;\n    p{\n        margin-bottom: 0.5rem;\n        line-height: 0;\n        transition: .3s ease;\n    }\n    span{\n        color: #6c757d;\n        font-size: 14px;\n    }\n"])));
var DragAndDrop = function DragAndDrop(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    dragOver = _a[0],
    setDragOver = _a[1];
  var _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(undefined),
    uploaded = _b[0],
    setUploaded = _b[1];
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (props.previousImage && ref.current) ref.current.src = props.previousImage;
  }, []);
  var _onDrop = function onDrop(event) {
    event.preventDefault();
    var files = event.dataTransfer.files;
    setUploaded(files.length);
    setDragOver(false);
    readURL(event.dataTransfer);
    if (typeof props.onFinished === 'function') props.onFinished(files);
  };
  var handleInputChange = function handleInputChange(event) {
    var files = event.target.files;
    setUploaded(files.length);
    readURL(event.target);
    if (typeof props.onFinished === 'function') props.onFinished(files);
  };
  var _onDragOver = function onDragOver(event) {
    event.preventDefault();
    setDragOver(true);
  };
  var startDrag = function startDrag(event) {
    event.preventDefault();
  };
  var id = Math.random().toString(36).substring(7);
  var styles = __assign({
    minHeight: '150px'
  }, props.styles);
  var readURL = function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      var src_1 = undefined;
      reader.onload = function (e) {
        src_1 = e.target.result;
        if (ref.current) ref.current.src = src_1;
        if (props && props._base64 && typeof props._base64 === 'function') props._base64(src_1);
      };
      reader.readAsDataURL(input.files[0]);
      return src_1;
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Label, {
    htmlFor: id,
    className: "d-flex flex-column drag-and-drop".concat(dragOver ? ' DragOver' : ''),
    style: styles,
    onDragOver: function onDragOver(e) {
      return _onDragOver(e);
    },
    onDragLeave: function onDragLeave() {
      return setDragOver(false);
    },
    onDrop: function onDrop(e) {
      return _onDrop(e);
    },
    onChange: function onChange(e) {
      return handleInputChange(e);
    },
    onDragStart: function onDragStart(e) {
      return startDrag(e);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "file",
    multiple: props.multiple,
    name: props.name,
    id: id,
    accept: fileTypes(props.fileTypes),
    style: {
      position: 'absolute',
      left: '-300px',
      opacity: '0'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Illustration, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "d-block",
    style: {
      width: "210px",
      zIndex: "-1",
      textAlign: "center"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    ref: ref,
    src: "/images/upload--inner.png",
    alt: ""
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Hints, null, !dragOver && !uploaded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, props.labelTitle ? props.labelTitle : 'Select or drop file here'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, props.fileTypes.join(', '), " ", props.maxMBSize ? " up to ".concat(props.maxMBSize, "MB") : '')), uploaded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "".concat(uploaded, " file").concat(uploaded > 1 ? 's' : '', " selected")), !uploaded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, props.fileTypes.join(', '), " ", props.maxMBSize ? " up to ".concat(props.maxMBSize, "MB") : '')), dragOver && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      marginTop: '1.2em'
    }
  }, "Drop your here")));
};
var fileTypes = function fileTypes(filesType) {
  var extensions = {
    "jpg": 'image',
    "png": 'image',
    "gif": 'image',
    "jpeg": 'image',
    "svg": 'image'
  };
  var accepts = [];
  filesType.forEach(function (type) {
    if (extensions[type.toLowerCase()]) {
      accepts.push("".concat(extensions[type.toLowerCase()], "/").concat(type));
    }
  });
  return accepts.join(', ');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DragAndDrop);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

/***/ })

}]);