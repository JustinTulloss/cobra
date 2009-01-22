/* License: MIT-style License
 */

// The Cobra namespace
Cobra = {};

Cobra.$A = function(iterable) {
    return Array.prototype.slice.call(iterable);
}

/* This function makes all the top level cobra objects part of
 * the global namespace. Do this if cobra is the exclusive library
 * you are using to provide class functionality.
 */
Cobra.install = function() {
    var key;
    for (key in Cobra) {
        if (key != 'install') {
            window[key] = Cobra[key];
        }
    }
}
