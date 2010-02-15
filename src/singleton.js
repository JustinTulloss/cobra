/* License: MIT-style License
 * 
 * The Singleton class is created just like a regular class except that
 * it a single instance is returned.
 */

/*globals Cobra */

Cobra.Singleton = new Cobra.Class({
    __init__: function(self, prototype) {
        var klass = new Cobra.Class(prototype);
        return new klass();
    }
});
