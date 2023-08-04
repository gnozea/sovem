"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_account_Profile_tsx"],{

/***/ "./resources/js/components/admin/account/Profile.tsx":
/*!***********************************************************!*\
  !*** ./resources/js/components/admin/account/Profile.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _context_AccountContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../context/AccountContext */ "./resources/js/context/AccountContext.tsx");
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
/* harmony import */ var _utils_Popup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/Popup */ "./resources/js/components/utils/Popup.tsx");
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






var Profile = function Profile(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_AccountContext__WEBPACK_IMPORTED_MODULE_1__["default"]),
    user = _a.user,
    dispatch = _a.dispatch,
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    showPassWordEditor = _b[0],
    setShowPassWordEditor = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    showBusy = _c[0],
    setShowBusy = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    newInvalid = _d[0],
    setNewInvalid = _d[1],
    _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    password = _e[0],
    setPassword = _e[1];
  var handleNew = function handleNew(e) {
    setNewInvalid(false);
    if ((password === null || password === void 0 ? void 0 : password.confirm) && e.target.value !== password.confirm) return setNewInvalid(true);
    setPassword(function (prevState) {
      return __assign(__assign({}, prevState), {
        "new": e.target.value
      });
    });
  };
  var handleConfirm = function handleConfirm(e) {
    setNewInvalid(false);
    if ((password === null || password === void 0 ? void 0 : password["new"]) && e.target.value !== password["new"]) return setNewInvalid(true);
    setPassword(function (prevState) {
      return __assign(__assign({}, prevState), {
        confirm: e.target.value
      });
    });
  };
  var handleSetPassword = function handleSetPassword(e) {
    e.preventDefault();
    var form = new FormData();
    Object.keys(password).forEach(function (k) {
      form.append(k, password[k]);
    });
    setShowBusy(true);
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/change-password", form).then(function (rep) {
      setShowBusy(false);
      setShowPassWordEditor(false);
      react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success(rep.data.message);
    })["catch"](function (error) {
      return react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error('votre mot de passe n\'a pas été changé.');
    });
  };
  var handleMFAReset = function handleMFAReset() {
    setShowBusy(true);
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/reset-mfa").then(function (rep) {
      react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.success(rep.data.msg);
      setShowBusy(false);
      if (rep.data.refresh) location.reload();
    })["catch"](function (err) {
      setShowBusy(false);
      react_toastify__WEBPACK_IMPORTED_MODULE_4__.toast.error(err.response.data.msg);
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "my-3 my-md-5"
  }, showBusy && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "col-lg-8 mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card card-profile"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card-header",
    style: {
      backgroundImage: "url(/images/dino-reichmuth-84359-1500.jpg)"
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card-body text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    className: "card-profile-img",
    alt: "photo",
    style: {
      width: "6rem",
      height: "6rem"
    },
    src: "/images/default-profile.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    className: "mb-3"
  }, user.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", {
    className: "mb-3",
    style: {
      fontWeight: "400"
    }
  }, user.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h5", {
    className: "mb-3",
    style: {
      fontWeight: "400"
    }
  }, !(user === null || user === void 0 ? void 0 : user.provider) ? "Administrateur" : user.provider.name_short), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mb-4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "btn-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "btn btn-outline-primary btn-sm",
    onClick: function onClick() {
      return setShowPassWordEditor(!showPassWordEditor);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "fa fa-pencil"
  }), " Changer mot de passe"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    className: "btn btn-outline-primary btn-sm",
    onClick: handleMFAReset
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "fa fa-qrcode"
  }), " Restaurer MFA")))))), showPassWordEditor && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onPopupClose: function onPopupClose() {
      return setShowPassWordEditor(false);
    },
    title: "Changer mot de passe",
    isSmall: true,
    parentId: 2012 - 1161
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mx-auto text-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card",
    style: {
      border: "none",
      boxShadow: "none"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Ancien mot de passe"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: function onChange(e) {
      return setPassword(function (prevState) {
        return __assign(__assign({}, prevState), {
          old: e.target.value
        });
      });
    },
    type: "password",
    placeholder: "Ancien mot de passe",
    className: "form-control"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    type: "hidden",
    value: user.email,
    name: "email",
    autoComplete: "username"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Nouveau mot de passe"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: handleNew,
    type: "password",
    placeholder: "Nouveau mot de passe",
    className: "form-control",
    autoComplete: "new-password"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    className: "form-label"
  }, "Confirmer nouveau"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
    onChange: handleConfirm,
    type: "password",
    placeholder: "Confirmer nouveau mot de passe",
    className: "form-control".concat(newInvalid ? " is-invalid" : "")
  }), newInvalid && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "invalid-feedback"
  }, "Les deux mot de passes sont diff\xE9rents")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "form-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    onClick: handleSetPassword,
    className: "btn btn-primary btn-block"
  }, "Modifier")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Profile);

/***/ })

}]);