/* License: MIT-style License
 * 
 * The Singleton class is created just like a regular class except that
 * it a single instance is returned.
 */
var Singleton = new Class({
    __init__: function(self, prototype) {
        klass = new Class(prototype);
        return new klass();
    }
});
