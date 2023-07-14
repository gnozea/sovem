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
    _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    loading = _f[0],
    setLoading = _f[1],
    _g = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    saving = _g[0],
    setSaving = _g[1];
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
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/users", {
      name: name,
      email: email
    }).then(function (rep) {
      react_toastify__WEBPACK_IMPORTED_MODULE_9__.toast.success(rep.data.msg);
      setSaving(false);
      setShowAdd(false);
      getData();
    });
  };
  if (!users.length) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_4__["default"], null);
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
  }, "Cet email n'est pas disponible.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
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
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("th", null, "Ajout\xE9 le"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("tbody", null, users.map(function (rep, key) {
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
    }, rep.created_at ? moment_moment__WEBPACK_IMPORTED_MODULE_7___default()(rep.created_at).format("D MMMM YYYY") : "-----"));
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Users);

/***/ })

}]);