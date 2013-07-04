//
//  Notes Extension
//  --> My notes   ->  <div class="notes">My notes</div>
//

(function () {

  var notes = function (converter) {
    return [
      { type: 'lang',
        filter: function (text) {
          return text.replace(/-->[\s]*(.*)/g,
            function (wholeMatch, content) {
              return '<div class="notes">' + content + '</div>';
            }
          );
        }
      }
    ];
  };

// Client-side export
  if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) {
    window.Showdown.extensions.notes = notes;
  }
// Server-side export
  if (typeof module !== 'undefined') module.exports = notes;

}
  ()
  )
;
