/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 * Contributor(s):
 * 
 * Garen J. Torikian <gjtorikian @ gmail DOT com>
 *
 * ***** END LICENSE BLOCK ***** */

/*
  THIS FILE WAS AUTOGENERATED BY mode_highlight_rules.tmpl.js (UUID: C5B73B98-5F2A-42E3-9F0E-028A74A9FE4B)
*/

define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
// var MarkdownHighlightRules = require("./markdown_highlight_rules").MarkdownHighlightRules;
var SassHighlightRules = require("./scss_highlight_rules").ScssHighlightRules;
var LessHighlightRules = require("./less_highlight_rules").LessHighlightRules;
var CoffeeHighlightRules = require("./coffee_highlight_rules").CoffeeHighlightRules;
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;

function mixin_embed(tag, prefix) {
    return { 
        token : "entity.name.function.jade",
        regex : "^\\s*\\:" + tag,
        next  : prefix + "start"
    };
}

var JadeHighlightRules = function() {

    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-6][0-7]?|" + // oct
        "37[0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = 
        {
    "start": [
        {
            token: "keyword.control.import.include.jade",
            regex: "\\s*\\binclude\\b"
        },
        {
            token: "keyword.other.doctype.jade",
            regex: "^!!!\\s*(?:[a-zA-Z0-9-_]+)?"
        },
        {
            token : "punctuation.section.comment",
            regex : "^\\s*\/\/(?:\\s*[^-\\s]|\\s+\\S)(?:.*$)"
        },
        {
            token : function(space, text) {
                return "punctuation.section.comment";
            },
            regex : "^((\\s*)\/\/)(?:\\s*$)",
            next: "comment_block"
        },
        // mixin_embed("markdown", "markdown-"),
        mixin_embed("sass", "sass-"),
        mixin_embed("less", "less-"),
        mixin_embed("coffee", "coffee-"),
        /*
        {
            token: {
                "2": {
                    "name": "entity.name.function.jade"
                }
            },
            regex: "^(\\s*)(\\:cdata)",
            next: "state_9"
        },*/
        // match stuff like: mixin dialog-title-desc(title, desc)
        {
            token: [ "storage.type.function.jade",
                       "entity.name.function.jade",
                       "punctuation.definition.parameters.begin.jade",
                       "variable.parameter.function.jade",
                       "punctuation.definition.parameters.end.jade"
                    ],
            regex: "^(\\s*mixin)( [\\w\\-]+)(\\s*\\()(.*?)(\\))"
        },
        // match stuff like: mixin dialog-title-desc
        {
            token: [ "storage.type.function.jade", "entity.name.function.jade"],
            regex: "^(\\s*mixin)( [\\w\\-]+)"
        },
        {
            token: "source.js.embedded.jade",
            regex: "^\\s*(?:-|=|!=)",
            next: "js-start"
        },
        /*{
            token: "entity.name.tag.script.jade",
            regex: "^\\s*script",
            next: "js_code_tag"
        },*/
        {
            token: "string.interpolated.jade",
            regex: "[#!]\\{[^\\}]+\\}"
        },
        // Match any tag, id or class. skip AST filters
        {
            token: "meta.tag.any.jade",
            regex: /^\s*(?!\w+\:)(?:[\w]+|(?=\.|#)])/,
            next: "tag_single"
        },
        {
            token: "suport.type.attribute.id.jade",
            regex: "#\\w+"
        },
        {
            token: "suport.type.attribute.class.jade",
            regex: "\\.\\w+"
        },
        {
            token: "punctuation",
            regex: "\\s*(?:\\()",
            next: "tag_attributes"
        }
    ],
    "comment_block": [
        {
            token: function(text) {
                return "text";
            },
            regex: "^(\\1\\S|$)", 
            "captures": "1",
            next: "start"
        },
        {
            token: "comment.block.jade",
            regex : ".+"
        }
    ],
    /*
    
    "state_9": [
        {
            token: "TODO",
            regex: "^(?!\\1\\s+)",
            next: "start"
        },
        {
            token: "TODO",
            regex: ".+",
            next: "state_9"
        }
    ],*/
    /*"js_code": [
        {
            token: "keyword.control.js",
            regex: "\\beach\\b"
        },
        {
            token: "text",
            regex: "$",
            next: "start"
        }
    ],*/
    /*"js_code_tag": [
        {
            "include": "source.js"
        },
        {
            token: "TODO",
            regex: "^((?=(\\1)([\\w#\\.]|$\\n?))|^$\\n?)",
            next: "start"
        }
    ],*/
    "tag_single": [
        {
            token: "entity.other.attribute-name.class.jade",
            regex: "\\.[\\w-]+"
        },
        {
            token: "entity.other.attribute-name.id.jade",
            regex: "#[\\w-]+"
        },
        {
            token: ["text", "punctuation"],
            regex: "($)|((?!\\.|#|=|-))",
            next: "start"
        }
    ],
    "tag_attributes": [ 
        {
            token : "string",
            regex : "'(?=.)",
            next  : "qstring"
        }, 
        {
            token : "string",
            regex : '"(?=.)',
            next  : "qqstring"
        },
        {
            token: "entity.other.attribute-name.jade",
            regex: "\\b[a-zA-Z\\-:]+"
        },
        {
            token: ["entity.other.attribute-name.jade", "punctuation"],
            regex: "\\b([a-zA-Z:\\.-]+)(=)",
            next: "attribute_strings"
        },
        {
            token: "punctuation",
            regex: "\\)",
            next: "start"
        }
    ],
    "attribute_strings": [
        {
            token : "string",
            regex : "'(?=.)",
            next  : "qstring"
        }, 
        {
            token : "string",
            regex : '"(?=.)',
            next  : "qqstring"
        }
    ],
    "qqstring" : [
        {
            token : "constant.language.escape",
            regex : escapedRe
        }, {
            token : "string",
            regex : '[^"\\\\]+',
        }, {
            token : "string",
            regex : "\\\\$",
            next  : "qqstring",
        }, {
            token : "string",
            regex : '"|$',
            next  : "tag_attributes",
        }
    ],
    "qstring" : [
        {
            token : "constant.language.escape",
            regex : escapedRe
        }, {
            token : "string",
            regex : "[^'\\\\]+",
        }, {
            token : "string",
            regex : "\\\\$",
            next  : "qstring",
        }, {
            token : "string",
            regex : "'|$",
            next  : "tag_attributes",
        }
    ]
};

    this.embedRules(JavaScriptHighlightRules, "js-", [{
        token: "text",
        regex: ".$",
        next: "start"
    }]);
/*
    this.embedRules(MarkdownHighlightRules, "markdown-", [{
       token : "support.function",
       regex : "^\\1\\s+",
       captures: "1",
       next  : "start"
    }]);

    this.embedRules(SassHighlightRules, "sass-", [{
       token : "support.function",
       regex : "^(?!\\1\\s+)",
       captures: "1",
       next  : "start"
    }]);

    this.embedRules(LessHighlightRules, "less-", [{
       token : "support.function",
       regex : "^(?!\\1\\s+)",
       captures: "1",
       next  : "start"
    }]);

    this.embedRules(CoffeeHighlightRules, "coffee-", [{
       token : "support.function",
       regex : "^(?!\\1\\s+)",
       captures: "1",
       next  : "start"
    }]);

    this.embedRules(JavaScriptHighlightRules, "js-", [{
       token : "support.function",
       regex : "$",
       captures: "1",
       next  : "start"
    }]); */
};

oop.inherits(JadeHighlightRules, TextHighlightRules);

exports.JadeHighlightRules = JadeHighlightRules;
});
