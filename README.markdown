Cobra: A simple JavaScript Class Library
========================================

Cobra is a simple JavaScript class library that attempts to provide a nice interface
for creating classes and managing instances of those classes. It attempts to
interfere as little as possible with how JavaScript usually behaves, meaning that it
should work with any other JavaScript library.

How to Use the Library
----------------------

Cobra.Class allows you to make very simple classes
in a style modeled after python.

Everything is public. Indicate that you would prefer certain things be kept private
with a leading underscore (IE. _privateThing)

All class methods are passed "self" as their first parameter. Self is guaranteed to be
the instance of the class, whether "this" is the instance or not.

Provide a constructor called __init__ if you would like to initialize things.

Provide a base class in the __extends__ property if you want your class to inherit from that class.

Example
-------
    var Animal = new Cobra.Class({
        __init__: function(self) {
            self.breathes = true;
        }
    });

    var Feline = new Cobra.Class({
        __extends__: Animal,
        __init__: function(self) {
            Cobra.Class.ancestor(Feline, '__init__', self);
            self.claws = true;
            self.furry = true;
        },
        says: function(self) {
            console.log ('GRRRRR');
        }
    });

    var Cat = new Cobra.Class({
        __extends__: Feline,
        __init__: function(self) {
            Cobra.Class.ancestor(self, '__init__', self);
            self.weight = 'very little';
        },
        says: function(self) {
            console.log('MEOW');
        }
    });

    var Tiger = new Cobra.Class({
        __extends__: Feline,
        __init__: function(self) {
            Cobra.Class.ancestor(Tiger, '__init__', self);
            self.weight = 'quite a bit';
        }
    });

Usage
-----

    >>> sneakers = new Cat();
    Object breathes=true claws=true furry=true
    >>> sneakers.breathes
    true
    >>> sneakers.claws
    true
    >>> sneakers.furry
    true
    >>> sneakers.weight
    "very little"
    >>> sneakers.says();
    MEOW
    >>> tigger = new Tiger()
    Object breathes=true claws=true furry=true
    >>> tigger.says()
    GRRRRR

Tests
-----

Cobra is tested with JSSpec, which you can find in the "spec" subfolder. Open spec_runner.html
in your browser of choice to see all the tests passing.

Known to work in:
    * Chrome
    * Safari 4
    * FireFox 3.5

License
-------
MIT License

Copyright (c) 2009-2010 Justin Tulloss

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
