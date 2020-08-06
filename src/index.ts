var beautify = require('js-beautify');

/**
 * beautify html/js/css
 * @param {string} text the source code
 * @param {boolean} [isTabIndent=false] indent with tab? default: false
 * @param {number} [indentSize=2] indent size, default: 2
 * @return {string} beautify the code
 */

module.exports = function (text: string, isTabIndent: boolean, indentSize: number, isRootIndent: boolean) {

  if (isTabIndent === undefined) {
    isTabIndent = false;
  }
  if (indentSize === undefined) {
    indentSize = 2;
  }

  // options
  var options = {
    indentSize: indentSize,
    isTabIndent: isTabIndent
  }
  // beautify template 
  text = text.replace(/([ \t]*<template[\s\S]*?>)([\s\S]*?)([ \t]*<\/template>[ \t]*)/g, function (match, tagStart, code, tagEnd) {
    tagStart = beautifyTagStart(tagStart);
    tagEnd = beautifyTagEnd(tagEnd);
    var lang = getLang(tagStart);
    lang = lang ? lang.toLowerCase() : 'html';
    // pug、jade不做处理 只处理html和wxml
    if (lang === 'pug' || lang === 'jade') {
      return tagStart + code + tagEnd;
    }
    // beautify html
    code = beautify.html(code, {
      indent_char: ' ',
      indent_size: options.indentSize,
      indent_with_tabs: options.isTabIndent
    });
    // is root tag indent
    if (isRootIndent) {
      code = rootTagIndent(code, options);
    }
    return tagStart + '\n' + code + '\n' + tagEnd;
  });

  return text
    // add new line on vue root end tags
    .replace(/(<\/template>)[ \t]*[\r\n]?</g, '$1\n\n<');
}

// beautify tagStart
function beautifyTagStart(str: string) {
  return str
    // remove any enpty lines at the top
    .replace(/^\s*/, '')
    // make template tag in a single line
    .replace(/\s+/g, ' ')
    // remove blank before '>'
    .replace(/\s*>$/, '>');
}

// beautify tagEnd
function beautifyTagEnd(str: string) {
  return str
    // remove blank
    .replace(/\s*/g, '');
}

// get lang
function getLang(str: string) {
  // get all lang attributes
  var langs = str.match(/lang=(['"])(\w+)\1/g);
  var lang = undefined;
  if (langs !== null) {
    lang = langs[langs.length - 1];
    lang = lang.replace(/lang=(['"])(\w+)\1/, '$2');
  }
  return lang;
}

// root tag indent
function rootTagIndent(str: string, options: any) {
  var indent = getIndentString(options);
  return str.split(/[\n]/).map(function (line) {
    return indent + line;
  }).join('\n');
}

// get indent string
function getIndentString(options: any) {
  var indent = '';
  if (options.isTabIndent) {
    indent = '\t';
  } else {
    for (var i = 0; i < options.indentSize; i++) {
      indent += ' ';
    }
  }
  return indent;

}