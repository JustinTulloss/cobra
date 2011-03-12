/* License: MIT-style License
 */

/**
 * ==Cobra==
 * A simple, lightweight JavaScript Class Library
 **/

/*global window exports GLOBAL */
/*jslint forin: true */

/** section: Cobra
 * Cobra
 * The base namespace.
 *
 * This namespace holds all of the Cobra class functionality. If you prefer
 * this type of functionality to be globally avaiable (so you don't need
 * to prepend every access with `Cobra`), check out [[Cobra.install]]
 **/
var Cobra = typeof window === 'undefined' ? exports : {};
(function() {
    var root = typeof window === 'undefined' ? GLOBAL : window;

    function toArray(iterable) {
        return Array.prototype.slice.call(iterable);
    }

    /**
     * Cobra.config -> Object
     * Configuration options for Cobra.
     *
     * Options
     * -------
     *
     * - `self`: Make "self" the first argument of every class method.
     *    Makes things easier to use, but there is a performance tradeoff.
     **/
    Cobra.config = {
        self: true
    };

    /**
     * Cobra.install() -> undefined
     *
     * This function makes all the top level cobra objects part of
     * the global namespace. Do this if you don't want to prepend every
     * call to Cobra with `Cobra`
     **/
    Cobra.install = function() {
        var key;
        for (key in Cobra) {
            if (key != 'install') {
                root[key] = Cobra[key];
            }
        }
    };

    /**
     * class Cobra.Class
     **/

    /**
     * new Cobra.Class(prototype)
     * - prototype (Object): The object to inherit from. May contain
     *   special properties that change behavior (such as `__init__` and
     *   `__extends__`). These are documented in depth below.
     *
     * The `Cobra.Class` function allows you to make very simple classes in
     * a style modeled after python.
     *
     * Everything is public. Indicate that you would prefer certain
     * things be kept private with a leading underscore (IE. `_privateThing`)
     *
     * All class methods are passed `self` as their first parameter. Self
     * is guaranteed to be the instance of the class, whether `this` is the
     * instance or not.
     *
     * Provide a constructor called `__init__` if you would like to initialize
     * things.
     *
     * Provide a base class in the `__extends__` property if you want your
     * class to inherit from that class.
     *
     * Example
     * -------
     *      var Animal = new Cobra.Class({
     *          __init__: function(self) {
     *              self.breathes = true;
     *          }
     *      });
     *      var Feline = new Cobra.Class({
     *          __extends__: Animal,
     *          __init__: function(self) {
     *              Cobra.Class.ancestor(Feline, '__init__', self);
     *              self.claws = true;
     *              self.furry = true;
     *          },
     *          says: function(self) {
     *              console.log ('GRRRRR');
     *          }
     *      });
     *      var Cat = new Cobra.Class({
     *          __extends__: Feline,
     *          __init__: function(self) {
     *              Cobra.Class.ancestor(self, '__init__', self);
     *              self.weight = 'very little';
     *          },
     *          says: function(self) {
     *              console.log('MEOW');
     *          }
     *      });
     *      var Tiger = new Cobra.Class({
     *          __extends__: Feline,
     *          __init__: function(self) {
     *              Cobra.Class.ancestor(Tiger, '__init__', self);
     *              self.weight = 'quite a bit';
     *          }
     *      });
     *
     * Usage
     * -----
     *
     *      >>> sneakers = new Cat();
     *      Object breathes=true claws=true furry=true
     *      >>> sneakers.breathes
     *      true
     *      >>> sneakers.claws
     *      true
     *      >>> sneakers.furry
     *      true
     *      >>> sneakers.weight
     *      "very little"
     *      >>> sneakers.says();
     *      MEOW
     *      >>> tigger = new Tiger()
     *      Object breathes=true claws=true furry=true
     *      >>> tigger.says()
     *      GRRRRR
     **/
    Cobra.Class = function(prototype) {
        var base, key;

        // Constructor
        function klass() {
            if (this === root) {
                throw new TypeError(
                    'You must use "new" when instantiating' +
                    'a new instance of this class');
            }

            var key, member;
            var instance;
            var base;

            // Methodize all the functions
            if (Cobra.config.self) {
                for (key in this) {
                    member = this[key];
                    // Don't wrap things on object.prototype with self
                    if (Object.prototype[key] == member) {
                        continue;
                    }
                    if (typeof member == 'function') {
                        this[key] = Cobra.Class.method(member, this);
                    }
                }
            }

            this.constructor = klass;
            instance = (this.__init__) ?
                this.__init__.apply(this, arguments) : this;

            return instance;
        }

        /* A very basic, prototype-based inheritance scheme.
         *
         * Basically, we create a wrapper "base" object that will serve as the
         * prototype for our new class. It, in turn, has our inherited class
         * prototype as its prototype. This creates an prototype based
         * inheritance chain.
         *
         * If IE supported the __proto__ property on instances, this would all
         * be a bit easier.
         */
        if (prototype.__extends__) {
            klass.__extends__ = prototype.__extends__;
            delete prototype.__extends__;
            base = function() {};
            base.prototype = klass.__extends__.prototype;
            base = new base();
            /* copy the updated prototype into the properties of base */
            for (key in prototype) {
                // Needed check in case of extension on Object.prototype
                if (prototype.hasOwnProperty(key)) {
                    base[key] = prototype[key];
                }
            }
        } else {
            base = prototype;
        }

        klass.prototype = base;

        /* Cobra.Class functions */
        klass.isChild = function(parent) {
            return Cobra.Class.isChild(this, parent);
        };

        klass.hasParent = function() {
            return Cobra.Class.hasParent(this);
        };

        return klass;
    };

    /**
     * Cobra.Class.method(callable, self) -> function
     * - callable (Function): A function to methodize.
     * - self (Object): The scope you want `this` to be defined as
     *   when this method is called.
     *
     * Makes a method out of passed function, and returns the new function
     **/
    Cobra.Class.method = function(callable, self) {
        function method() {
            var args = toArray(arguments);
            args.unshift(self);
            return callable.apply(this, args);
        }
        return method;
    };

    /* Tests to see whether child has parent somewhere in its inheritance chain
     */
    Cobra.Class.isChild = function(child, parent) {
        if (child === parent) { return true; }
        if (child.__extends__) {
            return Cobra.Class.isChild(child.__extends__, parent);
        }
        return false;
    };

    /* Returns true if the child has descended from a Cobra Class */
    Cobra.Class.hasParent = function(child) {
        return (child.__extends__ || child.constructor.__extends__);
    };

    /**
     * Cobra.Class.ancestor(child, method[, args]) -> Return Value
     * - child (Cobra.Class | Object): The class or object you want to find
     *   the ancestor of. If passing an object, the object must be an instance
     *   of a [[Cobra.Class]]
     * - method (String): The method to call on the first ancestor that has
     *   the method.
     *
     * Invokes the specified method on the first parent class that has the
     * specified method.
     *
     * Example
     * -------
     *     init: function(self, arg) {
     *         Cobra.Class.ancestor(MyCobra.Class|self, '__init__', self, arg);
     *     }
     **/
    Cobra.Class.ancestor = function(child, method) {
        var parentClass = child.__extends__ || child.constructor.__extends__;
        var args = toArray(arguments);
        if (parentClass.prototype[method]) {
            args = args.slice(2, arguments.length);
            return parentClass.prototype[method].apply(this, args);
        } else {
            args[0] = parentClass; //move up one in the inheritance stack
            return Cobra.Class.ancestor.call(this, args);
        }
    };

    /**
     * class Cobra.Singleton
     **/

    /**
     * new Cobra.Singleton(prototype)
     *
     * The Singleton class is created just like a regular [[Cobra.Class]]
     * except that a single instance is returned.
     **/

    Cobra.Singleton = new Cobra.Class({
        __init__: function(self, prototype) {
            var klass = new Cobra.Class(prototype);
            return new klass();
        }
    });

})();
