/* License: MIT-style License
 * 
 * Contains the Class function which allows you to make very simple classes
 * in a style modeled after python.
 * 
 * Everything is public. Indicate that you would prefer certain things be kept private
 * with a leading underscore (IE. _privateThing)
 *
 * All class methods are passed "self" as their first parameter. Self is guaranteed to be
 * the instance of the class, whether "this" is the instance or not.
 * 
 * Provide a constructor called __init__ if you would like to initialize things.
 *
 * Provide a base class in the __extends__ property if you want your class to inherit from that class.
 */

function Class(prototype) {

    // Constructor
    function klass() {
        var key, member;
        var instance;
        var base;

        // Methodize all the functions
        for (key in this) {
            member = this[key]
            if (typeof member == 'function') {
                this[key] = Class.method(member, this);
            }
        }

        this.constructor = klass;
        instance = (this.__init__) ? this.__init__.apply(this, arguments) : this;

        return instance;
    }

    /* A very basic, prototype-based inheritance scheme.
     * 
     * Basically, we create a wrapper "base" object that will serve as the prototype
     * for our new class. It, in turn, has our inherited class prototype as its
     * prototype. This creates an prototype based inheritance chain.
     *
     * If IE supported the __proto__ property on instances, this would all be a bit
     * easier.
     */
    if (prototype.__extends__) {
        klass.__extends__ = prototype.__extends__;
        delete prototype.__extends__;
        function base() {};
        base.prototype = klass.__extends__.prototype;
        base = new base();
        /* copy the updated prototype into the properties of base */
        for (key in prototype) {
            base[key] = prototype[key];
        }
    } else {
        base = prototype;
    }

    klass.prototype = base;

    /* Class functions */
    klass.extends = function (parent) {
        return Class.extends(this, parent);
    }

    return klass;
}

/* Makes a method out of passed function */
Class.method = function (callable, self) {
    function method () {
        var args = $A(arguments);
        args.unshift(self);
        return callable.apply(this, args);
    }
    return method;
}

/* Tests to see whether child has parent somewhere in its inheritance chain */
Class.extends = function(child, parent) {
    if (child === parent) return true;

    while (child.__extends__) {
        if (child.__extends__ === parent) return true;
        child = child.__extends__;
    }
    return false;
}
