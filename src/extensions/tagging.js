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
 *    - names of tags can delimited by a bar ('|')
 */

(function () {

  var isTagged = function(tag, condition){
    var hasTag = false
    var tags = tag.split('|')
    for (var i=0; i<tags.length; ++i){
      if (tags[i] == condition){
        hasTag = true;
        continue
      }
    }
    return hasTag
  }

  var tagging = function (converter, options) {
    return [
      { type: 'output', filter: function (source) {
        if (!options && !options.condition) return source;
        return source.replace(/<([a-z]+)\s+tag=['|"]([^"|^']).*?>(.*?)<\/[^\1]+?>/igm,
          function (wholeMatch, elem, tag, content) {
            return isTagged(tag, options.condition)
                ? elem.toLowerCase() == 'span'
                  ? content
                  : "<" + elem + ">" + content + "</" + elem + ">"
                : "";
          });
      }},
      {
        type: 'lang',
        filter: function (text) {
          if (!options && !options.condition) return text;
          return text.replace(/(@#)([a-z\|]+)([^\1]+?)\1/gmi,
            function (wholeMatch, md, tag, content) {
              return isTagged(tag, options.condition) ? content : "";
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
