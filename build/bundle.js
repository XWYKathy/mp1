/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../node_modules/css-loader/dist/runtime/api.js"
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "../node_modules/css-loader/dist/runtime/getUrl.js"
/*!*********************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
(module) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ },

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js"
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ "../node_modules/html-loader/dist/runtime/getUrl.js"
/*!**********************************************************!*\
  !*** ../node_modules/html-loader/dist/runtime/getUrl.js ***!
  \**********************************************************/
(module) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }
  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign

  url = String(url.__esModule ? url.default : url);
  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }
  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }
  return url;
};

/***/ },

/***/ "./js/main.js"
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
() {

var NAV_SCROLL_OFFSET = 90;
function initNav() {
  var navbar = document.getElementById("navbar");
  var navLinks = document.querySelectorAll(".nav-container a");
  var sections = document.querySelectorAll("header[id], section[id]");
  if (!navbar || navLinks.length === 0 || sections.length === 0) {
    return;
  }
  var lockedSection = null;
  function setActiveNav(sectionId) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.hash === "#".concat(sectionId));
    });
  }
  function updateNavbarState() {
    navbar.classList.toggle("small", window.scrollY > 50);
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    /*
     * If the user clicked a navbar link, keep that link highlighted
     * until the target section reaches the navbar offset.
     */
    if (lockedSection) {
      var targetSection = document.getElementById(lockedSection);
      var targetReached = targetSection && targetSection.getBoundingClientRect().top <= NAV_SCROLL_OFFSET + 5;
      if (targetReached || atBottom) {
        lockedSection = null;
      } else {
        setActiveNav(lockedSection);
        return;
      }
    }
    var currentSection = "";
    sections.forEach(function (section) {
      var sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= NAV_SCROLL_OFFSET + 5) {
        currentSection = section.id;
      }
    });
    if (atBottom) {
      currentSection = sections[sections.length - 1].id;
    }
    setActiveNav(currentSection);
  }
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      lockedSection = link.hash.slice(1);
      setActiveNav(lockedSection);
    });
  });
  window.addEventListener("scroll", updateNavbarState);
  updateNavbarState();
}
function initCarousel() {
  var slides = document.querySelectorAll(".slide");
  var prevButton = document.querySelector(".prev");
  var nextButton = document.querySelector(".next");
  if (slides.length === 0 || !prevButton || !nextButton) {
    return;
  }
  var currentSlide = 0;
  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === currentSlide);
    });
  }
  prevButton.addEventListener("click", function () {
    showSlide(currentSlide - 1);
  });
  nextButton.addEventListener("click", function () {
    showSlide(currentSlide + 1);
  });
  showSlide(currentSlide);
}
function initModal() {
  var modal = document.getElementById("project-modal");
  var modalButtons = document.querySelectorAll(".modal-button");
  if (!modal || modalButtons.length === 0) {
    return;
  }
  modalButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var modalTitle = modal.querySelector("h2");
      var modalBody = modal.querySelector("p");
      if (modalTitle && button.dataset.modalTitle) {
        modalTitle.textContent = button.dataset.modalTitle;
      }
      if (modalBody && button.dataset.modalBody) {
        modalBody.textContent = button.dataset.modalBody;
      }
      modal.classList.add("show");
    });
  });
  modal.addEventListener("click", function (event) {
    if (event.target === modal || event.target.closest(".modal-close")) {
      modal.classList.remove("show");
    }
  });
}
initNav();
initCarousel();
initModal();

/***/ },

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss"
/*!*************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss ***!
  \*************************************************************************************************************************************************/
(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "../node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/image.jpg */ "./assets/image.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/github.svg */ "./assets/github.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/linkedin.svg */ "./assets/linkedin.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* ---------- General ---------- */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

/* ---------- Navbar ---------- */
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1f2937;
  z-index: 1000;
  transition: height 0.3s ease;
}
#navbar .nav-container a {
  transition: font-size 0.3s ease, color 0.3s ease;
}
#navbar.small {
  height: 60px;
}
#navbar.small .nav-container a {
  font-size: 14px;
}

.nav-container {
  width: 90%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  gap: 35px;
}
.nav-container a {
  position: relative;
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
}
.nav-container a.active {
  color: #4f46e5;
}
.nav-container a.active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 2px;
  background: #4f46e5;
}

/* ---------- Hero / Background Video ---------- */
header {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* The video fills the entire hero section */
.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
     object-fit: cover;
  z-index: 0;
}

/* Dark layer over video so text is easier to read */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #ffffff;
}
.hero-content h1 {
  font-size: 60px;
  margin-bottom: 15px;
}
.hero-content p {
  font-size: 22px;
}

/* ---------- General Sections ---------- */
section {
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
}
section:nth-child(even) {
  background: #f5f5f5;
}

.section-content {
  width: 90%;
  max-width: 1200px;
  padding: 100px 20px;
  text-align: center;
}

/* ---------- Multi-column Sections ---------- */
.about-grid,
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
}

.about-grid > div,
.project-card {
  padding: 30px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);
}
.about-grid > div p,
.project-card p {
  line-height: 1.6;
}

.project-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.project-card p {
  flex: 1;
}

.modal-button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  background: #4f46e5;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}
.modal-button:hover {
  background: #3730a3;
  transform: translateY(-2px);
}

/* ---------- Carousel ---------- */
.carousel {
  position: relative;
  margin-top: 40px;
  min-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #d1d5db;
}

.carousel-slides {
  width: 80%;
}

.slide {
  min-height: 300px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 70px;
  text-align: center;
}
.slide h3 {
  margin-bottom: 16px;
  font-size: 34px;
}
.slide p {
  max-width: 760px;
  margin-bottom: 0;
  font-size: 20px;
  line-height: 1.6;
}
.slide.active {
  display: flex;
  animation: fadeIn 0.4s ease;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  font-size: 32px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.7);
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* ---------- Modal ---------- */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2000;
}
.modal.show {
  display: flex;
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 620px;
  padding: 40px;
  background: #ffffff;
  text-align: center;
  border-radius: 8px;
  animation: modalFadeIn 0.3s ease;
}
.modal-content p {
  line-height: 1.7;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  font-size: 30px;
  cursor: pointer;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
/* ---------- Fixed Background Image ---------- */
/*
The hero uses a video, but the assignment separately requires
a fixed-position background image.
So the contact section is used for that requirement.
*/
#contact {
  background-image: linear-gradient(rgba(31, 41, 55, 0.75), rgba(31, 41, 55, 0.75)), url(${___CSS_LOADER_URL_REPLACEMENT_0___});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #ffffff;
}

.contact-email {
  margin-top: 18px;
  font-size: 18px;
  font-weight: bold;
}

.social-icons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 35px;
}
.social-icons a {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  color: #ffffff;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  transition: background 0.3s ease, transform 0.3s ease;
}
.social-icons a:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-3px);
}

.social-icon {
  width: 24px;
  height: 24px;
  display: inline-block;
  background-color: currentColor;
  flex: 0 0 auto;
}

.icon-github {
  mask: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) center/contain no-repeat;
  -webkit-mask: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) center/contain no-repeat;
}

.icon-linkedin {
  mask: url(${___CSS_LOADER_URL_REPLACEMENT_2___}) center/contain no-repeat;
  -webkit-mask: url(${___CSS_LOADER_URL_REPLACEMENT_2___}) center/contain no-repeat;
}

/* ---------- Footer ---------- */
footer {
  padding: 30px;
  text-align: center;
  color: #ffffff;
  background: #1f2937;
}
footer p {
  margin: 0;
}

/* ---------- Responsive ---------- */
@media (max-width: 767px) {
  .about-grid,
.project-grid {
    grid-template-columns: 1fr;
  }

  .nav-container {
    gap: 15px;
  }
  .nav-container a {
    font-size: 14px;
  }

  .hero-content h1 {
    font-size: 42px;
  }
  .hero-content p {
    font-size: 18px;
  }

  .carousel-slides {
    width: 75%;
  }

  .carousel-arrow {
    width: 42px;
    height: 42px;
    font-size: 26px;
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }
}`, "",{"version":3,"sources":["webpack://./css/main.scss"],"names":[],"mappings":"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","sourcesContent":["$dark: #1f2937;\n$light: #f5f5f5;\n$white: #ffffff;\n$accent: #4f46e5;\n$nav-large: 90px;\n$nav-small: 60px;\n\n@mixin flex-center {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n/* ---------- General ---------- */\n\n* {\n    box-sizing: border-box;\n}\n\nhtml {\n    scroll-behavior: smooth;\n    scroll-padding-top: $nav-large;\n}\n\nbody {\n    margin: 0;\n    font-family: Arial, Helvetica, sans-serif;\n    color: $dark;\n}\n\nh1,\nh2,\nh3,\np {\n    margin-top: 0;\n}\n\n/* ---------- Navbar ---------- */\n\n#navbar {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: $nav-large;\n    @include flex-center;\n    background: $dark;\n    z-index: 1000;\n    transition: height 0.3s ease;\n\n    .nav-container a {\n        transition:\n            font-size 0.3s ease,\n            color 0.3s ease;\n    }\n\n    &.small {\n        height: $nav-small;\n\n        .nav-container a {\n            font-size: 14px;\n        }\n    }\n}\n\n.nav-container {\n    width: 90%;\n    max-width: 1200px;\n    display: flex;\n    justify-content: center;\n    gap: 35px;\n\n    a {\n        position: relative;\n        color: $white;\n        text-decoration: none;\n        font-size: 18px;\n\n        &.active {\n            color: $accent;\n        }\n\n        &.active::after {\n            content: \"\";\n            position: absolute;\n            left: 0;\n            bottom: -8px;\n            width: 100%;\n            height: 2px;\n            background: $accent;\n        }\n    }\n}\n\n/* ---------- Hero / Background Video ---------- */\n\nheader {\n    position: relative;\n    width: 100%;\n    min-height: 100vh;\n    @include flex-center;\n    overflow: hidden;\n}\n\n/* The video fills the entire hero section */\n\n.hero-video {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    z-index: 0;\n}\n\n/* Dark layer over video so text is easier to read */\n\n.hero-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.45);\n    z-index: 1;\n}\n\n.hero-content {\n    position: relative;\n    z-index: 2;\n    text-align: center;\n    color: $white;\n\n    h1 {\n        font-size: 60px;\n        margin-bottom: 15px;\n    }\n\n    p {\n        font-size: 22px;\n    }\n}\n\n/* ---------- General Sections ---------- */\n\nsection {\n    width: 100%;\n    min-height: 600px;\n    display: flex;\n    justify-content: center;\n\n    &:nth-child(even) {\n        background: $light;\n    }\n}\n\n.section-content {\n    width: 90%;\n    max-width: 1200px;\n    padding: 100px 20px;\n    text-align: center;\n}\n\n/* ---------- Multi-column Sections ---------- */\n\n.about-grid,\n.project-grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 30px;\n    margin-top: 50px;\n}\n\n.about-grid > div,\n.project-card {\n    padding: 30px;\n    background: $white;\n    border-radius: 8px;\n    box-shadow: 0 12px 30px rgba(31, 41, 55, 0.08);\n\n    p {\n        line-height: 1.6;\n    }\n}\n\n.project-card {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n\n    p {\n        flex: 1;\n    }\n}\n\n.modal-button {\n    padding: 10px 16px;\n    border: none;\n    border-radius: 6px;\n    color: $white;\n    background: $accent;\n    cursor: pointer;\n    transition:\n        background 0.3s ease,\n        transform 0.3s ease;\n\n    &:hover {\n        background: #3730a3;\n        transform: translateY(-2px);\n    }\n}\n\n/* ---------- Carousel ---------- */\n\n.carousel {\n    position: relative;\n    margin-top: 40px;\n    min-height: 350px;\n    @include flex-center;\n    overflow: hidden;\n    background: #d1d5db;\n}\n\n.carousel-slides {\n    width: 80%;\n}\n\n.slide {\n    min-height: 300px;\n    display: none;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    padding: 40px 70px;\n    text-align: center;\n\n    h3 {\n        margin-bottom: 16px;\n        font-size: 34px;\n    }\n\n    p {\n        max-width: 760px;\n        margin-bottom: 0;\n        font-size: 20px;\n        line-height: 1.6;\n    }\n\n    &.active {\n        display: flex;\n        animation: fadeIn 0.4s ease;\n    }\n}\n\n.carousel-arrow {\n    position: absolute;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 50px;\n    height: 50px;\n    border: none;\n    background: rgba(0, 0, 0, 0.4);\n    color: $white;\n    font-size: 32px;\n    cursor: pointer;\n    transition: background 0.3s ease;\n\n    &:hover {\n        background: rgba(0, 0, 0, 0.7);\n    }\n}\n\n.prev {\n    left: 20px;\n}\n\n.next {\n    right: 20px;\n}\n\n@keyframes fadeIn {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n/* ---------- Modal ---------- */\n\n.modal {\n    @include flex-center;\n    display: none;\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.6);\n    z-index: 2000;\n\n    &.show {\n        display: flex;\n    }\n}\n\n.modal-content {\n    position: relative;\n    width: 90%;\n    max-width: 620px;\n    padding: 40px;\n    background: $white;\n    text-align: center;\n    border-radius: 8px;\n    animation: modalFadeIn 0.3s ease;\n\n    p {\n        line-height: 1.7;\n    }\n}\n\n.modal-close {\n    position: absolute;\n    top: 10px;\n    right: 15px;\n    border: none;\n    background: none;\n    font-size: 30px;\n    cursor: pointer;\n}\n\n@keyframes modalFadeIn {\n    from {\n        opacity: 0;\n        transform: scale(0.9);\n    }\n\n    to {\n        opacity: 1;\n        transform: scale(1);\n    }\n}\n\n/* ---------- Fixed Background Image ---------- */\n\n/*\nThe hero uses a video, but the assignment separately requires\na fixed-position background image.\nSo the contact section is used for that requirement.\n*/\n\n#contact {\n    background-image:\n        linear-gradient(\n            rgba(31, 41, 55, 0.75),\n            rgba(31, 41, 55, 0.75)\n        ),\n        url(\"../assets/image.jpg\");\n\n    background-size: cover;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-attachment: fixed;\n    color: $white;\n}\n\n.contact-email {\n    margin-top: 18px;\n    font-size: 18px;\n    font-weight: bold;\n}\n\n.social-icons {\n    display: flex;\n    justify-content: center;\n    flex-wrap: wrap;\n    gap: 18px;\n    margin-top: 35px;\n\n    a {\n        display: inline-flex;\n        align-items: center;\n        gap: 10px;\n        padding: 12px 18px;\n        color: $white;\n        text-decoration: none;\n        border: 1px solid rgba(255, 255, 255, 0.55);\n        border-radius: 6px;\n        background: rgba(255, 255, 255, 0.08);\n        transition:\n            background 0.3s ease,\n            transform 0.3s ease;\n\n        &:hover {\n            background: rgba(255, 255, 255, 0.18);\n            transform: translateY(-3px);\n        }\n    }\n}\n\n.social-icon {\n    width: 24px;\n    height: 24px;\n    display: inline-block;\n    background-color: currentColor;\n    flex: 0 0 auto;\n}\n\n.icon-github {\n    mask: url(\"../assets/github.svg\") center / contain no-repeat;\n    -webkit-mask: url(\"../assets/github.svg\") center / contain no-repeat;\n}\n\n.icon-linkedin {\n    mask: url(\"../assets/linkedin.svg\") center / contain no-repeat;\n    -webkit-mask: url(\"../assets/linkedin.svg\") center / contain no-repeat;\n}\n\n/* ---------- Footer ---------- */\n\nfooter {\n    padding: 30px;\n    text-align: center;\n    color: $white;\n    background: $dark;\n\n    p {\n        margin: 0;\n    }\n}\n\n/* ---------- Responsive ---------- */\n\n@media (max-width: 767px) {\n    .about-grid,\n    .project-grid {\n        grid-template-columns: 1fr;\n    }\n\n    .nav-container {\n        gap: 15px;\n\n        a {\n            font-size: 14px;\n        }\n    }\n\n    .hero-content {\n        h1 {\n            font-size: 42px;\n        }\n\n        p {\n            font-size: 18px;\n        }\n    }\n\n    .carousel-slides {\n        width: 75%;\n    }\n\n    .carousel-arrow {\n        width: 42px;\n        height: 42px;\n        font-size: 26px;\n    }\n\n    .prev {\n        left: 10px;\n    }\n\n    .next {\n        right: 10px;\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./index.html"
/*!********************!*\
  !*** ./index.html ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "../node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/demo.mp4 */ "./assets/demo.mp4"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\" />\n    <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Kathy's Portfolio</title>\n</head>\n\n<body>\n\n    <header id=\"home\">\n        <video class=\"hero-video\" autoplay muted loop playsinline>\n            <source src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" type=\"video/mp4\">\n        </video>\n    \n        <div class=\"hero-overlay\"></div>\n    \n        <nav id=\"navbar\">\n            <div class=\"nav-container\">\n                <a href=\"#home\">Home</a>\n                <a href=\"#about\">About</a>\n                <a href=\"#projects\">Projects</a>\n                <a href=\"#gallery\">Gallery</a>\n                <a href=\"#contact\">Contact</a>\n            </div>\n        </nav>\n    \n        <div class=\"hero-content\">\n            <h1>Wenyi (Kathy) Xie</h1>\n            <p>Computer Vision • AI Agents • Full-Stack AI Systems</p>\n        </div>\n    </header>\n\n    <main>\n\n        <section id=\"about\">\n            <div class=\"section-content\">\n                <h2>About Me</h2>\n\n                <div class=\"about-grid\">\n                    <div>\n                        <h3>Education</h3>\n                        <p>\n                            MCS student at the University of Illinois\n                            Urbana-Champaign, with a 3.9/4.0 GPA and an\n                            expected graduation date of December 2026.\n                        </p>\n                    </div>\n\n                    <div>\n                        <h3>Focus</h3>\n                        <p>\n                            I build end-to-end AI systems across computer\n                            vision, large language models, retrieval workflows,\n                            and tool-augmented AI agents.\n                        </p>\n                    </div>\n\n                    <div>\n                        <h3>Technical Stack</h3>\n                        <p>\n                            Python, Java, C++, SQL, JavaScript, PyTorch,\n                            TensorFlow, OpenCV, FastAPI, Spring Boot, Node.js,\n                            AWS, and GCP.\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <section id=\"projects\">\n            <div class=\"section-content\">\n                <h2>Projects</h2>\n\n                <div class=\"project-grid\">\n                    <div class=\"project-card\">\n                        <h3>GlucoAgent</h3>\n                        <p>\n                            A tool-augmented LLM agent for analyzing continuous\n                            glucose monitoring data through grounded natural\n                            language interaction.\n                        </p>\n                        <button\n                            class=\"modal-button\"\n                            data-modal-title=\"GlucoAgent\"\n                            data-modal-body=\"Built a Claude-powered agent workflow that coordinates structured data retrieval, statistical analysis, and personalized report generation. The system separates deterministic computation from LLM explanation to reduce hallucination risk while supporting multi-turn exploration of longitudinal health records.\"\n                        >\n                            Learn More\n                        </button>\n                    </div>\n\n                    <div class=\"project-card\">\n                        <h3>Plant Disease Classifier</h3>\n                        <p>\n                            A robust computer vision system using transfer\n                            learning and interpretability to classify plant\n                            disease images.\n                        </p>\n                        <button\n                            class=\"modal-button\"\n                            data-modal-title=\"Plant Disease Classifier\"\n                            data-modal-body=\"Built an EfficientNetB0 transfer learning pipeline that achieved 97.8% test accuracy. Added robustness experiments for blur, brightness, rotation, occlusion, and background noise, then used Grad-CAM to explain model predictions. The full-stack app used Next.js, FastAPI, and PostgreSQL.\"\n                        >\n                            Learn More\n                        </button>\n                    </div>\n\n                    <div class=\"project-card\">\n                        <h3>CodeMentor AI</h3>\n                        <p>\n                            A multi-LLM programming tutor that adapts coding\n                            guidance to students' progress and learning\n                            behavior.\n                        </p>\n                        <button\n                            class=\"modal-button\"\n                            data-modal-title=\"CodeMentor AI\"\n                            data-modal-body=\"Developed a React and Django system for real-time tutoring workflows. Integrated ChatGLM, Yi-Large, Yi-Lightning, and DeepSeek-V3 through dynamic model selection to support code explanation, debugging, completion, and personalized learning guidance.\"\n                        >\n                            Learn More\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </section>\n\n        <section id=\"gallery\">\n            <div class=\"section-content\">\n                <h2>Gallery</h2>\n\n                <div class=\"carousel\">\n                    <button class=\"carousel-arrow prev\">&#10094;</button>\n\n                    <div class=\"carousel-slides\">\n                        <div class=\"slide\">\n                            <h3>Kodiak Sciences</h3>\n                            <p>\n                                Machine learning engineering for retinal\n                                recognition, pupil segmentation, and AI-powered\n                                knowledge retrieval workflows.\n                            </p>\n                        </div>\n                        <div class=\"slide\">\n                            <h3>VMware China R&amp;D</h3>\n                            <p>\n                                End-to-end LLM system development, including\n                                dataset engineering, fine-tuning, and\n                                domain-specific evaluation.\n                            </p>\n                        </div>\n                        <div class=\"slide\">\n                            <h3>Publication</h3>\n                            <p>\n                                W. Xie, J. Li, Y . Mu, H. Zhang, S. Zhao and X. Zheng,\n                                “The Power of Personalized Datasets: Advancing Chinese Composition\n                                Writing for Elementary School through Targeted Model Fine-Tuning,\n                                ” IALP 2024, Hohhot, China, pp. 344-349. Also\n                                accepted to the International Journal of Asian Language Processing (Dec 2024).\n                            </p>\n                        </div>\n                    </div>\n\n                    <button class=\"carousel-arrow next\">&#10095;</button>\n                </div>\n            </div>\n        </section>\n\n        <section id=\"contact\">\n            <div class=\"section-content\">\n                <h2>Contact</h2>\n\n                <p class=\"contact-email\">\n                    xiewenyi.kathy@gmail.com\n                </p>\n\n                <div class=\"social-icons\">\n                    <a\n                        href=\"https://github.com/XWYKathy\"\n                        aria-label=\"GitHub profile\"\n                    >\n                        <span class=\"social-icon icon-github\"></span>\n                        <span>GitHub</span>\n                    </a>\n                    <a\n                        href=\"https://www.linkedin.com/in/kathyxie-7b0313289\"\n                        aria-label=\"LinkedIn profile\"\n                    >\n                        <span class=\"social-icon icon-linkedin\"></span>\n                        <span>LinkedIn</span>\n                    </a>\n                </div>\n            </div>\n        </section>\n\n    </main>\n\n    <footer>\n        <p>&copy; 2026 Kathy Xie</p>\n    </footer>\n\n    <div id=\"project-modal\" class=\"modal\">\n        <div class=\"modal-content\">\n            <button class=\"modal-close\">&times;</button>\n            <h2>Project Details</h2>\n            <p>Choose a project to see more details.</p>\n        </div>\n    </div>\n\n</body>\n</html>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ },

/***/ "./css/main.scss"
/*!***********************!*\
  !*** ./css/main.scss ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./css/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ },

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
(module) {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js"
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
(module) {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js"
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js"
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js"
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ },

/***/ "./assets/demo.mp4"
/*!*************************!*\
  !*** ./assets/demo.mp4 ***!
  \*************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "6c9a40e8e4fe952c6a0e.mp4";

/***/ },

/***/ "./assets/github.svg"
/*!***************************!*\
  !*** ./assets/github.svg ***!
  \***************************/
(module) {

"use strict";
module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aCBkPSJNMTIgLjVDNS43My41Ljk4IDUuMjUuOTggMTEuNTJjMCA0Ljg1IDMuMTQgOC45NyA3LjQ5IDEwLjQzLjU1LjEuNzUtLjI0Ljc1LS41M3YtMS44NmMtMy4wNS42Ni0zLjY5LTEuMzEtMy42OS0xLjMxLS41LTEuMjctMS4yMi0xLjYxLTEuMjItMS42MS0uOTktLjY4LjA4LS42Ny4wOC0uNjcgMS4xLjA4IDEuNjggMS4xMyAxLjY4IDEuMTMuOTggMS42NyAyLjU2IDEuMTkgMy4xOS45MS4xLS43MS4zOC0xLjE5LjY5LTEuNDYtMi40My0uMjgtNC45OS0xLjIyLTQuOTktNS40MSAwLTEuMTkuNDMtMi4xNyAxLjEzLTIuOTQtLjExLS4yOC0uNDktMS40LjExLTIuOSAwIDAgLjkyLS4yOSAzLjAyIDEuMTIuODgtLjI0IDEuODItLjM3IDIuNzUtLjM3LjkzIDAgMS44Ny4xMyAyLjc1LjM3IDIuMS0xLjQxIDMuMDItMS4xMiAzLjAyLTEuMTIuNiAxLjUuMjIgMi42Mi4xMSAyLjkuNy43NyAxLjEzIDEuNzUgMS4xMyAyLjk0IDAgNC4yLTIuNTYgNS4xMy01IDUuNC4zOS4zNC43NCAxLjAxLjc0IDIuMDR2My4wM2MwIC4yOS4yLjY0Ljc2LjUzIDQuMzUtMS40NiA3LjQ4LTUuNTggNy40OC0xMC40M0MyMy4wMiA1LjI1IDE4LjI3LjUgMTIgLjVaIi8+Cjwvc3ZnPgo=";

/***/ },

/***/ "./assets/image.jpg"
/*!**************************!*\
  !*** ./assets/image.jpg ***!
  \**************************/
(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "f7c3d1bc154868c1bcc8.jpg";

/***/ },

/***/ "./assets/linkedin.svg"
/*!*****************************!*\
  !*** ./assets/linkedin.svg ***!
  \*****************************/
(module) {

"use strict";
module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICA8cGF0aCBkPSJNMjAuNDUgMjAuNDVoLTMuNTZ2LTUuNTdjMC0xLjMzLS4wMi0zLjA0LTEuODUtMy4wNC0xLjg2IDAtMi4xNCAxLjQ1LTIuMTQgMi45NHY1LjY3SDkuMzRWOC45OGgzLjQydjEuNTdoLjA1Yy40OC0uOSAxLjY0LTEuODUgMy4zNy0xLjg1IDMuNjEgMCA0LjI3IDIuMzcgNC4yNyA1LjQ2djYuMjlaTTUuMzIgNy40MWEyLjA2IDIuMDYgMCAxIDEgMC00LjEyIDIuMDYgMi4wNiAwIDAgMSAwIDQuMTJabTEuNzggMTMuMDRIMy41M1Y4Ljk4SDcuMXYxMS40N1pNMjIuMjMgMEgxLjc2Qy43OSAwIDAgLjc3IDAgMS43MnYyMC41NkMwIDIzLjIzLjc5IDI0IDEuNzYgMjRoMjAuNDdjLjk3IDAgMS43Ny0uNzcgMS43Ny0xLjcyVjEuNzJDMjQgLjc3IDIzLjIgMCAyMi4yMyAwWiIvPgo8L3N2Zz4K";

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		let scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		const document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript?.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				const scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					let i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^https?:/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:|[?#].*$/g, "").replace(/\/[^/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = (typeof document !== 'undefined' && document.baseURI) || self.location.href;
/******/ 		
/******/ 		// no installed chunks
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	__webpack_require__.nc = undefined;
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./index.html");
/* harmony import */ var _css_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/main.scss */ "./css/main.scss");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/main.js */ "./js/main.js");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_main_js__WEBPACK_IMPORTED_MODULE_2__);
/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files


// Stylesheets


// Scripts

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map