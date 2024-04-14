"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_admin_RequestAcceptation_tsx"],{

/***/ "./resources/js/components/admin/RequestAcceptation.tsx":
/*!**************************************************************!*\
  !*** ./resources/js/components/admin/RequestAcceptation.tsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils_Popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Popup */ "./resources/js/components/utils/Popup.tsx");
/* harmony import */ var _utils_Progress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/Progress */ "./resources/js/components/utils/Progress.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/date-picker/index.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/BrowserTitle */ "./resources/js/components/utils/BrowserTitle.tsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/dist/react-toastify.esm.mjs");
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










var Left = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    flex-basis: 350px;\n"], ["\n    flex-basis: 350px;\n"])));
var Right = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    flex: 3;\n"], ["\n    flex: 3;\n"])));
var Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_7__["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    @media all and (min-width: 600px){\n        display: flex;\n    }\n"], ["\n    @media all and (min-width: 600px){\n        display: flex;\n    }\n"])));
var rangePresets = [{
  label: "Ajourd'hui",
  value: [dayjs__WEBPACK_IMPORTED_MODULE_4___default()(), dayjs__WEBPACK_IMPORTED_MODULE_4___default()()]
}, {
  label: 'Dans 3 jours',
  value: [dayjs__WEBPACK_IMPORTED_MODULE_4___default()().add(3, 'd'), dayjs__WEBPACK_IMPORTED_MODULE_4___default()()]
}, {
  label: 'Dans 5 jours',
  value: [dayjs__WEBPACK_IMPORTED_MODULE_4___default()().add(5, 'd'), dayjs__WEBPACK_IMPORTED_MODULE_4___default()()]
}, {
  label: 'Dans 7 jours',
  value: [dayjs__WEBPACK_IMPORTED_MODULE_4___default()().add(7, 'd'), dayjs__WEBPACK_IMPORTED_MODULE_4___default()()]
}, {
  label: 'Dans 15 jours',
  value: [dayjs__WEBPACK_IMPORTED_MODULE_4___default()().add(15, 'd'), dayjs__WEBPACK_IMPORTED_MODULE_4___default()()]
}, {
  label: 'Dans 30 jours',
  value: [dayjs__WEBPACK_IMPORTED_MODULE_4___default()().add(30, 'd'), dayjs__WEBPACK_IMPORTED_MODULE_4___default()()]
}];
var hours = {
  "08_10AM": "8h - 10h AM",
  "10_12PM": "10h - 12h PM",
  "12_2PM": "12h - 2h PM",
  "2_4PM": "2h - 4h PM"
};
var onRangeChange = function onRangeChange(dates, dateStrings) {
  if (dates) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  } else {
    console.log('Clear');
  }
};
var RequestAcceptation = function RequestAcceptation(props) {
  var _a = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    services = _a[0],
    setServices = _a[1],
    uuid = window.location.pathname.split('/'),
    _b = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({}),
    able = _b[0],
    setAble = _b[1],
    _c = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(dayjs__WEBPACK_IMPORTED_MODULE_4___default()().format("YYYY-MM-DD")),
    date = _c[0],
    setDate = _c[1],
    _d = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("8h - 10h AM"),
    time = _d[0],
    setTime = _d[1],
    _e = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    claimed = _e[0],
    setClaimed = _e[1],
    _f = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),
    requestStatus = _f[0],
    setRequestStatus = _f[1],
    navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  var handleCheck = function handleCheck(e, id, key) {
    var ab = __assign({}, able);
    if (!e.target.checked) delete ab[id];
    if (e.target.checked) ab[id] = id;
    setAble(ab);
  };
  var handleAccept = function handleAccept(e) {
    axios__WEBPACK_IMPORTED_MODULE_3___default().post("/api/dashboard/request/".concat(services.request.id), {
      sR: Object.values(able),
      date: date,
      time: time
    }).then(function (rep) {
      setRequestStatus(rep.data.status);
      setClaimed(rep.data.data);
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    axios__WEBPACK_IMPORTED_MODULE_3___default().get("/api/dashboard/request/".concat(uuid[uuid.length - 1])).then(function (rep) {
      setServices(rep.data.data);
    })["catch"](function (error) {
      react_toastify__WEBPACK_IMPORTED_MODULE_6__.toast.error(error.response.data.msg);
      setTimeout(function () {
        navigate("/dashboard/requests");
      }, 1200);
    });
  }, []);
  if (!services) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Progress__WEBPACK_IMPORTED_MODULE_2__["default"], null);
  if (services.service.length === 0) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    closable: true,
    onPopupClose: function onPopupClose() {
      return navigate("/dashboard/requests");
    },
    parentId: 12444
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-wrap mt-4 mb-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", {
    className: "mt-0 mb-4"
  }, "Demande non disponible"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Il semble que cette demande ait d\xE9j\xE0 \xE9t\xE9 prise par un autre prestataire. Nous vous informerons si la demande a \xE9t\xE9 lib\xE9r\xE9e ou non r\xE9solue!")));
  if (!claimed && requestStatus === 'error') return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    closable: true,
    onPopupClose: function onPopupClose() {
      return navigate("/dashboard/requests");
    },
    parentId: 12444
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-wrap mt-4 mb-4"
  }, requestStatus === 'error' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "success-animation text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "/images/error.svg",
    alt: ""
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "sc_item_title sc_title_title sc_item_title_style_decoration"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "sc_item_title_text"
  }, "Vous avez d\xE9j\xE0 envoy\xE9 votre candidature")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Vous ne pouvez envoyer une proposition qu'une seule fois par service. Si le candidat approuve votre proposition, nous vous enverrons un e-mail."))));
  if (claimed) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onPopupClose: function onPopupClose() {
      return navigate("/dashboard/requests");
    },
    options: {
      closable: true
    },
    closable: true,
    parentId: 12444
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-wrap mt-6 mb-4"
  }, requestStatus === 'success' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "success-animation"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", {
    className: "checkmark",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 52 52"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("circle", {
    className: "checkmark__circle",
    cx: "26",
    cy: "26",
    r: "25",
    fill: "none"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    className: "checkmark__check",
    fill: "none",
    d: "M14.1 27.2l7.1 7.2 16.7-16.8"
  }))), requestStatus === 'error' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "success-animation text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img", {
    src: "/images/error.svg",
    alt: ""
  })), requestStatus === 'success' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "sc_item_title sc_title_title sc_item_title_style_decoration"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "sc_item_title_text"
  }, "Vous avez reclam\xE9 ", "".concat(claimed.affected === 1 ? "un" : "des"), " service", "".concat(claimed.affected === 1 ? "" : "s"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "text-danger"
  }, "Une fois que le candidat aura accept\xE9 votre proposition, nous vous en informerons par e-mail. Vous verrez alors vos demandes approuv\xE9es sous l'onglet accept\xE9 de la page de demande."), claimed.affected !== Object.values(able).length && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "text-danger"
  }, "Certaines de vos demandes ne vous ont pas \xE9t\xE9 accord\xE9es. Vous verrez vos r\xE9clamations approuv\xE9es dans la liste de vos r\xE9clamations.")), requestStatus === 'error' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "sc_item_title sc_title_title sc_item_title_style_decoration"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "sc_item_title_text"
  }, "Service", "".concat(claimed.affected === 1 ? "" : "s"), " non accord\xE9", "".concat(claimed.affected === 1 ? "" : "s"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Il semble que cette demande ait \xE9t\xE9 supprim\xE9e ou qu'un autre fournisseur l'ait d\xE9j\xE0 r\xE9cup\xE9r\xE9e. Nous vous ferons savoir si disponible ou lib\xE9r\xE9.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "text-center mt-3 mb-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return navigate("/dashboard/requests");
    },
    className: "btn btn-dark btn-sm"
  }, "F\xE8men fen\xE8t la"))));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_Popup__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onPopupClose: function onPopupClose(e) {
      return navigate("/dashboard/requests");
    },
    parentId: 12444,
    options: {
      closable: false
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_utils_BrowserTitle__WEBPACK_IMPORTED_MODULE_5__["default"], {
    title: "Accepter une demande"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Wrapper, {
    className: "text-wrap mt-4 mb-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Left, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", {
    className: "mt-0 mb-4"
  }, "D\xE9tails"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "Type de violence"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("ul", null, services.request.violence_type.map(function (request, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("li", {
      key: key
    }, request);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      lineHeight: '.8'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "Lieu d'incident"), ": ", "".concat(services.request.incident_city.name.trim(), ", ").concat(services.request.incident_city.zip)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      lineHeight: '.8'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "Sex"), ": ", services.request.gender.toLowerCase() === "fi" ? "Femme" : "Homme"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: {
      lineHeight: '.8'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "groupe d'age"), ": entre  ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", {
    className: ""
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("u", null, services.request.age_range.replace("-", "et"))), " ans"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "mt-3",
    style: {
      lineHeight: '.8'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("strong", null, "Lieu de r\xE9sidence"), ": ", "".concat(services.request.city.name.trim(), ", ").concat(services.request.city.zip))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Right, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h4", {
    className: "mt-0 mb-4"
  }, "Quel service souhaitez-vous fournir ?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "custom-controls-stacked"
  }, services.service.map(function (service, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
      key: key,
      className: "custom-control custom-checkbox"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
      type: "checkbox",
      onChange: function onChange(e) {
        return handleCheck(e, service.id, key);
      },
      className: "custom-control-input",
      name: "able"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
      className: "custom-control-label"
    }, service.specialities.name));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "divider-inner mt-4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "",
    style: {
      zIndex: "999999"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(antd__WEBPACK_IMPORTED_MODULE_9__["default"], {
    defaultValue: dayjs__WEBPACK_IMPORTED_MODULE_4___default()(),
    disabledDate: function disabledDate(current) {
      return current && current.valueOf() < Date.now();
    },
    format: "DD/MM/YYYY",
    style: {
      width: "100%",
      display: "block"
    },
    showToday: false,
    onChange: function onChange(date) {
      return setDate(date.format("YYYY-MM-DD"));
    },
    popupClassName: "office-hours",
    placeholder: "Choisir date du rendez-vous."
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "btn-group mt-4",
    style: {
      width: "100%"
    }
  }, Object.keys(hours).map(function (hr, key) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
      key: key,
      onClick: function onClick() {
        return setTime(hours[hr]);
      },
      className: "btn ".concat(time === hours[hr] ? " btn-danger" : "btn-outline-danger", " btn-sm")
    }, hours[hr]);
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "card-footer text-right p-1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "d-flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_10__.Link, {
    to: "/dashboard/requests",
    className: "btn btn-link"
  }, "Annuler"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    disabled: Object.keys(able).length === 0,
    type: "submit",
    onClick: handleAccept,
    className: "btn btn-primary ml-auto"
  }, "Accepter"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequestAcceptation);
var templateObject_1, templateObject_2, templateObject_3;

/***/ })

}]);