System.register([], function (_export, _context) {
  "use strict";

  var Home;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [],
    execute: function () {
      _export("Home", Home =
      /*#__PURE__*/
      function () {
        function Home(templateData) {
          _classCallCheck(this, Home);

          this.templateData = templateData;
          console.log(templateData);
        }

        _createClass(Home, [{
          key: "init",
          value: function init() {
            new Vue({
              el: '#app',
              data: {
                msg: this.templateData
              }
            });
          }
        }]);

        return Home;
      }());
    }
  };
});
