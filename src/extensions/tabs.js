/*global module:true*/
/*
 * Basic tabs support with bootstrap with re-entrant parsing, where cell content
 * can also specify markdown.
 *
 * Tabs
 * ====
 *
 * |--
 * ^^ Tab1
 *  * myContent
 *  
 * ^^ Tab2
 *  ![Valid XHTML] (http://w3.org/Icons/valid-xhtml10)
 * --|
 |
 *
 */

(function () {
  var tabs = function (converter) {

    var filter = function (text) {

      return text.replace(/(?:^|\n)\|\-\-\n([\s\S]*?)\n\-\-\|/g,
        function (wholeMatch, tabcontent) {

          tabcontent = tabcontent.replace(/(?:^|\n)\^\^[\s]*(.*)\n(.*)/g,
            function (wholeMatch, heading, content) {
              return '<div class="tab-pane well" title="' + heading + '">' +
                converter.makeHtml(content) +
                '</div>\n'
            });

          return '<div class="tabbable" show="true">\n' + tabcontent + '</div>';
        }
      );

    };
    return [
      {
        type: 'lang',
        filter: filter
      }
    ];
  };

  // Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) {
    window.Showdown.extensions.tabs = tabs;
  }
  // Server-side export
  if (typeof module !== 'undefined') {
    module.exports = tabs;
  }
}());
