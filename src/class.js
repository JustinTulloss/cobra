/* License: MIT-style License
 * 
 * Contains the Cobra.Class function which allows you to make very simple classes
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
 *
 * Example:
 * var Animal = new Cobra.Class({
 *     __init__: function(self) {
 *         self.breathes = true;
 *     }
 * });
 * 
 * var Feline = new Cobra.Class({
 *     __extends__: Animal,
 *     __init__: function(self) {
 *         Cobra.Class.ancestor(Feline, '__init__', self);
 *         self.claws = true;
 *         self.furry = true;
 *     },
 *     says: function(self) {
 *         console.log ('GRRRRR');
 *     }
 * });
 * 
 * var Cat = new Cobra.Class({
 *     __extends__: Feline,
 *     __init__: function(self) {
 *         Cobra.Class.ancestor(self, '__init__', self);
 *         self.weight = 'very little';
 *     },
 *     says: function(self) {
 *         console.log('MEOW');
 *     }
 * });
 * 
 * var Tiger = new Cobra.Class({
 *     __extends__: Feline,
 *     __init__: function(self) {
 *         Cobra.Class.ancestor(Tiger, '__init__', self);
 *         self.weight = 'quite a bit';
 *     }
 * });
 * 
 * Usage: 
 * 
 * >>> sneakers = new Cat();
 * Object breathes=true claws=true furry=true
 * >>> sneakers.breathes
 * true
 * >>> sneakers.claws
 * true
 * >>> sneakers.furry
 * true
 * >>> sneakers.weight
 * "very little"
 * >>> sneakers.says();
 * MEOW
 * >>> tigger = new Tiger()
 * Object breathes=true claws=true furry=true
 * >>> tigger.says()
 * GRRRRR
 */

Cobra.Class = function(prototype) {

    // Constructor
    function klass() {
        var key, member;
        var instance;
        var base;

        // Methodize all the functions
        for (key in this) {
            member = this[key];
            if (typeof member == 'function') {
                this[key] = Cobra.Class.method(member, this);
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

    /* Cobra.Class functions */
    klass.isChild = function (parent) {
        return Cobra.Class.isChild(this, parent);
    }

    klass.hasParent = function() {
        return Cobra.Class.hasParent(this);
    }

    return klass;
}

/* Makes a method out of passed function */
Cobra.Class.method = function (callable, self) {
    function method () {
        var args = Cobra.$A(arguments);
        args.unshift(self);
        return callable.apply(this, args);
    }
    return method;
}

/* Tests to see whether child has parent somewhere in its inheritance chain */
Cobra.Class.isChild = function(child, parent) {
    if (child === parent) return true;
    if (child.__extends__) {
        return Cobra.Class.isChild(child.__extends__, parent);
    }
    return false;
}

/* Returns true if the child has descended from a Cobra Class */
Cobra.Class.hasParent = function(child) {
    return (child.__extends__ || child.constructor.__extends__);
}

/* Invokes the specified method on the parent class.
 * Example:
 * init: function(self, arg) {
 *     Cobra.Class.ancestor(MyCobra.Class|self, '__init__', self, arg);
 * }
 */
Cobra.Class.ancestor = function(child, method) {
    var parent = child.__extends__ || child.constructor.__extends__;
    var args;
    if (parent.prototype[method]) {
        args = Cobra.$A(arguments).slice(2, arguments.length);
        return parent.prototype[method].apply(this, args);
    } else {
        arguments[0] = parent; //move up one in the inheritance stack
        return Cobra.Class.ancestor.call(this, arguments);
    }
}
