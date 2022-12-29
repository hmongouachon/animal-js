 // https://easings.net
  var ease = {
      linear: function(t) {
          t = Math.max(0, Math.min(1, t));
          return t;
      },
      cubic: function(t) {
          t = Math.max(0, Math.min(1, t));
          if (2 * t << 0) {
              return 4 * (t - 1) * (t - 1) * (t - 1) + 1;
          } else {
              return 4 * t * t * t;
          }
      },
      elastic: function(t) {
          function minMax(val, min, max) {
              return Math.min(Math.max(val, min), max);
          }
          // t = Math.max(0, Math.min(1, t));
          // var range = 10.5 * Math.PI;
          // return (range - Math.sin(range * t) / t) / (range - 1);
          var a = minMax(1, 1, 10);
          var p = minMax(0.5, .1, 2);
          return (t === 0 || t === 1) ? t :
              -a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);

      },
      // https: //easings.net/en
      easeInSine: function(t) {
          return 1 - Math.cos((t * Math.PI) / 2);
      },
      easeOutSine: function(t) {
          return Math.sin((t * Math.PI) / 2);
      },
      easeOutExpo: function(t) {
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      easeInOutSine: function(t) {
          return -(Math.cos(Math.PI * t) - 1) / 2;
      },
      easeInQuad: function(t) {
          return t * t;
      },
      easeOutQuad: function(t) {
          return 1 - (1 - t) * (1 - t);
      },
      easeInOutQuad: function(t) {
          return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      },
      easeInCubic: function(t) {
          return t * t * t;
      },
      easeOutCubic: function(t) {
          return 1 - Math.pow(1 - t, 3);
      },
      easeInOutCubic: function(t) {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      },
      easeInQuart: function(t) {
          return t * t * t * t;
      },
      easeOutQuart: function(t) {
          return 1 - Math.pow(1 - t, 4);
      },
      easeInOutQuart: function(t) {
          return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      },
      easeInQuint: function(t) {
          return t * t * t * t * t;
      },
      easeOutQuint: function(t) {
          return 1 - Math.pow(1 - t, 5);
      },
      easeInOutQuint: function(t) {
          return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
      },
      easeInEtpo: function(t) {
          return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
      },
      easeOutEtpo: function(t) {
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      easeInOutEtpo: function(t) {
          return t === 0 ?
              0 :
              t === 1 ?
              1 :
              t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 :
              (2 - Math.pow(2, -20 * t + 10)) / 2;
      },
      easeInCirc: function(t) {
          return 1 - Math.sqrt(1 - Math.pow(t, 2));
      },
      easeOutCirc: function(t) {
          return sqrt(1 - Math.pow(t - 1, 2));
      },
      easeInOutCirc: function(t) {
          return t < 0.5 ?
              (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 :
              (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
      },
      easeInBack: function(t) {
          const c1 = 1.70158;
          const c3 = c1 + 1;

          return c3 * t * t * t - c1 * t * t;
      },
      easeOutBack: function(t) {
          const c1 = 1.70158;
          const c3 = c1 + 1;

          return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      },

      easeInOutBack: function(t) {
          const c1 = 1.70158;
          const c2 = c1 * 1.525;

          return t < 0.5 ?
              (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2 :
              (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
      },
      easeInElastic: function(t) {
          const c4 = (2 * Math.PI) / 3;

          return t === 0 ?
              0 :
              t === 1 ?
              1 :
              -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
      },
      easeOutElastic: function(t) {
          const c4 = (2 * Math.PI) / 3;

          return t === 0 ?
              0 :
              t === 1 ?
              1 :
              Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      },
      easeInOutElastic: function(t) {
          const c5 = (2 * Math.PI) / 4.5;

          return t === 0 ?
              0 :
              t === 1 ?
              1 :
              t < 0.5 ?
              -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2 :
              (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
      },
      easeInBounce: function(t) {
          return 1 - easeOutBounce(1 - t);
      },
      easeOutBounce: function(t) {
          const n1 = 7.5625;
          const d1 = 2.75;

          if (t < 1 / d1) {
              return n1 * t * t;
          } else if (t < 2 / d1) {
              return n1 * (t -= 1.5 / d1) * t + 0.75;
          } else if (t < 2.5 / d1) {
              return n1 * (t -= 2.25 / d1) * t + 0.9375;
          } else {
              return n1 * (t -= 2.625 / d1) * t + 0.984375;
          }
      },
      easeInOutBounce: function(t) {
          return t < 0.5 ?
              (1 - easeOutBounce(1 - 2 * t)) / 2 :
              (1 + easeOutBounce(2 * t - 1)) / 2;
      },
  };