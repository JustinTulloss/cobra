var core_tests = {
    "should install everything but 'install'": function() {
        Cobra.install();
        for (obj in Cobra) {
            if (obj != "install") {
                value_of(window[obj]).should_be(Cobra[obj]);
            }
        }
        value_of(window.install).should_be_undefined();
    }
};

core_tests.before = function() {
    Cobra.config.self = true;
}
describe("Core with self", core_tests);

core_tests.before = function() {
    Cobra.config.self = false;
}

describe("Core without self", core_tests);
