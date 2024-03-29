(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = require('./src/app.js')

app.mount()



},{"./src/app.js":17}],2:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else if (/^xmlns($|:)/i.test(p)) {
            // skip xmlns definitions
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement)
module.exports.default = module.exports
module.exports.createElement = belCreateElement

},{"global/document":6,"hyperx":9,"on-load":12}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
module.exports = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function() { return parser.getResult();  },
        peg$c1 = "EXPORT=",
        peg$c2 = { type: "literal", value: "EXPORT=", description: "\"EXPORT=\"" },
        peg$c3 = ":",
        peg$c4 = { type: "literal", value: ":", description: "\":\"" },
        peg$c5 = function(priv, pub) {return parser.registerExports(priv,pub)},
        peg$c6 = "INPORT=",
        peg$c7 = { type: "literal", value: "INPORT=", description: "\"INPORT=\"" },
        peg$c8 = ".",
        peg$c9 = { type: "literal", value: ".", description: "\".\"" },
        peg$c10 = function(node, port, pub) {return parser.registerInports(node,port,pub)},
        peg$c11 = "OUTPORT=",
        peg$c12 = { type: "literal", value: "OUTPORT=", description: "\"OUTPORT=\"" },
        peg$c13 = function(node, port, pub) {return parser.registerOutports(node,port,pub)},
        peg$c14 = "DEFAULT_INPORT=",
        peg$c15 = { type: "literal", value: "DEFAULT_INPORT=", description: "\"DEFAULT_INPORT=\"" },
        peg$c16 = function(name) { defaultInPort = name},
        peg$c17 = "DEFAULT_OUTPORT=",
        peg$c18 = { type: "literal", value: "DEFAULT_OUTPORT=", description: "\"DEFAULT_OUTPORT=\"" },
        peg$c19 = function(name) { defaultOutPort = name},
        peg$c20 = /^[\n\r\u2028\u2029]/,
        peg$c21 = { type: "class", value: "[\\n\\r\\u2028\\u2029]", description: "[\\n\\r\\u2028\\u2029]" },
        peg$c22 = function(edges) {return parser.registerEdges(edges);},
        peg$c23 = ",",
        peg$c24 = { type: "literal", value: ",", description: "\",\"" },
        peg$c25 = "#",
        peg$c26 = { type: "literal", value: "#", description: "\"#\"" },
        peg$c27 = "->",
        peg$c28 = { type: "literal", value: "->", description: "\"->\"" },
        peg$c29 = function(x, y) { return [x,y]; },
        peg$c30 = function(x, proc, y) { return [{"tgt":makeInPort(proc, x)},{"src":makeOutPort(proc, y)}]; },
        peg$c31 = function(proc, port) { return {"src":makeOutPort(proc, port)} },
        peg$c32 = function(port, proc) { return {"tgt":makeInPort(proc, port)} },
        peg$c33 = "'",
        peg$c34 = { type: "literal", value: "'", description: "\"'\"" },
        peg$c35 = function(iip) { return {"data":iip.join("")} },
        peg$c36 = function(iip) { return {"data":iip} },
        peg$c37 = function(name) { return name},
        peg$c38 = /^[a-zA-Z_]/,
        peg$c39 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
        peg$c40 = /^[a-zA-Z0-9_\-]/,
        peg$c41 = { type: "class", value: "[a-zA-Z0-9_\\-]", description: "[a-zA-Z0-9_\\-]" },
        peg$c42 = function(name) { return makeName(name)},
        peg$c43 = function(name, comp) { parser.addNode(name,comp); return name},
        peg$c44 = function(comp) { return parser.addAnonymousNode(comp, location().start.offset) },
        peg$c45 = "(",
        peg$c46 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c47 = /^[a-zA-Z\/\-0-9_]/,
        peg$c48 = { type: "class", value: "[a-zA-Z/\\-0-9_]", description: "[a-zA-Z/\\-0-9_]" },
        peg$c49 = ")",
        peg$c50 = { type: "literal", value: ")", description: "\")\"" },
        peg$c51 = function(comp, meta) { var o = {}; comp ? o.comp = comp.join("") : o.comp = ''; meta ? o.meta = meta.join("").split(',') : null; return o; },
        peg$c52 = /^[a-zA-Z\/=_,0-9]/,
        peg$c53 = { type: "class", value: "[a-zA-Z/=_,0-9]", description: "[a-zA-Z/=_,0-9]" },
        peg$c54 = function(meta) {return meta},
        peg$c55 = function(portname, portindex) {return { port: options.caseSensitive? portname : portname.toLowerCase(), index: portindex != null ? portindex : undefined }},
        peg$c56 = function(port) { return port; },
        peg$c57 = /^[a-zA-Z.0-9_]/,
        peg$c58 = { type: "class", value: "[a-zA-Z.0-9_]", description: "[a-zA-Z.0-9_]" },
        peg$c59 = function(portname) {return makeName(portname)},
        peg$c60 = "[",
        peg$c61 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c62 = /^[0-9]/,
        peg$c63 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c64 = "]",
        peg$c65 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c66 = function(portindex) {return parseInt(portindex.join(''))},
        peg$c67 = /^[^\n\r\u2028\u2029]/,
        peg$c68 = { type: "class", value: "[^\\n\\r\\u2028\\u2029]", description: "[^\\n\\r\\u2028\\u2029]" },
        peg$c69 = /^[\\]/,
        peg$c70 = { type: "class", value: "[\\\\]", description: "[\\\\]" },
        peg$c71 = /^[']/,
        peg$c72 = { type: "class", value: "[']", description: "[']" },
        peg$c73 = function() { return "'"; },
        peg$c74 = /^[^']/,
        peg$c75 = { type: "class", value: "[^']", description: "[^']" },
        peg$c76 = " ",
        peg$c77 = { type: "literal", value: " ", description: "\" \"" },
        peg$c78 = function(value) { return value; },
        peg$c79 = "{",
        peg$c80 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c81 = "}",
        peg$c82 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c83 = { type: "other", description: "whitespace" },
        peg$c84 = /^[ \t\n\r]/,
        peg$c85 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
        peg$c86 = "false",
        peg$c87 = { type: "literal", value: "false", description: "\"false\"" },
        peg$c88 = function() { return false; },
        peg$c89 = "null",
        peg$c90 = { type: "literal", value: "null", description: "\"null\"" },
        peg$c91 = function() { return null;  },
        peg$c92 = "true",
        peg$c93 = { type: "literal", value: "true", description: "\"true\"" },
        peg$c94 = function() { return true;  },
        peg$c95 = function(head, m) { return m; },
        peg$c96 = function(head, tail) {
                  var result = {}, i;

                  result[head.name] = head.value;

                  for (i = 0; i < tail.length; i++) {
                    result[tail[i].name] = tail[i].value;
                  }

                  return result;
                },
        peg$c97 = function(members) { return members !== null ? members: {}; },
        peg$c98 = function(name, value) {
                return { name: name, value: value };
              },
        peg$c99 = function(head, v) { return v; },
        peg$c100 = function(head, tail) { return [head].concat(tail); },
        peg$c101 = function(values) { return values !== null ? values : []; },
        peg$c102 = { type: "other", description: "number" },
        peg$c103 = function() { return parseFloat(text()); },
        peg$c104 = /^[1-9]/,
        peg$c105 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c106 = /^[eE]/,
        peg$c107 = { type: "class", value: "[eE]", description: "[eE]" },
        peg$c108 = "-",
        peg$c109 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c110 = "+",
        peg$c111 = { type: "literal", value: "+", description: "\"+\"" },
        peg$c112 = "0",
        peg$c113 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c114 = { type: "other", description: "string" },
        peg$c115 = function(chars) { return chars.join(""); },
        peg$c116 = "\"",
        peg$c117 = { type: "literal", value: "\"", description: "\"\\\"\"" },
        peg$c118 = "\\",
        peg$c119 = { type: "literal", value: "\\", description: "\"\\\\\"" },
        peg$c120 = "/",
        peg$c121 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c122 = "b",
        peg$c123 = { type: "literal", value: "b", description: "\"b\"" },
        peg$c124 = function() { return "\b"; },
        peg$c125 = "f",
        peg$c126 = { type: "literal", value: "f", description: "\"f\"" },
        peg$c127 = function() { return "\f"; },
        peg$c128 = "n",
        peg$c129 = { type: "literal", value: "n", description: "\"n\"" },
        peg$c130 = function() { return "\n"; },
        peg$c131 = "r",
        peg$c132 = { type: "literal", value: "r", description: "\"r\"" },
        peg$c133 = function() { return "\r"; },
        peg$c134 = "t",
        peg$c135 = { type: "literal", value: "t", description: "\"t\"" },
        peg$c136 = function() { return "\t"; },
        peg$c137 = "u",
        peg$c138 = { type: "literal", value: "u", description: "\"u\"" },
        peg$c139 = function(digits) {
                    return String.fromCharCode(parseInt(digits, 16));
                  },
        peg$c140 = function(sequence) { return sequence; },
        peg$c141 = /^[^\0-\x1F"\\]/,
        peg$c142 = { type: "class", value: "[^\\0-\\x1F\\x22\\x5C]", description: "[^\\0-\\x1F\\x22\\x5C]" },
        peg$c143 = /^[0-9a-f]/i,
        peg$c144 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseline();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parseline();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseline() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 7) === peg$c1) {
          s2 = peg$c1;
          peg$currPos += 7;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c2); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseportName();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 58) {
              s4 = peg$c3;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c4); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseportName();
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseLineTerminator();
                  if (s7 === peg$FAILED) {
                    s7 = null;
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c5(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 7) === peg$c6) {
            s2 = peg$c6;
            peg$currPos += 7;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c7); }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsenode();
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 46) {
                s4 = peg$c8;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c9); }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseportName();
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 58) {
                    s6 = peg$c3;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c4); }
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseportName();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseLineTerminator();
                        if (s9 === peg$FAILED) {
                          s9 = null;
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c10(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c11) {
              s2 = peg$c11;
              peg$currPos += 8;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c12); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parsenode();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 46) {
                  s4 = peg$c8;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c9); }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parseportName();
                  if (s5 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 58) {
                      s6 = peg$c3;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c4); }
                    }
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parseportName();
                      if (s7 !== peg$FAILED) {
                        s8 = peg$parse_();
                        if (s8 !== peg$FAILED) {
                          s9 = peg$parseLineTerminator();
                          if (s9 === peg$FAILED) {
                            s9 = null;
                          }
                          if (s9 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c13(s3, s5, s7);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parse_();
            if (s1 !== peg$FAILED) {
              if (input.substr(peg$currPos, 15) === peg$c14) {
                s2 = peg$c14;
                peg$currPos += 15;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c15); }
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parseportName();
                if (s3 !== peg$FAILED) {
                  s4 = peg$parse_();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseLineTerminator();
                    if (s5 === peg$FAILED) {
                      s5 = null;
                    }
                    if (s5 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c16(s3);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parse_();
              if (s1 !== peg$FAILED) {
                if (input.substr(peg$currPos, 16) === peg$c17) {
                  s2 = peg$c17;
                  peg$currPos += 16;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c18); }
                }
                if (s2 !== peg$FAILED) {
                  s3 = peg$parseportName();
                  if (s3 !== peg$FAILED) {
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parseLineTerminator();
                      if (s5 === peg$FAILED) {
                        s5 = null;
                      }
                      if (s5 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c19(s3);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parsecomment();
                if (s1 !== peg$FAILED) {
                  if (peg$c20.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c21); }
                  }
                  if (s2 === peg$FAILED) {
                    s2 = null;
                  }
                  if (s2 !== peg$FAILED) {
                    s1 = [s1, s2];
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$parse_();
                  if (s1 !== peg$FAILED) {
                    if (peg$c20.test(input.charAt(peg$currPos))) {
                      s2 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s2 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c21); }
                    }
                    if (s2 !== peg$FAILED) {
                      s1 = [s1, s2];
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$parse_();
                    if (s1 !== peg$FAILED) {
                      s2 = peg$parseconnection();
                      if (s2 !== peg$FAILED) {
                        s3 = peg$parse_();
                        if (s3 !== peg$FAILED) {
                          s4 = peg$parseLineTerminator();
                          if (s4 === peg$FAILED) {
                            s4 = null;
                          }
                          if (s4 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c22(s2);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseLineTerminator() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 44) {
          s2 = peg$c23;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecomment();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            if (peg$c20.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c21); }
            }
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s1 = [s1, s2, s3, s4];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 35) {
          s2 = peg$c25;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseanychar();
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$parseanychar();
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseconnection() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsesource();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c27) {
            s3 = peg$c27;
            peg$currPos += 2;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c28); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseconnection();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c29(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsedestination();
      }

      return s0;
    }

    function peg$parsesource() {
      var s0;

      s0 = peg$parsebridge();
      if (s0 === peg$FAILED) {
        s0 = peg$parseoutport();
        if (s0 === peg$FAILED) {
          s0 = peg$parseiip();
        }
      }

      return s0;
    }

    function peg$parsedestination() {
      var s0;

      s0 = peg$parseinport();
      if (s0 === peg$FAILED) {
        s0 = peg$parsebridge();
      }

      return s0;
    }

    function peg$parsebridge() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseport__();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenode();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse__port();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c30(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseport__();
        if (s1 === peg$FAILED) {
          s1 = null;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenodeWithComponent();
          if (s2 !== peg$FAILED) {
            s3 = peg$parse__port();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c30(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parseoutport() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsenode();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__port();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c31(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseinport() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseport__();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenode();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c32(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseiip() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 39) {
        s1 = peg$c33;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c34); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseiipchar();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseiipchar();
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 39) {
            s3 = peg$c33;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c34); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c35(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseJSON_text();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c36(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsenode() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenodeNameAndComponent();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c37(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsenodeName();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c37(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsenodeComponent();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c37(s1);
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsenodeName() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c38.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c39); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c40.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c40.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c41); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c42(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsenodeNameAndComponent() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsenodeName();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsecomponent();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c43(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsenodeComponent() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsecomponent();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c44(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsenodeWithComponent() {
      var s0;

      s0 = peg$parsenodeNameAndComponent();
      if (s0 === peg$FAILED) {
        s0 = peg$parsenodeComponent();
      }

      return s0;
    }

    function peg$parsecomponent() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c45;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c46); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c47.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c48); }
        }
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c47.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c48); }
          }
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecompMeta();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c49;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c50); }
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c51(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecompMeta() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 58) {
        s1 = peg$c3;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c4); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c52.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c53); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c52.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c53); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c54(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseport() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseportName();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseportIndex();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c55(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseport__() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseport();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse__();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c56(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parse__port() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse__();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseport();
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c56(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseportName() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c38.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c39); }
      }
      if (s2 !== peg$FAILED) {
        s3 = [];
        if (peg$c57.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c58); }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c57.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c58); }
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c59(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseportIndex() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c60;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c61); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c62.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c63); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c62.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c63); }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 93) {
            s3 = peg$c64;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c65); }
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c66(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseanychar() {
      var s0;

      if (peg$c67.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c68); }
      }

      return s0;
    }

    function peg$parseiipchar() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (peg$c69.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c70); }
      }
      if (s1 !== peg$FAILED) {
        if (peg$c71.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c72); }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c73();
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        if (peg$c74.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c75); }
        }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      s0 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s1 = peg$c76;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c77); }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (input.charCodeAt(peg$currPos) === 32) {
          s1 = peg$c76;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c77); }
        }
      }
      if (s0 === peg$FAILED) {
        s0 = null;
      }

      return s0;
    }

    function peg$parse__() {
      var s0, s1;

      s0 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s1 = peg$c76;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c77); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (input.charCodeAt(peg$currPos) === 32) {
            s1 = peg$c76;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c77); }
          }
        }
      } else {
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseJSON_text() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsews();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsevalue();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsews();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c78(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsebegin_array() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsews();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 91) {
          s2 = peg$c60;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c61); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsews();
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsebegin_object() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsews();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 123) {
          s2 = peg$c79;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c80); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsews();
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseend_array() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsews();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 93) {
          s2 = peg$c64;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c65); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsews();
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseend_object() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsews();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 125) {
          s2 = peg$c81;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c82); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsews();
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsename_separator() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsews();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s2 = peg$c3;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c4); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsews();
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsevalue_separator() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsews();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 44) {
          s2 = peg$c23;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsews();
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c84.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c85); }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c84.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c85); }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c83); }
      }

      return s0;
    }

    function peg$parsevalue() {
      var s0;

      s0 = peg$parsefalse();
      if (s0 === peg$FAILED) {
        s0 = peg$parsenull();
        if (s0 === peg$FAILED) {
          s0 = peg$parsetrue();
          if (s0 === peg$FAILED) {
            s0 = peg$parseobject();
            if (s0 === peg$FAILED) {
              s0 = peg$parsearray();
              if (s0 === peg$FAILED) {
                s0 = peg$parsenumber();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsestring();
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsefalse() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c86) {
        s1 = peg$c86;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c87); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c88();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsenull() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c89) {
        s1 = peg$c89;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c90); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c91();
      }
      s0 = s1;

      return s0;
    }

    function peg$parsetrue() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 4) === peg$c92) {
        s1 = peg$c92;
        peg$currPos += 4;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c93); }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c94();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseobject() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsebegin_object();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsemember();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$currPos;
          s6 = peg$parsevalue_separator();
          if (s6 !== peg$FAILED) {
            s7 = peg$parsemember();
            if (s7 !== peg$FAILED) {
              peg$savedPos = s5;
              s6 = peg$c95(s3, s7);
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$currPos;
            s6 = peg$parsevalue_separator();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsemember();
              if (s7 !== peg$FAILED) {
                peg$savedPos = s5;
                s6 = peg$c95(s3, s7);
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s2;
            s3 = peg$c96(s3, s4);
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseend_object();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c97(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsemember() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsestring();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsename_separator();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsevalue();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c98(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsearray() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsebegin_array();
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsevalue();
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$currPos;
          s6 = peg$parsevalue_separator();
          if (s6 !== peg$FAILED) {
            s7 = peg$parsevalue();
            if (s7 !== peg$FAILED) {
              peg$savedPos = s5;
              s6 = peg$c99(s3, s7);
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$currPos;
            s6 = peg$parsevalue_separator();
            if (s6 !== peg$FAILED) {
              s7 = peg$parsevalue();
              if (s7 !== peg$FAILED) {
                peg$savedPos = s5;
                s6 = peg$c99(s3, s7);
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          }
          if (s4 !== peg$FAILED) {
            peg$savedPos = s2;
            s3 = peg$c100(s3, s4);
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseend_array();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c101(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parseminus();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseint();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsefrac();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseexp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c103();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c102); }
      }

      return s0;
    }

    function peg$parsedecimal_point() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 46) {
        s0 = peg$c8;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }

      return s0;
    }

    function peg$parsedigit1_9() {
      var s0;

      if (peg$c104.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c105); }
      }

      return s0;
    }

    function peg$parsee() {
      var s0;

      if (peg$c106.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c107); }
      }

      return s0;
    }

    function peg$parseexp() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parsee();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseminus();
        if (s2 === peg$FAILED) {
          s2 = peg$parseplus();
        }
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseDIGIT();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseDIGIT();
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsefrac() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsedecimal_point();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseDIGIT();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseDIGIT();
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseint() {
      var s0, s1, s2, s3;

      s0 = peg$parsezero();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsedigit1_9();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parseDIGIT();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseDIGIT();
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parseminus() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 45) {
        s0 = peg$c108;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c109); }
      }

      return s0;
    }

    function peg$parseplus() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 43) {
        s0 = peg$c110;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c111); }
      }

      return s0;
    }

    function peg$parsezero() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 48) {
        s0 = peg$c112;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c113); }
      }

      return s0;
    }

    function peg$parsestring() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsequotation_mark();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsechar();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parsechar();
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsequotation_mark();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c115(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c114); }
      }

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$parseunescaped();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseescape();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s2 = peg$c116;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c117); }
          }
          if (s2 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 92) {
              s2 = peg$c118;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c119); }
            }
            if (s2 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 47) {
                s2 = peg$c120;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c121); }
              }
              if (s2 === peg$FAILED) {
                s2 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 98) {
                  s3 = peg$c122;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c123); }
                }
                if (s3 !== peg$FAILED) {
                  peg$savedPos = s2;
                  s3 = peg$c124();
                }
                s2 = s3;
                if (s2 === peg$FAILED) {
                  s2 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 102) {
                    s3 = peg$c125;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c126); }
                  }
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$c127();
                  }
                  s2 = s3;
                  if (s2 === peg$FAILED) {
                    s2 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 110) {
                      s3 = peg$c128;
                      peg$currPos++;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c129); }
                    }
                    if (s3 !== peg$FAILED) {
                      peg$savedPos = s2;
                      s3 = peg$c130();
                    }
                    s2 = s3;
                    if (s2 === peg$FAILED) {
                      s2 = peg$currPos;
                      if (input.charCodeAt(peg$currPos) === 114) {
                        s3 = peg$c131;
                        peg$currPos++;
                      } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c132); }
                      }
                      if (s3 !== peg$FAILED) {
                        peg$savedPos = s2;
                        s3 = peg$c133();
                      }
                      s2 = s3;
                      if (s2 === peg$FAILED) {
                        s2 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 116) {
                          s3 = peg$c134;
                          peg$currPos++;
                        } else {
                          s3 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c135); }
                        }
                        if (s3 !== peg$FAILED) {
                          peg$savedPos = s2;
                          s3 = peg$c136();
                        }
                        s2 = s3;
                        if (s2 === peg$FAILED) {
                          s2 = peg$currPos;
                          if (input.charCodeAt(peg$currPos) === 117) {
                            s3 = peg$c137;
                            peg$currPos++;
                          } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c138); }
                          }
                          if (s3 !== peg$FAILED) {
                            s4 = peg$currPos;
                            s5 = peg$currPos;
                            s6 = peg$parseHEXDIG();
                            if (s6 !== peg$FAILED) {
                              s7 = peg$parseHEXDIG();
                              if (s7 !== peg$FAILED) {
                                s8 = peg$parseHEXDIG();
                                if (s8 !== peg$FAILED) {
                                  s9 = peg$parseHEXDIG();
                                  if (s9 !== peg$FAILED) {
                                    s6 = [s6, s7, s8, s9];
                                    s5 = s6;
                                  } else {
                                    peg$currPos = s5;
                                    s5 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s5;
                                  s5 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s5;
                              s5 = peg$FAILED;
                            }
                            if (s5 !== peg$FAILED) {
                              s4 = input.substring(s4, peg$currPos);
                            } else {
                              s4 = s5;
                            }
                            if (s4 !== peg$FAILED) {
                              peg$savedPos = s2;
                              s3 = peg$c139(s4);
                              s2 = s3;
                            } else {
                              peg$currPos = s2;
                              s2 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c140(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parseescape() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 92) {
        s0 = peg$c118;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c119); }
      }

      return s0;
    }

    function peg$parsequotation_mark() {
      var s0;

      if (input.charCodeAt(peg$currPos) === 34) {
        s0 = peg$c116;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c117); }
      }

      return s0;
    }

    function peg$parseunescaped() {
      var s0;

      if (peg$c141.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c142); }
      }

      return s0;
    }

    function peg$parseDIGIT() {
      var s0;

      if (peg$c62.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c63); }
      }

      return s0;
    }

    function peg$parseHEXDIG() {
      var s0;

      if (peg$c143.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c144); }
      }

      return s0;
    }


      var parser, edges, nodes;

      var defaultInPort = "IN", defaultOutPort = "OUT";

      parser = this;
      delete parser.exports;
      delete parser.inports;
      delete parser.outports;

      edges = parser.edges = [];

      nodes = {};

      var serialize, indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      parser.serialize = function(graph) {
        var conn, getInOutName, getName, i, inPort, input, len, name, namedComponents, outPort, output, process, ref, ref1, ref2, src, srcName, srcPort, srcProcess, tgt, tgtName, tgtPort, tgtProcess;
        if (options == null) {
          options = {};
        }
        if (typeof(graph) === 'string') {
          input = JSON.parse(graph);
        } else {
          input = graph;
        }
        namedComponents = [];
        output = "";
        getName = function(name) {
          if (input.processes[name].metadata != null) {
            name = input.processes[name].metadata.label;
          }
          if (name.indexOf('/') > -1) {
            name = name.split('/').pop();
          }
          return name;
        };
        getInOutName = function(name, data) {
          if ((data.process != null) && (input.processes[data.process].metadata != null)) {
            name = input.processes[data.process].metadata.label;
          } else if (data.process != null) {
            name = data.process;
          }
          if (name.indexOf('/') > -1) {
            name = name.split('/').pop();
          }
          return name;
        };
        ref = input.inports;
        for (name in ref) {
          inPort = ref[name];
          process = getInOutName(name, inPort);
          name = name.toUpperCase();
          inPort.port = inPort.port.toUpperCase();
          output += "INPORT=" + process + "." + inPort.port + ":" + name + "\n";
        }
        ref1 = input.outports;
        for (name in ref1) {
          outPort = ref1[name];
          process = getInOutName(name, inPort);
          name = name.toUpperCase();
          outPort.port = outPort.port.toUpperCase();
          output += "OUTPORT=" + process + "." + outPort.port + ":" + name + "\n";
        }
        output += "\n";
        ref2 = input.connections;
        for (i = 0, len = ref2.length; i < len; i++) {
          conn = ref2[i];
          if (conn.data != null) {
            tgtPort = conn.tgt.port.toUpperCase();
            tgtName = conn.tgt.process;
            tgtProcess = input.processes[tgtName].component;
            tgt = getName(tgtName);
            if (indexOf.call(namedComponents, tgtProcess) < 0) {
              tgt += "(" + tgtProcess + ")";
              namedComponents.push(tgtProcess);
            }
            output += '"' + conn.data + '"' + (" -> " + tgtPort + " " + tgt + "\n");
          } else {
            srcPort = conn.src.port.toUpperCase();
            srcName = conn.src.process;
            srcProcess = input.processes[srcName].component;
            src = getName(srcName);
            if (indexOf.call(namedComponents, srcProcess) < 0) {
              src += "(" + srcProcess + ")";
              namedComponents.push(srcProcess);
            }
            tgtPort = conn.tgt.port.toUpperCase();
            tgtName = conn.tgt.process;
            tgtProcess = input.processes[tgtName].component;
            tgt = getName(tgtName);
            if (indexOf.call(namedComponents, tgtProcess) < 0) {
              tgt += "(" + tgtProcess + ")";
              namedComponents.push(tgtProcess);
            }
            output += src + " " + srcPort + " -> " + tgtPort + " " + tgt + "\n";
          }
        }
        return output;
      };

      parser.addNode = function (nodeName, comp) {
        if (!nodes[nodeName]) {
          nodes[nodeName] = {}
        }
        if (!!comp.comp) {
          nodes[nodeName].component = comp.comp;
        }
        if (!!comp.meta) {
          var metadata = {};
          for (var i = 0; i < comp.meta.length; i++) {
            var item = comp.meta[i].split('=');
            if (item.length === 1) {
              item = ['routes', item[0]];
            }
            var key = item[0];
            var value = item[1];
            if (key==='x' || key==='y') {
              value = parseFloat(value);
            }
            metadata[key] = value;
          }
          nodes[nodeName].metadata=metadata;
        }

      }

      var anonymousIndexes = {};
      var anonymousNodeNames = {};
      parser.addAnonymousNode = function(comp, offset) {
          if (!anonymousNodeNames[offset]) {
              var componentName = comp.comp.replace(/[^a-zA-Z0-9]+/, "_");
              anonymousIndexes[componentName] = (anonymousIndexes[componentName] || 0) + 1;
              anonymousNodeNames[offset] = "_" + componentName + "_" + anonymousIndexes[componentName];
              this.addNode(anonymousNodeNames[offset], comp);
          }
          return anonymousNodeNames[offset];
      }

      parser.getResult = function () {
        var result = {
          processes: nodes,
          connections: parser.processEdges(),
          exports: parser.exports,
          inports: parser.inports,
          outports: parser.outports
        };

        var validateSchema = parser.validateSchema; // default
        if (typeof(options.validateSchema) !== 'undefined') { validateSchema = options.validateSchema; } // explicit option
        if (validateSchema) {
          if (typeof(tv4) === 'undefined') {
            var tv4 = require("tv4");
          }
          var schema = require("../schema/graph.json");
          var validation = tv4.validateMultiple(result, schema);
          if (!validation.valid) {
            throw new Error("fbp: Did not validate againt graph schema:\n" + JSON.stringify(validation.errors, null, 2));
          }
        }
        result.caseSensitive = options.caseSensitive;
        return result;
      }

      var flatten = function (array, isShallow) {
        var index = -1,
          length = array ? array.length : 0,
          result = [];

        while (++index < length) {
          var value = array[index];

          if (value instanceof Array) {
            Array.prototype.push.apply(result, isShallow ? value : flatten(value));
          }
          else {
            result.push(value);
          }
        }
        return result;
      }

      parser.registerExports = function (priv, pub) {
        if (!parser.exports) {
          parser.exports = [];
        }

        if (!options.caseSensitive) {
          priv = priv.toLowerCase();
          pub = pub.toLowerCase();
        }

        parser.exports.push({private:priv, public:pub});
      }
      parser.registerInports = function (node, port, pub) {
        if (!parser.inports) {
          parser.inports = {};
        }

        if (!options.caseSensitive) {
          pub = pub.toLowerCase();
          port = port.toLowerCase();
        }

        parser.inports[pub] = {process:node, port:port};
      }
      parser.registerOutports = function (node, port, pub) {
        if (!parser.outports) {
          parser.outports = {};
        }

        if (!options.caseSensitive) {
          pub = pub.toLowerCase();
          port = port.toLowerCase();
        }

        parser.outports[pub] = {process:node, port:port};
      }

      parser.registerEdges = function (edges) {
        if (Array.isArray(edges)) {
          edges.forEach(function (o, i) {
            parser.edges.push(o);
          });
        }
      }

      parser.processEdges = function () {
        var flats, grouped;
        flats = flatten(parser.edges);
        grouped = [];
        var current = {};
        for (var i = 1; i < flats.length; i += 1) {
            // skip over default ports at the beginning of lines (could also handle this in grammar)
            if (("src" in flats[i - 1] || "data" in flats[i - 1]) && "tgt" in flats[i]) {
                flats[i - 1].tgt = flats[i].tgt;
                grouped.push(flats[i - 1]);
                i++;
            }
        }
        return grouped;
      }

      function makeName(s) {
        return s[0] + s[1].join("");
      }

      function makePort(process, port, defaultPort) {
        if (!options.caseSensitive) {
          defaultPort = defaultPort.toLowerCase()
        }
        var p = {
            process: process,
            port: port ? port.port : defaultPort
        };
        if (port && port.index != null) {
            p.index = port.index;
        }
        return p;
    }

      function makeInPort(process, port) {
          return makePort(process, port, defaultInPort);
      }
      function makeOutPort(process, port) {
          return makePort(process, port, defaultOutPort);
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();
},{"../schema/graph.json":5,"tv4":13}],5:[function(require,module,exports){
module.exports={
  "$schema": "http://json-schema.org/draft-04/schema",
  "id": "graph.json",
  "title": "FBP graph",
  "description": "A graph of FBP processes and connections between them.\nThis is the primary way of specifying FBP programs.\n",
  "name": "graph",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "properties": {
      "type": "object",
      "description": "User-defined properties attached to the graph.",
      "additionalProperties": true,
      "properties": {
        "name": {
          "type": "string"
        }
      }
    },
    "inports": {
      "type": [
        "object",
        "undefined"
      ],
      "description": "Exported inports of the graph",
      "additionalProperties": true,
      "patternProperties": {
        "[a-z0-9]+": {
          "type": "object",
          "properties": {
            "process": {
              "type": "string"
            },
            "port": {
              "type": "string"
            },
            "metadata": {
              "type": "object",
              "additionalProperties": true
            }
          }
        }
      }
    },
    "outports": {
      "type": [
        "object",
        "undefined"
      ],
      "description": "Exported outports of the graph",
      "additionalProperties": true,
      "patternProperties": {
        "[a-z0-9]+": {
          "type": "object",
          "properties": {
            "process": {
              "type": "string"
            },
            "port": {
              "type": "string"
            },
            "metadata": {
              "type": "object",
              "additionalProperties": true
            }
          }
        }
      }
    },
    "exports": {
      "type": [
        "array",
        "undefined"
      ],
      "description": "Deprecated, use inports and outports instead"
    },
    "groups": {
      "type": "array",
      "description": "List of groups of processes",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string"
          },
          "nodes": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "metadata": {
            "additionalProperties": true
          }
        }
      }
    },
    "processes": {
      "type": "object",
      "description": "The processes of this graph.\nEach process is an instance of a component.\n",
      "additionalProperties": false,
      "patternProperties": {
        "[a-zA-Z0-9_]+": {
          "type": "object",
          "properties": {
            "component": {
              "type": "string"
            },
            "metadata": {
              "type": "object",
              "additionalProperties": true
            }
          }
        }
      }
    },
    "connections": {
      "type": "array",
      "description": "Connections of the graph.\nA connection either connects ports of two processes, or specifices an IIP as initial input packet to a port.\n",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "src": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "process": {
                "type": "string"
              },
              "port": {
                "type": "string"
              },
              "index": {
                "type": "integer"
              }
            }
          },
          "tgt": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "process": {
                "type": "string"
              },
              "port": {
                "type": "string"
              },
              "index": {
                "type": "integer"
              }
            }
          },
          "data": {},
          "metadata": {
            "type": "object",
            "additionalProperties": true
          }
        }
      }
    }
  }
}
},{}],6:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"min-document":3}],7:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],9:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12

module.exports = function (h, opts) {
  h = attrToProp(h)
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state)) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === TEXT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[\w-]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":8}],10:[function(require,module,exports){
/** klay.js version 0.4.1 build 201604131004 */
var klayregister;
var klaycallback;
(function(){
var $wnd, $doc;if(typeof(window) !== 'undefined'){ $wnd = window; $doc = $wnd.document; }
else { $wnd = { Array: function(){} }; }
function kI(){}
function iI(){}
function pb(){}
function Ab(){}
function Tt(){}
function Jt(){}
function Jq(){}
function Vq(){}
function Vs(){}
function yl(){}
function Yl(){}
function gm(){}
function Cu(){}
function tJ(){}
function NJ(){}
function PJ(){}
function PS(){}
function sS(){}
function yS(){}
function AS(){}
function MS(){}
function RS(){}
function TS(){}
function lR(){}
function HR(){}
function IR(){}
function KR(){}
function WR(){}
function AT(){}
function FT(){}
function HT(){}
function JT(){}
function LT(){}
function NT(){}
function sU(){}
function uV(){}
function xV(){}
function EV(){}
function HW(){}
function UX(){}
function XX(){}
function ZX(){}
function _X(){}
function bY(){}
function dY(){}
function wY(){}
function zY(){}
function SY(){}
function VY(){}
function qZ(){}
function tZ(){}
function wZ(){}
function AZ(){}
function d$(){}
function g$(){}
function j$(){}
function w$(){}
function z$(){}
function C$(){}
function F$(){}
function I$(){}
function L$(){}
function N$(){}
function R$(){}
function X$(){}
function _$(){}
function k0(){}
function m0(){}
function s0(){}
function w0(){}
function A0(){}
function C0(){}
function E0(){}
function G0(){}
function V0(){}
function Z0(){}
function _0(){}
function _1(){}
function b1(){}
function e1(){}
function k1(){}
function q1(){}
function u1(){}
function R1(){}
function X1(){}
function Z1(){}
function c2(){}
function f2(){}
function h2(){}
function k2(){}
function n2(){}
function q2(){}
function x2(){}
function A2(){}
function H2(){}
function H4(){}
function z4(){}
function B4(){}
function D4(){}
function U4(){}
function i3(){}
function l3(){}
function u3(){}
function C3(){}
function I3(){}
function $5(){}
function d7(){}
function V7(){}
function q8(){}
function smb(){}
function Wbb(){}
function rcb(){}
function Mcb(){}
function Vdb(){}
function hkb(){}
function Kpb(){}
function Spb(){}
function aqb(){}
function iqb(){}
function pqb(){}
function isb(){}
function mvb(){}
function zwb(){}
function yfb(a){}
function sP(a){}
function XW(a){}
function _t(){Wt()}
function lI(){GP()}
function J8(){G8()}
function m8(){k8()}
function CQ(){zQ()}
function CV(){AV()}
function q0(){p0()}
function S0(){J0()}
function y9(){w9()}
function Bab(){zab()}
function Qab(){Hab()}
function cbb(){abb()}
function sbb(){rbb()}
function Ycb(){Xcb()}
function Wfb(){Mfb()}
function ft(){_s(this)}
function uP(){sP(this)}
function GU(){tU(this)}
function ZW(){XW(this)}
function ic(a){this.a=a}
function sc(a){this.a=a}
function $c(a){this.a=a}
function sf(a){this.a=a}
function Qg(a){this.a=a}
function qh(a){this.a=a}
function Vj(a){this.a=a}
function Nk(a){this.a=a}
function km(a){this.a=a}
function dm(a){this.b=a}
function En(a){this.a=a}
function Hn(a){this.a=a}
function Yp(a){this.a=a}
function bq(a){this.a=a}
function eq(a){this.a=a}
function tq(a){this.a=a}
function wq(a){this.a=a}
function ku(a){this.a=a}
function uu(a){this.a=a}
function Gu(a){this.a=a}
function Uu(a){this.a=a}
function WJ(a){this.a=a}
function rP(a){this.a=a}
function $V(a){this.a=a}
function tW(a){this.a=a}
function yW(a){this.e=a}
function fY(a){this.a=a}
function hY(a){this.a=a}
function lY(a){this.a=a}
function nY(a){this.a=a}
function CY(a){this.a=a}
function JY(a){this.a=a}
function SZ(a){this.a=a}
function Z$(a){this.a=a}
function b_(a){this.a=a}
function d_(a){this.a=a}
function f_(a){this.a=a}
function w1(a){this.a=a}
function y1(a){this.a=a}
function E3(a){this.a=a}
function q4(a){this.a=a}
function x4(a){this.a=a}
function F4(a){this.a=a}
function $8(a){this.a=a}
function a9(a){this.a=a}
function l9(a){this.a=a}
function C9(a){this.a=a}
function k9(a){this.c=a}
function wlb(a){this.a=a}
function nxb(a){this.a=a}
function wcb(a){this.a=a}
function tdb(a){this.a=a}
function ydb(a){this.a=a}
function Ddb(a){this.a=a}
function lkb(a){this.a=a}
function klb(a){this.a=a}
function llb(a){this.a=a}
function inb(a){this.a=a}
function wnb(a){this.d=a}
function Snb(a){this.a=a}
function Ynb(a){this.a=a}
function aob(a){this.a=a}
function fob(a){this.a=a}
function Bob(a){this.b=a}
function Gob(a){this.a=a}
function Mob(a){this.a=a}
function Tob(a){this.c=a}
function opb(a){this.a=a}
function Ipb(a){this.a=a}
function rqb(a){this.a=a}
function zqb(a){this.b=a}
function Nqb(a){this.b=a}
function mrb(a){this.c=a}
function Trb(a){this.a=a}
function Xrb(a){this.a=a}
function Fsb(a){this.a=a}
function ju(){this.a=[]}
function ytb(a){this.a=a}
function Lub(a){this.a=a}
function u5(a){a.b=a.a}
function vg(a){a.c=a.d.d}
function sX(a,b){a.g=b}
function bfb(a,b){a.k=b}
function qfb(a,b){a.a=b}
function rfb(a,b){a.b=b}
function qW(a,b){a.e.k=b}
function qu(a){return a.a}
function yu(a){return a.a}
function Mu(a){return a.a}
function $u(a){return a.a}
function rv(a){return a.a}
function jv(){return null}
function Fu(){return null}
function Rh(){this.c=this}
function tkb(){_s(this)}
function ntb(){Ymb(this)}
function b5(a){a5(this,a)}
function GO(a){IO();$O(a)}
function mI(a){a.a=new aJ}
function IZ(a,b){a.a=b-a.a}
function KZ(a,b){a.b=b-a.b}
function Dq(){Dq=iI;new Jq}
function nW(){nW=iI;new HW}
function ni(){throw new Hmb}
function ii(){throw new Hmb}
function ji(){throw new Hmb}
function li(){throw new Hmb}
function mi(){throw new Hmb}
function dd(){throw new Hmb}
function pj(){throw new Hmb}
function Wn(){throw new Hmb}
function $n(){throw new Hmb}
function qT(){this.a=new GU}
function fU(){this.a=new GU}
function cV(){this.a=new GU}
function pV(){this.a=new GU}
function l7(){this.a=new GU}
function k7(){this.a=new d7}
function A7(){this.a=new n7}
function t8(){this.b=new GU}
function jJ(){aJ.call(this)}
function ZN(){UN.call(this)}
function AP(){uP.call(this)}
function DP(){uP.call(this)}
function q7(){GU.call(this)}
function alb(){ft.call(this)}
function rlb(){ft.call(this)}
function nkb(){ft.call(this)}
function qkb(){ft.call(this)}
function tlb(){ft.call(this)}
function Vlb(){ft.call(this)}
function Hmb(){ft.call(this)}
function Wab(){this.f=new GU}
function Ybb(){this.d=new GU}
function jV(){this.a=new vtb}
function vqb(){throw new Hmb}
function wqb(){throw new Hmb}
function xqb(){throw new Hmb}
function yqb(){throw new Hmb}
function Mqb(){throw new Hmb}
function Uvb(){this.a=new GU}
function it(){it=iI;ht=new pb}
function bmb(){bmb=iI;new smb}
function zb(){zb=iI;yb=new Ab}
function Tq(){Tq=iI;Sq=new Vq}
function dr(){dr=iI;cr=new er}
function Gt(){Gt=iI;Ft=new Jt}
function Bu(){Bu=iI;Au=new Cu}
function fR(){fR=iI;eR=new lR}
function VR(){VR=iI;UR=new WR}
function jS(a){dS(a);return a}
function jl(a){Gi();this.a=a}
function vi(a){hi();this.a=a}
function Uk(a){hi();this.a=a}
function Zk(a){hi();this.a=a}
function ds(a,b){a.i=b;b.f=a}
function ycb(a,b){stb(a.b,b)}
function nsb(){ft.call(this)}
function osb(){ft.call(this)}
function nvb(){ft.call(this)}
function Ccb(){Bcb.call(this)}
function Jcb(){Bcb.call(this)}
function pkb(){nkb.call(this)}
function Xlb(){rlb.call(this)}
function gt(a){et.call(this,a)}
function Vd(a){Md.call(this,a)}
function uh(a){Md.call(this,a)}
function Bk(a){Hj.call(this,a)}
function Jk(a){dk.call(this,a)}
function Lm(a){Em.call(this,a)}
function nq(a){vm.call(this,a)}
function ap(a){Ro.call(this,a)}
function ir(a){Hj.call(this,a)}
function Op(a,b){a.a.W().nb(b)}
function emb(a,b){return a===b}
function Zr(a){return !a?0:a.a}
function Rs(a){return !a?0:a.d}
function Ts(a){return !a?0:a.j}
function zu(a){gt.call(this,a)}
function $J(a){gt.call(this,a)}
function _J(a){gt.call(this,a)}
function EQ(a){_J.call(this,a)}
function Tu(){Uu.call(this,{})}
function y5(a){b5.call(this,a)}
function H5(a){b5.call(this,a)}
function WP(a,b,c){XP(a,b.b,c)}
function a7(a,b,c){f6(a.c,b,c)}
function qV(a,b,c){a.b.Fc(b,c)}
function M9(a){$8.call(this,a)}
function P9(a){$8.call(this,a)}
function YY(){this.a=(sK(),qK)}
function cZ(){this.a=(sK(),qK)}
function vtb(){this.a=new ntb}
function Vwb(){this.a=new iwb}
function vT(){vT=iI;uT=new AT}
function AV(){AV=iI;zV=new EV}
function p0(){p0=iI;o0=new s0}
function Ckb(a){xkb();return a}
function Ixb(a){Dxb(a);return a}
function ikb(a){et.call(this,a)}
function okb(a){gt.call(this,a)}
function slb(a){gt.call(this,a)}
function Kb(a){this.c=$v(_b(a))}
function FI(){this.a=0;this.b=0}
function aJ(){OI(this);_I(this)}
function cI(){aI==null&&(aI=[])}
function Vvb(a){a.b=null;a.c=0}
function mS(a,b){a.b=b;return a}
function nS(a,b){a.c=b;return a}
function oS(a,b){a.f=b;return a}
function pS(a,b){a.g=b;return a}
function S7(a,b){a.a=b;return a}
function T7(a,b){a.f=b;return a}
function U7(a,b){a.k=b;return a}
function xc(a,b){return a.e-b.e}
function H3(a,b){return a.d-b.d}
function Klb(a){return a<0?-a:a}
function hlb(a){return isNaN(a)}
function gv(a){return new Gu(a)}
function iv(a){return new lv(a)}
function rkb(a){gt.call(this,a)}
function ulb(a){gt.call(this,a)}
function Ulb(a){gt.call(this,a)}
function Wlb(a){gt.call(this,a)}
function Imb(a){gt.call(this,a)}
function et(a){this.f=a;_s(this)}
function _2(){this.b=0;this.a=0}
function Ws(){Ws=iI;Math.log(2)}
function Ytb(){Ytb=iI;Xtb=$tb()}
function Vtb(c,a,b){c.set(a,b)}
function Wtb(c,a,b){c.set(a,b)}
function Ot(a,b){Nt();Mt.dc(a,b)}
function tv(a,b){return Skb(a,b)}
function zm(a,b){return a.a.B(b)}
function aP(a,b){return a.g[b.e]}
function bP(a,b){return a.i[b.e]}
function cP(a,b){return a.j[b.e]}
function dP(a,b){return a.n[b.e]}
function eP(a,b){return a.o[b.e]}
function Ou(b,a){return a in b.a}
function Tab(a,b){return a.b-b.b}
function ndb(a,b){return a.d-b.d}
function jgb(a,b){return a.i-b.i}
function Nlb(a,b){return a>b?a:b}
function Olb(a,b){return a>b?a:b}
function Plb(a,b){return a>b?a:b}
function Qlb(a,b){return a<b?a:b}
function Rlb(a,b){return a<b?a:b}
function Slb(a,b){return a<b?a:b}
function awb(a){return !!a&&a.b}
function $ob(a){_ob(a,a.length)}
function bpb(a){apb(a,a.length)}
function dpb(a){cpb(a,a.length)}
function Cmb(a){okb.call(this,a)}
function Bmb(a){lkb.call(this,a)}
function oxb(a){nxb.call(this,a)}
function Ylb(a){slb.call(this,a)}
function Frb(a){zqb.call(this,a)}
function Nrb(a){Frb.call(this,a)}
function csb(a){Rqb.call(this,a)}
function zmb(){lkb.call(this,'')}
function Amb(){lkb.call(this,'')}
function Ikb(a){Gkb(a);return a.n}
function Jkb(a){Gkb(a);return a.j}
function Hkb(a){return a.e&&a.e()}
function Lk(a,b){return a.a.sb(b)}
function Sb(a,b){return a?a:_b(b)}
function vW(a,b){return rJ(a.a,b)}
function w4(a,b){return t4(a.a,b)}
function VH(a,b){return RH(a,b)<0}
function Dlb(a){return bmb(),''+a}
function qe(a){return !a?null:a.d}
function Gr(a){hi();this.a=_b(a)}
function I9(){F9();this.g=new Um}
function J0(){J0=iI;I0=(kP(),hP)}
function Et(){ut!=0&&(ut=0);wt=-1}
function bS(a){cS(a,a.d);return a}
function i7(a,b){a.a.d=b;return a}
function g7(a,b){a.a.a=b;return a}
function h7(a,b){a.a.c=b;return a}
function j7(a,b){a.a.f=b;return a}
function z7(a,b){a.a.f=b;return a}
function y7(a,b){a.a.b=b;return a}
function hxb(a,b,c){a.splice(b,c)}
function oqb(a,b){return Akb(b,a)}
function Drb(a,b){return a.b.t(b)}
function jrb(a,b){return a.c.t(b)}
function ttb(a,b){return a.a.R(b)}
function Ttb(b,a){return b.get(a)}
function Utb(b,a){return b.get(a)}
function elb(a,b){return a.test(b)}
function Jlb(a){return a<=0?0-a:a}
function ilb(a){return bmb(),''+a}
function qlb(a){return bmb(),''+a}
function wtb(a){this.a=new otb(a)}
function Wwb(a){this.a=new jwb(a)}
function nc(a){this.a=Wv(_b(a),19)}
function Bf(a){this.b=Wv(_b(a),57)}
function Ch(a){this.d=Wv(_b(a),56)}
function Ac(a,b){this.d=a;this.e=b}
function Ie(a,b){this.b=a;this.a=b}
function tm(a,b){this.b=a;this.a=b}
function Pf(a,b){this.b=a;this.c=b}
function Fk(a,b){this.a=a;this.b=b}
function Bn(a,b){this.a=a;this.b=b}
function Sn(a,b){this.a=a;this.f=b}
function Mc(a,b){Ac.call(this,a,b)}
function Hh(a,b){Ac.call(this,a,b)}
function yp(a,b){Ac.call(this,a,b)}
function bp(a,b){this.b=a;this.c=b}
function Oq(a,b){this.e=a;this.c=b}
function Yq(a,b){this.a=a;this.b=b}
function fs(a,b){this.a=a;this.b=b}
function rs(a,b){Ac.call(this,a,b)}
function _u(a,b){this.a=a;this.b=b}
function Mo(a){this.a=Wv(_b(a),20)}
function Ro(a){this.a=Wv(_b(a),20)}
function Fp(a){this.a=Wv(_b(a),57)}
function vm(a){this.b=Wv(_b(a),35)}
function HI(a,b){this.a=a;this.b=b}
function RJ(a,b){this.a=a;this.b=b}
function jK(a,b){Ac.call(this,a,b)}
function Qm(a,b){return Qmb(a.b,b)}
function fv(a){return tu(),a?su:ru}
function tK(a){return a==oK||a==pK}
function uK(a){return a==rK||a==nK}
function RI(a,b){TI(a,b,a.a,a.a.a)}
function SI(a,b){TI(a,b,a.c.b,a.c)}
function wK(a,b){Ac.call(this,a,b)}
function FK(a,b){Ac.call(this,a,b)}
function OK(a,b){Ac.call(this,a,b)}
function ZK(a,b){Ac.call(this,a,b)}
function fL(a,b){Ac.call(this,a,b)}
function pM(a,b){Ac.call(this,a,b)}
function AM(a,b){Ac.call(this,a,b)}
function NM(a,b){Ac.call(this,a,b)}
function VM(a,b){Ac.call(this,a,b)}
function uN(a,b){Ac.call(this,a,b)}
function EN(a,b){Ac.call(this,a,b)}
function NN(a,b){Ac.call(this,a,b)}
function EO(a,b){Ac.call(this,a,b)}
function lP(a,b){Ac.call(this,a,b)}
function OS(a,b){this.b=a;this.a=b}
function VS(a,b){this.c=a;this.d=b}
function wW(a,b){this.a=a;this.c=b}
function BW(a,b){this.e=a;this.c=b}
function FW(a,b){this.e=a;this.d=b}
function fT(a,b){Ac.call(this,a,b)}
function DX(a,b){Ac.call(this,a,b)}
function MY(a,b){this.a=a;this.b=b}
function PY(a,b){this.a=a;this.b=b}
function YZ(a,b){Ac.call(this,a,b)}
function f0(a,b){Ac.call(this,a,b)}
function J1(a,b){Ac.call(this,a,b)}
function Y3(a,b){Ac.call(this,a,b)}
function h4(a,b){Ac.call(this,a,b)}
function $7(a,b){Ac.call(this,a,b)}
function y8(a,b){Ac.call(this,a,b)}
function q9(a,b){Ac.call(this,a,b)}
function MR(a,b){return Zsb(a.c,b)}
function Bnb(a){return a.b<a.d.Y()}
function Zmb(a){return a.d.c+a.e.c}
function hrb(a,b){return a.c.ab(b)}
function Brb(a,b){return a.b.kb(b)}
function Crb(a,b){return a.b.lb(b)}
function Erb(a,b){return a.b.pb(b)}
function Irb(a,b){return a.b.kb(b)}
function Jrb(a,b){return a.b.lb(b)}
function dT(a){return a==$S||a==bT}
function eT(a){return a==$S||a==_S}
function MM(a){return a!=IM&&a!=JM}
function lg(a){return Yf(a),a.d.Y()}
function jtb(a){this.c=a;gtb(this)}
function otb(a){$mb.call(this,a,0)}
function iwb(){jwb.call(this,null)}
function xk(){uh.call(this,new ntb)}
function Ap(){yp.call(this,'KEY',0)}
function lr(a){kr();dk.call(this,a)}
function Dt(a){$wnd.clearTimeout(a)}
function um(a){return a.Vb(a.b.H())}
function Pp(a){this.a=Wv(_b(a),144)}
function Um(){this.b=(mp(),new ntb)}
function hsb(){hsb=iI;gsb=new isb}
function Rpb(){Rpb=iI;Qpb=new Spb}
function nqb(){nqb=iI;mqb=new pqb}
function hc(){hc=iI;gc=new Kb(',')}
function nJ(){nJ=iI;Math.pow(2,-65)}
function UN(){VN.call(this,0,0,0,0)}
function wab(a,b){Ac.call(this,a,b)}
function lbb(a,b){Ac.call(this,a,b)}
function Hbb(a,b){Ac.call(this,a,b)}
function Mbb(a,b){Ac.call(this,a,b)}
function xQ(a){wJ();CJ.call(this,a)}
function mcb(a,b){Ac.call(this,a,b)}
function gab(a,b){this.c=a;this.b=b}
function Qbb(a,b){this.a=a;this.b=b}
function Fcb(a,b){this.b=a;this.d=b}
function ggb(a,b){Ac.call(this,a,b)}
function Agb(a,b){Ac.call(this,a,b)}
function Igb(a,b){Ac.call(this,a,b)}
function Rgb(a,b){Ac.call(this,a,b)}
function ahb(a,b){Ac.call(this,a,b)}
function phb(a,b){Ac.call(this,a,b)}
function Ihb(a,b){Ac.call(this,a,b)}
function Nhb(a,b){Ac.call(this,a,b)}
function Yib(a,b){Ac.call(this,a,b)}
function ejb(a,b){Ac.call(this,a,b)}
function Rjb(a,b){Ac.call(this,a,b)}
function dkb(a,b){Ac.call(this,a,b)}
function fxb(a,b,c){a.splice(b,0,c)}
function Yjb(a,b,c){a.g[b.e][b.e]=c}
function D6(a,b){a.a=b;a.g=0;a.f=0}
function BI(a){a.a=0;a.b=0;return a}
function rY(a){return zU(a.b.c,a,0)}
function Llb(a){return Math.ceil(a)}
function Tlb(a){return Math.sqrt(a)}
function cub(a,b){return Utb(a.a,b)}
function vob(a,b){return !!Wvb(a,b)}
function Yob(a,b){Zob(a,a.length,b)}
function Gwb(a,b){Ac.call(this,a,b)}
function Psb(a,b){this.b=a;this.a=b}
function qob(a,b){this.d=a;this.e=b}
function dcb(){$bb();this.c=new vtb}
function Rdb(){Ndb();this.a=new vtb}
function aub(){Ytb();return new Xtb}
function Xb(a){if(!a){throw new rlb}}
function dc(a){if(!a){throw new tlb}}
function Vm(a){if(!a){throw new nvb}}
function SV(){this.b=(mp(),new ntb)}
function Q4(){this.b=(mp(),new ntb)}
function II(a){this.a=a.a;this.b=a.b}
function gw(a){return a==null?null:a}
function re(a){return !a?null:a.zb()}
function $i(a,b){return a.Nb().sb(b)}
function aq(a,b){return a.a.a.a.U(b)}
function nl(a,b){return Ll(a.mb(),b)}
function B3(a,b){return glb(b.b,a.b)}
function h3(a,b){return glb(b.k,a.k)}
function Mlb(a){return Math.floor(a)}
function vmb(a,b){return a.a+=''+b,a}
function xmb(a,b){a.a+=''+b;return a}
function ymb(a,b){a.a+=''+b;return a}
function iw(a){Hxb(a==null);return a}
function T2(a){a.d&&Z2(a);return a.a}
function U2(a){a.d&&Z2(a);return a.b}
function V2(a){a.d&&Z2(a);return a.c}
function Tvb(a,b){vU(a.a,b);return b}
function ptb(a){Ymb(this);he(this,a)}
function _4(a){this.c=a;this.e=false}
function Jh(){Hh.call(this,'OPEN',0)}
function ts(){rs.call(this,'SIZE',0)}
function qxb(){nxb.call(this,'UTF-8')}
function Nxb(){Nxb=iI;Kxb={};Mxb={}}
function IO(){IO=iI;HO=new DJ(yzb,0)}
function Sh(a){_b(a);return new Vh(a)}
function pmb(a){bmb();return a.length}
function Jmb(a,b){return cmb(a.a,b.a)}
function vlb(a,b){return xlb(a.a,b.a)}
function Ys(a,b){return a==b?0:a?1:-1}
function Cs(a){return Rs(a.e)-Rs(a.g)}
function xI(a){return new HI(a.a,a.b)}
function RN(a){return new HI(a.d,a.e)}
function tU(a){a.c=xv(UF,syb,1,0,4,1)}
function Cp(){yp.call(this,'VALUE',1)}
function dX(a){cX.call(this);this.a=a}
function Q2(a){this.a=new $2;this.b=a}
function Vh(a){this.a=a;Rh.call(this)}
function vl(a){this.a=a;Rh.call(this)}
function U8(){P8();this.d=(ckb(),bkb)}
function zxb(a){if(!a){throw new qkb}}
function uxb(a){if(!a){throw new tlb}}
function vxb(a){if(!a){throw new rlb}}
function Hxb(a){if(!a){throw new alb}}
function Bxb(a){if(!a){throw new nvb}}
function Wub(){ytb.call(this,new wub)}
function Kh(){Hh.call(this,'CLOSED',1)}
function Im(a){Em.call(this,new Lm(a))}
function p7(a,b){++a.d;return BU(a,b)}
function kkb(a,b){return gmb(a.a,0,b)}
function jlb(a,b){return glb(a.a,b.a)}
function Al(a){return Pl(a.b.mb(),a.a)}
function Dl(a){return Wl(a.a.mb(),a.b)}
function q6(a,b){return b==a.c?a.d:a.c}
function Zs(a,b){return a<b?-1:a>b?1:0}
function xlb(a,b){return a<b?-1:a>b?1:0}
function pvb(a){return a!=null?vb(a):0}
function Ntb(a){this.a=aub();this.b=a}
function fub(a){this.a=aub();this.b=a}
function Cg(a){this.a=a;xg.call(this,a)}
function o4(){n4();this.b=new q4(this)}
function Oh(){Oh=iI;Nh=Jb(new Kb(', '))}
function Gh(){Gh=iI;Fh=new Jh;Eh=new Kh}
function Il(){Il=iI;Gl=new Yl;Hl=new gm}
function xp(){xp=iI;vp=new Ap;wp=new Cp}
function qs(){qs=iI;ps=new ts;os=new ws}
function wJ(){wJ=iI;uJ=new NJ;vJ=new PJ}
function Teb(a){a.g=new GU;a.b=new GU}
function OI(a){a.a=new mvb;a.c=new mvb}
function n4(){n4=iI;m4=new U4;l4=new u4}
function Uc(){Mc.call(this,'IS_NULL',2)}
function Kwb(){Gwb.call(this,'Head',1)}
function Pwb(){Gwb.call(this,'Tail',3)}
function pR(a,b){qR.call(this,a,b,null)}
function lpb(a,b){ipb(a,0,a.length,b)}
function x7(a,b){vU(b.a,a.a);return a.a}
function CI(a,b){a.a*=b;a.b*=b;return a}
function gl(a,b){Gi();this.a=a;this.b=b}
function i9(a,b){return a.a[b.d.k][b.k]}
function W9(a,b){return a.a[b.d.k][b.k]}
function xJ(a,b){return kmb(a.b,b.mc())}
function Swb(a,b){return qe(Xvb(a.a,b))}
function Twb(a,b){return qe(Yvb(a.a,b))}
function $T(a,b){return Wv(Dd(a.a,b),20)}
function aw(a,b){return a!=null&&Vv(a,b)}
function Qob(a){return a.a<a.c.c.length}
function htb(a){return a.a<a.c.a.length}
function y$(a,b){return glb(a.i.a,b.i.a)}
function S$(a,b){return a.i.b=(Dxb(b),b)}
function T$(a,b){return a.i.b=(Dxb(b),b)}
function utb(a,b){return a.a.eb(b)!=null}
function Vjb(a,b,c){return a.g[b.e][c.e]}
function Bkb(a){xkb();return bmb(),''+a}
function Mwb(){Gwb.call(this,'Range',2)}
function ws(){rs.call(this,'DISTINCT',1)}
function Xc(){Mc.call(this,'NOT_NULL',3)}
function mp(){mp=iI;lp=new Rb((Oh(),Nh))}
function Hj(a){this.d=(ypb(),new mrb(a))}
function Hb(a,b){return Gb(a,new zmb,b).a}
function Mb(a,b){return b==null?a.b:Ib(b)}
function mt(a){return a==null?null:a.name}
function cw(a){return typeof a==='number'}
function ew(a){return typeof a==='string'}
function Hi(a,b){return new Mk(a,a.Y(),b)}
function An(a,b){return new no(a.a,a.b,b)}
function Jb(a){_b(Wxb);return new Nb(a,a)}
function Do(a){Mh(a,Vyb);return new HU(a)}
function Am(a,b){this.a=b;vm.call(this,a)}
function tp(a,b){this.a=b;vm.call(this,a)}
function If(a,b){this.a=a;Bf.call(this,b)}
function ks(a){this.c=a;this.a=Qr(this.c)}
function MZ(a){var b;b=a.a;a.a=a.b;a.b=b}
function pW(a,b){a.e.j.a=b.a;a.e.j.b=b.b}
function xvb(a,b,c){a.a=b^1502;a.b=c^_Ab}
function uI(a,b,c){a.a+=b;a.b+=c;return a}
function DI(a,b,c){a.a-=b;a.b-=c;return a}
function zI(a){a.a=-a.a;a.b=-a.b;return a}
function UI(a){Bxb(a.b!=0);return a.a.a.c}
function VI(a){Bxb(a.b!=0);return a.c.b.c}
function uub(a,b){if(a.a){Hub(b);Gub(b)}}
function rn(a,b,c){var d;d=a.ub(b);d.J(c)}
function Iq(a,b){return Zs(b.Yb(),a.Yb())}
function o5(a){return Wv(yU(a.a,a.b),128)}
function EU(a){return cxb(a.c,a.c.length)}
function Fv(a){return a.l+a.m*czb+a.h*dzb}
function LM(a){return a==EM||a==GM||a==FM}
function UH(a){return typeof a==='number'}
function Zsb(a,b){return !!b&&a.b[b.e]==b}
function lsb(a,b){var c;c=a[WAb];b[WAb]=c}
function FQ(a,b){_J.call(this,a);this.b=b}
function Rqb(a){zqb.call(this,a);this.a=a}
function arb(a){Nqb.call(this,a);this.a=a}
function dsb(a){Frb.call(this,a);this.a=a}
function Xub(a){ytb.call(this,new xub(a))}
function wwb(a){this.a=a;Bob.call(this,a)}
function v5(a){this.c=a;this.a=1;this.b=1}
function Rb(a){this.a=a;this.b=$v(_b('='))}
function B5(){this.a=new aJ;this.e=new aJ}
function tV(){this.a=new fU;this.c=new uV}
function cX(){this.i=new FI;this.j=new FI}
function Md(a){Xb(a.d.c+a.e.c==0);this.b=a}
function _s(a){a.g=null;Ot(a,a.f);return a}
function Nl(a){Il();_b(a);return new om(a)}
function St(a){Nt();return parseInt(a)||-1}
function Uwb(a,b){return cwb(a.a,b)!=null}
function ok(a,b){return !rk(a,b)&&!qk(a,b)}
function txb(a){return a.$H||(a.$H=++sxb)}
function yc(a){return a.d!=null?a.d:''+a.e}
function zc(a){return a.d!=null?a.d:''+a.e}
function pwb(a){return a.b=Wv(Cnb(a.a),21)}
function bw(a){return typeof a==='boolean'}
function pub(a){a.b=new Iub(a);a.c=new ntb}
function oab(){this.a=new GU;this.d=new GU}
function Iub(a){Jub.call(this,a,null,null)}
function ug(a,b,c,d){mg.call(this,a,b,c,d)}
function BP(a,b,c,d){vP.call(this,a,b,c,d)}
function EP(a,b,c,d){vP.call(this,a,b,c,d)}
function Kg(a,b,c){_f.call(this,a,b,c,null)}
function Lg(a,b,c){_f.call(this,a,b,c,null)}
function es(a,b,c){a.i=b;b.f=a;b.i=c;c.f=b}
function tI(a,b){mI(this);this.e=a;this.f=b}
function yg(a,b){this.d=a;vg(this);this.b=b}
function kJ(a){OI(this);_I(this);Ue(this,a)}
function Xv(a){Hxb(a==null||bw(a));return a}
function Yv(a){Hxb(a==null||cw(a));return a}
function $v(a){Hxb(a==null||ew(a));return a}
function vI(a,b){a.a+=b.a;a.b+=b.b;return a}
function EI(a,b){a.a-=b.a;a.b-=b.b;return a}
function U$(a,b){return a.i.a=(Dxb(b),b)+10}
function V$(a,b){return a.i.a=(Dxb(b),b)+10}
function h6(a,b){return Wv(Smb(a.k,b),24).a}
function Bj(a,b){return Lh(a,b),new zr(a,b)}
function Web(a,b){return Wv(a.b.sb(b),92).a}
function WX(a){return Wv(a,7).b.c.length!=0}
function TX(a){return Wv(a,7).e.c.length!=0}
function jX(a){return !a.d?-1:zU(a.d.a,a,0)}
function lt(a){return a==null?null:a.message}
function Gkb(a){if(a.n!=null){return}Wkb(a)}
function wmb(a,b,c,d){jkb(a,b,c,d);return a}
function mmb(a,b){bmb();return a.indexOf(b)}
function QX(a,b){if(!b){throw new Vlb}a.g=b}
function Mn(a){if(a.e.c!=a.b){throw new nsb}}
function Xn(a){if(a.f.c!=a.b){throw new nsb}}
function Uq(a,b){_b(a);_b(b);return Akb(a,b)}
function U6(a,b){this.a=a;this.c=b;this.b=2}
function sI(){mI(this);this.e=-1;this.f=true}
function Dh(){Vd.call(this,new ntb);this.a=3}
function CP(a){vP.call(this,a.d,a.b,a.a,a.c)}
function FP(a){vP.call(this,a.d,a.b,a.a,a.c)}
function r6(a){k6.call(this,a);this.c=new GU}
function Oc(){Mc.call(this,'ALWAYS_TRUE',0)}
function Rc(){Mc.call(this,'ALWAYS_FALSE',1)}
function _T(a){XT();this.a=new Dh;YT(this,a)}
function Y9(a){!a.e&&(a.e=new GU);return a.e}
function W7(a){var b;b=new V7;b.e=a;return b}
function msb(a){var b;b=a[WAb]|0;a[WAb]=b+1}
function Anb(a,b){a.a.rb(a.b,b);++a.b;a.c=-1}
function Enb(a,b){uxb(a.c!=-1);a.a.wb(a.c,b)}
function zkb(a,b){xkb();return a==b?0:a?1:-1}
function Wjb(a,b,c){return a.g[b.e][c.e]*a.d}
function xt(a,b,c){return a.apply(b,c);var d}
function ssb(a,b,c){return rsb(a,Wv(b,17),c)}
function m5(a,b){return b==(sN(),rN)?a.c:a.d}
function Zi(a,b){return b!=null&&a.Nb().kb(b)}
function skb(a,b){this.e=b;this.f=a;_s(this)}
function om(a){this.b=a;this.a=(Il(),Il(),Hl)}
function dk(a){hi();this.a=(ypb(),new Frb(a))}
function hi(){hi=iI;new vi((ypb(),ypb(),vpb))}
function e8(){e8=iI;d8=PQ(new WQ,(d0(),X_))}
function rwb(a){swb.call(this,a,(Fwb(),Bwb))}
function IU(a){tU(this);gxb(this.c,0,a.ob())}
function tr(a,b,c){this.b=a;this.a=b;this.c=c}
function WS(a,b,c){VS.call(this,a,b);this.b=c}
function XV(a,b,c){this.b=a;this.a=b;this.c=c}
function job(a,b){var c;c=a.e;a.e=b;return c}
function qub(a){Ymb(a.c);a.b.b=a.b;a.b.a=a.b}
function Vf(a){a.b?Vf(a.b):Umb(a.f.b,a.e,a.d)}
function YI(a){Bxb(a.b!=0);return $I(a,a.a.a)}
function ZI(a){Bxb(a.b!=0);return $I(a,a.c.b)}
function Wl(a,b){Il();_b(b);return new Am(a,b)}
function np(a,b){mp();return new tp(a.mb(),b)}
function jmb(a,b){bmb();return a.charCodeAt(b)}
function imb(a,b,c){bmb();return a.substr(b,c)}
function qmb(a){bmb();return a==null?Wxb:xb(a)}
function Xjb(a,b,c){return Vjb(a,b.g,c.g)*a.d}
function Ev(a,b,c){return {'l':a,'m':b,'h':c}}
function YU(a,b){return ZU(a,new VS(b.a,b.b))}
function SN(a,b,c,d,e){a.d=b;a.e=c;a.c=d;a.b=e}
function wS(a,b,c,d,e){a.b=b;a.c=c;a.d=d;a.a=e}
function QI(a,b){TI(a,b,a.c.b,a.c);return true}
function vU(a,b){a.c[a.c.length]=b;return true}
function DJ(a,b){wJ();CJ.call(this,a);this.a=b}
function g8(){e8();this.e=new aJ;this.d=new aJ}
function Fmb(){Fmb=iI;Dmb=new hkb;Emb=new hkb}
function zab(){zab=iI;yab=VQ(new WQ,(d0(),v_))}
function abb(){abb=iI;_ab=VQ(new WQ,(d0(),v_))}
function rbb(){rbb=iI;qbb=VQ(new WQ,(d0(),v_))}
function $bb(){$bb=iI;Zbb=VQ(new WQ,(d0(),v_))}
function Wt(){Wt=iI;Error.stackTraceLimit=64}
function xS(){wS(this,false,false,false,false)}
function Bo(a){var b;b=new GU;Jl(b,a);return b}
function Eo(a){var b;b=new aJ;ml(b,a);return b}
function XQ(a){var b;b=new WQ;QQ(b,a);return b}
function Ocb(a){var b;b=new Mcb;b.a=a;return b}
function Wv(a,b){Hxb(a==null||Vv(a,b));return a}
function Dvb(a,b){if(a<0||a>=b){throw new pkb}}
function pl(a,b){_b(a);_b(b);return new Bl(a,b)}
function ul(a,b){_b(a);_b(b);return new El(a,b)}
function nmb(a,b){bmb();return a.lastIndexOf(b)}
function rgb(a,b,c){return a<b?c<=a:a<=c||a==b}
function cvb(a,b,c){this.d=a;this.b=c;this.a=b}
function atb(a,b,c){this.a=a;this.b=b;this.c=c}
function lub(a,b,c){this.a=a;this.b=b;this.c=c}
function Nb(a,b){this.a=a;this.b=Wxb;this.c=b.c}
function z3(a){this.c=a.c;this.a=a.e;this.b=a.b}
function xg(a){this.d=a;vg(this);this.b=Ed(a.d)}
function u4(){FS.call(this);this.a=new x4(this)}
function FS(){this.c=new PS;this.d=new KS(this)}
function qr(a){var b;b=new vtb;Jl(b,a);return b}
function qwb(a){vnb(a.a);dwb(a.c,a.b);a.b=null}
function n5(a){return a.c-Wv(yU(a.a,a.b),128).b}
function t5(a,b){return a.c<b.c?-1:a.c==b.c?0:1}
function t4(a,b){return tK(a.b.d)?b.xc():b.wc()}
function gmb(a,b,c){return bmb(),a.substr(b,c-b)}
function gxb(a,b,c){dxb(c,0,a,b,c.length,false)}
function Jub(a,b,c){this.c=a;qob.call(this,b,c)}
function Bl(a,b){this.b=a;this.a=b;Rh.call(this)}
function El(a,b){this.a=a;this.b=b;Rh.call(this)}
function Lq(a,b){this.b=a;this.a=b;Mh(b,'count')}
function dl(a){this.b=a;this.a=nj(this.b.a).Kb()}
function CJ(a){wJ();this.c=uJ;this.d=vJ;this.b=a}
function iab(a,b,c){gab.call(this,a,b);this.a=c}
function mab(a,b,c){gab.call(this,a,b);this.a=c}
function yU(a,b){Cxb(b,a.c.length);return a.c[b]}
function PQ(a,b){Wv(yU(a.a,5),18).ib(b);return a}
function RQ(a,b){Wv(yU(a.a,0),18).ib(b);return a}
function SQ(a,b){Wv(yU(a.a,1),18).ib(b);return a}
function TQ(a,b){Wv(yU(a.a,2),18).ib(b);return a}
function UQ(a,b){Wv(yU(a.a,3),18).ib(b);return a}
function VQ(a,b){Wv(yU(a.a,4),18).ib(b);return a}
function iS(a){gS(a,(sK(),oK));a.e=true;return a}
function Pt(a){Nt();var b;b=Mt.ec(a);return Qt(b)}
function Pkb(a,b){var c;c=Mkb(a,b);c.g=2;return c}
function _ob(a,b){var c;for(c=0;c<b;++c){a[c]=0}}
function YW(a,b){a.b=b.b;a.c=b.c;a.d=b.d;a.a=b.a}
function Hub(a){a.a.b=a.b;a.b.a=a.a;a.a=a.b=null}
function NX(a){return a.b.c.length+a.e.c.length}
function zv(a){return Array.isArray(a)&&a.ad===kI}
function ol(a,b){return Il(),Tl(new Tob(a),b)!=-1}
function vv(a,b,c,d,e,f){return wv(a,b,c,d,e,0,f)}
function BJ(a,b,c){wJ();FJ.call(this,a.b,b,c,a.d)}
function AJ(a,b){wJ();FJ.call(this,a.b,b,a.c,a.d)}
function uU(a,b,c){Fxb(b,a.c.length);fxb(a.c,b,c)}
function mpb(a,b){Cxb(b,a.a.length);return a.a[b]}
function kpb(c){c.sort(function(a,b){return a-b})}
function _b(a){if(a==null){throw new Vlb}return a}
function lv(a){if(a==null){throw new Vlb}this.a=a}
function Us(a,b,c){if(a.a!=b){throw new nsb}a.a=c}
function wxb(a,b){if(!a){throw new slb((bmb(),b))}}
function Axb(a,b){if(!a){throw new rkb((bmb(),b))}}
function Dxb(a){if(a==null){throw new Vlb}return a}
function Yub(a){ytb.call(this,new wub);Ue(this,a)}
function xtb(a){this.a=new otb(a.Y());Ue(this,a)}
function Lsb(a){this.c=a;this.a=new jtb(this.c.a)}
function Er(a){Gi();this.a=(ypb(),new rqb(_b(a)))}
function xkb(){xkb=iI;vkb=(xkb(),false);wkb=true}
function Glb(){Glb=iI;Flb=xv(PF,Txb,24,256,0,1)}
function k8(){k8=iI;j8=PQ(RQ(new WQ,(d0(),z_)),X_)}
function aS(){aS=iI;ZR=new yS;_R=new FS;$R=new AS}
function dw(a){return a!=null&&fw(a)&&!(a.ad===kI)}
function _v(a){return !Array.isArray(a)&&a.ad===kI}
function Wmb(a,b){return ew(b)?Xmb(a,b):Mtb(a.d,b)}
function Ysb(a,b){return aw(b,17)&&Zsb(a,Wv(b,17))}
function $sb(a,b){return aw(b,17)&&_sb(a,Wv(b,17))}
function bub(a,b){return !(Utb(a.a,b)===undefined)}
function Vsb(a,b){var c;c=Usb(a);zpb(c,b);return c}
function Kt(a,b){!a&&(a=[]);a[a.length]=b;return a}
function rsb(a,b,c){Wsb(a.a,b);return usb(a,b.e,c)}
function omb(a,b,c){bmb();return a.lastIndexOf(b,c)}
function xxb(a,b,c){if(!a){throw new slb(Jxb(b,c))}}
function Zob(a,b,c){var d;for(d=0;d<b;++d){a[d]=c}}
function Qo(a,b){var c;c=a.a.Y();bc(b,c);return c-b}
function ud(a){var b;b=a.i;return !b?(a.i=a.T()):b}
function Ae(a){var b;b=a.c;return !b?(a.c=a.gb()):b}
function ki(a){var b;b=a.c;return !b?(a.c=a.Jb()):b}
function nj(a){if(a.e){return a.e}return a.e=a.Ob()}
function oj(a){if(a.f){return a.f}return a.f=a.Pb()}
function Hv(a,b){return Ev(a.l&b.l,a.m&b.m,a.h&b.h)}
function flb(a,b){return glb((Dxb(a),a),(Dxb(b),b))}
function Ed(a){return aw(a,20)?Wv(a,20).tb():a.mb()}
function Ml(a){Il();_b(a);while(a.G()){a.H();a.I()}}
function Uab(a){var b;b=a;while(b.g){b=b.g}return b}
function LY(a){a.b.i.a+=a.a.f*(a.a.a-1);return null}
function Sob(a){uxb(a.b!=-1);a.c.vb(a.a=a.b);a.b=-1}
function Dnb(a){Bxb(a.b>0);return a.a.sb(a.c=--a.b)}
function $f(a){a.b?$f(a.b):a.d.V()&&Wmb(a.f.b,a.e)}
function wg(a){Yf(a.d);if(a.d.d!=a.c){throw new nsb}}
function ksb(a,b){if(b[WAb]!=a[WAb]){throw new nsb}}
function Pl(a,b){Il();_b(a);_b(b);return new tm(a,b)}
function Zq(a,b){Gi();Yq.call(this,a,Yi(new opb(b)))}
function mg(a,b,c,d){this.a=a;_f.call(this,a,b,c,d)}
function GI(a){this.a=Math.cos(a);this.b=Math.sin(a)}
function GQ(a,b,c){_J.call(this,a);this.b=b;this.a=c}
function NR(a){this.b=new GU;this.a=new GU;this.c=a}
function sY(a){this.c=new FI;this.a=new GU;this.b=a}
function tu(){tu=iI;ru=new uu(false);su=new uu(true)}
function o7(a,b){++a.d;return a.c[a.c.length]=b,true}
function $ub(a,b){TI(a.d,b,a.b.b,a.b);++a.a;a.c=null}
function stb(a,b){var c;c=a.a.db(b,a);return c==null}
function cxb(a,b){var c;c=a.slice(0,b);return Cv(c,a)}
function exb(a,b){var c;c=new Array(b);return Cv(c,a)}
function usb(a,b,c){var d;d=a.b[b];a.b[b]=c;return d}
function apb(a,b){var c;for(c=0;c<b;++c){a[c]=null}}
function cpb(a,b){var c;for(c=0;c<b;++c){a[c]=false}}
function r1(a,b){return xkb(),Wv(b.b,24).a<a?wkb:vkb}
function s1(a,b){return xkb(),Wv(b.a,24).a<a?wkb:vkb}
function Tk(a,b){return Wv(ki(nj(a.a)).sb(b),21).yb()}
function dq(a){return mp(),Wl(Rm(a.a).mb(),(xp(),vp))}
function Uh(a){return Il(),new Im(Dl(ul(a.a,new yl)))}
function fw(a){return typeof a===Sxb||typeof a===Zxb}
function Ct(a){$wnd.setTimeout(function(){throw a},0)}
function oI(a,b){return a>0?new tI(a-1,b):new tI(a,b)}
function Ib(a){_b(a);return aw(a,345)?Wv(a,345):xb(a)}
function Rwb(a,b){return bwb(a.a,b,(xkb(),vkb))==null}
function Po(a,b){var c;c=a.a.Y();$b(b,c);return c-1-b}
function hu(a,b,c){var d;d=gu(a,b);iu(a,b,c);return d}
function Nkb(a,b,c){var d;d=Mkb(a,b);$kb(c,d);return d}
function Mkb(a,b){var c;c=new Kkb;c.i=a;c.d=b;return c}
function Mk(a,b,c){this.a=a;bc(c,b);this.c=b;this.b=c}
function Av(a,b,c){zxb(c==null||sv(a,c));return a[b]=c}
function Pm(a){a.a=null;a.e=null;Ymb(a.b);a.d=0;++a.c}
function Pmb(a){slb.call(this,(bmb(),a==null?Wxb:a))}
function Omb(a){slb.call(this,(bmb(),a==null?Wxb:a))}
function Om(a){var b;return b=a.f,!b?(a.f=new Pp(a)):b}
function Jd(a){var b;return b=a.k,!b?(a.k=new Qg(a)):b}
function Be(a){var b;b=a.e;return !b?(a.e=new Fp(a)):b}
function Vg(a){var b;b=a.e;!b&&(a.e=b=a.gb());return b}
function d6(a){var b,c;b=a.c.f.d;c=a.d.f.d;return b==c}
function Gfb(a,b){var c;c=new Dfb(a);Afb(c,b);return c}
function umb(a,b){a.a+=String.fromCharCode(b);return a}
function hX(a){if(!a.a&&!!a.d){return a.d.b}return a.a}
function _H(a){if(UH(a)){return a|0}return a.l|a.m<<22}
function xo(a){Mh(a,Uyb);return $s(PH(PH(5,a),a/10|0))}
function Smb(a,b){return ew(b)?Tmb(a,b):re(Ktb(a.d,b))}
function tl(a){return aw(a,19)?Wv(a,19).Y():Ul(a.mb())}
function pr(a){return a?new xtb((Oh(),a)):qr(null.mb())}
function Tb(a,b){return gw(a)===gw(b)||a!=null&&rb(a,b)}
function zT(a,b){return vT(),glb(Ixb(Yv(a)),Ixb(Yv(b)))}
function Ep(a){return mp(),Wl(a.a.bb().mb(),(xp(),wp))}
function Gi(){Gi=iI;hi();Fi=new gr((ypb(),ypb(),vpb))}
function kr(){kr=iI;hi();jr=new lr((ypb(),ypb(),xpb))}
function Exb(a,b){if(a==null){throw new Wlb((bmb(),b))}}
function Zfb(a,b){Mfb();return (a-b<=0?0-(a-b):a-b)<0.2}
function U0(a,b){return a.i.b<b.i.b?-1:a.i.b==b.i.b?0:1}
function Zjb(a,b,c,d){a.g[b.e][c.e]=d;a.g[c.e][b.e]=d}
function vnb(a){uxb(a.c!=-1);a.d.vb(a.c);a.b=a.c;a.c=-1}
function Sub(a){this.c=a;this.b=a.a.b.a;lsb(a.a.c,this)}
function ufb(a){efb.call(this,new opb(a));this.a=new FI}
function er(){Bk.call(this,new ir(new ntb));this.a=this}
function OQ(){JQ();this.b=(mp(),new ntb);this.a=new ntb}
function zp(){xp();return Bv(tv(jy,1),uyb,188,0,[vp,wp])}
function Ih(){Gh();return Bv(tv(dx,1),uyb,159,0,[Fh,Eh])}
function ss(){qs();return Bv(tv(Ty,1),uyb,205,0,[ps,os])}
function psb(a){We(a.a);a.b=xv(UF,syb,1,a.b.length,4,1)}
function krb(a){!a.b&&(a.b=new Frb(a.c.W()));return a.b}
function cwb(a,b){var c;c=new zwb;ewb(a,b,c);return c.d}
function Qkb(a,b){var c;c=Mkb('',a);c.k=b;c.g=1;return c}
function We(a){var b;for(b=a.mb();b.G();){b.H();b.I()}}
function yJ(a,b){return aw(b,79)&&emb(a.b,Wv(b,79).mc())}
function Z3(){X3();return Bv(tv(iD,1),uyb,175,0,[V3,W3])}
function a8(){Z7();return Bv(tv(WD,1),uyb,193,0,[X7,Y7])}
function s9(){p9();return Bv(tv(hE,1),uyb,192,0,[o9,n9])}
function Umb(a,b,c){return ew(b)?Vmb(a,b,c):Ltb(a.d,b,c)}
function h5(a,b,c){a.i=0;a.e=0;if(b==c){return}d5(a,b,c)}
function g5(a,b,c){a.i=0;a.e=0;if(b==c){return}c5(a,b,c)}
function t6(a,b,c,d){this.d=a;this.b=b;this.a=c;this.c=d}
function VN(a,b,c,d){this.d=a;this.e=b;this.c=c;this.b=d}
function E5(a,b,c,d){this.a=a;this.c=b;this.b=c;this.d=d}
function vO(a,b,c,d){Ac.call(this,a,b);this.a=c;this.b=d}
function Jtb(a,b){var c;c=Ttb(a.a,b);return c==null?[]:c}
function kmb(a,b){bmb();if(a==b){return 0}return a<b?-1:1}
function CR(a,b){var c;c=hR(a.f,b);return vI(zI(c),a.f.d)}
function qsb(a,b){return Ysb(a.a,b)?a.b[Wv(b,17).e]:null}
function ovb(a,b){return gw(a)===gw(b)||a!=null&&rb(a,b)}
function Pu(a,b){if(b==null){throw new Vlb}return Qu(a,b)}
function Zv(a){Hxb(a==null||fw(a)&&!(a.ad===kI));return a}
function irb(a){!a.a&&(a.a=new Nrb(a.c.bb()));return a.a}
function lrb(a){!a.d&&(a.d=new zqb(a.c.fb()));return a.d}
function _I(a){a.a.a=a.c;a.c.b=a.a;a.a.b=a.c.a=null;a.b=0}
function Cnb(a){return Bxb(a.b<a.d.Y()),a.d.sb(a.c=a.b++)}
function Xmb(a,b){return b==null?Mtb(a.d,null):eub(a.e,b)}
function $9(a,b){this.g=a;this.d=Bv(tv(qB,1),Nzb,9,0,[b])}
function KS(a){this.c=a;this.b=new Wwb(Wv(_b(new MS),56))}
function hW(){this.a=new jJ;this.b=(Mh(3,Vyb),new HU(3))}
function Dg(a,b){this.a=a;yg.call(this,a,Wv(a.d,20).ub(b))}
function rab(a,b,c,d){this.a=a;this.c=b;this.b=c;this.d=d}
function Zlb(a,b,c){this.a=Yxb;this.d=a;this.b=b;this.c=c}
function $W(){XW(this);this.d=0;this.b=0;this.a=0;this.c=0}
function Bcb(){this.b=new vtb;this.d=new aJ;this.e=new Uvb}
function ypb(){ypb=iI;vpb=new Kpb;wpb=new aqb;xpb=new iqb}
function Lc(){Lc=iI;Ic=new Oc;Hc=new Rc;Jc=new Uc;Kc=new Xc}
function Z7(){Z7=iI;X7=new $7('GREEDY',0);Y7=new $7(zAb,1)}
function zQ(){zQ=iI;yQ=new AJ((eM(),EL),(xkb(),xkb(),wkb))}
function w9(){w9=iI;v9=PQ(UQ(TQ(new WQ,(d0(),N_)),B_),M_)}
function N6(a,b){var c;c=M6(b);return Wv(Smb(a.c,c),24).a}
function PR(a,b){var c;c=utb(a.a,b);c&&(b.f=null);return c}
function Krb(a){var b;b=a.b.ob();Mrb(b,b.length);return b}
function NP(a){if(a<0){return -1}if(a>0){return 1}return 0}
function mP(){kP();return Bv(tv(Rz,1),uyb,171,0,[jP,gP,hP])}
function gL(){eL();return Bv(tv(Fz,1),uyb,166,0,[cL,bL,dL])}
function WM(){UM();return Bv(tv(Jz,1),uyb,149,0,[TM,SM,RM])}
function FO(){DO();return Bv(tv(Pz,1),uyb,225,0,[BO,AO,CO])}
function ZZ(){XZ();return Bv(tv(VB,1),uyb,221,0,[VZ,WZ,UZ])}
function A8(){x8();return Bv(tv(_D,1),uyb,173,0,[w8,v8,u8])}
function QH(a,b){return SH(Hv(UH(a)?YH(a):a,UH(b)?YH(b):b))}
function XI(a){return a.b==0?null:(Bxb(a.b!=0),$I(a,a.a.a))}
function zfb(a){a.d=a.d-15;a.b=a.b-15;a.c=a.c+15;a.a=a.a+15}
function Rn(a){this.b=a;this.c=a;a.e=null;a.c=null;this.a=1}
function nZ(a,b,c){this.d=a;this.b=new GU;this.c=b;this.a=c}
function sfb(a,b){qfb(this,new HI(a.a,a.b));rfb(this,Eo(b))}
function Xf(a,b){if(b===a){return true}Yf(a);return a.d.t(b)}
function Oeb(a){if(a==neb||a==keb){return true}return false}
function VO(a){if(!Qob(new Tob(zW(a.e)))){return}OO(a);QO(a)}
function Y2(a,b){var c;c=Wv(vub(a.e,b),116);!!c&&(a.d=true)}
function Lrb(a,b){var c;c=a.b.pb(b);Mrb(c,a.b.Y());return c}
function a6(a){var b;b=e6(a,(sN(),rN));b+=e6(a,ZM);return b}
function f6(a,b,c){j6(a,b,c,(sN(),ZM),a.f);j6(a,b,c,rN,a.n)}
function PX(a,b){!!a.f&&BU(a.f.f,a);a.f=b;!!a.f&&vU(a.f.f,a)}
function rX(a,b){!!a.d&&BU(a.d.a,a);a.d=b;!!a.d&&vU(a.d.a,a)}
function eW(a,b){!!a.d&&BU(a.d.b,a);a.d=b;!!a.d&&vU(a.d.b,a)}
function dW(a,b){!!a.c&&BU(a.c.e,a);a.c=b;!!a.c&&vU(a.c.e,a)}
function Zdb(a){var b;b=Eo(a.b);Ue(b,a.c);Ue(b,a.i);return b}
function Qxb(){if(Lxb==256){Kxb=Mxb;Mxb={};Lxb=0}++Lxb}
function Gbb(){Gbb=iI;Fbb=new Hbb(pzb,0);Ebb=new Hbb(ozb,1)}
function fgb(){fgb=iI;dgb=new ggb(ozb,0);egb=new ggb(pzb,1)}
function hgb(){fgb();return Bv(tv(fF,1),uyb,223,0,[dgb,egb])}
function xab(){vab();return Bv(tv(rE,1),uyb,242,0,[uab,tab])}
function Ibb(){Gbb();return Bv(tv(BE,1),uyb,248,0,[Fbb,Ebb])}
function Nbb(){Lbb();return Bv(tv(CE,1),uyb,247,0,[Jbb,Kbb])}
function ncb(){lcb();return Bv(tv(JE,1),uyb,194,0,[jcb,kcb])}
function Ohb(){Mhb();return Bv(tv(pF,1),uyb,174,0,[Khb,Lhb])}
function Hpb(a){ypb();return aw(a,63)?new csb(a):new Rqb(a)}
function Rm(a){var b;return b=a.g,Wv(!b?(a.g=new En(a)):b,20)}
function Ktb(a,b){return Itb(a,b,Jtb(a,b==null?0:a.b.Vc(b)))}
function tX(a){var b;return b=lX(a),'n_'+(b==null?Dlb(a.k):b)}
function ob(a){return Ikb(tb(a))+'@'+(vb(a)>>>0).toString(16)}
function ykb(a,b){return zkb(Ckb((Dxb(a),a)),Ckb((Dxb(b),b)))}
function Tmb(a,b){return b==null?re(Ktb(a.d,null)):cub(a.e,b)}
function Rr(a,b,c){return new Ur(a.c,pk(a.b,wk(a.d,b,c)),a.a)}
function hw(a){return Math.max(Math.min(a,$xb),-2147483648)|0}
function Ptb(a){this.e=a;this.b=this.e.a.entries();this.a=[]}
function xf(a){this.c=a;this.b=new rnb((new inb(this.c.a)).a)}
function Em(a){this.b=(Il(),Il(),Il(),Gl);this.a=Wv(_b(a),35)}
function EJ(a,b,c){wJ();DJ.call(this,a,b);c!=null&&(this.c=c)}
function cc(a,b,c){if(a<0||b<a||b>c){throw new okb(Wb(a,b,c))}}
function $b(a,b){if(a<0||a>=b){throw new okb(Ub(a,b))}return a}
function ac(a,b){if(a==null){throw new Wlb((bmb(),b))}return a}
function Dm(a){if(!Cm(a)){throw new nvb}a.c=a.b;return a.b.H()}
function jI(a){function b(){}
;b.prototype=a||{};return new b}
function rr(a){var b;b=new wtb(op(a.length));zpb(b,a);return b}
function Gub(a){var b;b=a.c.b.b;a.b=b;a.a=a.c.b;b.a=a.c.b.b=a}
function jwb(a){this.b=null;!a&&(a=(hsb(),hsb(),gsb));this.a=a}
function W6(a){this.b=a;this.a=new Fnb(this.b,this.b.c.length)}
function Li(a){Gi();_b(a);return a?Ki(a):Ki(Bo(new Tob(null)))}
function rt(a,b){var c=qt[a.charCodeAt(0)];return c==null?a:c}
function Skb(a,b){var c=a.a=a.a||[];return c[b]||(c[b]=a.Oc(b))}
function CU(a,b,c){var d;Gxb(b,c,a.c.length);d=c-b;hxb(a.c,b,d)}
function Ur(a,b,c){Ch.call(this,b.a);this.c=a;this.b=b;this.a=c}
function ko(a){Vm(a.c);a.e=a.a=a.c;a.c=a.c.c;++a.d;return a.a.f}
function lo(a){Vm(a.e);a.c=a.a=a.e;a.e=a.e.e;--a.d;return a.a.f}
function MX(a){return MI(Bv(tv(qz,1),Fzb,10,0,[a.f.i,a.i,a.a]))}
function GK(){EK();return Bv(tv(Cz,1),uyb,107,0,[DK,AK,BK,CK])}
function PK(){NK();return Bv(tv(Dz,1),uyb,122,0,[MK,KK,JK,LK])}
function ON(){MN();return Bv(tv(Mz,1),uyb,139,0,[KN,LN,JN,IN])}
function FN(){DN();return Bv(tv(Lz,1),uyb,150,0,[BN,CN,AN,zN])}
function Nc(){Lc();return Bv(tv(Bw,1),uyb,136,0,[Ic,Hc,Jc,Kc])}
function iT(){cT();return Bv(tv(yA,1),uyb,201,0,[$S,bT,_S,aT])}
function wN(){sN();return Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN])}
function xK(){sK();return Bv(tv(Bz,1),uyb,59,0,[qK,pK,oK,nK,rK])}
function c8(){c8=iI;b8=Cc((Z7(),Bv(tv(WD,1),uyb,193,0,[X7,Y7])))}
function _3(){_3=iI;$3=Cc((X3(),Bv(tv(iD,1),uyb,175,0,[V3,W3])))}
function u9(){u9=iI;t9=Cc((p9(),Bv(tv(hE,1),uyb,192,0,[o9,n9])))}
function Jhb(){Hhb();return Bv(tv(oF,1),uyb,140,0,[Fhb,Ghb,Ehb])}
function Jgb(){Hgb();return Bv(tv(jF,1),uyb,218,0,[Fgb,Egb,Ggb])}
function fjb(){djb();return Bv(tv(rF,1),uyb,219,0,[cjb,ajb,bjb])}
function Sjb(){Qjb();return Bv(tv(sF,1),uyb,153,0,[Njb,Pjb,Ojb])}
function ekb(){ckb();return Bv(tv(uF,1),uyb,172,0,[_jb,akb,bkb])}
function Vmb(a,b,c){return b==null?Ltb(a.d,null,c):dub(a.e,b,c)}
function wk(a,b,c){return new sk(a,false,null,(Gh(),Fh),true,b,c)}
function tsb(a,b){return $sb(a.a,b)?usb(a,Wv(b,17).e,null):null}
function ql(a){_b(a);return Ql((Il(),new Im(Dl(ul(a.a,new yl)))))}
function Epb(a){ypb();if(!a){return nqb(),mqb}return new Ipb(a)}
function Oo(a,b){var c,d;d=Qo(a,b);c=a.a.ub(d);return new bp(a,c)}
function Cpb(a,b){var c,d;d=a.Y();for(c=0;c<d;c++){a.wb(c,b[c])}}
function Xbb(a,b,c){var d;d=new Wbb;d.b=b;d.a=c;++b.b;vU(a.d,d)}
function fW(a,b,c){!!a.d&&BU(a.d.b,a);a.d=b;!!a.d&&uU(a.d.b,c,a)}
function Mnb(a,b,c){Gxb(b,c,a.Y());this.c=a;this.a=b;this.b=c-b}
function vP(a,b,c,d){sP(this);this.d=a;this.b=b;this.a=c;this.c=d}
function zr(a,b){Bk.call(this,Fpb(_b(a),_b(b)));this.b=a;this.c=b}
function Fnb(a,b){this.a=a;wnb.call(this,a);Fxb(b,a.Y());this.b=b}
function FJ(a,b,c,d){wJ();EJ.call(this,a,b,c);d!=null&&(this.d=d)}
function e5(a,b,c){a.i=0;a.e=0;if(b==c){return}d5(a,b,c);c5(a,b,c)}
function Rob(a){Bxb(a.a<a.c.c.length);a.b=a.a++;return a.c.c[a.b]}
function avb(a){Bxb(a.b.b!=a.d.a);a.c=a.b=a.b.b;--a.a;return a.c.c}
function gwb(a,b){var c;c=1-b;a.a[c]=hwb(a.a[c],c);return hwb(a,b)}
function S2(a){var b;b=(Ieb(),Ieb(),heb);a.d&&Z2(a);ni();return b}
function ZH(a){var b;if(UH(a)){b=a;return b==-0.?0:b}return Nv(a)}
function Ii(a){var b;b=(_b(a),new IU((Oh(),a)));Dpb(b);return Yi(b)}
function Rl(a){Il();var b;while(true){b=a.H();if(!a.G()){return b}}}
function Yn(a){Xn(a);Vm(a.c);a.e=a.a=a.c;a.c=a.c.b;++a.d;return a.a}
function Zn(a){Xn(a);Vm(a.e);a.c=a.a=a.e;a.e=a.e.d;--a.d;return a.a}
function Wf(a){var b;b=a.Y();if(b==0){return}a.d.Q();a.f.c-=b;$f(a)}
function At(a,b,c){var d;d=yt();try{return xt(a,b,c)}finally{Bt(d)}}
function zt(b){return function(){return At(b,this,arguments);var a}}
function sl(a){if(aw(a,19)){return Wv(a,19).V()}return !a.mb().G()}
function gr(a){Gi();this.a=(ypb(),aw(a,63)?new csb(a):new Rqb(a))}
function Mhb(){Mhb=iI;Khb=new Nhb(qzb,0);Lhb=new Nhb('TOP_LEFT',1)}
function Lbb(){Lbb=iI;Jbb=new Mbb('DOWN',0);Kbb=new Mbb('UP',1)}
function p9(){p9=iI;o9=new q9('LAYER_SWEEP',0);n9=new q9(zAb,1)}
function vab(){vab=iI;uab=new wab('UPPER',0);tab=new wab('LOWER',1)}
function yxb(a){if(a<0){throw new Ulb('Negative array size: '+a)}}
function hnb(a,b){if(aw(b,21)){return ee(a.a,Wv(b,21))}return false}
function Esb(a,b){if(aw(b,21)){return ee(a.a,Wv(b,21))}return false}
function Kub(a,b){if(aw(b,21)){return ee(a.a,Wv(b,21))}return false}
function IV(a){var b;b=new hW;qJ(b,a);sJ(b,(eM(),CL),null);return b}
function je(a,b){return b===a?'(this Map)':(bmb(),b==null?Wxb:xb(b))}
function Ld(a,b,c,d){return aw(c,63)?new ug(a,b,c,d):new mg(a,b,c,d)}
function BM(){zM();return Bv(tv(Hz,1),uyb,100,0,[yM,xM,uM,vM,wM])}
function OM(){KM();return Bv(tv(Iz,1),uyb,28,0,[JM,IM,HM,EM,GM,FM])}
function kK(){iK();return Bv(tv(Az,1),uyb,103,0,[cK,fK,gK,hK,dK,eK])}
function $K(){YK();return Bv(tv(Ez,1),uyb,133,0,[WK,UK,XK,SK,VK,TK])}
function YM(){YM=iI;XM=Cc((UM(),Bv(tv(Jz,1),uyb,149,0,[TM,SM,RM])))}
function iL(){iL=iI;hL=Cc((eL(),Bv(tv(Fz,1),uyb,166,0,[cL,bL,dL])))}
function C8(){C8=iI;B8=Cc((x8(),Bv(tv(_D,1),uyb,173,0,[w8,v8,u8])))}
function EX(){CX();return Bv(tv(pB,1),uyb,132,0,[AX,zX,xX,BX,yX,wX])}
function i4(){g4();return Bv(tv(jD,1),uyb,125,0,[e4,b4,f4,d4,c4,a4])}
function Vl(a){Il();return umb(Gb((Oh(),Nh),umb(new zmb,91),a),93).a}
function Gpb(a,b){ypb();var c;c=a.ob();ipb(c,0,c.length,b);Cpb(a,c)}
function G3(a,b,c,d,e){this.c=a;this.e=b;this.d=c;this.b=d;this.a=e}
function Peb(a,b,c,d,e){Ac.call(this,a,b);this.a=c;this.b=d;this.c=e}
function Ahb(a,b,c,d,e){Ac.call(this,a,b);this.a=c;this.b=d;this.c=e}
function QT(a,b,c){this.a=b;this.c=a;this.b=(_b(c),new IU((Oh(),c)))}
function $U(){tU(this);this.b=new HI(Uzb,Uzb);this.a=new HI(Vzb,Vzb)}
function X3(){X3=iI;V3=new Y3('QUADRATIC',0);W3=new Y3('SCANLINE',1)}
function Te(){throw new Imb('Add not supported on this collection')}
function pq(a){var b,c;c=qmb(a.Zb());b=a.Yb();return b==1?c:c+' x '+b}
function _ub(a){Bxb(a.b!=a.d.c);a.c=a.b;a.b=a.b.a;++a.a;return a.c.c}
function Ukb(a){if(a.Tc()){return null}var b=a.k;var c=fI[b];return c}
function bc(a,b){if(a<0||a>b){throw new okb(Vb(a,b,'index'))}return a}
function Zf(a,b){var c;Yf(a);c=a.d.nb(b);if(c){--a.f.c;$f(a)}return c}
function RT(a,b,c){var d;d=(_b(a),new IU((Oh(),a)));PT(new QT(d,b,c))}
function cmb(a,b){return kmb((bmb(),a.toLowerCase()),b.toLowerCase())}
function rmb(a,b){return kmb((bmb(),a.toLowerCase()),b.toLowerCase())}
function Jwb(){Fwb();return Bv(tv(DH,1),uyb,138,0,[Bwb,Cwb,Dwb,Ewb])}
function bxb(a,b,c,d){Array.prototype.splice.apply(a,[b,c].concat(d))}
function TI(a,b,c,d){var e;e=new mvb;e.c=b;e.b=c;e.a=d;d.b=c.a=e;++a.b}
function Sm(a,b){var c;c=Hpb(Bo(new mo(a,b)));Ml(new mo(a,b));return c}
function Su(d,a,b){if(b){var c=b.gc();d.a[a]=c(b)}else{delete d.a[a]}}
function iu(d,a,b){if(b){var c=b.gc();b=c(b)}else{b=undefined}d.a[a]=b}
function Dfb(a){yfb(this);this.d=a.d;this.c=a.c;this.a=a.a;this.b=a.b}
function n7(){this.g=new q7;this.c=new q7;this.a=new GU;this.k=new GU}
function dR(){this.d=new OQ;this.a=new tV;this.c=new SV;this.b=new CV}
function oR(){this.i=new GU;this.g=new FI;this.n=new xS;this.q=new xS}
function _Y(a,b,c,d){this.e=a;this.b=new GU;this.d=b;this.a=c;this.c=d}
function oT(){oT=iI;lT=new FT;mT=new HT;jT=new JT;kT=new LT;nT=new NT}
function DO(){DO=iI;BO=new EO(ozb,0);AO=new EO(qzb,1);CO=new EO(pzb,2)}
function IK(){IK=iI;HK=Cc((EK(),Bv(tv(Cz,1),uyb,107,0,[DK,AK,BK,CK])))}
function RK(){RK=iI;QK=Cc((NK(),Bv(tv(Dz,1),uyb,122,0,[MK,KK,JK,LK])))}
function QN(){QN=iI;PN=Cc((MN(),Bv(tv(Mz,1),uyb,139,0,[KN,LN,JN,IN])))}
function HN(){HN=iI;GN=Cc((DN(),Bv(tv(Lz,1),uyb,150,0,[BN,CN,AN,zN])))}
function pcb(){pcb=iI;ocb=Cc((lcb(),Bv(tv(JE,1),uyb,194,0,[jcb,kcb])))}
function Qhb(){Qhb=iI;Phb=Cc((Mhb(),Bv(tv(pF,1),uyb,174,0,[Khb,Lhb])))}
function Ao(a){_b(a);return aw(a,19)?new IU((Oh(),Wv(a,19))):Bo(a.mb())}
function yY(a){return Ckb(Ixb(Xv(rJ(a,(Rib(),Vhb)))))&&rJ(a,uib)!=null}
function UY(a){return Ckb(Ixb(Xv(rJ(a,(Rib(),Vhb)))))&&rJ(a,uib)!=null}
function jkb(a,b,c,d){b==null&&(b=Wxb);a.a+=''+(bmb(),b.substr(c,d-c))}
function Mrb(a,b){var c;for(c=0;c<b;++c){Av(a,c,new Xrb(Wv(a[c],21)))}}
function Hd(a,b){var c,d;c=Wv(sp(a.b,b),19);if(c){d=c.Y();c.Q();a.c-=d}}
function DU(a,b,c){var d;d=(Cxb(b,a.c.length),a.c[b]);a.c[b]=c;return d}
function itb(a){Bxb(a.a<a.c.a.length);a.b=a.a;gtb(a);return a.c.b[a.b]}
function Ul(a){Il();var b;b=0;while(a.G()){a.H();b=PH(b,1)}return $s(b)}
function hub(a){this.d=a;this.b=this.d.a.entries();this.a=this.b.next()}
function DT(a){this.g=a;this.f=new GU;this.a=Qlb(this.g.c.c,this.g.d.c)}
function kt(a){it();this.e=null;this.f=null;this.a='';this.b=a;this.a=''}
function wub(){ntb.call(this);pub(this);this.b.b=this.b;this.b.a=this.b}
function Bt(a){a&&It((Gt(),Ft));--ut;if(a){if(wt!=-1){Dt(wt);wt=-1}}}
function bW(a){if(!a.c||!a.d){return false}return !!a.c.f&&a.c.f==a.d.f}
function pt(){if(Date.now){return Date.now()}return (new Date).getTime()}
function lX(a){if(a.c.c.length!=0){return Wv(yU(a.c,0),33).a}return null}
function OX(a){if(a.c.c.length!=0){return Wv(yU(a.c,0),33).a}return null}
function qd(a){a.d=3;a.c=sm(a);if(a.d!=2){a.d=0;return true}return false}
function bgb(a,b,c){this.a=a;this.b=b;this.c=c;vU(a.j,this);vU(b.d,this)}
function VP(a,b,c,d){var e;a.c?(e=new Gu(hw(d))):(e=new Gu(d));Ru(b,c,e)}
function Co(a){var b,c;_b(a);b=xo(a.length);c=new HU(b);zpb(c,a);return c}
function Dv(a){var b,c,d;b=a&azb;c=a>>22&azb;d=a<0?bzb:0;return Ev(b,c,d)}
function nbb(){kbb();return Bv(tv(zE,1),uyb,141,0,[jbb,gbb,hbb,fbb,ibb])}
function Sgb(){Pgb();return Bv(tv(kF,1),uyb,115,0,[Lgb,Kgb,Ngb,Mgb,Ogb])}
function Zib(){Xib();return Bv(tv(qF,1),uyb,85,0,[Wib,Sib,Tib,Uib,Vib])}
function zK(){zK=iI;yK=Cc((sK(),Bv(tv(Bz,1),uyb,59,0,[qK,pK,oK,nK,rK])))}
function yN(){yN=iI;xN=Cc((sN(),Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN])))}
function DM(){DM=iI;CM=Cc((zM(),Bv(tv(Hz,1),uyb,100,0,[yM,xM,uM,vM,wM])))}
function F9(){F9=iI;E9=PQ(UQ(UQ(UQ(TQ(new WQ,(d0(),N_)),U_),r_),B_),M_)}
function TT(a,b){var c,d;for(d=b.mb();d.G();){c=Wv(d.H(),55);ST(a,c,0,0)}}
function VT(a,b,c){var d,e;for(e=a.mb();e.G();){d=Wv(e.H(),55);UT(d,b,c)}}
function X8(a,b,c){var d,e;d=0;for(e=0;e<b.length;e++){d+=a.Hc(b[e],d,c)}}
function AU(a,b){var c;c=(Cxb(b,a.c.length),a.c[b]);hxb(a.c,b,1);return c}
function Kl(a){var b;_b(a);Yb(true);for(b=0;b<0&&Cm(a);b++){Dm(a)}return b}
function Ymb(a){var b;a.d=new Ntb(a);a.e=new fub(a);b=a[WAb]|0;a[WAb]=b+1}
function igb(a){a.g=new vtb;a.o=new vtb;a.c=new vtb;a.j=new GU;a.d=new GU}
function Fxb(a,b){if(a<0||a>b){throw new okb('Index: '+a+', Size: '+b)}}
function Cxb(a,b){if(a<0||a>=b){throw new okb('Index: '+a+', Size: '+b)}}
function uob(a,b){var c,d;c=b.yb();d=Wvb(a,c);return !!d&&ovb(d.e,b.zb())}
function zbb(a,b){var c;c=a.d;if(b>0){return Wv(yU(c.a,b-1),9)}return null}
function xv(a,b,c,d,e,f){var g;g=yv(e,d);e!=9&&Bv(tv(a,f),b,c,e,g);return g}
function pd(a){var b;if(!od(a)){throw new nvb}a.d=1;b=a.c;a.c=null;return b}
function _f(a,b,c,d){this.f=a;this.e=b;this.d=c;this.b=d;this.c=!d?null:d.d}
function MH(b,c){if(b&&typeof b==Sxb){try{b.__gwt$exception=c}catch(a){}}}
function wT(a,b){if(a.a.$b(b.d,a.b)>0){vU(a.c,new WS(b.c,b.d,a.d));a.b=b.d}}
function W4(a,b){var c;c=glb(a.j,b.j);if(c==0){return glb(a.k,b.k)}return c}
function C6(a){var b,c;c=Wv(yU(a.f,0),7);b=Wv(rJ(c,(Rib(),uib)),7);return b}
function M6(a){var b,c;c=Wv(yU(a.f,0),7);b=Wv(rJ(c,(Rib(),uib)),7);return b}
function B$(a,b){return glb(Ixb(Yv(rJ(a,(Rib(),Cib)))),Ixb(Yv(rJ(b,Cib))))}
function Ujb(){Ujb=iI;Tjb=Cc((Qjb(),Bv(tv(sF,1),uyb,153,0,[Njb,Pjb,Ojb])))}
function gkb(){gkb=iI;fkb=Cc((ckb(),Bv(tv(uF,1),uyb,172,0,[_jb,akb,bkb])))}
function mK(){mK=iI;lK=Cc((iK(),Bv(tv(Az,1),uyb,103,0,[cK,fK,gK,hK,dK,eK])))}
function aL(){aL=iI;_K=Cc((YK(),Bv(tv(Ez,1),uyb,133,0,[WK,UK,XK,SK,VK,TK])))}
function QM(){QM=iI;PM=Cc((KM(),Bv(tv(Iz,1),uyb,28,0,[JM,IM,HM,EM,GM,FM])))}
function k4(){k4=iI;j4=Cc((g4(),Bv(tv(jD,1),uyb,125,0,[e4,b4,f4,d4,c4,a4])))}
function K1(){I1();return Bv(tv(GC,1),uyb,109,0,[G1,B1,E1,C1,D1,A1,F1,H1])}
function qM(){oM();return Bv(tv(Gz,1),uyb,41,0,[gM,fM,iM,nM,mM,lM,jM,kM,hM])}
function Bgb(){zgb();return Bv(tv(iF,1),uyb,123,0,[ygb,xgb,wgb,ugb,tgb,vgb])}
function bhb(){_gb();return Bv(tv(lF,1),uyb,124,0,[Ygb,Xgb,$gb,Wgb,Zgb,Vgb])}
function bK(){bK=iI;aK=new DJ('de.cau.cs.kieler.labels.labelManager',null)}
function ixb(){if(Date.now){return Date.now()}return (new Date).getTime()}
function Xsb(a){var b;b=Wv(cxb(a.b,a.b.length),11);return new atb(a.a,b,a.c)}
function dmb(a,b){var c;c=(bmb(),b.length);return emb(imb(a,a.length-c,c),b)}
function dwb(a,b){var c;c=new zwb;c.c=true;c.d=b.zb();return ewb(a,b.yb(),c)}
function He(a,b){var c;c=b.yb();return mp(),new Fk(c,Kd(a.b,c,Wv(b.zb(),19)))}
function BU(a,b){var c;c=zU(a,b,0);if(c==-1){return false}a.vb(c);return true}
function Cv(a,b){uv(b)!=9&&Bv(tb(b),b._c,b.__elementTypeId$,uv(b),a);return a}
function Rub(a){ksb(a.c.a.c,a);Bxb(a.b!=a.c.a.b);a.a=a.b;a.b=a.b.a;return a.a}
function qnb(a){uxb(!!a.c);ksb(a.e,a);a.c.I();a.c=null;a.b=onb(a);lsb(a.e,a)}
function Acb(a,b,c){a.a=b;a.c=c;a.b.a.Q();_I(a.d);a.e.a.c=xv(UF,syb,1,0,4,1)}
function Ar(a,b,c){Bk.call(this,Fpb(_b(a),_b(b)));this.b=a;this.c=b;this.a=c}
function j9(a,b,c,d){this.b=new l9(this);this.a=a;this.c=b;this.e=c;this.d=d}
function xub(a){$mb.call(this,a,0);pub(this);this.b.b=this.b;this.b.a=this.b}
function ywb(a,b){qob.call(this,a,b);this.a=xv(yH,syb,183,2,0,1);this.b=true}
function Qmb(a,b){return ew(b)?b==null?!!Ktb(a.d,null):bub(a.e,b):!!Ktb(a.d,b)}
function RR(a,b){return Ws(),(a-b>0?a-b:-(a-b))<=$yb||a==b||isNaN(a)&&isNaN(b)}
function Xs(a,b){Ws();return (a-b>0?a-b:-(a-b))<=$yb||a==b||isNaN(a)&&isNaN(b)}
function Z5(a){var b,c;b=true;do{b?(c=W5(a)):(c=U5(a));b=!b}while(c);S5(a,a.d)}
function Ru(a,b,c){var d;if(b==null){throw new Vlb}d=Pu(a,b);Su(a,b,c);return d}
function sJ(a,b,c){!a.n&&(a.n=new ntb);c==null?Wmb(a.n,b):Umb(a.n,b,c);return a}
function zU(a,b,c){for(;c<a.c.length;++c){if(ovb(b,a.c[c])){return c}}return -1}
function b2(a,b){while(b>=a.a.c.length){vU(a.a,new aJ)}return Wv(yU(a.a,b),20)}
function Fe(a,b){var c;c=Wv(rp(a.a,b),19);if(!c){return null}return Kd(a.b,b,c)}
function XP(a,b,c){var d;d=Pu(a,Gzb);if(!d){d=new Tu;Ru(a,Gzb,d)}Ru(d.kc(),b,c)}
function Okb(a,b,c,d,e){var f;f=Mkb(a,b);$kb(c,f);f.g=e?8:0;f.f=d;f.e=e;return f}
function mo(a,b){var c;this.f=a;this.b=b;c=Wv(Smb(a.b,b),126);this.c=!c?null:c.b}
function fJ(a,b){var c,d,e;for(d=0,e=b.length;d<e;++d){c=b[d];TI(a,c,a.c.b,a.c)}}
function GV(a,b,c,d,e,f){var g;g=IV(d);dW(g,e);eW(g,f);Fd(a.a,d,new XV(g,b,c.f))}
function bab(a,b,c){var d;d=0;a.c[c]>0&&(d+=dab(b));a.b[c]&&(d+=eab(b));return d}
function vub(a,b){var c;c=Wv(Wmb(a.c,b),176);if(c){Hub(c);return c.e}return null}
function $s(a){if(RH(a,$xb)>0){return $xb}if(RH(a,eyb)<0){return eyb}return _H(a)}
function Ph(a){Oh();Mh(a,'size');return _H(VH(WH(a,8),Nyb)?WH(a,8):Nyb),new Amb}
function ukb(a){skb.call(this,(bmb(),a==null?Wxb:xb(a)),aw(a,46)?Wv(a,46):null)}
function HU(a){tU(this);wxb(a>=0,'Initial capacity must not be negative')}
function JQ(){JQ=iI;HQ=VQ(UQ(UQ(new WQ,(d0(),O_)),C_),J_);IQ=TQ(new WQ,G_)}
function LX(){LX=iI;IX=new UX;GX=new XX;HX=new ZX;FX=new _X;JX=new bY;KX=new dY}
function Fwb(){Fwb=iI;Bwb=new Gwb('All',0);Cwb=new Kwb;Dwb=new Mwb;Ewb=new Pwb}
function x8(){x8=iI;w8=new y8(DAb,0);v8=new y8('LONGEST_PATH',1);u8=new y8(zAb,2)}
function Rv(){Rv=iI;Ov=Ev(azb,azb,524287);Pv=Ev(0,0,524288);Dv(1);Dv(2);Qv=Dv(0)}
function M1(){M1=iI;L1=Cc((I1(),Bv(tv(GC,1),uyb,109,0,[G1,B1,E1,C1,D1,A1,F1,H1])))}
function pbb(){pbb=iI;obb=Cc((kbb(),Bv(tv(zE,1),uyb,141,0,[jbb,gbb,hbb,fbb,ibb])))}
function Ugb(){Ugb=iI;Tgb=Cc((Pgb(),Bv(tv(kF,1),uyb,115,0,[Lgb,Kgb,Ngb,Mgb,Ogb])))}
function _ib(){_ib=iI;$ib=Cc((Xib(),Bv(tv(qF,1),uyb,85,0,[Wib,Sib,Tib,Uib,Vib])))}
function zvb(a){tvb();xvb(this,_H(QH(SH(Lv(UH(a)?YH(a):a,24)),bBb)),_H(QH(a,bBb)))}
function tb(a){return ew(a)?$F:cw(a)?HF:bw(a)?EF:_v(a)?a.$c:zv(a)?a.$c:a.$c||$y}
function uv(a){return a.__elementTypeCategory$==null?9:a.__elementTypeCategory$}
function Ht(a){var b,c;if(a.a){c=null;do{b=a.a;a.a=null;c=Lt(b,c)}while(a.a);a.a=c}}
function It(a){var b,c;if(a.b){c=null;do{b=a.b;a.b=null;c=Lt(b,c)}while(a.b);a.b=c}}
function oJ(a){nJ();var b,c;c=jzb;for(b=0;b<a.length;b++){a[b]>c&&(c=a[b])}return c}
function KQ(a,b){var c;c=Wv(Smb(a.b,b),106);if(!c){c=b.rc();Umb(a.b,b,c)}return c}
function rub(a,b){var c;c=Wv(Smb(a.c,b),176);if(c){uub(a,c);return c.e}return null}
function R2(a,b,c,d){var e;e=Wv(rub(a.e,b),116);e.b+=c;e.a+=d;tub(a.e,b,e);a.d=true}
function gtb(a){var b;++a.a;for(b=a.c.a.length;a.a<b;++a.a){if(a.c.b[a.a]){return}}}
function bt(a){var b,c,d;for(b=(a.g==null&&(a.g=Pt(a)),a.g),c=0,d=b.length;c<d;++c);}
function Tf(a,b){var c,d;Yf(a);d=a.d.V();c=a.d.ib(b);if(c){++a.f.c;d&&Vf(a)}return c}
function Mh(a,b){if(a<0){throw new slb(b+' cannot be negative but was: '+a)}return a}
function Yb(a){if(!a){throw new slb((bmb(),'numberToAdvance must be nonnegative'))}}
function nm(a){if(!a.a.G()){a.a=a.b.mb();if(!a.a.G()){throw new nvb}}return a.a.H()}
function Xl(a){Il();var b;_b(a);if(aw(a,108)){b=Wv(a,108);return b}return new km(a)}
function gu(d,a){var b=d.a[a];var c=(ev(),dv)[typeof b];return c?c(b):kv(typeof b)}
function K2(a,b){var c,d;for(d=new Tob(a);d.a<d.c.c.length;){c=Wv(Rob(d),7);J2(c,b)}}
function Z9(a,b){var c,d,e,f;for(d=a.d,e=0,f=d.length;e<f;++e){c=d[e];W9(a.g,c).a=b}}
function hR(a,b){var c;c=EI(xI(Wv(Smb(a.g,b),10)),RN(Wv(Smb(a.f,b),198).b));return c}
function sr(a){var b;return !od(Pl((b=(new Snb(a.b.a)).a.bb().mb(),new Ynb(b)),a.a))}
function bvb(a){var b;uxb(!!a.c);b=a.c.a;$I(a.d,a.c);a.b==a.c?(a.b=b):--a.a;a.c=null}
function gW(a){return !!a.c&&!!a.d?a.c.f+'('+a.c+')->'+a.d.f+'('+a.d+')':'e_'+txb(a)}
function gT(a,b){cT();return a==$S&&b==bT||a==bT&&b==$S||a==aT&&b==_S||a==_S&&b==aT}
function hT(a,b){cT();return a==$S&&b==_S||a==$S&&b==aT||a==bT&&b==aT||a==bT&&b==_S}
function Bhb(){zhb();return Bv(tv(nF,1),uyb,110,0,[shb,whb,thb,xhb,uhb,yhb,vhb,rhb])}
function sM(){sM=iI;rM=Cc((oM(),Bv(tv(Gz,1),uyb,41,0,[gM,fM,iM,nM,mM,lM,jM,kM,hM])))}
function UM(){UM=iI;TM=new VM('OUTSIDE',0);SM=new VM('INSIDE',1);RM=new VM('FIXED',2)}
function Hhb(){Hhb=iI;Fhb=new Ihb(tzb,0);Ghb=new Ihb('TOP',1);Ehb=new Ihb('BOTTOM',2)}
function mxb(){mxb=iI;lxb=new qxb;kxb=new oxb('ISO-LATIN-1');jxb=new oxb('ISO-8859-1')}
function lcb(){lcb=iI;jcb=new mcb('CLASSIC',0);kcb=new mcb('IMPROVE_STRAIGHTNESS',1)}
function kW(){this.e=new FI;this.a=new $W;this.d=new FI;this.b=new GU;this.c=new GU}
function kdb(a,b,c){this.b=b;this.a=a;this.c=c;vU(this.a.e,this);vU(this.b.b,this)}
function Afb(a,b){a.d=Qlb(a.d,b.d);a.c=Nlb(a.c,b.c);a.a=Nlb(a.a,b.a);a.b=Qlb(a.b,b.b)}
function $I(a,b){var c;c=b.c;b.a.b=b.b;b.b.a=b.a;b.a=b.b=null;b.c=null;--a.b;return c}
function Jl(a,b){Il();var c;_b(a);_b(b);c=false;while(b.G()){c=c|a.ib(b.H())}return c}
function pnb(a){var b;ksb(a.e,a);Bxb(a.b);a.c=a.a;b=Wv(a.a.H(),21);a.b=onb(a);return b}
function sm(a){var b;while(a.b.G()){b=a.b.H();if(a.a.D(b)){return b}}return a.d=2,null}
function _sb(a,b){if(!!b&&a.b[b.e]==b){Av(a.b,b.e,null);--a.c;return true}return false}
function TH(a){if(ezb<a&&a<dzb){return a<0?Math.ceil(a):Math.floor(a)}return SH(Jv(a))}
function rl(a){if(a){if(a.V()){throw new nvb}return a.sb(a.Y()-1)}return Rl(null.mb())}
function ybb(a,b){var c;c=a.d;if(b<c.a.c.length-1){return Wv(yU(c.a,b+1),9)}return null}
function $kb(a,b){var c;if(!a){return}b.k=a;var d=Ukb(b);if(!d){fI[a]=[b];return}d.$c=b}
function O5(a,b){var c,d;d=false;do{a.i?(c=V5(a,b)):(c=X5(a,b));d=d|c}while(c);return d}
function Bbb(a,b,c){var d,e;d=b;do{e=Ixb(a.n[d.k])+c;a.n[d.k]=e;d=a.a[d.k]}while(d!=b)}
function M4(a){var b,c;for(c=new Tob(a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);b.vc()}}
function bI(){cI();var a=aI;for(var b=0;b<arguments.length;b++){a.push(arguments[b])}}
function dn(a,b){var c,d;for(c=0,d=a.Y();c<d;++c){if(ovb(b,a.sb(c))){return c}}return -1}
function or(a,b){var c;ac(a,'set1');ac(b,'set2');c=(hc(),new nc(b));return new tr(a,c,b)}
function Rt(a){var b=/function(?:\s+([\w$]+))?\s*\(/;var c=b.exec(a);return c&&c[1]||Xxb}
function YQ(a,b,c){nI(c,Tzb,3);NV(a.c,b,rI(c,1));aR(a,b,rI(c,1));BV(b,rI(c,1));pI(c)}
function Dgb(){Dgb=iI;Cgb=Cc((zgb(),Bv(tv(iF,1),uyb,123,0,[ygb,xgb,wgb,ugb,tgb,vgb])))}
function dhb(){dhb=iI;chb=Cc((_gb(),Bv(tv(lF,1),uyb,124,0,[Ygb,Xgb,$gb,Wgb,Zgb,Vgb])))}
function Ilb(){Ilb=iI;Hlb=Bv(tv(mw,1),Yyb,26,12,[0,8,4,12,2,10,6,14,1,9,5,13,3,11,7,15])}
function djb(){djb=iI;cjb=new ejb(szb,0);ajb=new ejb('INPUT',1);bjb=new ejb('OUTPUT',2)}
function de(a){this.c=a;this.b=new rnb((new inb(a.b)).a);this.a=null;this.d=(Il(),Il(),Hl)}
function Nn(a){this.e=a;this.d=new wtb(op(ud(this.e).Y()));this.c=this.e.a;this.b=this.e.c}
function qR(a,b,c){this.c=a;oR.call(this);this.b=b;this.j=new VN(b.d,b.e,b.c,b.b);this.a=c}
function qI(a,b){if(a.j>0&&a.c<a.j){a.c+=b;!!a.g&&a.g.d>0&&a.e!=0&&qI(a.g,b/a.j*a.g.d)}}
function WV(a){if(a.b.d.f.g==(CX(),xX)){return Wv(rJ(a.b.d.f,(Rib(),uib)),7)}return a.b.d}
function VV(a){if(a.b.c.f.g==(CX(),xX)){return Wv(rJ(a.b.c.f,(Rib(),uib)),7)}return a.b.c}
function od(a){dc(a.d!=3);switch(a.d){case 2:return false;case 0:return true;}return qd(a)}
function CZ(a){switch(a.e){case 2:return sN(),rN;case 4:return sN(),ZM;default:return a;}}
function DZ(a){switch(a.e){case 1:return sN(),pN;case 3:return sN(),$M;default:return a;}}
function Km(a){var b;if(aw(a,90)){b=Wv(a,90);return new Lm(b.a)}else{return Il(),new dm(a)}}
function Fpb(a,b){ypb();var c;c=new otb(1);ew(a)?Vmb(c,a,b):Ltb(c.d,a,b);return new mrb(c)}
function Is(a,b){if(!a.g){return a.e}else{a.g=Is(a.g,b);--a.a;a.j=XH(a.j,b.c);return Gs(a)}}
function Js(a,b){if(!a.e){return a.g}else{a.e=Js(a.e,b);--a.a;a.j=XH(a.j,b.c);return Gs(a)}}
function Ue(a,b){var c,d,e;Dxb(b);c=false;for(e=b.mb();e.G();){d=e.H();c=c|a.ib(d)}return c}
function nr(a){var b,c,d;b=0;for(d=a.mb();d.G();){c=d.H();b+=c!=null?vb(c):0;b=~~b}return b}
function BY(a){var b,c,d,e;for(c=a.a,d=0,e=c.length;d<e;++d){b=c[d];b.B(null)}return null}
function Xeb(a){var b,c,d;d=new jJ;for(c=a.b.mb();c.G();){b=Wv(c.H(),92);QI(d,b.a)}return d}
function mfb(a){var b,c,d;b=0;for(d=a.mb();d.G();){c=Yv(d.H());b+=(Dxb(c),c)}return b/a.Y()}
function Rbb(a,b){var c;c=Wv(Smb(a.c,b),200);if(!c){c=new Ybb;c.c=b;Umb(a.c,c.c,c)}return c}
function Wsb(a,b){var c;Dxb(b);c=b.e;if(!a.b[c]){Av(a.b,c,b);++a.c;return true}return false}
function hwb(a,b){var c,d;c=1-b;d=a.a[c];a.a[c]=d.a[b];d.a[b]=a;a.b=true;d.b=false;return d}
function yI(a,b){var c;if(aw(b,10)){c=Wv(b,10);return a.a==c.a&&a.b==c.b}else{return false}}
function Bs(a,b,c){a.g=new Os(b,c);es(a,a.g,a.i);a.d=Plb(2,a.d);++a.a;a.j=PH(a.j,c);return a}
function As(a,b,c){a.e=new Os(b,c);es(a.f,a.e,a);a.d=Plb(2,a.d);++a.a;a.j=PH(a.j,c);return a}
function Nu(e,a){var b=e.a;var c=0;for(var d in b){b.hasOwnProperty(d)&&(a[c++]=d)}return a}
function he(a,b){var c,d;Dxb(b);for(d=b.bb().mb();d.G();){c=Wv(d.H(),21);a.db(c.yb(),c.zb())}}
function vcb(a,b,c){var d;d=a.a.e[Wv(b.a,9).k]-a.a.e[Wv(c.a,9).k];return hw(d>0?1:d<0?-1:0)}
function r5(a,b,c){this.g=a;this.d=b;this.e=c;this.a=new GU;p5(this);ypb();Gpb(this.a,null)}
function Os(a,b){Xb(b>0);this.b=a;this.c=b;this.j=b;this.a=1;this.d=1;this.e=null;this.g=null}
function qcb(a){a.a=null;a.e=null;a.b.c=xv(UF,syb,1,0,4,1);a.f.c=xv(UF,syb,1,0,4,1);a.c=null}
function qhb(){ohb();return Bv(tv(mF,1),uyb,113,0,[fhb,hhb,ihb,jhb,khb,lhb,nhb,ehb,ghb,mhb])}
function uvb(a){return wvb(a,26)*1.4901161193847656E-8+wvb(a,27)*1.1102230246251565E-16}
function Fo(a){return aw(a,87)?Ii(Wv(a,87)):aw(a,88)?Wv(a,88).a:aw(a,63)?new ap(a):new Ro(a)}
function Udb(a){var b;b=Wv(rJ(a,(Rib(),hib)),32);return a.g==(CX(),xX)&&(b==(sN(),rN)||b==ZM)}
function YT(a,b){if(ZT(a,b)){Fd(a.a,Wv(rJ(b,(Rib(),fib)),18),b);return true}else{return false}}
function QQ(a,b){var c;if(b){for(c=0;c<6;c++){Wv(yU(a.a,c),18).jb(Wv(yU(b.a,c),19))}}return a}
function rI(a,b){var c;if(a.b){return null}else{c=oI(a.e,a.f);QI(a.a,c);c.g=a;a.d=b;return c}}
function hJ(a,b){var c,d;for(d=WI(a,0);d.b!=d.d.c;){c=Wv(_ub(d),10);c.a+=b.a;c.b+=b.b}return a}
function J9(a,b){var c,d;for(c=0;c<b.length;c++){for(d=0;d<b[c].length;d++){b[c][d]=a[c][d]}}}
function P2(a){var b,c;for(c=new Tob(a.b.f);c.a<c.c.c.length;){b=Wv(Rob(c),7);Y2(a.a,Reb(b.g))}}
function cT(){cT=iI;$S=new fT('Q1',0);bT=new fT('Q4',1);_S=new fT('Q2',2);aT=new fT('Q3',3)}
function EK(){EK=iI;DK=new FK(szb,0);AK=new FK(qzb,1);BK=new FK('HEAD',2);CK=new FK('TAIL',3)}
function ckb(){ckb=iI;_jb=new dkb('AGGRESSIVE',0);akb=new dkb('CAREFUL',1);bkb=new dkb('OFF',2)}
function Dhb(){Dhb=iI;Chb=Cc((zhb(),Bv(tv(nF,1),uyb,110,0,[shb,whb,thb,xhb,uhb,yhb,vhb,rhb])))}
function Akb(a,b){xkb();return ew(a)?kmb(a,$v(b)):cw(a)?flb(a,Yv(b)):bw(a)?ykb(a,Xv(b)):a.F(b)}
function Es(a,b,c){var d;d=b.$b(c,a.b);return d<0?!a.e?0:Es(a.e,b,c):d>0?!a.g?0:Es(a.g,b,c):a.c}
function rk(a,b){var c,d;if(!a.b){return false}d=a.e;c=a.a.$b(b,d);return c<0|c==0&a.d==(Gh(),Fh)}
function qk(a,b){var c,d;if(!a.c){return false}d=a.g;c=a.a.$b(b,d);return c>0|c==0&a.f==(Gh(),Fh)}
function SH(a){var b;b=a.h;if(b==0){return a.l+a.m*czb}if(b==bzb){return a.l+a.m*czb-dzb}return a}
function MI(a){var b,c,d,e;b=new FI;for(d=0,e=a.length;d<e;++d){c=a[d];b.a+=c.a;b.b+=c.b}return b}
function J6(a){var b,c,d,e;for(c=a.a,d=0,e=c.length;d<e;++d){b=c[d];Q6(a,b,(sN(),pN));Q6(a,b,$M)}}
function zo(a){var b,c,d;b=1;for(d=a.mb();d.G();){c=d.H();b=31*b+(c==null?0:vb(c));b=~~b}return b}
function Tsb(a){var b,c;b=Wv(a.e&&a.e(),11);c=Wv(cxb(b,b.length),11);return new atb(b,c,b.length)}
function R6(a){this.e=gw(rJ(hX(a[0]),(eM(),uL)))===gw((NK(),JK));this.a=a;this.c=new ntb;J6(this)}
function kR(a){fR();this.g=(mp(),new ntb);this.f=new ntb;this.b=new ntb;this.c=new xk;this.i=a}
function odb(a){this.o=a;this.g=new GU;this.j=new aJ;this.n=new aJ;this.e=new GU;this.b=new GU}
function OR(a,b){stb(a.a,b);if(b.f){throw new gt('CNode belongs to another CGroup.')}b.f=a}
function eI(a,b){typeof window===Sxb&&typeof window['$gwt']===Sxb&&(window['$gwt'][a]=b)}
function K5(a,b,c,d){var e,f;e=I5(a,b,c,d);e<0&&(e=-e-1);for(f=c-1;f>=e;f--){a[f+1]=a[f]}a[e]=d}
function kab(a,b,c,d){var e,f;e=jab(a,b,c,d);e<0&&(e=-e-1);for(f=c-1;f>=e;f--){a[f+1]=a[f]}a[e]=d}
function Xe(a,b){var c,d;Dxb(b);for(d=b.mb();d.G();){c=d.H();if(!a.kb(c)){return false}}return true}
function Ll(a,b){Il();var c;_b(b);while(a.G()){c=a.H();if(!Udb(Wv(c,9))){return false}}return true}
function wV(a,b){var c,d,e;c=b.k-a.k;if(c==0){d=a.e.a*a.e.b;e=b.e.a*b.e.b;return glb(d,e)}return c}
function YH(a){var b,c,d,e;e=a;d=0;if(e<0){e+=dzb;d=bzb}c=hw(e/czb);b=hw(e-c*czb);return Ev(b,c,d)}
function n6(a,b){a.c.c=xv(UF,syb,1,0,4,1);o6(a,a.e,b);o6(a,a.a,b);ypb();Gpb(a.c,null);return p6(a)}
function c5(a,b,c){a.g=i5(a,b,(sN(),ZM),a.b);a.d=i5(a,c,ZM,a.b);if(a.g.c==0||a.d.c==0){return}f5(a)}
function d5(a,b,c){a.g=i5(a,b,(sN(),rN),a.j);a.d=i5(a,c,rN,a.j);if(a.g.c==0||a.d.c==0){return}f5(a)}
function pU(a,b,c){return new VN(Qlb(a.a,b.a)-c/2,Qlb(a.b,b.b)-c/2,Jlb(a.a-b.a)+c,Jlb(a.b-b.b)+c)}
function onb(a){if(a.a.G()){return true}if(a.a!=a.d){return false}a.a=new Ptb(a.e.d);return a.a.G()}
function xU(a,b){var c,d;c=b.ob();d=c.length;if(d==0){return false}gxb(a.c,a.c.length,c);return true}
function S5(a,b){var c,d;for(c=0;c<a.a.length;c++){for(d=0;d<a.a[c].length;d++){a.a[c][d]=b[c][d]}}}
function zpb(a,b){ypb();var c,d,e,f;f=false;for(d=0,e=b.length;d<e;++d){c=b[d];f=f|a.ib(c)}return f}
function op(a){mp();if(a<3){Mh(a,'expectedSize');return a+1}if(a<Nyb){return hw(a/0.75+1)}return $xb}
function ml(a,b){var c;if(aw(b,19)){c=(Oh(),Wv(b,19));return a.jb(c)}return Jl(a,Wv(_b(b),22).mb())}
function Ufb(a,b){var c,d;d=a.d.f;if(d.g==(CX(),AX)){return}c=Uh(mX(d));Cm(c)&&Umb(b,a,Wv(Dm(c),12))}
function Xob(a,b){var c,d;yxb(b);return c=epb(a,0,b),d=xv(mw,Yyb,26,b,12,1),dxb(a,0,d,0,c,true),d}
function swb(a,b){var c;this.c=a;c=new GU;Zvb(a,c,b,a.b,null,false,null,false);this.a=new Fnb(c,0)}
function is(a){if(!a.a){return false}else if(qk(a.c.b,a.a.b)){a.a=null;return false}else{return true}}
function ec(a){if(!a){throw new ulb((bmb(),'no calls to next() since the last call to remove()'))}}
function ev(){ev=iI;dv={'boolean':fv,'number':gv,'string':iv,'object':hv,'function':hv,'undefined':jv}}
function xR(){xR=iI;vR=rr(Bv(tv(Bz,1),uyb,59,0,[(sK(),oK),pK]));wR=rr(Bv(tv(Bz,1),uyb,59,0,[rK,nK]))}
function Apb(a){ypb();var b,c,d;d=0;for(c=a.mb();c.G();){b=c.H();d=d+(b!=null?vb(b):0);d=d|0}return d}
function Hq(a){Dq();var b,c,d;d=0;for(c=Vg(a).mb();c.G();){b=Wv(c.H(),83);d=PH(d,b.Yb())}return $s(d)}
function dS(a){var b,c;for(c=new Tob(a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);b.i.Q()}a.c.Dc(a);eS(a)}
function eub(a,b){var c;c=Utb(a.a,b);if(c===undefined){++a.d}else{a.a[$Ab](b);--a.c;msb(a.b)}return c}
function X5(a,b){var c,d,e,f;c=false;d=a.d[b].length;for(e=d-1;e>0;e--){f=e-1;c=c|Y5(a,b,f,e)}return c}
function V5(a,b){var c,d,e,f;c=false;d=a.d[b].length;for(f=0;f<d-1;f++){e=f+1;c=c|Y5(a,b,f,e)}return c}
function Gv(a,b){var c,d,e;c=a.l+b.l;d=a.m+b.m+(c>>22);e=a.h+b.h+(d>>22);return Ev(c&azb,d&azb,e&bzb)}
function Mv(a,b){var c,d,e;c=a.l-b.l;d=a.m-b.m+(c>>22);e=a.h-b.h+(d>>22);return Ev(c&azb,d&azb,e&bzb)}
function LI(a,b){var c;for(c=0;c<(bmb(),b.length);c++){if(a==b.charCodeAt(c)){return true}}return false}
function yP(a,b){var c;for(c=0;c<(bmb(),b.length);c++){if(a==b.charCodeAt(c)){return true}}return false}
function rJ(a,b){var c,d;if(a.n){d=Smb(a.n,b);if(d!=null){return d}}c=zJ(b);aw(c,5)&&sJ(a,b,c);return c}
function lJ(a){var b,c,d;b=new jJ;for(d=WI(a,0);d.b!=d.d.c;){c=Wv(_ub(d),10);rn(b,0,new II(c))}return b}
function Q6(a,b,c){var d,e,f,g;g=new U6(b,c);f=0;for(e=T6(g);e.G();){d=Wv(e.H(),7);Umb(a.c,d,Elb(f++))}}
function Fb(a,b,c){_b(b);if(c.G()){vmb(b,a.C(c.H()));while(c.G()){vmb(b,a.c);vmb(b,a.C(c.H()))}}return b}
function g9(a,b,c,d,e){if(d){h9(a,b)}else{d9(a,b,e);e9(a,b,c)}if(b.c.length>1){Gpb(b,a.b);V9(a.c,b)}}
function Bv(a,b,c,d,e){e.$c=a;e._c=b;e.ad=kI;e.__elementTypeId$=c;e.__elementTypeCategory$=d;return e}
function vS(a,b,c){switch(c.e){case 2:a.b=b;break;case 1:a.c=b;break;case 4:a.d=b;break;case 3:a.a=b;}}
function B6(a,b,c){var d,e;e=C6(c).g;d=w6(a,b,e).a;return d-Klb(Wv(Smb(a.c,b),24).a-Wv(Smb(a.c,c),24).a)}
function glb(a,b){if(a<b){return -1}if(a>b){return 1}if(a==b){return 0}return isNaN(a)?isNaN(b)?0:1:-1}
function Yi(a){switch(a.Y()){case 0:return Fi;case 1:return new Er(a.mb().H());default:return new gr(a);}}
function Nt(){Nt=iI;var a,b;b=!(!!Error.stackTraceLimit||'stack' in new Error);a=new _t;Mt=b?new Tt:a}
function RP(){RP=iI;OP=new DJ('intCoordinates',(xkb(),xkb(),vkb));PP=new CJ('jsonObject');QP=new HI(0,0)}
function XZ(){XZ=iI;VZ=new YZ('MIRROR_X',0);WZ=new YZ('TRANSPOSE',1);UZ=new YZ('MIRROR_AND_TRANSPOSE',2)}
function Hgb(){Hgb=iI;Fgb=new Igb(tzb,0);Egb=new Igb('INCOMING_ONLY',1);Ggb=new Igb('OUTGOING_ONLY',2)}
function Seb(){Ieb();return Bv(tv(_E,1),uyb,60,0,[meb,jeb,ieb,peb,oeb,Heb,Geb,neb,keb,leb,qeb,Eeb,Feb])}
function b3(){b3=iI;var a,b,c,d;a3=new vsb(_E);for(b=Seb(),c=0,d=b.length;c<d;++c){a=b[c];ssb(a3,a,null)}}
function Bpb(a){ypb();var b,c,d;d=1;for(c=a.mb();c.G();){b=c.H();d=31*d+(b!=null?vb(b):0);d=d|0}return d}
function Tl(a,b){Il();var c,d;ac(b,'predicate');for(d=0;a.G();d++){c=a.H();if(b.D(c)){return d}}return -1}
function Or(a,b){var c,d;c=a.c.a;d=b.ac(c);a.b.b&&(d=XH(d,Nr(a,b,c)));a.b.c&&(d=XH(d,Mr(a,b,c)));return d}
function bwb(a,b,c){var d,e;d=new ywb(b,c);e=new zwb;a.b=_vb(a,a.b,d,e);e.b||++a.c;a.b.b=false;return e.d}
function gJ(a,b,c){var d,e,f;d=new aJ;for(f=WI(c,0);f.b!=f.d.c;){e=Wv(_ub(f),10);QI(d,new II(e))}sn(a,b,d)}
function Mp(a,b){var c;if(b===a){return true}if(aw(b,144)){c=Wv(b,144);return a.P().t(c.P())}return false}
function Svb(a){var b;b=a.a.c.length;if(b>0){return Dvb(b-1,a.a.c.length),AU(a.a,b-1)}else{throw new osb}}
function p2(a){if(a.b.c.length-a.e.c.length<0){QX(a,(sN(),ZM));a.a.a=a.j.a}else{QX(a,(sN(),rN));a.a.a=0}}
function $mb(a,b){wxb(a>=0,'Negative initial capacity');wxb(b>=0,'Non-positive load factor');Ymb(this)}
function rnb(a){var b;this.e=a;this.d=new hub(this.e.e);this.a=this.d;this.b=onb(this);b=a[WAb];this[WAb]=b}
function Kkb(){++Fkb;this.n=null;this.j=null;this.i=null;this.d=null;this.b=null;this.k=null;this.a=null}
function fpb(a){var b,c,d,e;e=1;for(c=0,d=a.length;c<d;++c){b=a[c];e=31*e+(b!=null?vb(b):0);e=e|0}return e}
function Cc(a){var b,c,d,e;b={};for(d=0,e=a.length;d<e;++d){c=a[d];b[':'+(c.d!=null?c.d:''+c.e)]=c}return b}
function wO(a){uO();var b,c,d,e;for(c=xO(),d=0,e=c.length;d<e;++d){b=c[d];if(Zi(b.a,a)){return b}}return tO}
function Itb(a,b,c){var d,e,f;for(e=0,f=c.length;e<f;++e){d=c[e];if(a.b.Uc(b,d.yb())){return d}}return null}
function Rmb(a,b,c){var d,e;for(e=c.mb();e.G();){d=Wv(e.H(),21);if(a.Uc(b,d.zb())){return true}}return false}
function Wvb(a,b){var c,d,e;e=a.b;while(e){c=a.a.$b(b,e.d);if(c==0){return e}d=c<0?0:1;e=e.a[d]}return null}
function Ge(a,b){var c,d;c=Wv(Wmb(a.a,b),19);if(!c){return null}d=a.b.Z();d.jb(c);a.b.c-=c.Y();c.Q();return d}
function y0(a,b,c){var d;d=Wv(b.B(a),9);while(d.g==(CX(),zX)){!d.n&&(d.n=new ntb);Wmb(d.n,c);d=Wv(b.B(d),9)}}
function RH(a,b){var c;if(UH(a)&&UH(b)){c=a-b;if(!isNaN(c)){return c}}return Iv(UH(a)?YH(a):a,UH(b)?YH(b):b)}
function OH(a){var b;if(aw(a,46)){return a}b=a&&a.__gwt$exception;if(!b){b=new kt(a);Ot(b,a);MH(a,b)}return b}
function p6(a){var b,c,d;b=0;for(d=new Tob(a.c);d.a<d.c.c.length;){c=Wv(Rob(d),226);b+=b6(a,c.a,c.b)}return b}
function pT(a){var b;b=new DT(a);RT(a.a,nT,new opb(Bv(tv(JA,1),syb,160,0,[b])));!!b.d&&vU(b.f,b.d);return b.f}
function w6(a,b,c){switch(c.e){case 1:return Wv(Smb(a.d,b),24);case 3:return Wv(Smb(a.j,b),24);}return Elb(0)}
function M5(a,b,c){if(!a.d[b.k][c.k]){L5(a,b,c);a.d[b.k][c.k]=true;a.d[c.k][b.k]=true}return a.a[b.k][c.k]}
function Ds(a,b,c){var d;d=b.$b(c,a.b);return d<0?!a.e?a:Wv(Sb(Ds(a.e,b,c),a),206):d==0?a:!a.g?null:Ds(a.g,b,c)}
function rb(a,b){return ew(a)?emb(a,b):cw(a)?(Dxb(a),a===b):bw(a)?(Dxb(a),a===b):_v(a)?a.t(b):zv(a)?a===b:a===b}
function vQ(a,b){return emb(a.b,b)||dmb(a.b,b)&&((bmb(),b.length)==pmb(a.b)||jmb(a.b,pmb(a.b)-b.length-1)==46)}
function L6(a,b){var c,d,e;c=0;for(e=nX(a,b).mb();e.G();){d=Wv(e.H(),7);c+=rJ(d,(Rib(),Bib))!=null?1:0}return c}
function Xvb(a,b){var c,d,e;d=null;e=a.b;while(e){c=a.a.$b(b,e.d);if(c>=0){e=e.a[1]}else{d=e;e=e.a[0]}}return d}
function Yvb(a,b){var c,d,e;d=null;e=a.b;while(e){c=a.a.$b(b,e.d);if(c<=0){e=e.a[0]}else{d=e;e=e.a[1]}}return d}
function u0(a,b,c,d){var e,f;for(f=a.mb();f.G();){e=Wv(f.H(),33);e.i.a=b.a+(d.a-e.j.a)/2;e.i.b=b.b;b.b+=e.j.b+c}}
function o$(a,b){var c;if(a.c.length==0){return}c=Wv(FU(a,xv(qB,Nzb,9,a.c.length,0,1)),51);lpb(c,new z$);l$(c,b)}
function t$(a,b){var c;if(a.c.length==0){return}c=Wv(FU(a,xv(qB,Nzb,9,a.c.length,0,1)),51);lpb(c,new C$);l$(c,b)}
function _Z(a){var b,c;b=a.g;if(b==(CX(),xX)){c=Wv(rJ(a,(Rib(),hib)),32);return c==(sN(),$M)||c==pN}return false}
function Gc(a,b){var c;Dxb(b);c=a[':'+b];xxb(!!c,'Enum constant undefined: %s',Bv(tv(UF,1),syb,1,4,[b]));return c}
function Zb(a,b,c){if(!a){throw new slb(fc('lowerEndpoint (%s) > upperEndpoint (%s)',Bv(tv(UF,1),syb,1,4,[b,c])))}}
function kv(a){ev();throw new zu("Unexpected typeof result '"+a+"'; please report this bug to the GWT team")}
function tN(a){switch(a.e){case 1:return pN;case 2:return rN;case 3:return $M;case 4:return ZM;default:return qN;}}
function vK(a){switch(a.e){case 2:return pK;case 1:return oK;case 4:return nK;case 3:return rK;default:return qK;}}
function Dkb(a){if(a>=48&&a<58){return a-48}if(a>=97&&a<97){return a-97+10}if(a>=65&&a<65){return a-65+10}return -1}
function td(a,b){var c,d;for(d=Ep(Be(a.P()));d.b.G();){c=Wv(zm(d,d.b.H()),19);if(c.kb(b)){return true}}return false}
function js(a){var b;if(!is(a)){throw new nvb}b=new fs(a.c,a.a);a.b=b;a.a.i==a.c.a?(a.a=null):(a.a=a.a.i);return b}
function pp(a,b){mp();var c;if(a===b){return true}else if(aw(b,57)){c=Wv(b,57);return mr(nj(a),c.bb())}return false}
function Gq(a,b,c,d){Dq();Mh(c,'oldCount');Mh(d,'newCount');if(a.Cb(b)==c){a.Gb(b,d);return true}else{return false}}
function Bh(a,b,c,d,e){_b(c);_b(e);return Rr(new Ur(a.c,pk(a.b,new sk(a.d,true,b,c,false,null,(Gh(),Fh))),a.a),d,e)}
function ck(a){hi();switch(a.Y()){case 0:return kr(),jr;case 1:return new Gr(a.mb().H());default:return new lr(a);}}
function PH(a,b){var c;if(UH(a)&&UH(b)){c=a+b;if(ezb<c&&c<dzb){return c}}return SH(Gv(UH(a)?YH(a):a,UH(b)?YH(b):b))}
function WH(a,b){var c;if(UH(a)&&UH(b)){c=a*b;if(ezb<c&&c<dzb){return c}}return SH(Kv(UH(a)?YH(a):a,UH(b)?YH(b):b))}
function XH(a,b){var c;if(UH(a)&&UH(b)){c=a-b;if(ezb<c&&c<dzb){return c}}return SH(Mv(UH(a)?YH(a):a,UH(b)?YH(b):b))}
function sK(){sK=iI;qK=new wK(szb,0);pK=new wK(pzb,1);oK=new wK(ozb,2);nK=new wK('DOWN',3);rK=new wK('UP',4)}
function NK(){NK=iI;MK=new OK(szb,0);KK=new OK('POLYLINE',1);JK=new OK('ORTHOGONAL',2);LK=new OK('SPLINES',3)}
function eL(){eL=iI;cL=new fL('INHERIT',0);bL=new fL('INCLUDE_CHILDREN',1);dL=new fL('SEPARATE_CHILDREN',2)}
function G8(){G8=iI;D8=TQ(RQ(new WQ,(d0(),p_)),I_);E8=PQ(TQ(SQ(new WQ,j_),h_),i_);F8=PQ(UQ(new WQ,k_),i_)}
function P8(){P8=iI;M8=TQ(RQ(new WQ,(d0(),p_)),I_);N8=PQ(TQ(SQ(new WQ,j_),h_),i_);O8=PQ(UQ(new WQ,k_),i_)}
function deb(a){this.a=new Wub;this.d=new Wub;this.b=new Wub;this.c=new Wub;this.g=new Wub;this.i=new Wub;this.f=a}
function UV(a,b,c,d,e,f){this.e=new GU;this.f=(djb(),cjb);vU(this.e,a);this.d=b;this.a=c;this.b=d;this.f=e;this.c=f}
function hpb(a,b,c,d,e,f,g,h){var i;i=c;while(f<g){i>=d||b<c&&h.$b(a[b],a[i])<=0?Av(e,f++,a[b++]):Av(e,f++,a[i++])}}
function v0(a,b,c,d,e){var f,g;for(g=a.mb();g.G();){f=Wv(g.H(),33);f.i.a=b.a;f.i.b=e?b.b:b.b+d.b-f.j.b;b.a+=f.j.a+c}}
function gcb(a,b){$bb();var c,d;for(d=Uh(gX(a));Cm(d);){c=Wv(Dm(d),12);if(c.d.f==b||c.c.f==b){return c}}return null}
function fdb(a,b,c){var d,e,f;d=0;for(f=WI(a,0);f.b!=f.d.c;){e=Ixb(Yv(_ub(f)));if(e>c){break}else e>=b&&++d}return d}
function sn(a,b,c){var d,e,f,g;Dxb(c);g=false;f=WI(a,b);for(e=WI(c,0);e.b!=e.d.c;){d=_ub(e);$ub(f,d);g=true}return g}
function Uf(a,b){var c,d,e;if(b.V()){return false}e=a.Y();c=a.d.jb(b);if(c){d=a.d.Y();a.f.c+=d-e;e==0&&Vf(a)}return c}
function qJ(a,b){var c;if(!b){return a}c=!b.n?(ypb(),ypb(),wpb):b.n;c.V()||(!a.n?(a.n=new ptb(c)):he(a.n,c));return a}
function Gb(b,c,d){var e;try{Fb(b,c,d)}catch(a){a=OH(a);if(aw(a,181)){e=a;throw new ukb(e)}else throw NH(a)}return c}
function Qb(b,c,d){var e;try{Pb(b,c,d)}catch(a){a=OH(a);if(aw(a,181)){e=a;throw new ukb(e)}else throw NH(a)}return c}
function NH(a){var b;if(aw(a,164)){b=Wv(a,164);if(gw(b.b)!==gw((it(),ht))){return gw(b.b)===gw(ht)?null:b.b}}return a}
function SW(a,b){var c;c=Wv(rJ(hX(a),(Rib(),zib)),9);while(c){if(c==b){return true}c=Wv(rJ(hX(c),zib),9)}return false}
function EZ(a){switch(Wv(rJ(a,(Rib(),mib)),140).e){case 1:sJ(a,mib,(Hhb(),Ehb));break;case 2:sJ(a,mib,(Hhb(),Ghb));}}
function Kk(a){hi();switch(a.c){case 0:return kr(),jr;case 1:return new Gr(Sl(new jtb(a)));default:return new Jk(a);}}
function Ti(a){Gi();var b,c;for(b=0,c=a.length;b<c;b++){if(a[b]==null){throw new Wlb('at index '+b)}}return new opb(a)}
function $4(a,b,c){if(b.length==0||c.length==0){return 0}a.e?(a.b=new y5(a.c)):(a.b=new H5(a.c));return a.b.Gc(b,c)}
function pI(a){if(a.i==null){throw new ulb('The task has not begun yet.')}if(!a.b){a.c<a.j&&qI(a,a.j-a.c);a.b=true}}
function DR(a,b){var c,d;for(d=new Tob(b);d.a<d.c.c.length;){c=Wv(Rob(d),27);BU(a.b.b,c.b);PR(Wv(c.a,78),Wv(c.b,25))}}
function aU(a,b){var c,d;for(d=new Tob(a.a);d.a<d.c.c.length;){c=Wv(Rob(d),222);if(YT(c,b)){return}}vU(a.a,new _T(b))}
function aV(a){var b,c,d;b=new GU;for(d=new Tob(a.b);d.a<d.c.c.length;){c=Wv(Rob(d),251);xU(b,Wv(c.Ac(),19))}return b}
function Q0(a,b){var c,d,e;e=new GU;for(d=nX(a,b).mb();d.G();){c=Wv(d.H(),7);e.c[e.c.length]=c}Gpb(e,new V0);return e}
function iX(a){var b,c,d;b=new GU;for(d=new Tob(a.f);d.a<d.c.c.length;){c=Wv(Rob(d),7);vU(b,c.b)}return _b(b),new Vh(b)}
function mX(a){var b,c,d;b=new GU;for(d=new Tob(a.f);d.a<d.c.c.length;){c=Wv(Rob(d),7);vU(b,c.e)}return _b(b),new Vh(b)}
function Elb(a){var b,c;if(a>-129&&a<128){b=a+128;c=(Glb(),Flb)[b];!c&&(c=Flb[b]=new wlb(a));return c}return new wlb(a)}
function R5(a){var b,c;b=Z4(a.b,a.d);c=$xb;while(c>b){S5(a,a.d);if(b==0){c=0;break}W5(a);U5(a);c=b;b=Z4(a.b,a.d)}a.c=c}
function yvb(){tvb();var a,b,c;c=svb+++ixb();a=hw(Math.floor(c*FAb))&bBb;b=hw(c-a*aBb);this.a=a^1502;this.b=b^_Ab}
function vb(a){return ew(a)?Pxb(a):cw(a)?hw((Dxb(a),a)):bw(a)?Ckb((Dxb(a),a))?1231:1237:_v(a)?a.v():zv(a)?txb(a):txb(a)}
function AQ(a,b,c){var d,e,f;e=new jQ;e.d=c;d=UP(e,b);f=new dR;Ckb(Ixb(Xv(rJ(d,yQ))))?YQ(f,d,new sI):BQ(a,f,d);ZP(e,d)}
function E6(a,b,c,d){var e,f,g,h;h=new U6(b,d);g=0;for(f=T6(h);f.G();){e=Wv(f.H(),7);Umb(a.i,e,Elb(g++))}Umb(c,b,Elb(g))}
function c6(a,b){var c,d,e,f,g;c=0;g=0;for(e=0,f=b.length;e<f;++e){d=b[e];c=i6(a,c,d,(sN(),ZM),a.f);g=i6(a,g,d,rN,a.n)}}
function pJ(a,b){var c,d,e,f;if(!a.n){return}for(d=0,e=b.length;d<e;++d){c=b[d];f=Smb(a.n,c);if(f!=null){c.nc();c.oc()}}}
function L2(a,b){var c,d,e;for(d=new Tob(b);d.a<d.c.c.length;){c=Wv(Rob(d),75);e=X2(a.a);R2(a.a,e,c.k,c.j);aeb(c,e,true)}}
function M2(a,b){var c,d,e;for(d=new Tob(b);d.a<d.c.c.length;){c=Wv(Rob(d),75);e=W2(a.a);R2(a.a,e,c.k,c.j);aeb(c,e,true)}}
function PW(a){var b,c;c=Wv(rJ(a,(eM(),sL)),59);if(c==(sK(),qK)){b=Wv(rJ(a,(Rib(),Rhb)),15).a;return b>=1?pK:nK}return c}
function Cm(a){_b(a.b);if(a.b.G()){return true}while(a.a.G()){_b(a.b=a.Wb(a.a.H()));if(a.b.G()){return true}}return false}
function m7(a){if(a.d!=a.c.d||a.i!=a.g.d){a.a.c=xv(UF,syb,1,0,4,1);xU(a.a,a.c);xU(a.a,a.g);a.d=a.c.d;a.i=a.g.d}return a.a}
function Yf(a){var b;if(a.b){Yf(a.b);if(a.b.d!=a.c){throw new nsb}}else if(a.d.V()){b=Wv(Smb(a.f.b,a.e),19);!!b&&(a.d=b)}}
function H9(a,b,c,d,e){var f,g,h,i;i=Co(a);g9(b,i,d,e,c);f=0;for(h=new Tob(i);h.a<h.c.c.length;){g=Wv(Rob(h),9);a[f++]=g}}
function oP(a){var b,c,d;d=Wv(vW(a.a,(eM(),DL)),15).a;for(c=new Tob(uW(a.a));c.a<c.c.c.length;){b=Wv(Rob(c),626);qP(a,b,d)}}
function WQ(){var a,b;this.a=new HU(6);for(b=0;b<6;b++){vU(this.a,(a=Wv(Hkb(mC),11),new atb(a,Wv(exb(a,a.length),11),0)))}}
function W5(a){var b,c,d;d=false;for(c=0;c<a.d.length;c++){a.j=(b=new N5(a.e,a.d,c,0),new b7(c,a.d,b));d=d|O5(a,c)}return d}
function H8(a,b,c){var d,e;e=a.a.c;for(d=e.c.length;d<c;d++){uU(e,0,new sY(a.a))}rX(b,Wv(yU(e,e.c.length-c),16));a.b[b.k]=c}
function hdb(a,b){var c,d;c=WI(a,0);while(c.b!=c.d.c){d=Ixb(Yv(_ub(c)));if(d==b){return}else if(d>b){avb(c);break}}$ub(c,b)}
function dub(a,b,c){var d;d=Utb(a.a,b);Wtb(a.a,b,c===undefined?null:c);if(d===undefined){++a.c;msb(a.b)}else{++a.d}return d}
function qgb(a,b,c){if((b-a<=0?0-(b-a):b-a)<uAb||(c-a<=0?0-(c-a):c-a)<uAb){return true}return b-a>uAb?a-c>uAb:c-a>uAb}
function Qgb(a){switch(a.e){case 0:return Kgb;case 1:return Lgb;case 2:return Mgb;case 3:return Ngb;default:return Ogb;}}
function uS(a,b){switch(b.e){case 2:return a.b;case 1:return a.c;case 4:return a.d;case 3:return a.a;default:return false;}}
function vN(a){sN();switch(a.e){case 4:return $M;case 1:return ZM;case 3:return pN;case 2:return rN;default:return qN;}}
function c7(a,b){if(b==a.c){return a.d}else if(b==a.d){return a.c}else{throw new slb('Node '+b+' not part of edge '+a)}}
function zO(a,b){var c;if(Zsb(a.a,b)){return Wv(Zsb(a.a,b)?a.b[b.e]:null,62)}else{c=new ZN;Wsb(a.a,b);usb(a,b.e,c);return c}}
function Zeb(a,b){var c,d,e,f;f=a.g.tb();c=0;while(f.G()){d=Ixb(Yv(f.H()));e=d-b;if(e>RAb){return c}else e>SAb&&++c}return c}
function Usb(a){var b,c,d,e;c=(b=Wv(Hkb((d=a.$c,e=d.f,e==IF?d:e)),11),new atb(b,Wv(exb(b,b.length),11),0));Wsb(c,a);return c}
function yR(a,b){var c,d;for(d=new Tob(b);d.a<d.c.c.length;){c=Wv(Rob(d),27);vU(a.b.b,Wv(c.b,25));OR(Wv(c.a,78),Wv(c.b,25))}}
function gpb(a,b,c,d){var e,f,g;for(e=b+1;e<c;++e){for(f=e;f>b&&d.$b(a[f-1],a[f])>0;--f){g=a[f];Av(a,f,a[f-1]);Av(a,f-1,g)}}}
function k3(a){var b,c;if(!MM(Wv(rJ(a,(eM(),TL)),28))){for(c=new Tob(a.f);c.a<c.c.c.length;){b=Wv(Rob(c),7);QX(b,(sN(),qN))}}}
function oX(a,b){switch(b.e){case 1:return pl(a.f,(LX(),GX));case 2:return pl(a.f,(LX(),IX));default:return ypb(),ypb(),vpb;}}
function oW(a,b){if(yJ(b,(eM(),cM))){return rJ(a.e,(Rib(),Jib))}else if(yJ(b,LL)){return rJ(a.e,(Rib(),tib))}return rJ(a.e,b)}
function I5(a,b,c,d){var e,f,g;f=b;e=c-1;while(f<=e){g=(f+e)/2|0;if(a[g]==d){return g}else a[g]<d?(f=g+1):(e=g-1)}return -f-1}
function Ve(a,b,c){var d,e;for(e=a.mb();e.G();){d=e.H();if(gw(b)===gw(d)||b!=null&&rb(b,d)){c&&e.I();return true}}return false}
function epb(a,b,c){var d;xxb(b<=c,'%s > %s',Bv(tv(UF,1),syb,1,4,[Elb(b),Elb(c)]));d=a.length;c=c<d?c:d;Gxb(b,c,d);return c-b}
function aW(a,b){var c,d,e;c=a;e=0;do{if(c==b){return e}d=Wv(rJ(c,(Rib(),zib)),9);if(!d){throw new rlb}c=hX(d);++e}while(true)}
function U5(a){var b,c,d;d=false;for(c=a.d.length-1;c>=0;c--){a.j=(b=new N5(a.e,a.d,c,1),new b7(c,a.d,b));d=d|O5(a,c)}return d}
function k6(a){this.f=(mp(),new ntb);this.n=new ntb;this.k=new ntb;this.g=new vtb;this.i=new Vr((Tq(),Sq));this.j=a;c6(this,a)}
function vsb(a){var b;this.a=(b=Wv(a.e&&a.e(),11),new atb(b,Wv(exb(b,b.length),11),0));this.b=xv(UF,syb,1,this.a.a.length,4,1)}
function jf(a,b){var c;if(b===a){return true}if(!aw(b,18)){return false}c=Wv(b,18);if(c.Y()!=a.Y()){return false}return a.lb(c)}
function Reb(a){Ieb();switch(a.e){case 1:return meb;case 2:return ieb;case 3:return oeb;case 4:return Geb;default:return Feb;}}
function pgb(a,b){switch(b.e){case 1:return a.e.d;case 2:return a.e.c;case 3:return a.e.a;case 4:return a.e.b;default:return 0;}}
function xO(){uO();return Bv(tv(Oz,1),uyb,67,0,[rO,qO,sO,iO,hO,jO,mO,lO,kO,pO,oO,nO,fO,eO,gO,cO,bO,dO,_N,$N,aO,tO])}
function zM(){zM=iI;yM=new AM(szb,0);xM=new AM('JUSTIFIED',1);uM=new AM('BEGIN',2);vM=new AM(qzb,3);wM=new AM('END',4)}
function DN(){DN=iI;BN=new EN('PORTS',0);CN=new EN('PORT_LABELS',1);AN=new EN('NODE_LABELS',2);zN=new EN('MINIMUM_SIZE',3)}
function kP(){kP=iI;jP=new lP('UNKNOWN',0);gP=new lP('ABOVE',1);hP=new lP('BELOW',2);iP=new DJ('de.cau.cs.kieler.labelSide',jP)}
function Qjb(){Qjb=iI;Njb=new Rjb('EQUALLY_DISTRIBUTED',0);Pjb=new Rjb('NORTH_STACKED',1);Ojb=new Rjb('NORTH_SEQUENCE',2)}
function gI(){fI={};!Array.isArray&&(Array.isArray=function(a){return Object.prototype.toString.call(a)==='[object Array]'})}
function SR(a,b){return Ws(),Ws(),((a-b>0?a-b:-(a-b))<=$yb||a==b||isNaN(a)&&isNaN(b)?0:a<b?-1:a>b?1:Ys(isNaN(a),isNaN(b)))>0}
function TR(a,b){return Ws(),Ws(),((a-b>0?a-b:-(a-b))<=$yb||a==b||isNaN(a)&&isNaN(b)?0:a<b?-1:a>b?1:Ys(isNaN(a),isNaN(b)))<0}
function Veb(a){var b,c;a.d||cfb(a);c=new jJ;b=a.b.mb();b.H();while(b.G()){QI(c,Wv(b.H(),92).a)}Bxb(c.b!=0);$I(c,c.c.b);return c}
function $db(a){var b,c,d,e;e=new Wub;b=new IU(a.c);Dpb(b);for(d=new Tob(b);d.a<d.c.c.length;){c=Wv(Rob(d),7);e.a.db(c,e)}return e}
function Np(a,b){var c,d,e;_b(b);for(d=(e=a.g,Wv(!e?(a.g=new En(a)):e,20)).mb();d.G();){c=Wv(d.H(),21);Fd(b,c.zb(),c.yb())}return b}
function mf(a,b){var c,d,e;if(aw(b,21)){c=Wv(b,21);d=c.yb();e=rp(a.qb(),d);return Tb(e,c.zb())&&(e!=null||a.qb().R(d))}return false}
function Yeb(a,b){var c,d,e;e=a.g.tb();while(e.G()){c=Ixb(Yv(e.H()));d=c-b<=0?0-(c-b):c-b;if(d<RAb){return e.L()-1}}return a.g.Y()}
function Vfb(a){var b,c;for(c=new Tob(a.a);c.a<c.c.c.length;){b=Wv(Rob(c),9);if(b.g==(CX(),AX)||b.g==wX){return false}}return true}
function nI(a,b,c){if(a.b){throw new ulb('The task is already done.')}else if(a.i!=null){return false}else{a.i=b;a.j=c;return true}}
function A5(a,b){if(a.f<b.f){return -1}else if(a.f>b.f){return 1}else if(a.g<b.g){return -1}else if(a.g>b.g){return 1}return a.b-b.b}
function S8(a,b){if(b.c==a){return b.d}else if(b.d==a){return b.c}throw new slb('Input edge is not connected to the input port.')}
function q5(a){var b;if(a.c==0){return}b=Wv(yU(a.a,a.b),128);b.b==1?(++a.b,a.b<a.a.c.length&&u5(Wv(yU(a.a,a.b),128))):--b.b;--a.c}
function ZU(a,b){a.b.a=Qlb(a.b.a,b.c);a.b.b=Qlb(a.b.b,b.d);a.a.a=Nlb(a.a.a,b.c);a.a.b=Nlb(a.a.b,b.d);return a.c[a.c.length]=b,true}
function vbb(a,b,c){var d,e;d=Ixb(a.n[b.f.k])+Ixb(a.d[b.f.k])+b.i.b+b.a.b;e=Ixb(a.n[c.f.k])+Ixb(a.d[c.f.k])+c.i.b+c.a.b;return e-d}
function Y5(a,b,c,d){var e,f,g;e=false;if($6(a.j,c,d)){a7(a.j,a.d[b][c],a.d[b][d]);f=a.d[b];g=f[d];f[d]=f[c];f[c]=g;e=true}return e}
function fX(a,b,c){var d,e,f,g,h;h=hX(a);e=h.a;d=Wv(rJ(h,(Rib(),Xhb)),15).a;f=h.d;g=a.i;b&&(g.a=g.a-e.b-d-f.a);c&&(g.b=g.b-e.d-d-f.b)}
function Q$(a,b){var c,d,e;for(d=Uh(gX(a));Cm(d);){c=Wv(Dm(d),12);e=Wv(b.B(c),9);return new $c(_b(e.i.b+e.j.b/2))}return zb(),zb(),yb}
function ifb(a){var b,c,d,e,f;d=gfb(a);b=rAb;f=0;e=0;while(b>0.5&&f<50){e=ofb(d);c=$eb(d,e,true);b=Jlb(c.b);++f}return $eb(a,e,false)}
function jfb(a){var b,c,d,e,f;d=gfb(a);b=rAb;f=0;e=0;while(b>0.5&&f<50){e=nfb(d);c=$eb(d,e,true);b=Jlb(c.a);++f}return $eb(a,e,false)}
function QR(a){var b,c,d;this.a=new Wub;this.e=new vtb;this.f=0;for(c=0,d=a.length;c<d;++c){b=a[c];!this.g&&(this.g=b);OR(this,b)}}
function dfb(a){Teb(this);this.c=a.c;this.f=a.f;this.e=a.e;this.k=a.k;this.d=a.d;this.g=Eo(a.g);this.j=a.j;this.i=a.i;this.b=Eo(a.b)}
function oU(a){switch(a.e){case 1:return sK(),rK;case 4:return sK(),oK;case 2:return sK(),pK;case 3:return sK(),nK;}return sK(),qK}
function Xdb(a,b){if(_db(a,b)){stb(a.g,b);return true}b.g!=(sN(),qN)&&stb(a.i,b);b.e.c.length==0?stb(a.c,b):stb(a.b,b);return false}
function wU(a,b){var c,d;Fxb(0,a.c.length);c=Ye(b,xv(UF,syb,1,b.a.Y(),4,1));d=c.length;if(d==0){return false}gxb(a.c,0,c);return true}
function Zkb(a,b){var c=0;while(!b[c]||b[c]==''){c++}var d=b[c++];for(;c<b.length;c++){if(!b[c]||b[c]==''){continue}d+=a+b[c]}return d}
function yt(){var a;if(ut!=0){a=pt();if(a-vt>2000){vt=a;wt=$wnd.setTimeout(Et,10)}}if(ut++==0){Ht((Gt(),Ft));return true}return false}
function kS(a){var b,c;for(c=new Tob(a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);b.j.d=-b.j.d-b.j.c;!!b.o&&(b.g.a=-b.g.a+b.o.j.c)}fS(a)}
function D2(a,b){var c;c=a;while(b.b<b.d.Y()&&c==a){c=(Bxb(b.b<b.d.Y()),Wv(b.d.sb(b.c=b.b++),7)).g}c==a||(Bxb(b.b>0),b.a.sb(b.c=--b.b))}
function a$(a){var b;if(!LM(Wv(rJ(a,(eM(),TL)),28))){return}b=a.c;b$((Cxb(0,b.c.length),Wv(b.c[0],16)));b$(Wv(yU(b,b.c.length-1),16))}
function NV(a,b,c){nI(c,'Compound graph preprocessor',1);a.a=new xk;RV(a,b,null);MV(a,b);sJ(b,(Rib(),bib),a.a);a.a=null;Ymb(a.b);pI(c)}
function P0(a){var b,c;b=Wv(Dm(Uh(iX(a))),12);c=Wv(Dm(Uh(mX(a))),12);return !Ckb(Ixb(Xv(rJ(b,(Rib(),Iib)))))||!Ckb(Ixb(Xv(rJ(c,Iib))))}
function O6(a,b,c){if(b.g==(CX(),AX)&&c.g==zX){a.d=L6(b,(sN(),pN));a.b=L6(b,$M)}if(c.g==AX&&b.g==zX){a.d=L6(c,(sN(),$M));a.b=L6(c,pN)}}
function _8(a,b,c){var d,e,f,g;f=b.g;g=c.g;if(f!=g){return f.e-g.e}else{d=a.a[b.k];e=a.a[c.k];return !d&&!e?0:!d?-1:!e?1:glb(d.a,e.a)}}
function jab(a,b,c,d){var e,f,g,h;f=b;e=c-1;while(f<=e){g=f+e>>>1;h=a[g];if(h<d){f=g+1}else if(h>d){e=g-1}else{return g}}return -(f+1)}
function Id(a){return aw(a,137)?(ypb(),new dsb(Wv(a,137))):aw(a,18)?(ypb(),new Frb(Wv(a,18))):aw(a,20)?Hpb(Wv(a,20)):(ypb(),new zqb(a))}
function Kd(a,b,c){return aw(c,137)?new Lg(a,b,Wv(c,137)):aw(c,18)?new Kg(a,b,Wv(c,18)):aw(c,20)?Ld(a,b,Wv(c,20),null):new _f(a,b,c,null)}
function tn(b,c){var d;d=b.ub(c);try{return d.H()}catch(a){a=OH(a);if(aw(a,74)){throw new okb("Can't get element "+c)}else throw NH(a)}}
function rp(b,c){mp();_b(b);try{return b.cb(c)}catch(a){a=OH(a);if(aw(a,119)){return null}else if(aw(a,76)){return null}else throw NH(a)}}
function Qu(f,a){var b=f.a;var c;a=String(a);b.hasOwnProperty(a)&&(c=b[a]);var d=(ev(),dv)[typeof c];var e=d?d(c):kv(typeof c);return e}
function kgb(a,b,c,d){if(b<c){a.b=0.5*(b+c);a.p=UAb*a.b+0.9*b;a.a=UAb*a.b+0.9*c}else{a.b=0.5*(b+d);a.p=UAb*a.b+0.9*d;a.a=UAb*a.b+0.9*b}}
function Vr(a){Ch.call(this,a);this.b=new sk(a,false,null,(Gh(),Fh),false,null,Fh);this.a=new Os(null,1);ds(this.a,this.a);this.c=new Vs}
function xT(a){vT();this.c=new GU;this.d=a;switch(a.e){case 0:case 2:this.a=Epb(uT);this.b=Uzb;break;case 3:case 1:this.a=uT;this.b=Vzb;}}
function iK(){iK=iI;cK=new jK('AUTOMATIC',0);fK=new jK(ozb,1);gK=new jK(pzb,2);hK=new jK('TOP',3);dK=new jK('BOTTOM',4);eK=new jK(qzb,5)}
function Pxb(a){Nxb();var b,c,d;c=':'+a;d=Mxb[c];if(!(d===undefined)){return d}d=Kxb[c];b=d===undefined?Oxb(a):d;Qxb();Mxb[c]=b;return b}
function bk(a,b,c,d,e,f,g){hi();var h,i;i=g.length+6;h=new HU(i);zpb(h,Bv(tv(UF,1),syb,1,4,[a,b,c,d,e,f]));zpb(h,g);return Yj(new Tob(h))}
function GZ(a){var b;b=Wv(rJ(a,(eM(),JL)),18);if(b.V()){return}if(b.kb((oM(),gM))){b.nb(gM);b.ib(iM)}else if(b.kb(iM)){b.nb(iM);b.ib(gM)}}
function HZ(a){var b;b=Wv(rJ(a,(eM(),JL)),18);if(b.V()){return}if(b.kb((oM(),nM))){b.nb(nM);b.ib(lM)}else if(b.kb(lM)){b.nb(lM);b.ib(nM)}}
function f$(a,b){var c,d,e,f;e=a.g;c=Ixb(Yv(rJ(a,(Rib(),Cib))));f=b.g;d=Ixb(Yv(rJ(b,Cib)));return f!=(CX(),xX)?-1:e!=xX?1:c==d?0:c<d?-1:1}
function g6(a,b,c){var d,e;d=Slb(h6(a,b.d),h6(a,b.c));e=Plb(h6(a,b.d),h6(a,b.c));return $s(Or(Bh(c,Elb(d),(Gh(),Fh),Elb(e),Fh),(qs(),ps)))}
function qp(b,c){mp();_b(b);try{return b.R(c)}catch(a){a=OH(a);if(aw(a,119)){return false}else if(aw(a,76)){return false}else throw NH(a)}}
function Qh(b,c){Oh();_b(b);try{return hnb(b,c)}catch(a){a=OH(a);if(aw(a,119)){return false}else if(aw(a,76)){return false}else throw NH(a)}}
function nab(a,b){if(a.e<b.e){return -1}else if(a.e>b.e){return 1}else if(a.f<b.f){return -1}else if(a.f>b.f){return 1}return txb(a)-txb(b)}
function QZ(a){switch(a.e){case 1:return sN(),rN;case 4:return sN(),$M;case 3:return sN(),ZM;case 2:return sN(),pN;default:return sN(),qN;}}
function Ki(a){var b,c;b=cxb(a.c,a.c.length);switch(b.length){case 0:return Fi;case 1:c=new Er(b[0]);return c;default:return new gr(Ti(b));}}
function EY(a){var b,c,d,e;d=xv(ow,syb,64,a.c.length,0,1);e=0;for(c=new Tob(a);c.a<c.c.c.length;){b=Wv(Rob(c),64);d[e++]=b}return new CY(d)}
function sW(a){var b,c;if(!a.b){a.b=Do(a.a.b.c.length);for(c=new Tob(a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),33);vU(a.b,new yW(b))}}return a.b}
function K6(a,b){var c,d,e;if(a.e){return 1}c=0;for(e=new Tob(b.f);e.a<e.c.c.length;){d=Wv(Rob(e),7);c+=d.b.c.length+d.e.c.length}return c}
function I6(a){var b,c,d,e;b=false;e=false;for(d=new Tob(a.f);d.a<d.c.c.length;){c=Wv(Rob(d),7);b=b|c.g==(sN(),ZM);e=e|c.g==rN}return b&&e}
function bV(a){var b,c;this.b=new GU;this.c=a;this.a=false;for(c=new Tob(a.b);c.a<c.c.c.length;){b=Wv(Rob(c),9);this.a=this.a|b.g==(CX(),AX)}}
function uX(a){cX.call(this);this.g=(CX(),AX);this.f=(Mh(6,Vyb),new HU(6));this.c=(Mh(2,Vyb),new HU(2));this.e=new ZW;this.b=new ZW;this.a=a}
function ffb(a,b,c,d,e,f){Teb(this);this.e=a;this.f=b;this.d=c;this.c=d;this.g=e;this.b=f;this.j=Ixb(Yv(e.mb().H()));this.i=Ixb(Yv(rl(e)))}
function Lh(a,b){if(a==null){throw new Wlb('null key in entry: null='+b)}else if(b==null){throw new Wlb('null value in entry: '+a+'=null')}}
function Hab(){Hab=iI;Eab=VQ(new WQ,(d0(),v_));Fab=new DJ('linearSegments.inputPrio',Elb(0));Gab=new DJ('linearSegments.outputPrio',Elb(0))}
function Cd(a){var b,c,d,e;for(c=(e=(new aob(a.b)).a.bb().mb(),new fob(e));c.a.G();){b=(d=Wv(c.a.H(),21),Wv(d.zb(),19));b.Q()}Ymb(a.b);a.c=0}
function WI(a,b){var c,d;Fxb(b,a.b);if(b>=a.b>>1){d=a.c;for(c=a.b;c>b;--c){d=d.b}}else{d=a.a.a;for(c=0;c<b;++c){d=d.a}}return new cvb(a,b,d)}
function cU(a,b){var c,d,e;e=new FI;for(d=a.mb();d.G();){c=Wv(d.H(),55);UT(c,e.a,0);e.a+=c.e.a+b;e.b=Nlb(e.b,c.e.b)}e.b>0&&(e.b+=b);return e}
function eU(a,b){var c,d,e;e=new FI;for(d=a.mb();d.G();){c=Wv(d.H(),55);UT(c,0,e.b);e.b+=c.e.b+b;e.a=Nlb(e.a,c.e.a)}e.a>0&&(e.a+=b);return e}
function tub(a,b,c){var d,e,f;e=Wv(Smb(a.c,b),176);if(!e){d=new Jub(a,b,c);Umb(a.c,b,d);Gub(d);return null}else{f=job(e,c);uub(a,e);return f}}
function y3(a,b){if(!Keb(a.b).kb(b.c)){return false}return Oeb(a.b)?!(rgb(b.d,a.c,a.a)&&rgb(b.a,a.c,a.a)):rgb(b.d,a.c,a.a)&&rgb(b.a,a.c,a.a)}
function s6(a,b){return a.c<b.c||a.c==b.c&&d6(a.a)&&d6(b.a)&&h6(a.d,q6(a.a,a.b))>h6(a.d,q6(b.a,b.b))?-1:a.c==b.c&&q6(a.a,a.b)==q6(a.a,a.b)?0:1}
function L5(a,b,c){if(a.e){switch(a.b){case 1:g5(a.c,b,c);break;case 0:h5(a.c,b,c);}}else{e5(a.c,b,c)}a.a[b.k][c.k]=a.c.i;a.a[c.k][b.k]=a.c.e}
function LW(a,b,c){switch(c.e){case 1:a.a=b.a/2;a.b=0;break;case 2:a.a=b.a;a.b=b.b/2;break;case 3:a.a=b.a/2;a.b=b.b;break;case 4:a.a=0;a.b=b.b/2;}}
function Jeb(a){switch(a.e){case 8:return sN(),$M;case 9:return sN(),pN;case 10:return sN(),ZM;case 11:return sN(),rN;default:return sN(),qN;}}
function Qt(a){var b,c,d;b='Ot';d=Slb(a.length,5);for(c=0;c<d;c++){if(emb(a[c].d,b)){a.length>=c+1&&(a.splice(0,c+1),undefined);break}}return a}
function Vv(a,b){if(ew(a)){return !!Uv[b]}else if(a._c){return !!a._c[b]}else if(cw(a)){return !!Tv[b]}else if(bw(a)){return !!Sv[b]}return false}
function jQ(){RP();this.i=(mp(),new ntb);this.a=new ntb;this.k=new ntb;this.j=new ntb;this.b=new ntb;this.n=new ntb;this.f=new ntb;this.e=new ntb}
function r$(a,b){var c,d;if(b.a.R(a)){return}else{d=Wv(rJ(a,(Rib(),hib)),32);c=Wv(yU(a.f,0),7);d==(sN(),$M)?QX(c,pN):d==pN&&QX(c,$M);b.a.db(a,b)}}
function bbb(a){var b,c;c=Plb(1,Wv(rJ(a,(Rib(),Eib)),24).a);a.c.f.g==(CX(),AX)&&a.d.f.g==AX?(b=1):a.c.f.g==AX||a.d.f.g==AX?(b=2):(b=8);return c*b}
function P1(a){var b,c,d,e,f;f=Wv(rJ(a,(Rib(),uib)),7);b=Wv(FU(a.b,xv(dB,gAb,12,a.b.c.length,0,1)),47);for(d=0,e=b.length;d<e;++d){c=b[d];eW(c,f)}}
function Q1(a){var b,c,d,e,f;c=Wv(rJ(a,(Rib(),uib)),7);b=Wv(FU(a.e,xv(dB,gAb,12,a.e.c.length,0,1)),47);for(e=0,f=b.length;e<f;++e){d=b[e];dW(d,c)}}
function Cfb(a){var b,c;yfb(this);c=a.i;b=vI(new HI(c.a,c.b),a.j);this.d=Qlb(c.b,b.b);this.a=Nlb(c.b,b.b);this.b=Qlb(c.a,b.a);this.c=Nlb(c.a,b.a)}
function ipb(a,b,c,d){var e,f,g,h;!d&&(d=(hsb(),hsb(),gsb));e=(f=epb(a,b,c),g=(h=new Array(c-b),Cv(h,a)),dxb(a,b,g,0,f,true),g);jpb(e,a,b,c,-b,d)}
function FU(a,b){var c,d,e;e=a.c.length;b.length<e&&(b=(d=new Array(e),Cv(d,b)));for(c=0;c<e;++c){Av(b,c,a.c[c])}b.length>e&&Av(b,e,null);return b}
function npb(a,b){var c,d,e;e=a.a.length;b.length<e&&(b=(d=new Array(e),Cv(d,b)));for(c=0;c<e;++c){Av(b,c,a.a[c])}b.length>e&&Av(b,e,null);return b}
function xb(a){return ew(a)?a:cw(a)?ilb((Dxb(a),a)):bw(a)?Bkb(Ckb((Dxb(a),a))):_v(a)?a.w():zv(a)?ob(a):a.toString?a.toString():'[JavaScriptObject]'}
function A6(a){var b,c,d,e,f;f=0;for(c=a.b,d=0,e=c.length;d<e;++d){b=c[d];b.g==(CX(),zX)||Umb(a.c,b,Elb(f++));E6(a,b,a.d,(sN(),$M));E6(a,b,a.j,pN)}}
function kbb(){kbb=iI;jbb=new lbb('SIMPLE',0);gbb=new lbb(zAb,1);hbb=new lbb('LINEAR_SEGMENTS',2);fbb=new lbb('BRANDES_KOEPF',3);ibb=new lbb(DAb,4)}
function Xib(){Xib=iI;Wib=new Yib(tzb,0);Sib=new Yib('FIRST',1);Tib=new Yib('FIRST_SEPARATE',2);Uib=new Yib('LAST',3);Vib=new Yib('LAST_SEPARATE',4)}
function Ndb(){Ndb=iI;Mdb=new Vdb;Kdb=TQ(new WQ,(d0(),A_));Ldb=PQ(TQ(new WQ,R_),Q_);Idb=PQ(UQ(TQ(SQ(new WQ,D_),F_),H_),E_);Jdb=PQ(UQ(new WQ,H_),q_)}
function ceb(a){var b,c,d,e;for(c=(e=(new Snb(a.d.a)).a.bb().mb(),new Ynb(e));c.a.G();){b=(d=Wv(c.a.H(),21),Wv(d.yb(),12));vU(b.c.e,b);vU(b.d.b,b)}}
function vvb(a,b){var c,d;vxb(b>0);if((b&-b)==b){return hw(b*wvb(a,31)*4.6566128730773926E-10)}do{c=wvb(a,31);d=c%b}while(c-d+(b-1)<0);return hw(d)}
function zcb(a,b){if(a.c.f==b){return a.d.f}else if(a.d.f==b){return a.c.f}else{throw new slb('Node '+b+' is neither source nor target of edge '+a)}}
function Ekb(a,b,c){vxb(a>=0&&a<=1114111);if(a>=ayb){b[c++]=55296+(a-ayb>>10&1023)&byb;b[c]=56320+(a-ayb&1023)&byb;return 2}else{b[c]=a&byb;return 1}}
function Ol(a,b){Il();var c,d;while(a.G()){if(!b.G()){return false}c=a.H();d=b.H();if(!(gw(c)===gw(d)||c!=null&&rb(c,d))){return false}}return !b.G()}
function JS(a){var b,c,d;Vvb(a.b.a);a.a=xv(kA,syb,25,a.c.b.a.b.c.length,0,1);b=0;for(d=new Tob(a.c.b.a.b);d.a<d.c.c.length;){c=Wv(Rob(d),25);c.k=b++}}
function PT(a){var b,c,d,e;Gpb(a.c,a.a);for(e=new Tob(a.c);e.a<e.c.c.length;){d=Rob(e);for(c=new Tob(a.b);c.a<c.c.c.length;){b=Wv(Rob(c),160);b.Ec(d)}}}
function zW(a){var b,c;if(!a.a){a.a=Do(Wv(a.e,9).c.c.length);for(c=new Tob(Wv(a.e,9).c);c.a<c.c.c.length;){b=Wv(Rob(c),33);vU(a.a,new yW(b))}}return a.a}
function DW(a){var b,c;if(!a.b){a.b=Do(Wv(a.e,7).c.c.length);for(c=new Tob(Wv(a.e,7).c);c.a<c.c.c.length;){b=Wv(Rob(c),33);vU(a.b,new yW(b))}}return a.b}
function F6(a){this.b=a;this.c=(mp(),new ntb);this.i=new ntb;this.d=new ntb;this.j=new ntb;this.k=gw(rJ(hX(a[0]),(eM(),uL)))===gw((NK(),JK));A6(this)}
function sgb(a){switch(a.e){case 1:return 4.71238898038469;default:case 2:return 0;case 3:return 1.5707963267948966;case 4:return 3.141592653589793;}}
function Ql(a){Il();var b;b=Kl(a);if(!Cm(a)){throw new okb('position (0) must be less than the number of elements that remained ('+b+')')}return Dm(a)}
function un(b,c){var d,e;d=b.ub(c);try{e=d.H();d.I();return e}catch(a){a=OH(a);if(aw(a,74)){throw new okb("Can't remove element "+c)}else throw NH(a)}}
function Ye(a,b){var c,d,e,f;f=a.Y();b.length<f&&(b=(e=new Array(f),Cv(e,b)));d=a.mb();for(c=0;c<f;++c){Av(b,c,d.H())}b.length>f&&Av(b,f,null);return b}
function qX(a,b,c){if(!!c&&(b<0||b>c.a.c.length)){throw new slb('index must be >= 0 and <= layer node count')}!!a.d&&BU(a.d.a,a);a.d=c;!!c&&uU(c.a,b,a)}
function Zvb(a,b,c,d,e,f,g,h){var i,j;if(!d){return}i=d.a[0];!!i&&Zvb(a,b,c,i,e,f,g,h);$vb(a,c,d.d,e,f,g,h)&&b.ib(d);j=d.a[1];!!j&&Zvb(a,b,c,j,e,f,g,h)}
function Gxb(a,b,c){if(a<0){throw new okb(jyb+a+' < 0')}if(b>c){throw new okb('toIndex: '+b+' > size '+c)}if(a>b){throw new slb(jyb+a+' > toIndex: '+b)}}
function ee(a,b){var c,d,e;c=b.yb();e=b.zb();d=a.cb(c);if(!(gw(e)===gw(d)||e!=null&&rb(e,d))){return false}if(d==null&&!a.R(c)){return false}return true}
function h1(a,b,c){var d;d=b.c.f;if(d.g==(CX(),zX)){sJ(a,(Rib(),qib),Wv(rJ(d,qib),7));sJ(a,rib,Wv(rJ(d,rib),7))}else{sJ(a,(Rib(),qib),b.c);sJ(a,rib,c.d)}}
function w2(a,b,c){var d;d=b.c.f;if(d.g==(CX(),zX)){sJ(a,(Rib(),qib),Wv(rJ(d,qib),7));sJ(a,rib,Wv(rJ(d,rib),7))}else{sJ(a,(Rib(),qib),b.c);sJ(a,rib,c.d)}}
function at(a,b,c){var d,e,f,g,h;bt(a);for(e=(a.i==null&&(a.i=xv(_F,Txb,46,0,0,1)),a.i),f=0,g=e.length;f<g;++f){d=e[f];at(d,b,'\t'+c)}h=a.e;!!h&&at(h,b,c)}
function yv(a,b){var c=new Array(b);var d;switch(a){case 11:case 12:d=0;break;case 13:d=false;break;default:return c;}for(var e=0;e<b;++e){c[e]=d}return c}
function P5(a){var b,c,d,e;e=xv(qB,Txb,51,a.a.length,0,2);for(c=0;c<e.length;c++){d=a.a[c].length;b=xv(qB,Nzb,9,d,0,1);Gmb(a.a[c],0,b,0,d);e[c]=b}return e}
function AW(a){var b,c;if(!a.b){a.b=Do(Wv(a.e,9).f.c.length);for(c=new Tob(Wv(a.e,9).f);c.a<c.c.c.length;){b=Wv(Rob(c),7);vU(a.b,new FW(b,a.c))}}return a.b}
function sp(b,c){mp();_b(b);try{return ew(c)?Xmb(b,c):Mtb(b.d,c)}catch(a){a=OH(a);if(aw(a,119)){return null}else if(aw(a,76)){return null}else throw NH(a)}}
function Blb(a){var b;b=(Ilb(),Hlb);return b[a>>>28]|b[a>>24&15]<<4|b[a>>20&15]<<8|b[a>>16&15]<<12|b[a>>12&15]<<16|b[a>>8&15]<<20|b[a>>4&15]<<24|b[a&15]<<28}
function ZV(a,b,c){var d,e;if(b.c==(djb(),bjb)&&c.c==ajb){return -1}else if(b.c==ajb&&c.c==bjb){return 1}d=aW(b.a,a.a);e=aW(c.a,a.a);return b.c==bjb?e-d:d-e}
function L7(a){var b,c,d,e,f;e=$xb;f=null;for(d=new Tob(a.d);d.a<d.c.c.length;){c=Wv(Rob(d),89);if(c.c.j^c.d.j){b=c.d.e-c.c.e-c.a;if(b<e){e=b;f=c}}}return f}
function $vb(a,b,c,d,e,f,g){var h,i;if(b.Xc()&&(i=a.a.$b(c,d),i<0||!e&&i==0)){return false}if(b.Yc()&&(h=a.a.$b(c,f),h>0||!g&&h==0)){return false}return true}
function Yj(a){hi();var b,c;if(!a.G()){return kr(),jr}c=a.H();if(!a.G()){return new Gr(c)}b=new Wub;stb(b,_b(c));do{stb(b,_b(a.H()))}while(a.G());return ck(b)}
function m6(a,b,c){a.e=b;a.a=c;a.d=n6(a,(sN(),ZM));a.d+=n6(a,rN);j6(a,b,c,ZM,a.f);j6(a,b,c,rN,a.n);a.b=n6(a,ZM);a.b+=n6(a,rN);j6(a,c,b,ZM,a.f);j6(a,c,b,rN,a.n)}
function hmb(a){var b,c,d;c=(bmb(),a.length);d=0;while(d<c&&a.charCodeAt(d)<=32){++d}b=c;while(b>d&&a.charCodeAt(b-1)<=32){--b}return d>0||b<c?a.substr(d,b-d):a}
function dxb(a,b,c,d,e,f){var g,h,i;if(gw(a)===gw(c)){a=a.slice(b,b+e);b=0}for(h=b,i=b+e;h<i;){g=h+10000<i?h+10000:i;e=g-h;bxb(c,d,f?e:0,a.slice(h,g));h=g;d+=e}}
function Nv(a){var b,c,d;if(Iv(a,(Rv(),Qv))<0){return -Fv((b=~a.l+1&azb,c=~a.m+(b==0?1:0)&azb,d=~a.h+(b==0&&c==0?1:0)&bzb,Ev(b,c,d)))}return a.l+a.m*czb+a.h*dzb}
function JW(a,b){var c;c=a.f;switch(b.e){case 1:return -(a.i.b+a.j.b);case 2:return a.i.a-c.j.a;case 3:return a.i.b-c.j.b;case 4:return -(a.i.a+a.j.a);}return 0}
function KM(){KM=iI;JM=new NM(szb,0);IM=new NM('FREE',1);HM=new NM('FIXED_SIDE',2);EM=new NM('FIXED_ORDER',3);GM=new NM('FIXED_RATIO',4);FM=new NM('FIXED_POS',5)}
function ZT(a,b){var c,d,e,f;c=Wv(rJ(b,(Rib(),fib)),18);f=Wv(Dd(WT,c),18);for(e=f.mb();e.G();){d=Wv(e.H(),18);if(!Wv(Dd(a.a,d),20).V()){return false}}return true}
function HY(a,b,c){this.b=new Dh;this.i=new GU;this.d=new JY(this);this.g=a;this.a=b.c.length;this.c=b;this.e=Wv(yU(this.c,this.c.c.length-1),9);this.f=c;FY(this)}
function Pgb(){Pgb=iI;Lgb=new Rgb('ALWAYS_UP',0);Kgb=new Rgb('ALWAYS_DOWN',1);Ngb=new Rgb('DIRECTION_UP',2);Mgb=new Rgb('DIRECTION_DOWN',3);Ogb=new Rgb('SMART',4)}
function Iv(a,b){var c,d,e,f,g,h,i,j;i=a.h>>19;j=b.h>>19;if(i!=j){return j-i}e=a.h;h=b.h;if(e!=h){return e-h}d=a.m;g=b.m;if(d!=g){return d-g}c=a.l;f=b.l;return c-f}
function K7(a){var b,c,d,e;for(c=(e=(new Snb(a.p.a)).a.bb().mb(),new Ynb(e));c.a.G();){b=(d=Wv(c.a.H(),21),Wv(d.yb(),89));if(b.e&&a.b[b.b]<0){return b}}return null}
function TN(a,b){var c,d,e,f,g;d=Qlb(a.d,b.d);f=Qlb(a.e,b.e);e=Nlb(a.d+a.c,b.d+b.c);g=Nlb(a.e+a.b,b.e+b.b);if(e<d){c=d;d=e;e=c}if(g<f){c=f;f=g;g=c}SN(a,d,f,e-d,g-f)}
function hQ(a,b){var c;if(Gzb in a.a){c=Pu(a,Gzb);if(!c.kc()){throw new GQ("The 'properties' property of a graph element must be an object.",c,a)}iQ(c.kc(),b,true)}}
function HS(a,b){var c,d,e;d=a.b.j.e;a.a||(d+=a.b.j.b);e=b.b.j.e;b.a||(e+=b.b.j.b);c=glb(d,e);if(c==0){if(!a.a&&b.a){return -1}else if(!b.a&&a.a){return 1}}return c}
function kX(a){var b,c;switch(Wv(rJ(hX(a),(Mjb(),ujb)),174).e){case 0:b=a.i;c=a.j;return new HI(b.a+c.a/2,b.b+c.b/2);case 1:return new II(a.i);default:return null;}}
function RX(){LX();cX.call(this);this.g=(sN(),qN);this.a=new FI;this.d=new ZW;this.c=(Mh(2,Vyb),new HU(2));this.b=(Mh(4,Vyb),new HU(4));this.e=(Mh(4,Vyb),new HU(4))}
function G6(a,b,c){a.d=0;a.b=0;P6(a,b,c);b.g==(CX(),BX)&&c.g==zX?M6(b).g==(sN(),$M)?(a.d=1):(a.b=1):c.g==BX&&b.g==zX&&(M6(c).g==(sN(),$M)?(a.b=1):(a.d=1));O6(a,b,c)}
function h9(a,b){var c,d;for(d=new Tob(b);d.a<d.c.c.length;){c=Wv(Rob(d),9);a.a[c.d.k][c.k].a=uvb(a.e);a.a[c.d.k][c.k].d=Ixb(a.a[c.d.k][c.k].a);a.a[c.d.k][c.k].b=1}}
function d9(a,b,c){var d,e,f;for(f=new Tob(b);f.a<f.c.c.length;){d=Wv(Rob(f),9);a.a[d.d.k][d.k].e=false}for(e=new Tob(b);e.a<e.c.c.length;){d=Wv(Rob(e),9);c9(a,d,c)}}
function Ydb(a,b){var c,d,e,f;c=0;d=0;for(f=new Tob(b.b);f.a<f.c.c.length;){e=Wv(Rob(f),33);c=Nlb(c,e.j.a);d+=e.j.b}sJ(b,(Rib(),Lib),new HI(c,d));a.k<c&&(a.k=c);a.j+=d}
function Vbb(a,b){this.c=(mp(),new ntb);this.a=a;this.b=b;this.d=Wv(rJ(a,(Rib(),Kib)),134);gw(rJ(a,(Mjb(),hjb)))===gw((lcb(),kcb))?(this.e=new Jcb):(this.e=new Ccb)}
function Z4(a,b){var c,d,e,f;e=0;for(d=0;d<b.length;d++){c=b[d];if(d<b.length-1){f=b[d+1];e+=$4(a,c,f)}e+=(a.d=new F6(c),x6(a.d));e+=(a.a=new k6(c),a6(a.a))}return e}
function S6(a){switch(a.c.e){case 1:return LX(),HX;case 2:return LX(),FX;case 3:return LX(),JX;case 4:return LX(),KX;}throw new Imb("Can't filter on undefined side")}
function Pr(b,c){var d;try{d=b.c.a;if(!ok(b.b,c)||!d){return 0}return Es(d,b.d,c)}catch(a){a=OH(a);if(aw(a,119)){return 0}else if(aw(a,76)){return 0}else throw NH(a)}}
function J4(a){var b,c,d,e,f;for(d=new rnb((new inb(a.b)).a);d.b;){c=pnb(d);b=Wv(c.yb(),9);f=Wv(Wv(c.zb(),27).a,9);e=Wv(Wv(c.zb(),27).b,10);vI(BI(b.i),vI(xI(f.i),e))}}
function B9(a,b,c){var d,e,f;d=glb(a.a[b.k],a.a[c.k]);if(d==0){e=Wv(rJ(b,(Rib(),oib)),20);f=Wv(rJ(c,oib),20);if(e.kb(c)){return -1}else if(f.kb(b)){return 1}}return d}
function ogb(a,b){var c,d;d=vI(xI(a.i),a.a);c=a.f.j;switch(b.e){case 1:return -d.b;case 2:return -d.a+c.a;case 3:return -d.b+c.b;case 4:return -d.a;default:return 0;}}
function Z8(a,b){var c,d,e,f;for(e=0;e<b.length;e++){e+1<b.length&&X8(a,b[e+1],(djb(),ajb));f=b[e];c=0;for(d=0;d<f.length;d++){Y8(a,f[d]);c+=a.Hc(f[d],c,(djb(),bjb))}}}
function Mfb(){Mfb=iI;Lfb=UQ(UQ(RQ(new WQ,(d0(),__)),$_),a0);Hfb=PQ(UQ(TQ(SQ(new WQ,D_),F_),H_),E_);Jfb=TQ(new WQ,A_);Kfb=PQ(TQ(new WQ,R_),Q_);Ifb=PQ(UQ(new WQ,H_),q_)}
function dI(b,c,d,e){cI();var f=aI;$moduleName=c;$moduleBase=d;LH=e;function g(){for(var a=0;a<f.length;a++){f[a]()}}
if(b){try{Rxb(g)()}catch(a){b(c,a)}}else{Rxb(g)()}}
function clb(a){blb==null&&(blb=/^\s*[+-]?(NaN|Infinity|((\d+\.?\d*)|(\.\d+))([eE][+-]?\d+)?[dDfF]?)\s*$/);if(!elb(blb,a)){throw new Ylb(dyb+a+'"')}return parseFloat(a)}
function _gb(){_gb=iI;Ygb=new ahb(tzb,0);Xgb=new ahb('LEFTUP',1);$gb=new ahb('RIGHTUP',2);Wgb=new ahb('LEFTDOWN',3);Zgb=new ahb('RIGHTDOWN',4);Vgb=new ahb('BALANCED',5)}
function zgb(){zgb=iI;ygb=new Agb('V_TOP',0);xgb=new Agb('V_CENTER',1);wgb=new Agb('V_BOTTOM',2);ugb=new Agb('H_LEFT',3);tgb=new Agb('H_CENTER',4);vgb=new Agb('H_RIGHT',5)}
function YK(){YK=iI;WK=new ZK(tzb,0);UK=new ZK('DIRECTED',1);XK=new ZK('UNDIRECTED',2);SK=new ZK('ASSOCIATION',3);VK=new ZK('GENERALIZATION',4);TK=new ZK('DEPENDENCY',5)}
function CX(){CX=iI;AX=new DX('NORMAL',0);zX=new DX('LONG_EDGE',1);xX=new DX('EXTERNAL_PORT',2);BX=new DX('NORTH_SOUTH_PORT',3);yX=new DX('LABEL',4);wX=new DX('BIG_NODE',5)}
function wv(a,b,c,d,e,f,g){var h,i,j,k,l;k=e[f];j=f==g-1;h=j?d:0;l=yv(h,k);d!=9&&Bv(tv(a,g-f),b[f],c[f],h,l);if(!j){++f;for(i=0;i<k;++i){l[i]=wv(a,b,c,d,e,f,g)}}return l}
function gX(a){var b,c,d;b=new GU;for(d=new Tob(a.f);d.a<d.c.c.length;){c=Wv(Rob(d),7);vU(b,Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[c.b,c.e]))))))}return _b(b),new Vh(b)}
function b7(a,b,c){this.a=c;if(a>=b.length){throw new okb('Greedy SwitchDecider: Free layer layer not in graph.')}this.b=b[a];this.c=new r6(this.b);this.d=new R6(this.b)}
function _n(a,b){var c;this.f=a;this.b=this.f.c;c=a.d;bc(b,c);if(b>=(c/2|0)){this.e=a.e;this.d=c;while(b++<c){Zn(this)}}else{this.c=a.a;while(b-->0){Yn(this)}}this.a=null}
function qS(a){var b,c,d;for(c=new Tob(a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);d=b.j.d;b.j.d=b.j.e;b.j.e=d;d=b.j.c;b.j.c=b.j.b;b.j.b=d;d=b.g.a;b.g.a=b.g.b;b.g.b=d}fS(a)}
function f1(a,b){var c,d,e;d=new Fnb(a.b,0);while(d.b<d.d.Y()){c=(Bxb(d.b<d.d.Y()),Wv(d.d.sb(d.c=d.b++),33));e=Wv(rJ(c,(eM(),tL)),107);if(e==(EK(),BK)){vnb(d);vU(b.b,c)}}}
function Vab(a,b,c){var d,e,f,g;g=zU(a.f,b,0);f=new Wab;f.b=c;d=new Fnb(a.f,g);while(d.b<d.d.Y()){e=(Bxb(d.b<d.d.Y()),Wv(d.d.sb(d.c=d.b++),9));e.k=c;vU(f.f,e);vnb(d)}return f}
function Eq(a,b){Dq();var c,d,e;if(b.V()){return false}if(aw(b,207)){e=Wv(b,207);for(d=e.bb().mb();d.G();){c=Wv(d.H(),83);a.Bb(c.Zb(),c.Yb())}}else{Jl(a,b.mb())}return true}
function MN(){MN=iI;KN=new NN('DEFAULT_MINIMUM_SIZE',0);LN=new NN('MINIMUM_SIZE_ACCOUNTS_FOR_INSETS',1);JN=new NN('COMPUTE_INSETS',2);IN=new NN('APPLY_ADDITIONAL_INSETS',3)}
function MP(a){var b,c,d,e;c=a.a.b+2;e=xv(qz,Fzb,10,c,0,1);e[0]=xI(MX(a.c));d=WI(a.a,0);while(d.b!=d.d.c){b=Wv(_ub(d),10);e[d.a]=new HI(b.a,b.b)}e[c-1]=xI(MX(a.d));return e}
function ge(a,b,c){var d,e,f;for(e=a.bb().mb();e.G();){d=Wv(e.H(),21);f=d.yb();if(gw(b)===gw(f)||b!=null&&rb(b,f)){if(c){d=new qob(d.yb(),d.zb());e.I()}return d}}return null}
function f9(a,b,c){var d,e;d=a.a[b.d.k][b.k];e=a.a[c.d.k][c.k];if(d.a!=null&&e.a!=null){return flb(d.a,e.a)}else if(d.a!=null){return -1}else if(e.a!=null){return 1}return 0}
function beb(a,b,c){var d,e,f;e=b.c;f=b.d;d=c;if(stb(a.a,b)){Xdb(a,e)&&(d=true);Xdb(a,f)&&(d=true);if(d){BU(b.c.e,b);BU(b.d.b,b);stb(a.d,b)}Ydb(a,b);return true}return false}
function $eb(a,b,c){var d,e;e=Zeb(a,b);if(e==a.c){return Web(a,Yeb(a,b))}if(c){_eb(a,b,a.c-e);return Web(a,Yeb(a,b))}else{d=new dfb(a);_eb(d,b,a.c-e);return Web(d,Yeb(d,b))}}
function $tb(){function b(){try{return (new Map).entries().next().done}catch(a){return false}}
if(typeof Map===Zxb&&Map.prototype.entries&&b()){return Map}else{return _tb()}}
function Dd(a,b){var c;c=Wv(Smb(a.b,b),19);!c&&(c=a.Z());return aw(c,137)?new Lg(a,b,Wv(c,137)):aw(c,18)?new Kg(a,b,Wv(c,18)):aw(c,20)?Ld(a,b,Wv(c,20),null):new _f(a,b,c,null)}
function Gs(a){switch(Rs(a.e)-Rs(a.g)){case -2:Cs(a.g)>0&&(a.g=Ls(a.g));return Ks(a);case 2:Cs(a.e)<0&&(a.e=Ks(a.e));return Ls(a);default:a.d=1+Plb(Rs(a.e),Rs(a.g));return a;}}
function k5(a,b){this.f=(mp(),new ntb);this.b=new ntb;this.j=new ntb;this.a=a;this.c=b;this.c>0&&j5(this,this.c-1,(sN(),ZM));this.c<this.a.length-1&&j5(this,this.c+1,(sN(),rN))}
function jt(a){var b;if(a.c==null){b=gw(a.b)===gw(ht)?null:a.b;a.d=b==null?Wxb:dw(b)?mt(Zv(b)):ew(b)?'String':Ikb(tb(b));a.a=a.a+': '+(dw(b)?lt(Zv(b)):b+'');a.c='('+a.d+') '+a.a}}
function IY(a){var b,c,d,e;for(c=new Tob(a.a.c);c.a<c.c.c.length;){b=Wv(Rob(c),9);for(e=WI(Eo(b.c),0);e.b!=e.d.c;){d=Wv(_ub(e),33);rJ(d,(Rib(),uib))==null&&BU(b.c,d)}}return null}
function e3(a,b){var c,d,e,f,g;g=new GU;for(d=Wv(qsb(a3,a),20).mb();d.G();){c=Wv(d.H(),75);xU(g,c.b)}Dpb(g);K2(g,a.a);for(f=new Tob(g);f.a<f.c.c.length;){e=Wv(Rob(f),7);Anb(b,e)}}
function P7(a){var b,c,d,e;while(a.o.a.c.length!=0){c=Wv(Svb(a.o),27);d=Wv(c.a,61);b=Wv(c.b,89);e=c7(b,d);if(b.d==d){o7(e.g,b);d.e=e.e+b.a}else{o7(e.c,b);d.e=e.e-b.a}vU(a.e.a,d)}}
function Tr(a,b,c){var d,e,f;Mh(c,'count');if(!ok(a.b,b)){Xb(c==0);return 0}f=a.c.a;if(!f){c>0&&Lr(a,b,c);return 0}e=xv(mw,Yyb,26,1,12,1);d=Ns(f,a.d,b,c,e);Us(a.c,f,d);return e[0]}
function l$(a,b){var c,d,e,f,g;e=Wv(rJ(b,(Rib(),Jib)),15).a*Wv(rJ(b,(Mjb(),qjb)),15).a;g=a[0].i.a+a[0].j.a;for(f=1;f<a.length;f++){c=a[f].i;d=a[f].j;c.a<=g+e&&(c.a=g+e);g=c.a+d.a}}
function tvb(){tvb=iI;var a,b,c,d;qvb=xv(kw,hyb,26,25,12,1);rvb=xv(kw,hyb,26,33,12,1);d=1.52587890625E-5;for(b=32;b>=0;b--){rvb[b]=d;d*=0.5}c=1;for(a=24;a>=0;a--){qvb[a]=c;c*=0.5}}
function f5(a){while(a.g.c!=0&&a.d.c!=0){if(o5(a.g).c>o5(a.d).c){a.i+=a.g.c;q5(a.d)}else if(o5(a.d).c>o5(a.g).c){a.e+=a.d.c;q5(a.g)}else{a.i+=n5(a.g);a.e+=n5(a.d);q5(a.g);q5(a.d)}}}
function TP(a){if(!a){throw new EQ('An element is null. The origin of an edge could not be determined, this might be due to an inconsistency within the internal element mappings.')}}
function UP(a,b){var c,d;Ymb(a.i);Ymb(a.a);Ymb(a.k);Ymb(a.j);Ymb(a.b);Ymb(a.n);Ymb(a.f);Ymb(a.e);if(a.d){d=Pu(a.d,OP.b);!!d&&!!d.ic()&&(a.c=d.ic().a)}c=fQ(a,b,null);bQ(a,b);return c}
function kfb(a){var b,c,d,e,f,g;d=hfb(gfb(a));b=rAb;f=0;e=0;while(b>0.5&&f<50){e=ofb(d);c=$eb(d,e,true);b=Jlb(c.b);++f}g=Yv(tn(Eo(a.g),Eo(a.g).b-1));return $eb(a,(Dxb(g),g)-e,false)}
function lfb(a){var b,c,d,e,f,g;d=hfb(gfb(a));b=rAb;f=0;e=0;while(b>0.5&&f<50){e=nfb(d);c=$eb(d,e,true);b=Jlb(c.a);++f}g=Yv(tn(Eo(a.g),Eo(a.g).b-1));return $eb(a,(Dxb(g),g)-e,false)}
function Ze(a){var b,c,d,e;e=new Bmb('[');b=false;for(d=a.mb();d.G();){c=d.H();b?(e.a+=', ',e):(b=true);ymb(e,c===a?'(this Collection)':(bmb(),c==null?Wxb:xb(c)))}e.a+=']';return e.a}
function ie(a){var b,c,d,e;e=new Bmb('{');b=false;for(d=a.bb().mb();d.G();){c=Wv(d.H(),21);b?(e.a+=', ',e):(b=true);ymb(e,je(a,c.yb()));e.a+='=';ymb(e,je(a,c.zb()))}e.a+='}';return e.a}
function Ks(a){var b;dc(!!a.g);b=a.g;a.g=b.e;b.e=a;b.j=a.j;b.a=a.a;a.a=1+Zr(a.e)+Zr(a.g);a.j=PH(PH(a.c,Ts(a.e)),Ts(a.g));a.d=1+Plb(Rs(a.e),Rs(a.g));b.d=1+Plb(Rs(b.e),Rs(b.g));return b}
function Ls(a){var b;dc(!!a.e);b=a.e;a.e=b.g;b.g=a;b.j=a.j;b.a=a.a;a.a=1+Zr(a.e)+Zr(a.g);a.j=PH(PH(a.c,Ts(a.e)),Ts(a.g));a.d=1+Plb(Rs(a.e),Rs(a.g));b.d=1+Plb(Rs(b.e),Rs(b.g));return b}
function ZO(a){var b;if(!Qob(new Tob(AW(a.e)))){return}b=Wv(oW(a.e,(eM(),TL)),28);b==(KM(),FM)?SO(a.e):b==GM?TO(a.e):Ckb(Ixb(Xv(oW(a.e,AL))))||a.e.e.j.a==0&&a.e.e.j.b==0?UO(a.e):WO(a)}
function s3(a,b,c){var d,e,f;e=new Tob(a);if(e.a<e.c.c.length){f=Wv(Rob(e),33);d=r3(f,b,c);while(e.a<e.c.c.length){f=Wv(Rob(e),33);Afb(d,r3(f,b,c))}return new Dfb(d)}else{return null}}
function u2(a,b){var c,d,e,f,g,h;e=0;for(d=new Tob(b.c);d.a<d.c.c.length;){c=Wv(Rob(d),16);for(g=new Tob(c.a);g.a<g.c.c.length;){f=Wv(Rob(g),9);h=f.j.a+f.e.c+f.e.b+a.b;e=e>h?e:h}}return e}
function sT(a,b){oT();var c;if(a.c==b.c){if(a.b==b.b||gT(a.b,b.b)){c=dT(a.b)?1:-1;if(a.a&&!b.a){return c}else if(!a.a&&b.a){return -c}}return xlb(a.b.e,b.b.e)}else{return glb(a.c,b.c)}}
function nU(a){var b,c;c=xI(MI(Bv(tv(qz,1),Fzb,10,0,[a.f.i,a.i,a.a])));b=a.f.e;switch(a.g.e){case 1:c.b-=b.d;break;case 2:c.a+=b.c;break;case 3:c.b+=b.a;break;case 4:c.a-=b.b;}return c}
function z6(a,b){var c;c=0;if(b.g==(CX(),BX)){if(C6(b).f!=a.a){D6(a,C6(b).f);a.e=true}a.e?++a.g:(c+=a.f)}else if(b.g==zX){a.e?(c+=a.g):++a.f}else if(b.g==AX){D6(a,b);a.e=false}return c}
function HV(a,b,c,d,e){var f,g,h,i;i=null;for(h=new Tob(d);h.a<h.c.c.length;){g=Wv(Rob(h),187);if(g!=c&&zU(g.e,e,0)!=-1){i=g;break}}f=IV(e);dW(f,c.b);eW(f,i.b);Fd(a.a,e,new XV(f,b,c.f))}
function FZ(a){switch(Wv(rJ(a,(Mjb(),vjb)),85).e){case 1:sJ(a,vjb,(Xib(),Uib));break;case 2:sJ(a,vjb,(Xib(),Vib));break;case 3:sJ(a,vjb,(Xib(),Sib));break;case 4:sJ(a,vjb,(Xib(),Tib));}}
function iQ(a,b,c){var d,e,f,g;if(a){for(e=(f=Nu(a,xv($F,Txb,2,0,5,1)),new wnb(new opb((new _u(a,f)).b)));e.b<e.d.Y();){d=(Bxb(e.b<e.d.Y()),$v(e.d.sb(e.c=e.b++)));g=Pu(a,d);wQ(b,d,g,c)}}}
function G5(a,b,c){var d,e,f,g,h,i;e=1;while(e<a){e*=2}i=2*e-1;e-=1;h=xv(mw,Yyb,26,i,12,1);d=0;for(g=0;g<b;g++){f=c[g]+e;++h[f];while(f>0){f%2>0&&(d+=h[f+1]);f=(f-1)/2|0;++h[f]}}return d}
function aeb(a,b,c){var d,e,f,g;a.e=b;if(c){for(e=(g=(new Snb(a.a.a)).a.bb().mb(),new Ynb(g));e.a.G();){d=(f=Wv(e.a.H(),21),Wv(f.yb(),12));sJ(d,(Rib(),Mib),a.e);QX(d.c,b.a);QX(d.d,b.b)}}}
function g4(){g4=iI;e4=new h4(tzb,0);b4=new h4(ozb,1);f4=new h4(pzb,2);d4=new h4('LEFT_RIGHT_CONSTRAINT_LOCKING',3);c4=new h4('LEFT_RIGHT_CONNECTION_LOCKING',4);a4=new h4('EDGE_LENGTH',5)}
function N5(a,b,c,d){var e;this.b=d;this.e=a.a;e=b[c];this.d=vv(KH,[Txb,xAb],[227,26],13,[e.length,e.length],2);this.a=vv(mw,[Txb,Yyb],[52,26],12,[e.length,e.length],2);this.c=new k5(b,c)}
function fwb(a,b,c,d){var e,f;f=b;e=f.d==null||a.a.$b(c.d,f.d)>0?1:0;while(f.a[e]!=c){f=f.a[e];e=a.a.$b(c.d,f.d)>0?1:0}f.a[e]=d;d.b=c.b;d.a[0]=c.a[0];d.a[1]=c.a[1];c.a[0]=null;c.a[1]=null}
function ZQ(a,b,c){var d,e,f,g;nI(c,Tzb,1);NQ(a.d,b);g=sV(a.a,b);if(g.Y()==1){_Q(Wv(g.sb(0),55),c)}else{f=1/g.Y();for(e=g.mb();e.G();){d=Wv(e.H(),55);_Q(d,rI(c,f))}}qV(a.a,g,b);bR(b);pI(c)}
function o6(a,b,c){var d,e,f,g,h;h=new U6(b,c);for(g=T6(h);g.G();){f=Wv(g.H(),7);for(e=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[f.b,f.e]))))));Cm(e);){d=Wv(Dm(e),12);bW(d)||l6(a,b,f,d)}}}
function _6(a,b){var c,d,e;e=nX(a,b);for(d=e.mb();d.G();){c=Wv(d.H(),7);if(rJ(c,(Rib(),Bib))!=null||Cm(Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[c.b,c.e])))))))){return true}}return false}
function Efb(a){var b,c;if(sl(a)){throw new slb(TAb)}for(c=WI(a,0);c.b!=c.d.c;){b=Wv(_ub(c),10);this.d=Qlb(this.d,b.b);this.c=Nlb(this.c,b.a);this.a=Nlb(this.a,b.b);this.b=Qlb(this.b,b.a)}}
function wI(a,b,c){if(b<0||c<0){throw new slb('The highx must be bigger then lowx and the highy must be bigger then lowy')}a.a<0?(a.a=0):a.a>b&&(a.a=b);a.b<0?(a.b=0):a.b>c&&(a.b=c);return a}
function nX(a,b){switch(b.e){case 1:return pl(a.f,(LX(),HX));case 2:return pl(a.f,(LX(),FX));case 3:return pl(a.f,(LX(),JX));case 4:return pl(a.f,(LX(),KX));default:return ypb(),ypb(),vpb;}}
function K0(a){var b,c,d,e;for(e=(Il(),new Im(Dl(ul(a.a,new yl))));Cm(e);){d=Wv(Dm(e),9);d.g==(CX(),yX)&&sJ(d,(Rib(),pib),(kP(),hP));for(c=Uh(mX(d));Cm(c);){b=Wv(Dm(c),12);M0(b,(kP(),hP))}}}
function L0(a){var b,c,d,e;for(e=(Il(),new Im(Dl(ul(a.a,new yl))));Cm(e);){d=Wv(Dm(e),9);d.g==(CX(),yX)&&sJ(d,(Rib(),pib),(kP(),gP));for(c=Uh(mX(d));Cm(c);){b=Wv(Dm(c),12);M0(b,(kP(),gP))}}}
function cdb(a,b){this.b=new vtb;switch(a){case 0:this.d=new Ddb(this);break;case 1:this.d=new tdb(this);break;case 2:this.d=new ydb(this);break;default:throw new rlb;}this.c=b;this.a=0.2*b}
function uW(a){var b,c,d,e;if(!a.b){a.b=new GU;for(c=new Tob(a.a.c);c.a<c.c.c.length;){b=Wv(Rob(c),16);for(e=new Tob(b.a);e.a<e.c.c.length;){d=Wv(Rob(e),9);vU(a.b,new BW(d,a.c))}}}return a.b}
function l5(a,b){var c,d,e;c=m5(b,a.e);d=Wv(Smb(a.g.f,c),24).a;e=a.a.c.length-1;if(a.a.c.length!=0&&Wv(yU(a.a,e),128).c==d){++Wv(yU(a.a,e),128).a;++Wv(yU(a.a,e),128).b}else{vU(a.a,new v5(d))}}
function lmb(a){bmb();var b,c;if(a>=ayb){b=55296+(a-ayb>>10&1023)&byb;c=56320+(a-ayb&1023)&byb;return String.fromCharCode(b)+(''+String.fromCharCode(c))}else{return String.fromCharCode(a&byb)}}
function KV(a,b,c,d){var e,f,g;e=hX(c);f=PW(e);g=new RX;PX(g,c);switch(d.e){case 1:QX(g,tN(vN(f)));break;case 2:QX(g,vN(f));}sJ(g,(Rib(),tib),Wv(rJ(b,tib),15));sJ(b,uib,g);Umb(a.b,g,b);return g}
function l6(a,b,c,d){var e;vU(a.c,new t6(a,c,d,Wv(Smb(a.k,c),24).a));if(d6(d)&&(b==a.e?d.d.f!=a.a&&d.c.f!=a.a:d.d.f!=a.e&&d.c.f!=a.e)){e=c==d.c?d.d:d.c;vU(a.c,new t6(a,e,d,Wv(Smb(a.k,e),24).a))}}
function fe(a,b){var c,d,e;if(b===a){return true}if(!aw(b,57)){return false}e=Wv(b,57);if(a.Y()!=e.Y()){return false}for(d=e.bb().mb();d.G();){c=Wv(d.H(),21);if(!a._(c)){return false}}return true}
function $Z(a,b){var c,d,e;d=new uX(a);qJ(d,b);sJ(d,(Rib(),gib),b);sJ(d,(eM(),TL),(KM(),FM));sJ(d,lL,(iK(),eK));sX(d,(CX(),xX));c=new RX;PX(c,d);QX(c,(sN(),rN));e=new RX;PX(e,d);QX(e,ZM);return d}
function O7(a,b){var c,d,e;e=$xb;for(d=new Tob(m7(b));d.a<d.c.c.length;){c=Wv(Rob(d),89);if(c.e&&!a.c[c.b]){a.c[c.b]=true;e=Slb(e,O7(a,c7(c,b)))}}a.i[b.b]=a.j;a.g[b.b]=Slb(e,a.j++);return a.g[b.b]}
function _eb(a,b,c){var d,e,f,g;g=a.g.tb();if(a.e){for(e=0;e<a.c;e++){g.H()}}else{for(e=0;e<a.c-1;e++){g.H()}}f=a.b.tb();d=Ixb(Yv(g.H()));while(d-b<RAb){d=Ixb(Yv(g.H()));f.H()}g.M();afb(a,c,b,f,g)}
function Lt(b,c){var d,e,f,g;for(e=0,f=b.length;e<f;e++){g=b[e];try{g[1]?g[0].bd()&&(c=Kt(c,g)):g[0].bd()}catch(a){a=OH(a);if(aw(a,46)){d=a;Ct(aw(d,164)?Wv(d,164).cc():d)}else throw NH(a)}}return c}
function Qr(a){var b,c,d;d=a.c.a;if(!d){return null}if(a.b.b){b=a.b.e;c=Ds(a.c.a,a.d,b);if(!c){return null}a.b.d==(Gh(),Fh)&&a.d.$b(b,c.b)==0&&(c=c.i)}else{c=a.a.i}return c==a.a||!ok(a.b,c.b)?null:c}
function t2(a,b){var c,d,e,f,g,h;f=0;for(d=new Tob(b.c);d.a<d.c.c.length;){c=Wv(Rob(d),16);e=0;for(h=new Tob(c.a);h.a<h.c.c.length;){g=Wv(Rob(h),9);e+=g.j.b+g.e.a+g.e.d+a.a}e-=a.a;f=f>e?f:e}return f}
function M7(a){var b,c,d,e,f;f=$xb;e=$xb;for(d=new Tob(m7(a));d.a<d.c.c.length;){c=Wv(Rob(d),89);b=c.d.e-c.c.e;c.d==a&&b<e?(e=b):b<f&&(f=b)}e==$xb&&(e=-1);f==$xb&&(f=-1);return new RJ(Elb(e),Elb(f))}
function l8(a,b,c){var d,e,f,g,h;b.k=-1;for(h=oX(b,(djb(),bjb)).mb();h.G();){g=Wv(h.H(),7);for(e=new Tob(g.e);e.a<e.c.c.length;){d=Wv(Rob(e),12);f=d.d.f;b!=f&&(f.k<0?c.ib(d):f.k>0&&l8(a,f,c))}}b.k=0}
function Bfb(a,b){yfb(this);if(0>b){throw new slb('Top must be smaller or equal to bottom.')}else if(0>a){throw new slb('Left must be smaller or equal to right.')}this.d=0;this.c=a;this.a=b;this.b=0}
function Ffb(a){var b,c,d;yfb(this);if(a.length==0){throw new slb(TAb)}for(c=0,d=a.length;c<d;++c){b=a[c];this.d=Qlb(this.d,b.b);this.c=Nlb(this.c,b.a);this.a=Nlb(this.a,b.b);this.b=Qlb(this.b,b.a)}}
function g0(){d0();return Bv(tv(mC,1),uyb,37,0,[L_,o_,c0,m_,p_,__,z_,T_,j_,D_,S_,P_,I_,s_,h_,N_,W_,F_,G_,A_,Z_,V_,R_,r_,U_,$_,Y_,B_,x_,H_,k_,C_,a0,O_,t_,v_,J_,i_,l_,y_,u_,M_,Q_,E_,w_,X_,K_,n_,b0,q_])}
function a5(a,b){var c,d,e,f,g,h,i,j,k;k=0;for(d=0,e=b.length;d<e;++d){c=b[d];for(g=0,h=c.length;g<h;++g){f=c[g];for(j=new Tob(f.f);j.a<j.c.c.length;){i=Wv(Rob(j),7);i.k=k++}}}a.a=xv(mw,Yyb,26,k,12,1)}
function Sl(a){Il();var b,c,d;b=a.H();if(!a.G()){return b}d=new zmb;d.a+='expected one element but was: <'+b;for(c=0;c<4&&a.G();c++){ymb(d,', '+a.H())}a.G()&&(d.a+=', ...',d);d.a+='>';throw new slb(d.a)}
function x6(a){var b,c,d,e,f;b=0;for(d=a.b,e=0,f=d.length;e<f;++e){c=d[e];b+=z6(a,c);if(LM(Wv(rJ(c,(eM(),TL)),28))){nX(c,(sN(),$M)).mb().G()&&(b+=y6(a,c,$M));nX(c,pN).mb().G()&&(b+=y6(a,c,pN))}}return b}
function i5(a,b,c,d){var e,f,g,h,i;if(d.d.c+d.e.c==0){for(g=a.a[a.c],h=0,i=g.length;h<i;++h){f=g[h];Umb(d,f,new r5(a,f,c))}}e=Wv(re(Ktb(d.d,b)),284);e.b=0;e.c=e.f;e.c==0||u5(Wv(yU(e.a,e.b),128));return e}
function Dpb(a){var h;ypb();var b,c,d,e,f,g;if(aw(a,63)){for(e=0,d=a.Y()-1;e<d;++e,--d){h=a.sb(e);a.wb(e,a.sb(d));a.wb(d,h)}}else{b=a.tb();f=a.ub(a.Y());while(b.L()<f.N()){c=b.H();g=f.M();b.O(g);f.O(c)}}}
function Wb(a,b,c){if(a<0||a>c){return Vb(a,c,'start index')}if(b<0||b>c){return Vb(b,c,'end index')}return fc('end index (%s) must not be less than start index (%s)',Bv(tv(UF,1),syb,1,4,[Elb(b),Elb(a)]))}
function SP(a){if(!('id' in a.a)){throw new FQ("Every graph element must specify an 'id' property.",a)}if(!Pu(a,'id').lc()){throw new FQ("Invalid format for 'id'. Must be a string, was "+Pu(a,'id').$c,a)}}
function f3(a,b){var c,d,e,f,g,h,i;i=a.b;for(d=Wv(qsb(a3,a),20).mb();d.G();){c=Wv(d.H(),75);for(h=(f=(new Snb(c.c.a)).a.bb().mb(),new Ynb(f));h.a.G();){g=(e=Wv(h.a.H(),21),Wv(e.yb(),7));Anb(b,g);J2(g,i)}}}
function _db(a,b){var c,d,e;for(e=new Tob(b.e);e.a<e.c.c.length;){c=Wv(Rob(e),12);if(c.d.f!=a.f){return true}}for(d=new Tob(b.b);d.a<d.c.c.length;){c=Wv(Rob(d),12);if(c.c.f!=a.f){return true}}return false}
function Z2(a){var b,c,d,e;We(a.c);We(a.b);We(a.a);for(e=(c=(new Snb(a.e)).a.bb().mb(),new Ynb(c));e.a.G();){d=(b=Wv(e.a.H(),21),Wv(b.yb(),60));if(d.c!=2){Wsb(a.a,d);d.c==0&&Wsb(a.c,d)}Wsb(a.b,d)}a.d=false}
function mr(b,c){var d;if(b===c){return true}if(aw(c,18)){d=Wv(c,18);try{return b.Y()==d.Y()&&b.lb(d)}catch(a){a=OH(a);if(aw(a,76)){return false}else if(aw(a,119)){return false}else throw NH(a)}}return false}
function Ltb(a,b,c){var d,e,f,g;g=b==null?0:a.b.Vc(b);e=(d=Ttb(a.a,g),d==null?[]:d);if(e.length==0){Vtb(a.a,g,e)}else{f=Itb(a,b,e);if(f){return f.Ab(c)}}Av(e,e.length,new qob(b,c));++a.c;msb(a.b);return null}
function Vb(a,b,c){if(a<0){return fc(ryb,Bv(tv(UF,1),syb,1,4,[c,Elb(a)]))}else if(b<0){throw new slb(tyb+b)}else{return fc('%s (%s) must not be greater than size (%s)',Bv(tv(UF,1),syb,1,4,[c,Elb(a),Elb(b)]))}}
function Ub(a,b){if(a<0){return fc(ryb,Bv(tv(UF,1),syb,1,4,['index',Elb(a)]))}else if(b<0){throw new slb(tyb+b)}else{return fc('%s (%s) must be less than size (%s)',Bv(tv(UF,1),syb,1,4,['index',Elb(a),Elb(b)]))}}
function jW(a){var b,c,d,e;e=xv(qB,Txb,51,a.c.c.length,0,2);d=new Fnb(a.c,0);while(d.b<d.d.Y()){b=(Bxb(d.b<d.d.Y()),Wv(d.d.sb(d.c=d.b++),16));c=d.b-1;e[c]=Wv(FU(b.a,xv(qB,Nzb,9,b.a.c.length,0,1)),51)}return e}
function w3(a,b,c,d,e){this.c=e;this.d=b;this.a=c;switch(e.e){case 4:this.b=Jlb(a.b);break;case 1:this.b=Jlb(a.d);break;case 2:this.b=Jlb(a.c-d.j.a);break;case 3:this.b=Jlb(a.a-d.j.b);break;default:this.b=0;}}
function adb(a,b,c,d,e){var f,g,h,i,j;if(b){for(h=b.mb();h.G();){g=Wv(h.H(),9);for(j=pX(g,(djb(),bjb),c).mb();j.G();){i=Wv(j.H(),7);f=Wv(re(Ktb(e.d,i)),80);if(!f){f=new odb(a);d.c[d.c.length]=f;mdb(f,i,e)}}}}}
function Ofb(a,b){var c,d,e;c=a.c;if(c.a.Y()>1){throw new slb('In straight hyperEdges there may be only one edge.')}QI((e=(new Snb(c.a)).a.bb().mb(),d=Wv((new Ynb(e)).a.H(),21),Wv(d.yb(),12)).a,new HI(b,a.b))}
function no(a,b,c){var d,e;this.f=a;d=Wv(Smb(a.b,b),126);e=!d?0:d.a;bc(c,e);if(c>=(e/2|0)){this.e=!d?null:d.c;this.d=e;while(c++<e){lo(this)}}else{this.c=!d?null:d.b;while(c-->0){ko(this)}}this.b=b;this.a=null}
function HP(a,b){if(typeof klaycallback===Zxb){klaycallback(b)}else{typeof document!==Czb?Rxb(a(b)):typeof module===Sxb&&module.exports&&Rxb(a(b));typeof document===Czb&&typeof self!==Czb&&self.postMessage(b)}}
function _P(a,b){var c,d,e,f;if('x' in a.a){e=Wv(Pu(a,'x'),104);b.i.a=e.a}if('y' in a.a){f=Wv(Pu(a,'y'),104);b.i.b=f.a}if(Jzb in a.a){d=Wv(Pu(a,Jzb),104);b.j.a=d.a}if(Kzb in a.a){c=Wv(Pu(a,Kzb),104);b.j.b=c.a}}
function lgb(a,b,c){var d,e;igb(this);b==(fgb(),dgb)?stb(this.g,a.c):stb(this.o,a.c);c==dgb?stb(this.g,a.d):stb(this.o,a.d);stb(this.c,a);d=MX(a.c).b;e=MX(a.d).b;kgb(this,d,e,e);this.f=Zfb(MX(a.c).b,MX(a.d).b)}
function p5(a){var b,c,d,e,f,g;g=new U6(a.d,a.e);for(f=T6(g);f.G();){e=Wv(f.H(),7);d=a.e==(sN(),rN)?e.b:e.e;for(c=new Tob(d);c.a<c.c.c.length;){b=Wv(Rob(c),12);if(!bW(b)&&b.c.f.d!=b.d.f.d){l5(a,b);++a.f;++a.c}}}}
function LQ(a,b,c){var d,e,f,g,h;g=(ypb(),new Frb(Wv(yU(b.a,c),18)));h=new HU(g.b.Y());for(e=new Nqb(g.b.mb());e.b.G();){d=Wv(e.b.H(),37);f=Wv(Smb(a.a,d),31);if(!f){f=e0(d);Umb(a.a,d,f)}h.c[h.c.length]=f}return h}
function T5(a,b){var c,d,e,f;d=new Fnb(a.f.c,0);while(d.b<d.d.Y()){c=(Bxb(d.b<d.d.Y()),Wv(d.d.sb(d.c=d.b++),16));f=b[d.b-1];e=new Fnb(c.a,0);while(e.b<e.d.Y()){Bxb(e.b<e.d.Y());e.d.sb(e.c=e.b++);Enb(e,f[e.b-1])}}}
function m2(a){var b,c;if(MM(Wv(rJ(a,(eM(),TL)),28))){for(c=new Tob(a.f);c.a<c.c.c.length;){b=Wv(Rob(c),7);b.g==(sN(),qN)&&p2(b)}}else{for(c=new Tob(a.f);c.a<c.c.c.length;){b=Wv(Rob(c),7);p2(b)}sJ(a,TL,(KM(),HM))}}
function jpb(a,b,c,d,e,f){var g,h,i,j;g=d-c;if(g<7){gpb(b,c,d,f);return}i=c+e;h=d+e;j=i+(h-i>>1);jpb(b,a,i,j,-e,f);jpb(b,a,j,h,-e,f);if(f.$b(a[j-1],a[j])<=0){while(c<d){Av(b,c++,a[i++])}return}hpb(a,i,j,h,b,c,d,f)}
function hv(a){if(!a){return Bu(),Au}var b=a.valueOf?a.valueOf():a;if(b!==a){var c=dv[typeof b];return c?c(b):kv(typeof b)}else if(a instanceof Array||a instanceof $wnd.Array){return new ku(a)}else{return new Uu(a)}}
function I7(a,b,c){var d,e;d=c.c;e=c.d;if(a.g[d.b]<=a.i[b.b]&&a.i[b.b]<=a.i[d.b]&&a.g[e.b]<=a.i[b.b]&&a.i[b.b]<=a.i[e.b]){if(a.i[d.b]<a.i[e.b]){return false}return true}if(a.i[d.b]<a.i[e.b]){return true}return false}
function j5(a,b,c){var d,e,f,g,h,i,j,k;j=0;for(e=a.a[b],f=0,g=e.length;f<g;++f){d=e[f];k=new U6(d,c);for(i=T6(k);i.G();){h=Wv(i.H(),7);Umb(a.f,h,Elb(j));LM(Wv(rJ(d,(eM(),TL)),28))&&++j}LM(Wv(rJ(d,(eM(),TL)),28))||++j}}
function Pb(a,b,c){var d,e;_b(b);if(c.G()){e=Wv(c.H(),21);vmb(b,Mb(a.a,e.yb()));vmb(b,a.b);vmb(b,Mb(a.a,e.zb()));while(c.G()){vmb(b,a.a.c);d=Wv(c.H(),21);vmb(b,Mb(a.a,d.yb()));vmb(b,a.b);vmb(b,Mb(a.a,d.zb()))}}return b}
function Gd(a,b){var c,d;c=Wv(Wmb(a.b,b),19);if(!c){return a.$()}d=a.Z();d.jb(c);a.c-=c.Y();c.Q();return aw(d,137)?(ypb(),new dsb(Wv(d,137))):aw(d,18)?(ypb(),new Frb(Wv(d,18))):aw(d,20)?Hpb(Wv(d,20)):(ypb(),new zqb(d))}
function Tm(a,b){var c;b.d?(b.d.b=b.b):(a.a=b.b);b.b?(b.b.d=b.d):(a.e=b.d);if(!b.e&&!b.c){c=Wv(Wmb(a.b,b.a),126);c.a=0;++a.c}else{c=Wv(Smb(a.b,b.a),126);--c.a;!b.e?(c.b=b.c):(b.e.c=b.c);!b.c?(c.c=b.e):(b.c.e=b.e)}--a.d}
function mU(a,b,c){switch(c.e){case 1:return new HI(b.a,Qlb(a.d.b,b.b));case 2:return new HI(Nlb(a.c.a,b.a),b.b);case 3:return new HI(b.a,Nlb(a.c.b,b.b));case 4:return new HI(Qlb(b.a,a.d.a),b.b);}return new HI(b.a,b.b)}
function Oxb(a){var b,c,d,e;b=0;d=(bmb(),a.length);e=d-4;c=0;while(c<e){b=a.charCodeAt(c+3)+31*(a.charCodeAt(c+2)+31*(a.charCodeAt(c+1)+31*(a.charCodeAt(c)+31*b)));b=b|0;c+=4}while(c<d){b=b*31+jmb(a,c++)}b=b|0;return b}
function X9(a,b){var c,d,e;this.a=a;this.c=b;this.b=xv(nE,Txb,673,a.length,0,2);for(c=0;c<a.length;++c){e=a[c].length;this.b[c]=xv(nE,{673:1,3:1,5:1,6:1},102,e,0,1);for(d=0;d<e;++d){this.b[c][d]=new $9(this,a[c][d].c)}}}
function sk(a,b,c,d,e,f,g){var h;this.a=Wv(_b(a),56);this.b=b;this.c=e;this.e=c;this.d=Wv(_b(d),159);this.g=f;this.f=Wv(_b(g),159);b&&a.$b(c,c);e&&a.$b(f,f);if(b&&e){h=a.$b(c,f);Zb(h<=0,c,f);h==0&&Xb(d!=(Gh(),Fh)|g!=Fh)}}
function eV(a){this.a=a;if(a.c.f.g==(CX(),xX)){this.c=a.c;this.d=Wv(rJ(a.c.f,(Rib(),hib)),32)}else if(a.d.f.g==xX){this.c=a.d;this.d=Wv(rJ(a.d.f,(Rib(),hib)),32)}else{throw new slb('Edge '+a+' is not an external edge.')}}
function Xcb(){Xcb=iI;Scb=UQ(new WQ,(d0(),x_));Ucb=TQ(new WQ,A_);Vcb=PQ(TQ(new WQ,R_),Q_);Rcb=PQ(UQ(TQ(new WQ,s_),t_),u_);Wcb=TQ(new WQ,Z_);Tcb=PQ(new WQ,y_);Pcb=PQ(UQ(TQ(SQ(new WQ,D_),F_),H_),E_);Qcb=PQ(UQ(new WQ,H_),q_)}
function Lr(a,b,c){var d,e,f,g;Mh(c,Xyb);if(c==0){return Pr(a,b)}Xb(ok(a.b,b));g=a.c.a;if(!g){a.d.$b(b,b);e=new Os(b,c);es(a.a,e,a.a);Us(a.c,null,e);return 0}f=xv(mw,Yyb,26,1,12,1);d=zs(g,a.d,b,c,f);Us(a.c,g,d);return f[0]}
function i$(a,b,c){var d,e,f,g,h,i;d=0;i=c;if(!b){d=c*(a.c.length-1);i*=-1}for(f=new Tob(a);f.a<f.c.c.length;){e=Wv(Rob(f),9);sJ(e,(eM(),lL),(iK(),eK));e.j.a=d;for(h=nX(e,(sN(),ZM)).mb();h.G();){g=Wv(h.H(),7);g.i.a=d}d+=i}}
function Fd(a,b,c){var d;d=Wv(Smb(a.b,b),19);if(!d){d=a.Z();if(d.ib(c)){++a.c;Umb(a.b,b,d);return true}else{throw new ukb('New Collection violated the Collection spec')}}else if(d.ib(c)){++a.c;return true}else{return false}}
function ES(a,b,c){var d,e,f;CS(a,b,c);f=new GU;for(e=new Tob(a.b.a.b);e.a<e.c.c.length;){d=Wv(Rob(e),25);if(b.D(d)){vU(f,new OS(d,true));vU(f,new OS(d,false))}}JS(a.d);RT(f,a.c,new opb(Bv(tv(JA,1),syb,160,0,[a.d])));DS(a,b,c)}
function R8(a,b){var c,d,e,f,g;a.c[b.k]=true;vU(a.a,b);for(g=new Tob(b.f);g.a<g.c.c.length;){f=Wv(Rob(g),7);for(d=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[f.b,f.e]))))));Cm(d);){c=Wv(Dm(d),12);e=S8(f,c).f;a.c[e.k]||R8(a,e)}}}
function dQ(a,b,c,d){var e,f,g;if('labels' in b.a){g=Pu(b,'labels');if(!g.hc()){throw new GQ("The 'labels' property of a node must be an array.",g,b)}f=g.hc();for(e=0;e<f.a.length;++e){aw(gu(f,e),69)&&cQ(a,Wv(gu(f,e),69),c,d)}}}
function j0(a,b,c){var d,e,f,g,h,i;f=Wv(yU(b.b,0),12).c;d=f.f;e=d.g;i=Wv(yU(c.e,0),12).d;g=i.f;h=g.g;e==(CX(),zX)?sJ(a,(Rib(),qib),Wv(rJ(d,qib),7)):sJ(a,(Rib(),qib),f);h==zX?sJ(a,(Rib(),rib),Wv(rJ(g,rib),7)):sJ(a,(Rib(),rib),i)}
function oM(){oM=iI;gM=new pM('H_LEFT',0);fM=new pM('H_CENTER',1);iM=new pM('H_RIGHT',2);nM=new pM('V_TOP',3);mM=new pM('V_CENTER',4);lM=new pM('V_BOTTOM',5);jM=new pM('INSIDE',6);kM=new pM('OUTSIDE',7);hM=new pM('H_PRIORITY',8)}
function rS(a){aS();var b,c,d;this.b=ZR;this.c=_R;this.d=(sK(),qK);this.g=(VR(),UR);this.a=a;oS(this,new sS);fS(this);for(d=new Tob(a.b);d.a<d.c.c.length;){c=Wv(Rob(d),25);if(!c.f){b=new QR(Bv(tv(kA,1),syb,25,0,[c]));vU(a.a,b)}}}
function R7(a,b){var c,d,e,f;e=1;b.j=true;for(d=new Tob(m7(b));d.a<d.c.c.length;){c=Wv(Rob(d),89);if(!a.c[c.b]){a.c[c.b]=true;f=c7(c,b);if(c.e){e+=R7(a,f)}else if(!f.j&&c.a==c.d.e-c.c.e){c.e=true;stb(a.p,c);e+=R7(a,f)}}}return e}
function Abb(a){var b,c,d,e,f,g,h,i;e=Uzb;d=Vzb;for(c=new Tob(a.e.c);c.a<c.c.c.length;){b=Wv(Rob(c),16);for(g=new Tob(b.a);g.a<g.c.c.length;){f=Wv(Rob(g),9);i=Ixb(a.n[f.k]);h=i+Ixb(a.b[a.f[f.k].k]);e=e<i?e:i;d=d>h?d:h}}return d-e}
function DQ(a){var b;b=new Tu;Ru(b,'type',new lv((Gkb($z),$z.n)));Ru(b,Dzb,new lv(a.f));!!a.b&&Ru(b,'value',a.b);!!a.a&&Ru(b,'context',a.a);Ru(b,Ezb,new lv(Hb(new Kb('\n'),new wnb(new opb((a.g==null&&(a.g=Pt(a)),a.g))))));return b}
function D5(a,b){if(a.c<b.c){return -1}else if(a.c>b.c){return 1}else if(a.b<b.b){return -1}else if(a.b>b.b){return 1}else if(a.a!=b.a){return a.a.b-b.a.b}else if(a.d==0&&b.d==1){return -1}else if(a.d==1&&b.d==0){return 1}return 0}
function cn(a,b){var c,d,e,f,g;if(b===a){return true}if(!aw(b,20)){return false}g=Wv(b,20);if(a.Y()!=g.Y()){return false}f=g.mb();for(d=a.mb();d.G();){c=d.H();e=f.H();if(!(gw(c)===gw(e)||c!=null&&rb(c,e))){return false}}return true}
function st(b){var c=(!qt&&(qt=tt()),qt);var d=b.replace(/[\x00-\x1f\xad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200b-\u200f\u2028-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb"\\]/g,function(a){return rt(a,c)});return '"'+d+'"'}
function ER(a,b){var c,d,e,f,g,h,i;e=b==1?wR:vR;for(d=(g=(new Snb(e.a)).a.bb().mb(),new Ynb(g));d.a.G();){c=(f=Wv(d.a.H(),21),Wv(f.yb(),59));for(i=Wv(Dd(a.f.c,c),18).mb();i.G();){h=Wv(i.H(),27);BU(a.b.b,h.b);BU(a.b.a,Wv(h.b,25).f)}}}
function aR(a,b,c){var d,e,f,g;nI(c,'Recursive layout',2);if(b.b.c.length!=0){g=1/b.b.c.length;for(f=new Tob(b.b);f.a<f.c.c.length;){e=Wv(Rob(f),9);d=Wv(rJ(e,(Rib(),sib)),55);if(d){aR(a,d,rI(c,g));$Q(e,d)}}NQ(a.d,b);_Q(b,c)}bR(b);pI(c)}
function L3(a,b){oR.call(this);this.d=new vtb;this.b=Wv(rJ(b,(Rib(),Jib)),15).a*Wv(rJ(b,(Mjb(),qjb)),15).a;this.e=this.b*Wv(rJ(b,Ejb),15).a;this.a=new jJ;this.c=new jJ;this.j=new VN(a.j,a.k,0,a.n-a.k);this.o=a.g;this.g.a=a.i;K3(this,a)}
function Mtb(a,b){var c,d,e,f,g;f=b==null?0:a.b.Vc(b);d=(c=Ttb(a.a,f),c==null?[]:c);for(g=0;g<d.length;g++){e=d[g];if(a.b.Uc(b,e.yb())){if(d.length==1){d.length=0;a.a[$Ab](f)}else{d.splice(g,1)}--a.c;msb(a.b);return e.zb()}}return null}
function hU(a,b,c){var d;d=null;!!b&&(d=b.e);ZU(a,new VS(b.i.a-d.b+c.a,b.i.b-d.d+c.b));ZU(a,new VS(b.i.a-d.b+c.a,b.i.b+b.j.b+d.a+c.b));ZU(a,new VS(b.i.a+b.j.a+d.c+c.a,b.i.b-d.d+c.b));ZU(a,new VS(b.i.a+b.j.a+d.c+c.a,b.i.b+b.j.b+d.a+c.b))}
function J2(a,b){switch(b.e){case 2:QX(a,(sN(),ZM));a.a.a=a.j.a;a.a.b=a.j.b/2;break;case 4:QX(a,(sN(),rN));a.a.a=0;a.a.b=a.j.b/2;break;case 1:QX(a,(sN(),$M));a.a.a=a.j.a/2;a.a.b=0;break;case 3:QX(a,(sN(),pN));a.a.a=a.j.a/2;a.a.b=a.j.b;}}
function Fq(a,b){Dq();var c,d,e;if(b===a){return true}if(aw(b,207)){e=Wv(b,207);if(a.Y()!=e.Y()||Vg(a).Y()!=e.bb().Y()){return false}for(d=e.bb().mb();d.G();){c=Wv(d.H(),83);if(a.Cb(c.Zb())!=c.Yb()){return false}}return true}return false}
function wvb(a,b){var c,d,e,f,g,h;f=a.a*_Ab+a.b*1502;h=a.b*_Ab+11;c=Math.floor(h*FAb);f+=c;h-=c*aBb;f%=aBb;a.a=f;a.b=h;if(b<=24){return Mlb(a.a*qvb[b])}else{e=a.a*(1<<b-24);g=Mlb(a.b*rvb[b]);d=e+g;d>=2147483648&&(d-=4294967296);return d}}
function MW(a,b,c){var d,e,f;if(b==c){return}d=b;do{vI(a,d.d);f=Wv(rJ(d,(Rib(),zib)),9);if(f){e=d.a;uI(a,e.b,e.d);vI(a,f.i);d=hX(f)}}while(f);d=c;do{EI(a,d.d);f=Wv(rJ(d,(Rib(),zib)),9);if(f){e=d.a;DI(a,e.b,e.d);EI(a,f.i);d=hX(f)}}while(f)}
function n3(a,b){var c,d,e,f,g,h;c=new GU;h=new Um;for(e=(g=(new Snb(a.a)).a.bb().mb(),new Ynb(g));e.a.G();){d=(f=Wv(e.a.H(),21),Wv(f.yb(),12));Nm(h,d.c,d,null);Nm(h,d.d,d,null)}while(h.a){vU(c,m3(h,b,LM(Wv(rJ(b,(eM(),TL)),28))))}return c}
function B7(a,b){var c,d,e,f,g;for(f=new Tob(a.e.a);f.a<f.c.c.length;){e=Wv(Rob(f),61);if(e.c.c.length==e.g.c.length){d=e.e;g=M7(e);for(c=e.e-Wv(g.a,24).a+1;c<e.e+Wv(g.b,24).a;c++){b[c]<b[d]&&(d=c)}if(b[d]<b[e.e]){--b[e.e];++b[d];e.e=d}}}}
function zR(a,b){var c,d,e,f,g,h,i;e=b==1?wR:vR;for(d=(g=(new Snb(e.a)).a.bb().mb(),new Ynb(g));d.a.G();){c=(f=Wv(d.a.H(),21),Wv(f.yb(),59));for(i=Wv(Dd(a.f.c,c),18).mb();i.G();){h=Wv(i.H(),27);vU(a.b.b,Wv(h.b,25));vU(a.b.a,Wv(h.b,25).f)}}}
function ecb(a){$bb();var b,c,d,e,f,g,h;c=(mp(),new wub);for(e=new Tob(a.e.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);for(g=new Tob(d.a);g.a<g.c.c.length;){f=Wv(Rob(g),9);h=a.f[f.k];b=Wv(rub(c,h),20);if(!b){b=new GU;tub(c,h,b)}b.ib(f)}}return c}
function cS(a,b){var c,d,e,f;for(d=new Tob(a.a.a);d.a<d.c.c.length;){c=Wv(Rob(d),78);c.i=true}for(f=new Tob(a.a.b);f.a<f.c.c.length;){e=Wv(Rob(f),25);e.p=Ckb(Ixb(Xv(a.f.B(new RJ(e,b)))));e.f.i=e.f.i&Ckb(Ixb(Xv(a.f.B(new RJ(e,b)))))}return a}
function RY(a,b){var c,d,e,f;e=Eo(mX(b));for(d=WI(e,0);d.b!=d.d.c;){c=Wv(_ub(d),12);f=c.d.f;if(f.g==(CX(),wX)&&!(Ckb(Ixb(Xv(rJ(f,(Rib(),Vhb)))))&&rJ(f,uib)!=null)){BU(f.d.a,f);PX(c.c,null);PX(c.d,null);return RY(a,f)}else{return b}}return b}
function D7(a,b){var c,d,e,f,g,h,i;if(!b.e){throw new slb('The input edge is not a tree edge.')}f=null;e=$xb;for(d=new Tob(a.d);d.a<d.c.c.length;){c=Wv(Rob(d),89);h=c.c;i=c.d;if(I7(a,h,b)&&!I7(a,i,b)){g=i.e-h.e-c.a;if(g<e){e=g;f=c}}}return f}
function Icb(a,b){var c,d,e,f,g;f=b.a;f.c.f==b.b?(g=f.d):(g=f.c);f.c.f==b.b?(d=f.c):(d=f.d);e=vbb(a.a,g,d);if(e>0&&e<rAb){c=wbb(a.a,d.f,e);Bbb(a.a,d.f,-c);return c>0}else if(e<0&&-e<rAb){c=xbb(a.a,d.f,-e);Bbb(a.a,d.f,c);return c>0}return false}
function Odb(a,b,c,d,e){var f,g;if(!yI(MI(Bv(tv(qz,1),Fzb,10,0,[e.f.i,e.i,e.a])),c)){b.c==e?rn(b.a,0,new II(c)):QI(b.a,new II(c));if(d&&!ttb(a.a,c)){g=Wv(rJ(b,(eM(),CL)),44);if(!g){g=new jJ;sJ(b,CL,g)}f=new II(c);TI(g,f,g.c.b,g.c);stb(a.a,f)}}}
function Pdb(a){var b,c,d,e,f,g,h;b=0;for(d=new Tob(a.a);d.a<d.c.c.length;){c=Wv(Rob(d),9);for(f=Uh(mX(c));Cm(f);){e=Wv(Dm(f),12);if(a==e.d.f.d&&e.c.g==(sN(),rN)){g=MX(e.c).b;h=MX(e.d).b;b=b>(h-g<=0?0-(h-g):h-g)?b:h-g<=0?0-(h-g):h-g}}}return b}
function yo(a,b){var c,d,e;if(gw(b)===gw(_b(a))){return true}if(!aw(b,20)){return false}d=Wv(b,20);e=a.Y();if(e!=d.Y()){return false}if(aw(d,63)){for(c=0;c<e;c++){if(!Tb(a.sb(c),d.sb(c))){return false}}return true}else{return Ol(a.mb(),d.mb())}}
function I8(a,b){var c,d,e,f,g,h,i,j;e=a.b[b.k];if(e>=0){return e}else{f=1;for(h=new Tob(b.f);h.a<h.c.c.length;){g=Wv(Rob(h),7);for(d=new Tob(g.e);d.a<d.c.c.length;){c=Wv(Rob(d),12);j=c.d.f;if(b!=j){i=I8(a,j);f=f>i+1?f:i+1}}}H8(a,b,f);return f}}
function edb(a,b,c){var d,e,f,g,h,i;d=0;if(a.b!=0&&b.b!=0){f=WI(a,0);g=WI(b,0);h=Ixb(Yv(_ub(f)));i=Ixb(Yv(_ub(g)));e=true;do{h>i-c&&h<i+c&&++d;h<=i&&f.b!=f.d.c?(h=Ixb(Yv(_ub(f)))):i<=h&&g.b!=g.d.c?(i=Ixb(Yv(_ub(g)))):(e=false)}while(e)}return d}
function sv(a,b){switch(uv(a)){case 5:return ew(b);case 6:return cw(b);case 7:return bw(b);case 0:return Vv(b,a.__elementTypeId$);case 2:return fw(b)&&!(b.ad===kI);case 1:return fw(b)&&!(b.ad===kI)||Vv(b,a.__elementTypeId$);default:return true;}}
function Lv(a,b){var c,d,e,f,g;b&=63;c=a.h;d=(c&524288)!=0;d&&(c|=-1048576);if(b<22){g=c>>b;f=a.m>>b|c<<22-b;e=a.l>>b|a.m<<22-b}else if(b<44){g=d?bzb:0;f=c>>b-22;e=a.m>>b-22|c<<44-b}else{g=d?bzb:0;f=d?azb:0;e=c>>b-44}return Ev(e&azb,f&azb,g&bzb)}
function O9(a,b){switch(a.e){case 1:switch(b.e){case 1:return 1;case 4:return 2;case 3:return 3;case 2:return 4;}break;case 2:switch(b.e){case 1:return 1;case 2:return 2;case 3:return 3;case 4:return 4;}break;default:throw new slb(GAb);}return 0}
function hZ(a,b,c){var d,e,f,g,h,i;d=new GU;d.c[d.c.length]=b;i=b;h=0;do{i=mZ(a,i);!!i&&(d.c[d.c.length]=i,true);++h}while(i);g=(c-(d.c.length-1)*a.d.d)/d.c.length;for(f=new Tob(d);f.a<f.c.c.length;){e=Wv(Rob(f),9);e.j.a=g}return new RJ(Elb(h),g)}
function kZ(a,b,c){var d,e,f,g,h,i;d=new GU;d.c[d.c.length]=b;i=b;h=0;do{i=lZ(a,i);!!i&&(d.c[d.c.length]=i,true);++h}while(i);g=(c-(d.c.length-1)*a.d.d)/d.c.length;for(f=new Tob(d);f.a<f.c.c.length;){e=Wv(Rob(f),9);e.j.a=g}return new RJ(Elb(h),g)}
function m$(a){var b,c,d,e,f,g;e=Wv(yU(a.f,0),7);g=0;for(d=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[new fY(e),new lY(e)]))))));Cm(d);){c=Wv(Dm(d),7);g+=c.f.i.a+c.i.a+c.a.a}b=Wv(rJ(a,(eM(),SL)),10);f=!b?0:b.a;a.i.a=g/(e.b.c.length+e.e.c.length)-f}
function Ueb(a,b){var c,d,e,f;if(b<2*a.c){throw new slb('The knot vector must have at least two time the dimension elements.')}a.j=0;a.i=1;for(d=0;d<a.c;d++){a.g.ib(0)}f=b+1-2*a.c;for(e=1;e<f;e++){a.g.ib(e/f)}if(a.e){for(c=0;c<a.c;c++){a.g.ib(1)}}}
function Fs(a){var b,c;c=a.c;a.c=0;ds(a.f,a.i);if(!a.e){return a.g}else if(!a.g){return a.e}else if(a.e.d>=a.g.d){b=a.f;b.e=Is(a.e,b);b.g=a.g;b.a=a.a-1;b.j=XH(a.j,c);return Gs(b)}else{b=a.i;b.g=Js(a.g,b);b.e=a.e;b.a=a.a-1;b.j=XH(a.j,c);return Gs(b)}}
function e2(a){var b,c,d,e,f,g;for(e=new Tob(a.a);e.a<e.c.c.length;){d=Wv(Rob(e),9);if(d.g==(CX(),BX)){f=Wv(rJ(d,(Rib(),nib)),9);c=d.f;b=(Cxb(0,c.c.length),Wv(c.c[0],7));g=Wv(rJ(b,uib),7);g.g==(sN(),$M)&&d.k>f.k?QX(g,pN):g.g==pN&&f.k>d.k&&QX(g,$M)}}}
function q3(a,b,c){var d,e,f,g,h,i,j;j=a.b;g=0;for(f=new Tob(a.a.b);f.a<f.c.c.length;){e=Wv(Rob(f),33);g=Nlb(g,e.j.a)}i=wfb(a.a.c,a.a.d,b,c,g);Ue(a.a.a,Veb(i));h=s3(a.a.b,i.a,j);d=new Dfb((!i.k&&(i.k=new Efb(Xeb(i))),i.k));zfb(d);return !h?d:Gfb(d,h)}
function wbb(a,b,c){var d,e,f,g,h,i,j;d=c;e=b;do{e=a.a[e.k];g=(j=a.f[e.k],Ixb(a.n[j.k])+Ixb(a.d[e.k])-e.e.d);h=zbb(e,!e.d?-1:zU(e.d.a,e,0));if(h){f=(i=a.f[h.k],Ixb(a.n[i.k])+Ixb(a.d[h.k])+h.j.b+h.e.a);d=Qlb(d,g-(f+Xjb(a.j,e,h)))}}while(b!=e);return d}
function xbb(a,b,c){var d,e,f,g,h,i,j;d=c;e=b;do{e=a.a[e.k];f=(j=a.f[e.k],Ixb(a.n[j.k])+Ixb(a.d[e.k])+e.j.b+e.e.a);h=ybb(e,!e.d?-1:zU(e.d.a,e,0));if(h){g=(i=a.f[h.k],Ixb(a.n[i.k])+Ixb(a.d[h.k])-h.e.d);d=Qlb(d,g-(f+Xjb(a.j,e,h)))}}while(b!=e);return d}
function Sr(b,c,d){var e,f,g;Mh(d,Xyb);if(d==0){return Pr(b,c)}g=b.c.a;f=xv(mw,Yyb,26,1,12,1);try{if(!ok(b.b,c)||!g){return 0}e=Hs(g,b.d,c,d,f)}catch(a){a=OH(a);if(aw(a,119)){return 0}else if(aw(a,76)){return 0}else throw NH(a)}Us(b.c,g,e);return f[0]}
function MO(a,b){var c,d,e,f,g;if(a.b){d=Wv(oW(a.e,(eM(),jL)),65);e=d.b+d.c;c=d.d+d.a}else{e=b*2;c=b*2}g=Nlb(a.o[1]>0?e+a.i[1]*b+a.n[1]:0,a.o[3]>0?e+a.i[3]*b+a.n[3]:0);f=Nlb(a.o[4]>0?c+a.i[4]*b+a.n[4]:0,a.o[2]>0?c+a.i[2]*b+a.n[2]:0);return new HI(g,f)}
function b$(a){var b,c,d,e,f,g;g=Wv(FU(a.a,xv(qB,Nzb,9,a.a.c.length,0,1)),51);lpb(g,new g$);c=null;for(e=0,f=g.length;e<f;++e){d=g[e];if(d.g!=(CX(),xX)){break}b=Wv(rJ(d,(Rib(),hib)),32);if(b!=(sN(),rN)&&b!=ZM){continue}!!c&&Wv(rJ(c,oib),20).ib(d);c=d}}
function j6(a,b,c,d,e){var f,g,h,i;i=new U6(b,d);for(h=T6(i);h.G();){f=Wv(h.H(),7);Umb(a.k,f,Elb(Wv(Smb(a.k,f),24).a+Wv(re(Ktb(e.d,c)),24).a))}i=new U6(c,d);for(g=T6(i);g.G();){f=Wv(g.H(),7);Umb(a.k,f,Elb(Wv(Smb(a.k,f),24).a-Wv(re(Ktb(e.d,b)),24).a))}}
function hI(a,b,c){var d=fI,h;var e=d[a];var f=e instanceof Array?e[0]:null;if(e&&!f){_=e}else{_=(h=b&&b.prototype,!h&&(h=fI[b]),jI(h));_._c=c;_.constructor=_;!b&&(_.ad=kI);d[a]=_}for(var g=3;g<arguments.length;++g){arguments[g].prototype=_}f&&(_.$c=f)}
function Wkb(a){if(a.Sc()){var b=a.c;b.Tc()?(a.n='['+b.k):!b.Sc()?(a.n='[L'+b.Qc()+';'):(a.n='['+b.Qc());a.b=b.Pc()+'[]';a.j=b.Rc()+'[]';return}var c=a.i;var d=a.d;d=d.split('/');a.n=Zkb('.',[c,Zkb('$',d)]);a.b=Zkb('.',[c,Zkb('.',d)]);a.j=d[d.length-1]}
function Mr(a,b,c){var d;if(!c){return 0}d=a.d.$b(a.b.g,c.b);if(d>0){return Mr(a,b,c.g)}else if(d==0){switch(a.b.f.e){case 0:return PH(b._b(c),b.ac(c.g));case 1:return b.ac(c.g);default:throw new tkb;}}else{return PH(PH(b.ac(c.g),b._b(c)),Mr(a,b,c.e))}}
function Nr(a,b,c){var d;if(!c){return 0}d=a.d.$b(a.b.e,c.b);if(d<0){return Nr(a,b,c.e)}else if(d==0){switch(a.b.d.e){case 0:return PH(b._b(c),b.ac(c.e));case 1:return b.ac(c.e);default:throw new tkb;}}else{return PH(PH(b.ac(c.e),b._b(c)),Nr(a,b,c.g))}}
function z2(a,b,c,d){var e,f,g,h;g=new uX(a);sX(g,(CX(),zX));sJ(g,(Rib(),uib),b);sJ(g,(eM(),TL),(KM(),FM));sJ(g,qib,c);sJ(g,rib,d);f=new RX;QX(f,(sN(),rN));PX(f,g);h=new RX;QX(h,ZM);PX(h,g);eW(b,f);e=new hW;qJ(e,b);sJ(e,CL,null);dW(e,h);eW(e,d);return g}
function e6(a,b){var c,d,e,f,g,h,i,j,k,l;c=0;for(g=a.j,h=0,i=g.length;h<i;++h){f=g[h];l=new U6(f,b);for(k=T6(l);k.G();){j=Wv(k.H(),7);for(e=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[j.b,j.e]))))));Cm(e);){d=Wv(Dm(e),12);bW(d)||(c+=b6(a,d,j))}}}return c}
function qab(a,b){if(a.c<b.c){return -1}else if(a.c>b.c){return 1}else if(a.b<b.b){return -1}else if(a.b>b.b){return 1}else if(a.a!=b.a){return txb(a.a)-txb(b.a)}else if(a.d==(vab(),uab)&&b.d==tab){return -1}else if(a.d==tab&&b.d==uab){return 1}return 0}
function R4(a){var b,c,d,e,f,g;e=new aJ;for(d=new Tob(a.d.a);d.a<d.c.c.length;){c=Wv(Rob(d),61);c.c.c.length==0&&(TI(e,c,e.c.b,e.c),true)}if(e.b>1){b=x7(y7(new A7,a.b++),a.d);for(g=WI(e,0);g.b!=g.d.c;){f=Wv(_ub(g),61);f7(i7(h7(j7(g7(new k7,1),0),b),f))}}}
function p3(a,b,c,d){var e,f,g,h,i,j;j=0;for(g=new Tob(a.a.b);g.a<g.c.c.length;){f=Wv(Rob(g),33);j=Nlb(j,f.j.a)}i=vfb(a.a.c,b,a.a.d,d,Jeb(a.b),c);Ue(a.a.a,Veb(i));h=s3(a.a.b,i.a,a.b);e=new Dfb((!i.k&&(i.k=new Efb(Xeb(i))),i.k));zfb(e);return !h?e:Gfb(e,h)}
function M0(a,b){var c,d,e,f,g;for(d=new Tob(a.b);d.a<d.c.c.length;){c=Wv(Rob(d),33);sJ(c,(Rib(),pib),b)}for(g=new Tob(a.c.c);g.a<g.c.c.length;){e=Wv(Rob(g),33);sJ(e,(Rib(),pib),b)}for(f=new Tob(a.d.c);f.a<f.c.c.length;){e=Wv(Rob(f),33);sJ(e,(Rib(),pib),b)}}
function I1(){I1=iI;G1=new J1(tzb,0);B1=new J1('NIKOLOV',1);E1=new J1('NIKOLOV_PIXEL',2);C1=new J1('NIKOLOV_IMPROVED',3);D1=new J1('NIKOLOV_IMPROVED_PIXEL',4);A1=new J1('DUMMYNODE_PERCENTAGE',5);F1=new J1('NODECOUNT_PERCENTAGE',6);H1=new J1('NO_BOUNDARY',7)}
function cab(a,b){var c,d,e,f,g;f=0;g=Wv(re(Ktb(b.d,a)),24);if(!g){return 0}for(e=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[a.b,a.e]))))));Cm(e);){d=Wv(Dm(e),12);d.c==a?(c=Wv(Smb(b,d.d),24)):(c=Wv(Smb(b,d.c),24));!!c&&g.a>c.a&&(f=Plb(f,g.a-c.a-1))}return f}
function RZ(a){var b,c;b=Wv(rJ(a,(eM(),HL)),15).a;c=Wv(rJ(a,IL),15).a;sJ(a,IL,new llb(b));sJ(a,HL,new llb(c));switch(Wv(rJ(a,lL),103).e){case 1:sJ(a,lL,(iK(),hK));break;case 2:sJ(a,lL,(iK(),dK));break;case 3:sJ(a,lL,(iK(),fK));break;case 4:sJ(a,lL,(iK(),gK));}}
function N0(a){var b,c,d,e,f;for(e=(Il(),new Im(Dl(ul(a.a,new yl))));Cm(e);){d=Wv(Dm(e),9);if(d.g==(CX(),yX)){f=P0(d)?(kP(),hP):(kP(),gP);sJ(d,(Rib(),pib),f)}for(c=Uh(mX(d));Cm(c);){b=Wv(Dm(c),12);f=Ckb(Ixb(Xv(rJ(b,(Rib(),Iib)))))?(kP(),gP):(kP(),hP);M0(b,f)}}}
function O0(a){var b,c,d,e,f;for(e=(Il(),new Im(Dl(ul(a.a,new yl))));Cm(e);){d=Wv(Dm(e),9);if(d.g==(CX(),yX)){f=P0(d)?(kP(),gP):(kP(),hP);sJ(d,(Rib(),pib),f)}for(c=Uh(mX(d));Cm(c);){b=Wv(Dm(c),12);f=Ckb(Ixb(Xv(rJ(b,(Rib(),Iib)))))?(kP(),hP):(kP(),gP);M0(b,f)}}}
function jdb(a,b,c){var d,e,f;for(f=new Tob(a.e);f.a<f.c.c.length;){d=Wv(Rob(f),118);if(d.b.d<0&&d.c>0){d.b.c-=d.c;d.b.c<=0&&d.b.f>0&&QI(b,d.b)}}for(e=new Tob(a.b);e.a<e.c.c.length;){d=Wv(Rob(e),118);if(d.a.d<0&&d.c>0){d.a.f-=d.c;d.a.f<=0&&d.a.c>0&&QI(c,d.a)}}}
function agb(a,b,c){var d,e,f;for(f=new Tob(a.j);f.a<f.c.c.length;){d=Wv(Rob(f),117);if(d.b.i<0&&d.c>0){d.b.e-=d.c;d.b.e<=0&&d.b.k>0&&QI(b,d.b)}}for(e=new Tob(a.d);e.a<e.c.c.length;){d=Wv(Rob(e),117);if(d.a.i<0&&d.c>0){d.a.k-=d.c;d.a.k<=0&&d.a.e>0&&QI(c,d.a)}}}
function tj(a){var b,c,d,e,f;f=a.d.c+a.e.c;switch(f){case 0:return dr(),cr;case 1:d=Wv(Sl(new rnb((new inb(a)).a)),21);return Bj(d.yb(),d.zb());default:e=(mp(),new wub);for(c=new rnb((new inb(a)).a);c.b;){b=pnb(c);tub(e,_b(b.yb()),_b(b.zb()))}return new ir(e);}}
function DS(a,b,c){var d,e,f;for(e=new Tob(a.b.a.b);e.a<e.c.c.length;){d=Wv(Rob(e),25);if(!b.D(d)){continue}f=Ixb(Yv(c.B(d)));if(f>0){!(tK(a.b.d)&&d.q.d)&&!(uK(a.b.d)&&d.q.b)&&(d.j.e+=0>f/2-0.5?0:f/2-0.5);!(tK(a.b.d)&&d.q.a)&&!(uK(a.b.d)&&d.q.c)&&(d.j.b-=f-1)}}}
function R9(a,b){switch(a.e){case 1:switch(b.e){case 1:return HAb;case 4:return 0.5;case 3:return IAb;case 2:return JAb;}break;case 2:switch(b.e){case 1:return HAb;case 2:return 0.5;case 3:return IAb;case 4:return JAb;}break;default:throw new slb(GAb);}return 0}
function rT(a,b){var c,d,e,f;f=new Fnb(a,0);c=(Bxb(f.b<f.d.Y()),Wv(f.d.sb(f.c=f.b++),48));while(f.b<f.d.Y()){d=(Bxb(f.b<f.d.Y()),Wv(f.d.sb(f.c=f.b++),48));e=new WS(d.c,c.d,b);Bxb(f.b>0);f.a.sb(f.c=--f.b);Anb(f,e);Bxb(f.b<f.d.Y());f.d.sb(f.c=f.b++);e.a=false;c=d}}
function oZ(a){var b,c,d,e,f,g;e=Wv(rJ(a,(Rib(),Zhb)),7);for(g=new Tob(a.f);g.a<g.c.c.length;){f=Wv(Rob(g),7);for(d=new Tob(f.e);d.a<d.c.c.length;){b=Wv(Rob(d),12);eW(b,e);return f}for(c=new Tob(f.b);c.a<c.c.c.length;){b=Wv(Rob(c),12);dW(b,e);return f}}return null}
function i6(a,b,c,d,e){var f,g,h,i,j,k;g=b;f=0;h=false;k=new U6(c,d);for(j=T6(k);j.G();){i=Wv(j.H(),7);h=true;Umb(a.k,i,Elb(g));if(LM(Wv(rJ(c,(eM(),TL)),28))||i.b.c.length+i.e.c.length>1){++f;++g}}if(!LM(Wv(rJ(c,(eM(),TL)),28))&&h){++f;++g}Umb(e,c,Elb(f));return g}
function nfb(a){var b,c,d,e,f,g,h,i,j,k,l,m;g=a.b.mb();h=Wv(g.H(),92);k=h.a.a;j=k>RAb;i=k<SAb;while(g.G()){c=h;f=k;e=j;d=i;h=Wv(g.H(),92);k=h.a.a;j=k>RAb;i=k<SAb;if(!(j||i)){return mfb(h.b)}if(e&&i||d&&j){b=f/(f-k);l=mfb(c.b);m=mfb(h.b);return b*l+(1-b)*m}}return 0}
function ofb(a){var b,c,d,e,f,g,h,i,j,k,l,m;g=a.b.mb();h=Wv(g.H(),92);k=h.a.b;j=k>RAb;i=k<SAb;while(g.G()){c=h;f=k;e=j;d=i;h=Wv(g.H(),92);k=h.a.b;j=k>RAb;i=k<SAb;if(!(j||i)){return mfb(h.b)}if(e&&i||d&&j){b=f/(f-k);l=mfb(c.b);m=mfb(h.b);return b*l+(1-b)*m}}return 0}
function b6(a,b,c){var d,e;d=0;if(d6(b)){if(ttb(a.g,b)){Sr(a.i,Elb(h6(a,b.c)),1)>0;Sr(a.i,Elb(h6(a,b.d)),1)>0;utb(a.g,b);d+=g6(a,b,a.i)}else{stb(a.g,b);Lr(a.i,Elb(h6(a,b.c)),1);Lr(a.i,Elb(h6(a,b.d)),1)}}else{e=Pr(a.i,Elb(Wv(Smb(a.k,c),24).a));d+=a.g.a.Y()-e}return d}
function Keb(a){switch(a.e){case 0:return veb;case 1:return seb;case 2:return reb;case 3:return yeb;case 4:return xeb;case 5:return Deb;case 6:return Ceb;case 7:return web;case 8:return teb;case 9:return ueb;case 11:return Aeb;case 10:return zeb;default:return Beb;}}
function Leb(a){switch(a.e){case 0:return neb;case 1:return meb;case 2:return jeb;case 3:return ieb;case 4:return peb;case 5:return oeb;case 6:return Heb;case 7:return Geb;case 8:return leb;case 9:return keb;case 10:return Eeb;case 11:return qeb;default:return Feb;}}
function Meb(a){switch(a.e){case 0:return oeb;case 1:return Heb;case 2:return Geb;case 3:return neb;case 4:return meb;case 5:return jeb;case 6:return ieb;case 7:return peb;case 8:return leb;case 9:return keb;case 10:return Eeb;case 11:return qeb;default:return Feb;}}
function Neb(a){switch(a.e){case 0:return jeb;case 1:return ieb;case 2:return peb;case 3:return oeb;case 4:return Heb;case 5:return Geb;case 6:return neb;case 7:return meb;case 8:return leb;case 9:return keb;case 10:return Eeb;case 11:return qeb;default:return Feb;}}
function fcb(a){var b,c,d,e,f,g,h,i;c=(mp(),new wub);h=new Yub((Oh(),new opb(a.f)));for(g=(e=(new Snb(h.a)).a.bb().mb(),new Ynb(e));g.a.G();){f=(d=Wv(g.a.H(),21),Wv(d.yb(),9));if(!f){Fmb();break}i=a.i[f.k];b=Wv(rub(c,i),20);if(!b){b=new GU;tub(c,i,b)}b.ib(f)}return c}
function CS(a,b,c){var d,e,f;for(e=new Tob(a.b.a.b);e.a<e.c.c.length;){d=Wv(Rob(e),25);if(!b.D(d)){continue}f=Ixb(Yv(c.B(d)));if(f>0){!(tK(a.b.d)&&d.q.d)&&!(uK(a.b.d)&&d.q.b)&&(d.j.e-=0>f/2-0.5?0:f/2-0.5);!(tK(a.b.d)&&d.q.a)&&!(uK(a.b.d)&&d.q.c)&&(d.j.b+=0>f-1?0:f-1)}}}
function T6(a){var b,c,d;d=a.a.f;switch(a.b){case 0:return new Tob(a.a.f);case 1:return Pl((c=new W6(d),c),S6(a));case 2:switch(a.c.e){case 2:case 1:return Pl(new Tob(d),S6(a));case 3:case 4:return Pl((b=new W6(d),b),S6(a));}}throw new Imb('PortOrder not implemented.')}
function CT(a,b){var c;if(!!a.d&&(b.c!=a.e.c||hT(a.e.b,b.b))){vU(a.f,a.d);a.a=a.d.d+a.d.c;a.d=null;a.e=null}eT(b.b)?(a.c=b):(a.b=b);if(b.b==(cT(),$S)&&!b.a||b.b==_S&&b.a||b.b==aT&&b.a||b.b==bT&&!b.a){if(!!a.c&&!!a.b){c=new VN(a.a,a.c.d,b.c-a.a,a.b.d-a.c.d);a.d=c;a.e=b}}}
function Cbb(a,b,c,d){this.e=a;this.j=Wv(rJ(a,(Rib(),Kib)),134);this.f=xv(qB,Nzb,9,b,0,1);this.b=xv(HF,Txb,184,b,6,1);this.a=xv(qB,Nzb,9,b,0,1);this.d=xv(HF,Txb,184,b,6,1);this.i=xv(qB,Nzb,9,b,0,1);this.g=xv(HF,Txb,184,b,6,1);this.n=xv(HF,Txb,184,b,6,1);this.k=c;this.c=d}
function P6(a,b,c){var d,e;if(b.g==(CX(),BX)&&c.g==BX){if(!LM(Wv(rJ(Wv(rJ(b,(Rib(),uib)),9),(eM(),TL)),28))||Wv(rJ(b,uib),9)!=Wv(rJ(c,uib),9)){return}if(I6(b)||I6(c)){a.d=1;a.b=1;return}e=Wv(yU(b.f,0),7).g;d=Wv(yU(c.f,0),7).g;M6(b).g==(sN(),$M)?H6(a,b,c,e,d):H6(a,c,b,d,e)}}
function f7(a){if(!a.a.c||!a.a.d){throw new ulb((Gkb(QD),QD.j+' must have a source and target '+(Gkb(UD),UD.j)+' specified.'))}if(a.a.c==a.a.d){throw new ulb('Network simplex does not support self-loops: '+a.a+' '+a.a.c+' '+a.a.d)}o7(a.a.c.g,a.a);o7(a.a.d.c,a.a);return a.a}
function H6(a,b,c,d,e){if(d==(sN(),ZM)&&e==ZM){N6(a,b)>N6(a,c)?(a.d=K6(a,c)):(a.b=K6(a,b))}else if(d==rN&&e==rN){N6(a,b)<N6(a,c)?(a.d=K6(a,c)):(a.b=K6(a,b))}else if(d==rN&&e==ZM){if(N6(a,b)>N6(a,c)){a.d=K6(a,c);a.b=K6(a,b)}}else{if(N6(a,b)<N6(a,c)){a.d=K6(a,c);a.b=K6(a,b)}}}
function W1(a){var b,c,d,e,f,g,h,i;i=a.f.c.length;c=0;b=i;e=2*i;for(h=new Tob(a.f);h.a<h.c.c.length;){g=Wv(Rob(h),7);switch(g.g.e){case 2:case 4:g.k=-1;break;case 1:case 3:d=g.b.c.length;f=g.e.c.length;d>0&&f>0?(g.k=b++):d>0?(g.k=c++):f>0?(g.k=e++):(g.k=c++);}}Gpb(a.f,new Z1)}
function i0(a,b,c,d){var e,f,g,h,i;if(c.d.f==b.f){return}e=new uX(a);sX(e,(CX(),zX));sJ(e,(Rib(),uib),c);sJ(e,(eM(),TL),(KM(),FM));d.c[d.c.length]=e;g=new RX;PX(g,e);QX(g,(sN(),rN));h=new RX;PX(h,e);QX(h,ZM);i=c.d;eW(c,g);f=new hW;qJ(f,c);sJ(f,CL,null);dW(f,h);eW(f,i);j0(e,g,h)}
function W2(a){var b,c,d,e,f,g,h,i,j;g=rAb;i=rAb;h=null;for(c=new Sub(new Lub(a.e));c.b!=c.c.a.b;){b=Rub(c);if(Wv(b.d,60).c==1){d=Wv(b.e,116).a;j=Wv(b.e,116).b;e=g-d>uAb;f=d-g<uAb&&i-j>uAb;if(e||f){i=Wv(b.e,116).b;g=Wv(b.e,116).a;h=Wv(b.d,60);if(i==0&&g==0){return h}}}}return h}
function i1(a,b){var c,d,e,f,g,h;f=a.d;h=Wv(rJ(a,(eM(),dM)),15).a;if(h<0){h=0;sJ(a,dM,new llb(h))}b.j.b=h;g=Math.floor(h/2);d=new RX;QX(d,(sN(),rN));PX(d,b);d.i.b=g;e=new RX;QX(e,ZM);PX(e,b);e.i.b=g;eW(a,d);c=new hW;qJ(c,a);sJ(c,CL,null);dW(c,e);eW(c,f);h1(b,a,c);f1(a,c);return c}
function OZ(a){var b,c;c=Wv(rJ(a,(Mjb(),vjb)),85);b=Wv(rJ(a,(Rib(),mib)),140);if(c==(Xib(),Tib)){sJ(a,vjb,Wib);sJ(a,mib,(Hhb(),Ghb))}else if(c==Vib){sJ(a,vjb,Wib);sJ(a,mib,(Hhb(),Ehb))}else if(b==(Hhb(),Ghb)){sJ(a,vjb,Tib);sJ(a,mib,Fhb)}else if(b==Ehb){sJ(a,vjb,Vib);sJ(a,mib,Fhb)}}
function QO(a){var b,c,d,e,f;for(d=new Tob(zW(a.e));d.a<d.c.c.length;){c=Wv(Rob(d),129);f=new II(c.e.i);e=xO()[c.e.k];b=Wv(qsb(a.c,e),283);f.b=b.e+b.a;e.b==(DO(),BO)?(f.a=b.d):e.b==AO?(f.a=b.d+(b.c-c.e.j.a)/2):e.b==CO&&(f.a=b.d+b.c-c.e.j.a);c.e.i.a=f.a;c.e.i.b=f.b;b.a+=c.e.j.b+a.d}}
function UO(a){var b,c,d;for(c=new Tob(AW(a));c.a<c.c.c.length;){b=Wv(Rob(c),161);d=new II(b.e.i);switch(Wv(b.e,7).g.e){case 4:d.a=0;d.b=a.e.j.b/2;break;case 2:d.a=a.e.j.a;d.b=a.e.j.b/2;break;case 1:d.a=a.e.j.a/2;d.b=0;break;case 3:d.a=a.e.j.a/2;d.b=a.e.j.b;}b.e.i.a=d.a;b.e.i.b=d.b}}
function oV(){this.c=xv(kw,hyb,26,(sN(),Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN])).length,12,1);this.b=xv(kw,hyb,26,Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN]).length,12,1);this.a=xv(kw,hyb,26,Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN]).length,12,1);Yob(this.c,Uzb);Yob(this.b,Vzb);Yob(this.a,Vzb)}
function tfb(a,b,c){var d,e,f,g,h,i,j,k;f=Ixb(Yv(a.b.mb().H()));j=Ixb(Yv(rl(b.b)));d=CI(xI(a.a),j-c);e=CI(xI(b.a),c-f);k=vI(d,e);CI(k,1/(j-f));this.a=k;this.b=new GU;h=true;g=a.b.mb();g.H();while(g.G()){i=Ixb(Yv(g.H()));if(h&&i-c>RAb){this.b.ib(c);h=false}this.b.ib(i)}h&&this.b.ib(c)}
function G7(a){var b,c,d,e;J7(a,a.n);if(a.d.c.length>0){dpb(a.c);while(R7(a,Wv(Rob(new Tob(a.e.a)),61))<a.e.a.c.length){b=L7(a);e=b.d.e-b.c.e-b.a;b.d.j&&(e=-e);for(d=new Tob(a.e.a);d.a<d.c.c.length;){c=Wv(Rob(d),61);c.j&&(c.e+=e)}dpb(a.c)}dpb(a.c);O7(a,Wv(Rob(new Tob(a.e.a)),61));C7(a)}}
function Aab(a,b){var c,d,e,f,g,h,i;c=Vzb;h=(CX(),AX);for(e=new Tob(b.a);e.a<e.c.c.length;){d=Wv(Rob(e),9);f=d.g;if(f!=AX){g=Yv(rJ(d,(Rib(),wib)));if(g==null){c=c>0?c:0;d.i.b=c+Wjb(a.a,f,h)}else{d.i.b=(Dxb(g),g)}}i=Wjb(a.a,f,h);d.i.b<c+i+d.e.d&&(d.i.b=c+i+d.e.d);c=d.i.b+d.j.b+d.e.a;h=f}}
function mdb(a,b,c){var d,e,f;c.db(b,a);vU(a.g,b);f=a.o.d.Lc(b);hlb(a.k)?(a.k=f):(a.k=Qlb(a.k,f));hlb(a.a)?(a.a=f):(a.a=Nlb(a.a,f));b.g==a.o.d.Mc()?hdb(a.j,f):hdb(a.n,f);for(e=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[new fY(b),new lY(b)]))))));Cm(e);){d=Wv(Dm(e),7);c.R(d)||mdb(a,d,c)}}
function dlb(a){var b,c,d,e,f;d=(bmb(),a.length);e=d>0&&(a.charCodeAt(0)==45||a.charCodeAt(0)==43)?1:0;for(b=e;b<d;b++){if(Dkb(a.charCodeAt(b))==-1){throw new Ylb(dyb+a+'"')}}f=parseInt(a,10);c=f<eyb;if(isNaN(f)){throw new Ylb(dyb+a+'"')}else if(c||f>$xb){throw new Ylb(dyb+a+'"')}return f}
function H$(a,b,c,d){var e,f,g,h;e=Wv(nX(b,(sN(),rN)).mb().H(),7);f=Wv(nX(b,ZM).mb().H(),7);for(h=new Tob(a.f);h.a<h.c.c.length;){g=Wv(Rob(h),7);while(g.b.c.length!=0){eW(Wv(yU(g.b,0),12),e)}while(g.e.c.length!=0){dW(Wv(yU(g.e,0),12),f)}}c||sJ(b,(Rib(),qib),null);d||sJ(b,(Rib(),rib),null)}
function jU(a){var b,c,d,e,f,g,h;h=new $U;for(g=new Tob(a.b);g.a<g.c.c.length;){f=Wv(Rob(g),9);if(f.g==(CX(),xX)){continue}hU(h,f,new FI);for(e=Uh(mX(f));Cm(e);){d=Wv(Dm(e),12);if(d.c.f.g==xX||d.d.f.g==xX){continue}for(c=WI(d.a,0);c.b!=c.d.c;){b=Wv(_ub(c),10);ZU(h,new VS(b.a,b.b))}}}return h}
function X4(a,b,c,d){var e,f,g;this.e=new jJ;this.a=a;this.b=b;if(a.b<b.b){this.j=a.a;this.k=a.b;this.n=b.b}else{this.j=b.a;this.k=b.b;this.n=a.b}e=Wv(rJ(d,(eM(),CL)),44);if(e){for(g=WI(e,0);g.b!=g.d.c;){f=Wv(_ub(g),10);RR(f.a,a.a)&&QI(this.e,f)}}this.g=c;!!this.g&&(this.i=this.j-c.j.d);this.f=d}
function Zj(a){hi();var b,c,d,e,f,g;g=new Wub;zpb(g,a);for(c=(f=(new Snb(g.a)).a.bb().mb(),new Ynb(f));c.a.G();){b=(d=Wv(c.a.H(),21),d.yb());_b(b)}switch(g.a.Y()){case 0:return kr(),jr;case 1:return new Gr((e=(new Snb(g.a)).a.bb().mb(),d=Wv((new Ynb(e)).a.H(),21),d.yb()));default:return new lr(g);}}
function $P(a,b,c,d){var e,f,g;VP(a,c,'x',b.i.a+d.a);VP(a,c,'y',b.i.b+d.b);VP(a,c,Jzb,b.j.a);VP(a,c,Kzb,b.j.b);if(aw(b,9)){if(Wv(rJ(b,(eM(),bM)),86).kb((MN(),JN))){e=Wv(b,9).b;g=Pu(c,Lzb);if(!g){g=new Tu;Ru(c,Lzb,g)}f=g.kc();VP(a,f,'left',e.b);VP(a,f,'top',e.d);VP(a,f,'right',e.c);VP(a,f,Azb,e.a)}}}
function GR(a,b){var c,d,e,f,g,h,i,j,k,l;g=b==1?wR:vR;for(f=(i=(new Snb(g.a)).a.bb().mb(),new Ynb(i));f.a.G();){e=(h=Wv(f.a.H(),21),Wv(h.yb(),59));for(k=Wv(Dd(a.f.c,e),18).mb();k.G();){j=Wv(k.H(),27);d=Wv(j.b,25);l=Wv(j.a,78);c=l.c;switch(e.e){case 2:case 1:d.j.e+=c;break;case 4:case 3:d.j.d+=c;}}}}
function IS(a,b){var c,d,e;b.a?(Rwb(a.b,b.b),a.a[b.b.k]=Wv(Twb(a.b,b.b),25),c=Wv(Swb(a.b,b.b),25),!!c&&(a.a[c.k]=b.b),undefined):(d=Wv(Twb(a.b,b.b),25),!!d&&d==a.a[b.b.k]&&!!d.f&&d.f!=b.b.f&&d.i.ib(b.b),e=Wv(Swb(a.b,b.b),25),!!e&&a.a[e.k]==b.b&&!!e.f&&e.f!=b.b.f&&b.b.i.ib(e),Uwb(a.b,b.b),undefined)}
function p1(a,b){var c,d,e,f,g,h,i;e=new GU;for(c=0;c<=a.i;c++){d=new sY(b);d.k=a.i-c;e.c[e.c.length]=d}for(h=new Tob(a.o);h.a<h.c.c.length;){g=Wv(Rob(h),9);rX(g,Wv(yU(e,a.i-a.f[g.k]),16))}f=new Tob(e);while(f.a<f.c.c.length){i=Wv(Rob(f),16);i.a.c.length==0&&Sob(f)}b.c.c=xv(UF,syb,1,0,4,1);xU(b.c,e)}
function N4(a){var b,c,d,e;a.a.a.c=xv(UF,syb,1,0,4,1);for(d=new Tob(a.a.b);d.a<d.c.c.length;){b=Wv(Rob(d),25);b.f=null}for(e=new Tob(a.a.b);e.a<e.c.c.length;){b=Wv(Rob(e),25);!b.o&&vU(a.a.a,new QR(Bv(tv(kA,1),syb,25,0,[b])))}for(c=new Tob(a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);!!b.o&&OR(b.o.f,b)}}
function fc(a,b){var c,d,e,f;a=(bmb(),a==null?Wxb:a);c=(a.length+16*b.length,new Amb);f=0;d=0;while(d<b.length){e=a.indexOf('%s',f);if(e==-1){break}jkb(c,a,f,e);xmb(c,b[d++]);f=e+2}wmb(c,a,f,a.length);if(d<b.length){c.a+=' [';xmb(c,b[d++]);while(d<b.length){c.a+=', ';xmb(c,b[d++])}c.a+=']'}return c.a}
function _vb(a,b,c,d){var e,f;if(!b){return c}else{e=a.a.$b(c.d,b.d);if(e==0){d.d=job(b,c.e);d.b=true;return b}f=e<0?0:1;b.a[f]=_vb(a,b.a[f],c,d);if(awb(b.a[f])){if(awb(b.a[1-f])){b.b=true;b.a[0].b=false;b.a[1].b=false}else{awb(b.a[f].a[f])?(b=hwb(b,1-f)):awb(b.a[f].a[1-f])&&(b=gwb(b,1-f))}}}return b}
function GY(a,b){var c,d,e,f,g,h,i,j,k,l;i=pmb(b.a);h=hw(Llb(i/a.a));l=b.a;g=0;j=h;for(f=0;f<a.a;++f){k=(bmb(),l.substr((0>g?0:g)<i?0>g?0:g:i,(0>(j<i?j:i)?0:j<i?j:i)-((0>g?0:g)<i?0>g?0:g:i)));g=j;j+=h;d=Wv(yU(a.c,f),9);c=new dX(k);c.j.b=b.j.b;Fd(a.b,b,c);vU(d.c,c)}BU(a.g.c,b);vU(a.i,(e=new PY(a,b),e))}
function p8(a,b,c){var d,e,f,g,h,i,j,k,l;b.k=1;f=b.d;for(l=oX(b,(djb(),bjb)).mb();l.G();){k=Wv(l.H(),7);for(e=new Tob(k.e);e.a<e.c.c.length;){d=Wv(Rob(e),12);j=d.d.f;if(b!=j){g=j.d;if(g.k<=f.k){h=f.k+1;if(h==c.c.c.length){i=new sY(c);i.k=h;vU(c.c,i);rX(j,i)}else{i=Wv(yU(c.c,h),16);rX(j,i)}p8(a,j,c)}}}}}
function SO(a){var b,c,d,e,f;b=a.e.j;for(d=new Tob(AW(a));d.a<d.c.c.length;){c=Wv(Rob(d),161);e=Wv(oW(c,(eM(),LL)),15);!e&&(e=new llb(0));f=new II(c.e.i);switch(Wv(c.e,7).g.e){case 4:f.a=-c.e.j.a-e.a;break;case 2:f.a=b.a+e.a;break;case 1:f.b=-c.e.j.b-e.a;break;case 3:f.b=b.b+e.a;}c.e.i.a=f.a;c.e.i.b=f.b}}
function PZ(a){var b,c,d;d=Wv(rJ(a,(eM(),JL)),18);if(d.V()){return}c=(b=Wv(Hkb(Gz),11),new atb(b,Wv(exb(b,b.length),11),0));d.kb((oM(),jM))?Wsb(c,jM):Wsb(c,kM);d.kb(hM)||Wsb(c,hM);d.kb(gM)?Wsb(c,nM):d.kb(fM)?Wsb(c,mM):d.kb(iM)&&Wsb(c,lM);d.kb(nM)?Wsb(c,gM):d.kb(mM)?Wsb(c,fM):d.kb(lM)&&Wsb(c,iM);sJ(a,JL,c)}
function afb(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o;m=Zeb(a,c);for(i=0;i<b;i++){e.J(c);n=new GU;o=Wv(d.H(),92);for(k=m+i;k<a.c;k++){h=o;o=Wv(d.H(),92);vU(n,new tfb(h,o,c))}for(l=m+i;l<a.c;l++){d.M();l>m+i&&d.I()}for(g=new Tob(n);g.a<g.c.c.length;){f=Wv(Rob(g),92);d.J(f)}if(i<b-1){for(j=m+i;j<a.c;j++){d.M()}}}}
function CW(a){var b,c,d,e;if(a.d&&Wv(a.e,7).f.g==(CX(),BX)){return ypb(),ypb(),vpb}else if(!a.a){a.a=new GU;for(d=new Tob(Wv(a.e,7).b);d.a<d.c.c.length;){b=Wv(Rob(d),12);vU(a.a,new tW(b))}if(a.d){e=Wv(rJ(Wv(a.e,7),(Rib(),Bib)),9);if(e){for(c=Uh(iX(e));Cm(c);){b=Wv(Dm(c),12);vU(a.a,new tW(b))}}}}return a.a}
function EW(a){var b,c,d,e;if(a.d&&Wv(a.e,7).f.g==(CX(),BX)){return ypb(),ypb(),vpb}else if(!a.c){a.c=new GU;for(d=new Tob(Wv(a.e,7).e);d.a<d.c.c.length;){b=Wv(Rob(d),12);vU(a.c,new tW(b))}if(a.d){e=Wv(rJ(Wv(a.e,7),(Rib(),Bib)),9);if(e){for(c=Uh(mX(e));Cm(c);){b=Wv(Dm(c),12);vU(a.c,new tW(b))}}}}return a.c}
function N1(a,b){var c,d,e,f,g,h,i,j;h=Wv(rJ(a,(Rib(),uib)),7);i=MI(Bv(tv(qz,1),Fzb,10,0,[h.f.i,h.i,h.a])).a;j=a.f.i.b;c=Wv(FU(a.b,xv(dB,gAb,12,a.b.c.length,0,1)),47);for(e=0,f=c.length;e<f;++e){d=c[e];eW(d,h);SI(d.a,new HI(i,j));if(b){g=Wv(rJ(d,(eM(),CL)),44);if(!g){g=new jJ;sJ(d,CL,g)}QI(g,new HI(i,j))}}}
function O1(a,b){var c,d,e,f,g,h,i,j;e=Wv(rJ(a,(Rib(),uib)),7);i=MI(Bv(tv(qz,1),Fzb,10,0,[e.f.i,e.i,e.a])).a;j=a.f.i.b;c=Wv(FU(a.e,xv(dB,gAb,12,a.e.c.length,0,1)),47);for(g=0,h=c.length;g<h;++g){f=c[g];dW(f,e);RI(f.a,new HI(i,j));if(b){d=Wv(rJ(f,(eM(),CL)),44);if(!d){d=new jJ;sJ(f,CL,d)}QI(d,new HI(i,j))}}}
function X2(a){var b,c,d,e,f,g,h,i,j;g=rAb;i=rAb;h=null;for(c=new Sub(new Lub(a.e));c.b!=c.c.a.b;){b=Rub(c);if(gw(b.d)===gw((Ieb(),keb))||gw(b.d)===gw(leb)){d=Wv(b.e,116).a;j=Wv(b.e,116).b;e=g-d>uAb;f=d-g<uAb&&i-j>uAb;if(e||f){i=Wv(b.e,116).b;g=Wv(b.e,116).a;h=Wv(b.d,60);if(i==0&&g==0){return h}}}}return h}
function P4(a,b){var c,d,e,f,g;a.d=b;Ymb(a.b);a.c=false;h:for(d=new Tob(a.d.c);d.a<d.c.c.length;){c=Wv(Rob(d),16);for(f=new Tob(c.a);f.a<f.c.c.length;){e=Wv(Rob(f),9);if(!sl(gX(e))){a.c=true;break h}}}g=Vsb((sK(),qK),Bv(tv(Bz,1),uyb,59,0,[oK,pK]));if(!a.c){Wsb(g,rK);Wsb(g,nK)}a.a=new NR(g);O4(a);return a.a}
function $2(){var a,b,c,d,e;this.e=(mp(),new wub);this.b=(c=Wv(Hkb(_E),11),new atb(c,Wv(exb(c,c.length),11),0));this.c=(d=Wv(Hkb(_E),11),new atb(d,Wv(exb(d,d.length),11),0));this.a=(e=Wv(Hkb(_E),11),new atb(e,Wv(exb(e,e.length),11),0));for(b=(Ieb(),Ieb(),feb).mb();b.G();){a=Wv(b.H(),60);tub(this.e,a,new _2)}}
function gdb(a,b,c){var d,e,f,g,h,i;if(Jlb(a.k-a.a)<dAb||Jlb(b.k-b.a)<dAb){return}d=edb(a.n,b.j,c);e=edb(b.n,a.j,c);f=fdb(a.n,b.k,b.a)+fdb(b.j,a.k,a.a);g=fdb(b.n,a.k,a.a)+fdb(a.j,b.k,b.a);h=16*d+f;i=16*e+g;if(h<i){new kdb(a,b,i-h)}else if(h>i){new kdb(b,a,h-i)}else if(h>0&&i>0){new kdb(a,b,0);new kdb(b,a,0)}}
function c3(a,b){var c,d,e,f,g,h,i,j,k;j=new GU;k=null;for(d=Wv(qsb(a3,a),20).mb();d.G();){c=Wv(d.H(),75);for(i=(f=(new Snb(c.c.a)).a.bb().mb(),new Ynb(f));i.a.G();){g=(e=Wv(i.a.H(),21),Wv(e.yb(),7));Anb(b,g);J2(g,a.b)}xU(j,c.b);k=a.a}Dpb(j);K2(j,k);for(h=new Tob(j);h.a<h.c.c.length;){g=Wv(Rob(h),7);Anb(b,g)}}
function GP(){var b={'layout':function(a){Rxb(IP(a))}};if(typeof klayregister===Zxb){klayregister(b)}else{typeof document!==Czb&&($wnd.$klay=b);typeof module===Sxb&&module.exports&&(module.exports=b);typeof document===Czb&&typeof self!==Czb&&self.addEventListener('message',function(a){b.layout(a.data)},false)}}
function _cb(a,b,c,d,e){var f,g,h;h=e?d.b:d.a;if(h>c.k&&h<c.a||c.j.b!=0&&c.n.b!=0&&(Jlb(h-Ixb(Yv(UI(c.j))))<dAb&&Jlb(h-Ixb(Yv(UI(c.n))))<dAb||Jlb(h-Ixb(Yv(VI(c.j))))<dAb&&Jlb(h-Ixb(Yv(VI(c.n))))<dAb)){if(!ttb(a.b,d)){g=Wv(rJ(b,(eM(),CL)),44);if(!g){g=new jJ;sJ(b,CL,g)}f=new II(d);TI(g,f,g.c.b,g.c);stb(a.b,f)}}}
function lU(a,b,c){var d,e,f,g,h,i,j,k,l;d=c.c;e=c.d;h=MX(b.c);i=MX(b.d);if(d==b.c){h=mU(a,h,e);i=nU(b.d)}else{h=nU(b.c);i=mU(a,i,e)}j=new kJ(b.a);TI(j,h,j.a,j.a.a);TI(j,i,j.c.b,j.c);g=b.c==d;l=new pV;for(f=0;f<j.b-1;++f){k=new RJ(Wv(tn(j,f),10),Wv(tn(j,f+1),10));g&&f==0||!g&&f==j.b-2?(l.b=k):vU(l.a,k)}return l}
function GW(a,b){var c,d,e,f;f=a.g.e-b.g.e;if(f!=0){return f}c=Wv(rJ(a,(eM(),UL)),24);d=Wv(rJ(b,UL),24);if(!!c&&!!d){e=c.a-d.a;if(e!=0){return e}}switch(a.g.e){case 1:return glb(a.i.a,b.i.a);case 2:return glb(a.i.b,b.i.b);case 3:return glb(b.i.a,a.i.a);case 4:return glb(b.i.b,a.i.b);default:throw new ulb(iAb);}}
function KO(a,b){var c,d,e,f,g;g=new FI;for(f=new Tob(AW(a));f.a<f.c.c.length;){e=Wv(Rob(f),161);switch(Wv(e.e,7).g.e){case 4:case 2:g.b=Nlb(g.b,e.e.i.b+e.e.j.b+(b?(d=Wv(e.e,7).d,new EP(d.d,d.b,d.a,d.c)).a:0));break;case 1:case 3:g.a=Nlb(g.a,e.e.i.a+e.e.j.a+(b?(c=Wv(e.e,7).d,new EP(c.d,c.b,c.a,c.c)).c:0));}}return g}
function d3(a,b){var c,d,e,f,g,h,i;e=new GU;i=new GU;c=Wv(qsb(a3,a),20).mb();while(c.G()){d=Wv(c.H(),75);wU(e,d.b);wU(e,$db(d));if(c.G()){d=Wv(c.H(),75);xU(i,$db(d));xU(i,d.b)}}K2(e,a.b);K2(i,a.a);for(h=new Tob(e);h.a<h.c.c.length;){f=Wv(Rob(h),7);Anb(b,f)}for(g=new Tob(i);g.a<g.c.c.length;){f=Wv(Rob(g),7);Anb(b,f)}}
function ohb(){ohb=iI;fhb=new phb('COMMENTS',0);hhb=new phb('EXTERNAL_PORTS',1);ihb=new phb('HYPEREDGES',2);jhb=new phb('HYPERNODES',3);khb=new phb('NON_FREE_PORTS',4);lhb=new phb('NORTH_SOUTH_PORTS',5);nhb=new phb('SELF_LOOPS',6);ehb=new phb('CENTER_LABELS',7);ghb=new phb('END_LABELS',8);mhb=new phb('PARTITIONS',9)}
function Jxb(a,b){var c,d,e,f;a=(bmb(),a==null?Wxb:a);c=(a.length+16*b.length,new Amb);f=0;d=0;while(d<b.length){e=a.indexOf('%s',f);if(e==-1){break}ymb(c,a.substr(f,e-f));xmb(c,b[d++]);f=e+2}ymb(c,imb(a,f,a.length-f));if(d<b.length){c.a+=' [';xmb(c,b[d++]);while(d<b.length){c.a+=', ';xmb(c,b[d++])}c.a+=']'}return c.a}
function pX(a,b,c){var d,e;e=null;switch(b.e){case 1:e=(LX(),GX);break;case 2:e=(LX(),IX);}d=null;switch(c.e){case 1:d=(LX(),HX);break;case 2:d=(LX(),FX);break;case 3:d=(LX(),JX);break;case 4:d=(LX(),KX);}return !!e&&!!d?pl(a.f,(hc(),new ic(new opb(Bv(tv(tw,1),syb,68,0,[Wv(_b(e),68),Wv(_b(d),68)]))))):(ypb(),ypb(),vpb)}
function vY(a,b,c){var d,e,f,g,h,i,j;i=Eo(mX(b));for(e=WI(i,0);e.b!=e.d.c;){d=Wv(_ub(e),12);j=d.d.f;if(!(Ckb(Ixb(Xv(rJ(j,(Rib(),Vhb)))))&&rJ(j,uib)!=null)&&j.g==(CX(),wX)&&!Ckb(Ixb(Xv(rJ(d,Iib))))&&d.d.g==(sN(),rN)){f=rY(j.d)-rY(b.d);if(f>1){c?(g=rY(b.d)+1):(g=rY(j.d)-1);h=Wv(yU(a.a.c,g),16);rX(j,h)}vY(a,j,c)}}return b}
function Hcb(a,b){var c,d,e,f;b.d?(e=a.a.c==(Gbb(),Fbb)?iX(b.b):mX(b.b)):(e=a.a.c==(Gbb(),Ebb)?iX(b.b):mX(b.b));f=false;for(d=(Il(),new Im(Dl(ul(e.a,new yl))));Cm(d);){c=Wv(Dm(d),12);if(a.c.a[c.c.f.d.k]===a.c.a[c.d.f.d.k]){continue}f=true;if(ttb(a.b,a.a.f[zcb(c,b.b).k])){b.c=true;b.a=c;return b}}b.c=f;b.a=null;return b}
function K4(a,b,c){var d,e,f,g;d=Wv(rJ(a.d,(eM(),pL)),15).a;for(f=new Tob(a.a.b);f.a<f.c.c.length;){e=Wv(Rob(f),25);if(aw(e,93)){g=Wv(e,93).b;if(g.g==(CX(),xX)){switch(Wv(rJ(g,(Rib(),hib)),32).e){case 4:g.i.a=b.a-d;break;case 2:g.i.a=c.a+d-(g.j.a+g.e.c);break;case 1:g.i.b=b.b-d;break;case 3:g.i.b=c.b+d-(g.j.b+g.e.a);}}}}}
function Ztb(){if(!Object.create||!Object.getOwnPropertyNames){return false}var a='__proto__';var b=Object.create(null);if(b[a]!==undefined){return false}var c=Object.getOwnPropertyNames(b);if(c.length!=0){return false}b[a]=42;if(b[a]!==42){return false}if(Object.getOwnPropertyNames(b).length==0){return false}return true}
function eS(a){var b,c,d,e,f,g,h,i,j;for(g=new Tob(a.a.a);g.a<g.c.c.length;){e=Wv(Rob(g),78);e.f=0;e.e.a.Q()}for(f=new Tob(a.a.a);f.a<f.c.c.length;){e=Wv(Rob(f),78);for(c=(j=(new Snb(e.a.a)).a.bb().mb(),new Ynb(j));c.a.G();){b=(d=Wv(c.a.H(),21),Wv(d.yb(),25));for(i=b.i.mb();i.G();){h=Wv(i.H(),25);if(h.f!=e){stb(e.e,h);++h.f.f}}}}}
function bcb(a,b,c,d){var e,f,g,h;if(b.g==(CX(),wX)){for(f=Uh(iX(b));Cm(f);){e=Wv(Dm(f),12);g=e.c.f;if((g.g==wX||Ckb(Ixb(Xv(rJ(g,(Rib(),Vhb))))))&&a.d.a[e.c.f.d.k]==d&&a.d.a[b.d.k]==c){return true}}}if(b.g==zX){for(f=Uh(iX(b));Cm(f);){e=Wv(Dm(f),12);h=e.c.f.g;if(h==zX&&a.d.a[e.c.f.d.k]==d&&a.d.a[b.d.k]==c){return true}}}return false}
function cfb(a){var b,c,d,e,f,g;e=a.g.tb();d=a.b.tb();if(a.e){for(c=0;c<a.c;c++){e.H()}}else{for(c=0;c<a.c-1;c++){e.H();e.I()}}b=Ixb(Yv(e.H()));while(a.i-b>RAb){f=b;g=0;while((b-f<=0?0-(b-f):b-f)<RAb){++g;b=Ixb(Yv(e.H()));d.H()}if(g<a.c){e.M();afb(a,a.c-g,f,d,e);e.H()}d.M()}if(!a.e){for(c=0;c<a.c-1;c++){e.H();e.I()}}a.e=true;a.d=true}
function O2(a){var b,c,d,e;switch(V2(a.a).c){case 4:return Ieb(),oeb;case 3:return Wv(S2(a.a).mb().H(),60);case 2:d=V2(a.a);c=new jtb(d);b=Wv(itb(c),60);e=Wv(itb(c),60);return Meb(b)==e?Zsb(d,(Ieb(),oeb))?ieb:oeb:Leb(Leb(b))==e?Leb(b):Neb(b);case 1:d=V2(a.a);return Meb(Wv(itb(new jtb(d)),60));case 0:return Ieb(),peb;default:return null;}}
function Q3(a,b){var c;oR.call(this);this.a=Wv(rJ(b,(Rib(),Jib)),15).a;this.c=this.a*Wv(rJ(b,(Mjb(),Ejb)),15).a;this.b=a;this.j=new VN(a.i.a-a.e.b,a.i.b-a.e.d,a.j.a+a.e.b+a.e.c,a.j.b+a.e.d+a.e.a);BI(this.g);c=tl(iX(a))-tl(mX(a));c<0?vS(this.n,true,(sK(),oK)):c>0&&vS(this.n,true,(sK(),pK));a.g==(CX(),xX)&&wS(this.n,false,false,false,false)}
function UT(a,b,c){var d,e,f,g,h,i,j,k,l,m;f=new HI(b,c);for(k=new Tob(a.b);k.a<k.c.c.length;){j=Wv(Rob(k),9);vI(j.i,f);for(m=new Tob(j.f);m.a<m.c.c.length;){l=Wv(Rob(m),7);for(e=new Tob(l.e);e.a<e.c.c.length;){d=Wv(Rob(e),12);hJ(d.a,f);g=Wv(rJ(d,(eM(),CL)),44);!!g&&hJ(g,f);for(i=new Tob(d.b);i.a<i.c.c.length;){h=Wv(Rob(i),33);vI(h.i,f)}}}}}
function TW(a,b,c){var d,e,f,g,h,i,j,k,l,m;f=new HI(b,c);for(k=new Tob(a.b);k.a<k.c.c.length;){j=Wv(Rob(k),9);vI(j.i,f);for(m=new Tob(j.f);m.a<m.c.c.length;){l=Wv(Rob(m),7);for(e=new Tob(l.e);e.a<e.c.c.length;){d=Wv(Rob(e),12);hJ(d.a,f);g=Wv(rJ(d,(eM(),CL)),44);!!g&&hJ(g,f);for(i=new Tob(d.b);i.a<i.c.c.length;){h=Wv(Rob(i),33);vI(h.i,f)}}}}}
function X0(a,b){var c,d,e,f,g;for(g=new Tob(a.f);g.a<g.c.c.length;){f=Wv(Rob(g),7);if(b){if(f.b.c.length!=0){throw new $J((e=lX(a),nAb+(e==null?Dlb(a.k):e)+oAb+pAb+qAb))}}else{for(d=new Tob(f.b);d.a<d.c.c.length;){c=Wv(Rob(d),12);if(gw(rJ(c.c.f,(Mjb(),vjb)))!==gw((Xib(),Tib))){throw new $J((e=lX(a),nAb+(e==null?Dlb(a.k):e)+oAb+pAb+qAb))}}}}}
function y6(a,b,c){var d,e,f,g,h,i,j;d=0;j=nX(b,c);for(i=j.mb();i.G();){h=Wv(i.H(),7);if(Wv(rJ(h,(Rib(),Bib)),9)){g=Wv(rJ(h,Bib),9);nX(g,(sN(),ZM)).mb().G()&&(d+=(f=a.k?1:NX(Wv(yU(g.f,0),7)),f*Slb(w6(a,b,c).a-1-Wv(Smb(a.i,h),24).a,B6(a,b,g))));nX(g,rN).mb().G()&&(d+=(e=a.k?1:NX(Wv(yU(g.f,0),7)),e*Slb(Wv(Smb(a.i,h),24).a,B6(a,b,g))))}}return d}
function J7(a,b){var c,d,e,f,g,h,i;e=xv(mw,Yyb,26,a.e.a.c.length,12,1);for(g=new Tob(a.e.a);g.a<g.c.c.length;){f=Wv(Rob(g),61);e[f.b]+=f.c.c.length}h=Eo(b);while(h.b!=0){f=Wv(h.b==0?null:(Bxb(h.b!=0),$I(h,h.a.a)),61);for(d=new Tob(f.g);d.a<d.c.c.length;){c=Wv(Rob(d),89);i=c.d;i.e=Plb(i.e,f.e+c.a);--e[i.b];e[i.b]==0&&(TI(h,i,h.c.b,h.c),true)}}}
function nP(a,b,c,d,e,f,g){a.d=d.e.i.a;a.e=d.e.i.b;if(e){a.d+=e.e.i.a;a.e+=e.e.i.b}a.c=b.e.j.a;a.b=b.e.j.b;if(!e){c?(a.d-=g+b.e.j.a):(a.d+=d.e.j.a+g)}else{switch(Wv(e.e,7).g.e){case 0:case 2:a.d+=e.e.j.a+g+f.a+g;break;case 4:a.d-=g+f.a+g+b.e.j.a;break;case 1:a.d+=e.e.j.a+g;a.e-=g+f.b+g+b.e.j.b;break;case 3:a.d+=e.e.j.a+g;a.e+=e.e.j.b+g+f.b+g;}}}
function V9(a,b){var c,d,e,f,g,h,i,j,k;e=new GU;for(i=new Tob(b);i.a<i.c.c.length;){f=Wv(Rob(i),9);vU(e,a.b[f.d.k][f.k])}S9(a,e);while(k=T9(e)){U9(a,Wv(k.a,102),Wv(k.b,102),e)}b.c=xv(UF,syb,1,0,4,1);for(d=new Tob(e);d.a<d.c.c.length;){c=Wv(Rob(d),102);for(g=c.d,h=0,j=g.length;h<j;++h){f=g[h];b.c[b.c.length]=f;a.a[f.d.k][f.k].a=W9(c.g,c.d[0]).a}}}
function lS(a){var b,c,d,e,f,g,h;h=(mp(),new ntb);for(d=new Tob(a.a.b);d.a<d.c.c.length;){b=Wv(Rob(d),25);Umb(h,b,new GU)}for(e=new Tob(a.a.b);e.a<e.c.c.length;){b=Wv(Rob(e),25);b.r=Vzb;for(g=b.i.mb();g.G();){f=Wv(g.H(),25);Wv(re(Ktb(h.d,f)),20).ib(b)}}for(c=new Tob(a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);b.i.Q();b.i=Wv(re(Ktb(h.d,b)),20)}eS(a)}
function kU(a){var b,c,d,e,f;e=Wv(yU(a.b,0),9);b=new uX(a);vU(a.b,b);b.j.a=Nlb(1,e.j.a);b.j.b=Nlb(1,e.j.b);b.i.a=e.i.a;b.i.b=e.i.b;switch(Wv(rJ(e,(Rib(),hib)),32).e){case 4:b.i.a+=2;break;case 1:b.i.b+=2;break;case 2:b.i.a-=2;break;case 3:b.i.b-=2;}d=new RX;PX(d,b);c=new hW;f=Wv(yU(e.f,0),7);dW(c,f);eW(c,d);vI(BI(d.i),f.i);vI(BI(d.a),f.a);return b}
function T8(a){var b,c,d,e,f,g,h,i,j;j=(mp(),new ntb);b=0;c=new l7;for(h=a.mb();h.G();){f=Wv(h.H(),9);i=x7(z7(y7(new A7,b++),f),c);Ltb(j.d,f,i)}for(g=a.mb();g.G();){f=Wv(g.H(),9);for(e=Uh(mX(f));Cm(e);){d=Wv(Dm(e),12);if(bW(d)){continue}f7(i7(h7(g7(j7(new k7,Plb(1,Wv(rJ(d,(Rib(),Eib)),24).a)),1),Wv(Smb(j,d.c.f),61)),Wv(Smb(j,d.d.f),61)))}}return c}
function E2(a){var b,c;if(a.V()){return}c=Wv(a.sb(0),75).f;new g3(a);b=new Fnb(c.f,0);e3((Ieb(),neb),b);f3(Eeb,b);D2((sN(),$M),b);d3(meb,b);f3(qeb,b);c3(jeb,b);e3(keb,b);D2(ZM,b);d3(ieb,b);e3(leb,b);c3(peb,b);e3(qeb,b);D2(pN,b);d3(oeb,b);e3(Eeb,b);c3(Heb,b);f3(leb,b);while(b.b<b.d.Y()){Bxb(b.b<b.d.Y());b.d.sb(b.c=b.b++)}d3(Geb,b);f3(keb,b);f3(neb,b)}
function F2(a){var b,c;if(a.V()){return}c=Wv(a.sb(0),75).f;new g3(a);b=new Fnb(c.f,0);e3((Ieb(),neb),b);f3(Eeb,b);D2((sN(),$M),b);c3(meb,b);f3(qeb,b);c3(jeb,b);e3(keb,b);D2(ZM,b);c3(ieb,b);e3(leb,b);c3(peb,b);e3(qeb,b);D2(pN,b);c3(oeb,b);e3(Eeb,b);c3(Heb,b);f3(leb,b);while(b.b<b.d.Y()){Bxb(b.b<b.d.Y());b.d.sb(b.c=b.b++)}c3(Geb,b);f3(keb,b);f3(neb,b)}
function N7(a){var b,c,d,e,f,g,h,i,j;e=eyb;g=$xb;for(j=new Tob(a.e.a);j.a<j.c.c.length;){h=Wv(Rob(j),61);g=Slb(g,h.e);e=Plb(e,h.e)}f=0;d=xv(mw,Yyb,26,e-g+1,12,1);for(i=new Tob(a.e.a);i.a<i.c.c.length;){h=Wv(Rob(i),61);h.e-=g;++d[h.e]}if(a.k){for(c=new Tob(a.k.c);c.a<c.c.c.length;){b=Wv(Rob(c),16);d[f++]+=b.a.c.length;if(d.length==f){break}}}return d}
function L4(a){var b,c,d,e;M4(a);J4(a);e=new HI(Uzb,Uzb);b=new HI(Vzb,Vzb);for(d=new Tob(a.a.b);d.a<d.c.c.length;){c=Wv(Rob(d),25);e.a=Qlb(e.a,c.j.d);e.b=Qlb(e.b,c.j.e);b.a=Nlb(b.a,c.j.d+c.j.c);b.b=Nlb(b.b,c.j.e+c.j.b)}vI(BI(a.d.d),zI(new HI(e.a,e.b)));vI(BI(a.d.e),EI(new HI(b.a,b.b),e));K4(a,e,b);a.a.a.c=xv(UF,syb,1,0,4,1);a.a.b.c=xv(UF,syb,1,0,4,1)}
function j1(a,b){var c,d,e,f,g,h,i,j,k,l;g=a.e;k=Wv(rJ(a,(Rib(),Qib)),20);l=0;if(k){i=0;for(f=k.mb();f.G();){e=Wv(f.H(),9);i=Nlb(i,e.j.b);l+=e.j.a}l+=b/2*(k.Y()-1);g.d+=i+b}c=Wv(rJ(a,Yhb),20);d=0;if(c){i=0;for(f=c.mb();f.G();){e=Wv(f.H(),9);i=Nlb(i,e.j.b);d+=e.j.a}d+=b/2*(c.Y()-1);g.a+=i+b}h=l>d?l:d;if(h>a.j.a){j=(h-a.j.a)/2;g.b=Nlb(g.b,j);g.c=Nlb(g.c,j)}}
function ST(a,b,c,d){var e,f,g,h,i,j,k,l,m,n;g=uI(b.d,c,d);for(l=new Tob(b.b);l.a<l.c.c.length;){k=Wv(Rob(l),9);vI(k.i,g);for(n=new Tob(k.f);n.a<n.c.c.length;){m=Wv(Rob(n),7);for(f=new Tob(m.e);f.a<f.c.c.length;){e=Wv(Rob(f),12);hJ(e.a,g);h=Wv(rJ(e,(eM(),CL)),44);!!h&&hJ(h,g);for(j=new Tob(e.b);j.a<j.c.c.length;){i=Wv(Rob(j),33);vI(i.i,g)}}}vU(a.b,k);k.a=a}}
function Q8(a,b){var c,d,e,f,g;a.c==null||a.c.length<b.c.length?(a.c=xv(KH,xAb,26,b.c.length,13,1)):dpb(a.c);a.a=new GU;d=0;for(g=new Tob(b);g.a<g.c.c.length;){e=Wv(Rob(g),9);e.k=d++}c=new aJ;for(f=new Tob(b);f.a<f.c.c.length;){e=Wv(Rob(f),9);if(!a.c[e.k]){R8(a,e);c.b==0||(Bxb(c.b!=0),Wv(c.a.a.c,20)).Y()<a.a.c.length?RI(c,a.a):SI(c,a.a);a.a=new GU}}return c}
function xfb(a,b,c){var d,e,f,g,h,i,j,k,l;d=sgb(a.g);j=vI(xI(a.i),a.a);k=vI(xI(b.i),b.a);e=vI(new II(j),CI(new GI(d),c));l=vI(new II(k),CI(new GI(d),c));g=CI(EI(new II(e),l),0.5);i=vI(vI(new II(l),g),CI(new GI(d),Tlb(g.a*g.a+g.b*g.b)));h=new ufb(Bv(tv(qz,1),Fzb,10,0,[j,e,i,l,k]));f=$eb(h,0.5,false);h.a=f;bfb(h,new Ffb(Bv(tv(qz,1),Fzb,10,0,[f,j,k])));return h}
function F7(a,b){var c,d,e,f,g;nI(b,'Network simplex',1);if(a.e.a.c.length<1){pI(b);return}for(f=new Tob(a.e.a);f.a<f.c.c.length;){e=Wv(Rob(f),61);e.e=0}g=a.e.a.c.length>=40;g&&Q7(a);H7(a);G7(a);c=K7(a);d=0;while(!!c&&d<a.f){E7(a,c,D7(a,c));c=K7(a);++d}g&&P7(a);a.a?B7(a,N7(a)):N7(a);a.b=null;a.d=null;a.p=null;a.c=null;a.g=null;a.i=null;a.n=null;a.o=null;pI(b)}
function uQ(a){var b,c,d,e,f,g,h,i,j,k;j=new vtb;e=(mp(),new ntb);for(h=0,i=a.length;h<i;++h){g=a[h];b=g.mc();j.a.db(b,j);b==null?Ltb(e.d,null,g):dub(e.e,b,g);k=gmb(b,(bmb(),b.lastIndexOf('.'))+1,b.length);if(!ttb(sQ,k)){j.a.db(k,j);k==null?Ltb(e.d,null,g):dub(e.e,k,g);stb(sQ,k)}}d=(hi(),Yj((f=(new Snb(j.a)).a.bb().mb(),new Ynb(f))));c=tj(e);return new RJ(d,c)}
function E7(a,b,c){var d,e,f;if(!b.e){throw new slb('Given leave edge is no tree edge.')}if(c.e){throw new slb('Given enter edge is a tree edge already.')}b.e=false;utb(a.p,b);c.e=true;stb(a.p,c);d=c.d.e-c.c.e-c.a;I7(a,c.d,b)||(d=-d);for(f=new Tob(a.e.a);f.a<f.c.c.length;){e=Wv(Rob(f),61);I7(a,e,b)||(e.e+=d)}a.j=1;dpb(a.c);O7(a,Wv(Rob(new Tob(a.e.a)),61));C7(a)}
function dU(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;if(a.V()){return new FI}j=0;l=0;for(e=a.mb();e.G();){d=Wv(e.H(),55);f=d.e;j=Nlb(j,f.a);l+=f.a*f.b}j=Nlb(j,Math.sqrt(l)*Wv(rJ(Wv(a.mb().H(),55),(Rib(),Rhb)),15).a);m=0;n=0;i=0;c=b;for(h=a.mb();h.G();){g=Wv(h.H(),55);k=g.e;if(m+k.a>j){m=0;n+=i+b;i=0}UT(g,m,n);c=Nlb(c,m+k.a);i=Nlb(i,k.b);m+=k.a+b}return new HI(c+b,n+i+b)}
function Nm(a,b,c,d){var e,f,g;g=new Sn(b,c);if(!a.a){a.a=a.e=g;Umb(a.b,b,new Rn(g));++a.c}else if(!d){a.e.b=g;g.d=a.e;a.e=g;e=Wv(Smb(a.b,b),126);if(!e){Umb(a.b,b,new Rn(g));++a.c}else{++e.a;f=e.c;f.c=g;g.e=f;e.c=g}}else{e=Wv(Smb(a.b,b),126);++e.a;g.d=d.d;g.e=d.e;g.b=d;g.c=d;!d.e?(Wv(Smb(a.b,b),126).b=g):(d.e.c=g);!d.d?(a.a=g):(d.d.b=g);d.d=g;d.e=g}++a.d;return g}
function hS(a){var b,c,d,e,f,g,h,i;if(a.e){throw new ulb((Gkb(nA),'The '+nA.j+Yzb))}a.d==(sK(),qK)&&gS(a,oK);for(c=new Tob(a.a.a);c.a<c.c.c.length;){b=Wv(Rob(c),78);b.f=0}for(g=new Tob(a.a.b);g.a<g.c.c.length;){f=Wv(Rob(g),25);f.r=Vzb;for(e=f.i.mb();e.G();){d=Wv(e.H(),25);++d.f.f}}a.b.Cc(a);for(i=new Tob(a.a.b);i.a<i.c.c.length;){h=Wv(Rob(i),25);h.p=true}return a}
function V1(a,b,c,d,e){var f,g,h,i;f=new uX(a);sX(f,(CX(),BX));sJ(f,(eM(),TL),(KM(),FM));sJ(f,(Rib(),uib),b.c.f);g=new RX;sJ(g,uib,b.c);QX(g,e);PX(g,f);sJ(b.c,Bib,f);h=new uX(a);sX(h,BX);sJ(h,TL,FM);sJ(h,uib,b.d.f);i=new RX;sJ(i,uib,b.d);QX(i,e);PX(i,h);sJ(b.d,Bib,h);dW(b,g);eW(b,i);Fxb(0,c.c.length);fxb(c.c,0,f);d.c[d.c.length]=h;sJ(f,aib,Elb(1));sJ(h,aib,Elb(1))}
function j2(a,b){var c,d,e,f,g;g=Wv(rJ(a.f,(eM(),TL)),28);f=a.g.e-b.g.e;if(f!=0||g==(KM(),HM)){return f}if(g==(KM(),EM)){c=Wv(rJ(a,UL),24);d=Wv(rJ(b,UL),24);if(!!c&&!!d){e=c.a-d.a;if(e!=0){return e}}}switch(a.g.e){case 1:return glb(a.i.a,b.i.a);case 2:return glb(a.i.b,b.i.b);case 3:return glb(b.i.a,a.i.a);case 4:return glb(b.i.b,a.i.b);default:throw new ulb(iAb);}}
function hfb(a){var b,c,d,e,f,g,h,i,j,k,l;h=new GU;f=Ixb(Yv(a.g.sb(a.g.Y()-1)));for(l=a.g.mb();l.G();){k=Yv(l.H());uU(h,0,f-(Dxb(k),k))}g=lJ(Xeb(a));j=new GU;e=new Tob(h);i=new GU;for(b=0;b<a.c-1;b++){vU(j,Yv(Rob(e)))}for(d=WI(g,0);d.b!=d.d.c;){c=Wv(_ub(d),10);vU(j,Yv(Rob(e)));vU(i,new sfb(c,j));Cxb(0,j.c.length);j.c.splice(0,1)}return new ffb(a.e,a.f,a.d,a.c,h,i)}
function zs(a,b,c,d,e){var f,g,h,i,j;f=b.$b(c,a.b);if(f<0){h=a.e;if(!h){e[0]=0;return As(a,c,d)}g=h.d;a.e=zs(h,b,c,d,e);e[0]==0&&++a.a;a.j=PH(a.j,d);return a.e.d==g?a:Gs(a)}else if(f>0){i=a.g;if(!i){e[0]=0;return Bs(a,c,d)}g=i.d;a.g=zs(i,b,c,d,e);e[0]==0&&++a.a;a.j=PH(a.j,d);return a.g.d==g?a:Gs(a)}e[0]=a.c;j=PH(a.c,d);Xb(RH(j,$xb)<=0);a.c+=d;a.j=PH(a.j,d);return a}
function iJ(b,c){var d,e,f,g,h,i;f=fmb(c,',|;|\\(|\\)|\\[|\\]|\\{|\\}| |\t|\n');_I(b);try{e=0;h=0;g=0;i=0;while(e<f.length){if(f[e]!=null&&pmb(hmb(f[e]))>0){h%2==0?(g=clb(f[e])):(i=clb(f[e]));h>0&&h%2!=0&&QI(b,new HI(g,i));++h}++e}}catch(a){a=OH(a);if(aw(a,130)){d=a;throw new slb('The given string does not match the expected format for vectors.'+d)}else throw NH(a)}}
function _bb(a,b,c){var d,e,f,g,h,i,j,k;e=true;for(g=new Tob(b.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);j=Vzb;for(i=new Tob(f.a);i.a<i.c.c.length;){h=Wv(Rob(i),9);k=Ixb(c.n[h.k])+Ixb(c.d[h.k])-h.e.d;d=Ixb(c.n[h.k])+Ixb(c.d[h.k])+h.j.b+h.e.a;if(k>j&&d>j){j=Ixb(c.n[h.k])+Ixb(c.d[h.k])+h.j.b+h.e.a}else{e=false;a.a&&(Fmb(),Emb);break}}if(!e){break}}a.a&&(Fmb(),Emb);return e}
function Jv(a){var b,c,d,e,f,g,h,i;if(isNaN(a)){return Rv(),Qv}if(a<-9223372036854775808){return Rv(),Pv}if(a>=9223372036854775807){return Rv(),Ov}e=false;if(a<0){e=true;a=-a}d=0;if(a>=dzb){d=hw(a/dzb);a-=d*dzb}c=0;if(a>=czb){c=hw(a/czb);a-=c*czb}b=hw(a);f=Ev(b,c,d);e&&(g=~f.l+1&azb,h=~f.m+(g==0?1:0)&azb,i=~f.h+(g==0&&h==0?1:0)&bzb,f.l=g,f.m=h,f.h=i,undefined);return f}
function JO(a){var b,c,d,e,f,g,h;e=DW(a);if(Qob(new Tob(e))){h=new VN(0,0,a.e.j.a,a.e.j.b);for(c=new Tob(e);c.a<c.c.c.length;){b=Wv(Rob(c),129);d=new VN(b.e.i.a,b.e.i.b,b.e.j.a,b.e.j.b);TN(h,d)}g=new FP((f=Wv(a.e,7).d,new EP(f.d,f.b,f.a,f.c)));g.d=-h.e;g.a=h.e+h.b-a.e.j.b;g.b=-h.d;g.c=h.d+h.c-a.e.j.a;Wv(a.e,7).d.b=g.b;Wv(a.e,7).d.d=g.d;Wv(a.e,7).d.c=g.c;Wv(a.e,7).d.a=g.a}}
function Y0(a){var b,c,d,e,f;for(f=new Tob(a.f);f.a<f.c.c.length;){e=Wv(Rob(f),7);for(d=new Tob(e.e);d.a<d.c.c.length;){c=Wv(Rob(d),12);if(gw(rJ(c.d.f,(Mjb(),vjb)))!==gw((Xib(),Vib))){throw new $J((b=lX(a),nAb+(b==null?Dlb(a.k):b)+"' has its layer constraint set to LAST or LAST_SEPARATE, but has "+'at least one outgoing edge. Connections between nodes with these '+qAb))}}}}
function Rfb(a,b,c,d){var e,f,g,h,i,j;for(f=new Tob(a);f.a<f.c.c.length;){e=Wv(Rob(f),12);g=e.c;if(b.a.R(g)){h=(fgb(),dgb)}else if(c.a.R(g)){h=(fgb(),egb)}else{throw new slb('Source port must be in one of the port sets.')}i=e.d;if(b.a.R(i)){j=(fgb(),dgb)}else if(c.a.R(i)){j=(fgb(),egb)}else{throw new slb('Target port must be in one of the port sets.')}vU(d,new lgb(e,h,j))}}
function bQ(a,b){var c,d,e,f,g,h;if('edges' in b.a){h=Pu(b,'edges');if(!h.hc()){throw new GQ("The 'edges' property of a node has to be an array.",h,b)}f=h.hc();for(g=0;g<f.a.length;++g){e=gu(f,g);if(!e.kc()){throw new GQ("All elements of the 'edges' property must be objects.",e,b)}aQ(a,e.kc())}}if(Mzb in b.a){d=Pu(b,Mzb).hc();for(g=0;g<d.a.length;++g){c=gu(d,g).kc();bQ(a,c)}}}
function fS(a){var b,c,d,e,f,g,h,i;for(d=new Tob(a.a.a);d.a<d.c.c.length;){c=Wv(Rob(d),78);c.g=null;for(g=(i=(new Snb(c.a.a)).a.bb().mb(),new Ynb(i));g.a.G();){e=(b=Wv(g.a.H(),21),Wv(b.yb(),25));BI(e.g);(!c.g||e.j.d<c.g.j.d)&&(c.g=e)}for(f=(h=(new Snb(c.a.a)).a.bb().mb(),new Ynb(h));f.a.G();){e=(b=Wv(f.a.H(),21),Wv(b.yb(),25));e.g.a=e.j.d-c.g.j.d;e.g.b=e.j.e-c.g.j.e}}return a}
function Nab(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;c=false;n=$yb*a.b.f*a.b.d;for(e=new Tob(b.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);j=new Tob(d.a);f=Wv(Rob(j),9);k=Uab(a.a[f.k]);while(j.a<j.c.c.length){h=Wv(Rob(j),9);l=Uab(a.a[h.k]);if(k!=l){m=Xjb(a.b,f,h);g=f.i.b+f.j.b+f.e.a+k.a+m;i=h.i.b-h.e.d+l.a;if(g>i+n){o=k.i+l.i;l.a=(l.i*l.a+k.i*k.a)/o;l.i=o;k.g=l;c=true}}f=h;k=l}}return c}
function XY(a){var b,c,d,e,f,g;if(gw(rJ(a,(eM(),TL)))===gw((KM(),GM))||gw(rJ(a,TL))===gw(FM)){for(g=new Tob(a.f);g.a<g.c.c.length;){f=Wv(Rob(g),7);if(f.g==(sN(),$M)||f.g==pN){return false}}}if(MM(Wv(rJ(a,TL),28))){for(e=nX(a,(sN(),ZM)).mb();e.G();){d=Wv(e.H(),7);if(d.b.c.length!=0){return false}}}for(c=Uh(mX(a));Cm(c);){b=Wv(Dm(c),12);if(b.c.f==b.d.f){return false}}return true}
function KW(a,b){var c,d,e,f,g,h,i,j,k;e=a.f;g=e.j.a;f=e.j.b;if(g<=0&&f<=0){return sN(),qN}j=a.i.a;k=a.i.b;h=a.j.a;c=a.j.b;switch(b.e){case 2:case 1:if(j<0){return sN(),rN}else if(j+h>g){return sN(),ZM}break;case 4:case 3:if(k<0){return sN(),$M}else if(k+c>f){return sN(),pN}}i=(j+h/2)/g;d=(k+c/2)/f;return i+d<=1&&i-d<=0?(sN(),rN):i+d>=1&&i-d>=0?(sN(),ZM):d<0.5?(sN(),$M):(sN(),pN)}
function pP(a,b,c,d,e,f,g){var h,i,j,k,l,m;m=new UN;for(j=b.mb();j.G();){h=Wv(j.H(),627);for(l=new Tob(sW(h));l.a<l.c.c.length;){k=Wv(Rob(l),129);if(gw(oW(k,(eM(),tL)))===gw((EK(),CK))){nP(m,k,false,d,e,f,g);TN(a,m)}}}for(i=c.mb();i.G();){h=Wv(i.H(),627);for(l=new Tob(sW(h));l.a<l.c.c.length;){k=Wv(Rob(l),129);if(gw(oW(k,(eM(),tL)))===gw((EK(),BK))){nP(m,k,true,d,e,f,g);TN(a,m)}}}}
function f8(a,b){var c,d,e,f,g,h,i,j;for(i=new Tob(b.f);i.a<i.c.c.length;){h=Wv(Rob(i),7);for(e=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[h.b,h.e]))))));Cm(e);){d=Wv(Dm(e),12);c=d.c==h?d.d:d.c;f=c.f;if(b==f){continue}j=Wv(rJ(d,(Rib(),Eib)),24).a;j<0&&(j=0);g=f.k;if(a.b[g]==0){if(d.d==c){a.a[g]-=j+1;a.a[g]<=0&&a.c[g]>0&&QI(a.e,f)}else{a.c[g]-=j+1;a.c[g]<=0&&a.a[g]>0&&QI(a.d,f)}}}}}
function tcb(a,b){var c,d,e,f,g,h,i,j,k;for(g=new Tob(b.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);for(j=new Tob(f.a);j.a<j.c.c.length;){i=Wv(Rob(j),9);k=new GU;h=0;for(e=Uh(iX(i));Cm(e);){c=Wv(Dm(e),12);Wv(rJ(c,(Rib(),Eib)),24).a>h&&(h=Wv(rJ(c,Eib),24).a)}for(d=Uh(iX(i));Cm(d);){c=Wv(Dm(d),12);i.d!=c.c.f.d&&Wv(rJ(c,(Rib(),Eib)),24).a==h&&vU(k,new RJ(c.c.f,c))}Gpb(k,a.c);uU(a.b,i.k,k)}}}
function ucb(a,b){var c,d,e,f,g,h,i,j,k;for(g=new Tob(b.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);for(j=new Tob(f.a);j.a<j.c.c.length;){i=Wv(Rob(j),9);k=new GU;h=0;for(e=Uh(mX(i));Cm(e);){c=Wv(Dm(e),12);Wv(rJ(c,(Rib(),Eib)),24).a>h&&(h=Wv(rJ(c,Eib),24).a)}for(d=Uh(mX(i));Cm(d);){c=Wv(Dm(d),12);i.d!=c.d.f.d&&Wv(rJ(c,(Rib(),Eib)),24).a==h&&vU(k,new RJ(c.d.f,c))}Gpb(k,a.c);uU(a.f,i.k,k)}}}
function g3(a){b3();var b,c,d,e,f,g,h,i,j,k;this.b=new i3;this.c=new GU;this.a=new GU;for(i=Seb(),j=0,k=i.length;j<k;++j){h=i[j];ssb(a3,h,new GU)}for(c=a.mb();c.G();){b=Wv(c.H(),75);xU(this.a,Zdb(b));b.g.a.Y()==0?Wv(qsb(a3,b.e),20).ib(b):vU(this.c,b)}for(f=(g=(new aob(a3)).a.bb().mb(),new fob(g));f.a.G();){e=(d=Wv(f.a.H(),21),Wv(d.zb(),20));Gpb(e,this.b)}Dpb(Wv(qsb(a3,(Ieb(),neb)),20))}
function E$(a,b){var c,d,e,f,g,h,i;i=Wv(rJ(b,(eM(),TL)),28);if(!(i==(KM(),GM)||i==FM)){return}f=(c=Wv(rJ(b,(Rib(),Xhb)),15).a,new HI(b.e.a+b.a.b+b.a.c+2*c,b.e.b+b.a.d+b.a.a+2*c)).b;for(h=new Tob(a.a);h.a<h.c.c.length;){g=Wv(Rob(h),9);if(g.g!=(CX(),xX)){continue}d=Wv(rJ(g,hib),32);if(d!=(sN(),ZM)&&d!=rN){continue}e=Ixb(Yv(rJ(g,Cib)));i==GM&&(e*=f);g.i.b=e-Wv(rJ(g,SL),10).b;fX(g,false,true)}}
function fZ(a,b){var c,d,e,f,g,h,i,j;c=new uX(a.d.c);sX(c,(CX(),wX));sJ(c,(eM(),TL),Wv(rJ(b,TL),28));sJ(c,JL,Wv(rJ(b,JL),86));c.k=a.d.b++;vU(a.b,c);c.j.b=b.j.b;c.j.a=0;j=(sN(),ZM);f=Ao(nX(b,j));for(i=new Tob(f);i.a<i.c.c.length;){h=Wv(Rob(i),7);PX(h,c)}g=new RX;QX(g,j);PX(g,b);g.i.a=c.j.a;g.i.b=c.j.b/2;e=new RX;QX(e,tN(j));PX(e,c);e.i.b=c.j.b/2;e.i.a=-e.j.a;d=new hW;dW(d,g);eW(d,e);return c}
function m3(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o;i=new Dh;Np(a,i);e=new deb(b);n=new GU;vU(n,(o=a.j,Wv(um(dq(!o?(a.j=new eq(a)):o)),7)));m=new GU;while(n.c.length!=0){h=Wv(Rob(new Tob(n)),7);m.c[m.c.length]=h;d=Sm(a,h);for(g=new Nqb(d.b.mb());g.b.G();){f=Wv(g.b.H(),12);if(beb(e,f,c)){l=Wv(Gd(i,f),20);for(k=l.mb();k.G();){j=Wv(k.H(),7);zU(m,j,0)!=-1||(n.c[n.c.length]=j,true)}}}BU(n,h)}return e}
function fmb(a,b){var c,d,e,f,g,h,i;c=RegExp(b,'g');h=xv($F,Txb,2,0,5,1);d=0;i=a;f=null;while(true){g=c.exec(i);if(g==null||i==''){h[d]=i;break}else{h[d]=gmb(i,0,g.index);i=gmb(i,g.index+g[0].length,(bmb(),i.length));c.lastIndex=0;if(f==i){h[d]=i.substr(0,1);i=imb(i,1,i.length-1)}f=i;++d}}if((bmb(),a.length)>0){e=h.length;while(e>0&&h[e-1]==''){--e}e<h.length&&(h.length=e,undefined)}return h}
function NO(a){var b,c,d,e,f,g;for(g=new Tob(AW(a.e));g.a<g.c.c.length;){f=Wv(Rob(g),161);switch(Wv(f.e,7).g.e){case 4:a.q.b=Nlb(a.q.b,(c=Wv(f.e,7).d,new EP(c.d,c.b,c.a,c.c)).c);break;case 2:a.q.c=Nlb(a.q.c,(d=Wv(f.e,7).d,new EP(d.d,d.b,d.a,d.c)).b);break;case 1:a.q.d=Nlb(a.q.d,(e=Wv(f.e,7).d,new EP(e.d,e.b,e.a,e.c)).a);break;case 3:a.q.a=Nlb(a.q.a,(b=Wv(f.e,7).d,new EP(b.d,b.b,b.a,b.c)).d);}}}
function Ns(a,b,c,d,e){var f,g,h;f=b.$b(c,a.b);if(f<0){g=a.e;if(!g){e[0]=0;return d>0?As(a,c,d):a}a.e=Ns(g,b,c,d,e);d==0&&e[0]!=0?--a.a:d>0&&e[0]==0&&++a.a;a.j=PH(a.j,d-e[0]);return Gs(a)}else if(f>0){h=a.g;if(!h){e[0]=0;return d>0?Bs(a,c,d):a}a.g=Ns(h,b,c,d,e);d==0&&e[0]!=0?--a.a:d>0&&e[0]==0&&++a.a;a.j=PH(a.j,d-e[0]);return Gs(a)}e[0]=a.c;if(d==0){return Fs(a)}a.j=PH(a.j,d-a.c);a.c=d;return a}
function Q7(a){var b,c,d,e,f,g,h;a.o=new Uvb;d=new aJ;for(g=new Tob(a.e.a);g.a<g.c.c.length;){f=Wv(Rob(g),61);m7(f).c.length==1&&(TI(d,f,d.c.b,d.c),true)}while(d.b!=0){f=Wv(d.b==0?null:(Bxb(d.b!=0),$I(d,d.a.a)),61);if(m7(f).c.length==0){continue}b=Wv(yU(m7(f),0),89);c=f.g.c.length>0;h=c7(b,f);c?p7(h.c,b):p7(h.g,b);m7(h).c.length==1&&(TI(d,h,d.c.b,d.c),true);e=new RJ(f,b);Tvb(a.o,e);BU(a.e.a,f)}}
function Hs(a,b,c,d,e){var f,g,h;f=b.$b(c,a.b);if(f<0){g=a.e;if(!g){e[0]=0;return a}a.e=Hs(g,b,c,d,e);if(e[0]>0){if(d>=e[0]){--a.a;a.j=XH(a.j,e[0])}else{a.j=XH(a.j,d)}}return e[0]==0?a:Gs(a)}else if(f>0){h=a.g;if(!h){e[0]=0;return a}a.g=Hs(h,b,c,d,e);if(e[0]>0){if(d>=e[0]){--a.a;a.j=XH(a.j,e[0])}else{a.j=XH(a.j,d)}}return Gs(a)}e[0]=a.c;if(d>=a.c){return Fs(a)}else{a.c-=d;a.j=XH(a.j,d);return a}}
function BQ(a,b,c){var d,e,f,g,h,i,j,k;for(i=new Tob(c.b);i.a<i.c.c.length;){h=Wv(Rob(i),9);g=Wv(rJ(h,(Rib(),sib)),55);if(g){k=BQ(a,b,g);h.j.a=(f=Wv(rJ(k,Xhb),15).a,new HI(k.e.a+k.a.b+k.a.c+2*f,k.e.b+k.a.d+k.a.a+2*f)).a;h.j.b=(e=Wv(rJ(k,Xhb),15).a,new HI(k.e.a+k.a.b+k.a.c+2*e,k.e.b+k.a.d+k.a.a+2*e)).b}}j=new sI;d=$v(rJ(c,(eM(),kL)));d!=null&&emb(d,'de.cau.cs.kieler.fixed')?JP(c,j):ZQ(b,c,j);return c}
function bR(a){var b,c,d,e,f,g,h,i;h=Wv(rJ(a,(eM(),aM)),18);i=Wv(rJ(a,bM),18);d=Wv(rJ(a,(Rib(),Xhb)),15).a;a.d.a+=d;a.d.b+=d;a.e.a+=2*d;a.e.b+=2*d;sJ(a,Xhb,new llb(0));e=(c=Wv(rJ(a,Xhb),15).a,new HI(a.e.a+a.a.b+a.a.c+2*c,a.e.b+a.a.d+a.a.a+2*c));b=new II(e);if(h.kb((DN(),zN))){g=Wv(rJ(a,IL),15).a;f=Wv(rJ(a,HL),15).a;if(i.kb((MN(),KN))){g<=0&&(g=20);f<=0&&(f=20)}b.a=Nlb(e.a,g);b.b=Nlb(e.b,f)}cR(a,e,b)}
function rV(a,b,c){var d,e,f,g,h,i,j,k;if(b.k==0){b.k=1;g=c;if(!c){e=new GU;f=(d=Wv(Hkb(Kz),11),new atb(d,Wv(exb(d,d.length),11),0));g=new RJ(e,f)}Wv(g.a,20).ib(b);b.g==(CX(),xX)&&Wv(g.b,18).ib(Wv(rJ(b,(Rib(),hib)),32));for(i=new Tob(b.f);i.a<i.c.c.length;){h=Wv(Rob(i),7);for(k=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[new fY(h),new lY(h)]))))));Cm(k);){j=Wv(Dm(k),7);rV(a,j.f,g)}}return g}return null}
function QW(a,b,c,d){var e,f,g,h,i;i=new II(b.i);i.a+=b.j.a/2;i.b+=b.j.b/2;h=Wv(rJ(b,(Rib(),tib)),15).a;f=a.e;g=a.a;e=a.d;switch(Wv(rJ(b,hib),32).e){case 1:i.a+=g.b+e.a-c/2;i.b=-d-h;b.i.b=-(g.d+h+e.b);break;case 2:i.a=f.a+g.b+g.c+h;i.b+=g.d+e.b-d/2;b.i.a=f.a+g.c+h-e.a;break;case 3:i.a+=g.b+e.a-c/2;i.b=f.b+g.d+g.a+h;b.i.b=f.b+g.a+h-e.b;break;case 4:i.a=-c-h;i.b+=g.d+e.b-d/2;b.i.a=-(g.b+h+e.a);}return i}
function $Q(a,b){var c,d,e,f,g,h,i;for(f=new Tob(b.b);f.a<f.c.c.length;){e=Wv(Rob(f),9);g=rJ(e,(Rib(),uib));if(aw(g,7)){h=Wv(g,7);i=QW(b,e,h.j.a,h.j.b);h.i.a=i.a;h.i.b=i.b;QX(h,Wv(rJ(e,hib),32))}}c=(d=Wv(rJ(b,(Rib(),Xhb)),15).a,new HI(b.e.a+b.a.b+b.a.c+2*d,b.e.b+b.a.d+b.a.a+2*d));if(Wv(rJ(b,jib),18).kb((ohb(),hhb))){sJ(a,(eM(),TL),(KM(),FM));Wv(rJ(hX(a),jib),18).ib(khb);WW(a,c,false)}else{WW(a,c,true)}}
function VW(a,b,c){var d,e,f,g,h;h=null;switch(b.e){case 1:for(e=new Tob(a.f);e.a<e.c.c.length;){d=Wv(Rob(e),7);if(Ckb(Ixb(Xv(rJ(d,(Rib(),kib)))))){return d}}h=new RX;sJ(h,(Rib(),kib),(xkb(),xkb(),wkb));break;case 2:for(g=new Tob(a.f);g.a<g.c.c.length;){f=Wv(Rob(g),7);if(Ckb(Ixb(Xv(rJ(f,(Rib(),yib)))))){return f}}h=new RX;sJ(h,(Rib(),yib),(xkb(),xkb(),wkb));}if(h){PX(h,a);QX(h,c);LW(h.i,a.j,c)}return h}
function pk(a,b){var c,d,e,f,g,h,i;_b(b);Xb(a.a.t(b.a));d=a.b;f=a.e;g=a.d;if(a.b){if(b.b){c=a.a.$b(a.e,b.e);if(c<0||c==0&&b.d==(Gh(),Fh)){f=b.e;g=b.d}}}else{d=b.b;f=b.e;g=b.d}e=a.c;h=a.g;i=a.f;if(a.c){if(b.c){c=a.a.$b(a.g,b.g);if(c>0||c==0&&b.f==(Gh(),Fh)){h=b.g;i=b.f}}}else{e=b.c;h=b.g;i=b.f}if(d&&e){c=a.a.$b(f,h);if(c>0||c==0&&g==(Gh(),Fh)&&i==(Gh(),Fh)){f=h;g=(Gh(),Fh);i=Eh}}return new sk(a.a,d,f,g,e,h,i)}
function h0(a,b,c,d){var e,f,g,h,i,j,k;if(c.c.f==b.f){return}e=new uX(a);sX(e,(CX(),zX));sJ(e,(Rib(),uib),c);sJ(e,(eM(),TL),(KM(),FM));d.c[d.c.length]=e;g=new RX;PX(g,e);QX(g,(sN(),rN));h=new RX;PX(h,e);QX(h,ZM);eW(c,g);f=new hW;qJ(f,c);sJ(f,CL,null);dW(f,h);eW(f,b);j0(e,g,h);j=new Fnb(c.b,0);while(j.b<j.d.Y()){i=(Bxb(j.b<j.d.Y()),Wv(j.d.sb(j.c=j.b++),33));k=Wv(rJ(i,tL),107);if(k==(EK(),BK)){vnb(j);vU(f.b,i)}}}
function Pfb(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q;f=c+(b.n+1)*a.a;g=b.b;e=new HI(f,g);for(i=(k=(new Snb(b.c.a)).a.bb().mb(),new Ynb(k));i.a.G();){h=(j=Wv(i.a.H(),21),Wv(j.yb(),12));o=MX(h.d);l=MX(h.c);n=new HI(f,l.b);q=new HI(f,o.b);m=new HI(c-10,l.b);p=new HI(d,o.b);o.a>=d&&l.a>=d&&(m.a=d);o.a<=c&&l.a<=c&&(p.a=c-10);b.c.a.Y()==1?fJ(h.a,Bv(tv(qz,1),Fzb,10,0,[m,n,q,p])):fJ(h.a,Bv(tv(qz,1),Fzb,10,0,[m,n,e,q,p]))}}
function cW(a,b){var c,d,e,f,g,h;f=a.c;g=a.d;dW(a,null);eW(a,null);b&&Ckb(Ixb(Xv(rJ(g,(Rib(),kib)))))?dW(a,VW(g.f,(djb(),bjb),(sN(),ZM))):dW(a,g);b&&Ckb(Ixb(Xv(rJ(f,(Rib(),yib)))))?eW(a,VW(f.f,(djb(),ajb),(sN(),rN))):eW(a,f);for(d=new Tob(a.b);d.a<d.c.c.length;){c=Wv(Rob(d),33);e=Wv(rJ(c,(eM(),tL)),107);e==(EK(),CK)?sJ(c,tL,BK):e==BK&&sJ(c,tL,CK)}h=Ckb(Ixb(Xv(rJ(a,(Rib(),Iib)))));sJ(a,Iib,(xkb(),h?vkb:wkb));a.a=lJ(a.a)}
function efb(a){var b,c,d,e,f,g;Teb(this);for(c=a.Y()-1;c<3;c++){a.rb(0,Wv(a.sb(0),10))}if(a.Y()<4){throw new slb('At (least dimension + 1) control points are necessary!')}else{this.c=3;this.e=true;this.f=true;this.d=false;Ueb(this,a.Y()+this.c-1);g=new GU;f=this.g.mb();for(b=0;b<this.c-1;b++){vU(g,Yv(f.H()))}for(e=a.mb();e.G();){d=Wv(e.H(),10);vU(g,Yv(f.H()));this.b.ib(new sfb(d,g));Cxb(0,g.c.length);g.c.splice(0,1)}}}
function scb(a){var b,c,d,e,f,g,h,i,j,k,l;l=new rcb;l.d=0;for(g=new Tob(a.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);l.d+=f.a.c.length}d=0;e=0;l.a=xv(mw,Yyb,26,a.c.c.length,12,1);j=0;l.e=xv(mw,Yyb,26,l.d,12,1);for(c=new Tob(a.c);c.a<c.c.c.length;){b=Wv(Rob(c),16);b.k=d++;l.a[b.k]=e++;k=0;for(i=new Tob(b.a);i.a<i.c.c.length;){h=Wv(Rob(i),9);h.k=j++;l.e[h.k]=k++}}l.c=new wcb(l);l.b=Do(l.d);tcb(l,a);l.f=Do(l.d);ucb(l,a);return l}
function Lab(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;h=xv(mw,Yyb,26,b.c.c.length,12,1);j=xv(pB,uyb,132,b.c.c.length,0,1);for(l=a.a,m=0,n=l.length;m<n;++m){k=l[m];p=0;for(g=new Tob(k.f);g.a<g.c.c.length;){e=Wv(Rob(g),9);i=e.g;d=rY(e.d);++h[d];o=a.b.a*a.b.d;h[d]>0&&!!j[d]&&(o=Wjb(a.b,j[d],i));p=Nlb(p,e.d.c.b+o)}for(f=new Tob(k.f);f.a<f.c.c.length;){e=Wv(Rob(f),9);e.i.b=p+e.e.d;c=e.d;c.c.b=p+e.e.d+e.j.b+e.e.a;j[zU(c.b.c,c,0)]=e.g}}}
function n$(a){var b,c,d,e,f,g,h,i,j,k;for(i=new Tob(a.a);i.a<i.c.c.length;){h=Wv(Rob(i),9);if(h.g!=(CX(),xX)){continue}e=Wv(rJ(h,(Rib(),hib)),32);if(e==(sN(),ZM)||e==rN){for(d=Uh(gX(h));Cm(d);){c=Wv(Dm(d),12);b=c.a;if(b.b==0){continue}j=c.c;if(j.f==h){f=(Bxb(b.b!=0),Wv(b.a.a.c,10));f.b=MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a])).b}k=c.d;if(k.f==h){g=(Bxb(b.b!=0),Wv(b.c.b.c,10));g.b=MI(Bv(tv(qz,1),Fzb,10,0,[k.f.i,k.i,k.a])).b}}}}}
function U9(a,b,c,d){var e,f,g,h,i,j;g=new _9(a,b,c);i=new Fnb(d,0);e=false;while(i.b<i.d.Y()){h=(Bxb(i.b<i.d.Y()),Wv(i.d.sb(i.c=i.b++),102));if(h==b||h==c){vnb(i)}else if(!e&&Ixb(W9(h.g,h.d[0]).a)>Ixb(W9(g.g,g.d[0]).a)){Bxb(i.b>0);i.a.sb(i.c=--i.b);Anb(i,g);e=true}else if(!!h.e&&h.e.Y()>0){f=(!h.e&&(h.e=new GU),h.e).nb(b);j=(!h.e&&(h.e=new GU),h.e).nb(c);if(f||j){(!h.e&&(h.e=new GU),h.e).ib(g);++g.c}}}e||(d.c[d.c.length]=g,true)}
function s2(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o;if(c.d.f==b.f){return}e=new uX(a);sX(e,(CX(),zX));sJ(e,(Rib(),uib),c);sJ(e,(eM(),TL),(KM(),FM));d.c[d.c.length]=e;g=new RX;PX(g,e);QX(g,(sN(),rN));h=new RX;PX(h,e);QX(h,ZM);i=c.d;eW(c,g);f=new hW;qJ(f,c);sJ(f,CL,null);dW(f,h);eW(f,i);j=Wv(yU(g.b,0),12).c;k=j.f;l=k.g;m=Wv(yU(h.e,0),12).d;n=m.f;o=n.g;l==zX?sJ(e,qib,Wv(rJ(k,qib),7)):sJ(e,qib,j);o==zX?sJ(e,rib,Wv(rJ(n,rib),7)):sJ(e,rib,m)}
function $6(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;if(h=a.b[b],i=a.b[c],(j=Wv(rJ(h,(Rib(),oib)),20),!!j&&j.Y()!=0&&j.kb(i))||(k=h.g!=(CX(),zX)&&i.g!=zX,l=Wv(rJ(h,nib),9),m=Wv(rJ(i,nib),9),n=!!l&&l!=h||!!m&&m!=i,o=l!=m,p=_6(h,(sN(),$M)),q=_6(i,pN),r=n&&o||p||q,k&&r)||h.g==(CX(),BX)&&i.g==AX||i.g==(CX(),BX)&&h.g==AX){return false}g=a.b[b];d=a.b[c];m6(a.c,g,d);G6(a.d,g,d);f=M5(a.a,g,d)+a.c.d+a.d.d;e=M5(a.a,d,g)+a.c.b+a.d.b;return f>e}
function v2(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;g=b;m=b.d;k=b.c.f;n=b.d.f;l=rY(k.d);o=rY(n.d);for(h=l;h<o;h++){e=new uX(a);sX(e,(CX(),zX));sJ(e,(Rib(),uib),g);sJ(e,(eM(),TL),(KM(),FM));i=Wv(yU(a.c,h+1),16);rX(e,i);p=Wv(rJ(g,dM),15).a;if(p<0){p=0;sJ(g,dM,new llb(p))}e.j.b=p;j=Math.floor(p/2);d=new RX;QX(d,(sN(),rN));PX(d,e);d.i.b=j;f=new RX;QX(f,ZM);PX(f,e);f.i.b=j;eW(g,d);c=new hW;qJ(c,g);sJ(c,CL,null);dW(c,f);eW(c,m);w2(e,g,c);g=c}}
function Qeb(a,b){Ieb();if(a==b){return Reb(a)}switch(a.e){case 1:switch(b.e){case 4:return neb;case 1:return meb;case 2:return jeb;case 3:return qeb;}case 2:switch(b.e){case 1:return jeb;case 2:return ieb;case 3:return peb;case 4:return keb;}case 3:switch(b.e){case 2:return peb;case 3:return oeb;case 4:return Heb;case 1:return qeb;}case 4:switch(b.e){case 3:return Heb;case 4:return Geb;case 1:return neb;case 2:return keb;}}return Feb}
function s$(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;l=new Wub;e=null;for(g=new Tob(a.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);for(i=new Tob(f.a);i.a<i.c.c.length;){h=Wv(Rob(i),9);if(h.g!=(CX(),xX)){continue}k=Wv(rJ(h,(Rib(),gib)),9);if(k){r$(k,l);m=new RX;PX(m,h);n=Wv(rJ(h,hib),32);QX(m,n);o=Wv(yU(k.f,0),7);p=new hW;dW(p,m);eW(p,o)}}e=f}for(c=(j=(new Snb(l.a)).a.bb().mb(),new Ynb(j));c.a.G();){b=(d=Wv(c.a.H(),21),Wv(d.yb(),9));rX(b,e)}return l}
function RV(a,b,c){var d,e,f,g,h,i,j,k,l;e=new GU;for(j=new Tob(b.b);j.a<j.c.c.length;){i=Wv(Rob(j),9);h=Wv(rJ(i,(Rib(),sib)),55);if(h){d=RV(a,h,i);xU(e,d);PV(a,h,i);if(Wv(rJ(h,jib),18).kb((ohb(),hhb))){for(l=new Tob(i.f);l.a<l.c.c.length;){k=Wv(Rob(l),7);if(Smb(a.b,k)==null){f=NW(k,(KM(),IM),k.g,-(k.b.c.length-k.e.c.length),k.j,Wv(rJ(h,(eM(),sL)),59),h);sJ(f,uib,k);Umb(a.b,k,f);vU(h.b,f)}}}}}g=new GU;OV(a,b,c,e,g);!!c&&QV(a,b,c,g);return g}
function Obb(a){var b,c,d,e,f,g,h,i,j,k,l,m;b=ecb(a);for(k=(h=(new Snb(b)).a.bb().mb(),new Ynb(h));k.a.G();){j=(e=Wv(k.a.H(),21),Wv(e.yb(),9));l=j.e.d;m=j.j.b+j.e.a;a.d[j.k]=0;c=j;while((f=a.a[c.k])!=j){d=gcb(c,f);a.c==(Gbb(),Ebb)?(i=d.d.i.b+d.d.a.b-d.c.i.b-d.c.a.b):(i=d.c.i.b+d.c.a.b-d.d.i.b-d.d.a.b);g=Ixb(a.d[c.k])+i;a.d[f.k]=g;l=Nlb(l,f.e.d-g);m=Nlb(m,g+f.j.b+f.e.a);c=f}c=j;do{a.d[c.k]=Ixb(a.d[c.k])+l;c=a.a[c.k]}while(c!=j);a.b[j.k]=l+m}}
function Gcb(a,b,c){var d,e,f,g,h,i,j,k;d=a.a.k==(Lbb(),Kbb)?Uzb:Vzb;h=Hcb(a,new Fcb(b,c));if(!h.a&&h.c){QI(a.d,h);return d}else if(h.a){e=h.a.c;i=h.a.d;if(c){j=a.a.c==(Gbb(),Fbb)?i:e;f=a.a.c==Fbb?e:i;g=a.a.f[f.f.k];k=Ixb(a.a.n[g.k])+Ixb(a.a.d[f.f.k])+f.i.b+f.a.b-Ixb(a.a.d[j.f.k])-j.i.b-j.a.b}else{j=a.a.c==(Gbb(),Ebb)?i:e;f=a.a.c==Ebb?e:i;k=Ixb(a.a.n[a.a.f[f.f.k].k])+Ixb(a.a.d[f.f.k])+f.i.b+f.a.b-Ixb(a.a.d[j.f.k])-j.i.b-j.a.b}return k}return d}
function FY(a){var b,c,d,e,f;sJ(a.g,(Rib(),Thb),Eo(a.g.c));for(b=1;b<a.c.c.length-1;++b){sJ(Wv(yU(a.c,b),9),(eM(),JL),(oM(),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[mM,fM]))))}for(d=WI(Eo(a.g.c),0);d.b!=d.d.c;){c=Wv(_ub(d),33);e=Wv(rJ(a.g,(eM(),JL)),86);if(Xe(e,Vsb((oM(),kM),Bv(tv(Gz,1),uyb,41,0,[gM,mM]))));else if(Xe(e,Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[iM,mM])))){vU(a.e.c,c);BU(a.g.c,c);f=new MY(a,c);sJ(a.g,Uhb,f)}else{GY(a,c);vU(a.i,a.d);sJ(a.g,Uhb,EY(a.i))}}}
function OW(a,b,c,d){var e,f,g,h,i,j,k;f=PW(d);h=Ckb(Ixb(Xv(rJ(d,(Mjb(),xjb)))));if((h||Ckb(Ixb(Xv(rJ(a,(eM(),AL))))))&&!MM(Wv(rJ(a,(eM(),TL)),28))){e=vN(f);i=VW(a,c,c==(djb(),bjb)?e:tN(e))}else{i=new RX;PX(i,a);k=i.i;k.a=b.a-a.i.a;k.b=b.b-a.i.b;wI(k,a.j.a,a.j.b);QX(i,KW(i,f));g=Wv(rJ(d,(Rib(),jib)),18);j=i.g;switch(f.e){case 2:case 1:(j==(sN(),$M)||j==pN)&&g.ib((ohb(),lhb));break;case 4:case 3:(j==(sN(),ZM)||j==rN)&&g.ib((ohb(),lhb));}}return i}
function G2(a){var b,c,d,e,f,g,h,i;d=Nl(Ao(a.a));e=(b=Wv(Hkb(_E),11),new atb(b,Wv(exb(b,b.length),11),0));while(d.a.G()||d.b.mb().G()){c=Wv(nm(d),12);h=c.c.g;i=c.d.g;if(h==(sN(),qN)){if(i!=qN){g=Reb(i);sJ(c,(Rib(),Mib),g);QX(c.c,i);Wsb(e,g);d.a.I()}}else{if(i==qN){g=Reb(h);sJ(c,(Rib(),Mib),g);QX(c.d,h);Wsb(e,g);d.a.I()}else{g=Qeb(h,i);sJ(c,(Rib(),Mib),g);Wsb(e,g);d.a.I()}}}e.c==1?(f=Wv(itb(new jtb(e)),60)):(f=(Ieb(),Feb));aeb(a,f,false);return f}
function AI(b,c){var d,e,f,g;f=0;while(f<(bmb(),c.length)&&LI(c.charCodeAt(f),fzb)){++f}d=c.length;while(d>0&&LI(c.charCodeAt(d-1),gzb)){--d}if(f>=d){throw new slb('The given string does not contain any numbers.')}g=fmb(c.substr(f,d-f),',|;|\r|\n');if(g.length!=2){throw new slb('Exactly two numbers are expected, '+g.length+' were found.')}try{b.a=clb(hmb(g[0]));b.b=clb(hmb(g[1]))}catch(a){a=OH(a);if(aw(a,130)){e=a;throw new slb(hzb+e)}else throw NH(a)}}
function Qdb(a,b,c){var d,e,f,g,h,i,j,k,l;i=c+b.d.c.a;for(l=new Tob(b.f);l.a<l.c.c.length;){k=Wv(Rob(l),7);d=MI(Bv(tv(qz,1),Fzb,10,0,[k.f.i,k.i,k.a]));f=new HI(0,d.b);if(k.g==(sN(),ZM)){f.a=i}else if(k.g==rN){f.a=c}else{continue}if(d.a==f.a){continue}e=k.e.c.length+k.b.c.length>1;for(h=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[k.b,k.e]))))));Cm(h);){g=Wv(Dm(h),12);j=g.c==k?g.d:g.c;Jlb(MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a])).b-f.b)>1&&Odb(a,g,f,e,k)}}}
function FR(a,b){var c,d,e,f,g,h;for(g=new rnb((new inb(a.f.b)).a);g.b;){f=pnb(g);e=Wv(f.yb(),251);if(b==1){if(e.yc()!=(sK(),rK)&&e.yc()!=nK){continue}}else{if(e.yc()!=(sK(),oK)&&e.yc()!=pK){continue}}d=Wv(Wv(f.zb(),27).b,25);h=Wv(Wv(f.zb(),27).a,78);c=h.c;switch(e.yc().e){case 2:d.j.d=a.e.a;d.j.c=Nlb(1,d.j.c+c);break;case 1:d.j.d=d.j.d+c;d.j.c=Nlb(1,d.j.c-c);break;case 4:d.j.e=a.e.b;d.j.b=Nlb(1,d.j.b+c);break;case 3:d.j.e=d.j.e+c;d.j.b=Nlb(1,d.j.b-c);}}}
function bdb(a,b,c,d,e){var f,g,h,i,j,k,l,m,n;m=(mp(),new ntb);h=new GU;adb(a,c,a.d.Mc(),h,m);adb(a,d,a.d.Nc(),h,m);i=new Fnb(h,0);while(i.b<i.d.Y()){f=(Bxb(i.b<i.d.Y()),Wv(i.d.sb(i.c=i.b++),80));j=new Fnb(h,i.b);while(j.b<j.d.Y()){g=(Bxb(j.b<j.d.Y()),Wv(j.d.sb(j.c=j.b++),80));gdb(f,g,a.a)}}ddb(h,Wv(rJ(b,(Rib(),Gib)),154));idb(h);n=-1;for(l=new Tob(h);l.a<l.c.c.length;){k=Wv(Rob(l),80);if(Jlb(k.k-k.a)<dAb){continue}n=Plb(n,k.i);a.d.Kc(k,e)}a.b.a.Q();return n+1}
function r3(a,b,c){var d,e;e=new II(b);d=new II(a.j);switch(c.e){case 1:case 8:case 7:uI(e,-d.a/2,-d.b);uI(b,0,-(0.5+d.b));break;case 3:case 4:case 5:uI(e,-d.a/2,0);uI(b,0,0.5+d.b);break;case 0:uI(e,-d.a/2,-d.b);uI(b,0,-(0.5+-d.b));break;case 10:case 2:uI(e,0,-d.b/2);uI(b,0,-(0.5+d.b));break;case 6:uI(e,-d.a,d.b/2);uI(b,0,-(0.5+d.b));break;case 9:uI(e,-d.a/2,0);uI(b,0,-(0.5+d.b));break;case 11:uI(e,-d.a,-d.b/2);uI(b,0,-(0.5+d.b));}vI(BI(a.i),e);return new Cfb(a)}
function Gmb(a,b,c,d,e){Fmb();var f,g,h,i,j,k,l;Exb(a,'src');Exb(c,'dest');k=tb(a);h=tb(c);Axb((k.g&4)!=0,'srcType is not an array');Axb((h.g&4)!=0,'destType is not an array');j=k.c;f=h.c;Axb((j.g&1)!=0?j==f:(f.g&1)==0,"Array types don't match");l=a.length;i=c.length;if(b<0||d<0||e<0||b+e>l||d+e>i){throw new nkb}if(((j.g&1)==0||(j.g&4)!=0)&&k!=h){if(a===c&&b<d){b+=e;for(g=d+e;g-->d;){c[g]=a[--b]}}else{for(g=d+e;d<g;){c[d++]=a[b++]}}}else e>0&&dxb(a,b,c,d,e,true)}
function cR(a,b,c){var d,e,f,g,h;d=Wv(rJ(a,(Mjb(),jjb)),18);c.a>b.a&&(d.kb((zgb(),tgb))?(a.d.a+=(c.a-b.a)/2):d.kb(vgb)&&(a.d.a+=c.a-b.a));c.b>b.b&&(d.kb((zgb(),xgb))?(a.d.b+=(c.b-b.b)/2):d.kb(wgb)&&(a.d.b+=c.b-b.b));if(Wv(rJ(a,(Rib(),jib)),18).kb((ohb(),hhb))&&(c.a>b.a||c.b>b.b)){for(h=new Tob(a.b);h.a<h.c.c.length;){g=Wv(Rob(h),9);if(g.g==(CX(),xX)){e=Wv(rJ(g,hib),32);e==(sN(),ZM)?(g.i.a+=c.a-b.a):e==pN&&(g.i.b+=c.b-b.b)}}}f=a.a;a.e.a=c.a-f.b-f.c;a.e.b=c.b-f.d-f.a}
function Ms(a,b,c,d,e,f){var g,h,i;g=b.$b(c,a.b);if(g<0){h=a.e;if(!h){f[0]=0;if(d==0&&e>0){return As(a,c,e)}return a}a.e=Ms(h,b,c,d,e,f);if(f[0]==d){e==0&&f[0]!=0?--a.a:e>0&&f[0]==0&&++a.a;a.j=PH(a.j,e-f[0])}return Gs(a)}else if(g>0){i=a.g;if(!i){f[0]=0;if(d==0&&e>0){return Bs(a,c,e)}return a}a.g=Ms(i,b,c,d,e,f);if(f[0]==d){e==0&&f[0]!=0?--a.a:e>0&&f[0]==0&&++a.a;a.j=PH(a.j,e-f[0])}return Gs(a)}f[0]=a.c;if(d==a.c){if(e==0){return Fs(a)}a.j=PH(a.j,e-a.c);a.c=e}return a}
function gfb(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q;i=a.e;n=a.f;g=a.d;o=a.c;k=o-1;p=a.g;l=Eo(a.g.xb(1,a.g.Y()-1));j=new GU;for(c=0;c<a.b.Y()-1;c++){h=CI(EI(xI(Wv(a.b.sb(c+1),92).a),Wv(a.b.sb(c),92).a),o/(Ixb(Yv(p.sb(c+o)))-Ixb(Yv(p.sb(c)))));j.c[j.c.length]=h}q=new GU;f=WI(l,0);m=new GU;for(b=0;b<k-1;b++){vU(q,Yv(_ub(f)))}for(e=new Tob(j);e.a<e.c.c.length;){d=Wv(Rob(e),10);vU(q,Yv(_ub(f)));vU(m,new sfb(d,q));Cxb(0,q.c.length);q.c.splice(0,1)}return new ffb(i,n,g,k,l,m)}
function fP(a){this.q=new AP;this.p=new AP;this.o=xv(mw,Yyb,26,(sN(),Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN])).length,12,1);this.i=xv(mw,Yyb,26,Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN]).length,12,1);this.j=xv(kw,hyb,26,Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN]).length,12,1);this.n=xv(kw,hyb,26,Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN]).length,12,1);this.g=xv(Hz,uyb,100,Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN]).length,0,1);this.c=new vsb(Oz);this.e=a;$ob(this.o);$ob(this.i);Yob(this.n,0)}
function _Q(a,b){var c,d,e,f,g,h,i,j,k,l;g=b.i!=null&&!b.b;g||nI(b,'Component Layout',1);c=Wv(rJ(a,(Rib(),Fib)),20);f=1/c.Y();if(Ckb(Ixb(Xv(rJ(a,(eM(),rL)))))){l=0;for(k=c.mb();k.G();){j=Wv(k.H(),31);++l;Jkb(tb(j));j.sc(a,rI(b,f))}}else{for(k=c.mb();k.G();){j=Wv(k.H(),31);j.sc(a,rI(b,f))}}for(e=new Tob(a.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);xU(a.b,d.a);d.a.c=xv(UF,syb,1,0,4,1)}for(i=new Tob(a.b);i.a<i.c.c.length;){h=Wv(Rob(i),9);rX(h,null)}a.c.c=xv(UF,syb,1,0,4,1);g||pI(b)}
function S9(a,b){var c,d,e,f,g,h,i,j,k,l,m;for(g=new Tob(b);g.a<g.c.c.length;){e=Wv(Rob(g),102);e.e=null;e.c=0}h=null;for(f=new Tob(b);f.a<f.c.c.length;){e=Wv(Rob(f),102);k=e.d[0];for(m=Wv(rJ(k,(Rib(),oib)),20).mb();m.G();){l=Wv(m.H(),9);(!e.e&&(e.e=new GU),e.e).ib(a.b[l.d.k][l.k]);++a.b[l.d.k][l.k].c}if(k.g==(CX(),AX)){if(h){for(j=An(new Bn(a.c,h),0);j.c;){i=Wv(ko(j),9);for(d=An(new Bn(a.c,k),0);d.c;){c=Wv(ko(d),9);Y9(a.b[i.d.k][i.k]).ib(a.b[c.d.k][c.k]);++a.b[c.d.k][c.k].c}}}h=k}}}
function gQ(a,b,c,d){var e,f,g,h,i,j;SP(b);f=Wv(rJ(d,(Rib(),jib)),18);h=(eM(),KL).b;if(h in b.a&&Pu(b,h).ic().a){return}i=new RX;sJ(i,uib,b);PX(i,c);g=Wv(Pu(b,'id'),97);Vmb(a.k,g.a,i);Umb(a.n,i,b);_P(b,i);hQ(b,i);dQ(a,b,i,d);QX(i,Wv(rJ(i,WL),32));j=Wv(rJ(c,TL),28);j==(KM(),JM)&&(j=IM);e=Wv(rJ(d,sL),59);e==(sK(),qK)&&(e=pK);RW(i,j,e,Wv(rJ(i,SL),10));switch(e.e){case 2:case 1:(i.g==(sN(),$M)||i.g==pN)&&f.ib((ohb(),lhb));break;case 4:case 3:(i.g==(sN(),ZM)||i.g==rN)&&f.ib((ohb(),lhb));}}
function Q5(a,b){var c,d,e,f,g,h,i,j;a.f=b;e=b.c.c.length;a.a=xv(qB,Txb,51,e,0,2);a.d=xv(qB,Txb,51,e,0,2);a.g=xv(qB,Txb,51,e,0,2);g=new Fnb(b.c,0);while(g.b<g.d.Y()){d=(Bxb(g.b<g.d.Y()),Wv(g.d.sb(g.c=g.b++),16));h=d.a.c.length;f=g.b-1;a.a[f]=xv(qB,Nzb,9,h,0,1);a.d[f]=xv(qB,Nzb,9,h,0,1);a.g[f]=xv(qB,Nzb,9,h,0,1);j=new Fnb(d.a,0);c=0;while(j.b<j.d.Y()){i=(Bxb(j.b<j.d.Y()),Wv(j.d.sb(j.c=j.b++),9));i.k=c++;a.d[f][j.b-1]=i;a.a[f][j.b-1]=i;a.g[f][j.b-1]=i}}a.b=new _4(a.d);a.e.c&&(a.b.e=true)}
function gZ(a){var b,c,d,e,f,g;e=new GU;for(g=new Tob(a.c.f);g.a<g.c.c.length;){f=Wv(Rob(g),7);f.g==(sN(),ZM)&&(e.c[e.c.length]=f,true)}if(a.d.a==(sK(),pK)&&!MM(Wv(rJ(a.c,(eM(),TL)),28))){for(d=Uh(mX(a.c));Cm(d);){c=Wv(Dm(d),12);vU(e,c.c)}}sJ(a.c,(Rib(),Whb),new llb(a.c.j.a));sJ(a.c,Vhb,(xkb(),xkb(),wkb));vU(a.b,a.c);b=null;a.e==1?(b=jZ(a,a.c,rY(a.c.d),a.c.j.a)):a.e==0?(b=iZ(a,a.c,rY(a.c.d),a.c.j.a)):a.e==3?(b=kZ(a,a.c,a.c.j.a)):a.e==2&&(b=hZ(a,a.c,a.c.j.a));!!b&&new HY(a.c,a.b,Ixb(Yv(b.b)))}
function Mab(a,b,c){var d,e,f,g,h,i,j,k;e=b.g;Ckb(Ixb(Xv(rJ(b,(Rib(),Vhb)))))&&(e=(CX(),wX));if(b.k>=0){return false}else if(!!c.e&&e==(CX(),wX)&&e!=c.e){return false}else{b.k=c.b;vU(c.f,b)}c.e=e;if(e==(CX(),zX)||e==BX||e==wX){for(g=new Tob(b.f);g.a<g.c.c.length;){f=Wv(Rob(g),7);for(k=(d=new Tob((new lY(f)).a.e),new nY(d));Qob(k.a);){j=Wv(Rob(k.a),12).d;h=j.f;i=h.g;if(b.d!=h.d){if(e==wX){if(i==wX){if(Mab(a,h,c)){return true}}}else{if(i==zX||i==BX){if(Mab(a,h,c)){return true}}}}}}}return true}
function K3(a,b){var c,d,e,f,g,h,i,j,k;fJ(a.a,Bv(tv(qz,1),Fzb,10,0,[b.a,b.b]));Ue(a.c,b.e);a.q.d=a.q.d|b.d;a.q.a=a.q.a|b.c;h=Qlb(a.j.e,b.k);i=Nlb(a.j.e+a.j.b,b.n);SN(a.j,b.j,h,0,i-h);stb(a.d,b.f);b.f.c.f==b.f.d.f&&wS(a.n,true,true,true,true);g=new vtb;j=new vtb;for(e=(k=(new Snb(a.d.a)).a.bb().mb(),new Ynb(k));e.a.G();){d=(f=Wv(e.a.H(),21),Wv(f.yb(),12));stb(g,d.c);stb(j,d.d)}c=g.a.Y()-j.a.Y();if(c<0){vS(a.n,true,(sK(),oK));vS(a.n,false,pK)}else if(c>0){vS(a.n,false,(sK(),oK));vS(a.n,true,pK)}}
function tP(b,c){var d,e,f,g,h,i,j,k,l,m;h=0;while(h<(bmb(),c.length)&&yP(c.charCodeAt(h),fzb)){++h}d=c.length;while(d>0&&yP(c.charCodeAt(d-1),gzb)){--d}if(h<d){l=fmb(c.substr(h,d-h),',|;');try{for(j=0,k=l.length;j<k;++j){i=l[j];g=fmb(i,'=');if(g.length!=2){throw new slb('Expecting a list of key-value pairs.')}f=hmb(g[0]);m=clb(hmb(g[1]));emb(f,'top')?(b.d=m):emb(f,'left')?(b.b=m):emb(f,Azb)?(b.a=m):emb(f,'right')&&(b.c=m)}}catch(a){a=OH(a);if(aw(a,130)){e=a;throw new slb(hzb+e)}else throw NH(a)}}}
function Ubb(a,b){var c,d,e,f,g,h,i,j,k;k=new aJ;for(h=(j=(new aob(a.c)).a.bb().mb(),new fob(j));h.a.G();){f=(e=Wv(h.a.H(),21),Wv(e.zb(),200));f.b==0&&(TI(k,f,k.c.b,k.c),true)}while(k.b!=0){f=Wv(k.b==0?null:(Bxb(k.b!=0),$I(k,k.a.a)),200);for(d=new Tob(f.d);d.a<d.c.c.length;){c=Wv(Rob(d),279);b.k==(Lbb(),Jbb)?(c.b.a=Qlb(c.b.a,f.a+c.a)):(c.b.a=Nlb(c.b.a,f.a+c.a));--c.b.b;c.b.b==0&&QI(k,c.b)}}for(g=(i=(new aob(a.c)).a.bb().mb(),new fob(i));g.a.G();){f=(e=Wv(g.a.H(),21),Wv(e.zb(),200));b.g[f.c.k]=f.a}}
function yZ(a,b,c){var d,e,f,g;f=a.i;e=MI(Bv(tv(qz,1),Fzb,10,0,[b.i,b.f.i]));d=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a]));g=b.d;switch(b.g.e){case 4:f.a=Qlb(e.a,d.a)-g.b-a.j.a-c;f.b=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a])).b+c;break;case 2:f.a=Nlb(e.a+b.j.a,d.a)+g.c+c;f.b=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a])).b+c;break;case 1:f.a=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a])).a+c;f.b=Qlb(e.b,d.b)-g.d-a.j.b-c;break;case 3:f.a=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a])).a+c;f.b=Nlb(e.b+b.j.b,d.b)+g.a+c;}}
function zZ(a,b,c){var d,e,f,g;f=a.i;e=MI(Bv(tv(qz,1),Fzb,10,0,[b.i,b.f.i]));d=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a]));g=b.d;switch(b.g.e){case 4:f.a=Qlb(e.a,d.a)-g.b-a.j.a-c;f.b=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a])).b-a.j.b-c;break;case 2:f.a=Nlb(e.a+b.j.a,d.a)+g.c+c;f.b=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a])).b-a.j.b-c;break;case 1:f.a=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a])).a+c;f.b=Qlb(e.b,d.b)-g.d-a.j.b-c;break;case 3:f.a=MI(Bv(tv(qz,1),Fzb,10,0,[b.f.i,b.i,b.a])).a+c;f.b=Nlb(e.b+b.j.b,d.b)+g.a+c;}}
function MQ(a){var b,c;c=Wv(rJ(a,(Rib(),jib)),18);b=XQ(HQ);Ckb(Ixb(Xv(rJ(a,(Mjb(),rjb)))))?RQ(b,(d0(),W_)):TQ(b,(d0(),W_));rJ(a,(bK(),aK))!=null&&QQ(b,IQ);switch(Wv(rJ(a,(eM(),sL)),59).e){case 2:PQ(RQ(b,(d0(),L_)),K_);break;case 3:PQ(RQ(b,(d0(),o_)),n_);break;case 4:PQ(RQ(b,(d0(),c0)),b0);}c.kb((ohb(),fhb))&&PQ(RQ(b,(d0(),m_)),l_);gw(rJ(a,Bjb))!==gw((I1(),G1))&&TQ(b,(d0(),P_));gw(rJ(a,Fjb))!==gw((g4(),e4))&&gw(rJ(a,eib))===gw((NK(),JK))&&PQ(b,(d0(),w_));if(c.kb(mhb)){RQ(b,(d0(),T_));TQ(b,S_)}return b}
function zhb(){zhb=iI;shb=new Ahb('ONE_SIDED',0,true,false,false);whb=new Ahb('TWO_SIDED',1,false,false,false);thb=new Ahb('ONE_SIDED_BEST_OF_UP_OR_DOWN',2,true,true,false);xhb=new Ahb('TWO_SIDED_BEST_OF_UP_OR_DOWN',3,false,true,false);uhb=new Ahb('ONE_SIDED_BEST_OF_UP_OR_DOWN_ORTHOGONAL_HYPEREDGES',4,true,true,true);yhb=new Ahb('TWO_SIDED_BEST_OF_UP_OR_DOWN_ORTHOGONAL_HYPEREDGES',5,false,true,true);vhb=new Ahb('ONE_SIDED_ORTHOGONAL_HYPEREDGES',6,true,false,true);rhb=new Ahb('OFF',7,false,false,false)}
function LV(a,b,c,d,e,f,g){var h,i,j,k,l,m,n;l=Ckb(Ixb(Xv(rJ(b,(Mjb(),yjb)))));m=null;f==(djb(),ajb)&&d.c.f==c?(m=d.c):f==bjb&&d.d.f==c&&(m=d.d);j=g;if(!g||!l||!!m){k=(sN(),qN);m?(k=m.g):MM(Wv(rJ(c,(eM(),TL)),28))&&(k=f==ajb?rN:ZM);i=JV(a,b,c,f,k,d);h=IV((hX(c),d));if(f==ajb){dW(h,Wv(yU(i.f,0),7));eW(h,e)}else{dW(h,e);eW(h,Wv(yU(i.f,0),7))}j=new UV(d,h,i,Wv(rJ(i,(Rib(),uib)),7),f,!m)}else{vU(g.e,d);n=Olb(Wv(rJ(g.d,(eM(),dM)),15).a,Wv(rJ(d,dM),15).a);sJ(g.d,dM,new llb(n))}Fd(a.a,d,new XV(j.d,b,f));return j}
function T1(a,b,c,d){var e,f,g,h,i,j,k,l;f=new uX(a);sX(f,(CX(),BX));sJ(f,(eM(),TL),(KM(),FM));e=0;if(b){g=new RX;sJ(g,(Rib(),uib),b);sJ(f,uib,b.f);QX(g,(sN(),rN));PX(g,f);l=Wv(FU(b.b,xv(dB,gAb,12,b.b.c.length,0,1)),47);for(j=0,k=l.length;j<k;++j){i=l[j];eW(i,g)}sJ(b,Bib,f);++e}if(c){h=new RX;sJ(f,(Rib(),uib),c.f);sJ(h,uib,c);QX(h,(sN(),ZM));PX(h,f);l=Wv(FU(c.e,xv(dB,gAb,12,c.e.c.length,0,1)),47);for(j=0,k=l.length;j<k;++j){i=l[j];dW(i,h)}sJ(c,Bib,f);++e}sJ(f,(Rib(),aib),Elb(e));d.c[d.c.length]=f;return f}
function MV(a,b){var c,d,e,f,g,h,i;for(g=ud(a.a).mb();g.G();){f=Wv(g.H(),12);if(f.b.c.length>0){d=new IU(Wv(Dd(a.a,f),18));Gpb(d,new $V(b));e=new Fnb(f.b,0);while(e.b<e.d.Y()){c=(Bxb(e.b<e.d.Y()),Wv(e.d.sb(e.c=e.b++),33));h=-1;switch(Wv(rJ(c,(eM(),tL)),107).e){case 2:h=d.c.length-1;break;case 1:h=d.c.length/2|0;break;case 3:h=0;}if(h!=-1){i=(Cxb(h,d.c.length),Wv(d.c[h],114));vU(i.b.b,c);Wv(rJ(hX(i.b.c.f),(Rib(),jib)),18).ib((ohb(),ghb));Wv(rJ(hX(i.b.c.f),jib),18).ib(ehb);vnb(e);sJ(c,xib,f)}}}dW(f,null);eW(f,null)}}
function H7(a){var b,c,d,e,f,g,h,i,j,k,l;k=a.e.a.c.length;for(g=new Tob(a.e.a);g.a<g.c.c.length;){f=Wv(Rob(g),61);f.j=false}a.i=xv(mw,Yyb,26,k,12,1);a.g=xv(mw,Yyb,26,k,12,1);a.n=new GU;e=0;l=new GU;for(i=new Tob(a.e.a);i.a<i.c.c.length;){h=Wv(Rob(i),61);h.b=e++;h.c.c.length==0&&vU(a.n,h);xU(l,h.g)}b=0;for(d=new Tob(l);d.a<d.c.c.length;){c=Wv(Rob(d),89);c.b=b++;c.e=false}j=l.c.length;if(a.b==null||a.b.length<j){a.b=xv(kw,hyb,26,j,12,1);a.c=xv(KH,xAb,26,j,13,1)}else{dpb(a.c)}a.d=l;a.p=new Xub(op(a.d.c.length));a.j=1}
function z0(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;p=a.d;q=b.d;n=Wv(oX(a,(djb(),ajb)).mb().H(),7);t=Wv(oX(a,bjb).mb().H(),7);o=Wv(oX(b,ajb).mb().H(),7);u=Wv(oX(b,bjb).mb().H(),7);l=Wv(FU(n.b,xv(dB,gAb,12,1,0,1)),47);r=Wv(FU(t.e,xv(dB,gAb,12,1,0,1)),47);m=Wv(FU(o.b,xv(dB,gAb,12,1,0,1)),47);s=Wv(FU(u.e,xv(dB,gAb,12,1,0,1)),47);rX(a,q);for(e=0,i=m.length;e<i;++e){c=m[e];eW(c,n)}for(f=0,j=s.length;f<j;++f){c=s[f];dW(c,t)}rX(b,p);for(g=0,k=l.length;g<k;++g){c=l[g];eW(c,o)}for(d=0,h=r.length;d<h;++d){c=r[d];dW(c,u)}}
function gR(a){var b,c,d,e,f,g,h,i;for(f=new Tob(a.a.b);f.a<f.c.c.length;){e=Wv(Rob(f),25);e.vc()}i=new HI(Uzb,Uzb);b=new HI(Vzb,Vzb);for(d=new Tob(a.a.b);d.a<d.c.c.length;){c=Wv(Rob(d),25);i.a=Qlb(i.a,c.j.d);i.b=Qlb(i.b,c.j.e);b.a=Nlb(b.a,c.j.d+c.j.c);b.b=Nlb(b.b,c.j.e+c.j.b)}for(h=Jd(a.c).mb();h.G();){g=Wv(h.H(),27);c=Wv(g.b,25);i.a=Qlb(i.a,c.j.d);i.b=Qlb(i.b,c.j.e);b.a=Nlb(b.a,c.j.d+c.j.c);b.b=Nlb(b.b,c.j.e+c.j.b)}a.d=zI(new HI(i.a,i.b));a.e=EI(new HI(b.a,b.b),i);a.a.a.c=xv(UF,syb,1,0,4,1);a.a.b.c=xv(UF,syb,1,0,4,1)}
function P$(a){var b,c,d,e,f,g,h;h=Wv(yU(a.f,0),7);if(h.e.c.length!=0&&h.b.c.length!=0){throw new ulb('Interactive layout does not support NORTH/SOUTH ports with incoming _and_ outgoing edges.')}if(h.e.c.length!=0){f=Uzb;for(c=new Tob(h.e);c.a<c.c.c.length;){b=Wv(Rob(c),12);g=b.d.f;d=Wv(rJ(g,(eM(),GL)),65);f=Qlb(f,g.i.a-d.b)}return new $c(_b(f))}if(h.b.c.length!=0){e=Vzb;for(c=new Tob(h.b);c.a<c.c.c.length;){b=Wv(Rob(c),12);g=b.c.f;d=Wv(rJ(g,(eM(),GL)),65);e=Nlb(e,g.i.a+g.j.a+d.c)}return new $c(_b(e))}return zb(),zb(),yb}
function JV(a,b,c,d,e,f){var g,h,i,j,k,l,m;j=d==(djb(),ajb)?f.c:f.d;i=PW(b);if(j.f==c){g=Wv(Smb(a.b,j),9);if(!g){g=NW(j,Wv(rJ(c,(eM(),TL)),28),e,d==ajb?-1:1,j.j,i,b);sJ(g,(Rib(),uib),j);Umb(a.b,j,g)}}else{k=Wv(rJ(f,(eM(),dM)),15).a;g=NW((l=new tJ,m=Wv(rJ(b,(Rib(),Jib)),15).a*Wv(rJ(b,(Mjb(),qjb)),15).a/2,sJ(l,tib,new llb(m)),l),Wv(rJ(c,TL),28),e,d==ajb?-1:1,new HI(k,k),i,b);h=KV(a,g,c,d);sJ(g,uib,h);Umb(a.b,h,g)}Wv(rJ(b,(Rib(),jib)),18).ib((ohb(),hhb));MM(Wv(rJ(b,(eM(),TL)),28))?sJ(b,TL,(KM(),HM)):sJ(b,TL,(KM(),IM));return g}
function Iab(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A;d=Wv(rJ(b,(Mjb(),wjb)),15).a;v=Wv(rJ(b,Kjb),24).a;m=4;e=3;w=20/v;n=false;i=0;g=$xb;do{f=i!=1;l=i!=0;A=0;for(q=a.a,s=0,u=q.length;s<u;++s){o=q[s];o.g=null;Jab(a,o,f,l,d);A+=Jlb(o.a)}do{h=Nab(a,b)}while(h);for(p=a.a,r=0,t=p.length;r<t;++r){o=p[r];c=Uab(o).a;if(c!=0){for(k=new Tob(o.f);k.a<k.c.c.length;){j=Wv(Rob(k),9);j.i.b+=c}}}if(i==0||i==1){--m;if(m<=0&&(A<g||-m>v)){i=2;g=$xb}else if(i==0){i=1;g=A}else{i=0;g=A}}else{n=A>=g||g-A<w;g=A;n&&--e}}while(!(n&&e<=0))}
function vZ(a,b,c){var d,e,f,g,h,i,j,k,l,m,n;l=Wv(FU(a.f,xv(BB,mAb,7,a.f.c.length,0,1)),346);for(j=0,k=l.length;j<k;++j){i=l[j];if(c!=(djb(),ajb)){h=Wv(FU(i.e,xv(dB,gAb,12,i.e.c.length,0,1)),47);for(e=0,f=h.length;e<f;++e){d=h[e];n=Wv(rJ(d.d.f,(Mjb(),vjb)),85);!Ckb(Ixb(Xv(rJ(d,(Rib(),Iib)))))&&!(b==(Xib(),Uib)&&n==Vib)&&cW(d,true)}}if(c!=bjb){g=Wv(FU(i.b,xv(dB,gAb,12,i.b.c.length,0,1)),47);for(e=0,f=g.length;e<f;++e){d=g[e];m=Wv(rJ(d.c.f,(Mjb(),vjb)),85);!Ckb(Ixb(Xv(rJ(d,(Rib(),Iib)))))&&!(b==(Xib(),Sib)&&m==Tib)&&cW(d,true)}}}}
function RW(a,b,c,d){var e,f,g,h,i;g=a.g;if(g==(sN(),qN)&&b!=(KM(),IM)&&b!=(KM(),JM)){g=KW(a,c);QX(a,g);rJ(a,(eM(),LL))==null&&g!=qN&&(a.i.a!=0||a.i.b!=0)&&sJ(a,LL,new llb(JW(a,g)))}if(b==(KM(),GM)){i=0;switch(g.e){case 1:case 3:f=a.f.j.a;f>0&&(i=a.i.a/f);break;case 2:case 4:e=a.f.j.b;e>0&&(i=a.i.b/e);}sJ(a,(Rib(),Cib),i)}h=a.j;if(d){a.a.a=d.a;a.a.b=d.b}else if(b!=IM&&b!=JM&&g!=qN){switch(g.e){case 1:a.a.a=h.a/2;break;case 2:a.a.a=h.a;a.a.b=h.b/2;break;case 3:a.a.a=h.a/2;a.a.b=h.b;break;case 4:a.a.b=h.b/2;}}else{a.a.a=h.a/2;a.a.b=h.b/2}}
function zJ(a){var b,c,d,e;if(aw(a.a,10)){return xI(Wv(a.a,10))}else if(aw(a.a,66)){return Xsb(Wv(a.a,86))}else if(aw(a.a,50)){return Wv(a.a,50).Wc()}else if(aw(a.a,191)){b=new Vwb;e=(d=new rwb((new wwb((new Gob(Wv(a.a,191).a)).a)).b),new Mob(d));while(Bnb(e.a.a)){Rwb(b,(c=pwb(e.a),c.yb()))}return b}else if(aw(a.a,13)){return new IU(Wv(a.a,13))}else if(aw(a.a,44)){b=new jJ;e=WI(Wv(a.a,44),0);while(e.b!=e.d.c){QI(b,Wv(_ub(e),10))}return b}else if(aw(a.a,58)){b=new aJ;e=WI(Wv(a.a,58),0);while(e.b!=e.d.c){QI(b,_ub(e))}return b}else{return a.a}}
function o1(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;h=0;o=0;i=Xob(a.f,a.f.length);f=a.d;g=a.i;d=a.a;e=a.b;do{n=0;for(k=new Tob(a.p);k.a<k.c.c.length;){j=Wv(Rob(k),9);m=n1(a,j);c=true;(a.q==(I1(),B1)||a.q==E1)&&(c=Ckb(Ixb(Xv(m.b))));if(Wv(m.a,24).a<0&&c){++n;i=Xob(a.f,a.f.length);a.d=a.d+Wv(m.a,24).a;o+=f-a.d;f=a.d+Wv(m.a,24).a;g=a.i;d=Ao(a.a);e=Ao(a.b)}else{a.f=Xob(i,i.length);a.d=f;a.a=(_b(d),d?new IU((Oh(),d)):Bo(new Tob(null)));a.b=(_b(e),e?new IU((Oh(),e)):Bo(new Tob(null)));a.i=g}}++h;l=n!=0&&Ckb(Ixb(Xv(b.B(new RJ(Elb(o),Elb(h))))))}while(l)}
function yO(a,b,c,d){var e,f,g,h,i,j,k;if(!Qob(new Tob(zW(a)))){return d}k=wO(Wv(oW(a,(eM(),JL)),86));for(i=new Tob(zW(a));i.a<i.c.c.length;){h=Wv(Rob(i),129);j=wO(Wv(oW(h,JL),86));j==(uO(),tO)&&(j=k);qW(h,j.e);e=zO(c,j);e.c=Nlb(e.c,h.e.j.a);e.b+=h.e.j.b+b}for(g=new Lsb((new Fsb(c)).a);htb(g.a);){f=(g.b=itb(g.a),new Psb(g.c,g.b));e=Wv(f.b.b[f.a.e],62);e.b-=b;switch(Wv(f.a,67).e){case 12:case 13:case 14:d.d=Nlb(d.d,e.b+b);break;case 15:d.b=Nlb(d.b,e.c+b);break;case 17:d.c=Nlb(d.c,e.c+b);break;case 18:case 19:case 20:d.a=Nlb(d.a,e.b+b);}}return d}
function mgb(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p;igb(this);c==(fgb(),dgb)?stb(this.g,a):stb(this.o,a);n=rAb;m=4.9E-324;for(j=(g=(new Snb(b.a)).a.bb().mb(),new Ynb(g));j.a.G();){h=(e=Wv(j.a.H(),21),Wv(e.yb(),27));k=Wv(h.a,223);d=Wv(h.b,12);l=d.c;l==a&&(l=d.d);k==dgb?stb(this.g,l):stb(this.o,l);p=MI(Bv(tv(qz,1),Fzb,10,0,[l.f.i,l.i,l.a])).b;n=n<p?n:p;m=m>p?m:p}o=MI(Bv(tv(qz,1),Fzb,10,0,[a.f.i,a.i,a.a])).b;kgb(this,o,n,m);for(i=(f=(new Snb(b.a)).a.bb().mb(),new Ynb(f));i.a.G();){h=(e=Wv(i.a.H(),21),Wv(e.yb(),27));stb(this.c,Wv(h.b,12))}this.f=false}
function cQ(a,b,c,d){var e,f,g,h,i,j;h=(eM(),KL).b;if(h in b.a&&Pu(b,h).ic().a){return}j=Pu(b,Dzb);if(!j){throw new GQ("Labels must have a property 'text'.",null,b)}else if(!j.lc()){throw new GQ("A label's 'text' property must be a string.",j,b)}i=j.lc().a;f=new dX(i);sJ(f,(Rib(),uib),b);Umb(a.f,f,b);_P(b,f);hQ(b,f);aw(c,9)?vU(Wv(c,9).c,f):aw(c,12)?vU(Wv(c,12).b,f):aw(c,7)&&vU(Wv(c,7).c,f);if(aw(c,12)){g=Wv(rJ(f,tL),107);_P(b,f);sJ(f,tL,g);e=Wv(rJ(d,jib),18);switch(g.e){case 2:case 3:e.ib((ohb(),ghb));case 1:case 0:e.ib((ohb(),ehb));sJ(f,tL,(EK(),AK));}}}
function UW(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;f=0;g=0;for(j=new Tob(a.a);j.a<j.c.c.length;){h=Wv(Rob(j),9);f=Nlb(f,h.e.b);g=Nlb(g,h.e.c)}for(i=new Tob(a.a);i.a<i.c.c.length;){h=Wv(Rob(i),9);c=Wv(rJ(h,(eM(),lL)),103);switch(c.e){case 1:o=0;break;case 2:o=1;break;case 5:o=0.5;break;default:d=0;l=0;for(n=new Tob(h.f);n.a<n.c.c.length;){m=Wv(Rob(n),7);m.b.c.length==0||++d;m.e.c.length==0||++l}d+l==0?(o=0.5):(o=l/(d+l));}q=a.c;k=h.j.a;r=(q.a-k)*o;o>0.5?(r-=g*2*(o-0.5)):o<0.5&&(r+=f*2*(0.5-o));e=h.e.b;r<e&&(r=e);p=h.e.c;r>q.a-p-k&&(r=q.a-p-k);h.i.a=b+r}}
function Kv(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G;c=a.l&8191;d=a.l>>13|(a.m&15)<<9;e=a.m>>4&8191;f=a.m>>17|(a.h&255)<<5;g=(a.h&1048320)>>8;h=b.l&8191;i=b.l>>13|(b.m&15)<<9;j=b.m>>4&8191;k=b.m>>17|(b.h&255)<<5;l=(b.h&1048320)>>8;B=c*h;C=d*h;D=e*h;F=f*h;G=g*h;if(i!=0){C+=c*i;D+=d*i;F+=e*i;G+=f*i}if(j!=0){D+=c*j;F+=d*j;G+=e*j}if(k!=0){F+=c*k;G+=d*k}l!=0&&(G+=c*l);n=B&azb;o=(C&511)<<13;m=n+o;q=B>>22;r=C>>9;s=(D&262143)<<4;t=(F&31)<<17;p=q+r+s+t;v=D>>18;w=F>>5;A=(G&4095)<<8;u=v+w+A;p+=m>>22;m&=azb;u+=p>>22;p&=azb;u&=bzb;return Ev(m,p,u)}
function jZ(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;q=a.d.c.c.c.length;if(c>=q-1){return null}e=new GU;e.c[e.c.length]=b;u=b;g=c;o=-1;h=Wv(yU(a.d.c.c,c),16);for(n=0;n<h.a.c.length;++n){r=Wv(yU(h.a,n),9);if(r==b){o=n;break}}p=eZ(a,1,o,c,q,a.a);if(!p){return null}v=a.a;m=0;f=0;while(!!u&&v>1&&g<q-1){k=fZ(a,u);l=Wv(yU(a.d.c.c,g+1),16);w=Wv(p.sb(m++),24).a;s=Slb(w,l.a.c.length);qX(k,s,l);!!u&&(e.c[e.c.length]=u,true);u=k;--v;++f;++g}t=(d-(e.c.length-1)*a.d.d)/e.c.length;for(j=new Tob(e);j.a<j.c.c.length;){i=Wv(Rob(j),9);i.j.a=t}return new RJ(Elb(f),t)}
function iZ(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;if(c<=0){return null}e=new GU;e.c[e.c.length]=b;u=b;g=c;o=-1;h=Wv(yU(a.d.c.c,c),16);for(n=0;n<h.a.c.length;++n){q=Wv(yU(h.a,n),9);if(q==b){o=n;break}}p=eZ(a,0,o,c,a.d.c.c.c.length,a.a);if(!p){return null}v=a.a;m=0;f=0;t=o;while(!!u&&v>1&&g>1){k=fZ(a,u);h=Wv(yU(a.d.c.c,g),16);l=Wv(yU(a.d.c.c,g-1),16);w=Wv(p.sb(m++),24).a;r=Slb(w,l.a.c.length);qX(u,r,l);qX(k,t,h);t=r;!!u&&(e.c[e.c.length]=u,true);u=k;--v;++f;--g}s=(d-(e.c.length-1)*a.d.d)/e.c.length;for(j=new Tob(e);j.a<j.c.c.length;){i=Wv(Rob(j),9);i.j.a=s}return new RJ(Elb(f),s)}
function sV(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;a.b=a.c;o=Xv(rJ(b,(eM(),_L)));n=o==null||Ckb((Dxb(o),o));f=Wv(rJ(b,(Rib(),jib)),18).kb((ohb(),hhb));e=Wv(rJ(b,TL),28);c=!(e==(KM(),EM)||e==GM||e==FM);if(n&&(c||!f)){for(l=new Tob(b.b);l.a<l.c.c.length;){j=Wv(Rob(l),9);j.k=0}m=new GU;for(k=new Tob(b.b);k.a<k.c.c.length;){j=Wv(Rob(k),9);d=rV(a,j,null);if(d){i=new kW;qJ(i,b);sJ(i,fib,Wv(d.b,18));YW(i.a,b.a);for(h=Wv(d.a,20).mb();h.G();){g=Wv(h.H(),9);vU(i.b,g);g.a=i}m.ib(i)}}f&&(a.b=a.a)}else{m=new opb(Bv(tv(mB,1),{38:1,39:1,42:1,3:1,8:1,5:1,6:1},55,0,[b]))}return m}
function T4(a){var b,c,d,e,f,g,h,i,j;for(c=new Tob(a.a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);for(g=b.i.mb();g.G();){f=Wv(g.H(),25);if(b.f==f.f){continue}tK(a.a.d)?(i=a.a.g.tc(b,f)):(i=a.a.g.uc(b,f));d=b.g.a+b.j.c+i-f.g.a;d=Math.ceil(d);d=0>d?0:d;if(!!b.o&&!!f.o&&aw(b,82)&&aw(f,82)&&!sr(or(Wv(b,82).d,Wv(f,82).d))){e=x7(new A7,a.d);h=hw(Llb(f.g.a-b.g.a));f7(i7(h7(j7(g7(new k7,0>h?0:h),1),e),a.c[b.f.d]));f7(i7(h7(j7(g7(new k7,0>-h?0:-h),1),e),a.c[f.f.d]))}else{j=1;(aw(b,82)&&aw(f,93)||aw(f,82)&&aw(b,93))&&(j=2);f7(i7(h7(j7(g7(new k7,hw(d)),j),a.c[b.f.d]),a.c[f.f.d]))}}}}
function tQ(){tQ=iI;sQ=new vtb;rQ=uQ(Bv(tv(rz,1),syb,79,0,[(eM(),kL),xL]));oQ=uQ(Bv(tv(rz,1),syb,79,0,[ML,UL,(Mjb(),Hjb),yL,(Rib(),Eib),Kjb,Cjb]));kQ=uQ(Bv(tv(rz,1),syb,79,0,[mL,qL,KL,wL,BL,EL,FL,$L,_L,AL,gjb,mjb,njb,xjb,rjb,yjb,Ijb,Djb,ijb]));nQ=uQ(Bv(tv(rz,1),syb,79,0,[IL,HL,DL,dM,LL,Dib,Xhb,Rhb,Jib,Ejb,qjb,wjb]));mQ=uQ(Bv(tv(rz,1),syb,79,0,[WL,lL,sL,uL,tL,vL,zL,NL,OL,PL,QL,RL,TL,VL,hjb,ljb,zjb,ojb,kjb,Ajb,Bjb,sjb,tjb,vjb,Fjb,Gjb,Jjb,Ljb,ujb]));lQ=uQ(Bv(tv(rz,1),syb,79,0,[JL,aM,bM,jjb]));qQ=uQ(Bv(tv(rz,1),syb,79,0,[jL,oL,CL,GL,SL,YL]));pQ=uQ(Bv(tv(rz,1),syb,79,0,[(RP(),OP)]))}
function AR(a){var b,c,d,e,f,g,h;b=0;for(f=new Tob(a.b.a);f.a<f.c.c.length;){d=Wv(Rob(f),78);d.b=0;d.c=0}zR(a,0);yR(a,a.g);fS(a.c);jS(a.c);c=(sK(),oK);hS(bS(gS(hS(bS(gS(hS(gS(a.c,c)),vK(c)))),c)));gS(a.c,oK);DR(a,a.g);ER(a,0);FR(a,0);GR(a,1);zR(a,1);yR(a,a.d);fS(a.c);for(g=new Tob(a.b.a);g.a<g.c.c.length;){d=Wv(Rob(g),78);b+=Jlb(d.c)}for(h=new Tob(a.b.a);h.a<h.c.c.length;){d=Wv(Rob(h),78);d.b=0;d.c=0}c=rK;hS(bS(gS(hS(bS(gS(hS(jS(gS(a.c,c))),vK(c)))),c)));gS(a.c,oK);DR(a,a.d);ER(a,1);FR(a,1);GR(a,0);jS(a.c);for(e=new Tob(a.b.a);e.a<e.c.c.length;){d=Wv(Rob(e),78);b+=Jlb(d.c)}return b}
function BR(a){var b,c,d,e,f,g,h;b=new GU;a.g=new GU;a.d=new GU;for(g=new rnb((new inb(a.f.b)).a);g.b;){f=pnb(g);vU(b,Wv(Wv(f.zb(),27).b,25));tK(Wv(f.yb(),251).yc())?vU(a.d,Wv(f.zb(),27)):vU(a.g,Wv(f.zb(),27))}yR(a,a.d);yR(a,a.g);a.c=new rS(a.b);pS(a.c,(fR(),eR));DR(a,a.d);DR(a,a.g);xU(b,a.c.a.b);a.e=new HI(Uzb,Uzb);a.a=new HI(Vzb,Vzb);for(d=new Tob(b);d.a<d.c.c.length;){c=Wv(Rob(d),25);a.e.a=Qlb(a.e.a,c.j.d);a.e.b=Qlb(a.e.b,c.j.e);a.a.a=Nlb(a.a.a,c.j.d+c.j.c);a.a.b=Nlb(a.a.b,c.j.e+c.j.b)}oS(a.c,new IR);h=0;do{e=AR(a);++h}while((h<2||e>$yb)&&h<10);oS(a.c,new KR);AR(a);iS(a.c);gR(a.f)}
function tT(a){oT();var b,c,d,e,f,g,h;h=new qT;for(c=new Tob(a);c.a<c.c.c.length;){b=Wv(Rob(c),48);(!h.b||b.c>=h.b.c)&&(h.b=b);if(!h.c||b.c<=h.c.c){h.d=h.c;h.c=b}(!h.e||b.d>=h.e.d)&&(h.e=b);(!h.f||b.d<=h.f.d)&&(h.f=b)}d=new xT((cT(),$S));RT(a,mT,new opb(Bv(tv(JA,1),syb,160,0,[d])));g=new xT(bT);RT(a,lT,new opb(Bv(tv(JA,1),syb,160,0,[g])));e=new xT(_S);RT(a,kT,new opb(Bv(tv(JA,1),syb,160,0,[e])));f=new xT(aT);RT(a,jT,new opb(Bv(tv(JA,1),syb,160,0,[f])));rT(d.c,$S);rT(e.c,_S);rT(f.c,aT);rT(g.c,bT);h.a.c=xv(UF,syb,1,0,4,1);xU(h.a,d.c);xU(h.a,Fo(e.c));xU(h.a,f.c);xU(h.a,Fo(g.c));return h}
function $O(a){var b,c,d,e,f,g,h,i,j,k;e=Wv(vW(a,(eM(),DL)),15).a;for(h=new Tob(uW(a));h.a<h.c.c.length;){g=Wv(Rob(h),626);c=new fP(g);c.d=e;c.k=Wv(oW(g,XL),15).a;d=Wv(oW(g,VL),149);b=Ckb(Ixb(Xv(rJ(Wv(g.e,9),(Rib(),$hb)))));for(k=new Tob(AW(g));k.a<k.c.c.length;){j=Wv(Rob(k),161);d==(UM(),SM)?XO(j,b,e):d==TM&&YO(j,e);JO(j)}LO(c,Wv(oW(g,aM),86).kb((DN(),CN)));NO(c);yO(c.e,c.d,c.c,c.p);_O(c);ZO(c);VO(c);i=new CP((f=Wv(g.e,9).b,new BP(f.d,f.b,f.a,f.c)));i.b=c.p.b+c.q.b;i.c=c.p.c+c.q.c;i.d=c.p.d+c.q.d;i.a=c.p.a+c.q.a;Wv(g.e,9).b.b=i.b;Wv(g.e,9).b.d=i.d;Wv(g.e,9).b.c=i.c;Wv(g.e,9).b.a=i.a}}
function c1(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;i=Wv(nX(a,(sN(),rN)).mb().H(),7).b;n=Wv(nX(a,ZM).mb().H(),7).e;h=i.c.length;t=MX(Wv(yU(a.f,0),7));while(h-->0){p=(Cxb(0,i.c.length),Wv(i.c[0],12));e=(Cxb(0,n.c.length),Wv(n.c[0],12));s=e.d.b;f=zU(s,e,0);fW(p,e.d,f);dW(e,null);eW(e,null);o=p.a;b&&QI(o,new II(t));for(d=WI(e.a,0);d.b!=d.d.c;){c=Wv(_ub(d),10);QI(o,new II(c))}r=p.b;for(m=new Tob(e.b);m.a<m.c.c.length;){l=Wv(Rob(m),33);r.c[r.c.length]=l}q=Wv(rJ(p,(eM(),CL)),44);g=Wv(rJ(e,CL),44);if(g){if(!q){q=new jJ;sJ(p,CL,q)}for(k=WI(g,0);k.b!=k.d.c;){j=Wv(_ub(k),10);QI(q,new II(j))}}}}
function XO(a,b,c){var d,e,f,g,h;f=Li(DW(a));if(f.Nb().V()){return}h=0;switch(Wv(a.e,7).g.e){case 4:case 2:h=b&&Ckb(Ixb(Xv(rJ(Wv(a.e,7),(Rib(),lib)))))?a.e.j.b:(a.e.j.b-Wv(f.Nb().sb(0),129).pc().b)/2-c;break;case 1:h=a.e.j.b;break;case 3:h=0;}Wv(a.e,7).g==(sN(),pN)&&Ii(f);for(e=new Tob(DW(a));e.a<e.c.c.length;){d=Wv(Rob(e),129);g=new II(a.e.i);switch(Wv(a.e,7).g.e){case 4:g.a=a.e.j.a+c;g.b=h+c;h+=c+d.e.j.b;break;case 2:g.a=-d.e.j.a-c;g.b=h+c;h+=c+d.e.j.b;break;case 1:g.a=(a.e.j.a-d.e.j.a)/2;g.b=h+c;h+=c+d.e.j.b;break;case 3:g.a=(a.e.j.a-d.e.j.a)/2;g.b=h-c-d.e.j.b;h-=c+d.e.j.b;}d.e.i.a=g.a;d.e.i.b=g.b}}
function jR(a,b){var c,d,e,f,g,h,i,j,k,l;a.a=new NR(Tsb(Bz));for(d=new Tob(b.a);d.a<d.c.c.length;){c=Wv(Rob(d),347);h=new QR(Bv(tv(kA,1),syb,25,0,[]));vU(a.a.a,h);for(j=new Tob(c.d);j.a<j.c.c.length;){i=Wv(Rob(j),62);k=new pR(a,i);iR(k,Wv(rJ(c.c,(Rib(),fib)),18));if(!Qmb(a.g,c)){Umb(a.g,c,new HI(i.d,i.e));Umb(a.f,c,k)}vU(a.a.b,k);OR(h,k)}for(g=new Tob(c.b);g.a<g.c.c.length;){f=Wv(Rob(g),251);k=new pR(a,f.Bc());Umb(a.b,f,new RJ(h,k));iR(k,Wv(rJ(c.c,(Rib(),fib)),18));if(f.zc()){l=new qR(a,f.zc(),1);iR(l,Wv(rJ(c.c,fib),18));e=new QR(Bv(tv(kA,1),syb,25,0,[]));OR(e,l);Fd(a.c,f.yc(),new RJ(h,l))}}}return a.a}
function ccb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;p=b.c.c.length;if(p<3){return}n=xv(mw,Yyb,26,p,12,1);l=0;for(k=new Tob(b.c);k.a<k.c.c.length;){j=Wv(Rob(k),16);n[l++]=j.a.c.length}m=new Fnb(b.c,2);for(d=1;d<p-1;d++){c=(Bxb(m.b<m.d.Y()),Wv(m.d.sb(m.c=m.b++),16));o=new Tob(c.a);f=0;h=0;for(i=0;i<n[d+1];i++){t=Wv(Rob(o),9);if(i==n[d+1]-1||bcb(a,t,d+1,d)){g=n[d]-1;bcb(a,t,d+1,d)&&(g=a.d.e[Wv(Wv(Wv(yU(a.d.b,t.k),20).sb(0),27).a,9).k]);while(h<=i){s=Wv(yU(c.a,h),9);if(!bcb(a,s,d+1,d)){for(r=Wv(yU(a.d.b,s.k),20).mb();r.G();){q=Wv(r.H(),27);e=a.d.e[Wv(q.a,9).k];(e<f||e>g)&&stb(a.c,Wv(q.b,12))}}++h}f=g}}}}
function _9(a,b,c){var d,e,f,g,h,i;this.g=a;h=b.d.length;i=c.d.length;this.d=xv(qB,Nzb,9,h+i,0,1);for(g=0;g<h;g++){this.d[g]=b.d[g]}for(f=0;f<i;f++){this.d[h+f]=c.d[f]}if(b.e){this.e=Eo(b.e);this.e.nb(c);if(c.e){for(e=c.e.mb();e.G();){d=Wv(e.H(),102);if(d==b){continue}else this.e.kb(d)?--d.c:this.e.ib(d)}}}else if(c.e){this.e=Eo(c.e);this.e.nb(b)}this.f=b.f+c.f;this.a=b.a+c.a;this.a>0?Z9(this,this.f/this.a):W9(b.g,b.d[0]).a!=null&&W9(c.g,c.d[0]).a!=null?Z9(this,(Ixb(W9(b.g,b.d[0]).a)+Ixb(W9(c.g,c.d[0]).a))/2):W9(b.g,b.d[0]).a!=null?Z9(this,W9(b.g,b.d[0]).a):W9(c.g,c.d[0]).a!=null&&Z9(this,W9(c.g,c.d[0]).a)}
function x9(a,b){var c,d,e,f,g,h,i,j,k,l,m;switch(a.g.e){case 1:d=Wv(rJ(a,(Rib(),uib)),12);c=Wv(rJ(d,vib),44);!c?(c=new jJ):Ckb(Ixb(Xv(rJ(d,Iib))))&&(c=lJ(c));j=Wv(rJ(a,qib),7);k=MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a]));if(b<=k.a){return k.b}TI(c,k,c.a,c.a.a);l=Wv(rJ(a,rib),7);m=MI(Bv(tv(qz,1),Fzb,10,0,[l.f.i,l.i,l.a]));if(m.a<=b){return m.b}TI(c,m,c.c.b,c.c);i=WI(c,0);g=Wv(_ub(i),10);h=Wv(_ub(i),10);while(h.a<b&&i.b!=i.d.c){g=h;h=Wv(_ub(i),10)}return g.b+(b-g.a)/(h.a-g.a)*(h.b-g.b);case 3:f=Wv(rJ(Wv(yU(a.f,0),7),(Rib(),uib)),7);e=f.f;switch(f.g.e){case 1:return e.i.b;case 3:return e.i.b+e.j.b;}}return kX(a).b}
function KP(a){var b,c,d,e,f,g,h,i,j,k,l,m;k=gw(rJ(a.c.f,(Rib(),sib)))===gw(rJ(a.d.f,sib));g=new FI;c=Wv(rJ(a,(eM(),oL)),44);if(!!c&&c.b>=2){_I(a.a);d=0;for(m=WI(c,0);m.b!=m.d.c;){l=Wv(_ub(m),10);if(d==0){b=EI(EI(new HI(l.a,l.b),a.c.i),a.c.f.i);a.c.a.a=b.a;a.c.a.b=b.b}else if(d==c.b-1){b=EI(EI(new HI(l.a,l.b),a.d.i),a.d.f.i);a.d.a.a=b.a;a.d.a.b=b.b}else{QI(a.a,l)}++d}}if(k){for(i=WI(a.a,0);i.b!=i.d.c;){h=Wv(_ub(i),10);g.a=Nlb(g.a,h.a);g.b=Nlb(g.b,h.b)}}for(f=new Tob(a.b);f.a<f.c.c.length;){e=Wv(Rob(f),33);j=Wv(rJ(e,YL),10);if(j){e.i.a=j.a;e.i.b=j.b}if(k){g.a=Nlb(g.a,e.i.a+e.j.a);g.b=Nlb(g.b,e.i.b+e.j.b)}}return g}
function eQ(a,b,c){var d,e,f,g,h,i,j;SP(b);d=Wv(rJ(c,(Rib(),jib)),18);g=new uX(c);sJ(g,uib,b);vU(c.b,g);f=Wv(Pu(b,'id'),97);Vmb(a.i,f.a,g);Umb(a.j,g,b);_P(b,g);hQ(b,g);if('ports' in b.a){j=Pu(b,'ports');if(!j.hc()){throw new GQ("The 'ports' property of the node must be an array.",j,b)}i=j.hc();for(e=0;e<i.a.length;++e){aw(gu(i,e),69)&&gQ(a,Wv(gu(i,e),69),g,c)}}dQ(a,b,g,c);Mzb in b.a&&Pu(b,Mzb).hc().a.length>0&&sJ(g,$hb,(xkb(),xkb(),wkb));h=Wv(rJ(g,(eM(),TL)),28);h==(KM(),JM)?IM:h!=IM&&d.ib((ohb(),khb));Ckb(Ixb(Xv(rJ(g,qL))))&&d.ib((ohb(),fhb));if(Ckb(Ixb(Xv(rJ(g,AL))))){d.ib((ohb(),jhb));d.ib(ihb);sJ(g,TL,IM)}return g}
function iR(a,b){b.V()&&wS(a.n,true,true,true,true);b.t((sN(),eN))&&wS(a.n,true,true,true,false);b.t(_M)&&wS(a.n,false,true,true,true);b.t(mN)&&wS(a.n,true,true,false,true);b.t(oN)&&wS(a.n,true,false,true,true);b.t(fN)&&wS(a.n,false,true,true,false);b.t(aN)&&wS(a.n,false,true,false,true);b.t(nN)&&wS(a.n,true,false,false,true);b.t(lN)&&wS(a.n,true,false,true,false);b.t(jN)&&wS(a.n,true,true,true,true);b.t(cN)&&wS(a.n,true,true,true,true);b.t(jN)&&wS(a.n,true,true,true,true);b.t(bN)&&wS(a.n,true,true,true,true);b.t(kN)&&wS(a.n,true,true,true,true);b.t(iN)&&wS(a.n,true,true,true,true);b.t(hN)&&wS(a.n,true,true,true,true)}
function n1(a,b){var c,d,e,f,g,h,i,j,k,l;i=true;e=0;j=a.f[b.k];k=b.j.b+a.n;c=a.c[b.k][2];DU(a.a,j,Elb(Wv(yU(a.a,j),24).a-1+c));DU(a.b,j,Ixb(Yv(yU(a.b,j)))-k+c*a.e);++j;if(j>=a.i){++a.i;vU(a.a,Elb(1));vU(a.b,k)}else{d=a.c[b.k][1];DU(a.a,j,Elb(Wv(yU(a.a,j),24).a+1-d));DU(a.b,j,Ixb(Yv(yU(a.b,j)))+k-d*a.e)}(a.q==(I1(),B1)&&(Wv(yU(a.a,j),24).a>a.j||Wv(yU(a.a,j-1),24).a>a.j)||a.q==E1&&(Ixb(Yv(yU(a.b,j)))>a.k||Ixb(Yv(yU(a.b,j-1)))>a.k))&&(i=false);for(g=Uh(iX(b));Cm(g);){f=Wv(Dm(g),12);h=f.c.f;if(a.f[h.k]==j){l=n1(a,h);e=e+Wv(l.a,24).a;i=i&&Ckb(Ixb(Xv(l.b)))}}a.f[b.k]=j;e=e+a.c[b.k][0];return new RJ(Elb(e),(xkb(),i?wkb:vkb))}
function WW(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;m=new II(a.j);r=b.a/m.a;h=b.b/m.b;p=b.a-m.a;f=b.b-m.b;if(c){e=gw(rJ(a,(eM(),TL)))===gw((KM(),FM));for(o=new Tob(a.f);o.a<o.c.c.length;){n=Wv(Rob(o),7);switch(n.g.e){case 1:e||(n.i.a*=r);break;case 2:n.i.a+=p;e||(n.i.b*=h);break;case 3:e||(n.i.a*=r);n.i.b+=f;break;case 4:e||(n.i.b*=h);}}}for(j=new Tob(a.c);j.a<j.c.c.length;){i=Wv(Rob(j),33);k=i.i.a+i.j.a/2;l=i.i.b+i.j.b/2;q=k/m.a;g=l/m.b;if(q+g>=1){if(q-g>0&&l>=0){i.i.a+=p;i.i.b+=f*g}else if(q-g<0&&k>=0){i.i.a+=p*q;i.i.b+=f}}}a.j.a=b.a;a.j.b=b.b;sJ(a,(eM(),aM),(DN(),d=Wv(Hkb(Lz),11),new atb(d,Wv(exb(d,d.length),11),0)))}
function C7(a){var b,c,d,e,f,g,h,i,j,k;d=new GU;for(g=new Tob(a.e.a);g.a<g.c.c.length;){e=Wv(Rob(g),61);k=0;e.k.c=xv(UF,syb,1,0,4,1);for(c=new Tob(m7(e));c.a<c.c.c.length;){b=Wv(Rob(c),89);if(b.e){vU(e.k,b);++k}}k==1&&(d.c[d.c.length]=e,true)}for(f=new Tob(d);f.a<f.c.c.length;){e=Wv(Rob(f),61);while(e.k.c.length==1){j=Wv(Rob(new Tob(e.k)),89);a.b[j.b]=j.f;h=j.c;i=j.d;for(c=new Tob(m7(e));c.a<c.c.c.length;){b=Wv(Rob(c),89);b==j||(b.e?h==b.c||i==b.d?(a.b[j.b]-=a.b[b.b]-b.f):(a.b[j.b]+=a.b[b.b]-b.f):e==h?b.c==e?(a.b[j.b]+=b.f):(a.b[j.b]-=b.f):b.c==e?(a.b[j.b]-=b.f):(a.b[j.b]+=b.f))}BU(h.k,j);BU(i.k,j);h==e?(e=j.d):(e=j.c)}}}
function _fb(a){var b,c,d,e,f,g,h,i,j,k;j=new aJ;h=new aJ;for(f=new Tob(a);f.a<f.c.c.length;){d=Wv(Rob(f),77);d.e=d.d.c.length;d.k=d.j.c.length;d.e==0&&(TI(j,d,j.c.b,j.c),true);d.k==0&&d.g.a.Y()==0&&(TI(h,d,h.c.b,h.c),true)}g=-1;while(j.b!=0){d=Wv(un(j,0),77);for(c=new Tob(d.j);c.a<c.c.c.length;){b=Wv(Rob(c),117);k=b.b;k.n=Plb(k.n,d.n+1);g=Plb(g,k.n);--k.e;k.e==0&&(TI(j,k,j.c.b,j.c),true)}}if(g>-1){for(e=WI(h,0);e.b!=e.d.c;){d=Wv(_ub(e),77);d.n=g}while(h.b!=0){d=Wv(un(h,0),77);for(c=new Tob(d.d);c.a<c.c.c.length;){b=Wv(Rob(c),117);i=b.a;if(i.g.a.Y()!=0){continue}i.n=Slb(i.n,d.n-1);--i.k;i.k==0&&(TI(h,i,h.c.b,h.c),true)}}}}
function QV(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;i=new GU;for(f=new Tob(b.b);f.a<f.c.c.length;){e=Wv(Rob(f),9);for(h=new Tob(e.f);h.a<h.c.c.length;){g=Wv(Rob(h),7);k=null;for(t=Wv(FU(g.e,xv(dB,gAb,12,0,0,1)),47),u=0,v=t.length;u<v;++u){s=t[u];if(!SW(s.d.f,c)){r=LV(a,b,c,s,s.c,(djb(),bjb),k);r!=k&&(i.c[i.c.length]=r,true);r.c&&(k=r)}}j=null;for(o=Wv(FU(g.b,xv(dB,gAb,12,0,0,1)),47),p=0,q=o.length;p<q;++p){n=o[p];if(!SW(n.c.f,c)){r=LV(a,b,c,n,n.d,(djb(),ajb),j);r!=j&&(i.c[i.c.length]=r,true);r.c&&(j=r)}}}}for(m=new Tob(i);m.a<m.c.c.length;){l=Wv(Rob(m),187);zU(b.b,l.a,0)!=-1||vU(b.b,l.a);l.c&&(d.c[d.c.length]=l,true)}}
function WO(a){var b,c,d,e,f,g,h,i,j;d=a.e.e.j;b=Wv(oW(a.e,(eM(),aM)),86).kb((DN(),CN));PO(a);for(f=new Tob(AW(a.e));f.a<f.c.c.length;){e=Wv(Rob(f),161);h=Wv(oW(e,LL),15);!h&&(h=new llb(0));i=e.e.j;g=(c=Wv(e.e,7).d,new EP(c.d,c.b,c.a,c.c));j=new II(e.e.i);switch(Wv(e.e,7).g.e){case 4:j.a=-i.a-h.a;j.b=a.s-i.b-(b?g.a:0);a.s-=cP(a,(sN(),rN))+i.b+(b?g.d+g.a:0);break;case 2:j.a=d.a+h.a;j.b=a.a+(b?g.d:0);a.a+=cP(a,(sN(),ZM))+i.b+(b?g.d+g.a:0);break;case 1:j.a=a.f+(b?g.b:0);j.b=-e.e.j.b-h.a;a.f+=cP(a,(sN(),$M))+i.a+(b?g.b+g.c:0);break;case 3:j.a=a.r-i.a-(b?g.c:0);j.b=d.b+h.a;a.r-=cP(a,(sN(),pN))+i.a+(b?g.b+g.c:0);}e.e.i.a=j.a;e.e.i.b=j.b}}
function u$(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;k=new Wub;l=new Wub;q=new Wub;r=new Wub;j=Wv(rJ(b,(Rib(),Jib)),15).a;f=j*Wv(rJ(b,(Mjb(),qjb)),15).a;Ckb(Ixb(Xv(rJ(b,(eM(),rL)))));for(i=(m=(new Snb(c.a)).a.bb().mb(),new Ynb(m));i.a.G();){h=(g=Wv(i.a.H(),21),Wv(g.yb(),9));n=Wv(rJ(h,hib),32);if(n==(sN(),$M)){l.a.db(h,l);for(e=Uh(iX(h));Cm(e);){d=Wv(Dm(e),12);stb(k,d.c.f)}}else if(n==pN){r.a.db(h,r);for(e=Uh(iX(h));Cm(e);){d=Wv(Dm(e),12);stb(q,d.c.f)}}}if(k.a.Y()!=0){o=new cdb(2,f);p=bdb(o,b,k,l,-j-b.d.b);if(p>0){a.a=j+(p-1)*f;b.d.b+=a.a;b.e.b+=a.a}}if(q.a.Y()!=0){o=new cdb(1,f);p=bdb(o,b,q,r,b.e.b+j-b.d.b);p>0&&(b.e.b+=j+(p-1)*f)}}
function Xt(a,b){var c,d,e,f,g,h,i,j,k;if((bmb(),b.length)==0){return a.fc(Yxb,Xxb,-1,-1)}k=hmb(b);emb(k.substr(0,3),'at ')&&(k=imb(k,3,k.length-3));k=k.replace(/\[.*?\]/g,'');g=k.indexOf('(');if(g==-1){g=k.indexOf('@');if(g==-1){j=k;k=''}else{j=hmb(imb(k,g+1,k.length-(g+1)));k=hmb(k.substr(0,g))}}else{c=k.indexOf(')',g);j=k.substr(g+1,c-(g+1));k=hmb(k.substr(0,g))}g=mmb(k,lmb(46));g!=-1&&(k=imb(k,g+1,k.length-(g+1)));(k.length==0||emb(k,'Anonymous function'))&&(k=Xxb);h=nmb(j,lmb(58));e=omb(j,lmb(58),h-1);i=-1;d=-1;f=Yxb;if(h!=-1&&e!=-1){f=j.substr(0,e);i=St(j.substr(e+1,h-(e+1)));d=St(imb(j,h+1,j.length-(h+1)))}return a.fc(f,k,i,d)}
function idb(a){var b,c,d,e,f,g,h,i,j,k;j=new GU;h=new GU;for(g=new Tob(a);g.a<g.c.c.length;){e=Wv(Rob(g),80);e.c=e.b.c.length;e.f=e.e.c.length;e.c==0&&(j.c[j.c.length]=e,true);e.f==0&&e.j.b==0&&(h.c[h.c.length]=e,true)}d=-1;while(j.c.length!=0){e=Wv(AU(j,0),80);for(c=new Tob(e.e);c.a<c.c.c.length;){b=Wv(Rob(c),118);k=b.b;k.i=Plb(k.i,e.i+1);d=Plb(d,k.i);--k.c;k.c==0&&(j.c[j.c.length]=k,true)}}if(d>-1){for(f=new Tob(h);f.a<f.c.c.length;){e=Wv(Rob(f),80);e.i=d}while(h.c.length!=0){e=Wv(AU(h,0),80);for(c=new Tob(e.b);c.a<c.c.c.length;){b=Wv(Rob(c),118);i=b.a;if(i.j.b>0){continue}i.i=Slb(i.i,e.i-1);--i.f;i.f==0&&(h.c[h.c.length]=i,true)}}}}
function PV(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p;if(!Ckb(Ixb(Xv(rJ(c,(eM(),$L)))))){return}for(h=new Tob(c.f);h.a<h.c.c.length;){g=Wv(Rob(h),7);l=Wv(FU(g.e,xv(dB,gAb,12,g.e.c.length,0,1)),47);for(j=0,k=l.length;j<k;++j){i=l[j];f=i.d.f==c;e=f&&Ckb(Ixb(Xv(rJ(i,$L))));if(e){n=i.c;m=Wv(Smb(a.b,n),9);if(!m){m=NW(n,(KM(),IM),n.g,-1,n.j,Wv(rJ(b,sL),59),b);sJ(m,(Rib(),uib),n);Umb(a.b,n,m);vU(b.b,m)}p=i.d;o=Wv(Smb(a.b,p),9);if(!o){o=NW(p,(KM(),IM),p.g,1,p.j,Wv(rJ(b,sL),59),b);sJ(o,(Rib(),uib),p);Umb(a.b,p,o);vU(b.b,o)}d=IV(i);dW(d,Wv(yU(m.f,0),7));eW(d,Wv(yU(o.f,0),7));Fd(a.a,i,new XV(d,b,(djb(),bjb)));Wv(rJ(b,(Rib(),jib)),18).ib((ohb(),hhb))}}}}
function vfb(a,b,c,d,e,f){var g,h,i,j,k,l,m,n,o,p,q,r,s,t;n=sgb(a.g);p=sgb(c.g);o=vI(xI(a.i),a.a);q=vI(xI(c.i),c.a);g=vI(new II(o),CI(new GI(n),b));h=vI(new II(q),CI(new GI(p),d));j=ogb(a,e);e==(sN(),pN)||e==ZM?(j+=f):(j-=f);m=new FI;r=new FI;switch(e.e){case 1:case 3:m.a=g.a;m.b=o.b+j;r.a=h.a;r.b=m.b;break;case 2:case 4:m.a=o.a+j;m.b=g.b;r.a=m.a;r.b=h.b;break;default:return null;}k=CI(vI(new HI(m.a,m.b),r),0.5);l=new ufb(Bv(tv(qz,1),Fzb,10,0,[o,g,m,k,r,h,q]));i=ifb(l);t=jfb(l);switch(e.e){case 1:case 3:l.a=i;s=lfb(l);break;case 2:case 4:l.a=t;s=kfb(l);break;default:return null;}bfb(l,new Ffb(Bv(tv(qz,1),Fzb,10,0,[i,t,s,o,q])));return l}
function qU(a,b,c,d){var e,f,g,h,i,j,k,l,m,n;f=new eV(b);l=lU(a,b,f);n=Nlb(Wv(rJ(b,(eM(),dM)),15).a,1);for(k=new Tob(l.a);k.a<k.c.c.length;){j=Wv(Rob(k),27);i=pU(Wv(j.a,10),Wv(j.b,10),n);o=true;o=o&YU(c,new HI(i.d,i.e));o=o&YU(c,uI(new HI(i.d,i.e),i.c,0));o=o&YU(c,uI(new HI(i.d,i.e),0,i.b));o&YU(c,uI(new HI(i.d,i.e),i.c,i.b))}m=f.d;h=pU(Wv(l.b.a,10),Wv(l.b.b,10),n);if(m==(sN(),rN)||m==ZM){d.c[m.e]=Qlb(d.c[m.e],h.e);d.b[m.e]=Nlb(d.b[m.e],h.e+h.b)}else{d.c[m.e]=Qlb(d.c[m.e],h.d);d.b[m.e]=Nlb(d.b[m.e],h.d+h.c)}e=Vzb;g=f.c.f.e;switch(m.e){case 4:e=g.c;break;case 2:e=g.b;break;case 1:e=g.a;break;case 3:e=g.d;}d.a[m.e]=Nlb(d.a[m.e],e);return f}
function OV(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q;f=new GU;for(j=new Tob(d);j.a<j.c.c.length;){h=Wv(Rob(j),187);g=null;if(h.f==(djb(),bjb)){for(o=new Tob(h.e);o.a<o.c.c.length;){n=Wv(Rob(o),12);q=n.d.f;if(hX(q)==b){GV(a,b,h,n,h.b,n.d)}else if(!c||SW(q,c)){HV(a,b,h,d,n)}else{m=LV(a,b,c,n,h.b,bjb,g);m!=g&&(f.c[f.c.length]=m,true);m.c&&(g=m)}}}else{for(l=new Tob(h.e);l.a<l.c.c.length;){k=Wv(Rob(l),12);p=k.c.f;if(hX(p)==b){GV(a,b,h,k,k.c,h.b)}else if(!c||SW(p,c)){continue}else{m=LV(a,b,c,k,h.b,ajb,g);m!=g&&(f.c[f.c.length]=m,true);m.c&&(g=m)}}}}for(i=new Tob(f);i.a<i.c.c.length;){h=Wv(Rob(i),187);zU(b.b,h.a,0)!=-1||vU(b.b,h.a);h.c&&(e.c[e.c.length]=h,true)}}
function TO(a){var b,c,d,e;b=a.e.j;for(d=new Tob(AW(a));d.a<d.c.c.length;){c=Wv(Rob(d),161);e=Wv(oW(c,(eM(),LL)),15);!e&&(e=new llb(0));switch(Wv(c.e,7).g.e){case 4:c.e.i.b=b.b*Ixb(Yv(oW(c,HO)));c.e.i.a=-c.e.j.a-e.a;break;case 2:c.e.i.b=b.b*Ixb(Yv(oW(c,HO)));c.e.i.a=b.a+e.a;break;case 1:c.e.i.a=b.a*Ixb(Yv(oW(c,HO)));c.e.i.b=-c.e.j.b-e.a;break;case 3:c.e.i.a=b.a*Ixb(Yv(oW(c,HO)));c.e.i.b=b.b+e.a;}switch(Wv(c.e,7).g.e){case 4:c.e.i.b=b.b*Ixb(Yv(oW(c,HO)));c.e.i.a=-c.e.j.a-e.a;break;case 2:c.e.i.b=b.b*Ixb(Yv(oW(c,HO)));c.e.i.a=b.a+e.a;break;case 1:c.e.i.a=b.a*Ixb(Yv(oW(c,HO)));c.e.i.b=-c.e.j.b-e.a;break;case 3:c.e.i.a=b.a*Ixb(Yv(oW(c,HO)));c.e.i.b=b.b+e.a;}}}
function C2(a){var b,c,d,e,f,g,h,i,j;f=a.f;e=pr(Zdb(a));j=WI(Eo(a.g),0);while(j.b!=j.d.c){i=Wv(_ub(j),7);if(i.e.c.length==0){for(c=new Tob(i.b);c.a<c.c.c.length;){b=Wv(Rob(c),12);d=b.c;if(e.a.R(d)){g=new Fnb(f.f,0);h=(Bxb(g.b<g.d.Y()),Wv(g.d.sb(g.c=g.b++),7));while(h!=i){h=(Bxb(g.b<g.d.Y()),Wv(g.d.sb(g.c=g.b++),7))}Anb(g,d);$ub(j,d);J2(d,i.g);avb(j);avb(j);e.a.eb(d)!=null}}}else{for(c=new Tob(i.e);c.a<c.c.c.length;){b=Wv(Rob(c),12);d=b.d;if(e.a.R(d)){g=new Fnb(f.f,0);h=(Bxb(g.b<g.d.Y()),Wv(g.d.sb(g.c=g.b++),7));while(h!=i){h=(Bxb(g.b<g.d.Y()),Wv(g.d.sb(g.c=g.b++),7))}Bxb(g.b>0);g.a.sb(g.c=--g.b);Anb(g,d);$ub(j,d);J2(d,i.g);avb(j);avb(j);e.a.eb(d)!=null}}}}}
function IP(b){var c,d,e,f,g,h,i,j,k;g=new Uu(b);f=Pu(g,'graph');j=Pu(g,'success');e=Pu(g,'error');h=Pu(g,'options');try{if(!f||!f.kc()){throw new $J("Mandatory parameter missing, 'graph' must be specified")}AQ(new CQ,f.kc(),h?h.kc():null);i=f.kc().a;!!j&&!!j.kc()?HP(j.kc().a,i):HP(null,i)}catch(a){a=OH(a);if(aw(a,73)){k=a;!!e&&!!e.kc()?HP(e.kc().a,DQ(k).a):HP(null,DQ(k).a)}else if(aw(a,54)){c=a;d=new Tu;Ru(d,'type',new lv(Ikb(c.$c)));c.bc()!=null?Ru(d,Dzb,new lv(c.bc())):Ru(d,Dzb,new lv('null (sic)'));Ru(d,Ezb,new lv(Hb(new Kb('\n'),new wnb(new opb((c.g==null&&(c.g=Pt(c)),c.g))))));!!e&&!!e.kc()?HP(e.kc().a,d.a):HP(null,d.a);at(c,(Fmb(),Dmb),'')}else throw NH(a)}}
function e9(a,b,c){var d,e,f,g,h,i,j,k,l,m;if(c){d=-1;k=new Fnb(b,0);while(k.b<k.d.Y()){h=(Bxb(k.b<k.d.Y()),Wv(k.d.sb(k.c=k.b++),9));l=a.a[h.d.k][h.k].a;if(l==null){g=d+1;f=new Fnb(b,k.b);while(f.b<f.d.Y()){m=i9(a,(Bxb(f.b<f.d.Y()),Wv(f.d.sb(f.c=f.b++),9))).a;if(m!=null){g=(Dxb(m),m);break}}l=(d+g)/2;a.a[h.d.k][h.k].a=l;a.a[h.d.k][h.k].d=(Dxb(l),l);a.a[h.d.k][h.k].b=1}d=(Dxb(l),l)}}else{e=0;for(j=new Tob(b);j.a<j.c.c.length;){h=Wv(Rob(j),9);a.a[h.d.k][h.k].a!=null&&(e=Nlb(e,Ixb(a.a[h.d.k][h.k].a)))}e+=2;for(i=new Tob(b);i.a<i.c.c.length;){h=Wv(Rob(i),9);if(a.a[h.d.k][h.k].a==null){l=wvb(a.e,24)*FAb*e-1;a.a[h.d.k][h.k].a=l;a.a[h.d.k][h.k].d=l;a.a[h.d.k][h.k].b=1}}}}
function RO(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o;i=0;j=0;o=0;n=0;g=0;m=0;l=0;k=0;for(f=new Lsb((new Fsb(a.c)).a);htb(f.a);){e=(f.b=itb(f.a),new Psb(f.c,f.b));d=Wv(e.b.b[e.a.e],62);switch(Wv(e.a,67).e){case 12:case 13:case 14:m+=d.c+b;break;case 15:case 16:case 17:l+=d.c+b;g=Nlb(g,d.b+b);break;case 18:case 19:case 20:k+=d.c+b;break;case 0:case 1:case 2:o+=d.c+b;break;case 3:case 4:case 5:n+=d.c+b;break;case 6:case 7:case 8:i+=d.b+b;break;case 9:case 10:case 11:j+=d.b+b;}}i-=b;j-=b;o-=b;n-=b;m+=m!=0?b:0;l+=l!=0?b:0;k+=k!=0?b:0;h=a.p.d+g+a.p.a;h+=h!=0?b:0;c.a=Nlb(c.a,o);c.a=Nlb(c.a,m);c.a=Nlb(c.a,l);c.a=Nlb(c.a,k);c.a=Nlb(c.a,n);c.b=Nlb(c.b,i);c.b=Nlb(c.b,h);c.b=Nlb(c.b,j)}
function T9(a){var b,c,d,e,f,g,h,i;b=null;for(d=new Tob(a);d.a<d.c.c.length;){c=Wv(Rob(d),102);Ixb(W9(c.g,c.d[0]).a);c.b=null;if(!!c.e&&c.e.Y()>0&&c.c==0){!b&&(b=new GU);b.c[b.c.length]=c}}if(b){while(b.c.length!=0){c=Wv(AU(b,0),102);if(!!c.b&&c.b.c.length>0){for(f=(!c.b&&(c.b=new GU),new Tob(c.b));f.a<f.c.c.length;){e=Wv(Rob(f),102);if(Ixb(W9(e.g,e.d[0]).a)==Ixb(W9(c.g,c.d[0]).a)){if(zU(a,e,0)>zU(a,c,0)){return new RJ(e,c)}}else if(Ixb(W9(e.g,e.d[0]).a)>Ixb(W9(c.g,c.d[0]).a)){return new RJ(e,c)}}}for(h=(!c.e&&(c.e=new GU),c.e).mb();h.G();){g=Wv(h.H(),102);i=(!g.b&&(g.b=new GU),g.b);Fxb(0,i.c.length);fxb(i.c,0,c);g.c==i.c.length&&(b.c[b.c.length]=g,true)}}}return null}
function R0(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;l=(mp(),new ntb);for(k=(Il(),new Im(Dl(ul(a.a,new yl))));Cm(k);){j=Wv(Dm(k),9);e=Q0(j,(sN(),ZM));for(d=new Tob(e);d.a<d.c.c.length;){c=Wv(Rob(d),7);for(g=new Tob(c.e);g.a<g.c.c.length;){f=Wv(Rob(g),12);kP();p=f.d.f;(p.g==(CX(),zX)||p.g==yX)&&(p=Wv(rJ(p,(Rib(),rib)),7).f);if(Ktb(l.d,p)){b=Wv(re(Ktb(l.d,p)),171)}else{e.c.length==2?gw(c)===gw((Cxb(0,e.c.length),e.c[0]))?(b=gP):(b=hP):(b=gP);Ltb(l.d,p,b)}for(i=new Tob(f.b);i.a<i.c.c.length;){h=Wv(Rob(i),33);sJ(h,(Rib(),pib),b)}for(o=new Tob(f.c.c);o.a<o.c.c.length;){m=Wv(Rob(o),33);sJ(m,(Rib(),pib),b)}for(n=new Tob(f.d.c);n.a<n.c.c.length;){m=Wv(Rob(n),33);sJ(m,(Rib(),pib),b)}}}}}
function lZ(a,b){var c,d,e,f,g,h,i,j,k;if(tl(mX(b))!=1||Wv(ql(mX(b)),12).d.f.g!=(CX(),zX)){return null}f=Wv(ql(mX(b)),12);c=f.d.f;sX(c,(CX(),wX));sJ(c,(Rib(),qib),null);sJ(c,rib,null);sJ(c,(eM(),TL),Wv(rJ(b,TL),28));sJ(c,JL,Wv(rJ(b,JL),86));e=rJ(f.c,uib);g=null;for(j=nX(c,(sN(),ZM)).mb();j.G();){h=Wv(j.H(),7);if(h.e.c.length!=0){sJ(h,uib,e);k=f.c;h.j.a=k.j.a;h.j.b=k.j.b;h.a.a=k.a.a;h.a.b=k.a.b;xU(h.c,k.c);k.c.c=xv(UF,syb,1,0,4,1);g=h;break}}sJ(f.c,uib,null);if(!sl(nX(b,ZM))){for(i=new Tob(Ao(nX(b,ZM)));i.a<i.c.c.length;){h=Wv(Rob(i),7);if(h.e.c.length==0){d=new RX;QX(d,ZM);d.j.a=h.j.a;d.j.b=h.j.b;PX(d,c);sJ(d,uib,rJ(h,uib));PX(h,null)}else{PX(g,c)}}}c.j.b=b.j.b;vU(a.b,c);return c}
function _O(a){var b,c,d,e,f,g,h,i,j;f=a.e.e.j;g=new II(f);i=Wv(oW(a.e,(eM(),aM)),86);j=Wv(oW(a.e,bM),86);h=Wv(oW(a.e,TL),28);b=Zsb(i,(DN(),CN));if(i.c==0){return}f.a=0;f.b=0;d=null;switch(h.e){case 1:case 2:case 3:d=MO(a,a.k);break;case 4:d=new II(g);break;case 5:d=KO(a.e,b);}if(Zsb(i,BN)){if(d){f.a=Nlb(f.a,d.a);f.b=Nlb(f.b,d.b)}if(b){f.a=Nlb(f.a,a.q.b+a.q.c+a.k);f.b=Nlb(f.b,a.q.d+a.q.a+a.k)}}Zsb(i,AN)&&Qob(new Tob(zW(a.e)))&&RO(a,a.d,f);if(Zsb(i,zN)){e=Wv(oW(a.e,IL),15).a;c=Wv(oW(a.e,HL),15).a;if(Zsb(j,(MN(),KN))){e<=0&&(e=20);c<=0&&(c=20)}if(Zsb(j,LN)){e>0&&(f.a=Nlb(f.a,e+a.q.b+a.q.c));c>0&&(f.b=Nlb(f.b,c+a.q.d+a.q.a))}else{e>0&&(f.a=Nlb(f.a,e));c>0&&(f.b=Nlb(f.b,c))}}pW(a.e,f)}
function ewb(a,b,c){var d,e,f,g,h,i,j,k,l,m,n;if(!a.b){return false}g=null;m=null;i=new ywb(null,null);e=1;i.a[1]=a.b;l=i;while(l.a[e]){j=e;h=m;m=l;l=l.a[e];d=a.a.$b(b,l.d);e=d<0?0:1;d==0&&(!c.c||ovb(l.e,c.d))&&(g=l);if(!(!!l&&l.b)&&!awb(l.a[e])){if(awb(l.a[1-e])){m=m.a[j]=hwb(l,e)}else if(!awb(l.a[1-e])){n=m.a[1-j];if(n){if(!awb(n.a[1-j])&&!awb(n.a[j])){m.b=false;n.b=true;l.b=true}else{f=h.a[1]==m?1:0;awb(n.a[j])?(h.a[f]=gwb(m,j)):awb(n.a[1-j])&&(h.a[f]=hwb(m,j));l.b=h.a[f].b=true;h.a[f].a[0].b=false;h.a[f].a[1].b=false}}}}}if(g){c.b=true;c.d=g.e;if(l!=g){k=new ywb(l.d,l.e);fwb(a,i,g,k);m==g&&(m=k)}m.a[m.a[1]==l?1:0]=l.a[!l.a[0]?1:0];--a.c}a.b=i.a[1];!!a.b&&(a.b.b=false);return c.b}
function v$(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;d=Wv(rJ(a,(eM(),TL)),28);i=a.e;h=a.a;c=Wv(rJ(a,(Rib(),Xhb)),15).a;j=i.a+h.b+h.c+2*c;k=0-h.d-c-a.d.b;n=i.b+h.d+h.a+2*c-a.d.b;l=new GU;o=new GU;for(f=(m=(new Snb(b.a)).a.bb().mb(),new Ynb(m));f.a.G();){e=(g=Wv(f.a.H(),21),Wv(g.yb(),9));switch(d.e){case 1:case 2:case 3:m$(e);break;case 4:p=Wv(rJ(e,SL),10);q=!p?0:p.a;e.i.a=j*Ixb(Yv(rJ(e,Cib)))-q;fX(e,true,false);break;case 5:r=Wv(rJ(e,SL),10);s=!r?0:r.a;e.i.a=Ixb(Yv(rJ(e,Cib)))-s;fX(e,true,false);i.a=Nlb(i.a,e.i.a+e.j.a/2);}switch(Wv(rJ(e,hib),32).e){case 1:e.i.b=k;l.c[l.c.length]=e;break;case 3:e.i.b=n;o.c[o.c.length]=e;}}switch(d.e){case 1:case 2:o$(l,a);o$(o,a);break;case 3:t$(l,a);t$(o,a);}}
function OY(a){var b,c,d,e,f,g;d=Wv(rJ(a.a.g,(eM(),JL)),86);if(jf(d,(oM(),b=Wv(Hkb(Gz),11),new atb(b,Wv(exb(b,b.length),11),0))));else if(Xe(d,Usb(gM))){c=Wv(Wv(Dd(a.a.b,a.b),20).sb(0),33);a.b.i.a=c.i.a;a.b.i.b=c.i.b}else if(Xe(d,Usb(iM))){e=Wv(yU(a.a.c,a.a.c.c.length-1),9);f=Wv(Wv(Dd(a.a.b,a.b),20).sb(Wv(Dd(a.a.b,a.b),20).Y()-1),33);g=e.j.a-(f.i.a+f.j.a);a.b.i.a=a.a.g.j.a-g-a.b.j.a;a.b.i.b=f.i.b}else if(Xe(d,Vsb(mM,Bv(tv(Gz,1),uyb,41,0,[fM])))){c=Wv(Wv(Dd(a.a.b,a.b),20).sb(0),33);a.b.i.a=(a.a.g.j.a-a.b.j.a)/2;a.b.i.b=c.i.b}else if(Xe(d,Usb(mM))){c=Wv(Wv(Dd(a.a.b,a.b),20).sb(0),33);a.b.i.b=c.i.b}else if(Xe(d,Usb(fM))){c=Wv(Wv(Dd(a.a.b,a.b),20).sb(0),33);a.b.i.a=(a.a.g.j.a-a.b.j.a)/2;a.b.i.b=c.i.b}return null}
function NZ(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q;for(o=new Tob(a);o.a<o.c.c.length;){n=Wv(Rob(o),9);MZ(n.i);MZ(n.j);PZ(n);RZ(n);for(q=new Tob(n.f);q.a<q.c.c.length;){p=Wv(Rob(q),7);MZ(p.i);MZ(p.a);MZ(p.j);QX(p,QZ(p.g));f=Wv(rJ(p,(eM(),UL)),24);!!f&&sJ(p,UL,Elb(-f.a));for(e=new Tob(p.e);e.a<e.c.c.length;){d=Wv(Rob(e),12);for(c=WI(d.a,0);c.b!=c.d.c;){b=Wv(_ub(c),10);MZ(b)}i=Wv(rJ(d,CL),44);if(i){for(h=WI(i,0);h.b!=h.d.c;){g=Wv(_ub(h),10);MZ(g)}}for(l=new Tob(d.b);l.a<l.c.c.length;){j=Wv(Rob(l),33);MZ(j.i);MZ(j.j)}}for(m=new Tob(p.c);m.a<m.c.c.length;){j=Wv(Rob(m),33);MZ(j.i);MZ(j.j)}}if(n.g==(CX(),xX)){sJ(n,(Rib(),hib),QZ(Wv(rJ(n,hib),32)));OZ(n)}for(k=new Tob(n.c);k.a<k.c.c.length;){j=Wv(Rob(k),33);MZ(j.j);MZ(j.i)}}}
function YP(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;TP(c);if(SW(b.d.f,b.c.f)){k=b.c;l=MI(Bv(tv(qz,1),Fzb,10,0,[k.i,k.a]));j=k.f.b;uI(l,-j.b,-j.d);l.a-=d.a;l.b-=d.b}else{l=MX(b.c)}l.a+=d.a;l.b+=d.b;m=new Tu;VP(a,m,'x',l.a);VP(a,m,'y',l.b);Ru(c,'sourcePoint',m);n=MX(b.d);rJ(b,(Rib(),Pib))!=null&&vI(n,Wv(rJ(b,Pib),10));vI(n,d);o=new Tu;VP(a,o,'x',n.a);VP(a,o,'y',n.b);Ru(c,'targetPoint',o);e=new ju;s=hJ(b.a,d);f=0;for(r=WI(s,0);r.b!=r.d.c;){p=Wv(_ub(r),10);i=new Tu;VP(a,i,'x',p.a);VP(a,i,'y',p.b);hu(e,f++,i)}s.b==0?Ru(c,Hzb,null):Ru(c,Hzb,e);g=Wv(rJ(b,(eM(),CL)),44);f=0;if(g){hJ(g,d);h=new ju;for(q=WI(g,0);q.b!=q.d.c;){p=Wv(_ub(q),10);i=new Tu;VP(a,i,'x',p.a);VP(a,i,'y',p.b);hu(h,f++,i)}Ru(c,Izb,h)}else{Ru(c,Izb,null)}}
function pZ(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r;p=a.i;q=a.j;m=a.e;if(b){l=d/2*(b.Y()-1);n=0;for(j=b.mb();j.G();){h=Wv(j.H(),9);l+=h.j.a;n=Nlb(n,h.j.b)}r=p.a-(l-q.a)/2;g=p.b-m.d+n;e=q.a/(b.Y()+1);f=e;for(i=b.mb();i.G();){h=Wv(i.H(),9);h.i.a=r;h.i.b=g-h.j.b;r+=h.j.a+d/2;k=oZ(h);k.i.a=h.j.a/2-k.a.a;k.i.b=h.j.b;o=Wv(rJ(h,(Rib(),Zhb)),7);if(o.b.c.length+o.e.c.length==1){o.i.a=f-o.a.a;o.i.b=0;PX(o,a)}f+=e}}if(c){l=d/2*(c.Y()-1);n=0;for(j=c.mb();j.G();){h=Wv(j.H(),9);l+=h.j.a;n=Nlb(n,h.j.b)}r=p.a-(l-q.a)/2;g=p.b+q.b+m.a-n;e=q.a/(c.Y()+1);f=e;for(i=c.mb();i.G();){h=Wv(i.H(),9);h.i.a=r;h.i.b=g;r+=h.j.a+d/2;k=oZ(h);k.i.a=h.j.a/2-k.a.a;k.i.b=0;o=Wv(rJ(h,(Rib(),Zhb)),7);if(o.b.c.length+o.e.c.length==1){o.i.a=f-o.a.a;o.i.b=q.b;PX(o,a)}f+=e}}}
function Jab(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;w=0;n=0;for(l=new Tob(b.f);l.a<l.c.c.length;){k=Wv(Rob(l),9);m=0;h=0;i=c?Wv(rJ(k,Fab),24).a:eyb;r=d?Wv(rJ(k,Gab),24).a:eyb;j=i>r?i:r;for(t=new Tob(k.f);t.a<t.c.c.length;){s=Wv(Rob(t),7);u=k.i.b+s.i.b+s.a.b;if(d){for(g=new Tob(s.e);g.a<g.c.c.length;){f=Wv(Rob(g),12);p=f.d;o=p.f;if(b!=a.a[o.k]){q=Plb(Wv(rJ(o,Fab),24).a,Wv(rJ(o,Gab),24).a);v=Wv(rJ(f,(Rib(),Eib)),24).a;if(v>=j&&v>=q){m+=o.i.b+p.i.b+p.a.b-u;++h}}}}if(c){for(g=new Tob(s.b);g.a<g.c.c.length;){f=Wv(Rob(g),12);p=f.c;o=p.f;if(b!=a.a[o.k]){q=Plb(Wv(rJ(o,Fab),24).a,Wv(rJ(o,Gab),24).a);v=Wv(rJ(f,(Rib(),Eib)),24).a;if(v>=j&&v>=q){m+=o.i.b+p.i.b+p.a.b-u;++h}}}}}if(h>0){w+=m/h;++n}}if(n>0){b.a=e*w/n;b.i=n}else{b.a=0;b.i=0}}
function Kab(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;n=b.c.length;m=0;for(l=new Tob(a.c);l.a<l.c.c.length;){k=Wv(Rob(l),16);r=k.a;if(r.c.length==0){continue}q=new Tob(r);j=0;s=null;e=Wv(Rob(q),9);while(e){f=Wv(yU(b,e.k),111);if(f.c>=0){i=null;h=new Fnb(k.a,j+1);while(h.b<h.d.Y()){g=(Bxb(h.b<h.d.Y()),Wv(h.d.sb(h.c=h.b++),9));i=Wv(yU(b,g.k),111);if(i.d==f.d&&i.c<f.c){break}else{i=null}}if(i){if(s){DU(d,e.k,Elb(Wv(yU(d,e.k),24).a-1));Wv(yU(c,s.k),20).nb(f)}f=Vab(f,e,n++);b.c[b.c.length]=f;vU(c,new GU);if(s){Wv(yU(c,s.k),20).ib(f);vU(d,Elb(1))}else{vU(d,Elb(0))}}}o=null;if(q.a<q.c.c.length){o=Wv(Rob(q),9);p=Wv(yU(b,o.k),111);Wv(yU(c,e.k),20).ib(p);DU(d,o.k,Elb(Wv(yU(d,o.k),24).a+1))}f.d=m;f.c=j++;s=e;e=o}++m}Ckb(Ixb(Xv(rJ(a,(eM(),rL)))))&&undefined}
function gS(a,b){var c;if(a.e){throw new ulb((Gkb(nA),'The '+nA.j+Yzb))}if(!MR(a.a,b)){throw new gt('The direction '+b+' is not supported by the CGraph instance.')}if(b==a.d){return a}c=a.d;a.d=b;switch(c.e){case 0:switch(b.e){case 2:dS(a);break;case 1:kS(a);dS(a);break;case 4:qS(a);dS(a);break;case 3:qS(a);kS(a);dS(a);}break;case 2:switch(b.e){case 1:kS(a);lS(a);break;case 4:qS(a);dS(a);break;case 3:qS(a);kS(a);dS(a);}break;case 1:switch(b.e){case 2:kS(a);lS(a);break;case 4:kS(a);qS(a);dS(a);break;case 3:kS(a);qS(a);kS(a);dS(a);}break;case 4:switch(b.e){case 2:qS(a);dS(a);break;case 1:qS(a);kS(a);dS(a);break;case 3:kS(a);lS(a);}break;case 3:switch(b.e){case 2:kS(a);qS(a);dS(a);break;case 1:kS(a);qS(a);kS(a);dS(a);break;case 4:kS(a);lS(a);}}return a}
function c9(a,b,c){var d,e,f,g,h,i,j,k,l;if(a.a[b.d.k][b.k].e){return}else{a.a[b.d.k][b.k].e=true}a.a[b.d.k][b.k].b=0;a.a[b.d.k][b.k].d=0;a.a[b.d.k][b.k].a=null;for(k=new Tob(b.f);k.a<k.c.c.length;){j=Wv(Rob(k),7);l=c?new fY(j):new lY(j);for(i=l.mb();i.G();){h=Wv(i.H(),7);g=h.f;if(g.d==b.d){if(g!=b){c9(a,g,c);a.a[b.d.k][b.k].b+=a.a[g.d.k][g.k].b;a.a[b.d.k][b.k].d+=a.a[g.d.k][g.k].d}}else{a.a[b.d.k][b.k].d+=a.d[h.k];++a.a[b.d.k][b.k].b}}}f=Wv(rJ(b,(Rib(),Shb)),20);if(f){for(e=f.mb();e.G();){d=Wv(e.H(),9);if(b.d==d.d){c9(a,d,c);a.a[b.d.k][b.k].b+=a.a[d.d.k][d.k].b;a.a[b.d.k][b.k].d+=a.a[d.d.k][d.k].d}}}if(a.a[b.d.k][b.k].b>0){a.a[b.d.k][b.k].d+=wvb(a.e,24)*FAb*0.07000000029802322-0.03500000014901161;a.a[b.d.k][b.k].a=a.a[b.d.k][b.k].d/a.a[b.d.k][b.k].b}}
function Sbb(a,b){var c,d,e,f,g,h,i,j,k,l,m;for(e=new Tob(a.a.c);e.a<e.c.c.length;){c=Wv(Rob(e),16);for(i=new Tob(c.a);i.a<i.c.c.length;){h=Wv(Rob(i),9);b.i[h.k]=h;b.g[h.k]=b.k==(Lbb(),Kbb)?Vzb:Uzb}}g=a.a.c;b.c==(Gbb(),Ebb)&&(g=aw(g,87)?Ii(Wv(g,87)):aw(g,88)?Wv(g,88).a:aw(g,63)?new ap(g):new Ro(g));Acb(a.e,b,a.b);bpb(b.n);for(f=g.mb();f.G();){c=Wv(f.H(),16);j=c.a;b.k==(Lbb(),Kbb)&&(j=aw(j,87)?Ii(Wv(j,87)):aw(j,88)?Wv(j,88).a:aw(j,63)?new ap(j):new Ro(j));for(m=j.mb();m.G();){l=Wv(m.H(),9);b.f[l.k]==l&&Tbb(a,l,b)}}Ubb(a,b);for(d=g.mb();d.G();){c=Wv(d.H(),16);for(m=new Tob(c.a);m.a<m.c.c.length;){l=Wv(Rob(m),9);b.n[l.k]=b.n[b.f[l.k].k];if(l==b.f[l.k]){k=Ixb(b.g[b.i[l.k].k]);(b.k==(Lbb(),Kbb)&&k>Vzb||b.k==Jbb&&k<Uzb)&&(b.n[l.k]=Ixb(b.n[l.k])+k)}}}a.e.Jc()}
function NQ(a,b){var c,d,e,f,g,h,i,j,k,l,m;pJ(b,Bv(tv(rz,1),syb,79,0,[(Rib(),Jib),Xhb,(Mjb(),Kjb),Rhb]));j=Wv(rJ(b,Jib),15).a;Wv(rJ(b,qjb),15).a*j<2&&sJ(b,qjb,new llb(2/j));k=Wv(rJ(b,(eM(),sL)),59);k==(sK(),qK)&&sJ(b,sL,PW(b));l=Wv(rJ(b,Hjb),24);l.a==0?sJ(b,Gib,new yvb):sJ(b,Gib,new zvb(l.a));m=new $jb(b);sJ(b,Kib,m);e=KQ(a,Wv(rJ(b,ljb),180));h=KQ(a,Wv(rJ(b,zjb),180));d=KQ(a,Wv(rJ(b,kjb),180));i=KQ(a,Wv(rJ(b,Ajb),180));f=KQ(a,Ocb(Wv(rJ(b,eib),122)));g=new WQ;sJ(b,_hb,g);QQ(QQ(QQ(QQ(QQ(QQ(g,e.qc(b)),h.qc(b)),d.qc(b)),i.qc(b)),f.qc(b)),MQ(b));c=(Mh(30,Vyb),new HU(30));sJ(b,Fib,c);xU(c,LQ(a,g,0));c.c[c.c.length]=e;xU(c,LQ(a,g,1));c.c[c.c.length]=h;xU(c,LQ(a,g,2));c.c[c.c.length]=d;xU(c,LQ(a,g,3));c.c[c.c.length]=i;xU(c,LQ(a,g,4));c.c[c.c.length]=f;xU(c,LQ(a,g,5))}
function YO(a,b){var c,d,e,f,g,h;f=Li(DW(a));if(f.Nb().V()){return}e=Wv(rJ(Wv(Wv(Wv(f.Nb().sb(0),129),224).e,33),(kP(),iP)),171);e=e==jP?hP:e;h=0;switch(Wv(a.e,7).g.e){case 4:case 2:e==hP&&(h=a.e.j.b);break;case 3:h=a.e.j.b;}(Wv(a.e,7).g==(sN(),$M)||e==gP)&&(f=Ii(f));for(d=Xl(f.Nb().mb());d.G();){c=Wv(d.H(),129);g=new II(c.e.i);if(e==gP){switch(Wv(a.e,7).g.e){case 1:case 4:g.a=-c.e.j.a-b;g.b=h-b-c.e.j.b;h-=b+c.e.j.b;break;case 2:g.a=a.e.j.a+b;g.b=h-b-c.e.j.b;h-=b+c.e.j.b;break;case 3:g.a=-c.e.j.a-b;g.b=h+b;h+=b+c.e.j.b;}}else{switch(Wv(a.e,7).g.e){case 4:g.a=-c.e.j.a-b;g.b=h+b;h+=b+c.e.j.b;break;case 2:g.a=a.e.j.a+b;g.b=h+b;h+=b+c.e.j.b;break;case 1:g.a=a.e.j.a+b;g.b=h-b-c.e.j.b;h-=b+c.e.j.b;break;case 3:g.a=a.e.j.a+b;g.b=h+b;h+=b+c.e.j.b;}}c.e.i.a=g.a;c.e.i.b=g.b}}
function fab(a,b,c){var d,e,f,g,h,i,j,k,l,m,n;d=0;e=0;for(k=0;k<a.length;k++){i=a[k];if(LM(Wv(rJ(i,(eM(),TL)),28))){for(g=nX(i,(sN(),ZM)).mb();g.G();){f=Wv(g.H(),7);if(f.b.c.length+f.e.c.length>0){d+=f.b.c.length+f.e.c.length;Umb(b,f,Elb(d))}}}else{for(h=nX(i,(sN(),ZM)).mb();h.G();){f=Wv(h.H(),7);d+=f.b.c.length+f.e.c.length}for(g=nX(i,ZM).mb();g.G();){f=Wv(g.H(),7);f.b.c.length+f.e.c.length>0&&Umb(b,f,Elb(d))}}}for(j=a.length-1;j>=0;j--){i=a[j];if(LM(Wv(rJ(i,(eM(),TL)),28))){for(m=nX(i,(sN(),rN)).mb();m.G();){l=Wv(m.H(),7);if(l.b.c.length+l.e.c.length>0){e+=l.b.c.length+l.e.c.length;Umb(c,l,Elb(e))}}}else{for(n=nX(i,(sN(),rN)).mb();n.G();){l=Wv(n.H(),7);e+=l.b.c.length+l.e.c.length}for(m=nX(i,rN).mb();m.G();){l=Wv(m.H(),7);l.b.c.length+l.e.c.length>0&&Umb(c,l,Elb(e))}}}}
function wfb(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r;m=sgb(a.g);o=sgb(b.g);n=vI(xI(a.i),a.a);p=vI(xI(b.i),b.a);i=vI(new HI(n.a,n.b),CI(new GI(m),1.3*c));q=vI(new HI(p.a,p.b),CI(new GI(o),1.3*d));h=Jlb(i.a-q.a);h<e&&(a.g==(sN(),rN)||a.g==ZM?i.a<q.a?(i.a=q.a-e):(i.a=q.a+e):i.a<q.a?(q.a=i.a+e):(q.a=i.a-e));f=0;g=0;switch(a.g.e){case 4:f=2*(n.a-c)-0.5*(i.a+q.a);break;case 2:f=2*(n.a+c)-0.5*(i.a+q.a);break;case 1:g=2*(n.b-c)-0.5*(i.b+q.b);break;case 3:g=2*(n.b+c)-0.5*(i.b+q.b);}switch(b.g.e){case 4:f=2*(p.a-d)-0.5*(q.a+i.a);break;case 2:f=2*(p.a+d)-0.5*(q.a+i.a);break;case 1:g=2*(p.b-d)-0.5*(q.b+i.b);break;case 3:g=2*(p.b+d)-0.5*(q.b+i.b);}l=new HI(f,g);k=new ufb(Bv(tv(qz,1),Fzb,10,0,[n,i,l,q,p]));j=ifb(k);r=jfb(k);k.a=j;bfb(k,new Ffb(Bv(tv(qz,1),Fzb,10,0,[j,r,n,p])));return k}
function p$(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q;i=c.a;e=Wv(rJ(c,(Rib(),Xhb)),15).a;o=c.d;h=(d=Wv(rJ(c,Xhb),15).a,new HI(c.e.a+c.a.b+c.a.c+2*d,c.e.b+c.a.d+c.a.a+2*d));j=h.b;for(m=new Tob(a.a);m.a<m.c.c.length;){k=Wv(Rob(m),9);if(k.g!=(CX(),xX)){continue}f=Wv(rJ(k,hib),32);g=Wv(rJ(k,iib),10);n=k.i;switch(f.e){case 2:n.a=c.e.a+e+i.c-o.a;break;case 4:n.a=-o.a-e-i.b;}q=0;switch(f.e){case 2:case 4:if(b==(KM(),GM)){p=Ixb(Yv(rJ(k,Cib)));n.b=h.b*p-Wv(rJ(k,(eM(),SL)),10).b;q=n.b+g.b;fX(k,false,true)}else if(b==FM){n.b=Ixb(Yv(rJ(k,Cib)))-Wv(rJ(k,(eM(),SL)),10).b;q=n.b+g.b;fX(k,false,true)}}j=j>q?j:q}c.e.b+=j-h.b;for(l=new Tob(a.a);l.a<l.c.c.length;){k=Wv(Rob(l),9);if(k.g!=(CX(),xX)){continue}f=Wv(rJ(k,hib),32);n=k.i;switch(f.e){case 1:n.b=-o.b-e-i.d;break;case 3:n.b=c.e.b+e+i.a-o.b;}}}
function $Y(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o;e=new GU;for(i=new Tob(a.d.f);i.a<i.c.c.length;){g=Wv(Rob(i),7);g.g==(sN(),ZM)&&(e.c[e.c.length]=g,true)}if(a.e.a==(sK(),pK)&&!MM(Wv(rJ(a.d,(eM(),TL)),28))){for(d=Uh(mX(a.d));Cm(d);){c=Wv(Dm(d),12);vU(e,c.c)}}f=a.d.j.a;sJ(a.d,(Rib(),Whb),new llb(a.d.j.a));a.d.j.a=a.c;sJ(a.d,Vhb,(xkb(),xkb(),wkb));vU(a.b,a.d);j=a.d;f-=a.c;k=a.a;while(k>1){b=Qlb(f,a.c);j=(l=new uX(a.e.c),sX(l,(CX(),wX)),sJ(l,(eM(),TL),Wv(rJ(j,TL),28)),sJ(l,JL,Wv(rJ(j,JL),86)),l.k=a.e.b++,vU(a.b,l),l.j.b=j.j.b,l.j.a=b,m=new RX,QX(m,(sN(),ZM)),PX(m,j),m.i.a=l.j.a,m.i.b=l.j.b/2,n=new RX,QX(n,rN),PX(n,l),n.i.b=l.j.b/2,n.i.a=-n.j.a,o=new hW,dW(o,m),eW(o,n),l);vU(a.e.c.b,j);--k;f-=a.c+a.e.d}new HY(a.d,a.b,a.c);for(h=new Tob(e);h.a<h.c.c.length;){g=Wv(Rob(h),7);BU(a.d.f,g);PX(g,j)}}
function Qfb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;if(a.p>b.a||b.p>a.a){return}c=0;d=0;for(l=(g=(new Snb(a.o.a)).a.bb().mb(),new Ynb(g));l.a.G();){j=(e=Wv(l.a.H(),21),Wv(e.yb(),7));qgb(MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a])).b,b.p,b.a)&&++c}for(m=(h=(new Snb(a.g.a)).a.bb().mb(),new Ynb(h));m.a.G();){j=(e=Wv(m.a.H(),21),Wv(e.yb(),7));qgb(MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a])).b,b.p,b.a)&&--c}for(n=(i=(new Snb(b.o.a)).a.bb().mb(),new Ynb(i));n.a.G();){j=(e=Wv(n.a.H(),21),Wv(e.yb(),7));qgb(MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a])).b,a.p,a.a)&&++d}for(k=(f=(new Snb(b.g.a)).a.bb().mb(),new Ynb(f));k.a.G();){j=(e=Wv(k.a.H(),21),Wv(e.yb(),7));qgb(MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a])).b,a.p,a.a)&&--d}if(c<d){new bgb(a,b,d-c)}else if(d<c){new bgb(b,a,c-d)}else{new bgb(b,a,0);new bgb(a,b,0)}}
function $jb(a){var b;this.f=Wv(rJ(a,(Rib(),Jib)),15).a;this.d=Wv(rJ(a,(Mjb(),Ejb)),15).a;this.a=this.f*Wv(rJ(a,qjb),15).a;this.b=this.f*Wv(rJ(a,pjb),15).a;Wv(rJ(a,Dib),15);this.c=Wv(rJ(a,Dib),15).a;this.e=Wv(rJ(a,(eM(),DL)),15).a;b=(CX(),Bv(tv(pB,1),uyb,132,0,[AX,zX,xX,BX,yX,wX])).length;this.g=vv(lw,[Txb,tAb],[250,26],12,[b,b],2);Yjb(this,AX,this.f);Zjb(this,AX,zX,this.b);Zjb(this,AX,BX,this.b);Zjb(this,AX,xX,this.c);Zjb(this,AX,yX,this.b);Zjb(this,AX,wX,this.b);Yjb(this,zX,this.a);Zjb(this,zX,BX,this.a);Zjb(this,zX,xX,this.c);Zjb(this,zX,yX,this.e);Zjb(this,zX,wX,this.b);Yjb(this,BX,this.a);Zjb(this,BX,xX,this.c);Zjb(this,BX,yX,this.e);Zjb(this,BX,wX,this.b);Yjb(this,xX,this.c);Zjb(this,xX,yX,this.c);Zjb(this,xX,wX,this.c);Yjb(this,yX,this.e);Zjb(this,yX,wX,this.e);Yjb(this,wX,this.f)}
function mZ(a,b){var c,d,e,f,g,h,i,j,k;if(tl(iX(b))!=1||Wv(ql(iX(b)),12).c.f.g!=(CX(),zX)){return null}c=Wv(ql(iX(b)),12);d=c.c.f;sX(d,(CX(),AX));sJ(d,(Rib(),qib),null);sJ(d,rib,null);sJ(d,Whb,Wv(rJ(b,Whb),15));sJ(d,Vhb,(xkb(),xkb(),wkb));sJ(d,uib,rJ(b,uib));d.j.b=b.j.b;f=rJ(c.d,uib);g=null;for(j=nX(d,(sN(),rN)).mb();j.G();){h=Wv(j.H(),7);if(h.b.c.length!=0){sJ(h,uib,f);k=c.d;h.j.a=k.j.a;h.j.b=k.j.b;h.a.a=k.a.a;h.a.b=k.a.b;xU(h.c,k.c);k.c.c=xv(UF,syb,1,0,4,1);g=h;break}}sJ(c.d,uib,null);if(tl(nX(b,rN))>1){for(i=WI(Eo(nX(b,rN)),0);i.b!=i.d.c;){h=Wv(_ub(i),7);if(h.b.c.length==0){e=new RX;QX(e,rN);e.j.a=h.j.a;e.j.b=h.j.b;PX(e,d);sJ(e,uib,rJ(h,uib));PX(h,null)}else{PX(g,d)}}}sJ(b,uib,null);sJ(b,Vhb,(null,vkb));sX(b,wX);sJ(d,(eM(),TL),Wv(rJ(b,TL),28));sJ(d,JL,Wv(rJ(b,JL),86));uU(a.b,0,d);return d}
function NW(a,b,c,d,e,f,g){var h,i,j,k,l,m;l=c;j=new uX(g);sX(j,(CX(),xX));sJ(j,(Rib(),iib),e);sJ(j,(eM(),TL),(KM(),FM));sJ(j,tib,Wv(rJ(a,LL),15));i=Wv(rJ(a,SL),10);!i&&(i=new HI(e.a/2,e.b/2));sJ(j,SL,i);k=new RX;PX(k,j);if(!(b!=IM&&b!=JM)){h=f!=(sK(),qK)?f:pK;d>0?(l=vN(h)):(l=tN(vN(h)));sJ(a,WL,l)}switch(l.e){case 4:sJ(j,(Mjb(),vjb),(Xib(),Tib));sJ(j,dib,(Hgb(),Ggb));j.j.b=e.b;QX(k,(sN(),ZM));k.i.b=i.b;break;case 2:sJ(j,(Mjb(),vjb),(Xib(),Vib));sJ(j,dib,(Hgb(),Egb));j.j.b=e.b;QX(k,(sN(),rN));k.i.b=i.b;break;case 1:sJ(j,mib,(Hhb(),Ghb));j.j.a=e.a;QX(k,(sN(),pN));k.i.a=i.a;break;case 3:sJ(j,mib,(Hhb(),Ehb));j.j.a=e.a;QX(k,(sN(),$M));k.i.a=i.a;}if(b==EM||b==GM||b==FM){m=0;switch(l.e){case 4:case 2:m=null.cd;b==GM&&(m/=null.cd);break;case 1:case 3:m=null.cd;b==GM&&(m/=null.cd);}sJ(j,Cib,m)}sJ(j,hib,l);return j}
function LP(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;j=new jJ;r=(mp(),new ntb);Umb(r,a,MP(a));d=(Mh(2,Vyb),new HU(2));!!a.c&&vU(d,a.c);!!a.d&&vU(d,a.d);for(n=new Tob(d);n.a<n.c.c.length;){m=Wv(Rob(n),7);b=new aJ;Ue(b,Ao(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[m.b,m.e])))))));Ve(b,a,true);if(b.b!=0){t=Wv(re(Ktb(r.d,a)),34);if(m==a.d){o=t[t.length-1];s=true}else{o=t[0];s=false}for(i=1;i<t.length;i++){s?(p=t[t.length-1-i]):(p=t[i]);c=WI(b,0);while(c.b!=c.d.c){k=Wv(_ub(c),12);l=Wv(re(Ktb(r.d,k)),34);if(l==null){l=MP(k);Ltb(r.d,k,l)}if(l.length<=i){bvb(c)}else{s?(q=l[l.length-1-i]):(q=l[i]);if(p.a!=q.a||p.b!=q.b){e=p.a-o.a;g=p.b-o.b;f=q.a-o.a;h=q.b-o.b;f*g==h*e&&NP(e)==NP(f)&&NP(g)==NP(h)?((e<=0?0-e:e)<(f<=0?0-f:f)||(g<=0?0-g:g)<(h<=0?0-h:h))&&(TI(j,p,j.c.b,j.c),true):i>1&&(TI(j,o,j.c.b,j.c),true);bvb(c)}}}o=p}}}return j}
function m1(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p;a.n=Wv(rJ(a.g,(Rib(),Jib)),15).a*Wv(rJ(a.g,(Mjb(),Ejb)),15).a;a.e=a.n*Wv(rJ(a.g,qjb),15).a;a.i=a.g.c.c.length;h=a.i-1;m=0;a.j=0;a.k=0;a.a=Co(xv(PF,Txb,24,a.i,0,1));a.b=Co(xv(HF,Txb,184,a.i,6,1));for(g=new Tob(a.g.c);g.a<g.c.c.length;){e=Wv(Rob(g),16);e.k=h;for(l=new Tob(e.a);l.a<l.c.c.length;){k=Wv(Rob(l),9);k.k=m;++m}--h}a.f=xv(mw,Yyb,26,m,12,1);a.c=vv(mw,[Txb,Yyb],[52,26],12,[m,3],2);a.o=new GU;a.p=new GU;b=0;a.d=0;for(f=new Tob(a.g.c);f.a<f.c.c.length;){e=Wv(Rob(f),16);h=e.k;d=0;p=0;i=e.a.c.length;j=0;for(l=new Tob(e.a);l.a<l.c.c.length;){k=Wv(Rob(l),9);m=k.k;a.f[m]=k.d.k;j+=k.j.b+a.n;c=tl(iX(k));o=tl(mX(k));a.c[m][0]=o-c;a.c[m][1]=c;a.c[m][2]=o;d+=c;p+=o;c>0&&vU(a.p,k);vU(a.o,k)}b-=d;n=i+b;j+=b*a.e;DU(a.a,h,Elb(n));DU(a.b,h,j);a.j=Plb(a.j,n);a.k=Nlb(a.k,j);a.d+=b;b+=p}}
function sN(){sN=iI;var a;qN=new uN(szb,0);$M=new uN('NORTH',1);ZM=new uN('EAST',2);pN=new uN('SOUTH',3);rN=new uN('WEST',4);dN=(ypb(),new Frb((a=Wv(Hkb(Kz),11),new atb(a,Wv(exb(a,a.length),11),0))));eN=Kk(Vsb($M,Bv(tv(Kz,1),uyb,32,0,[])));_M=Kk(Vsb(ZM,Bv(tv(Kz,1),uyb,32,0,[])));mN=Kk(Vsb(pN,Bv(tv(Kz,1),uyb,32,0,[])));oN=Kk(Vsb(rN,Bv(tv(Kz,1),uyb,32,0,[])));jN=Kk(Vsb($M,Bv(tv(Kz,1),uyb,32,0,[pN])));cN=Kk(Vsb(ZM,Bv(tv(Kz,1),uyb,32,0,[rN])));lN=Kk(Vsb($M,Bv(tv(Kz,1),uyb,32,0,[rN])));fN=Kk(Vsb($M,Bv(tv(Kz,1),uyb,32,0,[ZM])));nN=Kk(Vsb(pN,Bv(tv(Kz,1),uyb,32,0,[rN])));aN=Kk(Vsb(ZM,Bv(tv(Kz,1),uyb,32,0,[pN])));iN=Kk(Vsb($M,Bv(tv(Kz,1),uyb,32,0,[ZM,rN])));bN=Kk(Vsb(ZM,Bv(tv(Kz,1),uyb,32,0,[pN,rN])));kN=Kk(Vsb($M,Bv(tv(Kz,1),uyb,32,0,[pN,rN])));gN=Kk(Vsb($M,Bv(tv(Kz,1),uyb,32,0,[ZM,pN])));hN=Kk(Vsb($M,Bv(tv(Kz,1),uyb,32,0,[ZM,pN,rN])))}
function q$(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C;u=new GU;for(m=new Tob(a.c);m.a<m.c.c.length;){l=Wv(Rob(m),16);for(p=new Tob(l.a);p.a<p.c.c.length;){n=Wv(Rob(p),9);if(n.g!=(CX(),xX)){continue}if(rJ(n,(Rib(),gib))==null){continue}q=null;s=null;r=null;for(A=new Tob(n.f);A.a<A.c.c.length;){w=Wv(Rob(A),7);switch(w.g.e){case 4:q=w;break;case 2:s=w;break;default:r=w;}}t=Wv(yU(r.e,0),12);i=new kJ(t.a);h=new II(r.i);vI(h,n.i);j=WI(i,0);$ub(j,h);v=lJ(t.a);k=new II(r.i);vI(k,n.i);TI(v,k,v.c.b,v.c);B=Wv(rJ(n,gib),9);C=Wv(yU(B.f,0),7);g=Wv(FU(q.b,xv(dB,gAb,12,0,0,1)),47);for(d=0,f=g.length;d<f;++d){b=g[d];eW(b,C);gJ(b.a,b.a.b,i)}g=Wv(FU(s.e,xv(dB,gAb,12,s.e.c.length,0,1)),47);for(c=0,e=g.length;c<e;++c){b=g[c];dW(b,C);gJ(b.a,0,v)}dW(t,null);eW(t,null);u.c[u.c.length]=n}}for(o=new Tob(u);o.a<o.c.c.length;){n=Wv(Rob(o),9);rX(n,null)}}
function _tb(){function e(){this.obj=this.createObject()}
;e.prototype.createObject=function(a){return Object.create(null)};e.prototype.get=function(a){return this.obj[a]};e.prototype.set=function(a,b){this.obj[a]=b};e.prototype[$Ab]=function(a){delete this.obj[a]};e.prototype.keys=function(){return Object.getOwnPropertyNames(this.obj)};e.prototype.entries=function(){var b=this.keys();var c=this;var d=0;return {'next':function(){if(d>=b.length)return {'done':true};var a=b[d++];return {'value':[a,c.get(a)],'done':false}}}};if(!Ztb()){e.prototype.createObject=function(){return {}};e.prototype.get=function(a){return this.obj[':'+a]};e.prototype.set=function(a,b){this.obj[':'+a]=b};e.prototype[$Ab]=function(a){delete this.obj[':'+a]};e.prototype.keys=function(){var a=[];for(var b in this.obj){b.charCodeAt(0)==58&&a.push(b.substring(1))}return a}}return e}
function fQ(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;k=new kW;sJ(k,PP,b);Umb(a.e,b,k);sJ(k,(Rib(),zib),c);!!a.d&&iQ(a.d,k,false);hQ(b,k);if(Lzb in b.a){q=k.a;r=Wv(Pu(b,Lzb),69);p=Wv(Pu(r,'left'),104);!!p&&(q.b=p.a);t=Wv(Pu(r,'top'),104);!!t&&(q.d=t.a);s=Wv(Pu(r,'right'),104);!!s&&(q.c=s.a);e=Wv(Pu(r,Azb),104);!!e&&(q.a=e.a)}l=(d=Wv(Hkb(mF),11),new atb(d,Wv(exb(d,d.length),11),0));sJ(k,jib,l);a.g==null&&(a.g=Xv(rJ(k,(zQ(),yQ))));if(Mzb in b.a){u=Pu(b,Mzb);if(!u.hc()){throw new GQ("The 'children' property of nodes must be an array.",u,b)}j=u.hc();if(j.a.length>0){!!c&&sJ(c,sib,k);h=xv(qB,Nzb,9,j.a.length,0,1);for(n=0;n<j.a.length;++n){i=gu(j,n);if(!i.kc()){throw new GQ("A 'children' array contains a non-object node element.",i,b)}f=eQ(a,i.kc(),k);h[n]=f}for(m=0;m<j.a.length;++m){o=gu(j,m).kc();g=h[m];Mzb in o.a&&!Ckb(Ixb(Xv(rJ(g,(eM(),KL)))))&&fQ(a,o,g)}}}return k}
function LO(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;if(!Qob(new Tob(AW(a.e)))){return}for(h=new Tob(AW(a.e));h.a<h.c.c.length;){g=Wv(Rob(h),161);j=Wv(g.e,7).g.e;++a.o[j];switch(Wv(g.e,7).g.e){case 4:case 2:a.n[j]+=g.e.j.b+(b?(d=Wv(g.e,7).d,new EP(d.d,d.b,d.a,d.c)).a+(e=Wv(g.e,7).d,new EP(e.d,e.b,e.a,e.c)).d:0);break;case 1:case 3:a.n[j]+=g.e.j.a+(b?(f=Wv(g.e,7).d,new EP(f.d,f.b,f.a,f.c)).b+(c=Wv(g.e,7).d,new EP(c.d,c.b,c.a,c.c)).c:0);}}i=Wv(oW(a.e,(eM(),NL)),100);i=i==(zM(),yM)?xM:i;a.g[1]=Wv(oW(a.e,PL),100);a.g[3]=Wv(oW(a.e,QL),100);a.g[4]=Wv(oW(a.e,RL),100);a.g[2]=Wv(oW(a.e,OL),100);for(l=(sN(),Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN])),n=0,p=l.length;n<p;++n){j=l[n];a.g[j.e]=a.g[j.e]==yM?i:a.g[j.e]}a.b=oW(a.e,jL)!=null;for(k=Bv(tv(Kz,1),uyb,32,0,[qN,$M,ZM,pN,rN]),m=0,o=k.length;m<o;++m){j=k[m];a.o[j.e]==1?(a.i[j.e]=2):!a.b&&a.g[j.e]==xM?(a.i[j.e]=a.o[j.e]+1):(a.i[j.e]=a.o[j.e]-1)}}
function Tfb(a,b,c,d,e,f){var g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;i=Wv(a.a,16);p=Wv(a.b,16);j=Wv(b.a,18);q=Wv(b.b,18);if(i){for(l=new Tob(i.a);l.a<l.c.c.length;){k=Wv(Rob(l),9);for(t=nX(k,(sN(),ZM)).mb();t.G();){s=Wv(t.H(),7);j.ib(s);for(h=new Tob(s.e);h.a<h.c.c.length;){g=Wv(Rob(h),12);if(bW(g)){continue}c.c[c.c.length]=g;Ufb(g,d);r=g.c.f.g;(r==(CX(),AX)||r==BX)&&(e.c[e.c.length]=g,true);v=g.d;u=v.f.d;u==p?q.ib(v):u==i?j.ib(v):BU(c,g)}}}}if(p){for(l=new Tob(p.a);l.a<l.c.c.length;){k=Wv(Rob(l),9);for(o=new Tob(k.f);o.a<o.c.c.length;){n=Wv(Rob(o),7);for(h=new Tob(n.e);h.a<h.c.c.length;){g=Wv(Rob(h),12);bW(g)&&(m=f.a.db(g,f),m==null)}}for(t=nX(k,(sN(),rN)).mb();t.G();){s=Wv(t.H(),7);q.ib(s);for(h=new Tob(s.e);h.a<h.c.c.length;){g=Wv(Rob(h),12);if(bW(g)){continue}c.c[c.c.length]=g;Ufb(g,d);r=g.c.f.g;(r==(CX(),AX)||r==BX)&&(e.c[e.c.length]=g,true);v=g.d;u=v.f.d;u==p?q.ib(v):u==i?j.ib(v):BU(c,g)}}}}}
function acb(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B;t=b.c.length;e=new Cbb(a.b,c,null,null);B=xv(kw,hyb,26,t,12,1);p=xv(kw,hyb,26,t,12,1);o=xv(kw,hyb,26,t,12,1);q=0;for(h=0;h<t;h++){p[h]=$xb;o[h]=eyb}for(i=0;i<t;i++){d=(Cxb(i,b.c.length),Wv(b.c[i],81));B[i]=Abb(d);B[q]>B[i]&&(q=i);for(l=new Tob(a.b.c);l.a<l.c.c.length;){k=Wv(Rob(l),16);for(s=new Tob(k.a);s.a<s.c.c.length;){r=Wv(Rob(s),9);w=Ixb(d.n[r.k])+Ixb(d.d[r.k]);p[i]=p[i]<w?p[i]:w;o[i]=Nlb(o[i],w+r.j.b)}}}A=xv(kw,hyb,26,t,12,1);for(j=0;j<t;j++){(Cxb(j,b.c.length),Wv(b.c[j],81)).k==(Lbb(),Jbb)?(A[j]=p[q]-p[j]):(A[j]=o[q]-o[j])}f=xv(kw,hyb,26,t,12,1);for(n=new Tob(a.b.c);n.a<n.c.c.length;){m=Wv(Rob(n),16);for(v=new Tob(m.a);v.a<v.c.c.length;){u=Wv(Rob(v),9);for(g=0;g<t;g++){f[g]=Ixb((Cxb(g,b.c.length),Wv(b.c[g],81)).n[u.k])+Ixb((Cxb(g,b.c.length),Wv(b.c[g],81)).d[u.k])+A[g]}kpb(f);e.n[u.k]=(f[1]+f[2])/2;e.d[u.k]=0}}return e}
function Sfb(a,b,c,d,e,f){var g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;p=null;c==(fgb(),dgb)?(p=a):c==egb&&(p=b);for(r=(m=(new Snb(p.a)).a.bb().mb(),new Ynb(m));r.a.G();){q=(k=Wv(r.a.H(),21),Wv(k.yb(),7));s=MI(Bv(tv(qz,1),Fzb,10,0,[q.f.i,q.i,q.a])).b;v=new vtb;g=new vtb;for(i=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[q.b,q.e]))))));Cm(i);){h=Wv(Dm(i),12);if(Ckb(Ixb(Xv(rJ(h,(Rib(),Iib)))))!=d){continue}if(zU(e,h,0)!=-1){h.d==q?(t=h.c):(t=h.d);u=MI(Bv(tv(qz,1),Fzb,10,0,[t.f.i,t.i,t.a])).b;if((u-s<=0?0-(u-s):u-s)<0.2){continue}u<s?a.a.R(t)?stb(v,new RJ(dgb,h)):stb(v,new RJ(egb,h)):a.a.R(t)?stb(g,new RJ(dgb,h)):stb(g,new RJ(egb,h))}}if(v.a.Y()>1){vU(f,new mgb(q,v,c));for(o=(l=(new Snb(v.a)).a.bb().mb(),new Ynb(l));o.a.G();){n=(j=Wv(o.a.H(),21),Wv(j.yb(),27));BU(e,n.b)}}if(g.a.Y()>1){vU(f,new mgb(q,g,c));for(o=(l=(new Snb(g.a)).a.bb().mb(),new Ynb(l));o.a.G();){n=(j=Wv(o.a.H(),21),Wv(j.yb(),27));BU(e,n.b)}}}}
function dab(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A;e=0;s=0;r=(mp(),new ntb);d=new ntb;f=new ntb;A=new ntb;fab(a,f,A);b=null;q=0;w=0;t=true;i=true;for(m=0,o=a.length;m<o;++m){k=a[m];for(v=new Tob(k.f);v.a<v.c.c.length;){u=Wv(Rob(v),7);switch(u.g.e){case 2:e+=cab(u,f);break;case 4:e+=cab(u,A);}}p=k.g;if(i&&(p==(CX(),AX)||p==BX)){j=Wv(rJ(k,(Rib(),nib)),9);if(!j){i=false;continue}if(b!=j){!!b&&Umb(r,b,new RJ(Elb(q),Elb(w)));b=j;q=0;w=0;t=true}k==b&&(t=false);if(t){q+=Wv(rJ(k,aib),24).a;Umb(d,k,Elb(q))}else{w+=Wv(rJ(k,aib),24).a;Umb(d,k,Elb(w))}}}!!b&&Umb(r,b,new RJ(Elb(q),Elb(w)));if(i){h=null;g=0;c=0;t=true;for(l=0,n=a.length;l<n;++l){k=a[l];p=k.g;switch(p.e){case 0:g=Wv(re(Ktb(d.d,k)),24).a;c=Wv(Wv(re(Ktb(r.d,k)),27).b,24).a;h=k;t=false;break;case 3:g=Wv(re(Ktb(d.d,k)),24).a;j=Wv(rJ(k,(Rib(),nib)),9);if(j!=h){c=Wv(Wv(re(Ktb(r.d,j)),27).a,24).a;h=j;t=true}break;default:s+=t?g:c-g;}}}return e+s}
function S4(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;l=(mp(),new ntb);j=new xk;for(d=new Tob(a.a.a.b);d.a<d.c.c.length;){b=Wv(Rob(d),25);if(aw(b,93)){k=Wv(b,93).b;Ltb(l.d,k,b)}else if(aw(b,82)){for(f=(o=(new Snb(Wv(b,82).d.a)).a.bb().mb(),new Ynb(o));f.a.G();){e=(g=Wv(f.a.H(),21),Wv(g.yb(),12));Fd(j,e,b)}}}for(c=new Tob(a.a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);if(aw(b,93)){k=Wv(b,93).b;for(i=Uh(mX(k));Cm(i);){h=Wv(Dm(i),12);if(bW(h)){continue}q=h.c;t=h.d;if((sN(),jN).kb(h.c.g)&&jN.kb(h.d.g)){continue}r=Wv(Smb(l,h.d.f),25);f7(i7(h7(j7(g7(new k7,0),100),a.c[b.f.d]),a.c[r.f.d]));if(q.g==rN&&TX((LX(),IX,q))){for(n=Wv(Dd(j,h),18).mb();n.G();){m=Wv(n.H(),25);if(m.j.d<b.j.d){p=a.c[m.f.d];s=a.c[b.f.d];if(p==s){continue}f7(i7(h7(j7(g7(new k7,1),100),p),s))}}}if(t.g==ZM&&WX((LX(),GX,t))){for(n=Wv(Dd(j,h),18).mb();n.G();){m=Wv(n.H(),25);if(m.j.d>b.j.d){p=a.c[b.f.d];s=a.c[m.f.d];if(p==s){continue}f7(i7(h7(j7(g7(new k7,1),100),p),s))}}}}}}}
function t3(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;g=new z3(a);h=Ao(pl(b,g));Gpb(h,new C3);e=a.b;switch(e.c){case 2:i=new E3(e.a);c=Al(pl(h,i));od(c)?(j=Wv(pd(c),91).b):(j=15);i=new E3(Jeb(e));c=Al(pl(h,i));od(c)?(f=Wv(pd(c),91).b):(f=15);i=new E3(e.b);c=Al(pl(h,i));od(c)?(k=Wv(pd(c),91).b):(k=15);d=p3(a,j,f,k);stb(b,new w3(d,a.c,a.e,a.a.c.f,e.a));stb(b,new w3(d,a.c,a.e,a.a.c.f,Jeb(e)));stb(b,new w3(d,a.c,a.e,a.a.c.f,e.b));break;case 1:i=new E3(e.a);c=Al(pl(h,i));od(c)?(j=Wv(pd(c),91).b):(j=15);i=new E3(e.b);c=Al(pl(h,i));od(c)?(k=Wv(pd(c),91).b):(k=15);d=q3(a,j,k);stb(b,new w3(d,a.c,a.e,a.a.c.f,e.a));stb(b,new w3(d,a.c,a.e,a.a.c.f,e.b));break;case 0:i=new E3(e.a);c=Al(pl(h,i));od(c)?(j=Wv(pd(c),91).b):(j=15);d=(l=a.b,m=xfb(a.a.c,a.a.d,j),Ue(a.a.a,Veb(m)),n=s3(a.a.b,m.a,l),o=new Dfb((!m.k&&(m.k=new Efb(Xeb(m))),m.k)),zfb(o),!n?o:Gfb(o,n));stb(b,new w3(d,a.c,a.e,a.a.c.f,e.a));break;default:throw new slb('The loopside must be defined.');}return d}
function Pbb(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;for(h=new Tob(a.a.c);h.a<h.c.c.length;){f=Wv(Rob(h),16);for(t=new Tob(f.a);t.a<t.c.c.length;){s=Wv(Rob(t),9);b.f[s.k]=s;b.a[s.k]=s;b.d[s.k]=0}}i=a.a.c;b.c==(Gbb(),Ebb)&&(i=aw(i,87)?Ii(Wv(i,87)):aw(i,88)?Wv(i,88).a:aw(i,63)?new ap(i):new Ro(i));for(g=i.mb();g.G();){f=Wv(g.H(),16);n=-1;m=f.a;if(b.k==(Lbb(),Kbb)){n=$xb;m=aw(m,87)?Ii(Wv(m,87)):aw(m,88)?Wv(m,88).a:aw(m,63)?new ap(m):new Ro(m)}for(v=m.mb();v.G();){u=Wv(v.H(),9);b.c==Ebb?(l=Wv(yU(a.b.f,u.k),20)):(l=Wv(yU(a.b.b,u.k),20));if(l.Y()>0){d=l.Y();j=hw(Math.floor((d+1)/2))-1;e=hw(Math.ceil((d+1)/2))-1;if(b.k==Kbb){for(k=e;k>=j;k--){if(b.a[u.k]==u){p=Wv(l.sb(k),27);o=Wv(p.a,9);if(!ttb(c,p.b)&&n>a.b.e[o.k]){b.a[o.k]=u;b.f[u.k]=b.f[o.k];b.a[u.k]=b.f[u.k];n=a.b.e[o.k]}}}}else{for(k=j;k<=e;k++){if(b.a[u.k]==u){r=Wv(l.sb(k),27);q=Wv(r.a,9);if(!ttb(c,r.b)&&n<a.b.e[q.k]){b.a[q.k]=u;b.f[u.k]=b.f[q.k];b.a[u.k]=b.f[u.k];n=a.b.e[q.k]}}}}}}}}
function Ieb(){Ieb=iI;meb=new Peb('N',0,(sN(),$M),$M,0);jeb=new Peb('EN',1,ZM,$M,1);ieb=new Peb('E',2,ZM,ZM,0);peb=new Peb('SE',3,pN,ZM,1);oeb=new Peb('S',4,pN,pN,0);Heb=new Peb('WS',5,rN,pN,1);Geb=new Peb('W',6,rN,rN,0);neb=new Peb('NW',7,$M,rN,1);keb=new Peb('ENW',8,ZM,rN,2);leb=new Peb('ESW',9,ZM,rN,2);qeb=new Peb('SEN',10,pN,$M,2);Eeb=new Peb('SWN',11,pN,$M,2);Feb=new Peb(szb,12,qN,qN,3);feb=bk(meb,jeb,ieb,peb,oeb,Heb,Bv(tv(_E,1),uyb,60,0,[Geb,neb,keb,leb,qeb,Eeb]));heb=(hi(),Zj(Bv(tv(UF,1),syb,1,4,[meb,ieb,oeb,Geb])));geb=Zj(Bv(tv(UF,1),syb,1,4,[jeb,peb,Heb,neb]));veb=new Gr($M);seb=Zj(Bv(tv(UF,1),syb,1,4,[ZM,$M]));reb=new Gr(ZM);yeb=Zj(Bv(tv(UF,1),syb,1,4,[pN,ZM]));xeb=new Gr(pN);Deb=Zj(Bv(tv(UF,1),syb,1,4,[rN,pN]));Ceb=new Gr(rN);web=Zj(Bv(tv(UF,1),syb,1,4,[$M,rN]));teb=Zj(Bv(tv(UF,1),syb,1,4,[ZM,$M,rN]));ueb=Zj(Bv(tv(UF,1),syb,1,4,[ZM,pN,rN]));Aeb=Zj(Bv(tv(UF,1),syb,1,4,[pN,rN,$M]));zeb=Zj(Bv(tv(UF,1),syb,1,4,[pN,ZM,$M]));Beb=(kr(),jr)}
function JZ(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;s=0;if(b.e.a==0){for(q=new Tob(a);q.a<q.c.c.length;){o=Wv(Rob(q),9);s=Nlb(s,o.i.a+o.j.a+o.e.c)}}else{s=b.e.a-b.d.a}s-=b.d.a;for(p=new Tob(a);p.a<p.c.c.length;){o=Wv(Rob(p),9);IZ(o.i,s-o.j.a);GZ(o);switch(Wv(rJ(o,(eM(),lL)),103).e){case 1:sJ(o,lL,(iK(),gK));break;case 2:sJ(o,lL,(iK(),fK));}r=o.j;for(u=new Tob(o.f);u.a<u.c.c.length;){t=Wv(Rob(u),7);IZ(t.i,r.a-t.j.a);IZ(t.a,t.j.a);QX(t,CZ(t.g));g=Wv(rJ(t,UL),24);!!g&&sJ(t,UL,Elb(-g.a));for(f=new Tob(t.e);f.a<f.c.c.length;){e=Wv(Rob(f),12);for(d=WI(e.a,0);d.b!=d.d.c;){c=Wv(_ub(d),10);c.a=s-c.a}j=Wv(rJ(e,CL),44);if(j){for(i=WI(j,0);i.b!=i.d.c;){h=Wv(_ub(i),10);h.a=s-h.a}}for(m=new Tob(e.b);m.a<m.c.c.length;){k=Wv(Rob(m),33);IZ(k.i,s-k.j.a)}}for(n=new Tob(t.c);n.a<n.c.c.length;){k=Wv(Rob(n),33);IZ(k.i,-k.j.a)}}if(o.g==(CX(),xX)){sJ(o,(Rib(),hib),CZ(Wv(rJ(o,hib),32)));FZ(o)}for(l=new Tob(o.c);l.a<l.c.c.length;){k=Wv(Rob(l),33);IZ(k.i,r.a-k.j.a)}}}
function LZ(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;s=0;if(b.e.b==0){for(q=new Tob(a);q.a<q.c.c.length;){o=Wv(Rob(q),9);s=Nlb(s,o.i.b+o.j.b+o.e.a)}}else{s=b.e.b-b.d.b}s-=b.d.b;for(p=new Tob(a);p.a<p.c.c.length;){o=Wv(Rob(p),9);KZ(o.i,s-o.j.b);HZ(o);switch(Wv(rJ(o,(eM(),lL)),103).e){case 3:sJ(o,lL,(iK(),dK));break;case 4:sJ(o,lL,(iK(),hK));}r=o.j;for(u=new Tob(o.f);u.a<u.c.c.length;){t=Wv(Rob(u),7);KZ(t.i,r.b-t.j.b);KZ(t.a,t.j.b);QX(t,DZ(t.g));g=Wv(rJ(t,UL),24);!!g&&sJ(t,UL,Elb(-g.a));for(f=new Tob(t.e);f.a<f.c.c.length;){e=Wv(Rob(f),12);for(d=WI(e.a,0);d.b!=d.d.c;){c=Wv(_ub(d),10);c.b=s-c.b}j=Wv(rJ(e,CL),44);if(j){for(i=WI(j,0);i.b!=i.d.c;){h=Wv(_ub(i),10);h.b=s-h.b}}for(m=new Tob(e.b);m.a<m.c.c.length;){k=Wv(Rob(m),33);KZ(k.i,s-k.j.b)}}for(n=new Tob(t.c);n.a<n.c.c.length;){k=Wv(Rob(n),33);KZ(k.i,-k.j.b)}}if(o.g==(CX(),xX)){sJ(o,(Rib(),hib),DZ(Wv(rJ(o,hib),32)));EZ(o)}for(l=new Tob(o.c);l.a<l.c.c.length;){k=Wv(Rob(l),33);KZ(k.i,r.b-k.j.b)}}}
function qP(a,b,c){var d,e,f,g,h,i,j,k,l,m,n;d=new VN(b.e.i.a,b.e.i.b,b.e.j.a,b.e.j.b);e=new UN;if(a.c){for(g=new Tob(zW(b));g.a<g.c.c.length;){f=Wv(Rob(g),129);e.d=f.e.i.a+b.e.i.a;e.e=f.e.i.b+b.e.i.b;e.c=f.e.j.a;e.b=f.e.j.b;TN(d,e)}}for(k=new Tob(AW(b));k.a<k.c.c.length;){j=Wv(Rob(k),161);l=j.e.i.a+b.e.i.a;m=j.e.i.b+b.e.i.b;if(a.e){e.d=l;e.e=m;e.c=j.e.j.a;e.b=j.e.j.b;TN(d,e)}if(a.d){for(g=new Tob(DW(j));g.a<g.c.c.length;){f=Wv(Rob(g),129);e.d=f.e.i.a+l;e.e=f.e.i.b+m;e.c=f.e.j.a;e.b=f.e.j.b;TN(d,e)}}if(a.b){n=new HI(-c,-c);if(gw(oW(b,(eM(),VL)))===gw((UM(),TM))){for(g=new Tob(DW(j));g.a<g.c.c.length;){f=Wv(Rob(g),129);n.a+=f.e.j.a+c;n.b+=f.e.j.b+c}}n.a=Nlb(n.a,0);n.b=Nlb(n.b,0);pP(d,EW(j),CW(j),b,j,n,c)}}a.b&&pP(d,(ypb(),ypb(),vpb),(null,vpb),b,null,null,c);i=new FP((h=Wv(b.e,9).e,new EP(h.d,h.b,h.a,h.c)));i.d=b.e.i.b-d.e;i.a=d.e+d.b-(b.e.i.b+b.e.j.b);i.b=b.e.i.a-d.d;i.c=d.d+d.c-(b.e.i.a+b.e.j.a);Wv(b.e,9).e.b=i.b;Wv(b.e,9).e.d=i.d;Wv(b.e,9).e.c=i.c;Wv(b.e,9).e.a=i.a}
function XT(){XT=iI;WT=new xk;Fd(WT,(sN(),dN),hN);Fd(WT,oN,kN);Fd(WT,oN,hN);Fd(WT,_M,gN);Fd(WT,_M,hN);Fd(WT,eN,iN);Fd(WT,eN,hN);Fd(WT,mN,bN);Fd(WT,mN,hN);Fd(WT,jN,cN);Fd(WT,jN,iN);Fd(WT,jN,bN);Fd(WT,jN,hN);Fd(WT,cN,jN);Fd(WT,cN,kN);Fd(WT,cN,gN);Fd(WT,cN,hN);Fd(WT,lN,lN);Fd(WT,lN,iN);Fd(WT,lN,kN);Fd(WT,fN,fN);Fd(WT,fN,iN);Fd(WT,fN,gN);Fd(WT,nN,nN);Fd(WT,nN,bN);Fd(WT,nN,kN);Fd(WT,aN,aN);Fd(WT,aN,bN);Fd(WT,aN,gN);Fd(WT,iN,eN);Fd(WT,iN,jN);Fd(WT,iN,lN);Fd(WT,iN,fN);Fd(WT,iN,iN);Fd(WT,iN,kN);Fd(WT,iN,gN);Fd(WT,iN,hN);Fd(WT,bN,mN);Fd(WT,bN,jN);Fd(WT,bN,nN);Fd(WT,bN,aN);Fd(WT,bN,bN);Fd(WT,bN,kN);Fd(WT,bN,gN);Fd(WT,bN,hN);Fd(WT,kN,oN);Fd(WT,kN,cN);Fd(WT,kN,lN);Fd(WT,kN,nN);Fd(WT,kN,iN);Fd(WT,kN,bN);Fd(WT,kN,kN);Fd(WT,kN,hN);Fd(WT,gN,_M);Fd(WT,gN,cN);Fd(WT,gN,fN);Fd(WT,gN,aN);Fd(WT,gN,iN);Fd(WT,gN,bN);Fd(WT,gN,gN);Fd(WT,gN,hN);Fd(WT,hN,dN);Fd(WT,hN,oN);Fd(WT,hN,_M);Fd(WT,hN,eN);Fd(WT,hN,mN);Fd(WT,hN,jN);Fd(WT,hN,cN);Fd(WT,hN,iN);Fd(WT,hN,bN);Fd(WT,hN,kN);Fd(WT,hN,gN);Fd(WT,hN,hN)}
function Tbb(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;if(c.n[b.k]!=null){return}i=true;c.n[b.k]=0;g=b;r=c.k==(Lbb(),Jbb)?Vzb:Uzb;do{e=a.b.e[g.k];f=g.d.a.c.length;h=g.g;if(c.k==Jbb&&e>0||c.k==Kbb&&e<f-1){c.k==Kbb?(j=Wv(yU(g.d.a,e+1),9)):(j=Wv(yU(g.d.a,e-1),9));l=c.f[j.k];k=j.g;Tbb(a,l,c);r=a.e.Ic(r,b,g);c.i[b.k]==b&&(c.i[b.k]=c.i[l.k]);if(c.i[b.k]==c.i[l.k]){q=Wjb(a.d,h,k);if(c.k==Kbb){d=Ixb(c.n[b.k]);n=Ixb(c.n[l.k])+Ixb(c.d[j.k])-j.e.d-q-g.e.a-g.j.b-Ixb(c.d[g.k]);if(i){i=false;c.n[b.k]=n<r?n:r}else{c.n[b.k]=d<(n<r?n:r)?d:n<r?n:r}}else{d=Ixb(c.n[b.k]);n=Ixb(c.n[l.k])+Ixb(c.d[j.k])+j.j.b+j.e.a+q+g.e.d-Ixb(c.d[g.k]);if(i){i=false;c.n[b.k]=n>r?n:r}else{c.n[b.k]=d>(n>r?n:r)?d:n>r?n:r}}}else{q=a.d.f;p=Rbb(a,c.i[b.k]);m=Rbb(a,c.i[l.k]);if(c.k==Kbb){o=Ixb(c.n[b.k])+Ixb(c.d[g.k])+g.j.b+g.e.a+q-(Ixb(c.n[l.k])+Ixb(c.d[j.k])-j.e.d);Xbb(p,m,o)}else{o=Ixb(c.n[b.k])+Ixb(c.d[g.k])-g.e.d-Ixb(c.n[l.k])-Ixb(c.d[j.k])-j.j.b-j.e.a-q;Xbb(p,m,o)}}}else{r=a.e.Ic(r,b,g)}g=c.a[g.k]}while(g!=b);ycb(a.e,b)}
function sZ(a,b,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;m=false;l=false;if(MM(Wv(rJ(d,(eM(),TL)),28))){g=false;h=false;t:for(o=new Tob(d.f);o.a<o.c.c.length;){n=Wv(Rob(o),7);for(q=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[new fY(n),new lY(n)]))))));Cm(q);){p=Wv(Dm(q),7);if(!Ckb(Ixb(Xv(rJ(p.f,qL))))){if(n.g==(sN(),$M)){g=true;break t}if(n.g==pN){h=true;break t}}}}m=h&&!g;l=g&&!h}if(!m&&!l&&d.c.c.length!=0){k=0;for(j=new Tob(d.c);j.a<j.c.c.length;){i=Wv(Rob(j),33);k+=i.i.b+i.j.b/2}k/=d.c.c.length;s=k>=d.j.b/2}else{s=!l}if(s){r=Wv(rJ(d,(Rib(),Qib)),20);if(!r){f=new GU;sJ(d,Qib,f)}else if(m){f=r}else{e=Wv(rJ(d,Yhb),20);if(!e){f=new GU;sJ(d,Yhb,f)}else{r.Y()<=e.Y()?(f=r):(f=e)}}}else{e=Wv(rJ(d,(Rib(),Yhb)),20);if(!e){f=new GU;sJ(d,Yhb,f)}else if(l){f=e}else{r=Wv(rJ(d,Qib),20);if(!r){f=new GU;sJ(d,Qib,f)}else{e.Y()<=r.Y()?(f=e):(f=r)}}}f.ib(a);sJ(a,(Rib(),Zhb),c);if(b.d==c){eW(b,null);c.b.c.length+c.e.c.length==0&&PX(c,null)}else{dW(b,null);c.b.c.length+c.e.c.length==0&&PX(c,null)}_I(b.a)}
function rU(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;c=new bV(b);c.a||kU(b);j=jU(b);i=new xk;q=new oV;for(p=new Tob(b.b);p.a<p.c.c.length;){o=Wv(Rob(p),9);for(e=Uh(mX(o));Cm(e);){d=Wv(Dm(e),12);if(d.c.f.g==(CX(),xX)||d.d.f.g==xX){k=qU(a,d,j,q);Fd(i,oU(k.d),k.a)}}}g=new GU;for(t=Wv(rJ(c.c,(Rib(),fib)),18).mb();t.G();){s=Wv(t.H(),32);n=q.c[s.e];m=q.b[s.e];h=q.a[s.e];f=null;r=null;switch(s.e){case 4:f=new VN(a.d.a,n,j.b.a-a.d.a,m-n);r=new VN(a.d.a,n,h,m-n);YU(j,new HI(f.d+f.c,f.e));YU(j,new HI(f.d+f.c,f.e+f.b));break;case 2:f=new VN(j.a.a,n,a.c.a-j.a.a,m-n);r=new VN(a.c.a-h,n,h,m-n);YU(j,new HI(f.d,f.e));YU(j,new HI(f.d,f.e+f.b));break;case 1:f=new VN(n,a.d.b,m-n,j.b.b-a.d.b);r=new VN(n,a.d.b,m-n,h);YU(j,new HI(f.d,f.e+f.b));YU(j,new HI(f.d+f.c,f.e+f.b));break;case 3:f=new VN(n,j.a.b,m-n,a.c.b-j.a.b);r=new VN(n,a.c.b-h,m-n,h);YU(j,new HI(f.d,f.e));YU(j,new HI(f.d+f.c,f.e));}if(f){l=new jV;l.d=s;l.b=f;l.c=r;l.a=pr(Wv(Dd(i,oU(s)),18));g.c[g.c.length]=l}}xU(c.b,g);c.d=pT(tT(j));return c}
function tt(){var a=['\\u0000','\\u0001','\\u0002','\\u0003','\\u0004','\\u0005','\\u0006','\\u0007','\\b','\\t','\\n','\\u000B','\\f','\\r','\\u000E','\\u000F','\\u0010','\\u0011','\\u0012','\\u0013','\\u0014','\\u0015','\\u0016','\\u0017','\\u0018','\\u0019','\\u001A','\\u001B','\\u001C','\\u001D','\\u001E','\\u001F'];a[34]='\\"';a[92]='\\\\';a[173]='\\u00ad';a[1536]='\\u0600';a[1537]='\\u0601';a[1538]='\\u0602';a[1539]='\\u0603';a[1757]='\\u06dd';a[1807]='\\u070f';a[6068]='\\u17b4';a[6069]='\\u17b5';a[8203]='\\u200b';a[8204]='\\u200c';a[8205]='\\u200d';a[8206]='\\u200e';a[8207]='\\u200f';a[8232]='\\u2028';a[8233]='\\u2029';a[8234]='\\u202a';a[8235]='\\u202b';a[8236]='\\u202c';a[8237]='\\u202d';a[8238]='\\u202e';a[8288]='\\u2060';a[8289]='\\u2061';a[8290]='\\u2062';a[8291]='\\u2063';a[8292]='\\u2064';a[8298]='\\u206a';a[8299]='\\u206b';a[8300]='\\u206c';a[8301]='\\u206d';a[8302]='\\u206e';a[8303]='\\u206f';a[65279]='\\ufeff';a[65529]='\\ufff9';a[65530]='\\ufffa';a[65531]='\\ufffb';return a}
function eab(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;b=0;r=true;w=null;for(d=0;d<a.length;d++){f=a[d];q=f.g;if(q==(CX(),AX)){w=f;r=false}else if(q==BX){if(aw(rJ(f,(Rib(),uib)),12)){continue}c=Wv(rJ(f,uib),9);if(w!=c){w=c;r=true}if(!LM(Wv(rJ(c,(eM(),TL)),28))){continue}m=null;o=null;for(t=new Tob(f.f);t.a<t.c.c.length;){s=Wv(Rob(t),7);s.b.c.length==0?s.e.c.length==0||(o=Wv(rJ(s,uib),7)):(m=Wv(rJ(s,uib),7))}for(e=d+1;e<a.length;e++){g=a[e];l=g.g;if(l==AX){break}else if(l==BX){if(gw(rJ(g,uib))!==gw(c)){break}h=null;j=null;for(v=new Tob(g.f);v.a<v.c.c.length;){u=Wv(Rob(v),7);u.b.c.length==0?u.e.c.length==0||(j=Wv(rJ(u,uib),7)):(h=Wv(rJ(u,uib),7))}if(r){n=false;p=false;if(!!o&&!!h&&o.k<h.k){++b;p=true}if(!!m&&!!j&&m.k>j.k){++b;n=true}if(!!o&&!!j&&o.k>j.k){++b;p=true}if(!!m&&!!h&&m.k<h.k){++b;n=true}n&&p&&m==o&&--b}else{i=false;k=false;if(!!m&&!!j&&m.k<j.k){++b;k=true}if(!!o&&!!h&&o.k>h.k){++b;i=true}if(!!m&&!!h&&m.k<h.k){++b;i=true}if(!!o&&!!j&&o.k>j.k){++b;k=true}i&&k&&h==j&&--b}}}}}return b}
function Oab(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D;for(t=a.a,u=0,v=t.length;u<v;++u){s=t[u];j=$xb;k=$xb;for(o=new Tob(s.f);o.a<o.c.c.length;){m=Wv(Rob(o),9);g=!m.d?-1:zU(m.d.a,m,0);if(g>0){l=Wv(yU(m.d.a,g-1),9);B=Xjb(a.b,m,l);q=m.i.b-m.e.d-(l.i.b+l.j.b+l.e.a+B)}else{q=m.i.b-m.e.d}j=q<j?q:j;if(g<m.d.a.c.length-1){l=Wv(yU(m.d.a,g+1),9);B=Xjb(a.b,m,l);r=l.i.b-l.e.d-(m.i.b+m.j.b+m.e.a+B)}else{r=2*m.i.b}k=r<k?r:k}i=$xb;f=false;e=Wv(yU(s.f,0),9);for(D=new Tob(e.f);D.a<D.c.c.length;){C=Wv(Rob(D),7);p=e.i.b+C.i.b+C.a.b;for(d=new Tob(C.b);d.a<d.c.c.length;){c=Wv(Rob(d),12);w=c.c;b=w.f.i.b+w.i.b+w.a.b-p;if((b<=0?0-b:b)<(i<=0?0-i:i)&&(b<=0?0-b:b)<(b<0?j:k)){i=b;f=true}}}h=Wv(yU(s.f,s.f.c.length-1),9);for(A=new Tob(h.f);A.a<A.c.c.length;){w=Wv(Rob(A),7);p=h.i.b+w.i.b+w.a.b;for(d=new Tob(w.e);d.a<d.c.c.length;){c=Wv(Rob(d),12);C=c.d;b=C.f.i.b+C.i.b+C.a.b-p;if((b<=0?0-b:b)<(i<=0?0-i:i)&&(b<=0?0-b:b)<(b<0?j:k)){i=b;f=true}}}if(f&&i!=0){for(n=new Tob(s.f);n.a<n.c.c.length;){m=Wv(Rob(n),9);m.i.b+=i}}}}
function bU(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D;l=dU($T(a,(sN(),dN)),b);o=cU($T(a,eN),b);u=cU($T(a,mN),b);B=eU($T(a,oN),b);m=eU($T(a,_M),b);s=cU($T(a,lN),b);p=cU($T(a,fN),b);w=cU($T(a,nN),b);v=cU($T(a,aN),b);C=eU($T(a,cN),b);r=cU($T(a,jN),b);t=cU($T(a,iN),b);A=cU($T(a,bN),b);D=eU($T(a,kN),b);n=eU($T(a,gN),b);q=cU($T(a,hN),b);c=oJ(Bv(tv(kw,1),hyb,26,12,[s.a,B.a,w.a,D.a]));d=oJ(Bv(tv(kw,1),hyb,26,12,[o.a,l.a,u.a,q.a]));e=r.a;f=oJ(Bv(tv(kw,1),hyb,26,12,[p.a,m.a,v.a,n.a]));j=oJ(Bv(tv(kw,1),hyb,26,12,[s.b,o.b,p.b,t.b]));i=oJ(Bv(tv(kw,1),hyb,26,12,[B.b,l.b,m.b,q.b]));k=C.b;h=oJ(Bv(tv(kw,1),hyb,26,12,[w.b,u.b,v.b,A.b]));VT($T(a,dN),c+e,j+k);VT($T(a,hN),c+e,j+k);VT($T(a,eN),c+e,0);VT($T(a,mN),c+e,j+k+i);VT($T(a,oN),0,j+k);VT($T(a,_M),c+e+d,j+k);VT($T(a,fN),c+e+d,0);VT($T(a,nN),0,j+k+i);VT($T(a,aN),c+e+d,j+k+i);VT($T(a,cN),0,j);VT($T(a,jN),c,0);VT($T(a,bN),0,j+k+i);VT($T(a,gN),c+e+d,0);g=new FI;g.a=oJ(Bv(tv(kw,1),hyb,26,12,[c+d+e+f,C.a,t.a,A.a]));g.b=oJ(Bv(tv(kw,1),hyb,26,12,[j+i+k+h,r.b,D.b,n.b]));return g}
function Nfb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;d=new jJ;j=null;o=a.c;n=o.f.g;if(n!=(CX(),AX)&&n!=BX){throw new slb('The target node of the edge must be a normal node or a northSouthPort.')}if(n==BX){m=Wv(rJ(o,(Rib(),uib)),7);j=new HI(MI(Bv(tv(qz,1),Fzb,10,0,[m.f.i,m.i,m.a])).a,MI(Bv(tv(qz,1),Fzb,10,0,[o.f.i,o.i,o.a])).b);o=m}SI(d,MI(Bv(tv(qz,1),Fzb,10,0,[o.f.i,o.i,o.a])));g=Nlb(5,pgb(o.f,o.g));l=new GI(sgb(o.g));l.a*=g;l.b*=g;QI(d,vI(l,MI(Bv(tv(qz,1),Fzb,10,0,[o.f.i,o.i,o.a]))));!!j&&TI(d,j,d.c.b,d.c);f=a;i=a;h=null;c=false;while(f){e=f.a;if(e.b!=0){if(c){QI(d,CI(vI(h,(Bxb(e.b!=0),Wv(e.a.a.c,10))),0.5));c=false}else{c=true}h=xI((Bxb(e.b!=0),Wv(e.c.b.c,10)));Ue(d,e);_I(e)}i=f;f=Wv(re(Ktb(b.d,f)),12)}p=i.d;if(p.f.g==BX){m=Wv(rJ(p,(Rib(),uib)),7);QI(d,new HI(MI(Bv(tv(qz,1),Fzb,10,0,[m.f.i,m.i,m.a])).a,MI(Bv(tv(qz,1),Fzb,10,0,[p.f.i,p.i,p.a])).b));p=m}g=Nlb(5,pgb(p.f,p.g));l=new GI(sgb(p.g));CI(l,g);QI(d,vI(l,MI(Bv(tv(qz,1),Fzb,10,0,[p.f.i,p.i,p.a]))));SI(d,MI(Bv(tv(qz,1),Fzb,10,0,[p.f.i,p.i,p.a])));k=new efb(d);Ue(a.a,Veb(k))}
function bZ(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o;if(gw(rJ(a.c,(eM(),TL)))===gw((KM(),GM))||gw(rJ(a.c,TL))===gw(FM)){for(k=new Tob(a.c.f);k.a<k.c.c.length;){j=Wv(Rob(k),7);if(j.g==(sN(),$M)||j.g==pN){return false}}}for(d=Uh(mX(a.c));Cm(d);){c=Wv(Dm(d),12);if(c.c.f==c.d.f){return false}}if(MM(Wv(rJ(a.c,TL),28))){n=new GU;for(i=nX(a.c,(sN(),rN)).mb();i.G();){g=Wv(i.H(),7);vU(n,Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[g.b,g.e]))))))}o=(_b(n),new Vh(n));n=new GU;for(h=nX(a.c,ZM).mb();h.G();){g=Wv(h.H(),7);vU(n,Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[g.b,g.e]))))))}b=(_b(n),new Vh(n))}else{o=iX(a.c);b=mX(a.c)}f=!sl(mX(a.c));e=!sl(iX(a.c));if(!f&&!e){return false}if(!f){a.e=1;return true}if(!e){a.e=0;return true}if(Ul((Il(),new Im(Dl(ul(o.a,new yl)))))==1){l=(_b(o),Wv(Ql(new Im(Dl(ul(o.a,new yl)))),12)).c.f;if(l.g==(CX(),zX)&&Wv(rJ(l,(Rib(),qib)),7).f!=a.c){a.e=2;return true}}if(Ul(new Im(Dl(ul(b.a,new yl))))==1){m=(_b(b),Wv(Ql(new Im(Dl(ul(b.a,new yl)))),12)).d.f;if(m.g==(CX(),zX)&&Wv(rJ(m,(Rib(),rib)),7).f!=a.c){a.e=3;return true}}return false}
function K$(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;d=new GU;e=$xb;f=$xb;g=$xb;if(c){e=a.e.a;for(p=new Tob(b.f);p.a<p.c.c.length;){o=Wv(Rob(p),7);for(i=new Tob(o.e);i.a<i.c.c.length;){h=Wv(Rob(i),12);if(h.a.b!=0){k=Wv(UI(h.a),10);if(k.a<e){f=e-k.a;g=$xb;d.c=xv(UF,syb,1,0,4,1);e=k.a}if(k.a<=e){d.c[d.c.length]=h;h.a.b>1&&(g=Qlb(g,Jlb(Wv(tn(h.a,1),10).b-k.b)))}}}}}else{for(p=new Tob(b.f);p.a<p.c.c.length;){o=Wv(Rob(p),7);for(i=new Tob(o.b);i.a<i.c.c.length;){h=Wv(Rob(i),12);if(h.a.b!=0){m=Wv(VI(h.a),10);if(m.a>e){f=m.a-e;g=$xb;d.c=xv(UF,syb,1,0,4,1);e=m.a}if(m.a>=e){d.c[d.c.length]=h;h.a.b>1&&(g=Qlb(g,Jlb(Wv(tn(h.a,h.a.b-2),10).b-m.b)))}}}}}if(d.c.length!=0&&f>b.j.a/2&&g>b.j.b/2){n=new RX;PX(n,b);QX(n,(sN(),$M));n.i.a=b.j.a/2;r=new RX;PX(r,b);QX(r,pN);r.i.a=b.j.a/2;r.i.b=b.j.b;for(i=new Tob(d);i.a<i.c.c.length;){h=Wv(Rob(i),12);if(c){j=Wv(YI(h.a),10);q=h.a.b==0?MX(h.d):Wv(UI(h.a),10);q.b>=j.b?dW(h,r):dW(h,n)}else{j=Wv(ZI(h.a),10);q=h.a.b==0?MX(h.c):Wv(VI(h.a),10);q.b>=j.b?eW(h,r):eW(h,n)}l=Wv(rJ(h,(eM(),CL)),44);!!l&&Ve(l,j,true)}b.i.a=e-b.j.a/2}}
function N2(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;r=new GU;s=new GU;t=new GU;for(f=new Tob(b);f.a<f.c.c.length;){e=Wv(Rob(f),75);e.k>50?(r.c[r.c.length]=e,true):e.k>0?(s.c[s.c.length]=e,true):(t.c[t.c.length]=e,true)}if(s.c.length==1&&r.c.length==0){xU(r,s);s.c=xv(UF,syb,1,0,4,1)}r.c.length!=0&&Zsb(U2(a.a),(Ieb(),meb))&&Zsb(U2(a.a),(Ieb(),oeb))?L2(a,r):xU(s,r);s.c.length==0||M2(a,s);if(t.c.length!=0){c=V2(a.a);if(c.c!=0){k=new Tob(t);i=(_b(c),Nl((new vl(c)).a));while(k.a<k.c.c.length){e=Wv(Rob(k),75);while(k.a<k.c.c.length&&e.a.a.Y()<2){e=Wv(Rob(k),75)}if(e.a.a.Y()>1){p=Wv(nm(i),60);aeb(e,p,true);Sob(k);Y2(a.a,p)}}}m=t.c.length;d=O2(a);n=new GU;g=m/T2(a.a).c|0;for(h=0;h<g;h++){xU(n,T2(a.a))}o=m%T2(a.a).c;if(o>3){xU(n,(Ieb(),Ieb(),geb));o-=4}switch(o){case 3:vU(n,Meb(d));case 2:q=Leb(Meb(d));do{q=Leb(q)}while(!Zsb(U2(a.a),q));n.c[n.c.length]=q;q=Neb(Meb(d));do{q=Neb(q)}while(!Zsb(U2(a.a),q));n.c[n.c.length]=q;break;case 1:vU(n,Meb(d));}l=new Tob(n);j=new Tob(t);while(l.a<l.c.c.length&&j.a<j.c.c.length){aeb(Wv(Rob(j),75),Wv(Rob(l),60),true)}}}
function G9(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w;k=b.c.c.length;a.a=xv(qB,Txb,51,k,0,2);a.b=xv(qB,Txb,51,k,0,2);a.k=xv(qB,Txb,51,k,0,2);i=xv(mw,Yyb,26,k,12,1);g=xv(KH,xAb,26,k,13,1);a.c=xv(KH,xAb,26,k,13,1);a.d=xv(KH,xAb,26,k,13,1);r=0;v=0;m=new Fnb(b.c,0);while(m.b<m.d.Y()){j=(Bxb(m.b<m.d.Y()),Wv(m.d.sb(m.c=m.b++),16));l=m.b-1;n=j.a.c.length;a.a[l]=xv(qB,Nzb,9,n,0,1);a.k[l]=xv(qB,Nzb,9,n,0,1);a.b[l]=xv(qB,Nzb,9,n,0,1);i[l]=0;g[l]=false;s=new Fnb(j.a,0);while(s.b<s.d.Y()){q=(Bxb(s.b<s.d.Y()),Wv(s.d.sb(s.c=s.b++),9));a.b[l][s.b-1]=q;q.k=r++;o=Wv(rJ(q,(Rib(),nib)),9);!!o&&(Nm(a.g,o,q,null),true);for(u=new Tob(q.f);u.a<u.c.c.length;){t=Wv(Rob(u),7);t.k=v++;for(f=new Tob(t.e);f.a<f.c.c.length;){e=Wv(Rob(f),12);e.d.f.d==j&&++i[l]}t.g==(sN(),ZM)?t.e.c.length+t.b.c.length>1&&(a.c[l]=true):t.g==rN&&t.e.c.length+t.b.c.length>1&&(a.d[l]=true)}if(q.g==(CX(),BX)){++i[l];g[l]=true}}}c=true;p=true;for(h=0;h<a.d.length-1;h++){d=a.c[h]||a.d[h+1];c=c&d;p=p&!d}a.j=xv(lw,tAb,26,v,12,1);w=xv(mw,Yyb,26,v,12,1);if(!c){a.i=new iab(i,g,w);a.f=a.i}if(!p){a.e=new mab(i,g,w);a.f=a.e}}
function iU(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B;a.d=new HI(Uzb,Uzb);a.c=new HI(Vzb,Vzb);for(m=b.mb();m.G();){k=Wv(m.H(),55);for(t=new Tob(k.b);t.a<t.c.c.length;){s=Wv(Rob(t),9);a.d.a=Qlb(a.d.a,s.i.a-s.e.b);a.d.b=Qlb(a.d.b,s.i.b-s.e.d);a.c.a=Nlb(a.c.a,s.i.a+s.j.a+s.e.c);a.c.b=Nlb(a.c.b,s.i.b+s.j.b+s.e.a)}}h=new cV;for(l=b.mb();l.G();){k=Wv(l.H(),55);d=rU(a,k);vU(h.a,d);d.a=d.a|!Wv(rJ(d.c,(Rib(),fib)),18).V()}a.b=(xR(),B=new HR,B.f=new kR(c),B.b=jR(B.f,h),B);BR((o=a.b,new sI,o));a.e=new FI;a.a=a.b.f.e;for(g=new Tob(h.a);g.a<g.c.c.length;){e=Wv(Rob(g),347);u=CR(a.b,e);TW(e.c,u.a,u.b);for(q=new Tob(e.c.b);q.a<q.c.c.length;){p=Wv(Rob(q),9);if(p.g==(CX(),xX)){r=mU(a,p.i,Wv(rJ(p,(Rib(),hib)),32));vI(BI(p.i),r)}}}for(f=new Tob(h.a);f.a<f.c.c.length;){e=Wv(Rob(f),347);for(j=new Tob(aV(e));j.a<j.c.c.length;){i=Wv(Rob(j),12);A=new kJ(i.a);rn(A,0,MX(i.c));QI(A,MX(i.d));n=null;for(w=WI(A,0);w.b!=w.d.c;){v=Wv(_ub(w),10);if(!n){n=v;continue}if(Xs(n.a,v.a)){a.e.a=Qlb(a.e.a,n.a);a.a.a=Nlb(a.a.a,n.a)}else if(Xs(n.b,v.b)){a.e.b=Qlb(a.e.b,n.b);a.a.b=Nlb(a.a.b,n.b)}n=v}}}zI(a.e);vI(a.a,a.e)}
function U1(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F;p=new HU(b.b);u=new HU(b.b);m=new HU(b.b);B=new HU(b.b);q=new HU(b.b);for(A=WI(b,0);A.b!=A.d.c;){v=Wv(_ub(A),7);for(h=new Tob(v.e);h.a<h.c.c.length;){f=Wv(Rob(h),12);if(f.c.f==f.d.f){if(v.g==f.d.g){B.c[B.c.length]=f;continue}else if(v.g==(sN(),$M)&&f.d.g==pN){q.c[q.c.length]=f;continue}}}}for(i=new Tob(q);i.a<i.c.c.length;){f=Wv(Rob(i),12);V1(a,f,c,d,(sN(),ZM))}for(g=new Tob(B);g.a<g.c.c.length;){f=Wv(Rob(g),12);C=new uX(a);sX(C,(CX(),BX));sJ(C,(eM(),TL),(KM(),FM));sJ(C,(Rib(),uib),f);D=new RX;sJ(D,uib,f.d);QX(D,(sN(),rN));PX(D,C);F=new RX;sJ(F,uib,f.c);QX(F,ZM);PX(F,C);sJ(f.c,Bib,C);sJ(f.d,Bib,C);dW(f,null);eW(f,null);c.c[c.c.length]=C;sJ(C,aib,Elb(2))}for(w=WI(b,0);w.b!=w.d.c;){v=Wv(_ub(w),7);j=v.b.c.length>0;r=v.e.c.length>0;j&&r?(m.c[m.c.length]=v,true):j?(p.c[p.c.length]=v,true):r&&(u.c[u.c.length]=v,true)}for(o=new Tob(p);o.a<o.c.c.length;){n=Wv(Rob(o),7);vU(e,T1(a,n,null,c))}for(t=new Tob(u);t.a<t.c.c.length;){s=Wv(Rob(t),7);vU(e,T1(a,null,s,c))}for(l=new Tob(m);l.a<l.c.c.length;){k=Wv(Rob(l),7);vU(e,T1(a,k,k,c))}}
function ZP(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A;u=new II(b.d);i=new GU;for(t=new Tob(b.b);t.a<t.c.c.length;){r=Wv(Rob(t),9);n=Wv(Smb(a.j,r),69);if(n){$P(a,r,n,u);for(w=new Tob(r.f);w.a<w.c.c.length;){v=Wv(Rob(w),7);o=Wv(Smb(a.n,v),69);if(o){$P(a,v,o,QP);WP(o,(eM(),WL),new lv(yc(v.g)))}if(gw(rJ(r,(eM(),VL)))!==gw((UM(),RM))){for(q=new Tob(v.c);q.a<q.c.c.length;){p=Wv(Rob(q),33);m=Wv(Smb(a.f,p),69);$P(a,p,m,QP)}}}if(Wv(rJ(r,(eM(),JL)),86).Y()!=0){for(q=new Tob(r.c);q.a<q.c.c.length;){p=Wv(Rob(q),33);m=Wv(Smb(a.f,p),69);$P(a,p,m,QP)}}for(h=Uh(mX(r));Cm(h);){f=Wv(Dm(h),12);SW(f.d.f,r)||(i.c[i.c.length]=f,true)}}}A=Wv(rJ(b,(Rib(),zib)),9);if(A){for(h=Uh(mX(A));Cm(h);){f=Wv(Dm(h),12);SW(f.d.f,A)&&(i.c[i.c.length]=f,true)}}for(g=new Tob(i);g.a<g.c.c.length;){f=Wv(Rob(g),12);l=Wv(Smb(a.b,f),69);YP(a,f,l,u);for(q=new Tob(f.b);q.a<q.c.c.length;){p=Wv(Rob(q),33);m=Wv(Smb(a.f,p),69);$P(a,p,m,u)}}c=(d=Wv(rJ(b,Xhb),15).a,new HI(b.e.a+b.a.b+b.a.c+2*d,b.e.b+b.a.d+b.a.a+2*d));k=Wv(rJ(b,zib),9);if(k){k.j.a=c.a;k.j.b=c.b}j=Wv(rJ(b,PP),69);VP(a,j,Jzb,c.a);VP(a,j,Kzb,c.b);for(s=new Tob(b.b);s.a<s.c.c.length;){r=Wv(Rob(s),9);e=Wv(rJ(r,sib),55);!!e&&ZP(a,e)}}
function Xfb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H;F=new aJ;B=new aJ;r=-1;for(i=new Tob(a);i.a<i.c.c.length;){g=Wv(Rob(i),77);g.i=r--;l=0;v=0;for(f=new Tob(g.j);f.a<f.c.c.length;){d=Wv(Rob(f),117);v+=d.c}for(e=new Tob(g.d);e.a<e.c.c.length;){d=Wv(Rob(e),117);l+=d.c}g.e=l;g.k=v;v==0?(TI(B,g,B.c.b,B.c),true):l==0&&(TI(F,g,F.c.b,F.c),true)}H=new Yub((Oh(),a));m=a.c.length;q=m+1;s=m-1;o=new GU;while(H.a.Y()!=0){while(B.b!=0){A=(Bxb(B.b!=0),Wv($I(B,B.a.a),77));H.a.eb(A)!=null;A.i=s--;agb(A,F,B)}while(F.b!=0){C=(Bxb(F.b!=0),Wv($I(F,F.a.a),77));H.a.eb(C)!=null;C.i=q++;agb(C,F,B)}p=eyb;for(j=(t=(new Snb(H.a)).a.bb().mb(),new Ynb(t));j.a.G();){g=(k=Wv(j.a.H(),21),Wv(k.yb(),77));u=g.k-g.e;if(u>=p){if(u>p){o.c=xv(UF,syb,1,0,4,1);p=u}o.c[o.c.length]=g}}if(o.c.length!=0){n=Wv(yU(o,vvb(b,o.c.length)),77);H.a.eb(n)!=null;n.i=q++;agb(n,F,B);o.c=xv(UF,syb,1,0,4,1)}}w=a.c.length+1;for(h=new Tob(a);h.a<h.c.c.length;){g=Wv(Rob(h),77);g.i<m&&(g.i+=w)}for(D=new Tob(a);D.a<D.c.c.length;){C=Wv(Rob(D),77);c=new Fnb(C.j,0);while(c.b<c.d.Y()){d=(Bxb(c.b<c.d.Y()),Wv(c.d.sb(c.c=c.b++),117));G=d.b;if(C.i>G.i){vnb(c);BU(G.d,d);if(d.c>0){d.a=G;vU(G.j,d);d.b=C;vU(C.d,d)}}}}}
function OO(a){var b,c,d;for(d=new Lsb((new Fsb(a.c)).a);htb(d.a);){c=(d.b=itb(d.a),new Psb(d.c,d.b));b=Wv(c.b.b[c.a.e],62);switch(Wv(c.a,67).e){case 0:b.d=0;b.e=-(b.b+a.d);break;case 1:b.d=(a.e.e.j.a-b.c)/2;b.e=-(b.b+a.d);break;case 2:b.d=a.e.e.j.a-b.c;b.e=-(b.b+a.d);break;case 3:b.d=0;b.e=a.e.e.j.b+a.d;break;case 4:b.d=(a.e.e.j.a-b.c)/2;b.e=a.e.e.j.b+a.d;break;case 5:b.d=a.e.e.j.a-b.c;b.e=a.e.e.j.b+a.d;break;case 6:b.d=-(b.c+a.d);b.e=0;break;case 7:b.d=-(b.c+a.d);b.e=(a.e.e.j.b-b.b)/2;break;case 8:b.d=-(b.c+a.d);b.e=a.e.e.j.b-b.b;break;case 9:b.d=a.e.e.j.a+a.d;b.e=0;break;case 10:b.d=a.e.e.j.a+a.d;b.e=(a.e.e.j.b-b.b)/2;break;case 11:b.d=a.e.e.j.a+a.d;b.e=a.e.e.j.b-b.b;break;case 12:b.d=a.q.b+a.d;b.e=a.q.d+a.d;break;case 13:b.d=(a.e.e.j.a-b.c)/2;b.e=a.q.d+a.d;break;case 14:b.d=a.e.e.j.a-a.q.c-b.c-a.d;b.e=a.q.d+a.d;break;case 15:b.d=a.q.b+a.d;b.e=(a.e.e.j.b-b.b)/2;break;case 16:b.d=(a.e.e.j.a-b.c)/2;b.e=(a.e.e.j.b-b.b)/2;break;case 17:b.d=a.e.e.j.a-a.q.c-b.c-a.d;b.e=(a.e.e.j.b-b.b)/2;break;case 18:b.d=a.q.b+a.d;b.e=a.e.e.j.b-a.q.a-b.b-a.d;break;case 19:b.d=(a.e.e.j.a-b.c)/2;b.e=a.e.e.j.b-a.q.a-b.b-a.d;break;case 20:b.d=a.e.e.j.a-a.q.c-b.c-a.d;b.e=a.e.e.j.b-a.q.a-b.b-a.d;}}}
function ddb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I;F=new aJ;B=new aJ;o=-1;for(s=new Tob(a);s.a<s.c.c.length;){q=Wv(Rob(s),80);q.d=o--;i=0;v=0;for(f=new Tob(q.e);f.a<f.c.c.length;){d=Wv(Rob(f),118);v+=d.c}for(e=new Tob(q.b);e.a<e.c.c.length;){d=Wv(Rob(e),118);i+=d.c}q.c=i;q.f=v;v==0?(TI(B,q,B.c.b,B.c),true):i==0&&(TI(F,q,F.c.b,F.c),true)}H=(I=new Vwb,ml(I,a),I);j=a.c.length;p=j-1;n=j+1;l=new GU;while(H.a.c!=0){while(B.b!=0){A=(Bxb(B.b!=0),Wv($I(B,B.a.a),80));cwb(H.a,A)!=null;A.d=p--;jdb(A,F,B)}while(F.b!=0){C=(Bxb(F.b!=0),Wv($I(F,F.a.a),80));cwb(H.a,C)!=null;C.d=n++;jdb(C,F,B)}m=eyb;for(t=(h=new rwb((new wwb((new Gob(H.a)).a)).b),new Mob(h));Bnb(t.a.a);){q=(g=pwb(t.a),Wv(g.yb(),80));u=q.f-q.c;if(u>=m){if(u>m){l.c=xv(UF,syb,1,0,4,1);m=u}l.c[l.c.length]=q}}if(l.c.length!=0){k=Wv(yU(l,vvb(b,l.c.length)),80);cwb(H.a,k)!=null;k.d=n++;jdb(k,F,B);l.c=xv(UF,syb,1,0,4,1)}}w=a.c.length+1;for(r=new Tob(a);r.a<r.c.c.length;){q=Wv(Rob(r),80);q.d<j&&(q.d+=w)}for(D=new Tob(a);D.a<D.c.c.length;){C=Wv(Rob(D),80);c=new Fnb(C.e,0);while(c.b<c.d.Y()){d=(Bxb(c.b<c.d.Y()),Wv(c.d.sb(c.c=c.b++),118));G=d.b;if(C.d>G.d){vnb(c);BU(G.b,d);if(d.c>0){d.a=G;vU(G.e,d);d.b=C;vU(C.b,d)}}}}}
function e0(a){switch(a.e){case 14:return new wY;case 37:return new SY;case 8:return new YY;case 30:return new cZ;case 38:return new qZ;case 3:return new tZ;case 47:case 1:return new SZ((XZ(),WZ));case 4:return new wZ;case 49:return new AZ;case 23:return new $5;case 13:return new d$;case 34:return new j$;case 40:return new w$;case 35:return new F$;case 44:return new o4;case 28:return new I$;case 39:return new L$;case 27:return new N$;case 6:return new R$;case 31:return new m0;case 9:return new q0;case 43:return new w0;case 17:return new A0;case 18:return new G0;case 29:return new S0;case 11:return new q1;case 12:return new Z0;case 36:return new _0;case 46:case 0:return new SZ((XZ(),VZ));case 41:return new b1;case 15:return new e1;case 33:return new k1;case 42:return new R1;case 22:return new X1;case 19:return new k0;case 10:return new _1;case 7:return new c2;case 24:return new f2;case 21:return new h2;case 16:return new n2;case 45:return new q2;case 26:return new x2;case 20:return new A2;case 25:return new H2;case 5:return new l3;case 32:return new u3;case 48:case 2:return new SZ((XZ(),UZ));default:throw new slb('No implementation is available for the layout processor '+(a.d!=null?a.d:''+a.e));}}
function PO(a){var b,c,d,e,f,g,h;c=a.e.e.j;a.b?(b=Wv(oW(a.e,(eM(),jL)),65)):(b=new EP(a.k,a.k,a.k,a.k));e=c.a;(a.b||a.g[1]!=(zM(),xM))&&(e-=b.b+b.c);f=c.a;(a.b||a.g[3]!=(zM(),xM))&&(f-=b.b+b.c);g=c.b;(a.b||a.g[4]!=(zM(),xM))&&(g-=b.d+b.a);d=c.b;(a.b||a.g[2]!=(zM(),xM))&&(d-=b.d+b.a);if(aP(a,(sN(),$M))==(zM(),xM)){a.j[1]=(e-dP(a,$M))/bP(a,$M);a.f=a.b?b.b+(eP(a,$M)==1?a.j[1]:0):a.j[1]}else{a.j[1]=a.k;h=dP(a,$M)+a.j[1]*(eP(a,$M)-1);switch(aP(a,$M).e){case 2:a.f=b.b;break;case 3:a.f=b.b+(e-h)/2;break;case 4:a.f=c.a-h-b.c;}}if(aP(a,pN)==xM){a.j[3]=(f-dP(a,pN))/bP(a,pN);a.r=c.a-(a.b?b.c+(eP(a,pN)==1?a.j[3]:0):a.j[3])}else{a.j[3]=a.k;h=dP(a,pN)+a.j[3]*(eP(a,pN)-1);switch(aP(a,pN).e){case 2:a.r=h+b.b;break;case 3:a.r=c.a-(f-h)/2-b.c;break;case 4:a.r=c.a-b.c;}}if(aP(a,rN)==xM){a.j[4]=(g-dP(a,rN))/bP(a,rN);a.s=c.b-(a.b?b.a+(eP(a,rN)==1?a.j[4]:0):a.j[4])}else{a.j[4]=a.k;h=dP(a,rN)+a.j[4]*(eP(a,rN)-1);switch(aP(a,rN).e){case 2:a.s=h+b.d;break;case 3:a.s=c.b-(g-h)/2-b.a;break;case 4:a.s=c.b-b.a;}}if(aP(a,ZM)==xM){a.j[2]=(d-dP(a,ZM))/bP(a,ZM);a.a=a.b?b.d+(eP(a,ZM)==1?a.j[2]:0):a.j[2]}else{a.j[2]=a.k;h=dP(a,ZM)+a.j[2]*(eP(a,ZM)-1);switch(aP(a,ZM).e){case 2:a.a=b.d;break;case 3:a.a=b.d+(d-h)/2;break;case 4:a.a=c.b-h-b.a;}}}
function hab(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I;G=0;g=0;l=b[0].d;B=c[0].d;for(o=0,q=c.length;o<q;++o){m=c[o];if(LM(Wv(rJ(m,(eM(),TL)),28))){s=0;for(v=new Tob(m.f);v.a<v.c.c.length;){u=Wv(Rob(v),7);if(u.g==(sN(),$M)){for(f=new Tob(u.b);f.a<f.c.c.length;){e=Wv(Rob(f),12);if(e.c.f.d==l){++s;break}}}else{break}}t=0;A=new Fnb(m.f,m.f.c.length);while(A.b>0){u=(Bxb(A.b>0),Wv(A.a.sb(A.c=--A.b),7));w=0;for(f=new Tob(u.b);f.a<f.c.c.length;){e=Wv(Rob(f),12);e.c.f.d==l&&++w}if(w>0){if(u.g==(sN(),$M)){a.a[u.k]=G;++G}else{a.a[u.k]=G+s+t;++t}g+=w}}G+=t}else{r=0;for(v=new Tob(m.f);v.a<v.c.c.length;){u=Wv(Rob(v),7);for(f=new Tob(u.b);f.a<f.c.c.length;){e=Wv(Rob(f),12);e.c.f.d==l&&++r}a.a[u.k]=G}if(r>0){++G;g+=r}}}C=xv(mw,Yyb,26,g,12,1);i=0;for(n=0,p=b.length;n<p;++n){m=b[n];if(LM(Wv(rJ(m,(eM(),TL)),28))){for(v=new Tob(m.f);v.a<v.c.c.length;){u=Wv(Rob(v),7);D=i;for(f=new Tob(u.e);f.a<f.c.c.length;){e=Wv(Rob(f),12);F=e.d;F.f.d==B&&kab(C,D,i++,a.a[F.k])}}}else{D=i;for(v=new Tob(m.f);v.a<v.c.c.length;){u=Wv(Rob(v),7);for(f=new Tob(u.e);f.a<f.c.c.length;){e=Wv(Rob(f),12);F=e.d;F.f.d==B&&kab(C,D,i++,a.a[F.k])}}}}h=1;while(h<G){h*=2}I=2*h-1;h-=1;H=xv(mw,Yyb,26,I,12,1);d=0;for(k=0;k<g;k++){j=C[k]+h;++H[j];while(j>0){j%2>0&&(d+=H[j+1]);j=(j-1)/2|0;++H[j]}}return d}
function BV(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I,J;nI(b,'Compound graph postprocessor',1);c=Ckb(Ixb(Xv(rJ(a,(Mjb(),gjb)))));h=Wv(rJ(a,(Rib(),bib)),144);l=new vtb;for(w=h.W().mb();w.G();){v=Wv(w.H(),12);g=new IU(h.U(v));Gpb(g,new $V(a));F=VV((Cxb(0,g.c.length),Wv(g.c[0],114)));H=WV(Wv(yU(g,g.c.length-1),114));_I(v.a);C=F.f;SW(H.f,C)?(B=Wv(rJ(C,sib),55)):(B=hX(C));o=Wv(rJ(v,(eM(),CL)),44);if(ol(g,zV)){if(!o){o=new jJ;sJ(v,CL,o)}else{_I(o)}}else !!o&&sJ(v,CL,null);q=null;for(f=new Tob(g);f.a<f.c.c.length;){e=Wv(Rob(f),114);u=new FI;MW(u,e.a,B);r=e.b;d=new jJ;gJ(d,0,r.a);hJ(d,u);D=new II(MX(r.c));G=new II(MX(r.d));D.a+=u.a;D.b+=u.b;G.a+=u.a;G.b+=u.b;if(q){d.b==0?(t=G):(t=(Bxb(d.b!=0),Wv(d.a.a.c,10)));I=Jlb(q.a-t.a)>dAb;J=Jlb(q.b-t.b)>dAb;(!c&&I&&J||c&&(I||J))&&QI(v.a,D)}Ue(v.a,d);d.b==0?(q=D):(q=(Bxb(d.b!=0),Wv(d.c.b.c,10)));s=Wv(rJ(r,CL),44);if(s){n=new jJ;gJ(n,0,s);hJ(n,u);Ue(o,n)}if(WV(e)==H){if(hX(H.f)!=e.a){u=new FI;MW(u,hX(H.f),B)}sJ(v,Pib,u)}p=new Fnb(r.b,0);while(p.b<p.d.Y()){i=(Bxb(p.b<p.d.Y()),Wv(p.d.sb(p.c=p.b++),33));if(gw(rJ(i,xib))!==gw(v)){continue}MW(i.i,hX(r.c.f),B);vnb(p);vU(v.b,i)}l.a.db(r,l)}dW(v,F);eW(v,H)}for(k=(A=(new Snb(l.a)).a.bb().mb(),new Ynb(A));k.a.G();){j=(m=Wv(k.a.H(),21),Wv(m.yb(),12));dW(j,null);eW(j,null)}pI(b)}
function c$(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I;C=Wv(rJ(a,(eM(),TL)),28);if(!(C!=(KM(),IM)&&C!=JM)){return}p=a.c;o=p.c.length;l=new HU((Mh(o+2,Uyb),$s(PH(PH(5,o+2),(o+2)/10|0))));q=new HU((Mh(o+2,Uyb),$s(PH(PH(5,o+2),(o+2)/10|0))));vU(l,new ntb);vU(l,new ntb);vU(q,new GU);vU(q,new GU);A=new vtb;for(b=0;b<o;b++){c=(Cxb(b,p.c.length),Wv(p.c[b],16));D=(Cxb(b,l.c.length),Wv(l.c[b],57));r=(mp(),new ntb);l.c[l.c.length]=r;G=(Cxb(b,q.c.length),Wv(q.c[b],20));t=new GU;q.c[q.c.length]=t;for(e=new Tob(c.a);e.a<e.c.c.length;){d=Wv(Rob(e),9);for(j=Uh(iX(d));Cm(j);){h=Wv(Dm(j),12);H=h.c.f;if(!_Z(H)){continue}A.a.db(H,A);F=Wv(D.cb(rJ(H,(Rib(),uib))),9);if(!F){F=$Z(a,H);D.db(rJ(H,uib),F);G.ib(F)}dW(h,Wv(yU(F.f,1),7))}for(i=Uh(mX(d));Cm(i);){h=Wv(Dm(i),12);I=h.d.f;if(!_Z(I)){continue}A.a.db(I,A);s=Wv(Smb(r,rJ(I,(Rib(),uib))),9);if(!s){s=$Z(a,I);Umb(r,rJ(I,uib),s);t.c[t.c.length]=s}eW(h,Wv(yU(s.f,0),7))}}}for(m=0;m<q.c.length;m++){u=(Cxb(m,q.c.length),Wv(q.c[m],20));if(u.V()){continue}if(m==0){n=new sY(a);Fxb(0,p.c.length);fxb(p.c,0,n)}else if(m==l.c.length-1){n=new sY(a);p.c[p.c.length]=n}else{n=(Cxb(m-1,p.c.length),Wv(p.c[m-1],16))}for(g=u.mb();g.G();){f=Wv(g.H(),9);rX(f,n)}}for(w=(B=(new Snb(A.a)).a.bb().mb(),new Ynb(B));w.a.G();){v=(k=Wv(w.a.H(),21),Wv(k.yb(),9));rX(v,null)}}
function Pab(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I,J,K;I=new GU;for(o=new Tob(b.c);o.a<o.c.c.length;){m=Wv(Rob(o),16);for(v=new Tob(m.a);v.a<v.c.c.length;){u=Wv(Rob(v),9);u.k=-1;l=eyb;B=eyb;for(D=new Tob(u.f);D.a<D.c.c.length;){C=Wv(Rob(D),7);for(e=new Tob(C.b);e.a<e.c.c.length;){c=Wv(Rob(e),12);F=Wv(rJ(c,(Rib(),Eib)),24).a;l=l>F?l:F}for(d=new Tob(C.e);d.a<d.c.c.length;){c=Wv(Rob(d),12);F=Wv(rJ(c,(Rib(),Eib)),24).a;B=B>F?B:F}}sJ(u,Fab,Elb(l));sJ(u,Gab,Elb(B))}}r=0;for(n=new Tob(b.c);n.a<n.c.c.length;){m=Wv(Rob(n),16);for(v=new Tob(m.a);v.a<v.c.c.length;){u=Wv(Rob(v),9);if(u.k<0){H=new Wab;H.b=r++;Mab(a,u,H);I.c[I.c.length]=H}}}A=Do(I.c.length);k=Do(I.c.length);for(g=0;g<I.c.length;g++){vU(A,new GU);vU(k,Elb(0))}Kab(b,I,A,k);J=Wv(FU(I,xv(wE,NAb,111,I.c.length,0,1)),625);w=Wv(FU(A,xv(sH,{3:1,5:1,6:1,672:1},20,A.c.length,0,1)),672);j=xv(mw,Yyb,26,k.c.length,12,1);for(h=0;h<j.length;h++){j[h]=(Cxb(h,k.c.length),Wv(k.c[h],24)).a}s=0;t=new GU;for(i=0;i<J.length;i++){j[i]==0&&vU(t,J[i])}q=xv(mw,Yyb,26,J.length,12,1);while(t.c.length!=0){H=Wv(AU(t,0),111);q[H.b]=s++;while(!w[H.b].V()){K=Wv(w[H.b].vb(0),111);--j[K.b];j[K.b]==0&&(t.c[t.c.length]=K,true)}}a.a=xv(wE,NAb,111,J.length,0,1);for(f=0;f<J.length;f++){p=J[f];G=q[f];a.a[G]=p;p.b=G;for(v=new Tob(p.f);v.a<v.c.c.length;){u=Wv(Rob(v),9);u.k=G}}return a.a}
function JP(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C;nI(b,'Fixed Layout',1);i=Wv(rJ(a,(eM(),uL)),122);p=0;q=0;for(t=new Tob(a.b);t.a<t.c.c.length;){r=Wv(Rob(t),9);B=Wv(rJ(r,YL),10);if(B){r.i.a=B.a;r.i.b=B.b;if(Wv(rJ(r,aM),86).kb((DN(),zN))){C=Wv(rJ(r,IL),15).a;j=Wv(rJ(r,HL),15).a;C>0&&j>0&&WW(r,new HI(C,j),true)}}p=Nlb(p,r.i.a+r.j.a);q=Nlb(q,r.i.b+r.j.b);for(n=new Tob(r.c);n.a<n.c.c.length;){l=Wv(Rob(n),33);B=Wv(rJ(l,YL),10);if(B){l.i.a=B.a;l.i.b=B.b}p=Nlb(p,r.i.a+l.i.a+l.j.a);q=Nlb(q,r.i.b+l.i.b+l.j.b)}for(v=new Tob(r.f);v.a<v.c.c.length;){u=Wv(Rob(v),7);B=Wv(rJ(u,YL),10);if(B){u.i.a=B.a;u.i.b=B.b}w=r.i.a+u.i.a;A=r.i.b+u.i.b;p=Nlb(p,w+u.j.a);q=Nlb(q,A+u.j.b);for(m=new Tob(u.c);m.a<m.c.c.length;){l=Wv(Rob(m),33);B=Wv(rJ(l,YL),10);if(B){l.i.a=B.a;l.i.b=B.b}p=Nlb(p,w+l.i.a+l.j.a);q=Nlb(q,A+l.i.b+l.j.b)}}for(h=Uh(mX(r));Cm(h);){f=Wv(Dm(h),12);o=KP(f);p=Nlb(p,o.a);q=Nlb(q,o.b)}for(g=Uh(iX(r));Cm(g);){f=Wv(Dm(g),12);if(gw(rJ(f.c.f,(Rib(),sib)))!==gw(a)){o=KP(f);p=Nlb(p,o.a);q=Nlb(q,o.b)}}}if(i==(NK(),JK)){for(s=new Tob(a.b);s.a<s.c.c.length;){r=Wv(Rob(s),9);for(g=Uh(mX(r));Cm(g);){f=Wv(Dm(g),12);k=LP(f);k.b==0?sJ(f,CL,null):sJ(f,CL,k)}}}a.e.a=p;a.e.b=q;sJ(a,aM,(DN(),d=Wv(Hkb(Lz),11),new atb(d,Wv(exb(d,d.length),11),0)));e=Wv(rJ(a,(Rib(),zib)),9);!!e&&sJ(e,aM,(c=Wv(Hkb(Lz),11),new atb(c,Wv(exb(c,c.length),11),0)));pI(b)}
function Y8(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G;if(!LM(Wv(rJ(b,(eM(),TL)),28))){if(b.f.c.length>1){A=xv(LF,Txb,15,a.a.length,0,1);j=Do(a.a.length);p=0;o=0;c=2*b.d.a.c.length+1;H:for(w=new Tob(b.f);w.a<w.c.c.length;){v=Wv(Rob(w),7);r=v.g==(sN(),$M)||v.g==pN;G=0;if(r){B=Wv(rJ(v,(Rib(),Bib)),9);if(!B){continue}m=false;u=false;for(D=new Tob(B.f);D.a<D.c.c.length;){C=Wv(Rob(D),7);gw(rJ(C,uib))===gw(v)&&(C.e.c.length==0?C.b.c.length==0||(m=true):(u=true))}m&&!u?(G=v.g==$M?-(!B.d?-1:zU(B.d.a,B,0)):c-(!B.d?-1:zU(B.d.a,B,0))):u&&!m?(G=(!B.d?-1:zU(B.d.a,B,0))+1):m&&u&&(G=v.g==$M?0:c/2)}else{for(t=new Tob(v.e);t.a<t.c.c.length;){s=Wv(Rob(t),12);e=s.d;if(e.f.d==b.d){j.c[j.c.length]=v;continue H}else{G+=a.a[e.k]}}for(l=new Tob(v.b);l.a<l.c.c.length;){k=Wv(Rob(l),12);e=k.c;if(e.f.d==b.d){j.c[j.c.length]=v;continue H}else{G-=a.a[e.k]}}}if(v.b.c.length+v.e.c.length>0){A[v.k]=new llb(G/(v.b.c.length+v.e.c.length));p=Rlb(p,A[v.k].a);o=Olb(o,A[v.k].a)}else r&&(A[v.k]=new llb(G))}q=(!b.d?-1:zU(b.d.a,b,0))+1;n=b.d.a.c.length+1;for(i=new Tob(j);i.a<i.c.c.length;){h=Wv(Rob(i),7);G=0;g=0;for(f=Uh(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[new fY(h),new lY(h)]))))));Cm(f);){e=Wv(Dm(f),7);if(e.f.d==b.d){G+=jX(e.f)+1;++g}}d=G/g;F=h.g;F==(sN(),ZM)?d<q?(A[h.k]=new llb(p-d)):(A[h.k]=new llb(o+(n-d))):F==rN&&(d<q?(A[h.k]=new llb(o+d)):(A[h.k]=new llb(p-(n-d))))}Gpb(b.f,new a9(A))}sJ(b,TL,(KM(),EM))}}
function O4(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C;B=new GU;a.a.b.c=xv(UF,syb,1,0,4,1);u=(mp(),new ntb);for(r=new Tob(a.d.c);r.a<r.c.c.length;){p=Wv(Rob(r),16);for(t=new Tob(p.a);t.a<t.c.c.length;){s=Wv(Rob(t),9);if(Ckb(Ixb(Xv(rJ(s,(eM(),qL)))))){if(!sl(gX(s))){h=Wv(ql(gX(s)),12);v=h.c.f;v==s&&(v=h.d.f);w=new RJ(v,EI(xI(s.i),v.i));Umb(a.b,s,w);continue}}f=new Q3(s,a.d);vU(a.a.b,f);Ltb(u.d,s,f)}}for(q=new Tob(a.d.c);q.a<q.c.c.length;){p=Wv(Rob(q),16);for(t=new Tob(p.a);t.a<t.c.c.length;){s=Wv(Rob(t),9);f=Wv(re(Ktb(u.d,s)),25);for(k=Uh(mX(s));Cm(k);){i=Wv(Dm(k),12);d=WI(i.a,0);l=true;o=null;if(d.b!=d.d.c){b=Wv(_ub(d),10);if(i.c.g==(sN(),$M)){C=new X4(b,new HI(b.a,f.j.e),f,i);C.c=true;B.c[B.c.length]=C}if(i.c.g==pN){C=new X4(b,new HI(b.a,f.j.e+f.j.b),f,i);C.d=true;B.c[B.c.length]=C}while(d.b!=d.d.c){c=Wv(_ub(d),10);if(!RR(b.b,c.b)){o=new X4(b,c,null,i);B.c[B.c.length]=o;if(l){l=false;if(c.b<f.j.e){o.c=true}else if(c.b>f.j.e+f.j.b){o.d=true}else{o.d=true;o.c=true}}}d.b!=d.d.c&&(b=c)}if(o){g=Wv(Smb(u,i.d.f),25);if(b.b<g.j.e){o.c=true}else if(b.b>g.j.e+g.j.b){o.d=true}else{o.d=true;o.c=true}}}}for(j=Uh(iX(s));Cm(j);){i=Wv(Dm(j),12);if(i.a.b!=0){b=Wv(VI(i.a),10);if(i.d.g==(sN(),$M)){C=new X4(b,new HI(b.a,f.j.e),f,i);C.c=true;B.c[B.c.length]=C}if(i.d.g==pN){C=new X4(b,new HI(b.a,f.j.e+f.j.b),f,i);C.d=true;B.c[B.c.length]=C}}}}}if(B.c.length!=0){ypb();Gpb(B,null);n=(Cxb(0,B.c.length),Wv(B.c[0],142));e=new L3(n,a.d);for(m=1;m<B.c.length;m++){A=(Cxb(m,B.c.length),Wv(B.c[m],142));if(RR(e.j.d,A.j)&&!(TR(e.j.e+e.j.b,A.k)||TR(A.n,e.j.e))){K3(e,A)}else{vU(a.a.b,e);e=new L3(A,a.d)}}vU(a.a.b,e)}B.c=xv(UF,syb,1,0,4,1);N4(a)}
function eZ(a,b,c,d,e,f){var g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I,J,K,L,M;h=Wv(yU(a.d.c.c,d),16);K=new vtb;o=new vtb;for(n=0;n<h.a.c.length;++n){s=Wv(yU(h.a,n),9);n<c?(D=K.a.db(s,K),D==null):n>c&&(C=o.a.db(s,o),C==null)}L=new vtb;p=new vtb;for(u=(G=(new Snb(K.a)).a.bb().mb(),new Ynb(G));u.a.G();){s=(l=Wv(u.a.H(),21),Wv(l.yb(),9));g=b==1?mX(s):iX(s);for(j=(Il(),new Im(Dl(ul(g.a,new yl))));Cm(j);){i=Wv(Dm(j),12);rY(s.d)!=rY(i.d.f.d)&&stb(L,i.d.f)}}for(v=(H=(new Snb(o.a)).a.bb().mb(),new Ynb(H));v.a.G();){s=(l=Wv(v.a.H(),21),Wv(l.yb(),9));g=b==1?mX(s):iX(s);for(j=(Il(),new Im(Dl(ul(g.a,new yl))));Cm(j);){i=Wv(Dm(j),12);rY(s.d)!=rY(i.d.f.d)&&stb(p,i.d.f)}}if(aZ){Fmb()}B=Wv(yU(a.d.c.c,d+(b==1?1:-1)),16);q=eyb;r=$xb;for(m=0;m<B.a.c.length;m++){s=Wv(yU(B.a,m),9);L.a.R(s)?(q=q>m?q:m):p.a.R(s)&&(r=r<m?r:m)}if(q<r){for(w=(I=(new Snb(L.a)).a.bb().mb(),new Ynb(I));w.a.G();){s=(l=Wv(w.a.H(),21),Wv(l.yb(),9));for(k=Uh(mX(s));Cm(k);){i=Wv(Dm(k),12);if(rY(s.d)==rY(i.d.f.d)){return null}}for(j=Uh(iX(s));Cm(j);){i=Wv(Dm(j),12);if(rY(s.d)==rY(i.c.f.d)){return null}}}for(A=(F=(new Snb(p.a)).a.bb().mb(),new Ynb(F));A.a.G();){s=(l=Wv(A.a.H(),21),Wv(l.yb(),9));for(k=Uh(mX(s));Cm(k);){i=Wv(Dm(k),12);if(rY(s.d)==rY(i.d.f.d)){return null}}for(j=Uh(iX(s));Cm(j);){i=Wv(Dm(j),12);if(rY(s.d)==rY(i.c.f.d)){return null}}}K.a.Y()==0?(M=0):o.a.Y()==0?(M=B.a.c.length):(M=q+1);for(t=new Tob(h.a);t.a<t.c.c.length;){s=Wv(Rob(t),9);if(s.g==(CX(),BX)){return null}}if(f==1){return Co(Bv(tv(PF,1),Txb,24,0,[Elb(M)]))}else if(b==1&&d==e-2||b==0&&d==1){return Co(Bv(tv(PF,1),Txb,24,0,[Elb(M)]))}else{J=eZ(a,b,M,d+(b==1?1:-1),e,f-1);!!J&&b==1&&J.rb(0,Elb(M));return J}}return null}
function aQ(b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;SP(c);o=(eM(),KL).b;if(o in c.a&&Pu(c,o).ic().a){return}j=Pu(c,'source');k=Pu(c,'sourcePort');l=Pu(c,'target');m=Pu(c,'targetPort');if(!j){throw new GQ("Edges must contain a 'source' property.",null,c)}else if(!j.lc()){throw new GQ("Invalid format of an edge's 'source' property. It must be a string.",j,c)}if(!l){throw new GQ("Edges must contain a 'target' property.",null,c)}else if(!l.lc()){throw new GQ("Invalid format of an edge's 'target' property. It must be a string.",l,c)}r=null;t=null;try{q=Wv(Tmb(b.i,j.lc().a),9);!!k&&!!k.lc()&&(r=Wv(Tmb(b.k,k.lc().a),7));s=Wv(Tmb(b.i,l.lc().a),9);!!m&&!!m.lc()&&(t=Wv(Tmb(b.k,m.lc().a),7))}catch(a){a=OH(a);if(aw(a,76)){throw new FQ("An edge's 'source', 'target', 'sourcePort', and 'targetPort' properties have to be strings.",c)}else throw NH(a)}if(!Ckb(Ixb(b.g))){if(!q||!s){return}else if(hX(q)!=hX(s)){return}}if(!q||!s){throw new FQ("An edge's source or target node could not be resolved.",c)}p=hX(q);e=new hW;sJ(e,(Rib(),uib),c);h=Wv(Pu(c,'id'),97);Vmb(b.a,h.a,e);Umb(b.b,e,c);hQ(c,e);dQ(b,c,e,p);f=Wv(rJ(p,jib),18);q==s&&f.ib((ohb(),nhb));if(!r){r=OW(q,new FI,(djb(),bjb),p)}else if(r.f!=q){throw new EQ('Inconsistent source port reference found.')}if(!t){t=OW(s,new FI,(djb(),ajb),p)}else if(t.f!=s){throw new EQ('Inconsistent target port reference found.')}dW(e,r);eW(e,t);(tl(Sh((Gi(),new gr(Ti(Bv(tv(UF,1),syb,1,4,[r.b,r.e]))))))>1||tl(Sh(new gr(Ti(Bv(tv(UF,1),syb,1,4,[t.b,t.e])))))>1)&&f.ib((ohb(),ihb));if(gw(rJ(p,(Mjb(),kjb)))===gw((p9(),n9))&&!(Hzb in c.a)){d=new jJ;try{i=Pu(c,Hzb).hc();for(g=0;g<i.a.length;++g){n=gu(i,g).kc();u=new HI(Pu(n,'x').jc().a,Pu(n,'y').jc().a);TI(d,u,d.c.b,d.c)}sJ(e,vib,d)}catch(a){a=OH(a);if(aw(a,54)){throw new FQ("Invalid format of an edges 'bendPoints' property.",c)}else throw NH(a)}}sJ(e,CL,null)}
function d0(){d0=iI;L_=new f0('LEFT_DIR_PREPROCESSOR',0);o_=new f0('DOWN_DIR_PREPROCESSOR',1);c0=new f0('UP_DIR_PREPROCESSOR',2);m_=new f0('COMMENT_PREPROCESSOR',3);p_=new f0('EDGE_AND_LAYER_CONSTRAINT_EDGE_REVERSER',4);__=new f0('SPLINE_SELF_LOOP_PREPROCESSOR',5);z_=new f0('INTERACTIVE_EXTERNAL_PORT_POSITIONER',6);T_=new f0('PARTITION_PREPROCESSOR',7);j_=new f0('BIG_NODES_PREPROCESSOR',8);D_=new f0('LABEL_DUMMY_INSERTER',9);S_=new f0('PARTITION_POSTPROCESSOR',10);P_=new f0('NODE_PROMOTION',11);I_=new f0('LAYER_CONSTRAINT_PROCESSOR',12);s_=new f0('HIERARCHICAL_PORT_CONSTRAINT_PROCESSOR',13);h_=new f0('BIG_NODES_INTERMEDIATEPROCESSOR',14);N_=new f0('LONG_EDGE_SPLITTER',15);W_=new f0('PORT_SIDE_PROCESSOR',16);F_=new f0('LABEL_DUMMY_SWITCHER',17);G_=new f0('LABEL_MANAGEMENT_PROCESSOR',18);A_=new f0('INVERTED_PORT_PROCESSOR',19);Z_=new f0('SELF_LOOP_PROCESSOR',20);V_=new f0('PORT_LIST_SORTER',21);R_=new f0('NORTH_SOUTH_PORT_PREPROCESSOR',22);r_=new f0('GREEDY_SWITCH',23);U_=new f0('PORT_DISTRIBUTER',24);$_=new f0('SPLINE_SELF_LOOP_POSITIONER',25);Y_=new f0('SAUSAGE_COMPACTION',26);B_=new f0('IN_LAYER_CONSTRAINT_PROCESSOR',27);x_=new f0('HYPEREDGE_DUMMY_MERGER',28);H_=new f0('LABEL_SIDE_SELECTOR',29);k_=new f0('BIG_NODES_SPLITTER',30);C_=new f0('LABEL_AND_NODE_SIZE_PROCESSOR',31);a0=new f0('SPLINE_SELF_LOOP_ROUTER',32);O_=new f0('NODE_MARGIN_CALCULATOR',33);t_=new f0('HIERARCHICAL_PORT_DUMMY_SIZE_PROCESSOR',34);v_=new f0('HIERARCHICAL_PORT_POSITION_PROCESSOR',35);J_=new f0('LAYER_SIZE_AND_GRAPH_HEIGHT_CALCULATOR',36);i_=new f0('BIG_NODES_POSTPROCESSOR',37);l_=new f0('COMMENT_POSTPROCESSOR',38);y_=new f0('HYPERNODE_PROCESSOR',39);u_=new f0('HIERARCHICAL_PORT_ORTHOGONAL_EDGE_ROUTER',40);M_=new f0('LONG_EDGE_JOINER',41);Q_=new f0('NORTH_SOUTH_PORT_POSTPROCESSOR',42);E_=new f0('LABEL_DUMMY_REMOVER',43);w_=new f0('HORIZONTAL_COMPACTOR',44);X_=new f0('REVERSED_EDGE_RESTORER',45);K_=new f0('LEFT_DIR_POSTPROCESSOR',46);n_=new f0('DOWN_DIR_POSTPROCESSOR',47);b0=new f0('UP_DIR_POSTPROCESSOR',48);q_=new f0('END_LABEL_PROCESSOR',49)}
function Rib(){Rib=iI;var a,b;uib=new CJ('origin');_hb=new CJ('processingConfiguration');Fib=new CJ('processors');$hb=new DJ('compoundNode',(xkb(),xkb(),vkb));lib=new DJ('insideConnections',(null,vkb));sib=new CJ('nestedLGraph');zib=new CJ('parentLNode');vib=new CJ('originalBendpoints');wib=new CJ('originalDummyNodePosition');xib=new CJ('originalLabelEdge');Hib=new CJ('representedLabels');pib=new DJ('labelSide',(kP(),jP));Iib=new DJ('reversed',(null,vkb));Gib=new CJ('random');qib=new DJ('longEdgeSource',null);rib=new DJ('longEdgeTarget',null);dib=new DJ('edgeConstraint',(Hgb(),Fgb));nib=new CJ('inLayerLayoutUnit');mib=new DJ('inLayerConstraint',(Hhb(),Fhb));oib=new DJ('inLayerSuccessorConstraint',new GU);Bib=new CJ('portDummy');aib=new DJ('crossingHint',Elb(0));jib=new DJ('graphProperties',(b=Wv(Hkb(mF),11),new atb(b,Wv(exb(b,b.length),11),0)));hib=new DJ('externalPortSide',(sN(),qN));iib=new DJ('externalPortSize',new FI);gib=new CJ('externalPortReplacedDummy');fib=new DJ('externalPortConnections',(a=Wv(Hkb(Kz),11),new atb(a,Wv(exb(a,a.length),11),0)));Cib=new DJ(yzb,0);Shb=new CJ('barycenterAssociates');Qib=new CJ('TopSideComments');Yhb=new CJ('BottomSideComments');Zhb=new CJ('CommentConnectionPort');kib=new DJ('inputCollect',(null,vkb));yib=new DJ('outputCollect',(null,vkb));cib=new DJ('cyclic',(null,vkb));Whb=new DJ('bigNodeOriginalSize',new llb(0));Vhb=new DJ('bigNodeInitial',(null,vkb));Thb=new DJ('de.cau.cs.kieler.klay.layered.bigNodeLabels',new GU);Uhb=new DJ('de.cau.cs.kieler.klay.layered.postProcess',null);bib=new CJ('crossHierarchyMap');Pib=new CJ('targetOffset');Lib=new DJ('splineLabelSize',new FI);Mib=new DJ('splineLoopSide',(Ieb(),Feb));Nib=new DJ('splineSelfLoopComponents',new GU);Oib=new DJ('splineSelfLoopMargins',new DP);Kib=new CJ('spacings');Aib=new DJ('partitionConstraint',(null,vkb));tib=new AJ((eM(),LL),new llb(0));Jib=new BJ(cM,new llb(20),new llb(1));Dib=new BJ(XL,new llb(10),new llb(1));Xhb=new BJ(pL,new llb(12),new llb(0));Eib=new AJ(ZL,Elb(0));Rhb=new BJ(nL,new llb(cAb),new llb(0));eib=new AJ(uL,(NK(),JK))}
function Mjb(){Mjb=iI;Bjb=new DJ('de.cau.cs.kieler.klay.layered.nodePromotion',(I1(),G1));Cjb=new FJ('de.cau.cs.kieler.klay.layered.nodePromotionBoundary',Elb(0),Elb(0),Elb(100));Hjb=new DJ(vzb,Elb(1));Ejb=new EJ('de.cau.cs.kieler.klay.layered.inLayerSpacingFactor',new llb(1),new llb(0));qjb=new DJ('de.cau.cs.kieler.klay.layered.edgeSpacingFactor',new llb(0.5));pjb=new DJ('de.cau.cs.kieler.klay.layered.edgeNodeSpacingFactor',new llb(IAb));njb=new DJ('de.cau.cs.kieler.klay.layered.distributeNodes',(xkb(),xkb(),vkb));Ljb=new DJ('de.cau.cs.kieler.klay.layered.wideNodesOnMultipleLayers',(ckb(),bkb));ljb=new DJ('de.cau.cs.kieler.klay.layered.cycleBreaking',(Z7(),X7));zjb=new DJ('de.cau.cs.kieler.klay.layered.nodeLayering',(x8(),w8));kjb=new DJ('de.cau.cs.kieler.klay.layered.crossMin',(p9(),o9));tjb=new DJ('de.cau.cs.kieler.klay.layered.greedySwitch',(zhb(),whb));Ajb=new DJ('de.cau.cs.kieler.klay.layered.nodePlace',(kbb(),fbb));wjb=new FJ('de.cau.cs.kieler.klay.layered.linearSegmentsDeflectionDampening',new llb(HAb),new llb(0),new llb(1));sjb=new DJ('de.cau.cs.kieler.klay.layered.fixedAlignment',(_gb(),Ygb));ojb=new DJ('de.cau.cs.kieler.klay.layered.edgeLabelSideSelection',(Pgb(),Lgb));mjb=new DJ(uzb,(null,vkb));Kjb=new EJ('de.cau.cs.kieler.klay.layered.thoroughness',Elb(10),Elb(1));vjb=new DJ('de.cau.cs.kieler.klay.layered.layerConstraint',(Xib(),Wib));xjb=new DJ('de.cau.cs.kieler.klay.layered.mergeEdges',(null,vkb));yjb=new DJ('de.cau.cs.kieler.klay.layered.mergeHierarchyEdges',(null,wkb));ujb=new DJ('de.cau.cs.kieler.klay.layered.interactiveReferencePoint',(Mhb(),Khb));rjb=new DJ('de.cau.cs.kieler.klay.layered.feedBackEdges',(null,vkb));gjb=new DJ('de.cau.cs.kieler.klay.layered.unnecessaryBendpoints',(null,vkb));jjb=new DJ('de.cau.cs.kieler.klay.layered.contentAlignment',(zgb(),Vsb(ygb,Bv(tv(iF,1),uyb,123,0,[ugb]))));Ijb=new DJ('de.cau.cs.kieler.klay.layered.sausageFolding',(null,vkb));Jjb=new DJ('de.cau.cs.kieler.klay.layered.splines.selfLoopPlacement',(Qjb(),Pjb));hjb=new DJ('de.cau.cs.kieler.klay.layered.nodeplace.compactionStrategy',(lcb(),jcb));Djb=new DJ('de.cau.cs.kieler.klay.layered.northOrSouthPort',(null,vkb));Fjb=new DJ('de.cau.cs.kieler.klay.layered.postCompaction',(g4(),e4));Gjb=new DJ('de.cau.cs.kieler.klay.layered.postCompaction.constraints',(X3(),W3));ijb=new DJ('de.cau.cs.kieler.klay.layered.components.compact',(null,vkb))}
function uO(){uO=iI;rO=new vO('OUT_T_L',0,(Gi(),new Er(Vsb((oM(),kM),Bv(tv(Gz,1),uyb,41,0,[nM,gM])))),(DO(),BO));qO=new vO('OUT_T_C',1,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[nM,fM])),Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[nM,fM,hM]))]))),AO);sO=new vO('OUT_T_R',2,new Er(Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[nM,iM]))),CO);iO=new vO('OUT_B_L',3,new Er(Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[lM,gM]))),BO);hO=new vO('OUT_B_C',4,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[lM,fM])),Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[lM,fM,hM]))]))),AO);jO=new vO('OUT_B_R',5,new Er(Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[lM,iM]))),CO);mO=new vO('OUT_L_T',6,new Er(Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[gM,nM,hM]))),CO);lO=new vO('OUT_L_C',7,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[gM,mM])),Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[gM,mM,hM]))]))),CO);kO=new vO('OUT_L_B',8,new Er(Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[gM,lM,hM]))),CO);pO=new vO('OUT_R_T',9,new Er(Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[iM,nM,hM]))),BO);oO=new vO('OUT_R_C',10,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[iM,mM])),Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[iM,mM,hM]))]))),BO);nO=new vO('OUT_R_B',11,new Er(Vsb(kM,Bv(tv(Gz,1),uyb,41,0,[iM,lM,hM]))),BO);fO=new vO('IN_T_L',12,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[nM,gM])),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[nM,gM,hM]))]))),BO);eO=new vO('IN_T_C',13,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[nM,fM])),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[nM,fM,hM]))]))),AO);gO=new vO('IN_T_R',14,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[nM,iM])),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[nM,iM,hM]))]))),CO);cO=new vO('IN_C_L',15,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[mM,gM])),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[mM,gM,hM]))]))),BO);bO=new vO('IN_C_C',16,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[mM,fM])),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[mM,fM,hM]))]))),AO);dO=new vO('IN_C_R',17,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[mM,iM])),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[mM,iM,hM]))]))),CO);_N=new vO('IN_B_L',18,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[lM,gM])),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[lM,gM,hM]))]))),BO);$N=new vO('IN_B_C',19,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[lM,fM])),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[lM,fM,hM]))]))),AO);aO=new vO('IN_B_R',20,new gr(Ti(Bv(tv(UF,1),syb,1,4,[Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[lM,iM])),Vsb(jM,Bv(tv(Gz,1),uyb,41,0,[lM,iM,hM]))]))),CO);tO=new vO(szb,21,(null,Fi),null)}
function lab(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,ab,bb,cb,db,eb,fb,gb,hb,ib;$=0;for(G=0,J=b.length;G<J;++G){D=b[G];if(LM(Wv(rJ(D,(eM(),TL)),28))){for(S=new Tob(D.f);S.a<S.c.c.length;){R=Wv(Rob(S),7);U=0;for(h=new Tob(R.e);h.a<h.c.c.length;){g=Wv(Rob(h),12);D.d!=g.d.f.d&&++U}U>0&&(a.a[R.k]=$++)}}else{L=0;for(S=new Tob(D.f);S.a<S.c.c.length;){R=Wv(Rob(S),7);for(h=new Tob(R.e);h.a<h.c.c.length;){g=Wv(Rob(h),12);D.d!=g.d.f.d&&++L}a.a[R.k]=$}L>0&&++$}}eb=0;for(H=0,K=c.length;H<K;++H){D=c[H];if(LM(Wv(rJ(D,(eM(),TL)),28))){M=0;for(S=new Tob(D.f);S.a<S.c.c.length;){R=Wv(Rob(S),7);if(R.g==(sN(),$M)){for(h=new Tob(R.b);h.a<h.c.c.length;){g=Wv(Rob(h),12);if(D.d!=g.c.f.d){++M;break}}}else{break}}O=0;V=new Fnb(D.f,D.f.c.length);while(V.b>0){R=(Bxb(V.b>0),Wv(V.a.sb(V.c=--V.b),7));U=0;for(h=new Tob(R.b);h.a<h.c.c.length;){g=Wv(Rob(h),12);D.d!=g.c.f.d&&++U}if(U>0){if(R.g==(sN(),$M)){a.a[R.k]=eb;++eb}else{a.a[R.k]=eb+M+O;++O}}}eb+=O}else{L=0;for(S=new Tob(D.f);S.a<S.c.c.length;){R=Wv(Rob(S),7);for(h=new Tob(R.b);h.a<h.c.c.length;){g=Wv(Rob(h),12);D.d!=g.c.f.d&&++L}a.a[R.k]=eb}L>0&&++eb}}T=(mp(),new ntb);n=new Wub;for(F=0,I=b.length;F<I;++F){D=b[F];for(cb=new Tob(D.f);cb.a<cb.c.c.length;){bb=Wv(Rob(cb),7);for(h=new Tob(bb.e);h.a<h.c.c.length;){g=Wv(Rob(h),12);gb=g.d;if(D.d!=gb.f.d){ab=Wv(re(Ktb(T.d,bb)),197);fb=Wv(re(Ktb(T.d,gb)),197);if(!ab&&!fb){m=new oab;n.a.db(m,n);vU(m.a,g);vU(m.d,bb);Ltb(T.d,bb,m);vU(m.d,gb);Ltb(T.d,gb,m)}else if(!ab){vU(fb.a,g);vU(fb.d,bb);Ltb(T.d,bb,fb)}else if(!fb){vU(ab.a,g);vU(ab.d,gb);Ltb(T.d,gb,ab)}else if(ab==fb){vU(ab.a,g)}else{vU(ab.a,g);for(Q=new Tob(fb.d);Q.a<Q.c.c.length;){P=Wv(Rob(Q),7);Ltb(T.d,P,ab)}xU(ab.a,fb.a);xU(ab.d,fb.d);n.a.eb(fb)!=null}}}}}o=Wv(Ye(n,xv(tE,{674:1,3:1,5:1,6:1},197,n.a.Y(),0,1)),674);C=b[0].d;Z=c[0].d;for(k=0,l=o.length;k<l;++k){j=o[k];j.e=$;j.f=eb;for(S=new Tob(j.d);S.a<S.c.c.length;){R=Wv(Rob(S),7);W=a.a[R.k];if(R.f.d==C){W<j.e&&(j.e=W);W>j.b&&(j.b=W)}else if(R.f.d==Z){W<j.f&&(j.f=W);W>j.c&&(j.c=W)}}}ipb(o,0,o.length,(hsb(),hsb(),gsb));db=xv(mw,Yyb,26,o.length,12,1);d=xv(mw,Yyb,26,eb+1,12,1);for(q=0;q<o.length;q++){db[q]=o[q].f;d[db[q]]=1}f=0;for(r=0;r<d.length;r++){d[r]==1?(d[r]=f):--f}X=0;for(s=0;s<db.length;s++){db[s]+=d[db[s]];X=Plb(X,db[s]+1)}i=1;while(i<X){i*=2}ib=2*i-1;i-=1;hb=xv(mw,Yyb,26,ib,12,1);e=0;for(A=0;A<db.length;A++){w=db[A]+i;++hb[w];while(w>0){w%2>0&&(e+=hb[w+1]);w=(w-1)/2|0;++hb[w]}}B=xv(sE,syb,156,o.length*2,0,1);for(t=0;t<o.length;t++){B[2*t]=new rab(o[t],o[t].e,o[t].b,(vab(),uab));B[2*t+1]=new rab(o[t],o[t].b,o[t].e,tab)}ipb(B,0,B.length,(null,gsb));N=0;for(u=0;u<B.length;u++){switch(B[u].d.e){case 0:++N;break;case 1:--N;e+=N;}}Y=xv(sE,syb,156,o.length*2,0,1);for(v=0;v<o.length;v++){Y[2*v]=new rab(o[v],o[v].f,o[v].c,(vab(),uab));Y[2*v+1]=new rab(o[v],o[v].c,o[v].f,tab)}ipb(Y,0,Y.length,(null,gsb));N=0;for(p=0;p<Y.length;p++){switch(Y[p].d.e){case 0:++N;break;case 1:--N;e+=N;}}return e}
function eM(){eM=iI;var a,b;mL=new DJ('de.cau.cs.kieler.animate',(xkb(),xkb(),wkb));new DJ('de.cau.cs.kieler.minAnimTime',Elb(400));new DJ('de.cau.cs.kieler.maxAnimTime',Elb(4000));new DJ('de.cau.cs.kieler.animTimeFactor',Elb(100));jL=new DJ('de.cau.cs.kieler.additionalPortSpace',null);qL=new DJ('de.cau.cs.kieler.commentBox',(null,vkb));new CJ('de.cau.cs.kieler.diagramType');tL=new DJ('de.cau.cs.kieler.edgeLabelPlacement',(EK(),DK));vL=new DJ('de.cau.cs.kieler.edgeType',(YK(),WK));xL=new CJ('de.cau.cs.kieler.fontName');yL=new DJ('de.cau.cs.kieler.fontSize',Elb(0));AL=new DJ('de.cau.cs.kieler.hypernode',(null,vkb));CL=new DJ('de.cau.cs.kieler.junctionPoints',new jJ);new DJ('de.cau.cs.kieler.layoutAncestors',(null,vkb));GL=new DJ('de.cau.cs.kieler.margins',new DP);HL=new EJ('de.cau.cs.kieler.minHeight',new llb(0),new llb(0));IL=new EJ('de.cau.cs.kieler.minWidth',new llb(0),new llb(0));KL=new DJ('de.cau.cs.kieler.noLayout',(null,vkb));LL=new CJ('de.cau.cs.kieler.offset');SL=new CJ('de.cau.cs.kieler.klay.layered.portAnchor');UL=new CJ('de.cau.cs.kieler.portIndex');WL=new DJ('de.cau.cs.kieler.portSide',(sN(),qN));new DJ('de.cau.cs.kieler.progressBar',(null,vkb));new DJ('de.cau.cs.kieler.resetConfig',(null,wkb));new DJ('de.cau.cs.kieler.scaleFactor',new llb(1));dM=new DJ('de.cau.cs.kieler.thickness',new llb(1));new DJ('de.cau.cs.kieler.zoomToFit',(null,vkb));kL=new CJ('de.cau.cs.kieler.algorithm');lL=new DJ('de.cau.cs.kieler.alignment',(iK(),cK));nL=new DJ('de.cau.cs.kieler.aspectRatio',new llb(0));oL=new CJ('de.cau.cs.kieler.bendPoints');pL=new DJ('de.cau.cs.kieler.borderSpacing',new llb(-1));rL=new DJ(uzb,(null,vkb));sL=new DJ('de.cau.cs.kieler.direction',(sK(),qK));uL=new DJ('de.cau.cs.kieler.edgeRouting',(NK(),MK));wL=new DJ('de.cau.cs.kieler.expandNodes',(null,vkb));zL=new DJ('de.cau.cs.kieler.hierarchyHandling',(eL(),cL));BL=new DJ('de.cau.cs.kieler.interactive',(null,vkb));DL=new EJ('de.cau.cs.kieler.labelSpacing',new llb(3),new llb(0));EL=new DJ('de.cau.cs.kieler.layoutHierarchy',(null,vkb));JL=new DJ('de.cau.cs.kieler.nodeLabelPlacement',(oM(),b=Wv(Hkb(Gz),11),new atb(b,Wv(exb(b,b.length),11),0)));TL=new DJ('de.cau.cs.kieler.portConstraints',(KM(),JM));VL=new DJ('de.cau.cs.kieler.portLabelPlacement',(UM(),TM));XL=new EJ('de.cau.cs.kieler.portSpacing',new llb(-1),new llb(0));NL=new DJ('de.cau.cs.kieler.portAlignment',(zM(),xM));PL=new DJ('de.cau.cs.kieler.portAlignment.north',yM);QL=new DJ('de.cau.cs.kieler.portAlignment.south',yM);RL=new DJ('de.cau.cs.kieler.portAlignment.west',yM);OL=new DJ('de.cau.cs.kieler.portAlignment.east',yM);YL=new CJ('de.cau.cs.kieler.position');ZL=new CJ('de.cau.cs.kieler.priority');new CJ(vzb);$L=new DJ('de.cau.cs.kieler.selfLoopInside',(null,vkb));_L=new CJ('de.cau.cs.kieler.separateConnComp');aM=new DJ('de.cau.cs.kieler.sizeConstraint',(DN(),a=Wv(Hkb(Lz),11),new atb(a,Wv(exb(a,a.length),11),0)));bM=new DJ('de.cau.cs.kieler.sizeOptions',Vsb((MN(),KN),Bv(tv(Mz,1),uyb,139,0,[IN])));cM=new EJ('de.cau.cs.kieler.spacing',new llb(-1),new llb(0));FL=new DJ('de.cau.cs.kieler.layoutPartitions',(null,vkb));ML=new CJ('de.cau.cs.kieler.partition')}
function wQ(b,c,d,e){tQ();var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;if(!e){if((!b.n?(ypb(),ypb(),wpb):b.n).R(new xQ(c))){return}}if(Wv(rQ.a,18).kb(c)){if(!d.lc()){throw new _J(Pzb+c+Qzb+d+').')}o=Wv(Wv(rQ.b,57).cb(c),79);p=d.lc().a;sJ(b,o,p);return}else if(Wv(oQ.a,18).kb(c)){try{if(!d.jc()){throw new Xlb}o=Wv(Wv(oQ.b,57).cb(c),79);s=Elb(dlb((bmb(),''+d.jc().a)));sJ(b,o,s);return}catch(a){a=OH(a);if(aw(a,130)){throw new _J("Invalid integer format for property '"+c+Qzb+d+').')}else throw NH(a)}}else if(Wv(kQ.a,18).kb(c)){if(!d.ic()){throw new _J(Pzb+c+Qzb+d+').')}o=Wv(Wv(kQ.b,57).cb(c),79);s=(xkb(),d.ic().a?wkb:vkb);sJ(b,o,s);return}else if(Wv(nQ.a,18).kb(c)){if(!d.jc()){throw new _J("Invalid float format for property '"+c+Qzb+d+').')}o=Wv(Wv(nQ.b,57).cb(c),79);s=new klb(d.jc().a);sJ(b,o,s);return}else if(Wv(mQ.a,18).kb(c)){if(!d.lc()){throw new _J(Rzb+c+Qzb+d+').')}l=d.lc().a;m=null;try{vQ((eM(),WL),c)?(m=(sN(),Wv(Gc((yN(),xN),l),32))):vQ(lL,c)?(m=(iK(),Wv(Gc((mK(),lK),l),103))):vQ(sL,c)?(m=(sK(),Wv(Gc((zK(),yK),l),59))):vQ(uL,c)?(m=(NK(),Wv(Gc((RK(),QK),l),122))):vQ(zL,c)?(m=(eL(),Wv(Gc((iL(),hL),l),166))):vQ(NL,c)||vQ(OL,c)||vQ(PL,c)||vQ(QL,c)||vQ(RL,c)?(m=(zM(),Wv(Gc((DM(),CM),l),100))):vQ(TL,c)?(m=(KM(),Wv(Gc((QM(),PM),l),28))):vQ(VL,c)?(m=(UM(),Wv(Gc((YM(),XM),l),149))):vQ(vL,c)?(m=(YK(),Wv(Gc((aL(),_K),l),133))):vQ(tL,c)?(m=(EK(),Wv(Gc((IK(),HK),l),107))):vQ((Mjb(),ljb),c)?(m=(Z7(),Wv(Gc((c8(),b8),l),193))):vQ(zjb,c)?(m=(x8(),Wv(Gc((C8(),B8),l),173))):vQ(ojb,c)?(m=(Pgb(),Wv(Gc((Ugb(),Tgb),l),115))):vQ(hjb,c)?(m=(lcb(),Wv(Gc((pcb(),ocb),l),194))):vQ(kjb,c)?(m=(p9(),Wv(Gc((u9(),t9),l),192))):vQ(Bjb,c)?(m=(I1(),Wv(Gc((M1(),L1),l),109))):vQ(Ajb,c)?(m=(kbb(),Wv(Gc((pbb(),obb),l),141))):vQ(Fjb,c)?(m=(g4(),Wv(Gc((k4(),j4),l),125))):vQ(Gjb,c)?(m=(X3(),Wv(Gc((_3(),$3),l),175))):vQ(sjb,c)?(m=(_gb(),Wv(Gc((dhb(),chb),l),124))):vQ(tjb,c)?(m=(zhb(),Wv(Gc((Dhb(),Chb),l),110))):vQ(vjb,c)?(m=(Xib(),Wv(Gc((_ib(),$ib),l),85))):vQ(Jjb,c)?(m=(Qjb(),Wv(Gc((Ujb(),Tjb),l),153))):vQ(Ljb,c)?(m=(ckb(),Wv(Gc((gkb(),fkb),l),172))):vQ(ujb,c)&&(m=(Mhb(),Wv(Gc((Qhb(),Phb),l),174)))}catch(a){a=OH(a);if(aw(a,54)){throw new _J(Rzb+c+Qzb+d+').')}else throw NH(a)}o=Wv(Wv(mQ.b,57).cb(c),79);sJ(b,o,m);return}else if(Wv(lQ.a,18).kb(c)){if(!d.lc()){throw new _J(Rzb+c+Qzb+d+').')}k=d.lc().a;q=null;j=fmb(k,'[\\[\\]\\s,]+');for(h=0,i=j.length;h<i;++h){g=j[h];if(pmb(hmb(g))==0){continue}if(vQ((eM(),JL),c)){!q&&(q=(f=Wv(Hkb(Gz),11),new atb(f,Wv(exb(f,f.length),11),0)));Wsb(q,(oM(),Wv(Gc((sM(),rM),g),41)))}else if(vQ(aM,c)){!q&&(q=(f=Wv(Hkb(Lz),11),new atb(f,Wv(exb(f,f.length),11),0)));Wsb(q,(DN(),Wv(Gc((HN(),GN),g),150)))}else if(vQ(bM,c)){!q&&(q=(f=Wv(Hkb(Mz),11),new atb(f,Wv(exb(f,f.length),11),0)));Wsb(q,(MN(),Wv(Gc((QN(),PN),g),139)))}else if(vQ((Mjb(),jjb),c)){!q&&(q=(f=Wv(Hkb(iF),11),new atb(f,Wv(exb(f,f.length),11),0)));Wsb(q,(zgb(),Wv(Gc((Dgb(),Cgb),g),123)))}}o=Wv(Wv(lQ.b,57).cb(c),79);sJ(b,o,q);return}else if(Wv(qQ.a,18).kb(c)){if(!d.lc()){throw new _J("Invalid _other_ format for property '"+c+Qzb+d+').')}if(vQ((eM(),YL),c)||vQ(SL,c)){try{r=new FI;AI(r,d.lc().a);o=Wv(Wv(qQ.b,57).cb(c),79);sJ(b,o,r);return}catch(a){a=OH(a);if(aw(a,29)){throw new _J("Invalid KVector format for property '"+c+"' "+d+'.')}else throw NH(a)}}else if(vQ(oL,c)||vQ(CL,c)){try{t=new jJ;iJ(t,d.lc().a);o=Wv(Wv(qQ.b,57).cb(c),79);sJ(b,o,t);return}catch(a){a=OH(a);if(aw(a,29)){throw new _J("Invalid KVectorChain format for property '"+c+"' "+d+'.')}else throw NH(a)}}else if(vQ(GL,c)||vQ(jL,c)){try{n=new DP;tP(n,d.lc().a);o=Wv(Wv(qQ.b,57).cb(c),79);sJ(b,o,n);return}catch(a){a=OH(a);if(aw(a,29)){throw new _J("Invalid Margins format for property '"+c+"' "+d+'.')}else throw NH(a)}}}else if(Wv(pQ.a,18).kb(c)){return}throw new _J("Unsupported layout option '"+c+Qzb+d+').')}
var Sxb='object',Txb={3:1,8:1,5:1,6:1},Uxb={3:1,46:1},Vxb={3:1,54:1,46:1},Wxb='null',Xxb='anonymous',Yxb='Unknown',Zxb='function',$xb=2147483647,_xb={181:1,3:1,54:1,46:1},ayb=65536,byb=65535,cyb={3:1,54:1,29:1,46:1},dyb='For input string: "',eyb=-2147483648,fyb={56:1},gyb={23:1,145:1,185:1},hyb={3:1,5:1},iyb='Invalid UTF8 sequence',jyb='fromIndex: ',kyb='java.lang',lyb='com.google.gwt.core.client',myb='com.google.gwt.core.client.impl',nyb='java.io',oyb='java.nio.charset',pyb='javaemul.internal',qyb='com.google.common.base',ryb='%s (%s) must not be negative',syb={3:1,5:1,6:1},tyb='negative size: ',uyb={3:1,8:1,5:1,11:1,6:1},vyb={68:1,136:1,3:1,23:1,17:1},wyb={108:1,35:1},xyb='com.google.common.collect',yyb={108:1,35:1,96:1},zyb={144:1,3:1},Ayb={35:1},Byb={57:1},Cyb='java.util',Dyb={22:1,19:1},Eyb={22:1,19:1,18:1},Fyb={22:1,19:1,20:1},Gyb={22:1,19:1,20:1,63:1},Hyb={35:1,96:1},Iyb={22:1,19:1,18:1,137:1},Jyb={21:1},Kyb='AbstractMapEntry',Lyb={207:1,22:1,19:1},Myb={159:1,3:1,23:1,17:1},Nyb=1073741824,Oyb={22:1},Pyb={3:1,22:1,19:1},Qyb={87:1,3:1,22:1,19:1,20:1,63:1},Ryb={3:1,57:1},Syb={3:1,22:1,19:1,18:1},Tyb={64:1},Uyb='arraySize',Vyb='initialArraySize',Wyb={64:1,188:1,3:1,23:1,17:1},Xyb='occurrences',Yyb={52:1,3:1,5:1},Zyb={205:1,3:1,23:1,17:1},$yb=1.0E-4,_yb='com.google.gwt.json.client',azb=4194303,bzb=1048575,czb=4194304,dzb=17592186044416,ezb=-17592186044416,fzb='([{"\' \t\r\n',gzb=')]}"\' \t\r\n',hzb='The given string contains parts that cannot be parsed as numbers.',izb='de.cau.cs.kieler.core.math',jzb=-1.7976931348623157E308,kzb='de.cau.cs.kieler.core.properties',lzb={79:1,23:1},mzb='de.cau.cs.kieler.core.util',nzb='de.cau.cs.kieler.kiml',ozb='LEFT',pzb='RIGHT',qzb='CENTER',rzb='de.cau.cs.kieler.kiml.options',szb='UNDEFINED',tzb='NONE',uzb='de.cau.cs.kieler.debugMode',vzb='de.cau.cs.kieler.randomSeed',wzb='de.cau.cs.kieler.kiml.util.nodespacing',xzb='de.cau.cs.kieler.kiml.util.labelspacing',yzb='portRatioOrPosition',zzb='NodeMarginCalculator',Azb='bottom',Bzb={286:1,121:1,3:1,5:1},Czb='undefined',Dzb='text',Ezb='stacktrace',Fzb={34:1,3:1,8:1,5:1,6:1},Gzb='properties',Hzb='bendPoints',Izb='junctionPoints',Jzb='width',Kzb='height',Lzb='padding',Mzb='children',Nzb={38:1,39:1,42:1,51:1,71:1,3:1,8:1,5:1,6:1},Ozb='de.cau.cs.kieler.klay.gwt.client.layout',Pzb="Invalid boolean format for property '",Qzb="' (",Rzb="Invalid enum format for property '",Szb='de.cau.cs.kieler.klay.layered',Tzb='Layered layout',Uzb=Infinity,Vzb=-Infinity,Wzb='de.cau.cs.kieler.klay.layered.compaction.components',Xzb='de.cau.cs.kieler.klay.layered.compaction.oned',Yzb=' instance has been finished already.',Zzb='de.cau.cs.kieler.klay.layered.compaction.oned.algs',$zb='de.cau.cs.kieler.klay.layered.compaction.recthull',_zb={68:1},aAb='de.cau.cs.kieler.klay.layered.components',bAb={3:1,5:1,22:1,13:1,19:1,20:1,63:1},cAb=1.600000023841858,dAb=0.001,eAb={31:1},fAb='de.cau.cs.kieler.klay.layered.compound',gAb={38:1,39:1,47:1,42:1,3:1,8:1,5:1,6:1},hAb='de.cau.cs.kieler.klay.layered.graph',iAb='Port side is undefined',jAb='de.cau.cs.kieler.klay.layered.intermediate',kAb='Big nodes pre-processing',lAb=3.4028234663852886E38,mAb={38:1,39:1,42:1,346:1,71:1,3:1,8:1,5:1,6:1},nAb="Node '",oAb="' has its layer constraint set to FIRST or FIRST_SEPARATE, but has ",pAb='at least one incoming edge. Connections between nodes with these ',qAb='layer constraints are not supported.',rAb=1.7976931348623157E308,sAb='Odd port side processing',tAb={250:1,3:1,5:1},uAb=1.0E-8,vAb='de.cau.cs.kieler.klay.layered.intermediate.compaction',wAb='de.cau.cs.kieler.klay.layered.intermediate.greedyswitch',xAb={227:1,3:1,5:1},yAb='de.cau.cs.kieler.klay.layered.networksimplex',zAb='INTERACTIVE',AAb='de.cau.cs.kieler.klay.layered.p1cycles',BAb={106:1,31:1},CAb='de.cau.cs.kieler.klay.layered.p2layers',DAb='NETWORK_SIMPLEX',EAb='de.cau.cs.kieler.klay.layered.p3order',FAb=5.9604644775390625E-8,GAb='Port type is undefined',HAb=0.30000001192092896,IAb=0.699999988079071,JAb=0.8999999761581421,KAb='de.cau.cs.kieler.klay.layered.p3order.constraints',LAb='de.cau.cs.kieler.klay.layered.p3order.counting',MAb='de.cau.cs.kieler.klay.layered.p4nodes',NAb={625:1,3:1,5:1,6:1},OAb='de.cau.cs.kieler.klay.layered.p4nodes.bk',PAb='de.cau.cs.kieler.klay.layered.p5edges',QAb='de.cau.cs.kieler.klay.layered.p5edges.splines',RAb=1.0E-6,SAb=-1.0E-6,TAb='The list of vectors may not be empty.',UAb=0.09999999999999998,VAb='de.cau.cs.kieler.klay.layered.properties',WAb='_gwt_modCount',XAb={3:1,22:1,19:1,20:1,63:1},YAb={3:1,5:1,57:1},ZAb={3:1,5:1,22:1,19:1,50:1,18:1},$Ab='delete',_Ab=15525485,aBb=16777216,bBb=16777215,cBb={3:1,5:1,22:1,19:1,20:1,63:1},dBb={3:1,23:1,17:1,138:1};var _,fI,aI,LH=-1;gI();hI(1,null,{},pb);_.t=function qb(a){return this===a};_.u=function sb(){return this.$c};_.v=function ub(){return txb(this)};_.w=function wb(){return ob(this)};_.toString=function(){return this.w()};hI(46,1,Uxb);_.bc=function ct(){return this.f};_.w=function dt(){var a,b;return a=Ikb(this.$c),b=this.bc(),b!=null?a+': '+b:a};hI(54,46,Vxb);hI(72,54,Vxb,gt);hI(164,72,{164:1,3:1,54:1,46:1},kt);_.bc=function nt(){jt(this);return this.c};_.cc=function ot(){return gw(this.b)===gw(ht)?null:this.b};var ht;var Mt;hI(642,1,{});hI(356,642,{},Tt);_.dc=function Ut(a,b){var c={},k;var d=[];a.__gwt$backingJsError={'fnStack':d};var e=arguments.callee.caller;while(e){var f=(Nt(),e.name||(e.name=Rt(e.toString())));d.push(f);var g=':'+f;var h=c[g];if(h){var i,j;for(i=0,j=h.length;i<j;i++){if(h[i]===e){return}}}(h||(c[g]=[])).push(e);e=e.caller}};_.ec=function Vt(a){var b,c,d,e,f;d=(Nt(),f=a.__gwt$backingJsError,f&&f.fnStack?f.fnStack:[]);c=d.length;e=xv(WF,Txb,146,c,0,1);for(b=0;b<c;b++){e[b]=new Zlb(d[b],null,-1)}return e};hI(643,642,{});_.dc=function Yt(c,d){function e(b){if(!('stack' in b)){try{throw b}catch(a){}}return b}
var f;typeof d=='string'?(f=e(new Error(d.replace('\n',' ')))):d&&typeof d==Sxb&&'stack' in d?(f=d):(f=e(new Error));c.__gwt$backingJsError=f};_.fc=function Zt(a,b,c,d){return new Zlb(b,a+'@'+d,c<0?-1:c)};_.ec=function $t(a){var b,c,d,e,f,g,h;e=(Nt(),h=a.__gwt$backingJsError,h&&h.stack?h.stack.split('\n'):[]);f=xv(WF,Txb,146,0,0,1);b=0;d=e.length;if(d==0){return f}g=Xt(this,e[0]);emb(g.d,Xxb)||(f[b++]=g);for(c=1;c<d;c++){f[b++]=Xt(this,e[c])}return f};hI(357,643,{},_t);_.fc=function au(a,b,c,d){return new Zlb(b,a,-1)};var Sv,Tv,Uv;hI(181,54,_xb);hI(351,181,_xb,ikb);hI(288,1,{},Kkb);_.Oc=function Lkb(a){var b;b=new Kkb;b.g=4;a>1?(b.c=Skb(this,a-1)):(b.c=this);return b};_.Pc=function Rkb(){Gkb(this);return this.b};_.Qc=function Tkb(){return Ikb(this)};_.Rc=function Vkb(){return Jkb(this)};_.Sc=function Xkb(){return (this.g&4)!=0};_.Tc=function Ykb(){return (this.g&1)!=0};_.w=function _kb(){return ((this.g&2)!=0?'interface ':(this.g&1)!=0?'':'class ')+(Gkb(this),this.n)};_.g=0;var Fkb=1;hI(119,72,{3:1,119:1,54:1,46:1},alb);hI(29,72,cyb,rlb,slb);hI(95,72,Vxb,nkb,okb);hI(231,1,{3:1,231:1});var blb;hI(24,231,{3:1,23:1,24:1,231:1},wlb);_.F=function ylb(a){return vlb(this,Wv(a,24))};_.t=function zlb(a){return aw(a,24)&&Wv(a,24).a==this.a};_.v=function Alb(){return this.a};_.w=function Clb(){return Dlb(this.a)};_.a=0;Uv={3:1,345:1,23:1,2:1};hI(350,1,fyb,smb);_.$b=function tmb(a,b){return rmb($v(a),$v(b))};hI(257,95,Vxb,Cmb);hI(145,1,{23:1,145:1});_.F=function Kmb(a){return Jmb(this,Wv(a,145))};_.t=function Lmb(a){var b;if(a===this){return true}if(!aw(a,145)){return false}b=Wv(a,145);return emb(this.a,b.a)};_.v=function Mmb(){return Pxb(this.a)};_.w=function Nmb(){return this.a};hI(358,29,cyb,Omb);hI(256,29,{3:1,54:1,29:1,46:1,256:1},Pmb);hI(185,145,gyb);var jxb,kxb,lxb;hI(289,185,gyb,oxb);_.Zc=function pxb(a,b,c){var d,e;d=xv(jw,hyb,26,c,12,1);for(e=0;e<c;++e){d[e]=a[b+e]&255&byb}return d};hI(355,185,gyb,qxb);_.Zc=function rxb(a,b,c){var d,e,f,g,h,i,j,k;f=0;for(j=0;j<c;){++f;e=a[b+j];if((e&192)==128){throw new slb(iyb)}else if((e&128)==0){++j}else if((e&224)==192){j+=2}else if((e&240)==224){j+=3}else if((e&248)==240){j+=4}else{throw new slb(iyb)}if(j>c){throw new okb(iyb)}}g=xv(jw,hyb,26,f,12,1);k=0;h=0;for(i=0;i<c;){e=a[b+i++];if((e&128)==0){h=1;e&=127}else if((e&224)==192){h=2;e&=31}else if((e&240)==224){h=3;e&=15}else if((e&248)==240){h=4;e&=7}else if((e&252)==248){h=5;e&=3}while(--h>0){d=a[b+i++];if((d&192)!=128){throw new slb('Invalid UTF8 sequence at '+(b+i-1)+', byte='+(d>>>0).toString(16))}e=e<<6|d&63}k+=Ekb(e,g,k)}return g};var UF=Nkb(kyb,'Object',1);var _F=Nkb(kyb,'Throwable',46);var KF=Nkb(kyb,'Exception',54);var VF=Nkb(kyb,'RuntimeException',72);var Zy=Nkb(lyb,'JavaScriptException',164);var ez=Nkb(myb,'StackTraceCreator/Collector',642);var bz=Nkb(myb,'StackTraceCreator/CollectorLegacy',356);var dz=Nkb(myb,'StackTraceCreator/CollectorModern',643);var cz=Nkb(myb,'StackTraceCreator/CollectorModernNoSourceMap',357);var wF=Nkb(nyb,'IOException',181);var zF=Nkb(nyb,'UnsupportedEncodingException',351);var GF=Nkb(kyb,'Class',288);var FF=Nkb(kyb,'ClassCastException',119);var MF=Nkb(kyb,'IllegalArgumentException',29);var OF=Nkb(kyb,'IndexOutOfBoundsException',95);var TF=Nkb(kyb,'Number',231);var PF=Nkb(kyb,'Integer',24);var $F=Nkb(kyb,'String',2);var XF=Nkb(kyb,'String/1',350);var ZF=Nkb(kyb,'StringIndexOutOfBoundsException',257);var bG=Nkb(oyb,'Charset',145);var cG=Nkb(oyb,'IllegalCharsetNameException',358);var dG=Nkb(oyb,'UnsupportedCharsetException',256);var JH=Nkb(pyb,'EmulatedCharset',185);var HH=Nkb(pyb,'EmulatedCharset/LatinCharset',289);var IH=Nkb(pyb,'EmulatedCharset/UtfCharset',355);hI(669,1,{3:1});var sw=Nkb(qyb,'Optional',669);hI(601,669,{3:1},Ab);_.t=function Bb(a){return a===this};_.v=function Cb(){return 2040732332};_.w=function Db(){return 'Optional.absent()'};_.A=function Eb(a){_b(a);return zb(),yb};var yb;var nw=Nkb(qyb,'Absent',601);var ow=Pkb(qyb,'Function');hI(208,1,{},Kb);_.C=function Lb(a){return Ib(a)};var rw=Nkb(qyb,'Joiner',208);hI(363,208,{},Nb);_.C=function Ob(a){return Mb(this,a)};var pw=Nkb(qyb,'Joiner/1',363);hI(362,1,{},Rb);var qw=Nkb(qyb,'Joiner/MapJoiner',362);var tw=Pkb(qyb,'Predicate');var gc;hI(244,1,{68:1,244:1,3:1},ic);_.D=function jc(a){var b;for(b=0;b<this.a.a.length;b++){if(!Wv(mpb(this.a,b),68).D(a)){return false}}return true};_.t=function kc(a){var b;if(aw(a,244)){b=Wv(a,244);return cn(this.a,b.a)}return false};_.v=function lc(){return Bpb(this.a)+306654252};_.w=function mc(){return 'Predicates.and('+Hb((hc(),gc),new wnb(this.a))+')'};var uw=Nkb(qyb,'Predicates/AndPredicate',244);hI(246,1,{68:1,246:1,3:1},nc);_.D=function oc(b){try{return this.a.kb(b)}catch(a){a=OH(a);if(aw(a,76)){return false}else if(aw(a,119)){return false}else throw NH(a)}};_.t=function pc(a){var b;if(aw(a,246)){b=Wv(a,246);return this.a.t(b.a)}return false};_.v=function qc(){return this.a.v()};_.w=function rc(){return 'Predicates.in('+this.a+')'};var vw=Nkb(qyb,'Predicates/InPredicate',246);hI(245,1,{68:1,245:1,3:1},sc);_.D=function tc(a){return rb(this.a,a)};_.t=function uc(a){var b;if(aw(a,245)){b=Wv(a,245);return rb(this.a,b.a)}return false};_.v=function vc(){return vb(this.a)};_.w=function wc(){return 'Predicates.equalTo('+this.a+')'};var ww=Nkb(qyb,'Predicates/IsEqualToPredicate',245);hI(17,1,{3:1,23:1,17:1});_.F=function Bc(a){return xc(this,Wv(a,17))};_.t=function Dc(a){return this===a};_.v=function Ec(){return txb(this)};_.w=function Fc(){return zc(this)};_.e=0;var IF=Nkb(kyb,'Enum',17);hI(136,17,vyb);var Hc,Ic,Jc,Kc;var Bw=Okb(qyb,'Predicates/ObjectPredicate',136,IF,Nc);hI(591,136,vyb,Oc);_.D=function Pc(a){return true};_.w=function Qc(){return 'Predicates.alwaysTrue()'};var xw=Okb(qyb,'Predicates/ObjectPredicate/1',591,Bw,null);hI(592,136,vyb,Rc);_.D=function Sc(a){return false};_.w=function Tc(){return 'Predicates.alwaysFalse()'};var yw=Okb(qyb,'Predicates/ObjectPredicate/2',592,Bw,null);hI(593,136,vyb,Uc);_.D=function Vc(a){return a==null};_.w=function Wc(){return 'Predicates.isNull()'};var zw=Okb(qyb,'Predicates/ObjectPredicate/3',593,Bw,null);hI(594,136,vyb,Xc);_.D=function Yc(a){return a!=null};_.w=function Zc(){return 'Predicates.notNull()'};var Aw=Okb(qyb,'Predicates/ObjectPredicate/4',594,Bw,null);hI(177,669,{177:1,3:1},$c);_.t=function _c(a){var b;if(aw(a,177)){b=Wv(a,177);return rb(this.a,b.a)}return false};_.v=function ad(){return 1502476572+vb(this.a)};_.w=function bd(){return 'Optional.of('+this.a+')'};_.A=function cd(a){return new $c(ac(a.B(this.a),'the Function passed to Optional.transform() must not return null.'))};var Cw=Nkb(qyb,'Present',177);hI(108,1,wyb);_.I=function ed(){dd()};var Xy=Nkb(xyb,'UnmodifiableIterator',108);hI(651,108,yyb);_.J=function fd(a){throw new Hmb};_.O=function gd(a){throw new Hmb};var Yy=Nkb(xyb,'UnmodifiableListIterator',651);hI(378,651,yyb);_.G=function hd(){return this.b<this.c};_.K=function jd(){return this.b>0};_.H=function kd(){if(this.b>=this.c){throw new nvb}return Lk(this,this.b++)};_.L=function ld(){return this.b};_.M=function md(){if(this.b<=0){throw new nvb}return Lk(this,--this.b)};_.N=function nd(){return this.b-1};_.b=0;_.c=0;var Dw=Nkb(xyb,'AbstractIndexedListIterator',378);hI(428,108,wyb);_.G=function rd(){return od(this)};_.H=function sd(){return pd(this)};_.d=1;var Ew=Nkb(xyb,'AbstractIterator',428);hI(653,1,{144:1});_.P=function vd(){var a;return a=this.f,!a?(this.f=this.S()):a};_.T=function wd(){return new Bf(this.P())};_.t=function xd(a){return Mp(this,a)};_.v=function yd(){return this.P().v()};_.V=function zd(){return this.Y()==0};_.W=function Ad(){return ud(this)};_.w=function Bd(){return this.P().w()};var Xw=Nkb(xyb,'AbstractMultimap',653);hI(294,653,zyb);_.Q=function Nd(){Cd(this)};_.R=function Od(a){return Qmb(this.b,a)};_.S=function Pd(){return new Ie(this,this.b)};_.T=function Qd(){return new If(this,this.b)};_.$=function Rd(){return Id(this.Z())};_.U=function Sd(a){return Dd(this,a)};_.X=function Td(a){return Gd(this,a)};_.Y=function Ud(){return this.c};_.c=0;var Uw=Nkb(xyb,'AbstractMapBasedMultimap',294);hI(600,294,zyb);_.Z=function Xd(){return new HU(this.a)};_.$=function Yd(){return Gi(),Gi(),Fi};_.U=function $d(a){return Wv(Dd(this,a),20)};_.X=function _d(a){return Wv(Gd(this,a),20)};_.P=function Wd(){var a;return a=this.f,!a?(this.f=new Ie(this,this.b)):a};_.t=function Zd(a){return Mp(this,a)};var Fw=Nkb(xyb,'AbstractListMultimap',600);hI(388,1,Ayb);_.G=function ae(){return this.b.b||this.d.G()};_.H=function be(){var a;if(!this.d.G()){a=pnb(this.b);a.yb();this.a=Wv(a.zb(),19);this.d=this.a.mb()}return this.d.H()};_.I=function ce(){this.d.I();this.a.V()&&qnb(this.b);--this.c.c};var Kw=Nkb(xyb,'AbstractMapBasedMultimap/Itr',388);hI(389,388,Ayb,de);var Gw=Nkb(xyb,'AbstractMapBasedMultimap/1',389);hI(638,1,Byb);_.Q=function ke(){this.bb().Q()};_._=function le(a){return ee(this,a)};_.R=function me(a){return !!ge(this,a,false)};_.ab=function ne(a){var b,c,d;for(c=this.bb().mb();c.G();){b=Wv(c.H(),21);d=b.zb();if(gw(a)===gw(d)||a!=null&&rb(a,d)){return true}}return false};_.t=function oe(a){return fe(this,a)};_.cb=function pe(a){return re(ge(this,a,false))};_.v=function se(){return Apb(this.bb())};_.V=function te(){return this.Y()==0};_.W=function ue(){return new Snb(this)};_.db=function ve(a,b){throw new Imb('Put not supported on this map')};_.eb=function we(a){return re(ge(this,a,true))};_.Y=function xe(){return this.bb().Y()};_.w=function ye(){return ie(this)};_.fb=function ze(){return new aob(this)};var tG=Nkb(Cyb,'AbstractMap',638);hI(654,638,Byb);_.bb=function Ce(){return Ae(this)};_.W=function De(){var a;a=this.d;return !a?(this.d=new Bf(this)):a};_.fb=function Ee(){return Be(this)};var ny=Nkb(xyb,'Maps/ViewCachingAbstractMap',654);hI(262,654,Byb,Ie);_.cb=function Ne(a){return Fe(this,a)};_.eb=function Qe(a){return Ge(this,a)};_.Q=function Je(){this.a==this.b.b?Cd(this.b):Ml(new xf(this))};_.R=function Ke(a){return qp(this.a,a)};_.hb=function Le(){return new sf(this)};_.gb=function(){return this.hb()};_.t=function Me(a){return this===a||fe(this.a,a)};_.v=function Oe(){return Apb(new inb(this.a))};_.W=function Pe(){return ud(this.b)};_.Y=function Re(){return Zmb(this.a)};_.w=function Se(){return ie(this.a)};var Jw=Nkb(xyb,'AbstractMapBasedMultimap/AsMap',262);hI(640,1,Dyb);_.ib=function $e(a){return Te()};_.jb=function _e(a){return Ue(this,a)};_.Q=function af(){We(this)};_.kb=function bf(a){return Ve(this,a,false)};_.lb=function cf(a){return Xe(this,a)};_.V=function df(){return this.Y()==0};_.nb=function ef(a){return Ve(this,a,true)};_.ob=function ff(){return this.pb(xv(UF,syb,1,this.Y(),4,1))};_.pb=function gf(a){return Ye(this,a)};_.w=function hf(){return Ze(this)};var eG=Nkb(Cyb,'AbstractCollection',640);hI(641,640,Eyb);_.t=function kf(a){return jf(this,a)};_.v=function lf(){return Apb(this)};var zG=Nkb(Cyb,'AbstractSet',641);hI(649,641,Eyb);var Jy=Nkb(xyb,'Sets/ImprovedAbstractSet',649);hI(655,649,Eyb);_.Q=function nf(){this.qb().Q()};_.kb=function of(a){return mf(this,a)};_.V=function pf(){return this.qb().V()};_.nb=function qf(a){var b;if(this.kb(a)){b=Wv(a,21);return this.qb().W().nb(b.yb())}return false};_.Y=function rf(){return this.qb().Y()};var ky=Nkb(xyb,'Maps/EntrySet',655);hI(387,655,Eyb,sf);_.kb=function tf(a){return Qh(new inb(this.a.a),a)};_.mb=function uf(){return new xf(this.a)};_.qb=function vf(){return this.a};_.nb=function wf(a){var b;if(!Qh(new inb(this.a.a),a)){return false}b=Wv(a,21);Hd(this.a.b,b.yb());return true};var Hw=Nkb(xyb,'AbstractMapBasedMultimap/AsMap/AsMapEntries',387);hI(299,1,Ayb,xf);_.H=function zf(){var a;return a=pnb(this.b),this.a=Wv(a.zb(),19),He(this.c,a)};_.G=function yf(){return this.b.b};_.I=function Af(){qnb(this.b);this.c.b.c-=this.a.Y();this.a.Q()};var Iw=Nkb(xyb,'AbstractMapBasedMultimap/AsMap/AsMapIterator',299);hI(260,649,Eyb,Bf);_.Q=function Cf(){this.b.Q()};_.kb=function Df(a){return this.b.R(a)};_.V=function Ef(){return this.b.V()};_.mb=function Ff(){return mp(),Wl(this.b.bb().mb(),(xp(),vp))};_.nb=function Gf(a){if(this.b.R(a)){this.b.eb(a);return true}return false};_.Y=function Hf(){return this.b.Y()};var ly=Nkb(xyb,'Maps/KeySet',260);hI(386,260,Eyb,If);_.Q=function Jf(){var a;Ml((a=this.b.bb().mb(),new Pf(this,a)))};_.lb=function Kf(a){return this.b.W().lb(a)};_.t=function Lf(a){return this===a||this.b.W().t(a)};_.v=function Mf(){return this.b.W().v()};_.mb=function Nf(){var a;return a=this.b.bb().mb(),new Pf(this,a)};_.nb=function Of(a){var b,c;c=0;b=Wv(this.b.eb(a),19);if(b){c=b.Y();b.Q();this.a.c-=c}return c>0};var Mw=Nkb(xyb,'AbstractMapBasedMultimap/KeySet',386);hI(300,1,Ayb,Pf);_.G=function Qf(){return this.c.G()};_.H=function Rf(){this.a=Wv(this.c.H(),21);return this.a.yb()};_.I=function Sf(){var a;ec(!!this.a);a=Wv(this.a.zb(),19);this.c.I();this.b.a.c-=a.Y();a.Q()};var Lw=Nkb(xyb,'AbstractMapBasedMultimap/KeySet/1',300);hI(216,640,Dyb,_f);_.ib=function ag(a){return Tf(this,a)};_.jb=function bg(a){return Uf(this,a)};_.Q=function cg(){Wf(this)};_.kb=function dg(a){return Yf(this),this.d.kb(a)};_.lb=function eg(a){return Yf(this),this.d.lb(a)};_.t=function fg(a){return Xf(this,a)};_.v=function gg(){return Yf(this),this.d.v()};_.mb=function hg(){return Yf(this),new xg(this)};_.nb=function ig(a){return Zf(this,a)};_.Y=function jg(){return Yf(this),this.d.Y()};_.w=function kg(){Yf(this);return xb(this.d)};var Pw=Nkb(xyb,'AbstractMapBasedMultimap/WrappedCollection',216);var sH=Pkb(Cyb,'List');hI(297,216,Fyb,mg);_.rb=function ng(a,b){var c;Yf(this);c=this.d.V();Wv(this.d,20).rb(a,b);++this.a.c;c&&Vf(this)};_.sb=function og(a){Yf(this);return Wv(this.d,20).sb(a)};_.tb=function pg(){Yf(this);return new Cg(this)};_.ub=function qg(a){Yf(this);return new Dg(this,a)};_.vb=function rg(a){var b;Yf(this);b=Wv(this.d,20).vb(a);--this.a.c;$f(this);return b};_.wb=function sg(a,b){Yf(this);return Wv(this.d,20).wb(a,b)};_.xb=function tg(a,b){Yf(this);return Ld(this.a,this.e,Wv(this.d,20).xb(a,b),!this.b?this:this.b)};var Rw=Nkb(xyb,'AbstractMapBasedMultimap/WrappedList',297);hI(385,297,Gyb,ug);var Nw=Nkb(xyb,'AbstractMapBasedMultimap/RandomAccessWrappedList',385);hI(189,1,Ayb,xg);_.G=function zg(){return wg(this),this.b.G()};_.H=function Ag(){return wg(this),this.b.H()};_.I=function Bg(){this.b.I();--this.d.f.c;$f(this.d)};var Ow=Nkb(xyb,'AbstractMapBasedMultimap/WrappedCollection/WrappedIterator',189);hI(298,189,Hyb,Cg,Dg);_.J=function Eg(a){var b;b=lg(this.a)==0;(wg(this),Wv(this.b,96)).J(a);++this.a.a.c;b&&Vf(this.a)};_.K=function Fg(){return (wg(this),Wv(this.b,96)).K()};_.L=function Gg(){return (wg(this),Wv(this.b,96)).L()};_.M=function Hg(){return (wg(this),Wv(this.b,96)).M()};_.N=function Ig(){return (wg(this),Wv(this.b,96)).N()};_.O=function Jg(a){(wg(this),Wv(this.b,96)).O(a)};var Qw=Nkb(xyb,'AbstractMapBasedMultimap/WrappedList/WrappedListIterator',298);hI(295,216,Eyb,Kg);var Sw=Nkb(xyb,'AbstractMapBasedMultimap/WrappedSet',295);hI(296,216,Iyb,Lg);var Tw=Nkb(xyb,'AbstractMapBasedMultimap/WrappedSortedSet',296);hI(668,1,Jyb);_.t=function Mg(a){var b;if(aw(a,21)){b=Wv(a,21);return Tb(this.yb(),b.yb())&&Tb(this.zb(),b.zb())}return false};_.v=function Ng(){var a,b;a=this.yb();b=this.zb();return (a==null?0:vb(a))^(b==null?0:vb(b))};_.Ab=function Og(a){throw new Hmb};_.w=function Pg(){return this.yb()+'='+this.zb()};var Vw=Nkb(xyb,Kyb,668);hI(390,640,Dyb,Qg);_.Q=function Rg(){Cd(this.a)};_.kb=function Sg(a){return td(this.a,a)};_.mb=function Tg(){return new de(this.a)};_.Y=function Ug(){return this.a.c};var Ww=Nkb(xyb,'AbstractMultimap/Values',390);hI(656,640,Lyb);_.ib=function Wg(a){return this.Bb(a,1),true};_.Bb=function Xg(a,b){throw new Hmb};_.jb=function Yg(a){return Eq(this,a)};_.Q=function Zg(){Ml(this.Eb())};_.kb=function $g(a){return this.Cb(a)>0};_.Cb=function _g(a){var b,c;for(c=Vg(this).mb();c.G();){b=Wv(c.H(),83);if(Tb(b.Zb(),a)){return b.Yb()}}return 0};_.gb=function ah(){return new qh(this)};_.bb=function bh(){return Vg(this)};_.t=function dh(a){return Fq(this,a)};_.v=function eh(){return Vg(this).v()};_.V=function fh(){return Vg(this).V()};_.mb=function gh(){return Dq(),new Oq(this,Vg(this).mb())};_.nb=function hh(a){return this.Fb(a,1)>0};_.Fb=function ih(a,b){throw new Hmb};_.Gb=function jh(a,b){var c,d;return Dq(),Mh(b,'count'),c=this.Cb(a),d=b-c,d>0?this.Bb(a,d):d<0&&this.Fb(a,-d),c};_.Hb=function kh(a,b,c){return Gq(this,a,b,c)};_.Y=function lh(){return Hq(this)};_.w=function mh(){return xb(Vg(this))};var Zw=Nkb(xyb,'AbstractMultiset',656);hI(657,649,Eyb);_.Q=function nh(){this.Ib().Q()};_.kb=function oh(a){var b,c;if(aw(a,83)){c=Wv(a,83);if(c.Yb()<=0){return false}b=this.Ib().Cb(c.Zb());return b==c.Yb()}return false};_.nb=function ph(a){var b,c,d,e;if(aw(a,83)){c=Wv(a,83);b=c.Zb();d=c.Yb();if(d!=0){e=this.Ib();return e.Hb(b,d,0)}}return false};var xy=Nkb(xyb,'Multisets/EntrySet',657);hI(396,657,Eyb,qh);_.mb=function rh(){return this.a.Eb()};_.Ib=function sh(){return this.a};_.Y=function th(){return this.a.Db()};var Yw=Nkb(xyb,'AbstractMultiset/EntrySet',396);hI(384,294,zyb);_.Z=function wh(){return new wtb(op(this.a))};_.$=function xh(){return hi(),kr(),jr};_.U=function zh(a){return Wv(Dd(this,a),18)};_.X=function Ah(a){return Wv(Gd(this,a),18)};_.P=function vh(){var a;return a=this.f,!a?(this.f=new Ie(this,this.b)):a};_.t=function yh(a){return Mp(this,a)};var $w=Nkb(xyb,'AbstractSetMultimap',384);hI(342,656,Lyb);var _w=Nkb(xyb,'AbstractSortedMultiset',342);hI(280,600,zyb,Dh);_.a=0;var ax=Nkb(xyb,'ArrayListMultimap',280);hI(159,17,Myb);var Eh,Fh;var dx=Okb(xyb,'BoundType',159,IF,Ih);hI(623,159,Myb,Jh);var bx=Okb(xyb,'BoundType/1',623,dx,null);hI(624,159,Myb,Kh);var cx=Okb(xyb,'BoundType/2',624,dx,null);var Nh;hI(234,1,Oyb);_.w=function Th(){return Vl(this.c.mb())};var fx=Nkb(xyb,'FluentIterable',234);hI(170,234,Oyb,Vh);_.mb=function Wh(){return Uh(this)};var ex=Nkb(xyb,'FluentIterable/2',170);hI(664,1,{});_.w=function Xh(){return xb(irb(this.a.d).b)};var mx=Nkb(xyb,'ForwardingObject',664);hI(665,664,Dyb);_.ib=function Yh(a){return irb(this.a.d),vqb()};_.jb=function Zh(a){return irb(this.a.d),wqb()};_.Q=function $h(){irb(this.a.d);xqb()};_.kb=function _h(a){return Irb(irb(this.a.d),a)};_.lb=function ai(a){return Jrb(irb(this.a.d),a)};_.V=function bi(){return irb(this.a.d).b.V()};_.mb=function ci(){var a;return a=irb(this.a.d).b.mb(),new Trb(a)};_.nb=function di(a){return irb(this.a.d),yqb()};_.Y=function ei(){return irb(this.a.d).b.Y()};_.ob=function fi(){return Krb(irb(this.a.d))};_.pb=function gi(a){return Lrb(irb(this.a.d),a)};var gx=Nkb(xyb,'ForwardingCollection',665);hI(660,640,Pyb);_.mb=function ti(){return this.Kb()};_.ib=function oi(a){return ii()};_.jb=function pi(a){return ji()};_.Q=function qi(){li()};_.kb=function ri(a){return a!=null&&Ve(this,a,false)};_.Jb=function si(){switch(this.Y()){case 0:return Gi(),Gi(),Fi;case 1:return Gi(),new Er(this.Kb().H());default:return new Zq(this,this.ob());}};_.nb=function ui(a){return mi()};var sx=Nkb(xyb,'ImmutableCollection',660);hI(316,660,Pyb,vi);_.mb=function Ai(){return Xl(this.a.mb())};_.kb=function wi(a){return a!=null&&this.a.kb(a)};_.lb=function xi(a){return this.a.lb(a)};_.V=function yi(){return this.a.V()};_.Kb=function zi(){return Xl(this.a.mb())};_.Y=function Bi(){return this.a.Y()};_.ob=function Ci(){return this.a.ob()};_.pb=function Di(a){return this.a.pb(a)};_.w=function Ei(){return xb(this.a)};var hx=Nkb(xyb,'ForwardingImmutableCollection',316);hI(87,660,Qyb);_.mb=function Pi(){return this.Kb()};_.tb=function Qi(){return this.Lb(0)};_.ub=function Si(a){return this.Lb(a)};_.xb=function Xi(a,b){return this.Mb(a,b)};_.rb=function Ji(a,b){throw new Hmb};_.t=function Mi(a){return yo(this,a)};_.v=function Ni(){return zo(this)};_.Kb=function Oi(){return this.Lb(0)};_.Lb=function Ri(a){return Hi(this,a)};_.vb=function Ui(a){throw new Hmb};_.wb=function Vi(a,b){throw new Hmb};_.Mb=function Wi(a,b){var c;return Yi((c=new Mo(this),new Mnb(c,a,b)))};var Fi;var wx=Nkb(xyb,'ImmutableList',87);hI(667,87,Qyb);_.mb=function gj(){return Xl(this.Nb().mb())};_.xb=function jj(a,b){return Yi(this.Nb().xb(a,b))};_.kb=function _i(a){return Zi(this,a)};_.lb=function aj(a){return this.Nb().lb(a)};_.t=function bj(a){return this.Nb().t(a)};_.sb=function cj(a){return $i(this,a)};_.v=function dj(){return this.Nb().v()};_.V=function ej(){return this.Nb().V()};_.Kb=function fj(){return Xl(this.Nb().mb())};_.Y=function hj(){return this.Nb().Y()};_.Mb=function ij(a,b){return Yi(this.Nb().xb(a,b))};_.ob=function kj(){return this.Nb().pb(xv(UF,syb,1,this.Nb().Y(),4,1))};_.pb=function lj(a){return this.Nb().pb(a)};_.w=function mj(){return xb(this.Nb())};var ix=Nkb(xyb,'ForwardingImmutableList',667);hI(524,1,Ryb);_.bb=function wj(){return nj(this)};_.W=function Aj(){return oj(this)};_.fb=function Gj(){return this.Rb()};_.Q=function qj(){throw new Hmb};_.R=function rj(a){return this.cb(a)!=null};_.ab=function sj(a){return this.Rb().kb(a)};_.Pb=function uj(){return new Uk(this)};_.Qb=function vj(){return new Zk(this)};_.t=function xj(a){return pp(this,a)};_.v=function yj(){return nj(this).v()};_.V=function zj(){return this.Y()==0};_.db=function Cj(a,b){return pj()};_.eb=function Dj(a){throw new Hmb};_.w=function Ej(){var a;return mp(),a=umb(Ph(this.Y()),123),Qb(lp,a,nj(this).mb()),a.a+='}',a.a};_.Rb=function Fj(){if(this.g){return this.g}return this.g=this.Qb()};_.e=null;_.f=null;_.g=null;var Cx=Nkb(xyb,'ImmutableMap',524);hI(320,524,Ryb);_.R=function Ij(a){return qp(this.d,a)};_.ab=function Jj(a){return hrb(this.d,a)};_.Ob=function Kj(){return ck(new Vj(this))};_.Pb=function Lj(){return ck(krb(this.d))};_.Qb=function Mj(){return hi(),new vi(lrb(this.d))};_.t=function Nj(a){return jrb(this.d,a)};_.cb=function Oj(a){return a==null?null:rp(this.d,a)};_.v=function Pj(){return this.d.c.v()};_.V=function Qj(){return this.d.c.V()};_.Y=function Rj(){return this.d.c.Y()};_.w=function Sj(){return xb(this.d.c)};var kx=Nkb(xyb,'ForwardingImmutableMap',320);hI(666,665,Eyb);_.t=function Tj(a){return a===this||Drb(irb(this.a.d),a)};_.v=function Uj(){return irb(this.a.d).b.v()};var nx=Nkb(xyb,'ForwardingSet',666);hI(523,666,Eyb,Vj);_.kb=function Wj(b){if(aw(b,21)&&Wv(b,21).yb()==null){return false}try{return Irb(irb(this.a.d),b)}catch(a){a=OH(a);if(aw(a,119)){return false}else throw NH(a)}};_.pb=function Xj(a){var b;b=Lrb(irb(this.a.d),a);irb(this.a.d).b.Y()<b.length&&Av(b,irb(this.a.d).b.Y(),null);return b};var jx=Nkb(xyb,'ForwardingImmutableMap/1',523);hI(663,660,Syb);_.mb=function ak(){return this.Kb()};_.t=function $j(a){return mr(this,a)};_.v=function _j(){return nr(this)};var Fx=Nkb(xyb,'ImmutableSet',663);hI(315,663,Syb);_.mb=function jk(){return Xl(new Nqb(this.a.b.mb()))};_.kb=function ek(a){return a!=null&&Brb(this.a,a)};_.lb=function fk(a){return Crb(this.a,a)};_.v=function gk(){return this.a.b.v()};_.V=function hk(){return this.a.b.V()};_.Kb=function ik(){return Xl(new Nqb(this.a.b.mb()))};_.Y=function kk(){return this.a.b.Y()};_.ob=function lk(){return this.a.b.ob()};_.pb=function mk(a){return Erb(this.a,a)};_.w=function nk(){return xb(this.a.b)};var lx=Nkb(xyb,'ForwardingImmutableSet',315);hI(178,1,{178:1,3:1},sk);_.t=function tk(a){var b;if(aw(a,178)){b=Wv(a,178);return this.a.t(b.a)&&this.b==b.b&&this.c==b.c&&this.d==b.d&&this.f==b.f&&Tb(this.e,b.e)&&Tb(this.g,b.g)}return false};_.v=function uk(){return fpb(Bv(tv(UF,1),syb,1,4,[this.a,this.e,this.d,this.g,this.f]))};_.w=function vk(){return umb(xmb(umb(xmb(umb(ymb(xmb(new zmb,this.a),':'),this.d==(Gh(),Eh)?91:40),this.b?this.e:'-\u221E'),44),this.c?this.g:'\u221E'),this.f==Eh?93:41).a};_.b=false;_.c=false;var ox=Nkb(xyb,'GeneralRange',178);hI(215,384,zyb,xk);_.a=2;var px=Nkb(xyb,'HashMultimap',215);hI(661,87,Qyb);_.kb=function yk(a){return this.Sb().kb(a)};_.V=function zk(){return this.Sb().V()};_.Y=function Ak(){return this.Sb().Y()};var qx=Nkb(xyb,'ImmutableAsList',661);hI(275,320,Ryb);_.Rb=function Ck(){return this.Ub()};_.fb=function Ek(){return this.Ub()};_.Ub=function Dk(){return oj(this.Tb())};var rx=Nkb(xyb,'ImmutableBiMap',275);hI(341,668,{3:1,21:1},Fk);_.yb=function Gk(){return this.a};_.zb=function Hk(){return this.b};_.Ab=function Ik(a){throw new Hmb};var tx=Nkb(xyb,'ImmutableEntry',341);hI(436,315,Syb,Jk);var ux=Nkb(xyb,'ImmutableEnumSet',436);hI(379,378,yyb,Mk);var vx=Nkb(xyb,'ImmutableList/1',379);hI(266,108,wyb,Nk);_.G=function Ok(){return this.a.G()};_.H=function Pk(){return Wv(this.a.H(),21).yb()};var xx=Nkb(xyb,'ImmutableMap/1',266);hI(670,663,Syb);_.mb=function Sk(){var a;return a=nj(this.a).Kb(),new Nk(a)};_.Jb=function Qk(){return new jl(this)};_.Kb=function Rk(){var a;return (a=this.c,!a?(this.c=new jl(this)):a).Kb()};var Ex=Nkb(xyb,'ImmutableSet/Indexed',670);hI(606,670,Syb,Uk);_.mb=function Xk(){var a;return a=nj(this.a).Kb(),new Nk(a)};_.kb=function Vk(a){return this.a.R(a)};_.Kb=function Wk(){var a;return a=nj(this.a).Kb(),new Nk(a)};_.Y=function Yk(){return this.a.Y()};var yx=Nkb(xyb,'ImmutableMapKeySet',606);hI(604,660,Pyb,Zk);_.mb=function bl(){return new dl(this)};_.kb=function $k(a){return a!=null&&(Il(),Il(),Tl(new dl(this),(hc(),a==null?(Lc(),Jc):new sc(a)))!=-1)};_.Jb=function _k(){var a;a=ki(nj(this.a));return new gl(this,a)};_.Kb=function al(){return new dl(this)};_.Y=function cl(){return this.a.Y()};var Bx=Nkb(xyb,'ImmutableMapValues',604);hI(282,108,wyb,dl);_.G=function el(){return this.a.G()};_.H=function fl(){return Wv(this.a.H(),21).zb()};var zx=Nkb(xyb,'ImmutableMapValues/1',282);hI(605,661,Qyb,gl);_.Sb=function hl(){return this.a};_.sb=function il(a){return Wv(this.b.sb(a),21).zb()};var Ax=Nkb(xyb,'ImmutableMapValues/2',605);hI(311,661,Qyb,jl);_.Sb=function kl(){return this.a};_.sb=function ll(a){return Tk(this.a,a)};var Dx=Nkb(xyb,'ImmutableSet/Indexed/1',311);hI(414,234,Oyb,vl);_.mb=function wl(){return Nl(this.a)};_.w=function xl(){return Ze(this.a)+' (cycled)'};var Hx=Nkb(xyb,'Iterables/1',414);hI(105,1,Tyb,yl);_.B=function zl(a){return Wv(a,22).mb()};var Gx=Nkb(xyb,'Iterables/12',105);hI(415,234,Oyb,Bl);_.mb=function Cl(){return Al(this)};var Ix=Nkb(xyb,'Iterables/4',415);hI(416,234,Oyb,El);_.mb=function Fl(){return Dl(this)};var Jx=Nkb(xyb,'Iterables/5',416);var Gl,Hl;hI(424,651,yyb,Yl);_.G=function Zl(){return false};_.K=function $l(){return false};_.H=function _l(){throw new nvb};_.L=function am(){return 0};_.M=function bm(){throw new nvb};_.N=function cm(){return -1};var Lx=Nkb(xyb,'Iterators/1',424);hI(264,108,wyb,dm);_.G=function em(){return !this.a};_.H=function fm(){if(this.a){throw new nvb}this.a=true;return this.b};_.a=false;var Kx=Nkb(xyb,'Iterators/11',264);hI(425,1,Ayb,gm);_.G=function hm(){return false};_.H=function im(){throw new nvb};_.I=function jm(){ec(false)};var Mx=Nkb(xyb,'Iterators/2',425);hI(426,108,wyb,km);_.G=function lm(){return this.a.G()};_.H=function mm(){return this.a.H()};var Nx=Nkb(xyb,'Iterators/3',426);hI(427,1,Ayb,om);_.G=function pm(){return this.a.G()||this.b.mb().G()};_.H=function qm(){return nm(this)};_.I=function rm(){this.a.I()};var Ox=Nkb(xyb,'Iterators/4',427);hI(429,428,wyb,tm);var Px=Nkb(xyb,'Iterators/6',429);hI(261,1,Ayb);_.G=function wm(){return this.b.G()};_.H=function xm(){return um(this)};_.I=function ym(){this.b.I()};var Oy=Nkb(xyb,'TransformedIterator',261);hI(430,261,Ayb,Am);_.Vb=function Bm(a){return zm(this,a)};var Qx=Nkb(xyb,'Iterators/7',430);hI(313,1,Ayb);_.G=function Fm(){return Cm(this)};_.H=function Gm(){return Dm(this)};_.I=function Hm(){ec(!!this.c);this.c.I();this.c=null};var Ay=Nkb(xyb,'MultitransformedIterator',313);hI(90,313,{90:1,35:1},Im);_.Wb=function Jm(a){return Wv(a,35)};var Sx=Nkb(xyb,'Iterators/ConcatenatedIterator',90);hI(314,313,Ayb,Lm);_.Wb=function Mm(a){return Km(Wv(a,35))};var Rx=Nkb(xyb,'Iterators/ConcatenatedIterator/1',314);hI(329,653,zyb,Um);_.U=function $m(a){return new Bn(this,a)};_.X=function an(a){return Sm(this,a)};_.Q=function Wm(){Pm(this)};_.R=function Xm(a){return Qm(this,a)};_.S=function Ym(){return new Pp(this)};_.T=function Zm(){return new Hn(this)};_.V=function _m(){return !this.a};_.Y=function bn(){return this.d};_.c=0;_.d=0;var _x=Nkb(xyb,'LinkedListMultimap',329);hI(647,640,Fyb);_.rb=function en(a,b){throw new Imb('Add not supported on this list')};_.ib=function fn(a){this.rb(this.Y(),a);return true};_.Q=function gn(){this.Xb(0,this.Y())};_.t=function hn(a){return cn(this,a)};_.v=function jn(){return Bpb(this)};_.mb=function kn(){return new wnb(this)};_.tb=function ln(){return this.ub(0)};_.ub=function mn(a){return new Fnb(this,a)};_.vb=function nn(a){throw new Imb('Remove not supported on this list')};_.Xb=function on(a,b){var c,d;d=this.ub(a);for(c=a;c<b;++c){d.H();d.I()}};_.wb=function pn(a,b){throw new Imb('Set not supported on this list')};_.xb=function qn(a,b){return new Mnb(this,a,b)};_.d=0;var lG=Nkb(Cyb,'AbstractList',647);hI(648,647,Fyb);_.rb=function vn(a,b){rn(this,a,b)};_.sb=function wn(a){return tn(this,a)};_.mb=function xn(){return this.ub(0)};_.vb=function yn(a){return un(this,a)};_.wb=function zn(b,c){var d,e;d=this.ub(b);try{e=d.H();d.O(c);return e}catch(a){a=OH(a);if(aw(a,74)){throw new okb("Can't set element "+b)}else throw NH(a)}};var yG=Nkb(Cyb,'AbstractSequentialList',648);hI(276,648,Fyb,Bn);_.ub=function Cn(a){return An(this,a)};_.Y=function Dn(){var a;a=Wv(Smb(this.a.b,this.b),126);return !a?0:a.a};var Vx=Nkb(xyb,'LinkedListMultimap/1',276);hI(330,648,Fyb,En);_.ub=function Fn(a){return new _n(this.a,a)};_.Y=function Gn(){return this.a.d};var Tx=Nkb(xyb,'LinkedListMultimap/1EntriesImpl',330);hI(563,649,Eyb,Hn);_.kb=function In(a){return Qm(this.a,a)};_.mb=function Jn(){return new Nn(this.a)};_.nb=function Kn(a){return !Sm(this.a,a).a.V()};_.Y=function Ln(){return Zmb(this.a.b)};var Ux=Nkb(xyb,'LinkedListMultimap/1KeySetImpl',563);hI(562,1,Ayb,Nn);_.G=function On(){Mn(this);return !!this.c};_.H=function Pn(){Mn(this);Vm(this.c);this.a=this.c;stb(this.d,this.a.a);do{this.c=this.c.b}while(!!this.c&&!stb(this.d,this.c.a));return this.a.a};_.I=function Qn(){Mn(this);ec(!!this.a);Ml(new mo(this.e,this.a.a));this.a=null;this.b=this.e.c};_.b=0;var Wx=Nkb(xyb,'LinkedListMultimap/DistinctKeyIterator',562);hI(126,1,{126:1},Rn);_.a=0;var Xx=Nkb(xyb,'LinkedListMultimap/KeyList',126);hI(560,668,Jyb,Sn);_.yb=function Tn(){return this.a};_.zb=function Un(){return this.f};_.Ab=function Vn(a){var b;b=this.f;this.f=a;return b};var Zx=Nkb(xyb,'LinkedListMultimap/Node',560);hI(561,1,Hyb,_n);_.J=function ao(a){Wv(a,21);Wn()};_.H=function eo(){return Yn(this)};_.M=function go(){return Zn(this)};_.O=function jo(a){Wv(a,21);$n()};_.G=function bo(){Xn(this);return !!this.c};_.K=function co(){Xn(this);return !!this.e};_.L=function fo(){return this.d};_.N=function ho(){return this.d-1};_.I=function io(){Xn(this);ec(!!this.a);if(this.a!=this.c){this.e=this.a.d;--this.d}else{this.c=this.a.b}Tm(this.f,this.a);this.a=null;this.b=this.f.c};_.b=0;_.d=0;var Yx=Nkb(xyb,'LinkedListMultimap/NodeIterator',561);hI(241,1,Hyb,mo,no);_.J=function oo(a){this.e=Nm(this.f,this.b,a,this.c);++this.d;this.a=null};_.G=function po(){return !!this.c};_.K=function qo(){return !!this.e};_.H=function ro(){return ko(this)};_.L=function so(){return this.d};_.M=function to(){return lo(this)};_.N=function uo(){return this.d-1};_.I=function vo(){ec(!!this.a);if(this.a!=this.c){this.e=this.a.e;--this.d}else{this.c=this.a.c}Tm(this.f,this.a);this.a=null};_.O=function wo(a){dc(!!this.a);this.a.f=a};_.d=0;var $x=Nkb(xyb,'LinkedListMultimap/ValueForKeyIterator',241);hI(419,647,Fyb);_.rb=function Go(a,b){this.a.rb(a,b)};_.kb=function Ho(a){return this.a.kb(a)};_.sb=function Io(a){return this.a.sb(a)};_.vb=function Jo(a){return this.a.vb(a)};_.wb=function Ko(a,b){return this.a.wb(a,b)};_.Y=function Lo(){return this.a.Y()};var by=Nkb(xyb,'Lists/AbstractListWrapper',419);hI(420,419,Gyb);var cy=Nkb(xyb,'Lists/RandomAccessListWrapper',420);hI(422,420,Gyb,Mo);_.ub=function No(a){return this.a.ub(a)};var ay=Nkb(xyb,'Lists/1',422);hI(88,647,{88:1,22:1,19:1,20:1},Ro);_.rb=function So(a,b){this.a.rb(Qo(this,a),b)};_.Q=function To(){this.a.Q()};_.sb=function Uo(a){return this.a.sb(Po(this,a))};_.mb=function Vo(){return Oo(this,0)};_.ub=function Wo(a){return Oo(this,a)};_.vb=function Xo(a){return this.a.vb(Po(this,a))};_.Xb=function Yo(a,b){(cc(a,b,this.a.Y()),Fo(this.a.xb(Qo(this,b),Qo(this,a)))).Q()};_.wb=function Zo(a,b){return this.a.wb(Po(this,a),b)};_.Y=function $o(){return this.a.Y()};_.xb=function _o(a,b){return cc(a,b,this.a.Y()),Fo(this.a.xb(Qo(this,b),Qo(this,a)))};var fy=Nkb(xyb,'Lists/ReverseList',88);hI(220,88,{88:1,22:1,19:1,20:1,63:1},ap);var dy=Nkb(xyb,'Lists/RandomAccessReverseList',220);hI(421,1,Hyb,bp);_.J=function cp(a){this.c.J(a);this.c.M();this.a=false};_.G=function dp(){return this.c.K()};_.K=function ep(){return this.c.G()};_.H=function fp(){if(!this.c.K()){throw new nvb}this.a=true;return this.c.M()};_.L=function gp(){return Qo(this.b,this.c.L())};_.M=function hp(){if(!this.c.G()){throw new nvb}this.a=true;return this.c.H()};_.N=function ip(){return Qo(this.b,this.c.L())-1};_.I=function jp(){ec(this.a);this.c.I();this.a=false};_.O=function kp(a){dc(this.a);this.c.O(a)};_.a=false;var ey=Nkb(xyb,'Lists/ReverseList/1',421);var lp;hI(376,261,Ayb,tp);_.Vb=function up(a){return mp(),new Fk(a,aq(this.a,a))};var gy=Nkb(xyb,'Maps/1',376);hI(188,17,Wyb);var vp,wp;var jy=Okb(xyb,'Maps/EntryFunction',188,IF,zp);hI(374,188,Wyb,Ap);_.B=function Bp(a){return Wv(a,21).yb()};var hy=Okb(xyb,'Maps/EntryFunction/1',374,jy,null);hI(375,188,Wyb,Cp);_.B=function Dp(a){return Wv(a,21).zb()};var iy=Okb(xyb,'Maps/EntryFunction/2',375,jy,null);hI(373,640,Dyb,Fp);_.Q=function Gp(){this.a.Q()};_.kb=function Hp(a){return this.a.ab(a)};_.V=function Ip(){return this.a.V()};_.mb=function Jp(){return Ep(this)};_.nb=function Kp(b){var c,d;try{return Ve(this,b,true)}catch(a){a=OH(a);if(aw(a,45)){for(d=this.a.bb().mb();d.G();){c=Wv(d.H(),21);if(Tb(b,c.zb())){this.a.eb(c.yb());return true}}return false}else throw NH(a)}};_.Y=function Lp(){return this.a.Y()};var my=Nkb(xyb,'Maps/Values',373);hI(301,654,Byb,Pp);_.cb=function Tp(a){return this.a.R(a)?this.a.U(a):null};_.eb=function Wp(a){return this.a.R(a)?this.a.X(a):null};_.Q=function Qp(){this.a.Q()};_.R=function Rp(a){return this.a.R(a)};_.hb=function Sp(){return new Yp(this)};_.gb=function(){return this.hb()};_.V=function Up(){return this.a.V()};_.W=function Vp(){return this.a.W()};_.Y=function Xp(){return this.a.W().Y()};var qy=Nkb(xyb,'Multimaps/AsMap',301);hI(393,655,Eyb,Yp);_.mb=function Zp(){return np(this.a.a.W(),new bq(this))};_.qb=function $p(){return this.a};_.nb=function _p(a){var b;if(!mf(this,a)){return false}b=Wv(a,21);Op(this.a,b.yb());return true};var py=Nkb(xyb,'Multimaps/AsMap/EntrySet',393);hI(395,1,Tyb,bq);_.B=function cq(a){return aq(this,a)};var oy=Nkb(xyb,'Multimaps/AsMap/EntrySet/1',395);hI(391,656,Lyb,eq);_.Q=function fq(){Pm(this.a)};_.kb=function gq(a){return Qm(this.a,a)};_.Cb=function hq(a){var b;return b=Wv(rp(Om(this.a),a),19),!b?0:b.Y()};_.gb=function iq(){return new wq(this)};_.Db=function jq(){return Om(this.a).Y()};_.Eb=function kq(){return new nq(Ae(Om(this.a)).mb())};_.mb=function lq(){return dq(this)};_.Fb=function mq(a,b){var c,d,e,f,g;Mh(b,Xyb);if(b==0){return g=Wv(rp(Om(this.a),a),19),!g?0:g.Y()}f=Wv(rp(Om(this.a),a),19);if(!f){return 0}e=f.Y();if(b>=e){f.Q()}else{d=f.mb();for(c=0;c<b;c++){d.H();d.I()}}return e};var uy=Nkb(xyb,'Multimaps/Keys',391);hI(302,261,Ayb,nq);_.Vb=function oq(a){return new tq(Wv(a,21))};var sy=Nkb(xyb,'Multimaps/Keys/1',302);hI(658,1,{83:1});_.t=function qq(a){var b;if(aw(a,83)){b=Wv(a,83);return this.Yb()==b.Yb()&&Tb(this.Zb(),b.Zb())}return false};_.v=function rq(){var a;a=this.Zb();return (a==null?0:vb(a))^this.Yb()};_.w=function sq(){return pq(this)};var wy=Nkb(xyb,'Multisets/AbstractEntry',658);hI(394,658,{83:1},tq);_.Yb=function uq(){return Wv(this.a.zb(),19).Y()};_.Zb=function vq(){return this.a.yb()};var ry=Nkb(xyb,'Multimaps/Keys/1/1',394);hI(392,657,Eyb,wq);_.kb=function xq(a){var b,c;if(aw(a,83)){c=Wv(a,83);b=Wv(Om(this.a.a).cb(c.Zb()),19);return !!b&&b.Y()==c.Yb()}return false};_.V=function yq(){return !this.a.a.a};_.mb=function zq(){return new nq(Ae(Om(this.a.a)).mb())};_.Ib=function Aq(){return this.a};_.nb=function Bq(a){var b,c;if(aw(a,83)){c=Wv(a,83);b=Wv(Om(this.a.a).cb(c.Zb()),19);if(!!b&&b.Y()==c.Yb()){b.Q();return true}}return false};_.Y=function Cq(){return Om(this.a.a).Y()};var ty=Nkb(xyb,'Multimaps/Keys/KeysEntrySet',392);hI(659,1,fyb);var Cy=Nkb(xyb,'Ordering',659);hI(398,659,fyb,Jq);_.$b=function Kq(a,b){return Iq(Wv(a,83),Wv(b,83))};var vy=Nkb(xyb,'Multisets/1',398);hI(397,658,{83:1,3:1},Lq);_.Yb=function Mq(){return this.a};_.Zb=function Nq(){return this.b};_.a=0;var yy=Nkb(xyb,'Multisets/ImmutableEntry',397);hI(303,1,Ayb,Oq);_.G=function Pq(){return this.d>0||this.c.G()};_.H=function Qq(){if(!(this.d>0||this.c.G())){throw new nvb}if(this.d==0){this.b=Wv(this.c.H(),83);this.f=this.d=this.b.Yb()}--this.d;this.a=true;return this.b.Zb()};_.I=function Rq(){ec(this.a);this.f==1?this.c.I():this.e.Fb(this.b.Zb(),1)>0;--this.f;this.a=false};_.a=false;_.d=0;_.f=0;var zy=Nkb(xyb,'Multisets/MultisetIteratorImpl',303);hI(622,659,{3:1,56:1},Vq);_.$b=function Wq(a,b){return Uq(Wv(a,23),Wv(b,23))};_.w=function Xq(){return 'Ordering.natural()'};var Sq;var By=Nkb(xyb,'NaturalOrdering',622);hI(343,661,Qyb,Zq);_.ub=function br(a){return Hi(this.b,a)};_.Sb=function $q(){return this.a};_.sb=function _q(a){return $i(this.b,a)};_.Lb=function ar(a){return Hi(this.b,a)};var Dy=Nkb(xyb,'RegularImmutableAsList',343);hI(559,275,Ryb,er);_.Tb=function fr(){return this.a};var cr;var Ey=Nkb(xyb,'RegularImmutableBiMap',559);hI(53,667,Qyb,gr);_.Nb=function hr(){return this.a};var Fy=Nkb(xyb,'RegularImmutableList',53);hI(321,320,Ryb,ir);var Gy=Nkb(xyb,'RegularImmutableMap',321);hI(265,315,Syb,lr);var jr;var Hy=Nkb(xyb,'RegularImmutableSet',265);hI(650,641,Eyb);var Ky=Nkb(xyb,'Sets/SetView',650);hI(377,650,Eyb,tr);_.kb=function ur(a){return ttb(this.b,a)&&ttb(this.c,a)};_.lb=function vr(a){return Xe(this.b,a)&&Xe(this.c,a)};_.V=function wr(){return sr(this)};_.mb=function xr(){var a;return Pl((a=(new Snb(this.b.a)).a.bb().mb(),new Ynb(a)),this.a)};_.Y=function yr(){var a;return Ul(Pl((a=(new Snb(this.b.a)).a.bb().mb(),new Ynb(a)),this.a))};var Iy=Nkb(xyb,'Sets/2',377);hI(328,275,Ryb,zr,Ar);_.fb=function Dr(){return hi(),new Gr(this.c)};_.Tb=function Br(){var a;a=this.a;return !a?(this.a=new Ar(this.c,this.b,this)):a};_.Ub=function Cr(){return hi(),new Gr(this.c)};var Ly=Nkb(xyb,'SingletonImmutableBiMap',328);hI(127,667,Qyb,Er);_.Nb=function Fr(){return this.a};var My=Nkb(xyb,'SingletonImmutableList',127);hI(135,663,Syb,Gr);_.mb=function Jr(){return Il(),new dm(this.a)};_.kb=function Hr(a){return rb(this.a,a)};_.Kb=function Ir(){return Il(),new dm(this.a)};_.Y=function Kr(){return 1};var Ny=Nkb(xyb,'SingletonImmutableSet',135);hI(285,342,{207:1,3:1,22:1,19:1},Ur,Vr);_.Bb=function Wr(a,b){return Lr(this,a,b)};_.Cb=function Xr(a){return Pr(this,a)};_.Db=function Yr(){return $s(Or(this,(qs(),os)))};_.Eb=function $r(){return new ks(this)};_.Fb=function _r(a,b){return Sr(this,a,b)};_.Gb=function as(a,b){return Tr(this,a,b)};_.Hb=function bs(a,b,c){var d,e,f;Mh(c,'newCount');Mh(b,'oldCount');Xb(ok(this.b,a));f=this.c.a;if(!f){if(b==0){c>0&&Lr(this,a,c);return true}else{return false}}e=xv(mw,Yyb,26,1,12,1);d=Ms(f,this.d,a,b,c,e);Us(this.c,f,d);return e[0]==b};_.Y=function cs(){return $s(Or(this,(qs(),ps)))};var Wy=Nkb(xyb,'TreeMultiset',285);hI(619,658,{83:1},fs);_.Yb=function gs(){var a;a=this.b.c;return a==0?Pr(this.a,this.b.b):a};_.Zb=function hs(){return this.b.b};var Py=Nkb(xyb,'TreeMultiset/1',619);hI(620,1,Ayb,ks);_.H=function ms(){return js(this)};_.G=function ls(){return is(this)};_.I=function ns(){ec(!!this.b);Tr(this.c,this.b.b.b,0);this.b=null};var Qy=Nkb(xyb,'TreeMultiset/2',620);hI(205,17,Zyb);var os,ps;var Ty=Okb(xyb,'TreeMultiset/Aggregate',205,IF,ss);hI(617,205,Zyb,ts);_._b=function us(a){return a.c};_.ac=function vs(a){return !a?0:a.j};var Ry=Okb(xyb,'TreeMultiset/Aggregate/1',617,Ty,null);hI(618,205,Zyb,ws);_._b=function xs(a){return 1};_.ac=function ys(a){return !a?0:a.a};var Sy=Okb(xyb,'TreeMultiset/Aggregate/2',618,Ty,null);hI(206,658,{83:1,206:1},Os);_.Yb=function Ps(){return this.c};_.Zb=function Qs(){return this.b};_.w=function Ss(){return Dq(),pq(new Lq(this.b,this.c))};_.a=0;_.c=0;_.d=0;_.j=0;var Uy=Nkb(xyb,'TreeMultiset/AvlNode',206);hI(616,1,{},Vs);var Vy=Nkb(xyb,'TreeMultiset/Reference',616);var $y=Nkb(lyb,'JavaScriptObject$',0);var qt;hI(628,1,{});var _y=Nkb(lyb,'Scheduler',628);var ut=0,vt=0,wt=-1;hI(360,628,{},Jt);var Ft;var az=Nkb(myb,'SchedulerImpl',360);hI(646,1,{});_.hc=function bu(){return null};_.ic=function cu(){return null};_.jc=function du(){return null};_.kc=function eu(){return null};_.lc=function fu(){return null};var nz=Nkb(_yb,'JSONValue',646);hI(214,646,{214:1},ju,ku);_.t=function lu(a){if(!aw(a,214)){return false}return this.a==Wv(a,214).a};_.gc=function mu(){return qu};_.v=function nu(){return txb(this.a)};_.hc=function ou(){return this};_.w=function pu(){var a,b,c;c=new Bmb('[');for(b=0,a=this.a.length;b<a;b++){b>0&&(c.a+=',',c);xmb(c,gu(this,b))}c.a+=']';return c.a};var fz=Nkb(_yb,'JSONArray',214);hI(292,646,{},uu);_.gc=function vu(){return yu};_.ic=function wu(){return this};_.w=function xu(){return Bkb(this.a)};_.a=false;var ru,su;var gz=Nkb(_yb,'JSONBoolean',292);hI(371,72,Vxb,zu);var hz=Nkb(_yb,'JSONException',371);hI(435,646,{},Cu);_.gc=function Du(){return Fu};_.w=function Eu(){return Wxb};var Au;var iz=Nkb(_yb,'JSONNull',435);hI(104,646,{104:1},Gu);_.t=function Hu(a){if(!aw(a,104)){return false}return this.a==Wv(a,104).a};_.gc=function Iu(){return Mu};_.v=function Ju(){return hw(Ixb(this.a))};_.jc=function Ku(){return this};_.w=function Lu(){return this.a+''};_.a=0;var jz=Nkb(_yb,'JSONNumber',104);hI(69,646,{69:1},Tu,Uu);_.t=function Vu(a){if(!aw(a,69)){return false}return this.a==Wv(a,69).a};_.gc=function Wu(){return $u};_.v=function Xu(){return txb(this.a)};_.kc=function Yu(){return this};_.w=function Zu(){var a,b,c,d,e,f;f=new Bmb('{');a=true;e=Nu(this,xv($F,Txb,2,0,5,1));for(c=0,d=e.length;c<d;++c){b=e[c];a?(a=false):(f.a+=', ',f);ymb(f,st(b));f.a+=':';xmb(f,Pu(this,b))}f.a+='}';return f.a};var lz=Nkb(_yb,'JSONObject',69);hI(361,641,Eyb,_u);_.kb=function av(a){return ew(a)&&Ou(this.a,$v(a))};_.mb=function bv(){return new wnb(new opb(this.b))};_.Y=function cv(){return this.b.length};var kz=Nkb(_yb,'JSONObject/1',361);var dv;hI(97,646,{97:1},lv);_.t=function mv(a){if(!aw(a,97)){return false}return emb(this.a,Wv(a,97).a)};_.gc=function nv(){return rv};_.v=function ov(){return Pxb(this.a)};_.lc=function pv(){return this};_.w=function qv(){return st(this.a)};var mz=Nkb(_yb,'JSONString',97);var Ov,Pv,Qv;hI(186,1,{},sI,tI);_.b=false;_.c=0;_.d=-1;_.e=0;_.f=false;_.j=0;var oz=Nkb('de.cau.cs.kieler.core.alg','BasicProgressMonitor',186);hI(10,1,{10:1,286:1,3:1,5:1},FI,GI,HI,II);_.t=function JI(a){return yI(this,a)};_.v=function KI(){return hw(Ixb(this.a))+Blb(hw(Ixb(this.b)))};_.w=function NI(){return '('+this.a+','+this.b+')'};_.a=0;_.b=0;var qz=Nkb(izb,'KVector',10);hI(58,648,{3:1,5:1,22:1,19:1,58:1,20:1},aJ);_.ib=function bJ(a){return QI(this,a)};_.Q=function cJ(){_I(this)};_.ub=function dJ(a){return WI(this,a)};_.Y=function eJ(){return this.b};_.b=0;var rH=Nkb(Cyb,'LinkedList',58);hI(44,58,{44:1,286:1,3:1,5:1,22:1,19:1,58:1,20:1},jJ,kJ);_.w=function mJ(){var a,b,c;a=new Bmb('(');b=WI(this,0);while(b.b!=b.d.c){c=Wv(_ub(b),10);ymb(a,c.a+','+c.b);b.b!=b.d.c&&(a.a+='; ',a)}return a.a+=')',a.a};var pz=Nkb(izb,'KVectorChain',44);var rz=Pkb(kzb,'IProperty');hI(131,1,{179:1,131:1,3:1},tJ);var sz=Nkb(kzb,'MapPropertyHolder',131);hI(14,1,lzb,AJ,BJ,CJ,DJ,EJ,FJ);_.F=function GJ(a){return xJ(this,Wv(a,79))};_.t=function HJ(a){return yJ(this,a)};_.mc=function IJ(){return this.b};_.nc=function JJ(){return this.c};_.oc=function KJ(){return this.d};_.v=function LJ(){return Pxb(this.b)};_.w=function MJ(){return this.b};var uJ,vJ;var vz=Nkb(kzb,'Property',14);hI(366,1,{23:1},NJ);_.F=function OJ(a){return -1};var tz=Nkb(kzb,'Property/1',366);hI(367,1,{23:1},PJ);_.F=function QJ(a){return 1};var uz=Nkb(kzb,'Property/2',367);hI(27,1,{27:1,22:1},RJ);_.t=function SJ(a){var b,c,d;if(aw(a,27)){c=Wv(a,27);b=this.a==null?c.a==null:rb(this.a,c.a);d=this.b==null?c.b==null:rb(this.b,c.b);return b&&d}else{return false}};_.v=function TJ(){var a,b,c,d,e,f;c=this.a==null?0:vb(this.a);a=c&byb;b=c&-65536;f=this.b==null?0:vb(this.b);d=f&byb;e=f&-65536;return a^e>>16&byb|b^d<<16};_.mb=function UJ(){return new WJ(this)};_.w=function VJ(){return this.a==null&&this.b==null?'pair(null,null)':this.a==null?'pair(null,'+xb(this.b)+')':this.b==null?'pair('+xb(this.a)+',null)':'pair('+xb(this.a)+','+xb(this.b)+')'};var xz=Nkb(mzb,'Pair',27);hI(431,1,Ayb,WJ);_.G=function XJ(){return !this.c&&(!this.b&&this.a.a!=null||this.a.b!=null)};_.H=function YJ(){if(!this.c&&!this.b&&this.a.a!=null){this.b=true;return this.a.a}else if(!this.c&&this.a.b!=null){this.c=true;return this.a.b}throw new nvb};_.I=function ZJ(){this.c&&this.a.b!=null?(this.a.b=null):this.b&&this.a.a!=null&&(this.a.a=null);throw new tlb};_.b=false;_.c=false;var wz=Nkb(mzb,'Pair/1',431);hI(228,72,Vxb,$J);var yz=Nkb(nzb,'UnsupportedConfigurationException',228);hI(99,72,Vxb,_J);var zz=Nkb(nzb,'UnsupportedGraphException',99);var aK;hI(103,17,{103:1,3:1,23:1,17:1},jK);var cK,dK,eK,fK,gK,hK;var Az=Okb(rzb,'Alignment',103,IF,kK);var lK;hI(59,17,{59:1,3:1,23:1,17:1},wK);var nK,oK,pK,qK,rK;var Bz=Okb(rzb,'Direction',59,IF,xK);var yK;hI(107,17,{107:1,3:1,23:1,17:1},FK);var AK,BK,CK,DK;var Cz=Okb(rzb,'EdgeLabelPlacement',107,IF,GK);var HK;hI(122,17,{122:1,3:1,23:1,17:1},OK);var JK,KK,LK,MK;var Dz=Okb(rzb,'EdgeRouting',122,IF,PK);var QK;hI(133,17,{133:1,3:1,23:1,17:1},ZK);var SK,TK,UK,VK,WK,XK;var Ez=Okb(rzb,'EdgeType',133,IF,$K);var _K;hI(166,17,{166:1,3:1,23:1,17:1},fL);var bL,cL,dL;var Fz=Okb(rzb,'HierarchyHandling',166,IF,gL);var hL;var jL,kL,lL,mL,nL,oL,pL,qL,rL,sL,tL,uL,vL,wL,xL,yL,zL,AL,BL,CL,DL,EL,FL,GL,HL,IL,JL,KL,LL,ML,NL,OL,PL,QL,RL,SL,TL,UL,VL,WL,XL,YL,ZL,$L,_L,aM,bM,cM,dM;hI(41,17,{41:1,3:1,23:1,17:1},pM);var fM,gM,hM,iM,jM,kM,lM,mM,nM;var Gz=Okb(rzb,'NodeLabelPlacement',41,IF,qM);var rM;hI(100,17,{100:1,3:1,23:1,17:1},AM);var uM,vM,wM,xM,yM;var Hz=Okb(rzb,'PortAlignment',100,IF,BM);var CM;hI(28,17,{28:1,3:1,23:1,17:1},NM);var EM,FM,GM,HM,IM,JM;var Iz=Okb(rzb,'PortConstraints',28,IF,OM);var PM;hI(149,17,{149:1,3:1,23:1,17:1},VM);var RM,SM,TM;var Jz=Okb(rzb,'PortLabelPlacement',149,IF,WM);var XM;hI(32,17,{32:1,3:1,23:1,17:1},uN);var ZM,$M,_M,aN,bN,cN,dN,eN,fN,gN,hN,iN,jN,kN,lN,mN,nN,oN,pN,qN,rN;var Kz=Okb(rzb,'PortSide',32,IF,wN);var xN;hI(150,17,{150:1,3:1,23:1,17:1},EN);var zN,AN,BN,CN;var Lz=Okb(rzb,'SizeConstraint',150,IF,FN);var GN;hI(139,17,{139:1,3:1,23:1,17:1},NN);var IN,JN,KN,LN;var Mz=Okb(rzb,'SizeOptions',139,IF,ON);var PN;hI(62,1,{62:1},UN,VN);_.t=function WN(a){var b;if(a==null||!aw(a,62)){return false}b=Wv(a,62);return ovb(this.d,b.d)&&ovb(this.e,b.e)&&ovb(this.c,b.c)&&ovb(this.b,b.b)};_.v=function XN(){return fpb(Bv(tv(UF,1),syb,1,4,[this.d,this.e,this.c,this.b]))};_.w=function YN(){return 'Rect[x='+this.d+',y='+this.e+',w='+this.c+',h='+this.b+']'};_.b=0;_.c=0;_.d=0;_.e=0;var Tz=Nkb(wzb,'Rectangle',62);hI(283,62,{283:1,62:1},ZN);_.a=0;var Nz=Nkb(xzb,'LabelGroup',283);hI(67,17,{67:1,3:1,23:1,17:1},vO);var $N,_N,aO,bO,cO,dO,eO,fO,gO,hO,iO,jO,kO,lO,mO,nO,oO,pO,qO,rO,sO,tO;var Oz=Okb(xzb,'LabelLocation',67,IF,xO);hI(225,17,{225:1,3:1,23:1,17:1},EO);var AO,BO,CO;var Pz=Okb(xzb,'TextAlignment',225,IF,FO);var HO;hI(589,1,{},fP);_.a=0;_.b=false;_.d=0;_.f=0;_.k=0;_.r=0;_.s=0;var Qz=Nkb(wzb,'LabelAndNodeSizeProcessor/NodeData',589);hI(171,17,{171:1,3:1,23:1,17:1},lP);var gP,hP,iP,jP;var Rz=Okb(wzb,'LabelSide',171,IF,mP);hI(590,1,{},rP);_.b=true;_.c=true;_.d=true;_.e=true;var Sz=Nkb(wzb,zzb,590);hI(121,1,Bzb);_.t=function wP(a){var b;if(aw(a,121)){b=Wv(a,121);return this.d==b.d&&this.a==b.a&&this.b==b.b&&this.c==b.c}else{return false}};_.v=function xP(){var a,b;a=hw(Ixb(this.b))<<16;a|=hw(Ixb(this.a))&byb;b=hw(Ixb(this.c))<<16;b|=hw(Ixb(this.d))&byb;return a^b};_.w=function zP(){return '[top='+this.d+',left='+this.b+',bottom='+this.a+',right='+this.c+']'};_.a=0;_.b=0;_.c=0;_.d=0;var Wz=Nkb(wzb,'Spacing',121);hI(232,121,Bzb,AP,BP,CP);var Uz=Nkb(wzb,'Spacing/Insets',232);hI(65,121,{286:1,121:1,65:1,3:1,5:1},DP,EP,FP);var Vz=Nkb(wzb,'Spacing/Margins',65);hI(364,1,{},jQ);_.c=false;_.d=null;_.g=null;var OP,PP,QP;var Xz=Nkb(Ozb,'JsonGraphImporter',364);var kQ,lQ,mQ,nQ,oQ,pQ,qQ,rQ,sQ;hI(417,14,lzb,xQ);var Yz=Nkb(Ozb,'LayoutOptionResolver/DummyProperty',417);hI(348,1,{},CQ);var yQ;var Zz=Nkb(Ozb,'RecursiveLGraphLayout',348);hI(73,99,{73:1,3:1,54:1,46:1},EQ,FQ,GQ);var $z=Nkb(Ozb,'UnsupportedJsonGraphException',73);hI(380,1,{},OQ);var HQ,IQ;var _z=Nkb(Szb,'GraphConfigurator',380);hI(49,1,{},WQ);var aA=Nkb(Szb,'IntermediateProcessingConfiguration',49);hI(365,1,{},dR);var bA=Nkb(Szb,'KlayLayered',365);hI(577,1,{},kR);_.i=0;var eR;var eA=Nkb(Wzb,'ComponentsToCGraphTransformer',577);var UR;hI(578,1,{},lR);_.tc=function mR(a,b){return Qlb(a.wc(),b.wc())};_.uc=function nR(a,b){return Qlb(a.xc(),b.xc())};var cA=Nkb(Wzb,'ComponentsToCGraphTransformer/1',578);hI(25,1,{25:1});_.k=0;_.o=null;_.p=true;_.r=Vzb;var kA=Nkb(Xzb,'CNode',25);hI(198,25,{198:1,25:1},pR,qR);_.vc=function rR(){this.b.d=this.j.d;this.b.e=this.j.e};_.wc=function sR(){return this.a!=null?Ixb(this.a):this.c.i};_.xc=function tR(){return this.a!=null?Ixb(this.a):this.c.i};_.w=function uR(){return ''};var dA=Nkb(Wzb,'ComponentsToCGraphTransformer/CRectNode',198);hI(549,1,{},HR);var vR,wR;var hA=Nkb(Wzb,'OneDimensionalComponentsCompaction',549);hI(550,1,Tyb,IR);_.B=function JR(a){return xR(),xkb(),Wv(Wv(a,27).a,25).f.f!=0?wkb:vkb};var fA=Nkb(Wzb,'OneDimensionalComponentsCompaction/lambda$0$Type',550);hI(551,1,Tyb,KR);_.B=function LR(a){return xR(),xkb(),uS(Wv(Wv(a,27).a,25).n,Wv(Wv(a,27).b,59))||Wv(Wv(a,27).a,25).f.f!=0&&uS(Wv(Wv(a,27).a,25).n,Wv(Wv(a,27).b,59))?wkb:vkb};var gA=Nkb(Wzb,'OneDimensionalComponentsCompaction/lambda$1$Type',551);hI(324,1,{},NR);var iA=Nkb(Xzb,'CGraph',324);hI(78,1,{78:1},QR);_.b=0;_.c=0;_.d=0;_.f=0;_.i=true;_.j=Vzb;var jA=Nkb(Xzb,'CGroup',78);hI(470,1,{},WR);_.tc=function XR(a,b){return Nlb(a.wc(),b.wc())};_.uc=function YR(a,b){return Nlb(a.xc(),b.xc())};var lA=Nkb(Xzb,'ISpacingsHandler/1',470);hI(323,1,{},rS);_.e=false;var ZR,$R,_R;var nA=Nkb(Xzb,'OneDimensionalCompactor',323);hI(554,1,Tyb,sS);_.B=function tS(a){return aS(),xkb(),Wv(Wv(a,27).a,25).f.f!=0?wkb:vkb};var mA=Nkb(Xzb,'OneDimensionalCompactor/lambda$0$Type',554);hI(335,1,{},xS);_.a=false;_.b=false;_.c=false;_.d=false;var oA=Nkb(Xzb,'Quadruplet',335);hI(587,1,{},yS);_.Cc=function zS(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;k=Uzb;for(d=new Tob(a.a.b);d.a<d.c.c.length;){b=Wv(Rob(d),25);k=Qlb(k,b.f.g.j.d+b.g.a)}q=new aJ;for(h=new Tob(a.a.a);h.a<h.c.c.length;){g=Wv(Rob(h),78);g.j=k;g.f==0&&(TI(q,g,q.c.b,q.c),true)}while(q.b!=0){g=Wv(q.b==0?null:(Bxb(q.b!=0),$I(q,q.a.a)),78);e=g.g.j.d;for(n=(p=(new Snb(g.a.a)).a.bb().mb(),new Ynb(p));n.a.G();){l=(f=Wv(n.a.H(),21),Wv(f.yb(),25));s=g.j+l.g.a;l.f.i||l.j.d<s?(l.r=s):(l.r=l.j.d)}e-=g.g.r;g.b+=e;a.d==(sK(),pK)||a.d==nK?(g.c+=e):(g.c-=e);for(m=(o=(new Snb(g.a.a)).a.bb().mb(),new Ynb(o));m.a.G();){l=(f=Wv(m.a.H(),21),Wv(f.yb(),25));for(j=l.i.mb();j.G();){i=Wv(j.H(),25);tK(a.d)?(r=a.g.tc(l,i)):(r=a.g.uc(l,i));i.f.j=Nlb(i.f.j,l.r+l.j.c+r-i.g.a);i.p||(i.f.j=Nlb(i.f.j,i.j.d-i.g.a));--i.f.f;i.f.f==0&&QI(q,i.f)}}}for(c=new Tob(a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);b.j.d=b.r}};var pA=Nkb(Zzb,'LongestPathCompaction',587);hI(588,1,{},AS);_.Dc=function BS(a){var b,c,d,e,f,g,h;for(c=new Tob(a.a.b);c.a<c.c.c.length;){b=Wv(Rob(c),25);b.i.Q()}for(e=new Tob(a.a.b);e.a<e.c.c.length;){d=Wv(Rob(e),25);for(g=new Tob(a.a.b);g.a<g.c.c.length;){f=Wv(Rob(g),25);if(d==f){continue}if(!!d.f&&d.f==f.f){continue}tK(a.d)?(h=a.g.uc(d,f)):(h=a.g.tc(d,f));d!=f.o&&(f.j.d>d.j.d||d.j.d==f.j.d&&d.j.c<f.j.c)&&SR(f.j.e+f.j.b+h,d.j.e)&&TR(f.j.e,d.j.e+d.j.b+h)&&d.i.ib(f)}}};var qA=Nkb(Zzb,'QuadraticConstraintCalculation',588);hI(317,1,{},FS);_.Dc=function GS(a){this.b=a;ES(this,new RS,new TS)};var xA=Nkb(Zzb,'ScanlineConstraintCalculator',317);var JA=Pkb($zb,'Scanline/EventHandler');hI(464,1,{160:1},KS);_.Ec=function LS(a){IS(this,Wv(a,235))};var sA=Nkb(Zzb,'ScanlineConstraintCalculator/ConstraintsScanlineHandler',464);hI(465,1,fyb,MS);_.$b=function NS(a,b){return glb((Wv(a,25).j.d+Wv(a,25).j.c)/2,(Wv(b,25).j.d+Wv(b,25).j.c)/2)};var rA=Nkb(Zzb,'ScanlineConstraintCalculator/ConstraintsScanlineHandler/lambda$0$Type',465);hI(235,1,{235:1},OS);_.a=false;var tA=Nkb(Zzb,'ScanlineConstraintCalculator/Timestamp',235);hI(466,1,fyb,PS);_.$b=function QS(a,b){return HS(a,b)};var uA=Nkb(Zzb,'ScanlineConstraintCalculator/lambda$0$Type',466);hI(467,1,_zb,RS);_.D=function SS(a){return true};var vA=Nkb(Zzb,'ScanlineConstraintCalculator/lambda$1$Type',467);hI(468,1,Tyb,TS);_.B=function US(a){return 0};var wA=Nkb(Zzb,'ScanlineConstraintCalculator/lambda$2$Type',468);hI(48,1,{48:1},VS,WS);_.t=function XS(a){var b;if(a==null){return false}if(zA!=tb(a)){return false}b=Wv(a,48);return ovb(this.c,b.c)&&ovb(this.d,b.d)};_.v=function YS(){return fpb(Bv(tv(UF,1),syb,1,4,[this.c,this.d]))};_.w=function ZS(){return '('+this.c+', '+this.d+(this.a?'cx':'')+this.b+')'};_.a=true;_.c=0;_.d=0;var zA=Nkb($zb,'Point',48);hI(201,17,{201:1,3:1,23:1,17:1},fT);var $S,_S,aT,bT;var yA=Okb($zb,'Point/Quadrant',201,IF,iT);hI(569,1,{},qT);_.b=null;_.c=null;_.d=null;_.e=null;_.f=null;var jT,kT,lT,mT,nT;var IA=Nkb($zb,'RectilinearConvexHull',569);hI(243,1,{160:1},xT);_.Ec=function yT(a){wT(this,Wv(a,48))};_.b=0;var uT;var BA=Nkb($zb,'RectilinearConvexHull/MaximalElementsEventHandler',243);hI(571,1,fyb,AT);_.$b=function BT(a,b){return zT(a,b)};var AA=Nkb($zb,'RectilinearConvexHull/MaximalElementsEventHandler/lambda$0$Type',571);hI(570,1,{160:1},DT);_.Ec=function ET(a){CT(this,Wv(a,48))};_.a=0;_.b=null;_.c=null;_.d=null;_.e=null;var CA=Nkb($zb,'RectilinearConvexHull/RectangleEventHandler',570);hI(572,1,fyb,FT);_.$b=function GT(a,b){return oT(),Wv(a,48).c==Wv(b,48).c?glb(Wv(b,48).d,Wv(a,48).d):glb(Wv(a,48).c,Wv(b,48).c)};var DA=Nkb($zb,'RectilinearConvexHull/lambda$0$Type',572);hI(573,1,fyb,HT);_.$b=function IT(a,b){return oT(),Wv(a,48).c==Wv(b,48).c?glb(Wv(a,48).d,Wv(b,48).d):glb(Wv(a,48).c,Wv(b,48).c)};var EA=Nkb($zb,'RectilinearConvexHull/lambda$1$Type',573);hI(574,1,fyb,JT);_.$b=function KT(a,b){return oT(),Wv(a,48).c==Wv(b,48).c?glb(Wv(b,48).d,Wv(a,48).d):glb(Wv(b,48).c,Wv(a,48).c)};var FA=Nkb($zb,'RectilinearConvexHull/lambda$2$Type',574);hI(575,1,fyb,LT);_.$b=function MT(a,b){return oT(),Wv(a,48).c==Wv(b,48).c?glb(Wv(a,48).d,Wv(b,48).d):glb(Wv(b,48).c,Wv(a,48).c)};var GA=Nkb($zb,'RectilinearConvexHull/lambda$3$Type',575);hI(576,1,fyb,NT);_.$b=function OT(a,b){return sT(a,b)};var HA=Nkb($zb,'RectilinearConvexHull/lambda$4$Type',576);hI(469,1,{},QT);var KA=Nkb($zb,'Scanline',469);hI(662,1,{});var LA=Nkb(aAb,'AbstractGraphPlacer',662);hI(222,1,{222:1},_T);var WT;var NA=Nkb(aAb,'ComponentGroup',222);hI(434,662,{},fU);_.Fc=function gU(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;this.a.c=xv(UF,syb,1,0,4,1);b.b.c=xv(UF,syb,1,0,4,1);if(a.V()){b.e.a=0;b.e.b=0;return}f=Wv(a.sb(0),55);qJ(b,f);for(e=a.mb();e.G();){d=Wv(e.H(),55);aU(this,d)}n=new FI;o=2*Wv(rJ(f,(Rib(),Jib)),15).a;for(i=new Tob(this.a);i.a<i.c.c.length;){g=Wv(Rob(i),222);j=bU(g,o);VT(Jd(g.a),n.a,n.b);n.a+=j.a;n.b+=j.b}b.e.a=n.a-o;b.e.b=n.b-o;if(Ckb(Ixb(Xv(rJ(f,(Mjb(),ijb)))))&&gw(rJ(f,(eM(),uL)))===gw((NK(),JK))){for(m=a.mb();m.G();){k=Wv(m.H(),55);UT(k,k.d.a,k.d.b)}c=new sU;iU(c,a,o);for(l=a.mb();l.G();){k=Wv(l.H(),55);vI(BI(k.d),c.e)}vI(BI(b.e),c.a)}for(h=new Tob(this.a);h.a<h.c.c.length;){g=Wv(Rob(h),222);TT(b,Jd(g.a))}};var MA=Nkb(aAb,'ComponentGroupGraphPlacer',434);hI(322,1,{},sU);var VA=Nkb(aAb,'ComponentsCompactor',322);hI(13,647,bAb,GU,HU,IU);_.rb=function JU(a,b){uU(this,a,b)};_.ib=function KU(a){return vU(this,a)};_.jb=function LU(a){return xU(this,a)};_.Q=function MU(){this.c=xv(UF,syb,1,0,4,1)};_.kb=function NU(a){return zU(this,a,0)!=-1};_.sb=function OU(a){return yU(this,a)};_.V=function PU(){return this.c.length==0};_.mb=function QU(){return new Tob(this)};_.vb=function RU(a){return AU(this,a)};_.nb=function SU(a){return BU(this,a)};_.Xb=function TU(a,b){CU(this,a,b)};_.wb=function UU(a,b){return DU(this,a,b)};_.Y=function VU(){return this.c.length};_.ob=function WU(){return EU(this)};_.pb=function XU(a){return FU(this,a)};var BG=Nkb(Cyb,'ArrayList',13);hI(532,13,bAb,$U);_.ib=function _U(a){return ZU(this,Wv(a,48))};var OA=Nkb(aAb,'ComponentsCompactor/Hullpoints',532);hI(529,1,{347:1},bV);_.a=false;var PA=Nkb(aAb,'ComponentsCompactor/InternalComponent',529);hI(528,1,Oyb,cV);_.mb=function dV(){return new Tob(this.a)};var QA=Nkb(aAb,'ComponentsCompactor/InternalConnectedComponents',528);hI(531,1,{251:1},eV);_.zc=function gV(){return null};_.Ac=function hV(){return this.a};_.yc=function fV(){return oU(this.d)};_.Bc=function iV(){return this.b};var RA=Nkb(aAb,'ComponentsCompactor/InternalExternalExtension',531);hI(530,1,{251:1},jV);_.Ac=function mV(){return this.a};_.yc=function kV(){return oU(this.d)};_.zc=function lV(){return this.c};_.Bc=function nV(){return this.b};var SA=Nkb(aAb,'ComponentsCompactor/InternalUnionExternalExtension',530);hI(534,1,{},oV);var TA=Nkb(aAb,'ComponentsCompactor/OuterSegments',534);hI(533,1,{},pV);var UA=Nkb(aAb,'ComponentsCompactor/Segments',533);hI(381,1,{},tV);var WA=Nkb(aAb,'ComponentsProcessor',381);hI(432,662,{},uV);_.Fc=function vV(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A;if(a.Y()==1){t=Wv(a.sb(0),55);if(t!=b){b.b.c=xv(UF,syb,1,0,4,1);ST(b,t,0,0);qJ(b,t);YW(b.a,t.a);b.e.a=t.e.a;b.e.b=t.e.b}return}else if(a.V()){b.b.c=xv(UF,syb,1,0,4,1);b.e.a=0;b.e.b=0;return}for(h=a.mb();h.G();){f=Wv(h.H(),55);q=0;for(o=new Tob(f.b);o.a<o.c.c.length;){n=Wv(Rob(o),9);q+=Wv(rJ(n,(Rib(),Eib)),24).a}f.k=q}Gpb(a,new xV);e=Wv(a.sb(0),55);b.b.c=xv(UF,syb,1,0,4,1);qJ(b,e);m=0;v=0;for(i=a.mb();i.G();){f=Wv(i.H(),55);s=f.e;m=Nlb(m,s.a);v+=s.a*s.b}m=Nlb(m,Math.sqrt(v)*Wv(rJ(b,(Rib(),Rhb)),15).a);u=cAb*Wv(rJ(b,Jib),15).a;w=0;A=0;l=0;c=u;for(g=a.mb();g.G();){f=Wv(g.H(),55);s=f.e;if(w+s.a>m){w=0;A+=l+u;l=0}p=f.d;UT(f,w+p.a,A+p.b);p.a=0;p.b=0;c=Nlb(c,w+s.a);l=Nlb(l,s.b);w+=s.a+u}b.e.a=c;b.e.b=A+l;r=Wv(rJ(b,Jib),15).a;if(Ckb(Ixb(Xv(rJ(e,(Mjb(),ijb)))))){d=new sU;iU(d,a,r);for(k=a.mb();k.G();){j=Wv(k.H(),55);vI(BI(j.d),d.e)}vI(BI(b.e),d.a)}TT(b,a)};var YA=Nkb(aAb,'SimpleRowGraphPlacer',432);hI(433,1,fyb,xV);_.$b=function yV(a,b){return wV(Wv(a,55),Wv(b,55))};var XA=Nkb(aAb,'SimpleRowGraphPlacer/1',433);hI(369,1,eAb,CV);_.sc=function DV(a,b){BV(a,b)};var zV;var $A=Nkb(fAb,'CompoundGraphPostprocessor',369);hI(370,1,_zb,EV);_.D=function FV(a){var b;return b=Wv(rJ(Wv(a,114).b,(eM(),CL)),44),!!b&&b.b!=0};var ZA=Nkb(fAb,'CompoundGraphPostprocessor/1',370);hI(368,1,eAb,SV);_.sc=function TV(a,b){NV(this,a,b)};var aB=Nkb(fAb,'CompoundGraphPreprocessor',368);hI(187,1,{187:1},UV);_.c=false;var _A=Nkb(fAb,'CompoundGraphPreprocessor/ExternalPort',187);hI(114,1,{114:1},XV);_.w=function YV(){return zc(this.c)+':'+gW(this.b)};var cB=Nkb(fAb,'CrossHierarchyEdge',114);hI(310,1,fyb,$V);_.$b=function _V(a,b){return ZV(this,Wv(a,114),Wv(b,114))};var bB=Nkb(fAb,'CrossHierarchyEdgeComparator',310);hI(147,131,{179:1,131:1,147:1,3:1});_.k=0;var lB=Nkb(hAb,'LGraphElement',147);hI(12,147,{179:1,131:1,12:1,147:1,3:1},hW);_.w=function iW(){return gW(this)};var dB=Nkb(hAb,'LEdge',12);hI(55,147,{179:1,131:1,55:1,147:1,3:1,22:1},kW);_.mb=function lW(){return new Tob(this.c)};_.w=function mW(){if(this.c.c.length==0){return 'G-unlayered'+Ze(this.b)}else if(this.b.c.length==0){return 'G-layered'+Ze(this.c)}return 'G[layerless'+Ze(this.b)+', layers'+Ze(this.c)+']'};var mB=Nkb(hAb,'LGraph',55);hI(273,1,{});_.pc=function rW(){return this.e.j};var eB=Nkb(hAb,'LGraphAdapters/AbstractLShapeAdapter',273);hI(240,1,{627:1},tW);_.b=null;var fB=Nkb(hAb,'LGraphAdapters/LEdgeAdapter',240);hI(325,1,{},wW);_.pc=function xW(){return this.a.e};_.b=null;_.c=false;var gB=Nkb(hAb,'LGraphAdapters/LGraphAdapter',325);hI(224,273,{129:1,224:1},yW);var hB=Nkb(hAb,'LGraphAdapters/LLabelAdapter',224);hI(555,273,{626:1},BW);_.a=null;_.b=null;_.c=false;var iB=Nkb(hAb,'LGraphAdapters/LNodeAdapter',555);hI(556,273,{161:1},FW);_.a=null;_.b=null;_.c=null;_.d=false;var jB=Nkb(hAb,'LGraphAdapters/LPortAdapter',556);hI(557,1,fyb,HW);_.$b=function IW(a,b){return GW(Wv(a,7),Wv(b,7))};var kB=Nkb(hAb,'LGraphAdapters/PortComparator',557);hI(168,1,{168:1},ZW,$W);_.t=function _W(a){var b;if(aw(a,168)){b=Wv(a,168);return this.d==b.d&&this.a==b.a&&this.b==b.b&&this.c==b.c}else{return false}};_.v=function aX(){var a,b;a=hw(Ixb(this.b))<<16;a|=hw(Ixb(this.a))&byb;b=hw(Ixb(this.c))<<16;b|=hw(Ixb(this.d))&byb;return a^b};_.w=function bX(){return 'Insets[top='+this.d+',left='+this.b+',bottom='+this.a+',right='+this.c+']'};_.a=0;_.b=0;_.c=0;_.d=0;var nB=Nkb(hAb,'LInsets',168);hI(165,147,{179:1,131:1,147:1,165:1,3:1});var CB=Nkb(hAb,'LShape',165);hI(33,165,{179:1,131:1,147:1,33:1,165:1,3:1},dX);_.w=function eX(){return this.a==null?'l_'+this.k:'l_'+this.a};var oB=Nkb(hAb,'LLabel',33);hI(9,165,{179:1,131:1,147:1,9:1,165:1,3:1},uX);_.w=function vX(){return tX(this)};var qB=Nkb(hAb,'LNode',9);hI(132,17,{132:1,3:1,23:1,17:1},DX);var wX,xX,yX,zX,AX,BX;var pB=Okb(hAb,'LNode/NodeType',132,IF,EX);hI(7,165,{179:1,131:1,147:1,7:1,165:1,3:1},RX);_.w=function SX(){var a;return a=OX(this),a==null?'p_'+this.k:'p_'+a};var FX,GX,HX,IX,JX,KX;var BB=Nkb(hAb,'LPort',7);hI(399,1,_zb,UX);_.D=function VX(a){return TX(a)};var rB=Nkb(hAb,'LPort/1',399);hI(400,1,_zb,XX);_.D=function YX(a){return WX(a)};var sB=Nkb(hAb,'LPort/2',400);hI(401,1,_zb,ZX);_.D=function $X(a){return Wv(a,7).g==(sN(),$M)};var tB=Nkb(hAb,'LPort/3',401);hI(402,1,_zb,_X);_.D=function aY(a){return Wv(a,7).g==(sN(),ZM)};var uB=Nkb(hAb,'LPort/4',402);hI(403,1,_zb,bY);_.D=function cY(a){return Wv(a,7).g==(sN(),pN)};var vB=Nkb(hAb,'LPort/5',403);hI(404,1,_zb,dY);_.D=function eY(a){return Wv(a,7).g==(sN(),rN)};var wB=Nkb(hAb,'LPort/6',404);hI(190,1,Oyb,fY);_.mb=function gY(){var a;a=new Tob(this.a.b);return new hY(a)};var yB=Nkb(hAb,'LPort/7',190);hI(405,1,Ayb,hY);_.H=function jY(){return Wv(Rob(this.a),12).c};_.G=function iY(){return Qob(this.a)};_.I=function kY(){Sob(this.a)};var xB=Nkb(hAb,'LPort/7/1',405);hI(169,1,Oyb,lY);_.mb=function mY(){var a;return a=new Tob(this.a.e),new nY(a)};var AB=Nkb(hAb,'LPort/8',169);hI(304,1,Ayb,nY);_.H=function pY(){return Wv(Rob(this.a),12).d};_.G=function oY(){return Qob(this.a)};_.I=function qY(){Sob(this.a)};var zB=Nkb(hAb,'LPort/8/1',304);hI(16,147,{179:1,131:1,147:1,16:1,3:1,22:1},sY);_.mb=function tY(){return new Tob(this.a)};_.w=function uY(){return 'L_'+zU(this.b.c,this,0)+Ze(this.a)};var DB=Nkb(hAb,'Layer',16);hI(437,1,eAb,wY);_.sc=function xY(a,b){var c,d,e,f,g,h,i;nI(b,'Big nodes intermediate-processing',1);this.a=a;for(f=new Tob(this.a.c);f.a<f.c.c.length;){e=Wv(Rob(f),16);i=Eo(e.a);c=pl(i,new zY);for(h=Pl(c.b.mb(),c.a);od(h);){g=Wv(pd(h),9);if(gw(rJ(g,(Mjb(),vjb)))===gw((Xib(),Uib))||gw(rJ(g,vjb))===gw(Vib)){d=vY(this,g,false);sJ(d,vjb,Wv(rJ(g,vjb),85));sJ(g,vjb,Wib)}else{vY(this,g,true)}}}pI(b)};var FB=Nkb(jAb,'BigNodesIntermediateProcessor',437);hI(438,1,_zb,zY);_.D=function AY(a){return yY(Wv(a,9))};var EB=Nkb(jAb,'BigNodesIntermediateProcessor/1',438);hI(582,1,Tyb,CY);_.B=function DY(a){var b;return BY((b=this,iw(a),b))};var GB=Nkb(jAb,'BigNodesLabelHandler/CompoundFunction',582);hI(332,1,{},HY);_.a=0;_.e=null;_.f=0;var KB=Nkb(jAb,'BigNodesLabelHandler/Handler',332);hI(583,1,Tyb,JY);_.B=function KY(a){var b;return IY((b=this,iw(a),b))};var HB=Nkb(jAb,'BigNodesLabelHandler/Handler/1',583);hI(584,1,Tyb,MY);_.B=function NY(a){var b;return LY((b=this,iw(a),b))};var IB=Nkb(jAb,'BigNodesLabelHandler/Handler/2',584);hI(585,1,Tyb,PY);_.B=function QY(a){var b;return OY((b=this,iw(a),b))};var JB=Nkb(jAb,'BigNodesLabelHandler/Handler/3',585);hI(439,1,eAb,SY);_.sc=function TY(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;nI(b,'Big nodes post-processing',1);this.a=a;for(h=new Tob(this.a.c);h.a<h.c.c.length;){g=Wv(Rob(h),16);c=pl(g.a,new VY);for(j=Pl(c.b.mb(),c.a);od(j);){i=Wv(pd(j),9);l=Wv(rJ(i,(Rib(),Whb)),15);f=RY(this,i);p=new GU;for(o=nX(f,(sN(),ZM)).mb();o.G();){m=Wv(o.H(),7);p.c[p.c.length]=m;k=m.i.a-f.j.a;m.i.a=l.a+k}i.j.a=l.a;for(n=new Tob(p);n.a<n.c.c.length;){m=Wv(Rob(n),7);PX(m,i)}this.a.e.a<i.i.a+i.j.a&&(this.a.e.a=i.i.a+i.j.a);e=Wv(rJ(i,Thb),20);xU(i.c,e);d=Wv(rJ(i,Uhb),64);!!d&&d.B(null)}}pI(b)};var MB=Nkb(jAb,'BigNodesPostProcessor',439);hI(440,1,_zb,VY);_.D=function WY(a){return UY(Wv(a,9))};var LB=Nkb(jAb,'BigNodesPostProcessor/1',440);hI(441,1,eAb,YY);_.sc=function ZY(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;nI(b,kAb,1);this.c=a;l=this.c.b;e=0;for(i=new Tob(l);i.a<i.c.c.length;){g=Wv(Rob(i),9);g.k=e++}this.d=Wv(rJ(this.c,(Rib(),Jib)),15).a;this.a=Wv(rJ(this.c,(eM(),sL)),59);this.b=l.c.length;f=lAb;for(j=new Tob(l);j.a<j.c.c.length;){g=Wv(Rob(j),9);g.g==(CX(),AX)&&g.j.a<f&&(f=g.j.a)}f=50>f?50:f;c=new GU;n=f+this.d;for(k=new Tob(l);k.a<k.c.c.length;){g=Wv(Rob(k),9);if(g.g==(CX(),AX)&&g.j.a>n){m=1;d=g.j.a;while(d>f){++m;d=(g.j.a-(m-1)*this.d)/m}vU(c,new _Y(this,g,m,d))}}for(h=new Tob(c);h.a<h.c.c.length;){g=Wv(Rob(h),267);XY(g.d)&&$Y(g)}pI(b)};_.b=0;_.d=0;var OB=Nkb(jAb,'BigNodesPreProcessor',441);hI(267,1,{267:1},_Y);_.a=0;_.c=0;var NB=Nkb(jAb,'BigNodesPreProcessor/BigNode',267);hI(442,1,eAb,cZ);_.sc=function dZ(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;nI(b,kAb,1);aZ=Ckb(Ixb(Xv(rJ(a,(eM(),rL)))));this.c=a;n=new GU;for(g=new Tob(a.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);xU(n,f.a)}e=0;for(k=new Tob(n);k.a<k.c.c.length;){i=Wv(Rob(k),9);i.k=e++}this.d=Wv(rJ(this.c,(Rib(),Jib)),15).a;this.a=Wv(rJ(this.c,sL),59);this.b=n.c.length;h=lAb;for(l=new Tob(n);l.a<l.c.c.length;){i=Wv(Rob(l),9);i.g==(CX(),AX)&&i.j.a<h&&(h=i.j.a)}h=50>h?50:h;c=new GU;p=h+this.d;for(m=new Tob(n);m.a<m.c.c.length;){i=Wv(Rob(m),9);if(i.g==(CX(),AX)&&i.j.a>p){o=1;d=i.j.a;while(d>h){++o;d=(i.j.a-(o-1)*this.d)/o}vU(c,new nZ(this,i,o))}}for(j=new Tob(c);j.a<j.c.c.length;){i=Wv(Rob(j),268);bZ(i)&&gZ(i)}pI(b)};_.b=0;_.d=0;var aZ=false;var QB=Nkb(jAb,'BigNodesSplitter',442);hI(268,1,{268:1},nZ);_.a=0;_.e=4;var PB=Nkb(jAb,'BigNodesSplitter/BigNode',268);hI(443,1,eAb,qZ);_.sc=function rZ(a,b){var c,d,e,f,g,h,i,j;nI(b,'Comment post-processing',1);i=Wv(rJ(a,(Rib(),Jib)),15).a;for(f=new Tob(a.c);f.a<f.c.c.length;){e=Wv(Rob(f),16);d=new GU;for(h=new Tob(e.a);h.a<h.c.c.length;){g=Wv(Rob(h),9);j=Wv(rJ(g,Qib),20);c=Wv(rJ(g,Yhb),20);if(!!j||!!c){pZ(g,j,c,i);!!j&&xU(d,j);!!c&&xU(d,c)}}xU(e.a,d)}pI(b)};var RB=Nkb(jAb,'CommentPostprocessor',443);hI(444,1,eAb,tZ);_.sc=function uZ(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q;nI(b,'Comment pre-processing',1);h=new Tob(a.b);while(h.a<h.c.c.length){g=Wv(Rob(h),9);if(Ckb(Ixb(Xv(rJ(g,(eM(),qL)))))){d=0;c=null;i=null;for(n=new Tob(g.f);n.a<n.c.c.length;){l=Wv(Rob(n),7);d+=l.b.c.length+l.e.c.length;if(l.b.c.length==1){c=Wv(yU(l.b,0),12);i=c.c}if(l.e.c.length==1){c=Wv(yU(l.e,0),12);i=c.d}}if(d==1&&i.b.c.length+i.e.c.length==1&&!Ckb(Ixb(Xv(rJ(i.f,qL))))){sZ(g,c,i,i.f);Sob(h)}else{q=new GU;for(m=new Tob(g.f);m.a<m.c.c.length;){l=Wv(Rob(m),7);for(k=new Tob(l.e);k.a<k.c.c.length;){j=Wv(Rob(k),12);j.d.e.c.length==0||(q.c[q.c.length]=j,true)}for(f=new Tob(l.b);f.a<f.c.c.length;){e=Wv(Rob(f),12);e.c.b.c.length==0||(q.c[q.c.length]=e,true)}}for(p=new Tob(q);p.a<p.c.c.length;){o=Wv(Rob(p),12);cW(o,true)}}}}pI(b)};var SB=Nkb(jAb,'CommentPreprocessor',444);hI(445,1,eAb,wZ);_.sc=function xZ(a,b){var c,d,e,f,g,h,i,j,k,l;nI(b,'Edge and layer constraint edge reversal',1);for(j=new Tob(a.b);j.a<j.c.c.length;){i=Wv(Rob(j),9);g=Wv(rJ(i,(Mjb(),vjb)),85);f=null;switch(g.e){case 1:case 2:f=(Hgb(),Ggb);break;case 3:case 4:f=(Hgb(),Egb);}if(f){sJ(i,(Rib(),dib),(Hgb(),Ggb));f==Egb?vZ(i,g,(djb(),bjb)):f==Ggb&&vZ(i,g,(djb(),ajb))}else{if(MM(Wv(rJ(i,(eM(),TL)),28))&&i.f.c.length!=0){c=true;for(l=new Tob(i.f);l.a<l.c.c.length;){k=Wv(Rob(l),7);if(!(k.g==(sN(),ZM)&&k.b.c.length-k.e.c.length>0||k.g==rN&&k.b.c.length-k.e.c.length<0)){c=false;break}if(k.g==rN){for(e=new Tob(k.e);e.a<e.c.c.length;){d=Wv(Rob(e),12);h=Wv(rJ(d.d.f,vjb),85);if(h==(Xib(),Uib)||h==Vib){c=false;break}}}if(k.g==ZM){for(e=new Tob(k.b);e.a<e.c.c.length;){d=Wv(Rob(e),12);h=Wv(rJ(d.c.f,vjb),85);if(h==(Xib(),Sib)||h==Tib){c=false;break}}}}c&&vZ(i,g,(djb(),cjb))}}}pI(b)};var TB=Nkb(jAb,'EdgeAndLayerConstraintEdgeReverser',445);hI(446,1,eAb,AZ);_.sc=function BZ(a,b){var c,d,e,f,g,h,i,j,k,l;nI(b,'End label placement',1);g=Wv(rJ(a,(eM(),DL)),15).a;this.a=(mp(),new ntb);this.c=new ntb;this.b=new ntb;for(i=new Tob(a.c);i.a<i.c.c.length;){h=Wv(Rob(i),16);for(k=new Tob(h.a);k.a<k.c.c.length;){j=Wv(Rob(k),9);for(d=Uh(mX(j));Cm(d);){c=Wv(Dm(d),12);for(f=new Tob(c.b);f.a<f.c.c.length;){e=Wv(Rob(f),33);(gw(rJ(e,tL))===gw((EK(),CK))||gw(rJ(e,tL))===gw(BK))&&(l=null,gw(rJ(e,tL))===gw(CK)?(l=c.c):gw(rJ(e,tL))===gw(BK)&&(l=c.d),Qmb(this.a,l.f)||Umb(this.a,l.f,0),Qmb(this.c,l.f)||Umb(this.c,l.f,0),Qmb(this.b,l)||Umb(this.b,l,0),gw(rJ(e,(Rib(),pib)))===gw((kP(),gP))?zZ(e,l,g):yZ(e,l,g),undefined)}}}}pI(b)};var UB=Nkb(jAb,'EndLabelProcessor',446);hI(269,1,eAb,SZ);_.sc=function TZ(a,b){var c,d,e,f,g;nI(b,'Graph transformation ('+this.a+')',1);e=Ao(a.b);for(d=new Tob(a.c);d.a<d.c.c.length;){c=Wv(Rob(d),16);xU(e,c.a)}switch(this.a.e){case 0:JZ(e,a);break;case 1:NZ(e);g=Wv(rJ(a,(Mjb(),ojb)),115);!!g&&sJ(a,ojb,Qgb(g));MZ(a.d);MZ(a.e);break;case 2:JZ(e,a);LZ(e,a);NZ(e);f=Wv(rJ(a,(Mjb(),ojb)),115);!!f&&sJ(a,ojb,Qgb(f));MZ(a.d);MZ(a.e);}pI(b)};var WB=Nkb(jAb,'GraphTransformer',269);hI(221,17,{221:1,3:1,23:1,17:1},YZ);var UZ,VZ,WZ;var VB=Okb(jAb,'GraphTransformer/Mode',221,IF,ZZ);hI(448,1,eAb,d$);_.sc=function e$(a,b){nI(b,'Hierarchical port constraint processing',1);a$(a);c$(a);pI(b)};var YB=Nkb(jAb,'HierarchicalPortConstraintProcessor',448);hI(449,1,fyb,g$);_.$b=function h$(a,b){return f$(Wv(a,9),Wv(b,9))};var XB=Nkb(jAb,'HierarchicalPortConstraintProcessor/NodeComparator',449);hI(450,1,eAb,j$);_.sc=function k$(a,b){var c,d,e,f,g,h,i,j,k,l;nI(b,'Hierarchical port dummy size processing',1);i=new GU;l=new GU;h=Wv(rJ(a,(Rib(),Jib)),15).a;k=h*Wv(rJ(a,(Mjb(),qjb)),15).a;c=k*2;for(e=new Tob(a.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);i.c=xv(UF,syb,1,0,4,1);l.c=xv(UF,syb,1,0,4,1);for(g=new Tob(d.a);g.a<g.c.c.length;){f=Wv(Rob(g),9);if(f.g==(CX(),xX)){j=Wv(rJ(f,hib),32);j==(sN(),$M)?(i.c[i.c.length]=f,true):j==pN&&(l.c[l.c.length]=f,true)}}i$(i,true,c);i$(l,false,c)}pI(b)};var ZB=Nkb(jAb,'HierarchicalPortDummySizeProcessor',450);hI(451,1,eAb,w$);_.sc=function x$(a,b){var c,d,e,f;nI(b,'Orthogonally routing hierarchical port edges',1);this.a=0;c=s$(a);v$(a,c);u$(this,a,c);q$(a);d=Wv(rJ(a,(eM(),TL)),28);e=a.c;p$((Cxb(0,e.c.length),Wv(e.c[0],16)),d,a);p$(Wv(yU(e,e.c.length-1),16),d,a);f=a.c;n$((Cxb(0,f.c.length),Wv(f.c[0],16)));n$(Wv(yU(f,f.c.length-1),16));pI(b)};_.a=0;var aC=Nkb(jAb,'HierarchicalPortOrthogonalEdgeRouter',451);hI(452,1,fyb,z$);_.$b=function A$(a,b){return y$(Wv(a,9),Wv(b,9))};var $B=Nkb(jAb,'HierarchicalPortOrthogonalEdgeRouter/1',452);hI(453,1,fyb,C$);_.$b=function D$(a,b){return B$(Wv(a,9),Wv(b,9))};var _B=Nkb(jAb,'HierarchicalPortOrthogonalEdgeRouter/2',453);hI(454,1,eAb,F$);_.sc=function G$(a,b){var c;nI(b,'Hierarchical port position processing',1);c=a.c;c.c.length>0&&E$((Cxb(0,c.c.length),Wv(c.c[0],16)),a);c.c.length>1&&E$(Wv(yU(c,c.c.length-1),16),a);pI(b)};var bC=Nkb(jAb,'HierarchicalPortPositionProcessor',454);hI(471,1,eAb,I$);_.sc=function J$(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;nI(b,'Hyperedge merging',1);n=new Fnb(a.c,0);while(n.b<n.d.Y()){m=(Bxb(n.b<n.d.Y()),Wv(n.d.sb(n.c=n.b++),16));p=m.a;if(p.c.length==0){continue}h=null;l=null;for(o=0;o<p.c.length;o++){c=(Cxb(o,p.c.length),Wv(p.c[o],9));g=c.g;if(g==(CX(),zX)&&l==zX){e=Wv(rJ(c,(Rib(),qib)),7);j=Wv(rJ(h,qib),7);f=Wv(rJ(c,rib),7);k=Wv(rJ(h,rib),7);d=!!e||!!f;i=!!j||!!k;if(d&&i&&(e==j||f==k)){H$(c,h,e==j,f==k);Cxb(o,p.c.length);hxb(p.c,o,1);--o;c=h;g=l}}h=c;l=g}}pI(b)};var cC=Nkb(jAb,'HyperedgeDummyMerger',471);hI(472,1,eAb,L$);_.sc=function M$(a,b){var c,d,e,f,g,h,i,j,k,l;nI(b,'Hypernodes processing',1);for(e=new Tob(a.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);for(h=new Tob(d.a);h.a<h.c.c.length;){g=Wv(Rob(h),9);if(Ckb(Ixb(Xv(rJ(g,(eM(),AL)))))&&g.f.c.length<=2){l=0;k=0;c=0;f=0;for(j=new Tob(g.f);j.a<j.c.c.length;){i=Wv(Rob(j),7);switch(i.g.e){case 1:++l;break;case 2:++k;break;case 3:++c;break;case 4:++f;}}l==0&&c==0&&K$(a,g,f<=k)}}}pI(b)};var dC=Nkb(jAb,'HypernodesProcessor',472);hI(473,1,eAb,N$);_.sc=function O$(a,b){var c,d,e,f,g,h,i,j,k;nI(b,'Layer constraint edge reversal',1);for(g=new Tob(a.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);k=-1;c=new GU;j=Wv(FU(f.a,xv(qB,Nzb,9,f.a.c.length,0,1)),51);for(e=0;e<j.length;e++){d=Wv(rJ(j[e],(Rib(),mib)),140);if(k==-1){d!=(Hhb(),Ghb)&&(k=e)}else{if(d==(Hhb(),Ghb)){rX(j[e],null);qX(j[e],k++,f)}}d==(Hhb(),Ehb)&&vU(c,j[e])}for(i=new Tob(c);i.a<i.c.c.length;){h=Wv(Rob(i),9);rX(h,null);rX(h,f)}}pI(b)};var eC=Nkb(jAb,'InLayerConstraintProcessor',473);hI(474,1,eAb,R$);_.sc=function W$(a,b){var c,d,e,f,g,h;if(!Wv(rJ(a,(Rib(),jib)),18).kb((ohb(),hhb))){return}for(h=new Tob(a.b);h.a<h.c.c.length;){f=Wv(Rob(h),9);if(f.g==(CX(),AX)){e=Wv(rJ(f,(eM(),GL)),65);this.c=Qlb(this.c,f.i.a-e.b);this.a=Nlb(this.a,f.i.a+f.j.a+e.c);this.d=Qlb(this.d,f.i.b-e.d);this.b=Nlb(this.b,f.i.b+f.j.b+e.a)}}for(g=new Tob(a.b);g.a<g.c.c.length;){f=Wv(Rob(g),9);if(f.g!=(CX(),AX)){switch(f.g.e){case 2:d=Wv(rJ(f,(Mjb(),vjb)),85);if(d==(Xib(),Tib)){f.i.a=this.c-10;Q$(f,new X$).A(new Z$(f));break}if(d==Vib){f.i.a=this.a+10;Q$(f,new _$).A(new b_(f));break}c=Wv(rJ(f,mib),140);if(c==(Hhb(),Ghb)){P$(f).A(new d_(f));f.i.b=this.d-10;break}if(c==Ehb){P$(f).A(new f_(f));f.i.b=this.b+10;break}break;default:throw new slb('The node type '+f.g+' is not supported by the '+lC);}}}};_.a=Vzb;_.b=Vzb;_.c=Uzb;_.d=Uzb;var lC=Nkb(jAb,'InteractiveExternalPortPositioner',474);hI(475,1,Tyb,X$);_.B=function Y$(a){return Wv(a,12).d.f};var fC=Nkb(jAb,'InteractiveExternalPortPositioner/lambda$0$Type',475);hI(476,1,Tyb,Z$);_.B=function $$(a){return S$(this.a,a)};var gC=Nkb(jAb,'InteractiveExternalPortPositioner/lambda$1$Type',476);hI(477,1,Tyb,_$);_.B=function a_(a){return Wv(a,12).c.f};var hC=Nkb(jAb,'InteractiveExternalPortPositioner/lambda$2$Type',477);hI(478,1,Tyb,b_);_.B=function c_(a){return T$(this.a,a)};var iC=Nkb(jAb,'InteractiveExternalPortPositioner/lambda$3$Type',478);hI(479,1,Tyb,d_);_.B=function e_(a){return U$(this.a,a)};var jC=Nkb(jAb,'InteractiveExternalPortPositioner/lambda$4$Type',479);hI(480,1,Tyb,f_);_.B=function g_(a){return V$(this.a,a)};var kC=Nkb(jAb,'InteractiveExternalPortPositioner/lambda$5$Type',480);hI(37,17,{37:1,3:1,23:1,17:1},f0);var h_,i_,j_,k_,l_,m_,n_,o_,p_,q_,r_,s_,t_,u_,v_,w_,x_,y_,z_,A_,B_,C_,D_,E_,F_,G_,H_,I_,J_,K_,L_,M_,N_,O_,P_,Q_,R_,S_,T_,U_,V_,W_,X_,Y_,Z_,$_,__,a0,b0,c0;var mC=Okb(jAb,'IntermediateProcessorStrategy',37,IF,g0);hI(503,1,eAb,k0);_.sc=function l0(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;nI(b,'Inverted port preprocessing',1);j=a.c;i=new Fnb(j,0);c=null;s=new GU;while(i.b<i.d.Y()){r=c;c=(Bxb(i.b<i.d.Y()),Wv(i.d.sb(i.c=i.b++),16));for(m=new Tob(s);m.a<m.c.c.length;){k=Wv(Rob(m),9);rX(k,r)}s.c=xv(UF,syb,1,0,4,1);for(n=new Tob(c.a);n.a<n.c.c.length;){k=Wv(Rob(n),9);if(k.g!=(CX(),AX)){continue}if(!MM(Wv(rJ(k,(eM(),TL)),28))){continue}for(q=pX(k,(djb(),ajb),(sN(),ZM)).mb();q.G();){o=Wv(q.H(),7);h=o.b;g=Wv(FU(h,xv(dB,gAb,12,h.c.length,0,1)),47);for(e=0,f=g.length;e<f;++e){d=g[e];h0(a,o,d,s)}}for(p=pX(k,bjb,rN).mb();p.G();){o=Wv(p.H(),7);h=o.e;g=Wv(FU(h,xv(dB,gAb,12,h.c.length,0,1)),47);for(e=0,f=g.length;e<f;++e){d=g[e];i0(a,o,d,s)}}}}for(l=new Tob(s);l.a<l.c.c.length;){k=Wv(Rob(l),9);rX(k,c)}pI(b)};var nC=Nkb(jAb,'InvertedPortProcessor',503);hI(481,1,eAb,m0);_.sc=function n0(a,b){nI(b,'Node and Port Label Placement and Node Sizing',1);GO((nW(),nW(),new wW(a,false)));pI(b)};var oC=Nkb(jAb,'LabelAndNodeSizeProcessor',481);hI(482,1,eAb,q0);_.sc=function r0(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;nI(b,'Label dummy insertions',1);m=new GU;k=Wv(rJ(a,(eM(),DL)),15).a;l=Wv(rJ(a,sL),59);for(o=new Tob(a.b);o.a<o.c.c.length;){n=Wv(Rob(o),9);for(q=new Tob(n.f);q.a<q.c.c.length;){p=Wv(Rob(q),7);for(h=new Tob(p.e);h.a<h.c.c.length;){g=Wv(Rob(h),12);if(g.c.f!=g.d.f&&ol(g.b,o0)){s=Do(g.b.c.length);c=new uX(a);sX(c,(CX(),yX));sJ(c,(Rib(),uib),g);sJ(c,Hib,s);sJ(c,TL,(KM(),FM));sJ(c,qib,g.c);sJ(c,rib,g.d);m.c[m.c.length]=c;i1(g,c);t=Wv(rJ(g,dM),15).a;if(t<0){t=0;sJ(g,dM,new llb(t))}r=Math.floor(t/2);for(e=new Tob(c.f);e.a<e.c.c.length;){d=Wv(Rob(e),7);d.i.b=r}f=c.j;i=new Fnb(g.b,0);while(i.b<i.d.Y()){j=(Bxb(i.b<i.d.Y()),Wv(i.d.sb(i.c=i.b++),33));if(gw(rJ(j,tL))===gw((EK(),AK))){if(l==(sK(),rK)||l==nK){f.a+=j.j.a+k;f.b=Nlb(f.b,j.j.b)}else{f.a=Nlb(f.a,j.j.a);f.b+=j.j.b+k}s.c[s.c.length]=j;vnb(i)}}if(l==(sK(),rK)||l==nK){f.a-=k;f.b+=k+t}else{f.b+=k+t}}}}}xU(a.b,m);pI(b)};var o0;var qC=Nkb(jAb,'LabelDummyInserter',482);hI(483,1,_zb,s0);_.D=function t0(a){return gw(rJ(Wv(a,33),(eM(),tL)))===gw((EK(),AK))};var pC=Nkb(jAb,'LabelDummyInserter/1',483);hI(484,1,eAb,w0);_.sc=function x0(a,b){var c,d,e,f,g,h,i,j,k,l,m;nI(b,'Label dummy removal',1);e=Wv(rJ(a,(eM(),DL)),15).a;h=Wv(rJ(a,sL),59);for(g=new Tob(a.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);j=new Fnb(f.a,0);while(j.b<j.d.Y()){i=(Bxb(j.b<j.d.Y()),Wv(j.d.sb(j.c=j.b++),9));if(i.g==(CX(),yX)){k=Wv(rJ(i,(Rib(),uib)),12);m=Wv(rJ(k,dM),15).a;c=new II(i.i);gw(rJ(i,pib))===gw((kP(),hP))&&(c.b+=m+e);d=new HI(i.j.a,i.j.b-m-e);l=Wv(rJ(i,Hib),20);h==(sK(),rK)||h==nK?v0(l,c,e,d,gw(rJ(i,pib))!==gw(gP)):u0(l,c,e,d);xU(k.b,l);c1(i,false);vnb(j)}}}pI(b)};var rC=Nkb(jAb,'LabelDummyRemover',484);hI(485,1,eAb,A0);_.sc=function B0(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;nI(b,'Label dummy switching',1);c=new GU;l=new GU;h=new GU;n=new GU;for(g=new Tob(a.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);for(k=new Tob(f.a);k.a<k.c.c.length;){j=Wv(Rob(k),9);if(j.g==(CX(),yX)){c.c[c.c.length]=j;h.c=xv(UF,syb,1,0,4,1);n.c=xv(UF,syb,1,0,4,1);p=j;do{p=Wv(Dm(Uh(iX(p))),12).c.f;p.g==zX&&(h.c[h.c.length]=p,true)}while(p.g==zX);s=j;do{s=Wv(Dm(Uh(mX(s))),12).d.f;s.g==zX&&(n.c[n.c.length]=s,true)}while(s.g==zX);i=h.c.length;o=n.c.length;if(i>o+1){m=(i+o)/2|0;vU(l,new RJ(j,(Cxb(m,h.c.length),Wv(h.c[m],9))))}else if(o>i+1){m=((o-i)/2|0)-1;vU(l,new RJ(j,(Cxb(m,n.c.length),Wv(n.c[m],9))))}}}}for(r=new Tob(l);r.a<r.c.c.length;){q=Wv(Rob(r),27);z0(Wv(q.a,9),Wv(q.b,9))}for(e=new Tob(c);e.a<e.c.c.length;){d=Wv(Rob(e),9);y0(d,new C0,(Rib(),rib));y0(d,new E0,qib)}pI(b)};var uC=Nkb(jAb,'LabelDummySwitcher',485);hI(486,1,Tyb,C0);_.B=function D0(a){return Wv(Dm(Uh(iX(Wv(a,9)))),12).c.f};var sC=Nkb(jAb,'LabelDummySwitcher/lambda$0$Type',486);hI(487,1,Tyb,E0);_.B=function F0(a){return Wv(Dm(Uh(mX(Wv(a,9)))),12).d.f};var tC=Nkb(jAb,'LabelDummySwitcher/lambda$1$Type',487);hI(488,1,eAb,G0);_.sc=function H0(a,b){nI(b,'Label management',1);iw(rJ(a,(bK(),aK)));pI(b)};var vC=Nkb(jAb,'LabelManagementProcessor',488);hI(489,1,eAb,S0);_.sc=function T0(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;i=Wv(rJ(a,(Mjb(),ojb)),115);nI(b,'Label side selection ('+i+')',1);j=(_b(a),new Vh(a));switch(i.e){case 0:L0(j);break;case 1:K0(j);break;case 2:O0(j);break;case 3:N0(j);break;case 4:R0(j);}for(h=new Tob(a.c);h.a<h.c.c.length;){g=Wv(Rob(h),16);for(d=new Tob(g.a);d.a<d.c.c.length;){c=Wv(Rob(d),9);for(n=new Tob(c.f);n.a<n.c.c.length;){l=Wv(Rob(n),7);for(f=new Tob(l.c);f.a<f.c.c.length;){e=Wv(Rob(f),33);gw(rJ(e,(Rib(),pib)))===gw((kP(),jP))&&sJ(e,pib,I0)}}if(c.g==(CX(),yX)){if(gw(rJ(c,(Rib(),pib)))===gw((kP(),gP))){k=Wv(rJ(c,uib),12);p=Wv(rJ(k,(eM(),dM)),15).a;o=c.j.b-Math.ceil(p/2);for(m=new Tob(c.f);m.a<m.c.c.length;){l=Wv(Rob(m),7);l.i.b=o}}}}}pI(b)};var I0;var xC=Nkb(jAb,'LabelSideSelector',489);hI(490,1,fyb,V0);_.$b=function W0(a,b){return U0(Wv(a,7),Wv(b,7))};var wC=Nkb(jAb,'LabelSideSelector/1',490);hI(495,1,eAb,Z0);_.sc=function $0(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;nI(b,'Layer constraint application',1);j=a.c;if(j.c.length==0){pI(b);return}f=(Cxb(0,j.c.length),Wv(j.c[0],16));g=Wv(yU(j,j.c.length-1),16);s=new sY(a);t=new sY(a);for(i=new Tob(j);i.a<i.c.c.length;){h=Wv(Rob(i),16);p=Wv(FU(h.a,xv(qB,Nzb,9,h.a.c.length,0,1)),51);for(m=0,o=p.length;m<o;++m){l=p[m];c=Wv(rJ(l,(Mjb(),vjb)),85);switch(c.e){case 1:rX(l,f);X0(l,false);break;case 2:rX(l,s);X0(l,true);break;case 3:rX(l,g);Y0(l);break;case 4:rX(l,t);Y0(l);}}}if(j.c.length>=2){k=true;q=(Cxb(1,j.c.length),Wv(j.c[1],16));for(n=new Tob(f.a);n.a<n.c.c.length;){l=Wv(Rob(n),9);if(gw(rJ(l,(Mjb(),vjb)))===gw((Xib(),Wib))){k=false;break}for(e=Uh(mX(l));Cm(e);){d=Wv(Dm(e),12);if(d.d.f.d==q){k=false;break}}if(!k){break}}if(k){p=Wv(FU(f.a,xv(qB,Nzb,9,f.a.c.length,0,1)),51);for(m=0,o=p.length;m<o;++m){l=p[m];rX(l,q)}BU(j,f)}}if(j.c.length>=2){k=true;r=Wv(yU(j,j.c.length-2),16);for(n=new Tob(g.a);n.a<n.c.c.length;){l=Wv(Rob(n),9);if(gw(rJ(l,(Mjb(),vjb)))===gw((Xib(),Wib))){k=false;break}for(e=Uh(iX(l));Cm(e);){d=Wv(Dm(e),12);if(d.c.f.d==r){k=false;break}}if(!k){break}}if(k){p=Wv(FU(g.a,xv(qB,Nzb,9,g.a.c.length,0,1)),51);for(m=0,o=p.length;m<o;++m){l=p[m];rX(l,r)}BU(j,g)}}j.c.length==1&&(Cxb(0,j.c.length),Wv(j.c[0],16)).a.c.length==0&&AU(j,0);s.a.c.length==0||(Fxb(0,j.c.length),fxb(j.c,0,s));t.a.c.length==0||(j.c[j.c.length]=t,true);pI(b)};var yC=Nkb(jAb,'LayerConstraintProcessor',495);hI(496,1,eAb,_0);_.sc=function a1(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;nI(b,'Layer size calculation',1);j=rAb;i=4.9E-324;for(g=new Tob(a.c);g.a<g.c.c.length;){f=Wv(Rob(g),16);h=f.c;h.a=0;h.b=0;if(f.a.c.length==0){continue}for(l=new Tob(f.a);l.a<l.c.c.length;){k=Wv(Rob(l),9);n=k.j;m=k.e;h.a=Nlb(h.a,n.a+m.b+m.c)}d=Wv(yU(f.a,0),9);o=d.i.b-d.e.d;e=Wv(yU(f.a,f.a.c.length-1),9);c=e.i.b+e.j.b+e.e.a;h.b=c-o;j=j<o?j:o;i=i>c?i:c}a.e.b=i-j;a.d.b-=j;pI(b)};var zC=Nkb(jAb,'LayerSizeAndGraphHeightCalculator',496);hI(497,1,eAb,b1);_.sc=function d1(a,b){var c,d,e,f,g;nI(b,'Edge joining',1);c=Ckb(Ixb(Xv(rJ(a,(Mjb(),gjb)))));for(e=new Tob(a.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);g=new Fnb(d.a,0);while(g.b<g.d.Y()){f=(Bxb(g.b<g.d.Y()),Wv(g.d.sb(g.c=g.b++),9));if(f.g==(CX(),zX)){c1(f,c);vnb(g)}}}pI(b)};var AC=Nkb(jAb,'LongEdgeJoiner',497);hI(498,1,eAb,e1);_.sc=function g1(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;nI(b,'Edge splitting',1);if(a.c.c.length<=2){pI(b);return}f=new Fnb(a.c,0);g=(Bxb(f.b<f.d.Y()),Wv(f.d.sb(f.c=f.b++),16));while(f.b<f.d.Y()){e=g;g=(Bxb(f.b<f.d.Y()),Wv(f.d.sb(f.c=f.b++),16));for(i=new Tob(e.a);i.a<i.c.c.length;){h=Wv(Rob(i),9);for(k=new Tob(h.f);k.a<k.c.c.length;){j=Wv(Rob(k),7);for(d=new Tob(j.e);d.a<d.c.c.length;){c=Wv(Rob(d),12);m=c.d;l=m.f.d;l!=e&&l!=g&&i1(c,(n=new uX(a),sX(n,(CX(),zX)),sJ(n,(Rib(),uib),c),sJ(n,(eM(),TL),(KM(),FM)),rX(n,g),n))}}}}pI(b)};var BC=Nkb(jAb,'LongEdgeSplitter',498);hI(499,1,eAb,k1);_.sc=function l1(a,b){var c,d,e,f,g,h,i,j;nI(b,'Node margin calculation',1);c=new rP((nW(),new wW(a,true)));oP(c);h=Wv(rJ(a,(Rib(),Jib)),15).a;for(e=new Tob(a.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);for(g=new Tob(d.a);g.a<g.c.c.length;){f=Wv(Rob(g),9);j1(f,h);i=f.e;j=Wv(rJ(f,Oib),65);i.b=Nlb(i.b,j.b);i.c=Nlb(i.c,j.c);i.a=Nlb(i.a,j.a);i.d=Nlb(i.d,j.d)}}pI(b)};var CC=Nkb(jAb,zzb,499);hI(491,1,eAb,q1);_.sc=function t1(a,b){var c,d,e,f,g,h,i,j,k,l;nI(b,'Node promotion heuristic',1);this.g=a;m1(this);this.q=Wv(rJ(a,(Mjb(),Bjb)),109);j=Wv(rJ(this.g,Cjb),24).a;e=new u1;switch(this.q.e){case 2:case 1:o1(this,e);break;case 3:this.q=(I1(),H1);o1(this,e);h=0;for(g=new Tob(this.a);g.a<g.c.c.length;){f=Wv(Rob(g),24);h=Plb(h,f.a)}if(h>this.j){this.q=B1;o1(this,e)}break;case 4:this.q=(I1(),H1);o1(this,e);i=0;for(d=new Tob(this.b);d.a<d.c.c.length;){c=Yv(Rob(d));i=Nlb(i,(Dxb(c),c))}if(i>this.k){this.q=E1;o1(this,e)}break;case 6:l=hw(Llb(this.f.length*j/100));o1(this,new w1(l));break;case 5:k=hw(Llb(this.d*j/100));o1(this,new y1(k));break;default:o1(this,e);}p1(this,a);pI(b)};_.d=0;_.e=0;_.i=0;_.j=0;_.k=0;_.n=0;var HC=Nkb(jAb,'NodePromotion',491);hI(492,1,Tyb,u1);_.B=function v1(a){return xkb(),xkb(),wkb};var DC=Nkb(jAb,'NodePromotion/lambda$0$Type',492);hI(493,1,Tyb,w1);_.B=function x1(a){return r1(this.a,a)};_.a=0;var EC=Nkb(jAb,'NodePromotion/lambda$1$Type',493);hI(494,1,Tyb,y1);_.B=function z1(a){return s1(this.a,a)};_.a=0;var FC=Nkb(jAb,'NodePromotion/lambda$2$Type',494);hI(109,17,{109:1,3:1,23:1,17:1},J1);var A1,B1,C1,D1,E1,F1,G1,H1;var GC=Okb(jAb,'NodePromotionStrategy',109,IF,K1);var L1;hI(500,1,eAb,R1);_.sc=function S1(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;nI(b,sAb,1);n=Wv(rJ(a,(eM(),uL)),122);for(e=new Tob(a.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);i=Wv(FU(d.a,xv(qB,Nzb,9,d.a.c.length,0,1)),51);for(g=0,h=i.length;g<h;++g){f=i[g];if(f.g!=(CX(),BX)){continue}if(n==(NK(),LK)){for(k=new Tob(f.f);k.a<k.c.c.length;){j=Wv(Rob(k),7);j.b.c.length==0||P1(j);j.e.c.length==0||Q1(j)}}else if(aw(rJ(f,(Rib(),uib)),12)){p=Wv(rJ(f,uib),12);q=Wv(nX(f,(sN(),rN)).mb().H(),7);r=Wv(nX(f,ZM).mb().H(),7);s=Wv(rJ(q,uib),7);t=Wv(rJ(r,uib),7);dW(p,t);eW(p,s);u=new II(r.f.i);u.a=MI(Bv(tv(qz,1),Fzb,10,0,[t.f.i,t.i,t.a])).a;QI(p.a,u);u=new II(q.f.i);u.a=MI(Bv(tv(qz,1),Fzb,10,0,[s.f.i,s.i,s.a])).a;QI(p.a,u)}else{if(f.f.c.length>=2){o=true;l=new Tob(f.f);c=Wv(Rob(l),7);while(l.a<l.c.c.length){m=c;c=Wv(Rob(l),7);if(!rb(rJ(m,uib),rJ(c,uib))){o=false;break}}}else{o=false}for(k=new Tob(f.f);k.a<k.c.c.length;){j=Wv(Rob(k),7);j.b.c.length==0||N1(j,o);j.e.c.length==0||O1(j,o)}}rX(f,null)}}pI(b)};var IC=Nkb(jAb,'NorthSouthPortPostprocessor',500);hI(501,1,eAb,X1);_.sc=function Y1(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;nI(b,sAb,1);o=new GU;u=new GU;for(j=new Tob(a.c);j.a<j.c.c.length;){i=Wv(Rob(j),16);q=-1;n=Wv(FU(i.a,xv(qB,Nzb,9,i.a.c.length,0,1)),51);for(l=0,m=n.length;l<m;++l){k=n[l];++q;if(!(k.g==(CX(),AX)&&MM(Wv(rJ(k,(eM(),TL)),28)))){continue}LM(Wv(rJ(k,(eM(),TL)),28))||W1(k);sJ(k,(Rib(),nib),k);o.c=xv(UF,syb,1,0,4,1);u.c=xv(UF,syb,1,0,4,1);c=new GU;t=new aJ;ml(t,nX(k,(sN(),$M)));U1(a,t,o,u,c);h=q;for(f=new Tob(o);f.a<f.c.c.length;){d=Wv(Rob(f),9);qX(d,h,i);++q;sJ(d,nib,k);g=Wv(yU(d.f,0),7);p=Wv(rJ(g,uib),7);Ckb(Ixb(Xv(rJ(p,(Mjb(),Djb)))))||Wv(rJ(d,oib),20).ib(k)}_I(t);for(s=nX(k,pN).mb();s.G();){r=Wv(s.H(),7);TI(t,r,t.a,t.a.a)}U1(a,t,u,null,c);for(e=new Tob(u);e.a<e.c.c.length;){d=Wv(Rob(e),9);qX(d,++q,i);sJ(d,nib,k);g=Wv(yU(d.f,0),7);p=Wv(rJ(g,uib),7);Ckb(Ixb(Xv(rJ(p,(Mjb(),Djb)))))||Wv(rJ(k,oib),20).ib(d)}c.c.length==0||sJ(k,Shb,c)}}pI(b)};var KC=Nkb(jAb,'NorthSouthPortPreprocessor',501);hI(502,1,fyb,Z1);_.$b=function $1(a,b){var c,d;return c=a.g,d=b.g,c!=d?c.e-d.e:a.k==b.k?0:c==(sN(),$M)?a.k-b.k:b.k-a.k};var JC=Nkb(jAb,'NorthSouthPortPreprocessor/lambda$0$Type',502);hI(504,1,eAb,_1);_.sc=function a2(a,b){var c,d,e,f,g,h;nI(b,'Removing partition constraint edges',1);for(d=new Tob(a.c);d.a<d.c.c.length;){c=Wv(Rob(d),16);for(f=new Tob(c.a);f.a<f.c.c.length;){e=Wv(Rob(f),9);h=new Tob(e.f);while(h.a<h.c.c.length){g=Wv(Rob(h),7);Ckb(Ixb(Xv(rJ(g,(Rib(),Aib)))))&&Sob(h)}}}pI(b)};var LC=Nkb(jAb,'PartitionPostprocessor',504);hI(505,1,eAb,c2);_.sc=function d2(a,b){var c,d,e,f,g,h,i,j,k,l;nI(b,'Adding partition constraint edges',1);this.a=new GU;for(h=new Tob(a.b);h.a<h.c.c.length;){f=Wv(Rob(h),9);e=Wv(rJ(f,(eM(),ML)),24);b2(this,e.a).ib(f)}for(d=0;d<this.a.c.length-1;d++){for(g=Wv(yU(this.a,d),20).mb();g.G();){f=Wv(g.H(),9);k=new RX;PX(k,f);QX(k,(sN(),ZM));sJ(k,(Rib(),Aib),(xkb(),xkb(),wkb));for(j=Wv(yU(this.a,d+1),20).mb();j.G();){i=Wv(j.H(),9);l=new RX;PX(l,i);QX(l,rN);sJ(l,Aib,(null,wkb));c=new hW;sJ(c,Aib,(null,wkb));sJ(c,(eM(),ZL),Elb(20));dW(c,k);eW(c,l)}}}this.a=null;pI(b)};var MC=Nkb(jAb,'PartitionPreprocessor',505);hI(506,1,eAb,f2);_.sc=function g2(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;nI(b,'Port distribution',1);c=jW(a);n=0;k=0;for(e=0,g=c.length;e<g;++e){d=c[e];for(i=0,j=d.length;i<j;++i){h=d[i];h.k=k++;for(m=new Tob(h.f);m.a<m.c.c.length;){l=Wv(Rob(m),7);l.k=n++}}}for(f=new Tob(a.c);f.a<f.c.c.length;){d=Wv(Rob(f),16);e2(d)}p=Wv(rJ(a,(Rib(),Gib)),154);o=wvb(p,1)!=0?new P9(xv(lw,tAb,26,n,12,1)):new M9(xv(lw,tAb,26,n,12,1));Z8(o,c);pI(b)};var NC=Nkb(jAb,'PortDistributionProcessor',506);hI(507,1,eAb,h2);_.sc=function i2(a,b){var c,d,e,f,g;nI(b,'Port order processing',1);g=new k2;for(d=new Tob(a.c);d.a<d.c.c.length;){c=Wv(Rob(d),16);for(f=new Tob(c.a);f.a<f.c.c.length;){e=Wv(Rob(f),9);MM(Wv(rJ(e,(eM(),TL)),28))&&Gpb(e.f,g)}}pI(b)};var PC=Nkb(jAb,'PortListSorter',507);hI(508,1,fyb,k2);_.$b=function l2(a,b){return j2(Wv(a,7),Wv(b,7))};var OC=Nkb(jAb,'PortListSorter/PortComparator',508);hI(509,1,eAb,n2);_.sc=function o2(a,b){var c,d,e,f,g;nI(b,'Port side processing',1);for(g=new Tob(a.b);g.a<g.c.c.length;){e=Wv(Rob(g),9);m2(e)}for(d=new Tob(a.c);d.a<d.c.c.length;){c=Wv(Rob(d),16);for(f=new Tob(c.a);f.a<f.c.c.length;){e=Wv(Rob(f),9);m2(e)}}pI(b)};var QC=Nkb(jAb,'PortSideProcessor',509);hI(510,1,eAb,q2);_.sc=function r2(a,b){var c,d,e,f,g,h,i,j,k,l;nI(b,'Restoring reversed edges',1);for(h=new Tob(a.c);h.a<h.c.c.length;){g=Wv(Rob(h),16);for(j=new Tob(g.a);j.a<j.c.c.length;){i=Wv(Rob(j),9);for(l=new Tob(i.f);l.a<l.c.c.length;){k=Wv(Rob(l),7);f=Wv(FU(k.e,xv(dB,gAb,12,k.e.c.length,0,1)),47);for(d=0,e=f.length;d<e;++d){c=f[d];Ckb(Ixb(Xv(rJ(c,(Rib(),Iib)))))&&cW(c,false)}}}}pI(b)};var RC=Nkb(jAb,'ReversedEdgeRestorer',510);hI(511,1,eAb,x2);_.sc=function y2(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I,J;nI(b,'Sausage Folding',1);this.b=Wv(rJ(a,(Rib(),Jib)),15).a;this.a=this.b*Wv(rJ(a,(Mjb(),Ejb)),15).a;o=t2(this,a);n=a.c.c.length;p=u2(this,a);G=n*p;e=Wv(rJ(a,(eM(),sL)),59);e==(sK(),oK)||e==pK||e==qK?(d=Wv(rJ(a,Rhb),15).a):(d=1/Wv(rJ(a,Rhb),15).a);c=G/o;if(d>c){pI(b);return}D=0;f=rAb;do{++D;c=G/D/(o*D);m=f;f=c-d<=0?0-(c-d):c-d}while(c>d);m<f&&--D;B=n/(1>D?1:D)|0;j=B;u=B;J=true;while(j<n){l=Wv(yU(a.c,j),16);C=true;s=null;t=null;K:for(I=new Tob(l.a);I.a<I.c.c.length;){H=Wv(Rob(I),9);for(h=Uh(iX(H));Cm(h);){g=Wv(Dm(h),12);if(!!s&&s!=H){C=false;break K}s=H;F=g.c.f;if(!!t&&t!=F){C=false;break K}t=F}}if(J&&C){u=0;J=false}if(j!=u){v=Wv(yU(a.c,u),16);for(r=new Tob(Ao(l.a));r.a<r.c.c.length;){q=Wv(Rob(r),9);qX(q,v.a.c.length,v);if(u==0){for(h=new Tob(Ao(iX(q)));h.a<h.c.c.length;){g=Wv(Rob(h),12);cW(g,true);sJ(a,cib,(xkb(),xkb(),wkb));v2(a,g);i=new GU;s2(a,g.c,g,i);for(A=new Tob(i);A.a<A.c.c.length;){w=Wv(Rob(A),9);qX(w,v.a.c.length-1,v)}}}}}u>=B&&(J=true);++u;++j}k=new Fnb(a.c,0);while(k.b<k.d.Y()){l=(Bxb(k.b<k.d.Y()),Wv(k.d.sb(k.c=k.b++),16));l.a.c.length==0&&vnb(k)}pI(b)};_.a=0;_.b=0;var SC=Nkb(jAb,'SausageFolding',511);hI(512,1,eAb,A2);_.sc=function B2(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;nI(b,'Self-loop processing',1);c=new GU;for(k=new Tob(a.c);k.a<k.c.c.length;){j=Wv(Rob(k),16);c.c=xv(UF,syb,1,0,4,1);for(m=new Tob(j.a);m.a<m.c.c.length;){l=Wv(Rob(m),9);for(o=new Tob(l.f);o.a<o.c.c.length;){n=Wv(Rob(o),7);i=Wv(FU(n.e,xv(dB,gAb,12,n.e.c.length,0,1)),47);for(g=0,h=i.length;g<h;++g){f=i[g];if(f.c.f!=f.d.f){continue}p=f.c;r=f.d;q=p.g;s=r.g;(q==(sN(),$M)||q==pN)&&s==rN?cW(f,false):q==pN&&s==$M?cW(f,false):q==ZM&&s!=ZM&&cW(f,false);q==ZM&&s==rN?vU(c,z2(a,f,r,p)):q==rN&&s==ZM&&vU(c,z2(a,f,p,r))}}}for(e=new Tob(c);e.a<e.c.c.length;){d=Wv(Rob(e),9);rX(d,j)}}pI(b)};var TC=Nkb(jAb,'SelfLoopProcessor',512);hI(513,1,eAb,H2);_.sc=function I2(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;nI(b,'Spline SelfLoop positioning',1);k=Wv(rJ(a,(Mjb(),Jjb)),153);for(j=new Tob(a.c);j.a<j.c.c.length;){i=Wv(Rob(j),16);for(m=new Tob(i.a);m.a<m.c.c.length;){l=Wv(Rob(m),9);g=Wv(rJ(l,(Rib(),Nib)),20);h=new GU;for(e=g.mb();e.G();){c=Wv(e.H(),75);ceb(c);if((n=pr(c.g),Ue(n,c.i),n).a.Y()==0){h.c[h.c.length]=c}else{G2(c);c.g.a.Y()==0||C2(c)}}switch(k.e){case 0:o=new Q2(l);P2(o);N2(o,h);break;case 2:for(f=new Tob(h);f.a<f.c.c.length;){c=Wv(Rob(f),75);aeb(c,(Ieb(),meb),true)}break;case 1:for(d=new Tob(h);d.a<d.c.c.length;){c=Wv(Rob(d),75);aeb(c,(Ieb(),meb),true)}}switch(k.e){case 0:case 1:F2(g);break;case 2:E2(g);}}}pI(b)};var ZC=Nkb(jAb,'SplineSelfLoopPositioner',513);hI(515,1,{},Q2);var WC=Nkb(jAb,'SplineSelfLoopPositioner/DistributedLoopSidesCalculator',515);hI(516,1,{},$2);_.d=true;var VC=Nkb(jAb,'SplineSelfLoopPositioner/DistributedLoopSidesCalculator/SortedLoopSides',516);hI(116,1,{116:1},_2);_.a=0;_.b=0;var UC=Nkb(jAb,'SplineSelfLoopPositioner/DistributedLoopSidesCalculator/SortedLoopSides/SizeOfSide',116);hI(318,1,{},g3);var a3;var XC=Nkb(jAb,'SplineSelfLoopPositioner/PortReadder',318);hI(514,1,fyb,i3);_.$b=function j3(a,b){return h3(Wv(a,75),Wv(b,75))};var YC=Nkb(jAb,'SplineSelfLoopPositioner/TextWidthComparator',514);hI(517,1,eAb,l3);_.sc=function o3(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;nI(b,'Spline SelfLoop pre-processing.',1);k=new Wub;for(m=new Tob(a.b);m.a<m.c.c.length;){l=Wv(Rob(m),9);k3(l);k.a.Q();for(h=Uh(mX(l));Cm(h);){f=Wv(Dm(h),12);bW(f)&&(n=k.a.db(f,k),n==null)}for(g=(o=(new Snb(k.a)).a.bb().mb(),new Ynb(o));g.a.G();){f=(i=Wv(g.a.H(),21),Wv(i.yb(),12));r=f.c.g;s=f.d.g;(r==(sN(),$M)&&(s==ZM||s==pN)||r==ZM&&s==pN||r==pN&&s==rN||r==rN&&(s==$M||s==ZM))&&cW(f,false)}c=n3(k,l);sJ(l,(Rib(),Nib),c);if(!LM(Wv(rJ(l,(eM(),TL)),28))){q=new vtb;for(e=new Tob(c);e.a<e.c.c.length;){d=Wv(Rob(e),75);Ue(q,Zdb(d));Ue(q,d.i)}j=new Fnb(l.f,0);while(j.b<j.d.Y()){p=(Bxb(j.b<j.d.Y()),Wv(j.d.sb(j.c=j.b++),7));q.a.R(p)&&vnb(j)}}}pI(b)};var $C=Nkb(jAb,'SplineSelfLoopPreProcessor',517);hI(518,1,eAb,u3);_.sc=function v3(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I;nI(b,'Spline SelfLoop routing',1);D=new I3;for(m=new Tob(a.c);m.a<m.c.c.length;){l=Wv(Rob(m),16);for(s=new Tob(l.a);s.a<s.c.c.length;){r=Wv(Rob(s),9);u=r.f;n=new Wub;for(d=Wv(rJ(r,(Rib(),Nib)),20).mb();d.G();){c=Wv(d.H(),75);Ue(n,c.a)}v=new GU;for(g=(t=(new Snb(n.a)).a.bb().mb(),new Ynb(t));g.a.G();){f=(h=Wv(g.a.H(),21),Wv(h.yb(),12));B=f.c;G=f.d;k=new Tob(f.c.f.f);A=0;F=0;i=0;j=0;while(i<2){e=Wv(Rob(k),7);if(B==e){A=j;++i}if(G==e){F=j;++i}++j}w=Wv(rJ(f,Mib),60);C=w==(Ieb(),neb)||w==keb?u.c.length-(F-A<0?-(F-A):F-A)+1:F-A<0?-(F-A):F-A;vU(v,new G3(A,F,C,w,f))}Gpb(v,D);p=new vtb;o=new Tob(v);if(o.a<o.c.c.length){q=t3(Wv(Rob(o),195),p);while(o.a<o.c.c.length){Afb(q,t3(Wv(Rob(o),195),p))}sJ(r,Oib,(H=new DP,I=new Bfb(r.j.a,r.j.b),H.d=Nlb(0,I.d-q.d),H.b=Nlb(0,I.b-q.b),H.a=Nlb(0,q.a-I.a),H.c=Nlb(0,q.c-I.c),H))}}}pI(b)};var fD=Nkb(jAb,'SplineSelfLoopRouter',518);hI(91,1,{91:1},w3);_.w=function x3(){return this.b+': '+this.d+' -> '+this.a+' '+zc(this.c)};_.a=0;_.b=0;_.d=0;var cD=Nkb(jAb,'SplineSelfLoopRouter/LoopPadding',91);hI(521,1,_zb,z3);_.D=function A3(a){return y3(this,Wv(a,91))};_.a=0;_.c=0;var _C=Nkb(jAb,'SplineSelfLoopRouter/LoopPadding/EnclosingPredicate',521);hI(520,1,fyb,C3);_.$b=function D3(a,b){return B3(Wv(a,91),Wv(b,91))};var aD=Nkb(jAb,'SplineSelfLoopRouter/LoopPadding/MarginComparator',520);hI(196,1,_zb,E3);_.D=function F3(a){return Wv(a,91).c==this.a};var bD=Nkb(jAb,'SplineSelfLoopRouter/LoopPadding/PortSidePredicate',196);hI(195,1,{195:1},G3);_.c=0;_.d=0;_.e=0;var eD=Nkb(jAb,'SplineSelfLoopRouter/SelfLoopEdge',195);hI(519,1,fyb,I3);_.$b=function J3(a,b){return H3(Wv(a,195),Wv(b,195))};var dD=Nkb(jAb,'SplineSelfLoopRouter/SelfLoopEdge/StepSizeComparator',519);hI(82,25,{25:1,82:1},L3);_.vc=function M3(){var a,b,c,d;for(b=WI(this.a,0);b.b!=b.d.c;){a=Wv(_ub(b),10);a.a=this.j.d}for(d=WI(this.c,0);d.b!=d.d.c;){c=Wv(_ub(d),10);c.a=this.j.d}};_.wc=function N3(){return this.b};_.xc=function O3(){return this.e};_.w=function P3(){return Ze(new Snb(this.d.a))};_.b=0;_.e=0;var gD=Nkb(vAb,'CLEdge',82);hI(93,25,{25:1,93:1},Q3);_.vc=function R3(){this.b.i.a=this.j.d+this.b.e.b};_.wc=function S3(){if(this.b.g==(CX(),xX)){return 0}return this.a};_.xc=function T3(){if(this.b.g==(CX(),xX)){return 0}return this.c};_.w=function U3(){return xb(rJ(this.b,(Rib(),uib)))};_.a=0;_.c=0;var hD=Nkb(vAb,'CLNode',93);hI(175,17,{175:1,3:1,23:1,17:1},Y3);var V3,W3;var iD=Okb(vAb,'ConstraintCalculationStrategy',175,IF,Z3);var $3;hI(125,17,{125:1,3:1,23:1,17:1},h4);var a4,b4,c4,d4,e4,f4;var jD=Okb(vAb,'GraphCompactionStrategy',125,IF,i4);var j4;hI(455,1,eAb,o4);_.sc=function p4(a,b){var c,d,e;d=Wv(rJ(a,(Mjb(),Fjb)),125);if(d==(g4(),e4)){return}nI(b,'Horizontal Compaction',1);this.a=a;e=new Q4;c=new rS(P4(e,a));pS(c,this.b);switch(Wv(rJ(a,Gjb),175).e){case 1:nS(c,l4);break;default:nS(c,(aS(),$R));}switch(d.e){case 1:hS(c);break;case 2:hS(gS(c,(sK(),pK)));break;case 3:hS(bS(gS(hS(c),(sK(),pK))));break;case 4:hS(bS(oS(gS(hS(c),(sK(),pK)),new H4)));break;case 5:hS(mS(c,m4));}gS(c,(sK(),oK));c.e=true;L4(e);pI(b)};var l4,m4;var sD=Nkb(vAb,'HorizontalGraphCompactor',455);hI(462,1,{},q4);_.tc=function r4(a,b){var c,d,e;if(aw(a,82)&&aw(b,82)&&!sr(or(Wv(a,82).d,Wv(b,82).d))){return 0}c=null;aw(a,93)&&(c=Wv(a,93).b);d=null;aw(b,93)&&(d=Wv(b,93).b);if(!!c&&c.g==(CX(),xX)||!!d&&d.g==(CX(),xX)){return 0}e=Wv(rJ(this.a.a,(Rib(),Kib)),134);return Vjb(e,c?c.g:(CX(),zX),d?d.g:(CX(),zX))};_.uc=function s4(a,b){if(aw(a,82)&&aw(b,82)&&!sr(or(Wv(a,82).d,Wv(b,82).d))){return 1}return Qlb(a.xc(),b.xc())};var kD=Nkb(vAb,'HorizontalGraphCompactor/1',462);hI(456,317,{},u4);_.Dc=function v4(a){var b,c,d;this.b=a;ES(this,new z4,this.a);ES(this,new B4,this.a);b=Uzb;for(d=new Tob(this.b.a.b);d.a<d.c.c.length;){c=Wv(Rob(d),25);if(aw(c,93)&&Wv(c,93).b.g==(CX(),xX)){continue}b=Qlb(b,Ixb(w4(this.a,c)))}b==Uzb&&(b=0);ES(this,new D4,new F4(b))};var qD=Nkb(vAb,'HorizontalGraphCompactor/EdgeAwareScanlineConstraintCalculation',456);hI(457,1,Tyb,x4);_.B=function y4(a){return w4(this,a)};var lD=Nkb(vAb,'HorizontalGraphCompactor/EdgeAwareScanlineConstraintCalculation/lambda$0$Type',457);hI(458,1,_zb,z4);_.D=function A4(a){return aw(Wv(a,25),82)};var mD=Nkb(vAb,'HorizontalGraphCompactor/EdgeAwareScanlineConstraintCalculation/lambda$1$Type',458);hI(459,1,_zb,B4);_.D=function C4(a){return aw(Wv(a,25),93)};var nD=Nkb(vAb,'HorizontalGraphCompactor/EdgeAwareScanlineConstraintCalculation/lambda$2$Type',459);hI(460,1,_zb,D4);_.D=function E4(a){return true};var oD=Nkb(vAb,'HorizontalGraphCompactor/EdgeAwareScanlineConstraintCalculation/lambda$3$Type',460);hI(461,1,Tyb,F4);_.B=function G4(a){return this.a};_.a=0;var pD=Nkb(vAb,'HorizontalGraphCompactor/EdgeAwareScanlineConstraintCalculation/lambda$4$Type',461);hI(463,1,Tyb,H4);_.B=function I4(a){return n4(),xkb(),uS(Wv(Wv(a,27).a,25).n,Wv(Wv(a,27).b,59))?vkb:wkb};var rD=Nkb(vAb,'HorizontalGraphCompactor/lambda$0$Type',463);hI(553,1,{},Q4);_.c=false;var tD=Nkb(vAb,'LGraphToCGraphTransformer',553);hI(552,1,{},U4);_.Cc=function V4(a){var b,c,d,e,f;this.a=a;this.d=new l7;this.c=xv(UD,syb,61,this.a.a.a.c.length,0,1);this.b=0;for(c=new Tob(this.a.a.a);c.a<c.c.c.length;){b=Wv(Rob(c),78);b.d=this.b;f=x7(z7(y7(new A7,this.b),b),this.d);this.c[this.b]=f;++this.b}T4(this);S4(this);R4(this);F7(W7(this.d),new sI);for(e=new Tob(this.a.a.b);e.a<e.c.c.length;){d=Wv(Rob(e),25);d.r=this.c[d.f.d].e+d.g.a;d.j.d=d.r}};_.b=0;var uD=Nkb(vAb,'NetworkSimplexCompaction',552);hI(142,1,{142:1,23:1},X4);_.F=function Y4(a){return W4(this,Wv(a,142))};_.c=false;_.d=true;_.i=0;_.j=0;_.k=0;_.n=0;var vD=Nkb(vAb,'VerticalSegment',142);hI(586,1,{},_4);_.e=false;var wD=Nkb(wAb,'AllCrossingsCounter',586);hI(339,1,{});var xD=Nkb(wAb,'BetweenLayerEdgeAllCrossingsCounter',339);hI(613,1,{},k5);_.c=0;_.e=0;_.i=0;var AD=Nkb(wAb,'BetweenLayerEdgeTwoNodeCrossingsCounter',613);hI(284,1,{284:1},r5);_.w=function s5(){return 'AdjacencyList [node='+this.d+', adjacencies= '+this.a+']'};_.b=0;_.c=0;_.f=0;var zD=Nkb(wAb,'BetweenLayerEdgeTwoNodeCrossingsCounter/AdjacencyList',284);hI(128,1,{128:1,23:1},v5);_.F=function w5(a){return t5(this,Wv(a,128))};_.w=function x5(){return 'Adjacency [position='+this.c+', cardinality='+this.a+', currentCardinality='+this.b+']'};_.a=0;_.b=0;_.c=0;var yD=Nkb(wAb,'BetweenLayerEdgeTwoNodeCrossingsCounter/AdjacencyList/Adjacency',128);hI(610,339,{},y5);_.Gc=function z5(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb;eb=0;for(I=0,L=a.length;I<L;++I){G=a[I];if(LM(Wv(rJ(G,(eM(),TL)),28))){for(U=new Tob(G.f);U.a<U.c.c.length;){T=Wv(Rob(U),7);W=0;for(g=new Tob(T.e);g.a<g.c.c.length;){f=Wv(Rob(g),12);G.d!=f.d.f.d&&++W}W>0&&(this.a[T.k]=eb++)}}else{N=0;for(U=new Tob(G.f);U.a<U.c.c.length;){T=Wv(Rob(U),7);for(g=new Tob(T.e);g.a<g.c.c.length;){f=Wv(Rob(g),12);G.d!=f.d.f.d&&++N}this.a[T.k]=eb}N>0&&++eb}}jb=0;for(J=0,M=b.length;J<M;++J){G=b[J];if(LM(Wv(rJ(G,(eM(),TL)),28))){O=0;for(U=new Tob(G.f);U.a<U.c.c.length;){T=Wv(Rob(U),7);if(T.g==(sN(),$M)){for(g=new Tob(T.b);g.a<g.c.c.length;){f=Wv(Rob(g),12);if(G.d!=f.c.f.d){++O;break}}}else{break}}Q=0;X=new Fnb(G.f,G.f.c.length);while(X.b>0){T=(Bxb(X.b>0),Wv(X.a.sb(X.c=--X.b),7));W=0;for(g=new Tob(T.b);g.a<g.c.c.length;){f=Wv(Rob(g),12);G.d!=f.c.f.d&&++W}if(W>0){if(T.g==(sN(),$M)){this.a[T.k]=jb;++jb}else{this.a[T.k]=jb+O+Q;++Q}}}jb+=Q}else{N=0;for(U=new Tob(G.f);U.a<U.c.c.length;){T=Wv(Rob(U),7);for(g=new Tob(T.b);g.a<g.c.c.length;){f=Wv(Rob(g),12);G.d!=f.c.f.d&&++N}this.a[T.k]=jb}N>0&&++jb}}V=new ntb;p=new vtb;for(H=0,K=a.length;H<K;++H){G=a[H];for(hb=new Tob(G.f);hb.a<hb.c.c.length;){gb=Wv(Rob(hb),7);for(g=new Tob(gb.e);g.a<g.c.c.length;){f=Wv(Rob(g),12);lb=f.d;if(G.d!=lb.f.d){fb=Wv(re(Ktb(V.d,gb)),204);kb=Wv(re(Ktb(V.d,lb)),204);if(!fb&&!kb){o=new B5;p.a.db(o,p);QI(o.a,f);QI(o.e,gb);Ltb(V.d,gb,o);QI(o.e,lb);Ltb(V.d,lb,o)}else if(!fb){QI(kb.a,f);QI(kb.e,gb);Ltb(V.d,gb,kb)}else if(!kb){QI(fb.a,f);QI(fb.e,lb);Ltb(V.d,lb,fb)}else if(fb==kb){QI(fb.a,f)}else{QI(fb.a,f);for(S=WI(kb.e,0);S.b!=S.d.c;){R=Wv(_ub(S),7);Ltb(V.d,R,fb)}Ue(fb.a,kb.a);Ue(fb.e,kb.e);p.a.eb(kb)!=null}}}}}q=Wv(Ye(p,xv(CD,{675:1,3:1,5:1,6:1},204,p.a.Y(),0,1)),675);F=a[0].d;db=b[0].d;for(m=0,n=q.length;m<n;++m){l=q[m];l.f=eb;l.g=jb;for(U=WI(l.e,0);U.b!=U.d.c;){T=Wv(_ub(U),7);Y=this.a[T.k];if(T.f.d==F){if(Y<l.f){l.f=Y;l.b=txb(T)}Y>l.c&&(l.c=Y)}else if(T.f.d==db){Y<l.g&&(l.g=Y);Y>l.d&&(l.d=Y)}}}ipb(q,0,q.length,(hsb(),hsb(),gsb));ib=xv(mw,Yyb,26,q.length,12,1);c=xv(mw,Yyb,26,jb+1,12,1);for(s=0;s<q.length;s++){ib[s]=q[s].g;c[ib[s]]=1}e=0;for(t=0;t<c.length;t++){c[t]==1?(c[t]=e):--e}Z=0;for(u=0;u<ib.length;u++){ib[u]+=c[ib[u]];Z=Plb(Z,ib[u]+1)}k=1;while(k<Z){k*=2}nb=2*k-1;k-=1;mb=xv(mw,Yyb,26,nb,12,1);d=0;for(i=0,j=ib.length;i<j;++i){h=ib[i];w=h+k;++mb[w];while(w>0){w%2>0&&(d+=mb[w+1]);w=(w-1)/2|0;++mb[w]}}D=xv(BD,syb,158,q.length*2,0,1);for(v=0;v<q.length;v++){D[2*v]=new E5(q[v],q[v].f,q[v].c,0);D[2*v+1]=new E5(q[v],q[v].c,q[v].f,1)}ipb(D,0,D.length,(null,gsb));P=0;for(B=0,C=D.length;B<C;++B){A=D[B];switch(A.d){case 0:++P;break;case 1:--P;d+=P;}}cb=xv(BD,syb,158,q.length*2,0,1);for(r=0;r<q.length;r++){cb[2*r]=new E5(q[r],q[r].g,q[r].d,0);cb[2*r+1]=new E5(q[r],q[r].d,q[r].g,1)}ipb(cb,0,cb.length,(null,gsb));P=0;for(ab=0,bb=cb.length;ab<bb;++ab){$=cb[ab];switch($.d){case 0:++P;break;case 1:--P;d+=P;}}return d};var DD=Nkb(wAb,'BetweenLayerHyperedgeAllCrossingsCounter',610);hI(204,1,{204:1,23:1},B5);_.F=function C5(a){return A5(this,Wv(a,204))};_.b=0;_.c=0;_.d=0;_.f=0;_.g=0;var CD=Nkb(wAb,'BetweenLayerHyperedgeAllCrossingsCounter/Hyperedge',204);hI(158,1,{158:1,23:1},E5);_.F=function F5(a){return D5(this,Wv(a,158))};_.b=0;_.c=0;_.d=0;var BD=Nkb(wAb,'BetweenLayerHyperedgeAllCrossingsCounter/HyperedgeCorner',158);hI(611,339,{},H5);_.Gc=function J5(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B;B=0;f=0;h=a[0].d;u=b[0].d;for(k=0,m=b.length;k<m;++k){i=b[k];if(LM(Wv(rJ(i,(eM(),TL)),28))){o=0;for(r=new Tob(i.f);r.a<r.c.c.length;){q=Wv(Rob(r),7);if(q.g==(sN(),$M)){for(e=new Tob(q.b);e.a<e.c.c.length;){d=Wv(Rob(e),12);if(d.c.f.d==h){++o;break}}}else{break}}p=0;t=new Fnb(i.f,i.f.c.length);while(t.b>0){q=(Bxb(t.b>0),Wv(t.a.sb(t.c=--t.b),7));s=0;for(e=new Tob(q.b);e.a<e.c.c.length;){d=Wv(Rob(e),12);d.c.f.d==h&&++s}if(s>0){if(q.g==(sN(),$M)){this.a[q.k]=B;++B}else{this.a[q.k]=B+o+p;++p}f+=s}}B+=p}else{n=0;for(r=new Tob(i.f);r.a<r.c.c.length;){q=Wv(Rob(r),7);for(e=new Tob(q.b);e.a<e.c.c.length;){d=Wv(Rob(e),12);d.c.f.d==h&&++n}this.a[q.k]=B}if(n>0){++B;f+=n}}}v=xv(mw,Yyb,26,f,12,1);g=0;for(j=0,l=a.length;j<l;++j){i=a[j];if(LM(Wv(rJ(i,(eM(),TL)),28))){for(r=new Tob(i.f);r.a<r.c.c.length;){q=Wv(Rob(r),7);w=g;for(e=new Tob(q.e);e.a<e.c.c.length;){d=Wv(Rob(e),12);A=d.d;A.f.d==u&&K5(v,w,g++,this.a[A.k])}}}else{w=g;for(r=new Tob(i.f);r.a<r.c.c.length;){q=Wv(Rob(r),7);for(e=new Tob(q.e);e.a<e.c.c.length;){d=Wv(Rob(e),12);A=d.d;A.f.d==u&&K5(v,w,g++,this.a[A.k])}}}}c=G5(B,f,v);return c};var ED=Nkb(wAb,'BetweenLayerStraightEdgeAllCrossingsCounter',611);hI(338,1,{},N5);_.b=0;_.e=false;var FD=Nkb(wAb,'CrossingMatrixFiller',338);hI(447,1,eAb,$5);_.sc=function _5(a,b){var c,d,e,f;nI(b,'Greedy switch crossing reduction',1);this.e=Wv(rJ(a,(Mjb(),tjb)),110);c=a.c.c.length;if(c<2||this.e==(zhb(),rhb)){pI(b);return}Q5(this,a);this.e.b?(this.e.a?R5(this):Z5(this),d=P5(this),e=this.e.a?this.c:Z4(this.b,this.d),this.i=!this.i,this.d=this.g,this.e.a?R5(this):Z5(this),f=this.e.a?this.c:Z4(this.b,this.d),e<=f&&S5(this,d),undefined):this.e.a?R5(this):Z5(this);T5(this,this.a);pI(b)};_.c=0;_.i=true;var GD=Nkb(wAb,'GreedySwitchProcessor',447);hI(340,1,{},k6);var HD=Nkb(wAb,'InLayerEdgeAllCrossingsCounter',340);hI(614,340,{},r6);_.b=0;_.d=0;var JD=Nkb(wAb,'InLayerEdgeTwoNodeCrossingCounter',614);hI(226,1,{226:1,23:1},t6);_.F=function u6(a){return s6(this,Wv(a,226))};_.w=function v6(){return 'ComparableEdgeAndPort [port='+this.b+', edge='+this.a+', portPosition='+this.c+']'};_.c=0;var ID=Nkb(wAb,'InLayerEdgeTwoNodeCrossingCounter/ComparableEdgeAndPort',226);hI(612,1,{},F6);_.e=true;_.f=0;_.g=0;_.k=false;var KD=Nkb(wAb,'NorthSouthEdgeAllCrossingsCounter',612);hI(615,1,{},R6);_.b=0;_.d=0;_.e=false;var LD=Nkb(wAb,'NorthSouthEdgeNeighbouringNodeCrossingsCounter',615);hI(143,1,Oyb,U6);_.mb=function V6(){return T6(this)};_.b=0;var ND=Nkb(wAb,'PortIterable',143);hI(344,1,Ayb,W6);_.H=function Y6(){return Wv(Dnb(this.a),7)};_.G=function X6(){return this.a.b>0};_.I=function Z6(){throw new Hmb};var MD=Nkb(wAb,'PortIterable/1',344);hI(336,1,{},b7);var OD=Nkb(wAb,'SwitchDecider',336);hI(89,1,{89:1},d7);_.w=function e7(){return 'NEdge[id='+this.b+' w='+this.f+' d='+this.a+']'};_.a=1;_.b=0;_.e=false;_.f=0;var QD=Nkb(yAb,'NEdge',89);hI(157,1,{},k7);var PD=Nkb(yAb,'NEdge/NEdgeBuilder',157);hI(278,1,{},l7);var RD=Nkb(yAb,'NGraph',278);hI(61,1,{61:1},n7);_.b=0;_.d=-1;_.e=0;_.i=-1;_.j=false;var UD=Nkb(yAb,'NNode',61);hI(333,13,bAb,q7);_.rb=function r7(a,b){++this.d;Fxb(a,this.c.length);fxb(this.c,a,b)};_.ib=function s7(a){return o7(this,a)};_.jb=function t7(a){++this.d;return xU(this,a)};_.Q=function u7(){++this.d;this.c=xv(UF,syb,1,0,4,1)};_.vb=function v7(a){++this.d;return AU(this,a)};_.nb=function w7(a){return p7(this,a)};var SD=Nkb(yAb,'NNode/ChangeAwareArrayList',333);hI(199,1,{},A7);var TD=Nkb(yAb,'NNode/NNodeBuilder',199);hI(595,1,{},V7);_.a=false;_.f=$xb;_.j=0;var VD=Nkb(yAb,'NetworkSimplex',595);hI(193,17,{180:1,193:1,3:1,23:1,17:1},$7);_.rc=function _7(){switch(this.e){case 0:return new g8;case 1:return new m8;default:throw new slb('No implementation is available for the cycle breaker '+(this.d!=null?this.d:''+this.e));}};var X7,Y7;var WD=Okb(AAb,'CycleBreakingStrategy',193,IF,a8);var b8;hI(539,1,BAb,g8);_.qc=function h8(a){return d8};_.sc=function i8(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I,J;nI(b,'Greedy cycle removal',1);r=a.b;J=r.c.length;this.a=xv(mw,Yyb,26,J,12,1);this.c=xv(mw,Yyb,26,J,12,1);this.b=xv(mw,Yyb,26,J,12,1);h=0;for(p=new Tob(r);p.a<p.c.c.length;){n=Wv(Rob(p),9);n.k=h;for(w=new Tob(n.f);w.a<w.c.c.length;){u=Wv(Rob(w),7);for(f=new Tob(u.b);f.a<f.c.c.length;){c=Wv(Rob(f),12);if(c.c.f==n){continue}C=Wv(rJ(c,(Rib(),Eib)),24).a;this.a[h]+=C>0?C+1:1}for(e=new Tob(u.e);e.a<e.c.c.length;){c=Wv(Rob(e),12);if(c.d.f==n){continue}C=Wv(rJ(c,(Rib(),Eib)),24).a;this.c[h]+=C>0?C+1:1}}this.c[h]==0?QI(this.d,n):this.a[h]==0&&QI(this.e,n);++h}m=-1;l=1;j=new GU;D=Wv(rJ(a,(Rib(),Gib)),154);while(J>0){while(this.d.b!=0){G=Wv(YI(this.d),9);this.b[G.k]=m--;f8(this,G);--J}while(this.e.b!=0){H=Wv(YI(this.e),9);this.b[H.k]=l++;f8(this,H);--J}if(J>0){k=eyb;for(q=new Tob(r);q.a<q.c.c.length;){n=Wv(Rob(q),9);if(this.b[n.k]==0){s=this.c[n.k]-this.a[n.k];if(s>=k){if(s>k){j.c=xv(UF,syb,1,0,4,1);k=s}j.c[j.c.length]=n}}}i=Wv(yU(j,vvb(D,j.c.length)),9);this.b[i.k]=l++;f8(this,i);--J}}F=r.c.length+1;for(h=0;h<r.c.length;h++){this.b[h]<0&&(this.b[h]+=F)}for(o=new Tob(r);o.a<o.c.c.length;){n=Wv(Rob(o),9);B=Wv(FU(n.f,xv(BB,mAb,7,n.f.c.length,0,1)),346);for(v=0,A=B.length;v<A;++v){u=B[v];t=Wv(FU(u.e,xv(dB,gAb,12,u.e.c.length,0,1)),47);for(d=0,g=t.length;d<g;++d){c=t[d];I=c.d.f.k;if(this.b[n.k]>this.b[I]){cW(c,true);sJ(a,cib,(xkb(),xkb(),wkb))}}}}this.a=null;this.c=null;this.b=null;_I(this.e);_I(this.d);pI(b)};var d8;var XD=Nkb(AAb,'GreedyCycleBreaker',539);hI(540,1,BAb,m8);_.qc=function n8(a){return j8};_.sc=function o8(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;nI(b,'Interactive cycle breaking',1);k=new GU;for(m=new Tob(a.b);m.a<m.c.c.length;){l=Wv(Rob(m),9);l.k=1;n=kX(l).a;for(j=oX(l,(djb(),bjb)).mb();j.G();){i=Wv(j.H(),7);for(e=new Tob(i.e);e.a<e.c.c.length;){c=Wv(Rob(e),12);o=c.d.f;if(o!=l){p=kX(o).a;p<n&&(k.c[k.c.length]=c,true)}}}}for(f=new Tob(k);f.a<f.c.c.length;){c=Wv(Rob(f),12);cW(c,true)}k.c=xv(UF,syb,1,0,4,1);for(h=new Tob(a.b);h.a<h.c.c.length;){g=Wv(Rob(h),9);g.k>0&&l8(this,g,k)}for(d=new Tob(k);d.a<d.c.c.length;){c=Wv(Rob(d),12);cW(c,true)}k.c=xv(UF,syb,1,0,4,1);pI(b)};var j8;var YD=Nkb(AAb,'InteractiveCycleBreaker',540);hI(543,1,BAb,q8);_.qc=function r8(a){return TQ(RQ(new WQ,(d0(),z_)),I_)};_.sc=function s8(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;nI(b,'Interactive node layering',1);c=new GU;for(l=new Tob(a.b);l.a<l.c.c.length;){j=Wv(Rob(l),9);h=j.i.a;g=h+j.j.a;g=h+1>g?h+1:g;p=new Fnb(c,0);d=null;while(p.b<p.d.Y()){n=(Bxb(p.b<p.d.Y()),Wv(p.d.sb(p.c=p.b++),239));if(n.c>=g){Bxb(p.b>0);p.a.sb(p.c=--p.b);break}else if(n.a>h){if(!d){vU(n.b,j);n.c=Qlb(n.c,h);n.a=Nlb(n.a,g);d=n}else{xU(d.b,n.b);d.a=Nlb(d.a,n.a);vnb(p)}}}if(!d){d=new t8;d.c=h;d.a=g;Anb(p,d);vU(d.b,j)}}f=a.c;i=0;for(o=new Tob(c);o.a<o.c.c.length;){n=Wv(Rob(o),239);e=new sY(a);e.k=i++;f.c[f.c.length]=e;for(m=new Tob(n.b);m.a<m.c.c.length;){j=Wv(Rob(m),9);rX(j,e);j.k=0}}for(k=new Tob(a.b);k.a<k.c.c.length;){j=Wv(Rob(k),9);j.k==0&&p8(this,j,a)}while((Cxb(0,f.c.length),Wv(f.c[0],16)).a.c.length==0){Cxb(0,f.c.length);f.c.splice(0,1)}a.b.c=xv(UF,syb,1,0,4,1);pI(b)};var $D=Nkb(CAb,'InteractiveLayerer',543);hI(239,1,{239:1},t8);_.a=0;_.c=0;var ZD=Nkb(CAb,'InteractiveLayerer/LayerSpan',239);hI(173,17,{180:1,173:1,3:1,23:1,17:1},y8);_.rc=function z8(){switch(this.e){case 0:return new U8;case 1:return new J8;case 2:return new q8;default:throw new slb('No implementation is available for the layerer '+(this.d!=null?this.d:''+this.e));}};var u8,v8,w8;var _D=Okb(CAb,'LayeringStrategy',173,IF,A8);var B8;hI(542,1,BAb,J8);_.qc=function K8(a){var b;b=XQ(D8);Ckb(Ixb(Xv(rJ(a,(Mjb(),njb)))))||gw(rJ(a,Ljb))===gw((ckb(),_jb))?QQ(b,E8):gw(rJ(a,Ljb))===gw((ckb(),akb))&&QQ(b,F8);Ckb(Ixb(Xv(rJ(a,Ijb))))&&UQ(b,(d0(),Y_));return b};_.sc=function L8(a,b){var c,d,e,f,g;nI(b,'Longest path layering',1);this.a=a;g=this.a.b;this.b=xv(mw,Yyb,26,g.c.length,12,1);c=0;for(f=new Tob(g);f.a<f.c.c.length;){d=Wv(Rob(f),9);d.k=c;this.b[c]=-1;++c}for(e=new Tob(g);e.a<e.c.c.length;){d=Wv(Rob(e),9);I8(this,d)}g.c=xv(UF,syb,1,0,4,1);this.a=null;this.b=null;pI(b)};var D8,E8,F8;var aE=Nkb(CAb,'LongestPathLayerer',542);hI(541,1,BAb,U8);_.qc=function V8(a){var b;b=XQ(M8);if(Ckb(Ixb(Xv(rJ(a,(Mjb(),njb)))))||gw(rJ(a,Ljb))===gw((ckb(),_jb))){QQ(b,N8);this.d=(ckb(),_jb)}else if(gw(rJ(a,Ljb))===gw((ckb(),akb))){QQ(b,O8);this.d=akb}return b};_.sc=function W8(a,b){var c,d,e,f,g,h,i,j,k,l;nI(b,'Network simplex layering',1);this.b=a;l=Wv(rJ(a,(Mjb(),Kjb)),24).a*4;k=this.b.b;if(k.c.length<1){pI(b);return}for(d=WI(Q8(this,k),0);d.b!=d.d.c;){c=Wv(_ub(d),20);f=l*hw(Tlb(c.Y()));e=T8(c);F7(S7(U7(T7(W7(e),f),this.b),this.d==(ckb(),_jb)),rI(b,1));h=this.b.c;for(j=new Tob(e.a);j.a<j.c.c.length;){i=Wv(Rob(j),61);while(h.c.length<=i.e){uU(h,h.c.length,new sY(this.b))}g=Wv(i.f,9);rX(g,Wv(yU(h,i.e),16))}}k.c=xv(UF,syb,1,0,4,1);this.a=null;this.b=null;this.c=null;pI(b)};var M8,N8,O8;var bE=Nkb(CAb,'NetworkSimplexLayerer',541);hI(326,1,{});var dE=Nkb(EAb,'AbstractPortDistributor',326);hI(558,1,fyb,a9);_.$b=function b9(a,b){return _8(this,Wv(a,7),Wv(b,7))};var cE=Nkb(EAb,'AbstractPortDistributor/1',558);hI(564,1,{},j9);var gE=Nkb(EAb,'BarycenterHeuristic',564);hI(272,1,{272:1},k9);_.b=0;_.d=0;_.e=false;var eE=Nkb(EAb,'BarycenterHeuristic/BarycenterState',272);hI(565,1,fyb,l9);_.$b=function m9(a,b){return f9(this.a,a,b)};var fE=Nkb(EAb,'BarycenterHeuristic/lambda$0$Type',565);hI(192,17,{180:1,192:1,3:1,23:1,17:1},q9);_.rc=function r9(){switch(this.e){case 0:return new I9;case 1:return new y9;default:throw new slb('No implementation is available for the crossing minimizer '+(this.d!=null?this.d:''+this.e));}};var n9,o9;var hE=Okb(EAb,'CrossingMinimizationStrategy',192,IF,s9);var t9;hI(526,1,BAb,y9);_.qc=function z9(a){var b;b=XQ(v9);Wv(rJ(a,(Rib(),jib)),18).kb((ohb(),khb))&&TQ(b,(d0(),V_));return b};_.sc=function A9(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;nI(b,'Interactive crossing minimization',1);m=0;for(e=new Tob(a.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);c=0;j=0;for(i=new Tob(d.a);i.a<i.c.c.length;){g=Wv(Rob(i),9);if(g.i.a>0){c+=g.i.a+g.j.a/2;++j}for(l=new Tob(g.f);l.a<l.c.c.length;){k=Wv(Rob(l),7);k.k=m++}}c/=j;o=xv(kw,hyb,26,d.a.c.length,12,1);f=0;for(h=new Tob(d.a);h.a<h.c.c.length;){g=Wv(Rob(h),9);g.k=f++;o[g.k]=x9(g,c);g.g==(CX(),zX)&&sJ(g,(Rib(),wib),o[g.k])}Gpb(d.a,new C9(o))}n=new P9(xv(lw,tAb,26,m,12,1));Z8(n,jW(a));pI(b)};var v9;var jE=Nkb(EAb,'InteractiveCrossingMinimizer',526);hI(527,1,fyb,C9);_.$b=function D9(a,b){return B9(this,Wv(a,9),Wv(b,9))};var iE=Nkb(EAb,'InteractiveCrossingMinimizer/1',527);hI(525,1,BAb,I9);_.qc=function K9(a){var b;b=XQ(E9);Wv(rJ(a,(Rib(),jib)),18).kb((ohb(),khb))&&TQ(b,(d0(),V_));return b};_.sc=function L9(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H;nI(b,'Layer sweep crossing minimization',1);F=Wv(rJ(a,(Rib(),Gib)),154);q=a.c.c.length;if(q<2){pI(b);return}G9(this,a);d=$xb;H=Wv(rJ(a,(Mjb(),Kjb)),24).a;c=xv(eE,Txb,671,a.c.c.length,0,2);m=0;for(p=new Tob(a.c);p.a<p.c.c.length;){o=Wv(Rob(p),16);o.k=m;c[m]=xv(eE,{671:1,3:1,5:1,6:1},272,o.a.c.length,0,1);n=0;for(v=new Tob(o.a);v.a<v.c.c.length;){u=Wv(Rob(v),9);u.k=n;c[m][n]=new k9(u);++n}++m}e=new X9(c,this.g);f=new j9(c,e,F,this.j);A=new P9(this.j);t=new M9(this.j);for(G=0;G<H&&d>0;G++){k=wvb(F,1)!=0;j=k?0:q-1;i=this.b[j];C=wvb(F,1)!=0?A:t;H9(i,f,k,false,true);g=$xb;h=true;do{J9(this.b,this.k);D=g;g=0;g+=bab(this.f,i,j);if(k){for(r=1;r<q;r++){l=this.b[r];X8(C,i,(djb(),bjb));H9(l,f,true,!h,false);g+=bab(this.f,l,r);this.d[r]||this.c[r-1]?(g+=lab(this.e,i,l)):(g+=hab(this.i,i,l));i=l}j=q-1}else{for(r=q-2;r>=0;r--){l=this.b[r];X8(C,i,(djb(),ajb));H9(l,f,false,!h,false);g+=bab(this.f,l,r);this.c[r]||this.d[r+1]?(g+=lab(this.e,l,i)):(g+=hab(this.i,l,i));i=l}j=0}h=false;k=!k}while(g<D&&g>0);if(g<d||D<d){if(g<=D){J9(this.b,this.a);d=g}else{J9(this.k,this.a);d=D}}}s=new Fnb(a.c,0);while(s.b<s.d.Y()){o=(Bxb(s.b<s.d.Y()),Wv(s.d.sb(s.c=s.b++),16));B=this.a[s.b-1];w=new Fnb(o.a,0);while(w.b<w.d.Y()){Bxb(w.b<w.d.Y());w.d.sb(w.c=w.b++);Enb(w,B[w.b-1])}}this.j=null;this.a=null;this.b=null;this.k=null;this.i=null;this.e=null;this.c=null;this.d=null;Pm(this.g);pI(b)};var E9;var kE=Nkb(EAb,'LayerSweepCrossingMinimizer',525);hI(327,326,{},M9);_.Hc=function N9(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o;m=this.a;if(LM(Wv(rJ(a,(eM(),TL)),28))){switch(c.e){case 1:{e=0;h=0;for(l=new Tob(a.f);l.a<l.c.c.length;){j=Wv(Rob(l),7);if(j.b.c.length!=0){++e;j.g==(sN(),$M)&&++h}}i=b+h;o=b+e;for(k=oX(a,(djb(),ajb)).mb();k.G();){j=Wv(k.H(),7);if(j.g==(sN(),$M)){m[j.k]=i;--i}else{m[j.k]=o;--o}}return e}case 2:{n=0;for(k=oX(a,(djb(),bjb)).mb();k.G();){j=Wv(k.H(),7);++n;m[j.k]=b+n}return n}default:throw new rlb;}}else{g=4;f=0;for(l=oX(a,c).mb();l.G();){j=Wv(l.H(),7);d=O9(c,j.g);g=g<d-1?g:d-1;f=f>d?f:d}if(f>g){for(k=oX(a,c).mb();k.G();){j=Wv(k.H(),7);m[j.k]=b+O9(c,j.g)-g}return f-g}return 0}};var lE=Nkb(EAb,'LayerTotalPortDistributor',327);hI(274,326,{},P9);_.Hc=function Q9(a,b,c){var d,e,f,g,h,i,j,k,l,m,n;l=this.a;if(LM(Wv(rJ(a,(eM(),TL)),28))){switch(c.e){case 1:{e=0;f=0;for(k=new Tob(a.f);k.a<k.c.c.length;){i=Wv(Rob(k),7);if(i.b.c.length!=0){++e;i.g==(sN(),$M)&&++f}}d=1/(e+1);g=b+f*d;n=b+1-d;for(j=oX(a,(djb(),ajb)).mb();j.G();){i=Wv(j.H(),7);if(i.g==(sN(),$M)){l[i.k]=g;g-=d}else{l[i.k]=n;n-=d}}break}case 2:{h=0;for(k=new Tob(a.f);k.a<k.c.c.length;){i=Wv(Rob(k),7);i.e.c.length==0||++h}d=1/(h+1);m=b+d;for(j=oX(a,(djb(),bjb)).mb();j.G();){i=Wv(j.H(),7);l[i.k]=m;m+=d}break}default:throw new slb(GAb);}}else{for(j=oX(a,c).mb();j.G();){i=Wv(j.H(),7);l[i.k]=b+R9(c,i.g)}}return 1};var mE=Nkb(EAb,'NodeRelativePortDistributor',274);hI(566,1,{},X9);var oE=Nkb(KAb,'ForsterConstraintResolver',566);hI(102,1,{102:1},$9,_9);_.w=function aab(){var a,b;b=new zmb;b.a+='[';for(a=0;a<this.d.length;a++){ymb(b,tX(this.d[a]));W9(this.g,this.d[0]).a!=null&&ymb(ymb((b.a+='<',b),ilb(Ixb(W9(this.g,this.d[0]).a))),'>');a<this.d.length-1&&(b.a+=', ',b)}return b.a+=']',b.a};_.a=0;_.c=0;_.f=0;var nE=Nkb(KAb,'ForsterConstraintResolver/ConstraintGroup',102);hI(331,1,{});var pE=Nkb(LAb,'AbstractCrossingsCounter',331);hI(568,331,{},iab);var qE=Nkb(LAb,'BarthJuengerMutzelCrossingsCounter',568);hI(567,331,{},mab);var uE=Nkb(LAb,'HyperedgeCrossingsCounter',567);hI(197,1,{197:1,23:1},oab);_.F=function pab(a){return nab(this,Wv(a,197))};_.b=0;_.c=0;_.e=0;_.f=0;var tE=Nkb(LAb,'HyperedgeCrossingsCounter/Hyperedge',197);hI(156,1,{156:1,23:1},rab);_.F=function sab(a){return qab(this,Wv(a,156))};_.b=0;_.c=0;var sE=Nkb(LAb,'HyperedgeCrossingsCounter/HyperedgeCorner',156);hI(242,17,{242:1,3:1,23:1,17:1},wab);var tab,uab;var rE=Okb(LAb,'HyperedgeCrossingsCounter/HyperedgeCorner/Type',242,IF,xab);hI(545,1,BAb,Bab);_.qc=function Cab(a){return Wv(rJ(a,(Rib(),jib)),18).kb((ohb(),hhb))?yab:null};_.sc=function Dab(a,b){var c,d;nI(b,'Interactive node placement',1);this.a=Wv(rJ(a,(Rib(),Kib)),134);for(d=new Tob(a.c);d.a<d.c.c.length;){c=Wv(Rob(d),16);Aab(this,c)}pI(b)};var yab;var vE=Nkb(MAb,'InteractiveNodePlacer',545);hI(546,1,BAb,Qab);_.qc=function Rab(a){return Wv(rJ(a,(Rib(),jib)),18).kb((ohb(),hhb))?Eab:null};_.sc=function Sab(a,b){nI(b,'Linear segments node placement',1);this.b=Wv(rJ(a,(Rib(),Kib)),134);Pab(this,a);Lab(this,a);Iab(this,a);Oab(this);this.a=null;this.b=null;pI(b)};var Eab,Fab,Gab;var xE=Nkb(MAb,'LinearSegmentsNodePlacer',546);hI(111,1,{111:1,23:1},Wab);_.F=function Xab(a){return Tab(this,Wv(a,111))};_.t=function Yab(a){var b;if(aw(a,111)){b=Wv(a,111);return this.b==b.b}return false};_.v=function Zab(){return this.b};_.w=function $ab(){return 'ls'+Ze(this.f)};_.a=0;_.b=0;_.c=-1;_.d=-1;_.i=0;var wE=Nkb(MAb,'LinearSegmentsNodePlacer/LinearSegment',111);hI(548,1,BAb,cbb);_.qc=function dbb(a){return Wv(rJ(a,(Rib(),jib)),18).kb((ohb(),hhb))?_ab:null};_.sc=function ebb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I,J;H=Wv(rJ(a,(Rib(),Kib)),134);u=(mp(),new ntb);t=0;e=new l7;for(i=new Tob(a.c);i.a<i.c.c.length;){g=Wv(Rob(i),16);D=null;C=null;for(n=new Tob(g.a);n.a<n.c.c.length;){m=Wv(Rob(n),9);++t;s=x7(new A7,e);s.f=m;Ltb(u.d,m,s);m.e.d=Llb(m.e.d);if(C){r=new d7;r.f=0;r.a=hw(Mlb(D.e.d+D.j.b+D.e.a+Xjb(H,Wv(C.f,9),m)));r.c=C;r.d=s;o7(C.g,r);o7(s.c,r)}D=m;C=s}}for(j=new Tob(a.c);j.a<j.c.c.length;){g=Wv(Rob(j),16);for(n=new Tob(g.a);n.a<n.c.c.length;){m=Wv(Rob(n),9);for(A=new Tob(m.f);A.a<A.c.c.length;){w=Wv(Rob(A),7);J=w.i.b+w.a.b;if(J!=Math.floor(J)){v=J-ZH(TH(Math.round(J)));w.i.b-=v}}}}for(h=new Tob(a.c);h.a<h.c.c.length;){g=Wv(Rob(h),16);for(n=new Tob(g.a);n.a<n.c.c.length;){m=Wv(Rob(n),9);for(l=Uh(mX(m));Cm(l);){k=Wv(Dm(l),12);if(bW(k)){continue}if(k.d.f.d==g){continue}G=k.c.f.e.d+k.c.i.b+k.c.a.b;I=k.d.f.e.d+k.d.i.b+k.d.a.b;c=I-G;B=hw(c);d=x7(new A7,e);o=new d7;o.f=bbb(k);o.a=B>0?B:0;o.c=d;o.d=Wv(Smb(u,k.c.f),61);o7(o.c.g,o);o7(o.d.c,o);F=new d7;F.f=bbb(k);F.a=B<0?-B:0;F.c=d;F.d=Wv(Smb(u,k.d.f),61);o7(F.c.g,F);o7(F.d.c,F)}}}f=Wv(rJ(a,(Mjb(),Kjb)),24).a*hw(Math.sqrt(t));F7(S7(T7(W7(e),f),false),rI(b,1));for(q=new Tob(e.a);q.a<q.c.c.length;){p=Wv(Rob(q),61);if(p.f!=null){m=Wv(p.f,9);m.i.b=p.e+m.e.d}}};var _ab;var yE=Nkb(MAb,'NetworkSimplexPlacer',548);hI(141,17,{180:1,141:1,3:1,23:1,17:1},lbb);_.rc=function mbb(){switch(this.e){case 0:return new sbb;case 1:return new Bab;case 2:return new Qab;case 3:return new dcb;case 4:return new cbb;default:throw new slb('No implementation is available for the node placer '+(this.d!=null?this.d:''+this.e));}};var fbb,gbb,hbb,ibb,jbb;var zE=Okb(MAb,'NodePlacementStrategy',141,IF,nbb);var obb;hI(544,1,BAb,sbb);_.qc=function tbb(a){return Wv(rJ(a,(Rib(),jib)),18).kb((ohb(),hhb))?qbb:null};_.sc=function ubb(a,b){var c,d,e,f,g,h,i,j,k,l;nI(b,'Simple node placement',1);l=Wv(rJ(a,(Rib(),Kib)),134);h=0;for(f=new Tob(a.c);f.a<f.c.c.length;){d=Wv(Rob(f),16);g=d.c;g.b=0;c=null;for(j=new Tob(d.a);j.a<j.c.c.length;){i=Wv(Rob(j),9);!!c&&(g.b+=Vjb(l,i.g,c.g)*l.d);g.b+=i.e.d+i.j.b+i.e.a;c=i}h=Nlb(h,g.b)}for(e=new Tob(a.c);e.a<e.c.c.length;){d=Wv(Rob(e),16);g=d.c;k=(h-g.b)/2;c=null;for(j=new Tob(d.a);j.a<j.c.c.length;){i=Wv(Rob(j),9);!!c&&(k+=Vjb(l,i.g,c.g)*l.d);k+=i.e.d;i.i.b=k;k+=i.j.b+i.e.a;c=i}}pI(b)};var qbb;var AE=Nkb(MAb,'SimpleNodePlacer',544);hI(81,1,{81:1},Cbb);_.w=function Dbb(){var a;a='';this.c==(Gbb(),Fbb)?(a+=pzb):this.c==Ebb&&(a+=ozb);this.k==(Lbb(),Jbb)?(a+='DOWN'):this.k==Kbb?(a+='UP'):(a+='BALANCED');return a};var DE=Nkb(OAb,'BKAlignedLayout',81);hI(248,17,{248:1,3:1,23:1,17:1},Hbb);var Ebb,Fbb;var BE=Okb(OAb,'BKAlignedLayout/HDirection',248,IF,Ibb);hI(247,17,{247:1,3:1,23:1,17:1},Mbb);var Jbb,Kbb;var CE=Okb(OAb,'BKAlignedLayout/VDirection',247,IF,Nbb);hI(596,1,{},Qbb);var EE=Nkb(OAb,'BKAligner',596);hI(599,1,{},Vbb);var HE=Nkb(OAb,'BKCompactor',599);hI(279,1,{279:1},Wbb);_.a=0;var FE=Nkb(OAb,'BKCompactor/ClassEdge',279);hI(200,1,{200:1},Ybb);_.a=0;_.b=0;var GE=Nkb(OAb,'BKCompactor/ClassNode',200);hI(547,1,BAb,dcb);_.qc=function hcb(a){return Wv(rJ(a,(Rib(),jib)),18).kb((ohb(),hhb))?Zbb:null};_.sc=function icb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;nI(b,'Brandes & Koepf node placement',1);this.b=a;this.d=scb(a);this.a=Ckb(Ixb(Xv(rJ(a,(Mjb(),mjb)))));this.e=gw(rJ(a,sjb))===gw((_gb(),Vgb));ccb(this,a);n=(Mh(4,Vyb),new HU(4));switch(Wv(rJ(a,sjb),124).e){case 3:o=new Cbb(a,this.d.d,(Lbb(),Jbb),(Gbb(),Ebb));n.c[n.c.length]=o;break;case 1:p=new Cbb(a,this.d.d,(Lbb(),Kbb),(Gbb(),Ebb));n.c[n.c.length]=p;break;case 4:s=new Cbb(a,this.d.d,(Lbb(),Jbb),(Gbb(),Fbb));n.c[n.c.length]=s;break;case 2:t=new Cbb(a,this.d.d,(Lbb(),Kbb),(Gbb(),Fbb));n.c[n.c.length]=t;break;default:o=new Cbb(a,this.d.d,(Lbb(),Jbb),(Gbb(),Ebb));p=new Cbb(a,this.d.d,Kbb,Ebb);s=new Cbb(a,this.d.d,Jbb,Fbb);t=new Cbb(a,this.d.d,Kbb,Fbb);n.c[n.c.length]=s;n.c[n.c.length]=t;n.c[n.c.length]=o;n.c[n.c.length]=p;}c=new Qbb(a,this.d);for(f=new Tob(n);f.a<f.c.c.length;){d=Wv(Rob(f),81);Pbb(c,d,this.c);Obb(d)}k=new Vbb(a,this.d);for(g=new Tob(n);g.a<g.c.c.length;){d=Wv(Rob(g),81);Sbb(k,d)}if(this.a){for(h=new Tob(n);h.a<h.c.c.length;){d=Wv(Rob(h),81);Fmb();d+' size is '+Abb(d)}}j=null;if(this.e){i=acb(this,n,this.d.d);_bb(this,a,i)&&(j=i)}if(!j){for(h=new Tob(n);h.a<h.c.c.length;){d=Wv(Rob(h),81);_bb(this,a,d)&&(!j||Abb(j)>Abb(d))&&(j=d)}}!j&&(j=(Cxb(0,n.c.length),Wv(n.c[0],81)));for(m=new Tob(a.c);m.a<m.c.c.length;){l=Wv(Rob(m),16);for(r=new Tob(l.a);r.a<r.c.c.length;){q=Wv(Rob(r),9);q.i.b=Ixb(j.n[q.k])+Ixb(j.d[q.k])}}if(this.a){Fmb();'Blocks: '+ecb(j);'Classes: '+fcb(j)}for(e=new Tob(n);e.a<e.c.c.length;){d=Wv(Rob(e),81);d.f=null;d.b=null;d.a=null;d.d=null;d.i=null;d.g=null;d.n=null}qcb(this.d);this.c.a.Q();pI(b)};_.a=false;_.e=false;var Zbb;var IE=Nkb(OAb,'BKNodePlacer',547);hI(194,17,{194:1,3:1,23:1,17:1},mcb);var jcb,kcb;var JE=Okb(OAb,'CompactionStrategy',194,IF,ncb);var ocb;hI(597,1,{},rcb);_.d=0;var LE=Nkb(OAb,'NeighborhoodInformation',597);hI(598,1,fyb,wcb);_.$b=function xcb(a,b){return vcb(this,Wv(a,27),Wv(b,27))};var KE=Nkb(OAb,'NeighborhoodInformation/NeighborComparator',598);hI(334,1,{});var PE=Nkb(OAb,'ThresholdStrategy',334);hI(602,334,{},Ccb);_.Ic=function Dcb(a,b,c){return this.a.k==(Lbb(),Kbb)?Uzb:Vzb};_.Jc=function Ecb(){};var ME=Nkb(OAb,'ThresholdStrategy/NullThresholdStrategy',602);hI(249,1,{249:1},Fcb);_.c=false;_.d=false;var NE=Nkb(OAb,'ThresholdStrategy/Postprocessable',249);hI(603,334,{},Jcb);_.Ic=function Kcb(a,b,c){var d,e,f;e=b==c;d=this.a.a[c.k]==b;if(!(e||d)){return a}f=a;if(this.a.c==(Gbb(),Fbb)){e&&(f=Gcb(this,b,true));(f==Infinity||f==-Infinity)&&d&&(f=Gcb(this,c,false))}else{e&&(f=Gcb(this,b,true));(f==Infinity||f==-Infinity)&&d&&(f=Gcb(this,c,false))}return f};_.Jc=function Lcb(){var a,b,c,d;while(this.d.b!=0){d=Wv(XI(this.d),249);c=Hcb(this,d);if(!c.a){continue}a=c.a;if(this.c.a[a.c.f.d.k]===this.c.a[a.d.f.d.k]){continue}b=Icb(this,d);b||Tvb(this.e,d)}while(this.e.a.c.length!=0){Icb(this,Wv(Svb(this.e),249))}};var OE=Nkb(OAb,'ThresholdStrategy/SimpleThresholdStrategy',603);hI(423,1,{180:1},Mcb);_.rc=function Ncb(){switch(this.a.e){case 1:return new Rdb;case 3:return new Wfb;default:return new Ycb;}};var QE=Nkb(PAb,'EdgeRouterFactory',423);hI(538,1,BAb,Ycb);_.qc=function Zcb(a){var b,c;c=Wv(rJ(a,(Rib(),jib)),18);b=new WQ;if(c.kb((ohb(),ihb))){QQ(b,Scb);QQ(b,Ucb)}if(c.kb(khb)||Ckb(Ixb(Xv(rJ(a,(Mjb(),rjb)))))){QQ(b,Ucb);c.kb(lhb)&&QQ(b,Vcb)}c.kb(hhb)&&QQ(b,Rcb);c.kb(nhb)&&QQ(b,Wcb);c.kb(jhb)&&QQ(b,Tcb);c.kb(ehb)&&QQ(b,Pcb);c.kb(ghb)&&QQ(b,Qcb);return b};_.sc=function $cb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o;nI(b,'Orthogonal edge routing',1);m=Wv(rJ(a,(Rib(),Kib)),134);Ckb(Ixb(Xv(rJ(a,(eM(),rL)))));k=new cdb(0,m.a);o=0;f=new Fnb(a.c,0);g=null;h=null;do{i=f.b<f.d.Y()?(Bxb(f.b<f.d.Y()),Wv(f.d.sb(f.c=f.b++),16)):null;j=!i?null:i.a;if(g){UW(g,o);o+=g.c.a}n=!g?o:o+m.b;l=bdb(k,a,h,j,n);d=!g||nl(h,(Ndb(),Mdb));e=!i||nl(j,(Ndb(),Mdb));if(l>0){c=m.b+(l-1)*m.a;!!i&&(c+=m.b);c<m.f&&!d&&!e&&(c=m.f);o+=c}else !d&&!e&&(o+=m.f);g=i;h=j}while(i);a.e.a=o;pI(b)};var Pcb,Qcb,Rcb,Scb,Tcb,Ucb,Vcb,Wcb;var RE=Nkb(PAb,'OrthogonalEdgeRouter',538);hI(277,1,{},cdb);_.a=0;_.c=0;var XE=Nkb(PAb,'OrthogonalRoutingGenerator',277);hI(118,1,{118:1},kdb);_.w=function ldb(){return this.a+'->'+this.b};_.c=0;var SE=Nkb(PAb,'OrthogonalRoutingGenerator/Dependency',118);hI(80,1,{80:1,23:1},odb);_.F=function pdb(a){return ndb(this,Wv(a,80))};_.t=function qdb(a){var b;if(aw(a,80)){b=Wv(a,80);return this.d==b.d}return false};_.v=function rdb(){return this.d};_.w=function sdb(){var a,b,c,d;a=new Bmb('{');d=new Tob(this.g);while(d.a<d.c.c.length){c=Wv(Rob(d),7);b=lX(c.f);b==null&&(b='n'+jX(c.f));a.a+=''+b;d.a<d.c.c.length&&(a.a+=',',a)}a.a+='}';return a.a};_.a=NaN;_.c=0;_.d=0;_.f=0;_.i=0;_.k=NaN;var TE=Nkb(PAb,'OrthogonalRoutingGenerator/HyperNode',80);hI(580,1,{},tdb);_.Kc=function udb(a,b){var c,d,e,f,g,h,i,j,k,l;l=b+a.i*this.a.c;for(h=new Tob(a.g);h.a<h.c.c.length;){g=Wv(Rob(h),7);i=MI(Bv(tv(qz,1),Fzb,10,0,[g.f.i,g.i,g.a])).a;for(d=new Tob(g.e);d.a<d.c.c.length;){c=Wv(Rob(d),12);j=c.d;k=MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a])).a;if((i-k<=0?0-(i-k):i-k)>dAb){e=new HI(i,l);QI(c.a,e);_cb(this.a,c,a,e,false);f=new HI(k,l);QI(c.a,f);_cb(this.a,c,a,f,false)}}}};_.Lc=function vdb(a){return a.f.i.a+a.i.a+a.a.a};_.Mc=function wdb(){return sN(),pN};_.Nc=function xdb(){return sN(),$M};var UE=Nkb(PAb,'OrthogonalRoutingGenerator/NorthToSouthRoutingStrategy',580);hI(581,1,{},ydb);_.Kc=function zdb(a,b){var c,d,e,f,g,h,i,j,k,l;l=b-a.i*this.a.c;for(h=new Tob(a.g);h.a<h.c.c.length;){g=Wv(Rob(h),7);i=MI(Bv(tv(qz,1),Fzb,10,0,[g.f.i,g.i,g.a])).a;for(d=new Tob(g.e);d.a<d.c.c.length;){c=Wv(Rob(d),12);j=c.d;k=MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a])).a;if((i-k<=0?0-(i-k):i-k)>dAb){e=new HI(i,l);QI(c.a,e);_cb(this.a,c,a,e,false);f=new HI(k,l);QI(c.a,f);_cb(this.a,c,a,f,false)}}}};_.Lc=function Adb(a){return a.f.i.a+a.i.a+a.a.a};_.Mc=function Bdb(){return sN(),$M};_.Nc=function Cdb(){return sN(),pN};var VE=Nkb(PAb,'OrthogonalRoutingGenerator/SouthToNorthRoutingStrategy',581);hI(579,1,{},Ddb);_.Kc=function Edb(a,b){var c,d,e,f,g,h,i,j,k,l;l=b+a.i*this.a.c;for(h=new Tob(a.g);h.a<h.c.c.length;){g=Wv(Rob(h),7);i=MI(Bv(tv(qz,1),Fzb,10,0,[g.f.i,g.i,g.a])).b;for(d=new Tob(g.e);d.a<d.c.c.length;){c=Wv(Rob(d),12);j=c.d;k=MI(Bv(tv(qz,1),Fzb,10,0,[j.f.i,j.i,j.a])).b;if((i-k<=0?0-(i-k):i-k)>dAb){e=new HI(l,i);QI(c.a,e);_cb(this.a,c,a,e,true);f=new HI(l,k);QI(c.a,f);_cb(this.a,c,a,f,true)}}}};_.Lc=function Fdb(a){return a.f.i.b+a.i.b+a.a.b};_.Mc=function Gdb(){return sN(),ZM};_.Nc=function Hdb(){return sN(),rN};var WE=Nkb(PAb,'OrthogonalRoutingGenerator/WestToEastRoutingStrategy',579);hI(535,1,BAb,Rdb);_.qc=function Sdb(a){var b,c;c=Wv(rJ(a,(Rib(),jib)),18);b=new WQ;if(c.kb((ohb(),khb))||Ckb(Ixb(Xv(rJ(a,(Mjb(),rjb)))))){QQ(b,Kdb);c.kb(lhb)&&QQ(b,Ldb)}c.kb(ehb)&&QQ(b,Idb);c.kb(ghb)&&QQ(b,Jdb);return b};_.sc=function Tdb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v;nI(b,'Polyline edge routing',1);l=Wv(rJ(a,(Rib(),Jib)),15).a;c=Wv(rJ(a,(Mjb(),qjb)),15).a;q=0;if(a.c.c.length!=0){r=Pdb(Wv(yU(a.c,0),16));q=0.4*c*r}f=new Fnb(a.c,0);while(f.b<f.d.Y()){e=(Bxb(f.b<f.d.Y()),Wv(f.d.sb(f.c=f.b++),16));d=nl(e,Mdb);d&&q>0&&(q-=l);UW(e,q);i=0;for(k=new Tob(e.a);k.a<k.c.c.length;){j=Wv(Rob(k),9);h=0;for(n=Uh(mX(j));Cm(n);){m=Wv(Dm(n),12);o=MX(m.c).b;p=MX(m.d).b;if(e==m.d.f.d){s=m.c;t=m.d;u=(MI(Bv(tv(qz,1),Fzb,10,0,[s.f.i,s.i,s.a])).b+MI(Bv(tv(qz,1),Fzb,10,0,[t.f.i,t.i,t.a])).b)/2;s.g==(sN(),ZM)?(v=new HI(q+s.f.d.c.a+0.4*c*(o-p<=0?0-(o-p):o-p),u)):(v=new HI(q-0.4*c*(o-p<=0?0-(o-p):o-p),u));rn(m.a,0,v);if(m.c.g==rN){o=0;p=0}}h=h>(p-o<=0?0-(p-o):p-o)?h:p-o<=0?0-(p-o):p-o}switch(j.g.e){case 0:case 4:case 1:case 3:Qdb(this,j,q);}i=i>h?i:h}if(f.b<f.d.Y()){r=Pdb((Bxb(f.b<f.d.Y()),Wv(f.d.sb(f.c=f.b++),16)));i=i>r?i:r;Bxb(f.b>0);f.a.sb(f.c=--f.b)}g=0.4*c*i;!d&&f.b<f.d.Y()&&(g+=l);q+=e.c.a+g}this.a.a.Q();a.e.a=q;pI(b)};var Idb,Jdb,Kdb,Ldb,Mdb;var ZE=Nkb(PAb,'PolylineEdgeRouter',535);hI(536,1,_zb,Vdb);_.D=function Wdb(a){return Udb(Wv(a,9))};var YE=Nkb(PAb,'PolylineEdgeRouter/1',536);hI(75,1,{75:1},deb);_.w=function eeb(){var a,b,c,d;c=new zmb;!!this.e&&ymb(ymb(c,zc(this.e)),': ');for(b=WI(Zdb(this),0);b.b!=b.d.c;){a=Wv(_ub(b),7);ymb(ymb(umb(ymb(c,(d=OX(a),d==null?'p_'+a.k:'p_'+d)),32),zc(a.g)),' / ')}return kkb(c,pmb(c.a)-2-1)};_.j=0;_.k=0;var $E=Nkb(QAb,'ConnectedSelfLoopComponent',75);hI(60,17,{60:1,3:1,23:1,17:1},Peb);_.c=0;var feb,geb,heb,ieb,jeb,keb,leb,meb,neb,oeb,peb,qeb,reb,seb,teb,ueb,veb,web,xeb,yeb,zeb,Aeb,Beb,Ceb,Deb,Eeb,Feb,Geb,Heb;var _E=Okb(QAb,'LoopSide',60,IF,Seb);hI(203,1,{},dfb,efb,ffb);_.w=function pfb(){return this.b.w()};_.c=0;_.d=false;_.e=false;_.f=false;_.i=0;_.j=0;var bF=Nkb(QAb,'NubSpline',203);hI(92,1,{92:1},sfb,tfb);var aF=Nkb(QAb,'NubSpline/PolarCP',92);hI(281,203,{},ufb);var cF=Nkb(QAb,'NubsSelfLoop',281);hI(112,1,{},Bfb,Cfb,Dfb,Efb,Ffb);_.a=jzb;_.b=rAb;_.c=jzb;_.d=rAb;var dF=Nkb(QAb,'Rectangle',112);hI(537,1,BAb,Wfb);_.qc=function Yfb(a){var b,c;b=new WQ;c=Wv(rJ(a,(Rib(),jib)),18);c.kb((ohb(),nhb))&&QQ(b,Lfb);c.kb(ehb)&&QQ(b,Hfb);if(c.kb(khb)||Ckb(Ixb(Xv(rJ(a,(Mjb(),rjb)))))){QQ(b,Jfb);c.kb(lhb)&&QQ(b,Kfb)}c.kb(ghb)&&QQ(b,Ifb);return b};_.sc=function $fb(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,A,B,C,D,F,G,H,I,J,K,L;nI(b,'Spline edge routing',1);u=Wv(rJ(a,(Rib(),Jib)),15).a;this.a=u*Wv(rJ(a,(Mjb(),qjb)),15).a;L=0;q=new Tob(a.c);r=null;J=(mp(),new ntb);I=new GU;i=true;j=true;do{A=q.a<q.c.c.length?Wv(Rob(q),16):null;m=new GU;g=new GU;s=new Wub;C=new Wub;G=new Wub;Tfb(new RJ(r,A),new RJ(s,C),g,J,I,G);Sfb(s,C,(fgb(),dgb),true,g,m);Sfb(s,C,dgb,false,g,m);Sfb(s,C,egb,true,g,m);Sfb(s,C,egb,false,g,m);Rfb(g,s,C,m);H=new Fnb(m,0);while(H.b<H.d.Y()){k=(Bxb(H.b<H.d.Y()),Wv(H.d.sb(H.c=H.b++),77));K=new Fnb(m,H.b);while(K.b<K.d.Y()){l=(Bxb(K.b<K.d.Y()),Wv(K.d.sb(K.c=K.b++),77));Qfb(k,l)}}Xfb(m,Wv(rJ(a,Gib),154));_fb(m);B=L+10;if(A){j=!A||nl(A.a,(Ndb(),Mdb));t=-1;for(e=new Tob(m);e.a<e.c.c.length;){c=Wv(Rob(e),77);t=Plb(t,c.n)}++t;if(t>0){n=(t+1)*this.a;n<u&&!i&&!j&&(n=u);B+=n}else i||j||Vfb(r)||Vfb(A)||(B+=u);UW(A,B)}for(F=(w=(new Snb(G.a)).a.bb().mb(),new Ynb(w));F.a.G();){D=(h=Wv(F.a.H(),21),Wv(h.yb(),12));v=D.c.f.i;hJ(D.a,v);for(p=new Tob(D.b);p.a<p.c.c.length;){o=Wv(Rob(p),33);vI(o.i,v)}}for(f=new Tob(m);f.a<f.c.c.length;){c=Wv(Rob(f),77);c.f?Ofb(c,L):Pfb(this,c,L,B)}if(A){L=B+A.c.a+10}else{t=-1;for(e=new Tob(m);e.a<e.c.c.length;){c=Wv(Rob(e),77);t=Plb(t,c.n)}t>=0&&(L+=(t+2)*this.a)}r=A;i=j}while(A);for(d=new Tob(I);d.a<d.c.c.length;){c=Wv(Rob(d),12);Nfb(c,J)}a.e.a=L;pI(b)};_.a=3;var Hfb,Ifb,Jfb,Kfb,Lfb;var hF=Nkb(QAb,'SplineEdgeRouter',537);hI(117,1,{117:1},bgb);_.w=function cgb(){return this.a+' ->('+this.c+') '+this.b};_.c=0;var eF=Nkb(QAb,'SplineEdgeRouter/Dependency',117);hI(223,17,{223:1,3:1,23:1,17:1},ggb);var dgb,egb;var fF=Okb(QAb,'SplineEdgeRouter/SideToProcess',223,IF,hgb);hI(77,1,{77:1,23:1},lgb,mgb);_.F=function ngb(a){return jgb(this,Wv(a,77))};_.a=0;_.b=0;_.e=0;_.f=false;_.i=0;_.k=0;_.n=0;_.p=0;var gF=Nkb(QAb,'SplineEdgeRouter/SplineHyperEdge',77);hI(123,17,{123:1,3:1,23:1,17:1},Agb);var tgb,ugb,vgb,wgb,xgb,ygb;var iF=Okb(VAb,'ContentAlignment',123,IF,Bgb);var Cgb;hI(218,17,{218:1,3:1,23:1,17:1},Igb);var Egb,Fgb,Ggb;var jF=Okb(VAb,'EdgeConstraint',218,IF,Jgb);hI(115,17,{115:1,3:1,23:1,17:1},Rgb);var Kgb,Lgb,Mgb,Ngb,Ogb;var kF=Okb(VAb,'EdgeLabelSideSelection',115,IF,Sgb);var Tgb;hI(124,17,{124:1,3:1,23:1,17:1},ahb);var Vgb,Wgb,Xgb,Ygb,Zgb,$gb;var lF=Okb(VAb,'FixedAlignment',124,IF,bhb);var chb;hI(113,17,{113:1,3:1,23:1,17:1},phb);var ehb,fhb,ghb,hhb,ihb,jhb,khb,lhb,mhb,nhb;var mF=Okb(VAb,'GraphProperties',113,IF,qhb);hI(110,17,{110:1,3:1,23:1,17:1},Ahb);_.a=false;_.b=false;_.c=false;var rhb,shb,thb,uhb,vhb,whb,xhb,yhb;var nF=Okb(VAb,'GreedySwitchType',110,IF,Bhb);var Chb;hI(140,17,{140:1,3:1,23:1,17:1},Ihb);var Ehb,Fhb,Ghb;var oF=Okb(VAb,'InLayerConstraint',140,IF,Jhb);hI(174,17,{174:1,3:1,23:1,17:1},Nhb);var Khb,Lhb;var pF=Okb(VAb,'InteractiveReferencePoint',174,IF,Ohb);var Phb;var Rhb,Shb,Thb,Uhb,Vhb,Whb,Xhb,Yhb,Zhb,$hb,_hb,aib,bib,cib,dib,eib,fib,gib,hib,iib,jib,kib,lib,mib,nib,oib,pib,qib,rib,sib,tib,uib,vib,wib,xib,yib,zib,Aib,Bib,Cib,Dib,Eib,Fib,Gib,Hib,Iib,Jib,Kib,Lib,Mib,Nib,Oib,Pib,Qib;hI(85,17,{85:1,3:1,23:1,17:1},Yib);var Sib,Tib,Uib,Vib,Wib;var qF=Okb(VAb,'LayerConstraint',85,IF,Zib);var $ib;hI(219,17,{219:1,3:1,23:1,17:1},ejb);var ajb,bjb,cjb;var rF=Okb(VAb,'PortType',219,IF,fjb);var gjb,hjb,ijb,jjb,kjb,ljb,mjb,njb,ojb,pjb,qjb,rjb,sjb,tjb,ujb,vjb,wjb,xjb,yjb,zjb,Ajb,Bjb,Cjb,Djb,Ejb,Fjb,Gjb,Hjb,Ijb,Jjb,Kjb,Ljb;hI(153,17,{153:1,3:1,23:1,17:1},Rjb);var Njb,Ojb,Pjb;var sF=Okb(VAb,'SelfLoopPlacement',153,IF,Sjb);var Tjb;hI(134,1,{134:1},$jb);_.a=0;_.b=0;_.c=0;_.d=0;_.e=0;_.f=0;var tF=Nkb(VAb,'Spacings',134);hI(172,17,{172:1,3:1,23:1,17:1},dkb);var _jb,akb,bkb;var uF=Okb(VAb,'WideNodesStrategy',172,IF,ekb);var fkb;hI(644,1,{});var xF=Nkb(nyb,'OutputStream',644);hI(645,644,{});var vF=Nkb(nyb,'FilterOutputStream',645);hI(291,645,{},hkb);var yF=Nkb(nyb,'PrintStream',291);hI(255,1,{});_.w=function mkb(){return this.a};var AF=Nkb(kyb,'AbstractStringBuilder',255);hI(621,95,Vxb,pkb);var BF=Nkb(kyb,'ArrayIndexOutOfBoundsException',621);hI(290,72,Vxb,qkb,rkb);var CF=Nkb(kyb,'ArrayStoreException',290);hI(252,46,Uxb);var JF=Nkb(kyb,'Error',252);hI(84,252,Uxb,tkb,ukb);var DF=Nkb(kyb,'AssertionError',84);Sv={3:1,349:1,23:1};var vkb,wkb;var EF=Nkb(kyb,'Boolean',349);Tv={3:1,23:1,184:1,231:1};var HF=Nkb(kyb,'Double',184);hI(15,231,{3:1,23:1,15:1,231:1},klb,llb);_.F=function mlb(a){return jlb(this,Wv(a,15))};_.t=function nlb(a){return aw(a,15)&&Wv(a,15).a==this.a};_.v=function olb(){return hw(this.a)};_.w=function plb(){return qlb(this.a)};_.a=0;var LF=Nkb(kyb,'Float',15);hI(101,72,Vxb,tlb,ulb);var NF=Nkb(kyb,'IllegalStateException',101);var Flb;var Hlb;hI(608,72,Vxb,Ulb);var QF=Nkb(kyb,'NegativeArraySizeException',608);hI(76,72,{3:1,54:1,76:1,46:1},Vlb,Wlb);var RF=Nkb(kyb,'NullPointerException',76);hI(130,29,{3:1,54:1,29:1,130:1,46:1},Xlb,Ylb);var SF=Nkb(kyb,'NumberFormatException',130);hI(146,1,{3:1,146:1},Zlb);_.t=function $lb(a){var b;if(aw(a,146)){b=Wv(a,146);return this.c==b.c&&ovb(this.d,b.d)&&ovb(this.a,b.a)&&ovb(this.b,b.b)}return false};_.v=function _lb(){return fpb(Bv(tv(UF,1),syb,1,4,[Elb(this.c),this.a,this.d,this.b]))};_.w=function amb(){return this.a+'.'+this.d+'('+(this.b!=null?this.b:'Unknown Source')+(this.c>=0?':'+this.c:'')+')'};_.c=0;var WF=Nkb(kyb,'StackTraceElement',146);hI(98,255,{345:1},zmb,Amb,Bmb);var YF=Nkb(kyb,'StringBuilder',98);var Dmb,Emb;hI(45,72,{3:1,54:1,46:1,45:1},Hmb,Imb);var aG=Nkb(kyb,'UnsupportedOperationException',45);hI(213,638,Byb);_.Q=function _mb(){Ymb(this)};_.R=function anb(a){return Qmb(this,a)};_.ab=function bnb(a){return Rmb(this,a,this.e)||Rmb(this,a,this.d)};_.bb=function cnb(){return new inb(this)};_.cb=function dnb(a){return Smb(this,a)};_.db=function enb(a,b){return Umb(this,a,b)};_.eb=function fnb(a){return Wmb(this,a)};_.Y=function gnb(){return Zmb(this)};var hG=Nkb(Cyb,'AbstractHashMap',213);hI(120,641,Eyb,inb);_.Q=function jnb(){this.a.Q()};_.kb=function knb(a){return hnb(this,a)};_.mb=function lnb(){return new rnb(this.a)};_.nb=function mnb(a){var b;if(hnb(this,a)){b=Wv(a,21).yb();this.a.eb(b);return true}return false};_.Y=function nnb(){return this.a.Y()};var gG=Nkb(Cyb,'AbstractHashMap/EntrySet',120);hI(148,1,Ayb,rnb);_.H=function tnb(){return pnb(this)};_.G=function snb(){return this.b};_.I=function unb(){qnb(this)};_.b=false;var fG=Nkb(Cyb,'AbstractHashMap/EntrySetIterator',148);hI(162,1,Ayb,wnb);_.G=function xnb(){return this.b<this.d.Y()};_.H=function ynb(){return Bxb(this.G()),this.d.sb(this.c=this.b++)};_.I=function znb(){vnb(this)};_.b=0;_.c=-1;var iG=Nkb(Cyb,'AbstractList/IteratorImpl',162);hI(43,162,Hyb,Fnb);_.J=function Gnb(a){Anb(this,a)};_.K=function Hnb(){return this.b>0};_.L=function Inb(){return this.b};_.M=function Jnb(){return Dnb(this)};_.N=function Knb(){return this.b-1};_.O=function Lnb(a){Enb(this,a)};var jG=Nkb(Cyb,'AbstractList/ListIteratorImpl',43);hI(258,647,Fyb,Mnb);_.rb=function Nnb(a,b){Fxb(a,this.b);this.c.rb(this.a+a,b);++this.b};_.sb=function Onb(a){Cxb(a,this.b);return this.c.sb(this.a+a)};_.vb=function Pnb(a){var b;Cxb(a,this.b);b=this.c.vb(this.a+a);--this.b;return b};_.wb=function Qnb(a,b){Cxb(a,this.b);return this.c.wb(this.a+a,b)};_.Y=function Rnb(){return this.b};_.a=0;_.b=0;var kG=Nkb(Cyb,'AbstractList/SubList',258);hI(36,641,Eyb,Snb);_.Q=function Tnb(){this.a.Q()};_.kb=function Unb(a){return this.a.R(a)};_.mb=function Vnb(){var a;return a=this.a.bb().mb(),new Ynb(a)};_.nb=function Wnb(a){if(this.a.R(a)){this.a.eb(a);return true}return false};_.Y=function Xnb(){return this.a.Y()};var nG=Nkb(Cyb,'AbstractMap/1',36);hI(40,1,Ayb,Ynb);_.G=function Znb(){return this.a.G()};_.H=function $nb(){var a;return a=Wv(this.a.H(),21),a.yb()};_.I=function _nb(){this.a.I()};var mG=Nkb(Cyb,'AbstractMap/1/1',40);hI(211,640,Dyb,aob);_.Q=function bob(){this.a.Q()};_.kb=function cob(a){return this.a.ab(a)};_.mb=function dob(){var a;return a=this.a.bb().mb(),new fob(a)};_.Y=function eob(){return this.a.Y()};var pG=Nkb(Cyb,'AbstractMap/2',211);hI(212,1,Ayb,fob);_.G=function gob(){return this.a.G()};_.H=function hob(){var a;return a=Wv(this.a.H(),21),a.zb()};_.I=function iob(){this.a.I()};var oG=Nkb(Cyb,'AbstractMap/2/1',212);hI(210,1,{210:1,21:1});_.t=function kob(a){var b;if(!aw(a,21)){return false}b=Wv(a,21);return ovb(this.d,b.yb())&&ovb(this.e,b.zb())};_.yb=function lob(){return this.d};_.zb=function mob(){return this.e};_.v=function nob(){return pvb(this.d)^pvb(this.e)};_.Ab=function oob(a){return job(this,a)};_.w=function pob(){return this.d+'='+this.e};var qG=Nkb(Cyb,'AbstractMap/AbstractEntry',210);hI(163,210,{210:1,163:1,21:1},qob);var rG=Nkb(Cyb,'AbstractMap/SimpleEntry',163);hI(652,1,Jyb);_.t=function rob(a){var b;if(!aw(a,21)){return false}b=Wv(a,21);return ovb(this.yb(),b.yb())&&ovb(this.zb(),b.zb())};_.v=function sob(){return pvb(this.yb())^pvb(this.zb())};_.w=function tob(){return this.yb()+'='+this.zb()};var sG=Nkb(Cyb,Kyb,652);hI(639,638,Byb);_._=function wob(a){return uob(this,a)};_.R=function xob(a){return vob(this,a)};_.bb=function yob(){return new Bob(this)};_.cb=function zob(a){return re(Wvb(this,a))};_.W=function Aob(){return new Gob(this)};var xG=Nkb(Cyb,'AbstractNavigableMap',639);hI(287,641,Eyb,Bob);_.kb=function Cob(a){return aw(a,21)&&uob(this.b,Wv(a,21))};_.mb=function Dob(){return new rwb(this.b)};_.nb=function Eob(a){var b;if(aw(a,21)){b=Wv(a,21);return dwb(this.b,b)}return false};_.Y=function Fob(){return this.b.c};var uG=Nkb(Cyb,'AbstractNavigableMap/EntrySet',287);hI(229,641,Iyb,Gob);_.Q=function Hob(){Vvb(this.a)};_.kb=function Iob(a){return vob(this.a,a)};_.mb=function Job(){var a;return a=new rwb((new wwb(this.a)).b),new Mob(a)};_.nb=function Kob(a){if(vob(this.a,a)){cwb(this.a,a);return true}return false};_.Y=function Lob(){return this.a.c};var wG=Nkb(Cyb,'AbstractNavigableMap/NavigableKeySet',229);hI(230,1,Ayb,Mob);_.G=function Nob(){return Bnb(this.a.a)};_.H=function Oob(){var a;return a=pwb(this.a),a.yb()};_.I=function Pob(){qwb(this.a)};var vG=Nkb(Cyb,'AbstractNavigableMap/NavigableKeySet/1',230);hI(4,1,Ayb,Tob);_.G=function Uob(){return Qob(this)};_.H=function Vob(){return Rob(this)};_.I=function Wob(){Sob(this)};_.a=0;_.b=-1;var AG=Nkb(Cyb,'ArrayList/1',4);hI(94,647,XAb,opb);_.kb=function ppb(a){return dn(this,a)!=-1};_.sb=function qpb(a){return mpb(this,a)};_.wb=function rpb(a,b){var c;c=(Cxb(a,this.a.length),this.a[a]);Av(this.a,a,b);return c};_.Y=function spb(){return this.a.length};_.ob=function tpb(){return npb(this,xv(UF,syb,1,this.a.length,4,1))};_.pb=function upb(a){return npb(this,a)};var CG=Nkb(Cyb,'Arrays/ArrayList',94);var vpb,wpb,xpb;hI(413,1,fyb,Ipb);_.$b=function Jpb(a,b){return zT(b,a)};var DG=Nkb(Cyb,'Collections/2',413);hI(406,647,XAb,Kpb);_.kb=function Lpb(a){return false};_.sb=function Mpb(a){Cxb(a,0);return null};_.mb=function Npb(){return ypb(),Rpb(),Qpb};_.tb=function Opb(){return ypb(),Rpb(),Qpb};_.Y=function Ppb(){return 0};var FG=Nkb(Cyb,'Collections/EmptyList',406);hI(407,1,Hyb,Spb);_.J=function Tpb(a){throw new Hmb};_.G=function Upb(){return false};_.K=function Vpb(){return false};_.H=function Wpb(){throw new nvb};_.L=function Xpb(){return 0};_.M=function Ypb(){throw new nvb};_.N=function Zpb(){return -1};_.I=function $pb(){throw new tlb};_.O=function _pb(a){throw new tlb};var Qpb;var EG=Nkb(Cyb,'Collections/EmptyListIterator',407);hI(409,638,Ryb,aqb);_.R=function bqb(a){return false};_.ab=function cqb(a){return false};_.bb=function dqb(){return ypb(),xpb};_.cb=function eqb(a){return null};_.W=function fqb(){return ypb(),xpb};_.Y=function gqb(){return 0};_.fb=function hqb(){return ypb(),vpb};var GG=Nkb(Cyb,'Collections/EmptyMap',409);hI(408,641,Syb,iqb);_.kb=function jqb(a){return false};_.mb=function kqb(){return ypb(),Rpb(),Qpb};_.Y=function lqb(){return 0};var HG=Nkb(Cyb,'Collections/EmptySet',408);hI(410,1,fyb,pqb);_.$b=function qqb(a,b){return oqb(Wv(a,23),Wv(b,23))};var mqb;var IG=Nkb(Cyb,'Collections/ReverseComparator',410);hI(411,647,{3:1,22:1,19:1,20:1},rqb);_.kb=function sqb(a){return ovb(this.a,a)};_.sb=function tqb(a){Cxb(a,1);return this.a};_.Y=function uqb(){return 1};var JG=Nkb(Cyb,'Collections/SingletonList',411);hI(217,1,Dyb,zqb);_.ib=function Aqb(a){return vqb()};_.jb=function Bqb(a){return wqb()};_.Q=function Cqb(){xqb()};_.kb=function Dqb(a){return this.b.kb(a)};_.lb=function Eqb(a){return this.b.lb(a)};_.V=function Fqb(){return this.b.V()};_.mb=function Gqb(){return new Nqb(this.b.mb())};_.nb=function Hqb(a){return yqb()};_.Y=function Iqb(){return this.b.Y()};_.ob=function Jqb(){return this.b.ob()};_.pb=function Kqb(a){return this.b.pb(a)};_.w=function Lqb(){return xb(this.b)};var LG=Nkb(Cyb,'Collections/UnmodifiableCollection',217);hI(152,1,Ayb,Nqb);_.G=function Oqb(){return this.b.G()};_.H=function Pqb(){return this.b.H()};_.I=function Qqb(){Mqb()};var KG=Nkb(Cyb,'Collections/UnmodifiableCollectionIterator',152);hI(233,217,Fyb,Rqb);_.rb=function Sqb(a,b){throw new Hmb};_.t=function Tqb(a){return this.a.t(a)};_.sb=function Uqb(a){return this.a.sb(a)};_.v=function Vqb(){return this.a.v()};_.V=function Wqb(){return this.a.V()};_.tb=function Xqb(){return new arb(this.a.ub(0))};_.ub=function Yqb(a){return new arb(this.a.ub(a))};_.vb=function Zqb(a){throw new Hmb};_.wb=function $qb(a,b){throw new Hmb};_.xb=function _qb(a,b){return new Rqb(this.a.xb(a,b))};var NG=Nkb(Cyb,'Collections/UnmodifiableList',233);hI(309,152,Hyb,arb);_.J=function brb(a){throw new Hmb};_.K=function crb(){return this.a.K()};_.L=function drb(){return this.a.L()};_.M=function erb(){return this.a.M()};_.N=function frb(){return this.a.N()};_.O=function grb(a){throw new Hmb};var MG=Nkb(Cyb,'Collections/UnmodifiableListIterator',309);hI(305,1,Byb,mrb);_.Q=function nrb(){throw new Hmb};_.R=function orb(a){return this.c.R(a)};_.ab=function prb(a){return hrb(this,a)};_.bb=function qrb(){return irb(this)};_.t=function rrb(a){return jrb(this,a)};_.cb=function srb(a){return this.c.cb(a)};_.v=function trb(){return this.c.v()};_.V=function urb(){return this.c.V()};_.W=function vrb(){return krb(this)};_.db=function wrb(a,b){throw new Hmb};_.eb=function xrb(a){throw new Hmb};_.Y=function yrb(){return this.c.Y()};_.w=function zrb(){return xb(this.c)};_.fb=function Arb(){return lrb(this)};var RG=Nkb(Cyb,'Collections/UnmodifiableMap',305);hI(151,217,Eyb,Frb);_.t=function Grb(a){return Drb(this,a)};_.v=function Hrb(){return this.b.v()};var TG=Nkb(Cyb,'Collections/UnmodifiableSet',151);hI(412,151,Eyb,Nrb);_.kb=function Orb(a){return Irb(this,a)};_.lb=function Prb(a){return Jrb(this,a)};_.mb=function Qrb(){var a;return a=this.b.mb(),new Trb(a)};_.ob=function Rrb(){return Krb(this)};_.pb=function Srb(a){return Lrb(this,a)};var QG=Nkb(Cyb,'Collections/UnmodifiableMap/UnmodifiableEntrySet',412);hI(263,1,Ayb,Trb);_.H=function Vrb(){return new Xrb(Wv(this.a.H(),21))};_.G=function Urb(){return this.a.G()};_.I=function Wrb(){throw new Hmb};var OG=Nkb(Cyb,'Collections/UnmodifiableMap/UnmodifiableEntrySet/1',263);hI(306,1,Jyb,Xrb);_.t=function Yrb(a){return this.a.t(a)};_.yb=function Zrb(){return this.a.yb()};_.zb=function $rb(){return this.a.zb()};_.v=function _rb(){return this.a.v()};_.Ab=function asb(a){throw new Hmb};_.w=function bsb(){return xb(this.a)};var PG=Nkb(Cyb,'Collections/UnmodifiableMap/UnmodifiableEntrySet/UnmodifiableEntry',306);hI(307,233,Gyb,csb);var SG=Nkb(Cyb,'Collections/UnmodifiableRandomAccessList',307);hI(308,151,Iyb,dsb);_.t=function esb(a){return this.a.t(a)};_.v=function fsb(){return this.a.v()};var UG=Nkb(Cyb,'Collections/UnmodifiableSortedSet',308);var gsb;hI(522,1,fyb,isb);_.$b=function jsb(a,b){Dxb(a);Dxb(b);return Akb(Wv(a,23),b)};var VG=Nkb(Cyb,'Comparators/1',522);hI(202,72,Vxb,nsb);var WG=Nkb(Cyb,'ConcurrentModificationException',202);hI(609,72,Vxb,osb);var XG=Nkb(Cyb,'EmptyStackException',609);hI(319,638,Byb,vsb);_.db=function Bsb(a,b){return ssb(this,a,b)};_.Q=function wsb(){psb(this)};_.R=function xsb(a){return Ysb(this.a,a)};_.ab=function ysb(a){var b,c;for(c=new jtb(this.a);c.a<c.c.a.length;){b=itb(c);if(ovb(a,this.b[b.e])){return true}}return false};_.bb=function zsb(){return new Fsb(this)};_.cb=function Asb(a){return qsb(this,a)};_.eb=function Csb(a){return tsb(this,a)};_.Y=function Dsb(){return this.a.c};var _G=Nkb(Cyb,'EnumMap',319);hI(236,641,Eyb,Fsb);_.Q=function Gsb(){psb(this.a)};_.kb=function Hsb(a){return Esb(this,a)};_.mb=function Isb(){return new Lsb(this.a)};_.nb=function Jsb(a){var b;if(Esb(this,a)){b=Wv(a,21).yb();tsb(this.a,b);return true}return false};_.Y=function Ksb(){return this.a.a.c};var ZG=Nkb(Cyb,'EnumMap/EntrySet',236);hI(237,1,Ayb,Lsb);_.H=function Nsb(){return this.b=itb(this.a),new Psb(this.c,this.b)};_.G=function Msb(){return htb(this.a)};_.I=function Osb(){uxb(!!this.b);tsb(this.c,this.b);this.b=null};var YG=Nkb(Cyb,'EnumMap/EntrySetIterator',237);hI(238,652,Jyb,Psb);_.yb=function Qsb(){return this.a};_.zb=function Rsb(){return this.b.b[this.a.e]};_.Ab=function Ssb(a){return usb(this.b,this.a.e,a)};var $G=Nkb(Cyb,'EnumMap/MapEntry',238);hI(86,641,{22:1,19:1,86:1,18:1});var cH=Nkb(Cyb,'EnumSet',86);hI(66,86,{22:1,19:1,86:1,66:1,18:1},atb);_.ib=function btb(a){return Wsb(this,Wv(a,17))};_.kb=function ctb(a){return Ysb(this,a)};_.mb=function dtb(){return new jtb(this)};_.nb=function etb(a){return $sb(this,a)};_.Y=function ftb(){return this.c};_.c=0;var bH=Nkb(Cyb,'EnumSet/EnumSetImpl',66);hI(167,1,Ayb,jtb);_.H=function ltb(){return itb(this)};_.G=function ktb(){return htb(this)};_.I=function mtb(){uxb(this.b!=-1);Av(this.c.b,this.b,null);--this.c.c;this.b=-1};_.a=-1;_.b=-1;var aH=Nkb(Cyb,'EnumSet/EnumSetImpl/IteratorImpl',167);hI(30,213,YAb,ntb,otb,ptb);_.Uc=function qtb(a,b){return gw(a)===gw(b)||a!=null&&rb(a,b)};_.Vc=function rtb(a){var b;b=vb(a);return b|0};var dH=Nkb(Cyb,'HashMap',30);hI(50,641,ZAb,vtb,wtb,xtb);_.ib=function ztb(a){return stb(this,a)};_.Q=function Atb(){this.a.Q()};_.Wc=function Btb(){return new xtb(this)};_.kb=function Ctb(a){return ttb(this,a)};_.V=function Dtb(){return this.a.Y()==0};_.mb=function Etb(){var a;return a=(new Snb(this.a)).a.bb().mb(),new Ynb(a)};_.nb=function Ftb(a){return utb(this,a)};_.Y=function Gtb(){return this.a.Y()};_.w=function Htb(){return Ze(new Snb(this.a))};var eH=Nkb(Cyb,'HashSet',50);hI(418,1,Oyb,Ntb);_.mb=function Otb(){return new Ptb(this)};_.c=0;var gH=Nkb(Cyb,'InternalHashCodeMap',418);hI(312,1,Ayb,Ptb);_.H=function Rtb(){return this.d=this.a[this.c++],this.d};_.G=function Qtb(){var a;if(this.c<this.a.length){return true}a=this.b.next();if(!a.done){this.a=a.value[1];this.c=0;return true}return false};_.I=function Stb(){Mtb(this.e,this.d.yb());this.c!=0&&--this.c};_.c=0;_.d=null;var fH=Nkb(Cyb,'InternalHashCodeMap/1',312);var Xtb;hI(382,1,Oyb,fub);_.mb=function gub(){return new hub(this)};_.c=0;_.d=0;var jH=Nkb(Cyb,'InternalStringMap',382);hI(293,1,Ayb,hub);_.H=function jub(){return this.c=this.a,this.a=this.b.next(),new lub(this.d,this.c,this.d.d)};_.G=function iub(){return !this.a.done};_.I=function kub(){eub(this.d,this.c.value[0])};var hH=Nkb(Cyb,'InternalStringMap/1',293);hI(383,652,Jyb,lub);_.yb=function mub(){return this.b.value[0]};_.zb=function nub(){if(this.a.d!=this.c){return cub(this.a,this.b.value[0])}return this.b.value[1]};_.Ab=function oub(a){return dub(this.a,this.b.value[0],a)};_.c=0;var iH=Nkb(Cyb,'InternalStringMap/2',383);hI(155,30,YAb,wub,xub);_.Q=function yub(){qub(this)};_.R=function zub(a){return Qmb(this.c,a)};_.ab=function Aub(a){var b;b=this.b.a;while(b!=this.b){if(ovb(b.e,a)){return true}b=b.a}return false};_.bb=function Bub(){return new Lub(this)};_.cb=function Cub(a){return rub(this,a)};_.db=function Dub(a,b){return tub(this,a,b)};_.eb=function Eub(a){return vub(this,a)};_.Y=function Fub(){return Zmb(this.c)};_.a=false;var nH=Nkb(Cyb,'LinkedHashMap',155);hI(176,163,{210:1,163:1,176:1,21:1},Iub,Jub);var kH=Nkb(Cyb,'LinkedHashMap/ChainEntry',176);hI(270,641,Eyb,Lub);_.Q=function Mub(){qub(this.a)};_.kb=function Nub(a){return Kub(this,a)};_.mb=function Oub(){return new Sub(this)};_.nb=function Pub(a){var b;if(Kub(this,a)){b=Wv(a,21).yb();vub(this.a,b);return true}return false};_.Y=function Qub(){return Zmb(this.a.c)};var mH=Nkb(Cyb,'LinkedHashMap/EntrySet',270);hI(271,1,Ayb,Sub);_.H=function Uub(){return Rub(this)};_.G=function Tub(){return this.b!=this.c.a.b};_.I=function Vub(){uxb(!!this.a);ksb(this.c.a.c,this);Hub(this.a);Wmb(this.c.a.c,this.a.d);lsb(this.c.a.c,this);this.a=null};var lH=Nkb(Cyb,'LinkedHashMap/EntrySet/EntryIterator',271);hI(70,50,ZAb,Wub,Xub,Yub);_.Wc=function Zub(){return new Yub(this)};var oH=Nkb(Cyb,'LinkedHashSet',70);hI(372,1,Hyb,cvb);_.J=function dvb(a){$ub(this,a)};_.G=function evb(){return this.b!=this.d.c};_.K=function fvb(){return this.b.b!=this.d.a};_.H=function gvb(){return _ub(this)};_.L=function hvb(){return this.a};_.M=function ivb(){return avb(this)};_.N=function jvb(){return this.a-1};_.I=function kvb(){bvb(this)};_.O=function lvb(a){uxb(!!this.c);this.c.c=a};_.a=0;_.c=null;var pH=Nkb(Cyb,'LinkedList/ListIteratorImpl',372);hI(259,1,{},mvb);var qH=Nkb(Cyb,'LinkedList/Node',259);hI(74,72,{3:1,54:1,46:1,74:1},nvb);var tH=Nkb(Cyb,'NoSuchElementException',74);hI(154,1,{154:1},yvb,zvb);_.a=0;_.b=0;var qvb,rvb,svb=0;var uH=Nkb(Cyb,'Random',154);hI(607,647,cBb);_.rb=function Avb(a,b){Dvb(a,this.a.c.length+1);uU(this.a,a,b)};_.ib=function Bvb(a){return vU(this.a,a)};_.jb=function Cvb(a){return xU(this.a,a)};_.Q=function Evb(){this.a.c=xv(UF,syb,1,0,4,1)};_.kb=function Fvb(a){return zU(this.a,a,0)!=-1};_.lb=function Gvb(a){return Xe(this.a,a)};_.sb=function Hvb(a){Dvb(a,this.a.c.length);return yU(this.a,a)};_.V=function Ivb(){return this.a.c.length==0};_.mb=function Jvb(){return new Tob(this.a)};_.vb=function Kvb(a){return Dvb(a,this.a.c.length),AU(this.a,a)};_.Xb=function Lvb(a,b){CU(this.a,a,b)};_.wb=function Mvb(a,b){Dvb(a,this.a.c.length);return DU(this.a,a,b)};_.Y=function Nvb(){return this.a.c.length};_.xb=function Ovb(a,b){return new Mnb(this.a,a,b)};_.ob=function Pvb(){return EU(this.a)};_.pb=function Qvb(a){return FU(this.a,a)};_.w=function Rvb(){return Ze(this.a)};var GH=Nkb(Cyb,'Vector',607);hI(337,607,cBb,Uvb);var vH=Nkb(Cyb,'Stack',337);hI(253,639,Ryb,iwb,jwb);_.Q=function kwb(){Vvb(this)};_.bb=function lwb(){return new wwb(this)};_.db=function mwb(a,b){return bwb(this,a,b)};_.eb=function nwb(a){return cwb(this,a)};_.Y=function owb(){return this.c};_.c=0;var EH=Nkb(Cyb,'TreeMap',253);hI(182,1,Ayb,rwb);_.H=function uwb(){return pwb(this)};_.G=function twb(){return Bnb(this.a)};_.I=function vwb(){qwb(this)};var wH=Nkb(Cyb,'TreeMap/EntryIterator',182);hI(209,287,Eyb,wwb);_.Q=function xwb(){Vvb(this.a)};var xH=Nkb(Cyb,'TreeMap/EntrySet',209);hI(183,163,{210:1,163:1,21:1,183:1},ywb);_.b=false;var yH=Nkb(Cyb,'TreeMap/Node',183);hI(254,1,{},zwb);_.w=function Awb(){return 'State: mv='+this.c+' value='+this.d+' done='+this.a+' found='+this.b};_.a=false;_.b=false;_.c=false;var zH=Nkb(Cyb,'TreeMap/State',254);hI(138,17,dBb,Gwb);_.Xc=function Hwb(){return false};_.Yc=function Iwb(){return false};var Bwb,Cwb,Dwb,Ewb;var DH=Okb(Cyb,'TreeMap/SubMapType',138,IF,Jwb);hI(352,138,dBb,Kwb);_.Yc=function Lwb(){return true};var AH=Okb(Cyb,'TreeMap/SubMapType/1',352,DH,null);hI(353,138,dBb,Mwb);_.Xc=function Nwb(){return true};_.Yc=function Owb(){return true};var BH=Okb(Cyb,'TreeMap/SubMapType/2',353,DH,null);hI(354,138,dBb,Pwb);_.Xc=function Qwb(){return true};var CH=Okb(Cyb,'TreeMap/SubMapType/3',354,DH,null);hI(191,641,{3:1,22:1,19:1,18:1,137:1,191:1},Vwb,Wwb);_.ib=function Xwb(a){return Rwb(this,a)};_.Q=function Ywb(){Vvb(this.a)};_.kb=function Zwb(a){return vob(this.a,a)};_.mb=function $wb(){var a;return a=new rwb((new wwb((new Gob(this.a)).a)).b),new Mob(a)};_.nb=function _wb(a){return Uwb(this,a)};_.Y=function axb(){return this.a.c};var FH=Nkb(Cyb,'TreeSet',191);var sxb=0;var Kxb,Lxb=0,Mxb;var mw=Qkb('int','I');var KH=Qkb('boolean','Z');var jw=Qkb('char','C');var kw=Qkb('double','D');var lw=Qkb('float','F');var Rxb=zt;var gwtOnLoad=gwtOnLoad=dI;bI(lI);eI('permProps',[[['locale','default'],['user.agent','gecko1_8']]]);
var $moduleName, $moduleBase, $stats = function(){}, $sessionId = function(){};
gwtOnLoad(null,'klay',null);
})();

},{}],11:[function(require,module,exports){
'use strict';
// Create a range object for efficently rendering strings to elements.
var range;

var doc = typeof document !== 'undefined' && document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var hasAttributeNS;

if (testEl.hasAttributeNS) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    hasAttributeNS = function(el, namespaceURI, name) {
        return !!el.getAttributeNode(name);
    };
}

function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            if (newValue === '' && fromEl.firstChild.nodeValue === fromEl.placeholder) {
                return;
            }

            fromEl.firstChild.nodeValue = newValue;
        }
    }
};

function noop() {}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Loop over all of the attributes on the target node and make sure the original
 * DOM node has the same attributes. If an attribute found on the original node
 * is not on the new node then remove it from the original node.
 *
 * @param  {Element} fromNode
 * @param  {Element} toNode
 */
function morphAttrs(fromNode, toNode) {
    if (toNode.assignAttributes) {
        toNode.assignAttributes(fromNode);
    } else {
        var attrs = toNode.attributes;
        var i;
        var attr;
        var attrName;
        var attrNamespaceURI;
        var attrValue;
        var fromValue;

        for (i = attrs.length - 1; i >= 0; --i) {
            attr = attrs[i];
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;
            attrValue = attr.value;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;
                fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
                }
            } else {
                fromValue = fromNode.getAttribute(attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttribute(attrName, attrValue);
                }
            }
        }

        // Remove any extra attributes found on the original DOM element that
        // weren't found on the target element.
        attrs = fromNode.attributes;

        for (i = attrs.length - 1; i >= 0; --i) {
            attr = attrs[i];
            if (attr.specified !== false) {
                attrName = attr.name;
                attrNamespaceURI = attr.namespaceURI;

                if (attrNamespaceURI) {
                    attrName = attr.localName || attrName;

                    if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                        fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                    }
                } else {
                    if (!hasAttributeNS(toNode, null, attrName)) {
                        fromNode.removeAttribute(attrName);
                    }
                }
            }
        }
    }
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdom(fromNode, toNode, options) {
    if (!options) {
        options = {};
    }

    if (typeof toNode === 'string') {
        if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
            var toNodeHtml = toNode;
            toNode = doc.createElement('html');
            toNode.innerHTML = toNodeHtml;
        } else {
            toNode = toElement(toNode);
        }
    }

    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
    var onNodeAdded = options.onNodeAdded || noop;
    var onBeforeElUpdated = options.onBeforeElUpdated || noop;
    var onElUpdated = options.onElUpdated || noop;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
    var onNodeDiscarded = options.onNodeDiscarded || noop;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
    var childrenOnly = options.childrenOnly === true;

    // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
    var fromNodesLookup = {};
    var keyedRemovalList;

    function addKeyedRemoval(key) {
        if (keyedRemovalList) {
            keyedRemovalList.push(key);
        } else {
            keyedRemovalList = [key];
        }
    }

    function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {

                var key = undefined;

                if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                    // If we are skipping keyed nodes then we add the key
                    // to a list so that it can be handled at the very end.
                    addKeyedRemoval(key);
                } else {
                    // Only report the node as discarded if it is not keyed. We do this because
                    // at the end we loop through all keyed elements that were unmatched
                    // and then discard them in one final pass.
                    onNodeDiscarded(curChild);
                    if (curChild.firstChild) {
                        walkDiscardedChildNodes(curChild, skipKeyedNodes);
                    }
                }

                curChild = curChild.nextSibling;
            }
        }
    }

    /**
     * Removes a DOM node out of the original DOM
     *
     * @param  {Node} node The node to remove
     * @param  {Node} parentNode The nodes parent
     * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
     * @return {undefined}
     */
    function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
            return;
        }

        if (parentNode) {
            parentNode.removeChild(node);
        }

        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
    }

    // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
    // function indexTree(root) {
    //     var treeWalker = document.createTreeWalker(
    //         root,
    //         NodeFilter.SHOW_ELEMENT);
    //
    //     var el;
    //     while((el = treeWalker.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
    //
    // function indexTree(node) {
    //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
    //     var el;
    //     while((el = nodeIterator.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {
                var key = getNodeKey(curChild);
                if (key) {
                    fromNodesLookup[key] = curChild;
                }

                // Walk recursively
                indexTree(curChild);

                curChild = curChild.nextSibling;
            }
        }
    }

    indexTree(fromNode);

    function handleNodeAdded(el) {
        onNodeAdded(el);

        var curChild = el.firstChild;
        while (curChild) {
            var nextSibling = curChild.nextSibling;

            var key = getNodeKey(curChild);
            if (key) {
                var unmatchedFromEl = fromNodesLookup[key];
                if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                    curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                    morphEl(unmatchedFromEl, curChild);
                }
            }

            handleNodeAdded(curChild);
            curChild = nextSibling;
        }
    }

    function morphEl(fromEl, toEl, childrenOnly) {
        var toElKey = getNodeKey(toEl);
        var curFromNodeKey;

        if (toElKey) {
            // If an element with an ID is being morphed then it is will be in the final
            // DOM so clear it out of the saved elements collection
            delete fromNodesLookup[toElKey];
        }

        if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
            return;
        }

        if (!childrenOnly) {
            if (onBeforeElUpdated(fromEl, toEl) === false) {
                return;
            }

            morphAttrs(fromEl, toEl);
            onElUpdated(fromEl);

            if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                return;
            }
        }

        if (fromEl.nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = getNodeKey(curToNodeChild);

                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    curFromNodeKey = getNodeKey(curFromNodeChild);

                    var curFromNodeType = curFromNodeChild.nodeType;

                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                        if (curFromNodeChild.nextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's moving the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked
                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            fromNextSibling = curFromNodeChild.nextSibling;

                                            if (curFromNodeKey) {
                                                // Since the node is keyed it might be matched up later so we defer
                                                // the actual removal to later
                                                addKeyedRemoval(curFromNodeKey);
                                            } else {
                                                // NOTE: we skip nested keyed nodes from being removed since there is
                                                //       still a chance they will be matched up later
                                                removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                            }

                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild);
                            }

                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }
                    }

                    if (isCompatible) {
                        // Advance both the "to" child and the "from" child since we found a match
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    if (curFromNodeKey) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }

                    curFromNodeChild = fromNextSibling;
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    morphEl(matchingFromEl, curToNodeChild);
                } else {
                    var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                    if (onBeforeNodeAddedResult !== false) {
                        if (onBeforeNodeAddedResult) {
                            curToNodeChild = onBeforeNodeAddedResult;
                        }

                        if (curToNodeChild.actualize) {
                            curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        fromEl.appendChild(curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                    }
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                fromNextSibling = curFromNodeChild.nextSibling;
                if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                    // Since the node is keyed it might be matched up later so we defer
                    // the actual removal to later
                    addKeyedRemoval(curFromNodeKey);
                } else {
                    // NOTE: we skip nested keyed nodes from being removed since there is
                    //       still a chance they will be matched up later
                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                }
                curFromNodeChild = fromNextSibling;
            }
        }

        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
        // Handle the case where we are given two DOM nodes that are not
        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
        if (morphedNodeType === ELEMENT_NODE) {
            if (toNodeType === ELEMENT_NODE) {
                if (!compareNodeNames(fromNode, toNode)) {
                    onNodeDiscarded(fromNode);
                    morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                }
            } else {
                // Going from an element node to a text node
                morphedNode = toNode;
            }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
            if (toNodeType === morphedNodeType) {
                morphedNode.nodeValue = toNode.nodeValue;
                return morphedNode;
            } else {
                // Text node to something else
                morphedNode = toNode;
            }
        }
    }

    if (morphedNode === toNode) {
        // The "to node" was not compatible with the "from node" so we had to
        // toss out the "from node" and use the "to node"
        onNodeDiscarded(fromNode);
    } else {
        morphEl(morphedNode, toNode, childrenOnly);

        // We now need to loop over any keyed nodes that might need to be
        // removed. We only do the removal if we know that the keyed node
        // never found a match. When a keyed node is matched up we remove
        // it out of fromNodesLookup and we use fromNodesLookup to determine
        // if a keyed node has been matched up or not
        if (keyedRemovalList) {
            for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                if (elToRemove) {
                    removeNode(elToRemove, elToRemove.parentNode, false);
                }
            }
        }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
            morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        // If we had to swap out the from node with a new node because the old
        // node was not compatible with the target node then we need to
        // replace the old DOM node in the original DOM tree. This is only
        // possible if the original DOM node was part of a DOM tree which
        // we know is the case if it has a parent node.
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
}

module.exports = morphdom;

},{}],12:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"global/document":6,"global/window":7}],13:[function(require,module,exports){
/*
Author: Geraint Luff and others
Year: 2013

This code is released into the "public domain" by its author(s).  Anybody may use, alter and distribute the code without restriction.  The author makes no guarantees, and takes no liability of any kind for use of this code.

If you find a bug or make an improvement, it would be courteous to let the author know, but it is not compulsory.
*/
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports){
    // CommonJS. Define export.
    module.exports = factory();
  } else {
    // Browser globals
    global.tv4 = factory();
  }
}(this, function () {

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FObject%2Fkeys
if (!Object.keys) {
	Object.keys = (function () {
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;

		return function (obj) {
			if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
				throw new TypeError('Object.keys called on non-object');
			}

			var result = [];

			for (var prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}

			if (hasDontEnumBug) {
				for (var i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	})();
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
if (!Object.create) {
	Object.create = (function(){
		function F(){}

		return function(o){
			if (arguments.length !== 1) {
				throw new Error('Object.create implementation only accepts one parameter.');
			}
			F.prototype = o;
			return new F();
		};
	})();
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FisArray
if(!Array.isArray) {
	Array.isArray = function (vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	};
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FArray%2FindexOf
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		if (this === null) {
			throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;

		if (len === 0) {
			return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
			n = Number(arguments[1]);
			if (n !== n) { // shortcut for verifying if it's NaN
				n = 0;
			} else if (n !== 0 && n !== Infinity && n !== -Infinity) {
				n = (n > 0 || -1) * Math.floor(Math.abs(n));
			}
		}
		if (n >= len) {
			return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) {
				return k;
			}
		}
		return -1;
	};
}

// Grungey Object.isFrozen hack
if (!Object.isFrozen) {
	Object.isFrozen = function (obj) {
		var key = "tv4_test_frozen_key";
		while (obj.hasOwnProperty(key)) {
			key += Math.random();
		}
		try {
			obj[key] = true;
			delete obj[key];
			return false;
		} catch (e) {
			return true;
		}
	};
}
// Based on: https://github.com/geraintluff/uri-templates, but with all the de-substitution stuff removed

var uriTemplateGlobalModifiers = {
	"+": true,
	"#": true,
	".": true,
	"/": true,
	";": true,
	"?": true,
	"&": true
};
var uriTemplateSuffices = {
	"*": true
};

function notReallyPercentEncode(string) {
	return encodeURI(string).replace(/%25[0-9][0-9]/g, function (doubleEncoded) {
		return "%" + doubleEncoded.substring(3);
	});
}

function uriTemplateSubstitution(spec) {
	var modifier = "";
	if (uriTemplateGlobalModifiers[spec.charAt(0)]) {
		modifier = spec.charAt(0);
		spec = spec.substring(1);
	}
	var separator = "";
	var prefix = "";
	var shouldEscape = true;
	var showVariables = false;
	var trimEmptyString = false;
	if (modifier === '+') {
		shouldEscape = false;
	} else if (modifier === ".") {
		prefix = ".";
		separator = ".";
	} else if (modifier === "/") {
		prefix = "/";
		separator = "/";
	} else if (modifier === '#') {
		prefix = "#";
		shouldEscape = false;
	} else if (modifier === ';') {
		prefix = ";";
		separator = ";";
		showVariables = true;
		trimEmptyString = true;
	} else if (modifier === '?') {
		prefix = "?";
		separator = "&";
		showVariables = true;
	} else if (modifier === '&') {
		prefix = "&";
		separator = "&";
		showVariables = true;
	}

	var varNames = [];
	var varList = spec.split(",");
	var varSpecs = [];
	var varSpecMap = {};
	for (var i = 0; i < varList.length; i++) {
		var varName = varList[i];
		var truncate = null;
		if (varName.indexOf(":") !== -1) {
			var parts = varName.split(":");
			varName = parts[0];
			truncate = parseInt(parts[1], 10);
		}
		var suffices = {};
		while (uriTemplateSuffices[varName.charAt(varName.length - 1)]) {
			suffices[varName.charAt(varName.length - 1)] = true;
			varName = varName.substring(0, varName.length - 1);
		}
		var varSpec = {
			truncate: truncate,
			name: varName,
			suffices: suffices
		};
		varSpecs.push(varSpec);
		varSpecMap[varName] = varSpec;
		varNames.push(varName);
	}
	var subFunction = function (valueFunction) {
		var result = "";
		var startIndex = 0;
		for (var i = 0; i < varSpecs.length; i++) {
			var varSpec = varSpecs[i];
			var value = valueFunction(varSpec.name);
			if (value === null || value === undefined || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && Object.keys(value).length === 0)) {
				startIndex++;
				continue;
			}
			if (i === startIndex) {
				result += prefix;
			} else {
				result += (separator || ",");
			}
			if (Array.isArray(value)) {
				if (showVariables) {
					result += varSpec.name + "=";
				}
				for (var j = 0; j < value.length; j++) {
					if (j > 0) {
						result += varSpec.suffices['*'] ? (separator || ",") : ",";
						if (varSpec.suffices['*'] && showVariables) {
							result += varSpec.name + "=";
						}
					}
					result += shouldEscape ? encodeURIComponent(value[j]).replace(/!/g, "%21") : notReallyPercentEncode(value[j]);
				}
			} else if (typeof value === "object") {
				if (showVariables && !varSpec.suffices['*']) {
					result += varSpec.name + "=";
				}
				var first = true;
				for (var key in value) {
					if (!first) {
						result += varSpec.suffices['*'] ? (separator || ",") : ",";
					}
					first = false;
					result += shouldEscape ? encodeURIComponent(key).replace(/!/g, "%21") : notReallyPercentEncode(key);
					result += varSpec.suffices['*'] ? '=' : ",";
					result += shouldEscape ? encodeURIComponent(value[key]).replace(/!/g, "%21") : notReallyPercentEncode(value[key]);
				}
			} else {
				if (showVariables) {
					result += varSpec.name;
					if (!trimEmptyString || value !== "") {
						result += "=";
					}
				}
				if (varSpec.truncate != null) {
					value = value.substring(0, varSpec.truncate);
				}
				result += shouldEscape ? encodeURIComponent(value).replace(/!/g, "%21"): notReallyPercentEncode(value);
			}
		}
		return result;
	};
	subFunction.varNames = varNames;
	return {
		prefix: prefix,
		substitution: subFunction
	};
}

function UriTemplate(template) {
	if (!(this instanceof UriTemplate)) {
		return new UriTemplate(template);
	}
	var parts = template.split("{");
	var textParts = [parts.shift()];
	var prefixes = [];
	var substitutions = [];
	var varNames = [];
	while (parts.length > 0) {
		var part = parts.shift();
		var spec = part.split("}")[0];
		var remainder = part.substring(spec.length + 1);
		var funcs = uriTemplateSubstitution(spec);
		substitutions.push(funcs.substitution);
		prefixes.push(funcs.prefix);
		textParts.push(remainder);
		varNames = varNames.concat(funcs.substitution.varNames);
	}
	this.fill = function (valueFunction) {
		var result = textParts[0];
		for (var i = 0; i < substitutions.length; i++) {
			var substitution = substitutions[i];
			result += substitution(valueFunction);
			result += textParts[i + 1];
		}
		return result;
	};
	this.varNames = varNames;
	this.template = template;
}
UriTemplate.prototype = {
	toString: function () {
		return this.template;
	},
	fillFromObject: function (obj) {
		return this.fill(function (varName) {
			return obj[varName];
		});
	}
};
var ValidatorContext = function ValidatorContext(parent, collectMultiple, errorReporter, checkRecursive, trackUnknownProperties) {
	this.missing = [];
	this.missingMap = {};
	this.formatValidators = parent ? Object.create(parent.formatValidators) : {};
	this.schemas = parent ? Object.create(parent.schemas) : {};
	this.collectMultiple = collectMultiple;
	this.errors = [];
	this.handleError = collectMultiple ? this.collectError : this.returnError;
	if (checkRecursive) {
		this.checkRecursive = true;
		this.scanned = [];
		this.scannedFrozen = [];
		this.scannedFrozenSchemas = [];
		this.scannedFrozenValidationErrors = [];
		this.validatedSchemasKey = 'tv4_validation_id';
		this.validationErrorsKey = 'tv4_validation_errors_id';
	}
	if (trackUnknownProperties) {
		this.trackUnknownProperties = true;
		this.knownPropertyPaths = {};
		this.unknownPropertyPaths = {};
	}
	this.errorReporter = errorReporter || defaultErrorReporter('en');
	if (typeof this.errorReporter === 'string') {
		throw new Error('debug');
	}
	this.definedKeywords = {};
	if (parent) {
		for (var key in parent.definedKeywords) {
			this.definedKeywords[key] = parent.definedKeywords[key].slice(0);
		}
	}
};
ValidatorContext.prototype.defineKeyword = function (keyword, keywordFunction) {
	this.definedKeywords[keyword] = this.definedKeywords[keyword] || [];
	this.definedKeywords[keyword].push(keywordFunction);
};
ValidatorContext.prototype.createError = function (code, messageParams, dataPath, schemaPath, subErrors, data, schema) {
	var error = new ValidationError(code, messageParams, dataPath, schemaPath, subErrors);
	error.message = this.errorReporter(error, data, schema);
	return error;
};
ValidatorContext.prototype.returnError = function (error) {
	return error;
};
ValidatorContext.prototype.collectError = function (error) {
	if (error) {
		this.errors.push(error);
	}
	return null;
};
ValidatorContext.prototype.prefixErrors = function (startIndex, dataPath, schemaPath) {
	for (var i = startIndex; i < this.errors.length; i++) {
		this.errors[i] = this.errors[i].prefixWith(dataPath, schemaPath);
	}
	return this;
};
ValidatorContext.prototype.banUnknownProperties = function (data, schema) {
	for (var unknownPath in this.unknownPropertyPaths) {
		var error = this.createError(ErrorCodes.UNKNOWN_PROPERTY, {path: unknownPath}, unknownPath, "", null, data, schema);
		var result = this.handleError(error);
		if (result) {
			return result;
		}
	}
	return null;
};

ValidatorContext.prototype.addFormat = function (format, validator) {
	if (typeof format === 'object') {
		for (var key in format) {
			this.addFormat(key, format[key]);
		}
		return this;
	}
	this.formatValidators[format] = validator;
};
ValidatorContext.prototype.resolveRefs = function (schema, urlHistory) {
	if (schema['$ref'] !== undefined) {
		urlHistory = urlHistory || {};
		if (urlHistory[schema['$ref']]) {
			return this.createError(ErrorCodes.CIRCULAR_REFERENCE, {urls: Object.keys(urlHistory).join(', ')}, '', '', null, undefined, schema);
		}
		urlHistory[schema['$ref']] = true;
		schema = this.getSchema(schema['$ref'], urlHistory);
	}
	return schema;
};
ValidatorContext.prototype.getSchema = function (url, urlHistory) {
	var schema;
	if (this.schemas[url] !== undefined) {
		schema = this.schemas[url];
		return this.resolveRefs(schema, urlHistory);
	}
	var baseUrl = url;
	var fragment = "";
	if (url.indexOf('#') !== -1) {
		fragment = url.substring(url.indexOf("#") + 1);
		baseUrl = url.substring(0, url.indexOf("#"));
	}
	if (typeof this.schemas[baseUrl] === 'object') {
		schema = this.schemas[baseUrl];
		var pointerPath = decodeURIComponent(fragment);
		if (pointerPath === "") {
			return this.resolveRefs(schema, urlHistory);
		} else if (pointerPath.charAt(0) !== "/") {
			return undefined;
		}
		var parts = pointerPath.split("/").slice(1);
		for (var i = 0; i < parts.length; i++) {
			var component = parts[i].replace(/~1/g, "/").replace(/~0/g, "~");
			if (schema[component] === undefined) {
				schema = undefined;
				break;
			}
			schema = schema[component];
		}
		if (schema !== undefined) {
			return this.resolveRefs(schema, urlHistory);
		}
	}
	if (this.missing[baseUrl] === undefined) {
		this.missing.push(baseUrl);
		this.missing[baseUrl] = baseUrl;
		this.missingMap[baseUrl] = baseUrl;
	}
};
ValidatorContext.prototype.searchSchemas = function (schema, url) {
	if (Array.isArray(schema)) {
		for (var i = 0; i < schema.length; i++) {
			this.searchSchemas(schema[i], url);
		}
	} else if (schema && typeof schema === "object") {
		if (typeof schema.id === "string") {
			if (isTrustedUrl(url, schema.id)) {
				if (this.schemas[schema.id] === undefined) {
					this.schemas[schema.id] = schema;
				}
			}
		}
		for (var key in schema) {
			if (key !== "enum") {
				if (typeof schema[key] === "object") {
					this.searchSchemas(schema[key], url);
				} else if (key === "$ref") {
					var uri = getDocumentUri(schema[key]);
					if (uri && this.schemas[uri] === undefined && this.missingMap[uri] === undefined) {
						this.missingMap[uri] = uri;
					}
				}
			}
		}
	}
};
ValidatorContext.prototype.addSchema = function (url, schema) {
	//overload
	if (typeof url !== 'string' || typeof schema === 'undefined') {
		if (typeof url === 'object' && typeof url.id === 'string') {
			schema = url;
			url = schema.id;
		}
		else {
			return;
		}
	}
	if (url === getDocumentUri(url) + "#") {
		// Remove empty fragment
		url = getDocumentUri(url);
	}
	this.schemas[url] = schema;
	delete this.missingMap[url];
	normSchema(schema, url);
	this.searchSchemas(schema, url);
};

ValidatorContext.prototype.getSchemaMap = function () {
	var map = {};
	for (var key in this.schemas) {
		map[key] = this.schemas[key];
	}
	return map;
};

ValidatorContext.prototype.getSchemaUris = function (filterRegExp) {
	var list = [];
	for (var key in this.schemas) {
		if (!filterRegExp || filterRegExp.test(key)) {
			list.push(key);
		}
	}
	return list;
};

ValidatorContext.prototype.getMissingUris = function (filterRegExp) {
	var list = [];
	for (var key in this.missingMap) {
		if (!filterRegExp || filterRegExp.test(key)) {
			list.push(key);
		}
	}
	return list;
};

ValidatorContext.prototype.dropSchemas = function () {
	this.schemas = {};
	this.reset();
};
ValidatorContext.prototype.reset = function () {
	this.missing = [];
	this.missingMap = {};
	this.errors = [];
};

ValidatorContext.prototype.validateAll = function (data, schema, dataPathParts, schemaPathParts, dataPointerPath) {
	var topLevel;
	schema = this.resolveRefs(schema);
	if (!schema) {
		return null;
	} else if (schema instanceof ValidationError) {
		this.errors.push(schema);
		return schema;
	}

	var startErrorCount = this.errors.length;
	var frozenIndex, scannedFrozenSchemaIndex = null, scannedSchemasIndex = null;
	if (this.checkRecursive && data && typeof data === 'object') {
		topLevel = !this.scanned.length;
		if (data[this.validatedSchemasKey]) {
			var schemaIndex = data[this.validatedSchemasKey].indexOf(schema);
			if (schemaIndex !== -1) {
				this.errors = this.errors.concat(data[this.validationErrorsKey][schemaIndex]);
				return null;
			}
		}
		if (Object.isFrozen(data)) {
			frozenIndex = this.scannedFrozen.indexOf(data);
			if (frozenIndex !== -1) {
				var frozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].indexOf(schema);
				if (frozenSchemaIndex !== -1) {
					this.errors = this.errors.concat(this.scannedFrozenValidationErrors[frozenIndex][frozenSchemaIndex]);
					return null;
				}
			}
		}
		this.scanned.push(data);
		if (Object.isFrozen(data)) {
			if (frozenIndex === -1) {
				frozenIndex = this.scannedFrozen.length;
				this.scannedFrozen.push(data);
				this.scannedFrozenSchemas.push([]);
			}
			scannedFrozenSchemaIndex = this.scannedFrozenSchemas[frozenIndex].length;
			this.scannedFrozenSchemas[frozenIndex][scannedFrozenSchemaIndex] = schema;
			this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = [];
		} else {
			if (!data[this.validatedSchemasKey]) {
				try {
					Object.defineProperty(data, this.validatedSchemasKey, {
						value: [],
						configurable: true
					});
					Object.defineProperty(data, this.validationErrorsKey, {
						value: [],
						configurable: true
					});
				} catch (e) {
					//IE 7/8 workaround
					data[this.validatedSchemasKey] = [];
					data[this.validationErrorsKey] = [];
				}
			}
			scannedSchemasIndex = data[this.validatedSchemasKey].length;
			data[this.validatedSchemasKey][scannedSchemasIndex] = schema;
			data[this.validationErrorsKey][scannedSchemasIndex] = [];
		}
	}

	var errorCount = this.errors.length;
	var error = this.validateBasic(data, schema, dataPointerPath)
		|| this.validateNumeric(data, schema, dataPointerPath)
		|| this.validateString(data, schema, dataPointerPath)
		|| this.validateArray(data, schema, dataPointerPath)
		|| this.validateObject(data, schema, dataPointerPath)
		|| this.validateCombinations(data, schema, dataPointerPath)
		|| this.validateHypermedia(data, schema, dataPointerPath)
		|| this.validateFormat(data, schema, dataPointerPath)
		|| this.validateDefinedKeywords(data, schema, dataPointerPath)
		|| null;

	if (topLevel) {
		while (this.scanned.length) {
			var item = this.scanned.pop();
			delete item[this.validatedSchemasKey];
		}
		this.scannedFrozen = [];
		this.scannedFrozenSchemas = [];
	}

	if (error || errorCount !== this.errors.length) {
		while ((dataPathParts && dataPathParts.length) || (schemaPathParts && schemaPathParts.length)) {
			var dataPart = (dataPathParts && dataPathParts.length) ? "" + dataPathParts.pop() : null;
			var schemaPart = (schemaPathParts && schemaPathParts.length) ? "" + schemaPathParts.pop() : null;
			if (error) {
				error = error.prefixWith(dataPart, schemaPart);
			}
			this.prefixErrors(errorCount, dataPart, schemaPart);
		}
	}

	if (scannedFrozenSchemaIndex !== null) {
		this.scannedFrozenValidationErrors[frozenIndex][scannedFrozenSchemaIndex] = this.errors.slice(startErrorCount);
	} else if (scannedSchemasIndex !== null) {
		data[this.validationErrorsKey][scannedSchemasIndex] = this.errors.slice(startErrorCount);
	}

	return this.handleError(error);
};
ValidatorContext.prototype.validateFormat = function (data, schema) {
	if (typeof schema.format !== 'string' || !this.formatValidators[schema.format]) {
		return null;
	}
	var errorMessage = this.formatValidators[schema.format].call(null, data, schema);
	if (typeof errorMessage === 'string' || typeof errorMessage === 'number') {
		return this.createError(ErrorCodes.FORMAT_CUSTOM, {message: errorMessage}, '', '/format', null, data, schema);
	} else if (errorMessage && typeof errorMessage === 'object') {
		return this.createError(ErrorCodes.FORMAT_CUSTOM, {message: errorMessage.message || "?"}, errorMessage.dataPath || '', errorMessage.schemaPath || "/format", null, data, schema);
	}
	return null;
};
ValidatorContext.prototype.validateDefinedKeywords = function (data, schema, dataPointerPath) {
	for (var key in this.definedKeywords) {
		if (typeof schema[key] === 'undefined') {
			continue;
		}
		var validationFunctions = this.definedKeywords[key];
		for (var i = 0; i < validationFunctions.length; i++) {
			var func = validationFunctions[i];
			var result = func(data, schema[key], schema, dataPointerPath);
			if (typeof result === 'string' || typeof result === 'number') {
				return this.createError(ErrorCodes.KEYWORD_CUSTOM, {key: key, message: result}, '', '', null, data, schema).prefixWith(null, key);
			} else if (result && typeof result === 'object') {
				var code = result.code;
				if (typeof code === 'string') {
					if (!ErrorCodes[code]) {
						throw new Error('Undefined error code (use defineError): ' + code);
					}
					code = ErrorCodes[code];
				} else if (typeof code !== 'number') {
					code = ErrorCodes.KEYWORD_CUSTOM;
				}
				var messageParams = (typeof result.message === 'object') ? result.message : {key: key, message: result.message || "?"};
				var schemaPath = result.schemaPath || ("/" + key.replace(/~/g, '~0').replace(/\//g, '~1'));
				return this.createError(code, messageParams, result.dataPath || null, schemaPath, null, data, schema);
			}
		}
	}
	return null;
};

function recursiveCompare(A, B) {
	if (A === B) {
		return true;
	}
	if (A && B && typeof A === "object" && typeof B === "object") {
		if (Array.isArray(A) !== Array.isArray(B)) {
			return false;
		} else if (Array.isArray(A)) {
			if (A.length !== B.length) {
				return false;
			}
			for (var i = 0; i < A.length; i++) {
				if (!recursiveCompare(A[i], B[i])) {
					return false;
				}
			}
		} else {
			var key;
			for (key in A) {
				if (B[key] === undefined && A[key] !== undefined) {
					return false;
				}
			}
			for (key in B) {
				if (A[key] === undefined && B[key] !== undefined) {
					return false;
				}
			}
			for (key in A) {
				if (!recursiveCompare(A[key], B[key])) {
					return false;
				}
			}
		}
		return true;
	}
	return false;
}

ValidatorContext.prototype.validateBasic = function validateBasic(data, schema, dataPointerPath) {
	var error;
	if (error = this.validateType(data, schema, dataPointerPath)) {
		return error.prefixWith(null, "type");
	}
	if (error = this.validateEnum(data, schema, dataPointerPath)) {
		return error.prefixWith(null, "type");
	}
	return null;
};

ValidatorContext.prototype.validateType = function validateType(data, schema) {
	if (schema.type === undefined) {
		return null;
	}
	var dataType = typeof data;
	if (data === null) {
		dataType = "null";
	} else if (Array.isArray(data)) {
		dataType = "array";
	}
	var allowedTypes = schema.type;
	if (!Array.isArray(allowedTypes)) {
		allowedTypes = [allowedTypes];
	}

	for (var i = 0; i < allowedTypes.length; i++) {
		var type = allowedTypes[i];
		if (type === dataType || (type === "integer" && dataType === "number" && (data % 1 === 0))) {
			return null;
		}
	}
	return this.createError(ErrorCodes.INVALID_TYPE, {type: dataType, expected: allowedTypes.join("/")}, '', '', null, data, schema);
};

ValidatorContext.prototype.validateEnum = function validateEnum(data, schema) {
	if (schema["enum"] === undefined) {
		return null;
	}
	for (var i = 0; i < schema["enum"].length; i++) {
		var enumVal = schema["enum"][i];
		if (recursiveCompare(data, enumVal)) {
			return null;
		}
	}
	return this.createError(ErrorCodes.ENUM_MISMATCH, {value: (typeof JSON !== 'undefined') ? JSON.stringify(data) : data}, '', '', null, data, schema);
};

ValidatorContext.prototype.validateNumeric = function validateNumeric(data, schema, dataPointerPath) {
	return this.validateMultipleOf(data, schema, dataPointerPath)
		|| this.validateMinMax(data, schema, dataPointerPath)
		|| this.validateNaN(data, schema, dataPointerPath)
		|| null;
};

var CLOSE_ENOUGH_LOW = Math.pow(2, -51);
var CLOSE_ENOUGH_HIGH = 1 - CLOSE_ENOUGH_LOW;
ValidatorContext.prototype.validateMultipleOf = function validateMultipleOf(data, schema) {
	var multipleOf = schema.multipleOf || schema.divisibleBy;
	if (multipleOf === undefined) {
		return null;
	}
	if (typeof data === "number") {
		var remainder = (data/multipleOf)%1;
		if (remainder >= CLOSE_ENOUGH_LOW && remainder < CLOSE_ENOUGH_HIGH) {
			return this.createError(ErrorCodes.NUMBER_MULTIPLE_OF, {value: data, multipleOf: multipleOf}, '', '', null, data, schema);
		}
	}
	return null;
};

ValidatorContext.prototype.validateMinMax = function validateMinMax(data, schema) {
	if (typeof data !== "number") {
		return null;
	}
	if (schema.minimum !== undefined) {
		if (data < schema.minimum) {
			return this.createError(ErrorCodes.NUMBER_MINIMUM, {value: data, minimum: schema.minimum}, '', '/minimum', null, data, schema);
		}
		if (schema.exclusiveMinimum && data === schema.minimum) {
			return this.createError(ErrorCodes.NUMBER_MINIMUM_EXCLUSIVE, {value: data, minimum: schema.minimum}, '', '/exclusiveMinimum', null, data, schema);
		}
	}
	if (schema.maximum !== undefined) {
		if (data > schema.maximum) {
			return this.createError(ErrorCodes.NUMBER_MAXIMUM, {value: data, maximum: schema.maximum}, '', '/maximum', null, data, schema);
		}
		if (schema.exclusiveMaximum && data === schema.maximum) {
			return this.createError(ErrorCodes.NUMBER_MAXIMUM_EXCLUSIVE, {value: data, maximum: schema.maximum}, '', '/exclusiveMaximum', null, data, schema);
		}
	}
	return null;
};

ValidatorContext.prototype.validateNaN = function validateNaN(data, schema) {
	if (typeof data !== "number") {
		return null;
	}
	if (isNaN(data) === true || data === Infinity || data === -Infinity) {
		return this.createError(ErrorCodes.NUMBER_NOT_A_NUMBER, {value: data}, '', '/type', null, data, schema);
	}
	return null;
};

ValidatorContext.prototype.validateString = function validateString(data, schema, dataPointerPath) {
	return this.validateStringLength(data, schema, dataPointerPath)
		|| this.validateStringPattern(data, schema, dataPointerPath)
		|| null;
};

ValidatorContext.prototype.validateStringLength = function validateStringLength(data, schema) {
	if (typeof data !== "string") {
		return null;
	}
	if (schema.minLength !== undefined) {
		if (data.length < schema.minLength) {
			return this.createError(ErrorCodes.STRING_LENGTH_SHORT, {length: data.length, minimum: schema.minLength}, '', '/minLength', null, data, schema);
		}
	}
	if (schema.maxLength !== undefined) {
		if (data.length > schema.maxLength) {
			return this.createError(ErrorCodes.STRING_LENGTH_LONG, {length: data.length, maximum: schema.maxLength}, '', '/maxLength', null, data, schema);
		}
	}
	return null;
};

ValidatorContext.prototype.validateStringPattern = function validateStringPattern(data, schema) {
	if (typeof data !== "string" || (typeof schema.pattern !== "string" && !(schema.pattern instanceof RegExp))) {
		return null;
	}
	var regexp;
	if (schema.pattern instanceof RegExp) {
	  regexp = schema.pattern;
	}
	else {
	  var body, flags = '';
	  // Check for regular expression literals
	  // @see http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.5
	  var literal = schema.pattern.match(/^\/(.+)\/([img]*)$/);
	  if (literal) {
	    body = literal[1];
	    flags = literal[2];
	  }
	  else {
	    body = schema.pattern;
	  }
	  regexp = new RegExp(body, flags);
	}
	if (!regexp.test(data)) {
		return this.createError(ErrorCodes.STRING_PATTERN, {pattern: schema.pattern}, '', '/pattern', null, data, schema);
	}
	return null;
};

ValidatorContext.prototype.validateArray = function validateArray(data, schema, dataPointerPath) {
	if (!Array.isArray(data)) {
		return null;
	}
	return this.validateArrayLength(data, schema, dataPointerPath)
		|| this.validateArrayUniqueItems(data, schema, dataPointerPath)
		|| this.validateArrayItems(data, schema, dataPointerPath)
		|| null;
};

ValidatorContext.prototype.validateArrayLength = function validateArrayLength(data, schema) {
	var error;
	if (schema.minItems !== undefined) {
		if (data.length < schema.minItems) {
			error = this.createError(ErrorCodes.ARRAY_LENGTH_SHORT, {length: data.length, minimum: schema.minItems}, '', '/minItems', null, data, schema);
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	if (schema.maxItems !== undefined) {
		if (data.length > schema.maxItems) {
			error = this.createError(ErrorCodes.ARRAY_LENGTH_LONG, {length: data.length, maximum: schema.maxItems}, '', '/maxItems', null, data, schema);
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateArrayUniqueItems = function validateArrayUniqueItems(data, schema) {
	if (schema.uniqueItems) {
		for (var i = 0; i < data.length; i++) {
			for (var j = i + 1; j < data.length; j++) {
				if (recursiveCompare(data[i], data[j])) {
					var error = this.createError(ErrorCodes.ARRAY_UNIQUE, {match1: i, match2: j}, '', '/uniqueItems', null, data, schema);
					if (this.handleError(error)) {
						return error;
					}
				}
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateArrayItems = function validateArrayItems(data, schema, dataPointerPath) {
	if (schema.items === undefined) {
		return null;
	}
	var error, i;
	if (Array.isArray(schema.items)) {
		for (i = 0; i < data.length; i++) {
			if (i < schema.items.length) {
				if (error = this.validateAll(data[i], schema.items[i], [i], ["items", i], dataPointerPath + "/" + i)) {
					return error;
				}
			} else if (schema.additionalItems !== undefined) {
				if (typeof schema.additionalItems === "boolean") {
					if (!schema.additionalItems) {
						error = (this.createError(ErrorCodes.ARRAY_ADDITIONAL_ITEMS, {}, '/' + i, '/additionalItems', null, data, schema));
						if (this.handleError(error)) {
							return error;
						}
					}
				} else if (error = this.validateAll(data[i], schema.additionalItems, [i], ["additionalItems"], dataPointerPath + "/" + i)) {
					return error;
				}
			}
		}
	} else {
		for (i = 0; i < data.length; i++) {
			if (error = this.validateAll(data[i], schema.items, [i], ["items"], dataPointerPath + "/" + i)) {
				return error;
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateObject = function validateObject(data, schema, dataPointerPath) {
	if (typeof data !== "object" || data === null || Array.isArray(data)) {
		return null;
	}
	return this.validateObjectMinMaxProperties(data, schema, dataPointerPath)
		|| this.validateObjectRequiredProperties(data, schema, dataPointerPath)
		|| this.validateObjectProperties(data, schema, dataPointerPath)
		|| this.validateObjectDependencies(data, schema, dataPointerPath)
		|| null;
};

ValidatorContext.prototype.validateObjectMinMaxProperties = function validateObjectMinMaxProperties(data, schema) {
	var keys = Object.keys(data);
	var error;
	if (schema.minProperties !== undefined) {
		if (keys.length < schema.minProperties) {
			error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MINIMUM, {propertyCount: keys.length, minimum: schema.minProperties}, '', '/minProperties', null, data, schema);
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	if (schema.maxProperties !== undefined) {
		if (keys.length > schema.maxProperties) {
			error = this.createError(ErrorCodes.OBJECT_PROPERTIES_MAXIMUM, {propertyCount: keys.length, maximum: schema.maxProperties}, '', '/maxProperties', null, data, schema);
			if (this.handleError(error)) {
				return error;
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateObjectRequiredProperties = function validateObjectRequiredProperties(data, schema) {
	if (schema.required !== undefined) {
		for (var i = 0; i < schema.required.length; i++) {
			var key = schema.required[i];
			if (data[key] === undefined) {
				var error = this.createError(ErrorCodes.OBJECT_REQUIRED, {key: key}, '', '/required/' + i, null, data, schema);
				if (this.handleError(error)) {
					return error;
				}
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateObjectProperties = function validateObjectProperties(data, schema, dataPointerPath) {
	var error;
	for (var key in data) {
		var keyPointerPath = dataPointerPath + "/" + key.replace(/~/g, '~0').replace(/\//g, '~1');
		var foundMatch = false;
		if (schema.properties !== undefined && schema.properties[key] !== undefined) {
			foundMatch = true;
			if (error = this.validateAll(data[key], schema.properties[key], [key], ["properties", key], keyPointerPath)) {
				return error;
			}
		}
		if (schema.patternProperties !== undefined) {
			for (var patternKey in schema.patternProperties) {
				var regexp = new RegExp(patternKey);
				if (regexp.test(key)) {
					foundMatch = true;
					if (error = this.validateAll(data[key], schema.patternProperties[patternKey], [key], ["patternProperties", patternKey], keyPointerPath)) {
						return error;
					}
				}
			}
		}
		if (!foundMatch) {
			if (schema.additionalProperties !== undefined) {
				if (this.trackUnknownProperties) {
					this.knownPropertyPaths[keyPointerPath] = true;
					delete this.unknownPropertyPaths[keyPointerPath];
				}
				if (typeof schema.additionalProperties === "boolean") {
					if (!schema.additionalProperties) {
						error = this.createError(ErrorCodes.OBJECT_ADDITIONAL_PROPERTIES, {key: key}, '', '/additionalProperties', null, data, schema).prefixWith(key, null);
						if (this.handleError(error)) {
							return error;
						}
					}
				} else {
					if (error = this.validateAll(data[key], schema.additionalProperties, [key], ["additionalProperties"], keyPointerPath)) {
						return error;
					}
				}
			} else if (this.trackUnknownProperties && !this.knownPropertyPaths[keyPointerPath]) {
				this.unknownPropertyPaths[keyPointerPath] = true;
			}
		} else if (this.trackUnknownProperties) {
			this.knownPropertyPaths[keyPointerPath] = true;
			delete this.unknownPropertyPaths[keyPointerPath];
		}
	}
	return null;
};

ValidatorContext.prototype.validateObjectDependencies = function validateObjectDependencies(data, schema, dataPointerPath) {
	var error;
	if (schema.dependencies !== undefined) {
		for (var depKey in schema.dependencies) {
			if (data[depKey] !== undefined) {
				var dep = schema.dependencies[depKey];
				if (typeof dep === "string") {
					if (data[dep] === undefined) {
						error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {key: depKey, missing: dep}, '', '', null, data, schema).prefixWith(null, depKey).prefixWith(null, "dependencies");
						if (this.handleError(error)) {
							return error;
						}
					}
				} else if (Array.isArray(dep)) {
					for (var i = 0; i < dep.length; i++) {
						var requiredKey = dep[i];
						if (data[requiredKey] === undefined) {
							error = this.createError(ErrorCodes.OBJECT_DEPENDENCY_KEY, {key: depKey, missing: requiredKey}, '', '/' + i, null, data, schema).prefixWith(null, depKey).prefixWith(null, "dependencies");
							if (this.handleError(error)) {
								return error;
							}
						}
					}
				} else {
					if (error = this.validateAll(data, dep, [], ["dependencies", depKey], dataPointerPath)) {
						return error;
					}
				}
			}
		}
	}
	return null;
};

ValidatorContext.prototype.validateCombinations = function validateCombinations(data, schema, dataPointerPath) {
	return this.validateAllOf(data, schema, dataPointerPath)
		|| this.validateAnyOf(data, schema, dataPointerPath)
		|| this.validateOneOf(data, schema, dataPointerPath)
		|| this.validateNot(data, schema, dataPointerPath)
		|| null;
};

ValidatorContext.prototype.validateAllOf = function validateAllOf(data, schema, dataPointerPath) {
	if (schema.allOf === undefined) {
		return null;
	}
	var error;
	for (var i = 0; i < schema.allOf.length; i++) {
		var subSchema = schema.allOf[i];
		if (error = this.validateAll(data, subSchema, [], ["allOf", i], dataPointerPath)) {
			return error;
		}
	}
	return null;
};

ValidatorContext.prototype.validateAnyOf = function validateAnyOf(data, schema, dataPointerPath) {
	if (schema.anyOf === undefined) {
		return null;
	}
	var errors = [];
	var startErrorCount = this.errors.length;
	var oldUnknownPropertyPaths, oldKnownPropertyPaths;
	if (this.trackUnknownProperties) {
		oldUnknownPropertyPaths = this.unknownPropertyPaths;
		oldKnownPropertyPaths = this.knownPropertyPaths;
	}
	var errorAtEnd = true;
	for (var i = 0; i < schema.anyOf.length; i++) {
		if (this.trackUnknownProperties) {
			this.unknownPropertyPaths = {};
			this.knownPropertyPaths = {};
		}
		var subSchema = schema.anyOf[i];

		var errorCount = this.errors.length;
		var error = this.validateAll(data, subSchema, [], ["anyOf", i], dataPointerPath);

		if (error === null && errorCount === this.errors.length) {
			this.errors = this.errors.slice(0, startErrorCount);

			if (this.trackUnknownProperties) {
				for (var knownKey in this.knownPropertyPaths) {
					oldKnownPropertyPaths[knownKey] = true;
					delete oldUnknownPropertyPaths[knownKey];
				}
				for (var unknownKey in this.unknownPropertyPaths) {
					if (!oldKnownPropertyPaths[unknownKey]) {
						oldUnknownPropertyPaths[unknownKey] = true;
					}
				}
				// We need to continue looping so we catch all the property definitions, but we don't want to return an error
				errorAtEnd = false;
				continue;
			}

			return null;
		}
		if (error) {
			errors.push(error.prefixWith(null, "" + i).prefixWith(null, "anyOf"));
		}
	}
	if (this.trackUnknownProperties) {
		this.unknownPropertyPaths = oldUnknownPropertyPaths;
		this.knownPropertyPaths = oldKnownPropertyPaths;
	}
	if (errorAtEnd) {
		errors = errors.concat(this.errors.slice(startErrorCount));
		this.errors = this.errors.slice(0, startErrorCount);
		return this.createError(ErrorCodes.ANY_OF_MISSING, {}, "", "/anyOf", errors, data, schema);
	}
};

ValidatorContext.prototype.validateOneOf = function validateOneOf(data, schema, dataPointerPath) {
	if (schema.oneOf === undefined) {
		return null;
	}
	var validIndex = null;
	var errors = [];
	var startErrorCount = this.errors.length;
	var oldUnknownPropertyPaths, oldKnownPropertyPaths;
	if (this.trackUnknownProperties) {
		oldUnknownPropertyPaths = this.unknownPropertyPaths;
		oldKnownPropertyPaths = this.knownPropertyPaths;
	}
	for (var i = 0; i < schema.oneOf.length; i++) {
		if (this.trackUnknownProperties) {
			this.unknownPropertyPaths = {};
			this.knownPropertyPaths = {};
		}
		var subSchema = schema.oneOf[i];

		var errorCount = this.errors.length;
		var error = this.validateAll(data, subSchema, [], ["oneOf", i], dataPointerPath);

		if (error === null && errorCount === this.errors.length) {
			if (validIndex === null) {
				validIndex = i;
			} else {
				this.errors = this.errors.slice(0, startErrorCount);
				return this.createError(ErrorCodes.ONE_OF_MULTIPLE, {index1: validIndex, index2: i}, "", "/oneOf", null, data, schema);
			}
			if (this.trackUnknownProperties) {
				for (var knownKey in this.knownPropertyPaths) {
					oldKnownPropertyPaths[knownKey] = true;
					delete oldUnknownPropertyPaths[knownKey];
				}
				for (var unknownKey in this.unknownPropertyPaths) {
					if (!oldKnownPropertyPaths[unknownKey]) {
						oldUnknownPropertyPaths[unknownKey] = true;
					}
				}
			}
		} else if (error) {
			errors.push(error);
		}
	}
	if (this.trackUnknownProperties) {
		this.unknownPropertyPaths = oldUnknownPropertyPaths;
		this.knownPropertyPaths = oldKnownPropertyPaths;
	}
	if (validIndex === null) {
		errors = errors.concat(this.errors.slice(startErrorCount));
		this.errors = this.errors.slice(0, startErrorCount);
		return this.createError(ErrorCodes.ONE_OF_MISSING, {}, "", "/oneOf", errors, data, schema);
	} else {
		this.errors = this.errors.slice(0, startErrorCount);
	}
	return null;
};

ValidatorContext.prototype.validateNot = function validateNot(data, schema, dataPointerPath) {
	if (schema.not === undefined) {
		return null;
	}
	var oldErrorCount = this.errors.length;
	var oldUnknownPropertyPaths, oldKnownPropertyPaths;
	if (this.trackUnknownProperties) {
		oldUnknownPropertyPaths = this.unknownPropertyPaths;
		oldKnownPropertyPaths = this.knownPropertyPaths;
		this.unknownPropertyPaths = {};
		this.knownPropertyPaths = {};
	}
	var error = this.validateAll(data, schema.not, null, null, dataPointerPath);
	var notErrors = this.errors.slice(oldErrorCount);
	this.errors = this.errors.slice(0, oldErrorCount);
	if (this.trackUnknownProperties) {
		this.unknownPropertyPaths = oldUnknownPropertyPaths;
		this.knownPropertyPaths = oldKnownPropertyPaths;
	}
	if (error === null && notErrors.length === 0) {
		return this.createError(ErrorCodes.NOT_PASSED, {}, "", "/not", null, data, schema);
	}
	return null;
};

ValidatorContext.prototype.validateHypermedia = function validateCombinations(data, schema, dataPointerPath) {
	if (!schema.links) {
		return null;
	}
	var error;
	for (var i = 0; i < schema.links.length; i++) {
		var ldo = schema.links[i];
		if (ldo.rel === "describedby") {
			var template = new UriTemplate(ldo.href);
			var allPresent = true;
			for (var j = 0; j < template.varNames.length; j++) {
				if (!(template.varNames[j] in data)) {
					allPresent = false;
					break;
				}
			}
			if (allPresent) {
				var schemaUrl = template.fillFromObject(data);
				var subSchema = {"$ref": schemaUrl};
				if (error = this.validateAll(data, subSchema, [], ["links", i], dataPointerPath)) {
					return error;
				}
			}
		}
	}
};

// parseURI() and resolveUrl() are from https://gist.github.com/1088850
//   -  released as public domain by author ("Yaffle") - see comments on gist

function parseURI(url) {
	var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
	// authority = '//' + user + ':' + pass '@' + hostname + ':' port
	return (m ? {
		href     : m[0] || '',
		protocol : m[1] || '',
		authority: m[2] || '',
		host     : m[3] || '',
		hostname : m[4] || '',
		port     : m[5] || '',
		pathname : m[6] || '',
		search   : m[7] || '',
		hash     : m[8] || ''
	} : null);
}

function resolveUrl(base, href) {// RFC 3986

	function removeDotSegments(input) {
		var output = [];
		input.replace(/^(\.\.?(\/|$))+/, '')
			.replace(/\/(\.(\/|$))+/g, '/')
			.replace(/\/\.\.$/, '/../')
			.replace(/\/?[^\/]*/g, function (p) {
				if (p === '/..') {
					output.pop();
				} else {
					output.push(p);
				}
		});
		return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
	}

	href = parseURI(href || '');
	base = parseURI(base || '');

	return !href || !base ? null : (href.protocol || base.protocol) +
		(href.protocol || href.authority ? href.authority : base.authority) +
		removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
		(href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
		href.hash;
}

function getDocumentUri(uri) {
	return uri.split('#')[0];
}
function normSchema(schema, baseUri) {
	if (schema && typeof schema === "object") {
		if (baseUri === undefined) {
			baseUri = schema.id;
		} else if (typeof schema.id === "string") {
			baseUri = resolveUrl(baseUri, schema.id);
			schema.id = baseUri;
		}
		if (Array.isArray(schema)) {
			for (var i = 0; i < schema.length; i++) {
				normSchema(schema[i], baseUri);
			}
		} else {
			if (typeof schema['$ref'] === "string") {
				schema['$ref'] = resolveUrl(baseUri, schema['$ref']);
			}
			for (var key in schema) {
				if (key !== "enum") {
					normSchema(schema[key], baseUri);
				}
			}
		}
	}
}

function defaultErrorReporter(language) {
	language = language || 'en';

	var errorMessages = languages[language];

	return function (error) {
		var messageTemplate = errorMessages[error.code] || ErrorMessagesDefault[error.code];
		if (typeof messageTemplate !== 'string') {
			return "Unknown error code " + error.code + ": " + JSON.stringify(error.messageParams);
		}
		var messageParams = error.params;
		// Adapted from Crockford's supplant()
		return messageTemplate.replace(/\{([^{}]*)\}/g, function (whole, varName) {
			var subValue = messageParams[varName];
			return typeof subValue === 'string' || typeof subValue === 'number' ? subValue : whole;
		});
	};
}

var ErrorCodes = {
	INVALID_TYPE: 0,
	ENUM_MISMATCH: 1,
	ANY_OF_MISSING: 10,
	ONE_OF_MISSING: 11,
	ONE_OF_MULTIPLE: 12,
	NOT_PASSED: 13,
	// Numeric errors
	NUMBER_MULTIPLE_OF: 100,
	NUMBER_MINIMUM: 101,
	NUMBER_MINIMUM_EXCLUSIVE: 102,
	NUMBER_MAXIMUM: 103,
	NUMBER_MAXIMUM_EXCLUSIVE: 104,
	NUMBER_NOT_A_NUMBER: 105,
	// String errors
	STRING_LENGTH_SHORT: 200,
	STRING_LENGTH_LONG: 201,
	STRING_PATTERN: 202,
	// Object errors
	OBJECT_PROPERTIES_MINIMUM: 300,
	OBJECT_PROPERTIES_MAXIMUM: 301,
	OBJECT_REQUIRED: 302,
	OBJECT_ADDITIONAL_PROPERTIES: 303,
	OBJECT_DEPENDENCY_KEY: 304,
	// Array errors
	ARRAY_LENGTH_SHORT: 400,
	ARRAY_LENGTH_LONG: 401,
	ARRAY_UNIQUE: 402,
	ARRAY_ADDITIONAL_ITEMS: 403,
	// Custom/user-defined errors
	FORMAT_CUSTOM: 500,
	KEYWORD_CUSTOM: 501,
	// Schema structure
	CIRCULAR_REFERENCE: 600,
	// Non-standard validation options
	UNKNOWN_PROPERTY: 1000
};
var ErrorCodeLookup = {};
for (var key in ErrorCodes) {
	ErrorCodeLookup[ErrorCodes[key]] = key;
}
var ErrorMessagesDefault = {
	INVALID_TYPE: "Invalid type: {type} (expected {expected})",
	ENUM_MISMATCH: "No enum match for: {value}",
	ANY_OF_MISSING: "Data does not match any schemas from \"anyOf\"",
	ONE_OF_MISSING: "Data does not match any schemas from \"oneOf\"",
	ONE_OF_MULTIPLE: "Data is valid against more than one schema from \"oneOf\": indices {index1} and {index2}",
	NOT_PASSED: "Data matches schema from \"not\"",
	// Numeric errors
	NUMBER_MULTIPLE_OF: "Value {value} is not a multiple of {multipleOf}",
	NUMBER_MINIMUM: "Value {value} is less than minimum {minimum}",
	NUMBER_MINIMUM_EXCLUSIVE: "Value {value} is equal to exclusive minimum {minimum}",
	NUMBER_MAXIMUM: "Value {value} is greater than maximum {maximum}",
	NUMBER_MAXIMUM_EXCLUSIVE: "Value {value} is equal to exclusive maximum {maximum}",
	NUMBER_NOT_A_NUMBER: "Value {value} is not a valid number",
	// String errors
	STRING_LENGTH_SHORT: "String is too short ({length} chars), minimum {minimum}",
	STRING_LENGTH_LONG: "String is too long ({length} chars), maximum {maximum}",
	STRING_PATTERN: "String does not match pattern: {pattern}",
	// Object errors
	OBJECT_PROPERTIES_MINIMUM: "Too few properties defined ({propertyCount}), minimum {minimum}",
	OBJECT_PROPERTIES_MAXIMUM: "Too many properties defined ({propertyCount}), maximum {maximum}",
	OBJECT_REQUIRED: "Missing required property: {key}",
	OBJECT_ADDITIONAL_PROPERTIES: "Additional properties not allowed",
	OBJECT_DEPENDENCY_KEY: "Dependency failed - key must exist: {missing} (due to key: {key})",
	// Array errors
	ARRAY_LENGTH_SHORT: "Array is too short ({length}), minimum {minimum}",
	ARRAY_LENGTH_LONG: "Array is too long ({length}), maximum {maximum}",
	ARRAY_UNIQUE: "Array items are not unique (indices {match1} and {match2})",
	ARRAY_ADDITIONAL_ITEMS: "Additional items not allowed",
	// Format errors
	FORMAT_CUSTOM: "Format validation failed ({message})",
	KEYWORD_CUSTOM: "Keyword failed: {key} ({message})",
	// Schema structure
	CIRCULAR_REFERENCE: "Circular $refs: {urls}",
	// Non-standard validation options
	UNKNOWN_PROPERTY: "Unknown property (not in schema)"
};

function ValidationError(code, params, dataPath, schemaPath, subErrors) {
	Error.call(this);
	if (code === undefined) {
		throw new Error ("No error code supplied: " + schemaPath);
	}
	this.message = '';
	this.params = params;
	this.code = code;
	this.dataPath = dataPath || "";
	this.schemaPath = schemaPath || "";
	this.subErrors = subErrors || null;

	var err = new Error(this.message);
	this.stack = err.stack || err.stacktrace;
	if (!this.stack) {
		try {
			throw err;
		}
		catch(err) {
			this.stack = err.stack || err.stacktrace;
		}
	}
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;
ValidationError.prototype.name = 'ValidationError';

ValidationError.prototype.prefixWith = function (dataPrefix, schemaPrefix) {
	if (dataPrefix !== null) {
		dataPrefix = dataPrefix.replace(/~/g, "~0").replace(/\//g, "~1");
		this.dataPath = "/" + dataPrefix + this.dataPath;
	}
	if (schemaPrefix !== null) {
		schemaPrefix = schemaPrefix.replace(/~/g, "~0").replace(/\//g, "~1");
		this.schemaPath = "/" + schemaPrefix + this.schemaPath;
	}
	if (this.subErrors !== null) {
		for (var i = 0; i < this.subErrors.length; i++) {
			this.subErrors[i].prefixWith(dataPrefix, schemaPrefix);
		}
	}
	return this;
};

function isTrustedUrl(baseUrl, testUrl) {
	if(testUrl.substring(0, baseUrl.length) === baseUrl){
		var remainder = testUrl.substring(baseUrl.length);
		if ((testUrl.length > 0 && testUrl.charAt(baseUrl.length - 1) === "/")
			|| remainder.charAt(0) === "#"
			|| remainder.charAt(0) === "?") {
			return true;
		}
	}
	return false;
}

var languages = {};
function createApi(language) {
	var globalContext = new ValidatorContext();
	var currentLanguage;
	var customErrorReporter;
	var api = {
		setErrorReporter: function (reporter) {
			if (typeof reporter === 'string') {
				return this.language(reporter);
			}
			customErrorReporter = reporter;
			return true;
		},
		addFormat: function () {
			globalContext.addFormat.apply(globalContext, arguments);
		},
		language: function (code) {
			if (!code) {
				return currentLanguage;
			}
			if (!languages[code]) {
				code = code.split('-')[0]; // fall back to base language
			}
			if (languages[code]) {
				currentLanguage = code;
				return code; // so you can tell if fall-back has happened
			}
			return false;
		},
		addLanguage: function (code, messageMap) {
			var key;
			for (key in ErrorCodes) {
				if (messageMap[key] && !messageMap[ErrorCodes[key]]) {
					messageMap[ErrorCodes[key]] = messageMap[key];
				}
			}
			var rootCode = code.split('-')[0];
			if (!languages[rootCode]) { // use for base language if not yet defined
				languages[code] = messageMap;
				languages[rootCode] = messageMap;
			} else {
				languages[code] = Object.create(languages[rootCode]);
				for (key in messageMap) {
					if (typeof languages[rootCode][key] === 'undefined') {
						languages[rootCode][key] = messageMap[key];
					}
					languages[code][key] = messageMap[key];
				}
			}
			return this;
		},
		freshApi: function (language) {
			var result = createApi();
			if (language) {
				result.language(language);
			}
			return result;
		},
		validate: function (data, schema, checkRecursive, banUnknownProperties) {
			var def = defaultErrorReporter(currentLanguage);
			var errorReporter = customErrorReporter ? function (error, data, schema) {
				return customErrorReporter(error, data, schema) || def(error, data, schema);
			} : def;
			var context = new ValidatorContext(globalContext, false, errorReporter, checkRecursive, banUnknownProperties);
			if (typeof schema === "string") {
				schema = {"$ref": schema};
			}
			context.addSchema("", schema);
			var error = context.validateAll(data, schema, null, null, "");
			if (!error && banUnknownProperties) {
				error = context.banUnknownProperties(data, schema);
			}
			this.error = error;
			this.missing = context.missing;
			this.valid = (error === null);
			return this.valid;
		},
		validateResult: function () {
			var result = {};
			this.validate.apply(result, arguments);
			return result;
		},
		validateMultiple: function (data, schema, checkRecursive, banUnknownProperties) {
			var def = defaultErrorReporter(currentLanguage);
			var errorReporter = customErrorReporter ? function (error, data, schema) {
				return customErrorReporter(error, data, schema) || def(error, data, schema);
			} : def;
			var context = new ValidatorContext(globalContext, true, errorReporter, checkRecursive, banUnknownProperties);
			if (typeof schema === "string") {
				schema = {"$ref": schema};
			}
			context.addSchema("", schema);
			context.validateAll(data, schema, null, null, "");
			if (banUnknownProperties) {
				context.banUnknownProperties(data, schema);
			}
			var result = {};
			result.errors = context.errors;
			result.missing = context.missing;
			result.valid = (result.errors.length === 0);
			return result;
		},
		addSchema: function () {
			return globalContext.addSchema.apply(globalContext, arguments);
		},
		getSchema: function () {
			return globalContext.getSchema.apply(globalContext, arguments);
		},
		getSchemaMap: function () {
			return globalContext.getSchemaMap.apply(globalContext, arguments);
		},
		getSchemaUris: function () {
			return globalContext.getSchemaUris.apply(globalContext, arguments);
		},
		getMissingUris: function () {
			return globalContext.getMissingUris.apply(globalContext, arguments);
		},
		dropSchemas: function () {
			globalContext.dropSchemas.apply(globalContext, arguments);
		},
		defineKeyword: function () {
			globalContext.defineKeyword.apply(globalContext, arguments);
		},
		defineError: function (codeName, codeNumber, defaultMessage) {
			if (typeof codeName !== 'string' || !/^[A-Z]+(_[A-Z]+)*$/.test(codeName)) {
				throw new Error('Code name must be a string in UPPER_CASE_WITH_UNDERSCORES');
			}
			if (typeof codeNumber !== 'number' || codeNumber%1 !== 0 || codeNumber < 10000) {
				throw new Error('Code number must be an integer > 10000');
			}
			if (typeof ErrorCodes[codeName] !== 'undefined') {
				throw new Error('Error already defined: ' + codeName + ' as ' + ErrorCodes[codeName]);
			}
			if (typeof ErrorCodeLookup[codeNumber] !== 'undefined') {
				throw new Error('Error code already used: ' + ErrorCodeLookup[codeNumber] + ' as ' + codeNumber);
			}
			ErrorCodes[codeName] = codeNumber;
			ErrorCodeLookup[codeNumber] = codeName;
			ErrorMessagesDefault[codeName] = ErrorMessagesDefault[codeNumber] = defaultMessage;
			for (var langCode in languages) {
				var language = languages[langCode];
				if (language[codeName]) {
					language[codeNumber] = language[codeNumber] || language[codeName];
				}
			}
		},
		reset: function () {
			globalContext.reset();
			this.error = null;
			this.missing = [];
			this.valid = true;
		},
		missing: [],
		error: null,
		valid: true,
		normSchema: normSchema,
		resolveUrl: resolveUrl,
		getDocumentUri: getDocumentUri,
		errorCodes: ErrorCodes
	};
	api.language(language || 'en');
	return api;
}

var tv4 = createApi();
tv4.addLanguage('en-gb', ErrorMessagesDefault);

//legacy property
tv4.tv4 = tv4;

return tv4; // used by _header.js to globalise.

}));
},{}],14:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],15:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (t.getAttribute('value') === null) t.value = f.value
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

},{"./update-events.js":16,"bel":2,"morphdom":11}],16:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}],17:[function(require,module,exports){
const yo = require('yo-yo')

const fbpToCanvas = require('./fbp-to-canvas')

let el


function initApp (el) {
  const fbpInput = el.querySelector('#fbpinput')
  const fbpError = el.querySelector('#fbperror')
  const editor = el.querySelector('#editor')
  const example = el.querySelector('#example')
  const viz = el.querySelector('#viz')
  const canvas = el.querySelector('#canvas')

  function visualize () {
    const fbpString = fbpInput.value.trim()
    function error (errorMessage) {
      fbpError.textContent = errorMessage
    }
    function callback (message) {
      fbpError.textContent = ''
      console.log('Success!', message)
    }
    fbpToCanvas(fbpString, canvas, error, callback)
  }

  fbpInput.focus()

  fbpInput.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.keyCode === 13) {
      event.preventDefault()
    }
  })
  fbpInput.addEventListener('keyup', function (event) {
    if (event.shiftKey && event.keyCode === 13) {
      visualize()
    }
  })
  fbpInput.addEventListener('blur', function (event) {
    visualize()
  })
  example.addEventListener('click', function (event) {
    fbpInput.value = `\
Process1(Component1) OUT -> IN Process2(c2)
Process1 OUT2 -> IN Process2(c2)
Process1 OUT3 -> IN Process2(c2)
Process1 ERROR -> IN Process3(c3)
Process2 LOOPBACK -> IN Process1
`
    visualize()
  })
  viz.addEventListener('click', function (event) {
    visualize()
  })

  // DEBUG
  example.click()
}

function renderApp () {
  return yo`
    <div onload=${initApp}>
      <div id="editor">
        <canvas id="canvas"></canvas>
      </div>
      <div id="fbperror"></div>
      <div id="fbp">
        <textarea id="fbpinput" placeholder="Type your FBP here, press (shift+enter) to 👁"></textarea>
      </div>
      <div id="controls">
        <button id="example" title="load example graph">ex</button>
        <button id="viz" title="visualize (shift+enter)">viz 👁</button>
      </div>
    </div>
  `
}

/* 
// More complexity than worth right now
function update (newState) {
  state = xtend(state, newState)
  const newEl = renderApp(state)
  yo.update(el, newEl)
}
*/

function mount () {
  el = renderApp()
  document.body.appendChild(el)
}

module.exports = {mount}

},{"./fbp-to-canvas":18,"yo-yo":15}],18:[function(require,module,exports){
const fbpToNoflo = require('./fbp-to-noflo')
const nofloToKlay = require('./noflo-to-klay')
const klayToCanvas = require('./klay-to-canvas')

function layoutGraph (nofloGraph, canvas, error, callback) {
  function klayError (e) {
    console.log(e)
    error(e.text)
  }
  function klaySuccess (kGraph) {
    console.log(kGraph)
    klayToCanvas(kGraph, canvas)
    callback(canvas)
  }
  nofloToKlay(nofloGraph, klayError, klaySuccess)
}

function fbpToCanvas (fbpString, canvas, error, callback) {
  let nofloGraph
  try {
    nofloGraph = fbpToNoflo(fbpString)
  } catch (e) {
    console.log(e)
    error(e.message)
    return
  }

  layoutGraph(nofloGraph, canvas, error, callback)
}

module.exports = fbpToCanvas

},{"./fbp-to-noflo":19,"./klay-to-canvas":20,"./noflo-to-klay":21}],19:[function(require,module,exports){
/*

  FBP string to Noflo graph JSON

*/

const fbp = require('fbp')

function fbpToNoflo (str) {
  return fbp.parse(str)
}

module.exports = fbpToNoflo

},{"fbp":4}],20:[function(require,module,exports){
function drawEdge (context, edge) {
  const {sourcePoint, bendPoints, targetPoint} = edge
  context.beginPath()
  context.moveTo(sourcePoint.x, sourcePoint.y)
  if (bendPoints) {
    for (let i = 0, len = bendPoints.length; i < len; i++) {
      const bendPoint = bendPoints[i]
      context.lineTo(bendPoint.x, bendPoint.y)
    }
  }
  context.lineTo(targetPoint.x, targetPoint.y)
  context.stroke()
}

function drawPort (context, port, dx, dy) {
  const {x, y, labels, properties} = port
  context.strokeRect(x + dx - 2, y + dy - 2, 4, 4)

  context.textAlign = properties.portSide === "EAST" ? 'right' : 'left'
  context.textBaseline = 'middle'

  const padding = properties.portSide === "EAST" ? -7 : 7

  for (let i = 0, len = labels.length; i < len; i++) {
    const label = labels[i]
    context.fillText(label.text, x + dx + padding, y + dy)
  }
}

function drawNode (context, node) {
  const {x, y, width, height, labels, ports} = node
  context.strokeRect(x, y, width, height + 14)

  context.textAlign = 'center'
  context.textBaseline = 'top'

  for (let i = 0, len = labels.length; i < len; i++) {
    const label = labels[i]
    context.fillText(label.text, x + label.x, y + label.y)
  }

  for (let i = 0, len = ports.length; i < len; i++) {
    const port = ports[i]
    drawPort(context, port, x, y)
  }
}

function klayToCanvas (kGraph, canvas) {
  const {width, height, children, edges} = kGraph
  canvas.width = width
  canvas.height = height + 14
  const context = canvas.getContext('2d')

  // Reset
  context.fillStyle = 'white'
  context.fillRect(0, 0, width, height + 14)
  // Whole pixel magic
  context.setTransform(1, 0, 0, 1, 0.5, 0.5)
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  // context.lineWidth = 2
  context.font = '14px monospace'

  for (let i = 0, len = children.length; i < len; i++) {
    drawNode(context, children[i])
  }
  for (let i = 0, len = edges.length; i < len; i++) {
    drawEdge(context, edges[i])
  }
}

module.exports = klayToCanvas

},{}],21:[function(require,module,exports){
/*

  Noflo graph JSON to KLay graph JSON

*/

const klay = require('klayjs')
const xtend = require('xtend')

const graphProps =
  { direction: 'RIGHT'
  , spacing: 40
  , feedBackEdges: true
  , edgeRouting: 'ORTHOGONAL'
  , unnecessaryBendpoints: false
  }
const nodeProps =
  { nodeLabelPlacement: 'INSIDE H_CENTER V_TOP'
  , portLabelPlacement: 'INSIDE'
  , sizeConstraint: 'MINIMUM_SIZE NODE_LABELS PORTS PORT_LABELS'
  , sizeOptions: 'DEFAULT_MINIMUM_SIZE COMPUTE_INSETS MINIMUM_SIZE_ACCOUNTS_FOR_INSETS'
  , labelSpacing: 14
  // , portSpacing: 14
  , minWidth: 36
  , minHeight: 48
  , portConstraints: 'FIXED_POS'
  }
const portProps =
  { sizeConstraint: 'MINIMUM_SIZE'
  , portSide: 'WEST'
  }
const options =
  { intCoordinates: true
  }

function makeKPorts (portInfo, processId) {
  const inports = portInfo.in.map(function (id, index) {
    return {
      id: `${processId}:::${id}`,
      labels: [ { text: id } ],
      y: (index + 2) * 21,
      // height: 21,
      // width: id.length * 10 + 12,
      properties: {portSide: 'WEST'},
    }
  })
  const outports = portInfo.out.map(function (id, index) {
    const minWidth = id.length * 10 + 12
    return {
      id: `${processId}:::${id}`,
      labels: [ { text: id } ],
      y: (index + 2) * 21,
      // height: 21,
      // width: id.length * 10 + 12,
      properties: {portSide: 'EAST'},
    }
  })
  return inports.concat(outports)
}

function makeKNode (processId, node, portInfo) {
  const label = `${processId} (${node.component ? node.component : ''})`
  const minWidth = label.length * 10 + 12
  let kNode = {
    id: processId,
    labels: [ { text: label } ],
    properties: xtend(nodeProps, {minWidth}),
    ports: makeKPorts(portInfo, processId),
  }
  return kNode
}

function makeKNodes (processes, kPorts) {
  const keys = Object.keys(processes)
  return keys.map(function (key) {
    return makeKNode(key, processes[key], kPorts[key])
  })
}

function makeKEdge (edge, index) {
  return {
    id: index + '',
    source: edge.src.process,
    sourcePort: `${edge.src.process}:::${edge.src.port}`,
    target: edge.tgt.process,
    targetPort: `${edge.tgt.process}:::${edge.tgt.port}`,
  }
}

function graphToPorts (graph) {
  let portInfo = {}
  for (let i = 0, len = graph.connections.length; i < len; i++) {
    const edge = graph.connections[i]
    if (!portInfo[edge.src.process]) {
      portInfo[edge.src.process] = {in: [], out: []}
    }
    if (portInfo[edge.src.process].out.indexOf(edge.src.port) === -1) {
      portInfo[edge.src.process].out.push(edge.src.port)
    }
    if (!portInfo[edge.tgt.process]) {
      portInfo[edge.tgt.process] = {in: [], out: []}
    }
    if (portInfo[edge.tgt.process].in.indexOf(edge.tgt.port) === -1) {
      portInfo[edge.tgt.process].in.push(edge.tgt.port)
    }
  }
  return portInfo
}

function graphToKGraph (graph) {
  const portInfo = graphToPorts(graph)
  const kGraph = {
    id: 'root',
    properties: graphProps,
    children: makeKNodes(graph.processes, portInfo),
    edges: graph.connections.map(makeKEdge),
  }
  return kGraph
}

function nofloToKlay (graph, error, success) {
  const kGraph = graphToKGraph(graph)
  // Can be workerized if too sluggish on main thread
  // https://github.com/OpenKieler/klayjs#web-worker
  klay.layout({graph: kGraph, options, error, success})
}

module.exports = nofloToKlay

},{"klayjs":10,"xtend":14}]},{},[1])
//# sourceMappingURL=index.js.map
