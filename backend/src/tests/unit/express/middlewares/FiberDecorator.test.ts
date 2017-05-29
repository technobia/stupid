/**
 * Created by jose on 13/07/2015.
 */
import FiberDecorator from "express/middlewares/FiberDecorator";
import StubListener from "helpers/StubListener";

describe("FiberDecorator", () => {
    describe("setup", function() {
        it("should call use listener with setupFiber", () => {
            const sut = new FiberDecorator;
            const listener = new StubListener;
            sut.setup(listener);
            expect(listener.use.calledWith(sut.setupFiber)).to.equal(true);
        });
    });

    describe("setupFiber", () => {
        it("should call wait.launchFiber with next", () => {
            const sut = new FiberDecorator({launchFiber: (next: any) => next()});
            const spy = sinon.spy();
            sut.setupFiber(1, 2, spy);
            expect(spy.calledOnce).to.equal(true);
        });
    });
});
