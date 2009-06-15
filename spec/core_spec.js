describe("Core", {
    "should install everything but 'install'": function() {
        Cobra.install();
        for (obj in Cobra) {
            if (obj != "install") {
                value_of(window[obj]).should_be(Cobra[obj]);
            }
        }
        value_of(window.install).should_be_undefined();
    }
});
