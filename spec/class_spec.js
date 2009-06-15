describe("Class with self", {
    before: function() {
        Cobra.config.self = true;
        Animal = new Cobra.Class({
            __init__: function(self) {
                self.breathes = true;
            }
        });
        Feline = new Cobra.Class({
            __extends__: Animal,
            __init__: function(self) {
                Cobra.Class.ancestor(Feline, '__init__', self);
                self.claws = true;
                self.furry = true;
            },
            says: function(self) {
                console.log ('GRRRRR');
            },
            declaw: function(self) {
                self.claws = false;
            }
        });
    },
    "Animal class should exist": function() {
        value_of(Animal).should_not_be_undefined();
    },
    "Animal class should be constructable": function() {
        var a = new Animal();
        value_of(a).should_not_be_undefined();
        value_of(a instanceof Animal).should_be_true();
    },
    "Animal object should breath": function() {
        var a = new Animal();
        value_of(a.breathes).should_be_true();
    },
    "Feline class should exist": function() {
        value_of(Feline).should_not_be_null();
    },
    "Feline class should be constructable": function() {
        var f = new Feline();
        value_of(Feline).should_not_be_undefined();
        value_of(f instanceof Feline).should_be_true();
    },
    "Feline object should breath": function() {
        var f = new Feline();
        value_of(f.breathes).should_be_true();
    },
    "Feline object should have claws and be furry": function() {
        var f = new Feline();
        value_of(f.claws).should_be_true();
        value_of(f.furry).should_be_true();
    },
    "Should be able to declaw a feline object": function() {
        var f = new Feline();
        var f2 = new Feline();
        f.declaw();
        value_of(f.claws).should_be_false();
        value_of(f2.claws).should_be_true();
    }
});
