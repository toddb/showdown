//
//  Tagging
//  Add an attribute to html to exclude it
//

(function(){

    var tagging = function(converter, options) {
        return [
            { type: 'output', filter: function(source){
                if (!options && !options.condition) return source;
                // double escape \ in strings
                var pattern = "<\\w+\\s+(condition)='" + options.condition + "'.*?>(.*?)<\\/.*?>";
                var regex = new RegExp(pattern, "gmi");
                return source.replace(regex, "");
            }}
        ];
    };

    // Client-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) { window.Showdown.extensions.tagging = tagging; }
    // Server-side export
    if (typeof module !== 'undefined') module.exports = tagging;

}());
