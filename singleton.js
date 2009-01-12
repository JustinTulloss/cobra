var Singleton = new Class({
    __init__: function(prototype) {
        klass = new Class(prototype);
        return new klass();
    }
});
