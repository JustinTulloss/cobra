/* License: MIT-style License
 */

/*global window exports */

// The Cobra namespace
var Cobra = {};
(function() {
    var root = this;
    root.Cobra = Cobra;

    Cobra.toArray = function(iterable) {
        return Array.prototype.slice.call(iterable);
    };

    /* This function makes all the top level cobra objects part of
     * the global namespace. Do this if cobra is the exclusive library
     * you are using to provide class functionality.
     */
    Cobra.install = function() {
        var key;
        for (key in Cobra) {
            if (key != 'install') {
                root[key] = Cobra[key];
            }
        }
    };

    /* Configuration options for Cobra. These are intended not to be changed
     * during runtime.
     *
     * self - Make "self" the first argument of every class method. Makes things easier to use,
     *        but there is a performance tradeoff.
     */
    Cobra.config = {
        self: true
    };
})();
