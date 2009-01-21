/* License: MIT-style License
 * 
 * The Singleton class is created just like a regular class except that
 * it a single instance is returned.
 */
Cobra.Singleton = new Cobra.Class({
    __init__: function(self, prototype) {
        klass = new Cobra.Class(prototype);
        return new klass();
    }
});
