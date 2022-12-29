  /*!
   * Animal: Minimal javascript animation engine
   * (©) 2023 Hadrien Mongouachon
   * Author URI: http://hmongouachon.com/_playground/animal-js/
   * Version: 1.0.0 
   */ 
  var animal = function(obj, state, progress_) {
      var opt = {  
          main_props: [
              'target', 'duration', 'easing', 'startTime', 'frame', 'percent', 'eprogress', 'progress',
              'time', 'run', 'delay', 'resume', 'rafID', 'count', 'loop', 'reverse', 'reverse_loop', 'autoplay', 'seek', 'onStart', 'onUpdate', 'onComplete'
          ],
          css_props: [
              "marginTop", "marginRight", "marginBottom", "marginLeft",
              "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
              "top", "right", "bottom", "left",
              "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight",
              "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth",
              'borderRadius', 'borderColor',
              "strokeWidth", 'strokeDashoffset', 'strokeDasharray',
              "lineHeight", "fontSize", 'letterSpacing', "wordSpacing",
              'backgroundPositionX', 'backgroundPositionY', 'backgroundSize',
              'opacity'
          ],
          css_colors: ['backgroundColor', 'color', 'fill', 'borderColor'],
          units: ['px', '%', 'vw', 'vh', 'rem', 'em'],
      };
      obj.rafID;
      obj.startTime = null;
      obj.time = obj.progress = obj.eprogress = obj.percent = obj.frame = 0;
      obj.run = true;
      loop_= 0;
      if (!obj.duration) {
          obj.duration = 0
      }
      if (!obj.delay) obj.delay = 0;
      if (state == 'resume') {
          obj.resume = true;
      } else {
          obj.resume = false;
      }
      var tx,tx2,ty,ty2,tz,tz2,sx,sx2,sy,sy2,sz,sz2,skx,skx2,sky,sky2,per,per2,rx,rx2,ry,ry2,rz,rz2,ra,ra2,st,st2,ob,ob2,ob_,ob2_;
      // select string as dom el
      if (helper.is_stg(obj.target)) {
          if (obj.target.includes("#")) {
              obj.target = document.getElementById(obj.target.replace('#', ''))
          } else {
              obj.target = document.querySelector(obj.target);
          }
      }  
      for (var key in obj) {
          for (var i = 0; i < opt.css_colors.length; i++) {
              if (key == opt.css_colors[i]) {
                  set_colors_array(key);
                  break;
              }
          }
      }
      function set_colors_array(key) {
          if (!Array.isArray(obj[key])) {
              if (helper.is_dom(obj.target)) {
                  var current_color = helper.get_css(obj.target, key)
                  obj[key] = [helper.rgb2hex(current_color), obj[key]]
              }
          }
      }
      var animate = function(t) {
          if ((obj.count) && (obj.count == loop_)) return;
          if (obj.run == false || obj.autoplay == false) return;
          if (obj.progress == 0) {
              if (obj.onStart) {
                  obj.onStart(obj)
              }
          }
          obj.time = Date.now();
          if (obj.startTime === null) {
              obj.startTime = obj.time;
          }
          if (obj.resume == true) {
              obj.progress = (obj.time - obj.startTime) + progress_

          } else {
              obj.progress = obj.time - obj.startTime;
          }
          obj.percent = (obj.progress / obj.duration);
          obj.percent = Math.min(obj.percent, 1)
          if (obj.seek) {
              obj.percent = obj.seek;
          }
          if ((obj.easing !== 'none') && (obj.easing !== '') && (obj.easing !== undefined)) {
              if (typeof obj.easing === 'function') {
                  obj.eprogress = obj.easing(obj.percent)
              } else {
                  obj.eprogress = ease[obj.easing](obj.percent);
              }
          } else {
              obj.eprogress = obj.percent;
          }
          if (obj.reverse == true) {
              obj.eprogress = 1 - obj.eprogress
          }
          obj.rafID = requestAnimationFrame(animate);
          targets.object_(obj);
          targets.dom_(obj);
          if (obj.onUpdate) {
              obj.onUpdate(obj);
          }
          if (obj.progress > obj.duration) {
              cancelAnimationFrame(obj.rafID);
              if (obj.onComplete) {
                  obj.onComplete(obj, loop_)
                  obj.startTime = null;
              }
              if (obj.reverse_loop == true) {
                  if (obj.reverse == true) obj.reverse = false;
                  else if (obj.reverse == false) obj.reverse = true;
                  obj.startTime = null;
                  obj.rafID = requestAnimationFrame(animate);
                  loop_ = loop_ + 1;
              }
              if (obj.loop == true) {
                  obj.startTime = null;
                  obj.rafID = requestAnimationFrame(animate);
                  loop_ = loop_ + 1;
              }
              return;
          }
          obj.frame++;
      }
      window.setTimeout(
          function() {
              obj.rafID = requestAnimationFrame(animate);
          },
          obj.delay
      );
      var targets = {
          object_: function(obj) {
              if (!helper.is_obj(obj.target)) return;
              for (var key in obj) {
                  if (!opt.main_props.includes(key)) {
                     ob = 0;
                      if (obj[key][0] == undefined) {
                          if (obj.target[key] !== undefined) {
                              ob -= obj.target[key] + ob;
                          } 
                          ob2 = obj[key];
                      } else {
                          ob = obj[key][0];
                          ob2 = obj[key][1];
                      }
                      ob = helper.lerp(ob, ob2, Math.min(obj.eprogress, 1));
                      obj.target[key] = ob;
                  }
              }
          },
          dom_: function(obj) {
              if (!helper.is_dom(obj.target)) return;
              var target_ = obj.target;
              var tra = '';
              var sca = '';
              var ske = '';
              var rot = '';
              var pers = '';
              var transforms = '';
              for (var key in obj) {
                  prop.colors(target_, key, obj)
                  prop.css(target_, key, obj)
                  if (key == 'translate3d') {
                      prop.translate3d(target_, key, obj)
                      tra = 'translate3d(' + tx + 'px,' + ty + 'px,' + tz + 'px)';
                  }
                  if (key == 'scale3d') {
                      prop.scale3d(target_, key, obj)
                      sca = 'scale3d(' + sx + ',' + sy + ',' + sz + ')';
                  }
                  if (key == 'skew') {
                      prop.skew(target_, key, obj)
                      ske = 'skew(' + skx + 'deg,' + sky + 'deg)';
                  }
                  if (key == 'rotate3d') {
                      prop.rotate3d(target_, key, obj)
                      rot = 'rotate3d(' + rx + ','+ry+','+rz+','+ra+'deg)';
                  }
                  if (key == 'perspective') {
                      prop.perspective(target_, key, obj)
                      pers = 'perspective(' + per + 'px)';
                  }
                  if (key == 'translate3d' || key == 'scale3d' || key == 'skew' || key == 'rotate3d' || key == 'perspective') {
                      transforms = tra + sca + ske + rot + pers;
                      target_.style.transform = transforms;
                  }
              }
          },
      };
      var prop = {
          translate3d: function(target_, key, obj) {
              if (key == "translate3d") {
                  var x = helper.tr_val(obj[key][0], tx, tx2);
                  tx = x[0];
                  tx2 = x[1];
                  var y = helper.tr_val(obj[key][1], ty, ty2);
                  ty = y[0];
                  ty2 = y[1];
                  var z = helper.tr_val(obj[key][2], tz, tz2);
                  tz = z[0];
                  tz2 = z[1];
                  tx = helper.lerp(tx, tx2, Math.min(obj.eprogress, 1));
                  ty = helper.lerp(ty, ty2, Math.min(obj.eprogress, 1));
                  tz = helper.lerp(tz, tz2, Math.min(obj.eprogress, 1));
              }
          },
          scale3d: function(target_, key, obj) {
              if (key == "scale3d") {
                  var x = helper.tr_val(obj[key][0], sx, sx2);
                  sx = x[0];
                  if (sx == 0) sx = 1;
                  sx2 = x[1];
                  var y = helper.tr_val(obj[key][1], sy, sy2);
                  sy = y[0];
                  if (sy == 0) sy = 1;
                  sy2 = y[1];
                  var z = helper.tr_val(obj[key][1], sz, sz2);
                  sz = z[0];
                  if (sz == 0) sz = 1;
                  sz2 = z[1];
                  sx = helper.lerp(sx, sx2, Math.min(obj.eprogress, 1));
                  sy = helper.lerp(sy, sy2, Math.min(obj.eprogress, 1));
                  sz = helper.lerp(sz, sz2, Math.min(obj.eprogress, 1));
              }
          },
          rotate3d: function(target_, key, obj) {
              if (key == "rotate3d") {
                  var x = helper.tr_val(obj[key][0], rx, rx2);
                  rx = x[0];
                  rx2 = x[1];
                  var y = helper.tr_val(obj[key][1], ry, ry2);
                  ry = y[0];
                  ry2 = y[1];
                  var z = helper.tr_val(obj[key][2], rz, rz2);
                  rz = z[0];
                  rz2 = z[1];
                  var a = helper.tr_val(obj[key][3], ra, ra2);
                  ra = a[0];
                  ra2 = a[1];
                  rx = helper.lerp(rx, rx2, Math.min(obj.eprogress, 1));
                  ry = helper.lerp(ry, ry2, Math.min(obj.eprogress, 1));
                  rz = helper.lerp(rz, rz2, Math.min(obj.eprogress, 1));
                  ra = helper.lerp(ra, ra2, Math.min(obj.eprogress, 1));
              }
          },
          skew: function(target_, key, obj) {
              if (key == "skew") {
                  var x = helper.tr_val(obj[key][0], skx, skx2);
                  skx = x[0];
                  skx2 = x[1];
                  var y = helper.tr_val(obj[key][1], sky, sky2);
                  sky = y[0];
                  sky2 = y[1];
                  skx = helper.lerp(skx, skx2, Math.min(obj.eprogress, 1));
                  sky = helper.lerp(sky, sky2, Math.min(obj.eprogress, 1));
              }
          },
          perspective: function(target_, key, obj) {
              if (key == "perspective") {
                  var d = helper.tr_val(obj[key], per, per2);
                  per = d[0];
                  per2 = d[1];
                  per = helper.lerp(per, per2, Math.min(obj.eprogress, 1));
              }
          },
          colors : function(target_, key, obj){
              for (var i = 0; i < opt.css_colors.length; i++) {
                  anime_colors(opt.css_colors[i]);
              }
              function anime_colors(property_name) {
                  if (key == property_name) {
                      var target_;
                      helper.colors_val(obj[key]);
                      var r0 = helper.build_rgb(c0, 0, 2, 16);
                      var g0 = helper.build_rgb(c0, 2, 4, 16);
                      var b0 = helper.build_rgb(c0, 4, 6, 16);
                      var r1 = helper.build_rgb(c1, 0, 2, 16);
                      var g1 = helper.build_rgb(c1, 2, 4, 16);
                      var b1 = helper.build_rgb(c1, 4, 6, 16);
                      r0 = helper.lerp(r0, r1, Math.min(obj.eprogress, 1));
                      g0 = helper.lerp(g0, g1, Math.min(obj.eprogress, 1));
                      b0 = helper.lerp(b0, b1, Math.min(obj.eprogress, 1));
                      if (helper.is_dom(obj.target)) {
                          obj.target.style[key] = 'rgb(' + r0 + ', ' + g0 + ', ' + b0 + ')';
                      }
                      return;
                  }
              }
          },
          css: function(target_, key, obj) {
              for (var i = 0; i < opt.css_props.length; i++) {
                  if (opt.css_props[i] == key) {
                      var val = obj[key];

                      function get_unit(val) {
                          if (Array.isArray(val)) {
                              val = val[0]
                          }
                          for (var i = 0; i < opt.units.length; i++) {
                              if (val.includes(opt.units[i])) {
                                  opt.unit = opt.units[i];
                                  break;
                              }
                          } 
                      }
                      if(key == 'opacity'){
                          opt.unit = '';
                      }
                      else {
                          get_unit(val)
                      }
                      if (Array.isArray(val)) {
                          st = remove_unit(val[0]);
                          st2 = remove_unit(val[1]);
                      } else {
                          st = window.getComputedStyle(target_)[key];
                          st = remove_unit(st);
                          st2 = val;
                          st2 = Number(st2);
                      }
                      st = helper.lerp(st, st2, Math.min(obj.eprogress, 1));
                      target_.style[key] = (st) + opt.unit;

                      function remove_unit(val) {
                        if(key == 'opacity') return val;
                          for (var i = 0; i < opt.units.length; i++) {
                              if (val.includes(opt.units[i])) {
                                  return val.replace(opt.units[i], '')
                              }
                          } 
                      }
                      break; 
                  }
              }
          }
      };
      return {
          play: function(seek) {
              obj.autoplay = true;
              if (seek) obj.seek = seek;
              animal(obj);
          },
          stop: function() {
              current = obj.target;
              obj.run = false;
              cancelAnimationFrame(obj.rafID);
          },
          resume: function() {
              obj.autoplay = true;
              obj.run = true;
              animal(obj, 'resume', obj.progress);
          },
          props: function() {
              return obj;
          },
          destroy: function() {
              current = obj.target;
              obj.run = false;
              cancelAnimationFrame(obj.rafID);
              animal = null;
          }
      }
  }
  var helper = { 
      lerp: function(st, en, am) { 
          return st * (1 - am) + en * am;
      },
      build_rgb: function(c, m1, m2, m3) {
          return parseInt(c.substring(m1, m2), m3);
      },
      colors_val: function(val) {
          if (val) {
              if (Array.isArray(val)) {
                  c0 = val[0].replace('#', '')
                  c1 = val[1].replace('#', '')
              }
          }
      },
      tr_val: function(param, v1, v2) {
          if (Array.isArray(param)) {
              v1 = param[0];
              v2 = param[1];
          } else {
              v1 = 0;
              v2 = param;
          }
          return [v1, v2];
      },
      is_obj: function(el) {
          if (typeof el === 'object' && !Array.isArray(el) && el !== null &&
              el.nodeType == undefined)
              return true;
      },
      is_dom: function(el) {
          if (typeof el === 'object' && el.nodeType !== undefined)
              return true;
      },
      is_stg: function(el) {
          for (var i = 0; i < el.length; i++) {
              if (typeof el[i] === 'string' && el[i].nodeType == undefined)
                  return true;
          }
      },
      is_fn: function(target_) {
          if (typeof el === 'function') return true;
      },
      get_css: function(el, prop) {
          var v = el.style[prop] || getComputedStyle(el)[prop];
          return v;
      },
      get_tr3d: function(el) {
          const values = el.style.transform.split(/\w+\(|\);?/);
          const transform = values[1].split(/,\s?/g).map(numStr => parseInt(numStr));
          return {
              x: transform[0],
              y: transform[1],
              z: transform[2]
          };
      }, 
      get_sc3d: function(el) {
          const style = window.getComputedStyle(el)
          const matrix = style['transform'] || style.webkitTransform || style.mozTransform
          const matrixType = matrix.includes('3d') ? '3d' : '2d'
          const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
          if (matrixType === '3d') {
              return {
                  x: matrixValues[0],
              y: matrixValues[5],
              z: matrixValues[10]
              }
          }
      },
      get_ro3d: function(el) {
          var rotate = el.style.transform.match(/rotate\((.+)\)/);
          return {
              x: rotate[1],
          }
      },
      random: function(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
      }, 
      rgb2hex: function(rgb) {
          rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

          function hex(x) {
              return ("0" + parseInt(x).toString(16)).slice(-2);
          }
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
      },
      hex2rgb: function(hex) {
          return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
      },
  }  
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