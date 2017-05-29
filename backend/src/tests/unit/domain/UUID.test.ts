import {UUID} from "domain/UUID";

describe("UUID", function() {

    it("should throw if not UUID", function() {
        const testCases = ["1", "anything", ""];
        testCases.forEach(function(testCase) {
            expect(() => new UUID(testCase)).to.throw();
        });
    });

    it("should not throw if is UUID", function() {
        const testCases = ["0aace601-fb6d-432e-8496-b2834c12a084", "8e12c9fc-9a28-4b01-8fe9-c1e31c0ff7fc"];
        testCases.forEach(function(testCase) {
            expect(() => new UUID(testCase)).not.to.throw();
        });
    });

});
