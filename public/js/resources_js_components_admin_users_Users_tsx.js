"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_users_Users_tsx"],{

/***/ "./resources/js/components/admin/users/Users.tsx":
/*!*******************************************************!*\
  !*** ./resources/js/components/admin/users/Users.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _context_UserContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/UserContext */ "./resources/js/context/UserContext.tsx");
/* harmony import */ var _context_AccountContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../context/AccountContext */ "./resources/js/context/AccountContext.tsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/BrowserTitle */ "./resources/js/components/utils/BrowserTitle.tsx");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment_moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_Popup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/Popup */ "./resources/js/components/utils/Popup.tsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/form-components/Select2 */ "./resources/js/components/utils/form-components/Select2.tsx");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
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












moment_moment__WEBPACK_IMPORTED_MODULE_7___default().locale('fr');
var Users = function Users(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_UserContext__WEBPACK_IMPORTED_MODULE_1__["default"]),
    users = _a.users,
    dispatch = _a.dispatch,
    user = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AccountContext__WEBPACK_IMPORTED_MODULE_2__["default"]).user,
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    name = _b[0],
    setName = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    email = _c[0],
    setEmail = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    uniqueEmail = _d[0],
    setUniqueEmail = _d[1],
    _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showAdd = _e[0],
    setShowAdd = _e[1],
    _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    linkToProvider = _f[0],
    setLinkToProvider = _f[1],
    _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    showLinkToProviderOption = _g[0],
    setShowLinkToProviderOption = _g[1],
    _h = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    loading = _h[0],
    setLoading = _h[1],
    _j = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    providerSelected = _j[0],
    setProviderSelected = _j[1],
    _k = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    saving = _k[0],
    setSaving = _k[1];
  var getData = function getData() {
    axios__WEBPACK_IMPORTED_MODULE_3___default().get("/api/dashboard/users").then(function (rep) {
      var data = __spreadArray([], rep.data.data, true);
      dispatch({
        type: "ADD_USERS",
        payload: data
      });
      setLoading(false);
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (user.provider_id) return;
    getData();
  }, []);
  var checkEmail = function checkEmail(e) {
    if (e.target.value.trim() === "") return;
    setUniqueEmail(true);
    axios__WEBPACK_IMPORTED_MODULE_3___default().get("/api/dashboard/checkByEmail", {
      params: {
        email: e.target.value
      }
    }).then(function (rep) {
      var _a, _b;
      if (((_a = rep.data) === null || _a === void 0 ? void 0 : _a.status) && ((_b = rep.data) === null || _b === void 0 ? void 0 : _b.status) === "error") {
        setEmail(undefined);
        setUniqueEmail(false);
      } else {
        setEmail(e.target.value.trim());
      }
    });
  };
  var handleAddUser = function handleAddUser(e) {
    e.preventDefault();
    setSaving(true);
    var post = {
      name: name,
      email: email
    };
    if (linkToProvider && providerSelected) post = __assign(__assign({}, post), {
      provider: providerSelected.id
    });
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/users", post).then(function (rep) {
      react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success(rep.data.msg);
      setSaving(false);
      setShowAdd(false);
      setShowLinkToProviderOption(true);
      getData();
    })["catch"](function (error) {
      react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error(error.response.data.msg);
      setSaving(false);
      setShowAdd(false);
      setShowLinkToProviderOption(true);
    });
  };
  if (!users.length) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_4__["default"], null);
  function handlePasswordReset(param) {
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/reset-password", {
      email: param.email
    }).then(function (rep) {
      react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success("Un lien de restauration à été envoyé.");
      setLoading(false);
    });
  }
  function handleMFAReset(id) {
    setLoading(true);
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/reset-mfa", {
      id: id
    }).then(function (rep) {
      react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success(rep.data.msg);
      setLoading(false);
      if (rep.data.refresh) location.reload();
    })["catch"](function (err) {
      setLoading(false);
      react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.error(err.response.data.msg);
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "row"
  }, loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_6__["default"], {
    title: "Utilisateurs"
  }), showAdd && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_8__["default"], {
    isSmall: true,
    title: "Ajouter utilisateur",
    onPopupClose: function onPopupClose() {},
    parentId: 2335
  }, saving && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
    onSubmit: handleAddUser
  }, providerSelected && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label text-danger"
  }, "Prestataire: ", providerSelected.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Nom", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: function onChange(e) {
      return setName(e.target.value);
    },
    type: "text",
    name: "name",
    required: true,
    placeholder: "Nom",
    className: "form-control"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Email", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "form-required"
  }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "email",
    onChange: (0,lodash__WEBPACK_IMPORTED_MODULE_5__.debounce)(checkEmail, 1500),
    name: "email",
    required: true,
    placeholder: "Email",
    className: "form-control"
  }), !uniqueEmail && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "text-danger"
  }, "Cet email n'est pas disponible.")), showLinkToProviderOption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "custom-control custom-checkbox"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "checkbox",
    onChange: function onChange(e) {
      setProviderSelected(undefined);
      setLinkToProvider(e.target.checked);
    },
    defaultChecked: linkToProvider,
    className: "custom-control-input"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "custom-control-label"
  }, "Lier \xE0 un prestataire?")), linkToProvider && showLinkToProviderOption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Select, {
    className: "form-group mb-2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_form_components_Select2__WEBPACK_IMPORTED_MODULE_10__["default"], {
    classes: "service-form",
    multiple: false,
    selectedValue: undefined,
    onSearch: function onSearch(e) {},
    searchKeys: {
      id: 'id',
      text: ['name']
    },
    searchUrl: '/api/dashboard/provider/search',
    onSelect: function onSelect(e) {
      return setProviderSelected(e);
    },
    searchable: true,
    placeholder: "Nom du prestataire",
    id: "pname"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-2 text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    disabled: !uniqueEmail,
    className: "btn btn-primary btn-sm"
  }, "Ajouter")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    className: "card-title"
  }, "Utilisateurs"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: function onClick() {
      return setShowAdd(true);
    },
    className: "btn btn-outline-primary btn-sm ms-auto"
  }, "Ajouter")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "table-responsive"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("table", {
    className: "table table-hover table-outline table-vcenter text-nowrap card-table"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("thead", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tr", {
    role: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "w-1"
  }, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    className: "",
    style: {
      width: "71.727px"
    }
  }, "Nom"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    style: {}
  }, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", {
    style: {}
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", null, "Ajout\xE9 le"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tbody", null, users.map(function (rep, key) {
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
    }, rep.name ? lodash__WEBPACK_IMPORTED_MODULE_5___default().truncate(rep.name, {
      'length': 100
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "text-muted"
    }, " Pas de nom"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: ""
    }, lodash__WEBPACK_IMPORTED_MODULE_5___default().truncate(rep.email, {
      'length': 100
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: "text-muted",
      title: "".concat(rep.provider ? rep.provider.name : "")
    }, rep.provider ? rep.provider.name_short : ""), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
      className: ""
    }, rep.created_at ? moment_moment__WEBPACK_IMPORTED_MODULE_7___default()(rep.created_at).format("D MMMM YYYY") : "-----"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("td", {
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
        return handlePasswordReset({
          id: rep.id,
          email: rep.email
        });
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fe fe-shield"
    }), " Restaurer password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      className: "dropdown-item",
      onClick: function onClick() {
        return handleMFAReset(rep.id);
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("i", {
      className: "dropdown-icon fa fa-qrcode"
    }), " Restaurer MFA")))));
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Users);
var Select = styled_components__WEBPACK_IMPORTED_MODULE_11__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"], ["\n    .select2.select2-container{\n        width: 100%!important;\n        border: 1px solid rgba(0, 40, 100, 0.12);\n    }\n    .select2-selection__arrow{\n        top: 4px!important;\n    }\n    .select2-selection.select2-selection--single{\n        padding: 0!important;\n    }\n"])));
var templateObject_1;

/***/ })

}]);