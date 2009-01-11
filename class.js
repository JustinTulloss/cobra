/* License: MIT-style License
 * 
 * Contains the Class function which allows you to make very simple classes
 * in a style modeled after python.
 */

function Class(prototype) {
    function klass() {
        var args = $A(arguments).unshift(this);
        var instance = (this.__init__) ? this.__init__.apply(this, arguments)
        return instance;
    }
    klass.prototype = prototype;
    return klass;
}
