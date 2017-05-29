/**
 * Created by jose on 13/07/2015.
 */
import StubListener from "../../../node_modules/helpers/StubListener";

export default {
    testFillRoutes: function(routes: any, getSut: any) {
        describe("fillRoutes", () => {
            routes.forEach((test: any) => {
                it("should register " + test.method + " " + test.url, () => {
                    const router = new StubListener;
                    const sut = getSut();
                    const handlers = sut.handlers();
                    sut.fillRoutes(router, handlers);
                    expect(router.registered(test.method, test.url, handlers[test.handler])).to.equal(true);
                });
            });
        });
    },
};
