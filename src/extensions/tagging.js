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
 *  @#a|b
 *  exclude me when neither a or b
 *  @#
 *
 *  Note:
 *    - tags can span multiple lines
 *    - multiple tags per line
 *    - no nesting
 */

(function () {

  var tagging = function (converter, options) {
    return [
      { type: 'output', filter: function (source) {
        if (!options && !options.condition) return source;
        return source.replace(/<(\w+)\s+tag=['|"](.*)['|"].*?>(.*?)<\/.*?>/igm,
          function (wholeMatch, elem, tag, content) {
            return (tag == options.condition) ? "<" + elem + ">" + content + "</" + elem + ">" : "";
          });
      }},
      {
        type: 'lang',
        filter: function (text) {
          if (!options && !options.condition) return text;
          return text.replace(/(@#)([a-z\|]+)([^\1]+?)\1/gmi,
            function (wholeMatch, md, tag, content) {
              // simple match on tag as string compare rather than iterate on delimiter
              return (tag.indexOf(options.condition) != -1) ? content : "";
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
