var Singleton = new Class({
    __init__: function(self, prototype) {
        klass = new Class(prototype);
        return new klass();
    }
});
