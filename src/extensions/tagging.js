/*
 *  Tagging
 *
 *  Add tags to include/exclude either markdown or html - this functionality similar to docbook
 *
 *  Output:
 *
 *  <p tag='a'>include me when handing in condition->a</p>
 *  <p tag='b'>exclude me when handing in condition->a</p>
 *
 *  Markdown:
 *
 *  @#a
 *  include me when handing in condition-->a in options
 *  @#
 *
 *  @#b
 *  exclude me when handing in condition->a in options
 *  @#
 *
 */

(function () {

  var tagging = function (converter, options) {
    return [
      { type: 'output', filter: function (source) {
        if (!options && !options.condition) return source;
        return source.replace(/<(\w+)\s+tag=['|"](.*)['|"].*?>(.*?)<\/.*?>/ig,
          function (wholeMatch, elem, tag, content) {
            return (tag == options.condition) ? "<" + elem + ">" + content + "</" + elem + ">" : "";
          });
      }},
      {
        type: 'lang',
        filter: function (text) {
          if (!options && !options.condition) return text;
          return text.replace(/(?:^|\n)@#([\s\S]*?)\n(.*)\n@#/g,
            function (wholeMatch, tag, content) {
              return (tag == options.condition) ? converter.makeHtml(content) : "";
            })
        }
      }
    ];
  };

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) {
    window.Showdown.extensions.tagging = tagging;
  }
  // Server-side export
  if (typeof module !== 'undefined') module.exports = tagging;

}());
