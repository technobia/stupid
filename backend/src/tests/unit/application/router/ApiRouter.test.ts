import ApiRouter from "express/middlewares/ApiRouter";
import StubListener from "../../../node_modules/helpers/StubListener";
import {GenerateRandomUUID} from "domain/UUID";

describe("ApiRouter", () => {

    const SOMETHING = JSON.stringify({something: [1, 2, 3]});

    class RoutingMock {
        public handlers() {
            return {getSomething: (req: any) => JSON.parse(SOMETHING)};
        }

        public fillRoutes(router: any, handlers: any) {
            router.get("/something", handlers.getSomething);
        }
    }

    let sut: any;
    beforeEach(() => {
        const router = new StubListener;
        const routing = new RoutingMock;
        sut = new ApiRouter({routing, router, folder: "/api"});
    });

    describe("setup", () => {
        function exerciseSetup() {
            const listener = new StubListener;
            sut.setup(listener);
            return listener;
        }

        it("should apply the router to the listener at /api", () => {
            const listener = exerciseSetup();
            expect(listener.use.calledWith("/api", sut.router)).to.equal(true);
        });

        it("should call fillRoutes with the result of _getHandlers and the router", () => {
            sinon.stub(sut, "_getHandlers").returns("BLA");
            sinon.stub(sut.routing, "fillRoutes");
            exerciseSetup();
            expect(sut.routing.fillRoutes.calledWith(sut.router, "BLA")).to.equal(true);
        });
    });

    describe("_getHandlers", () => {

        let request: any, response: any;

        beforeEach(() => {
            response = {
                send: sinon.stub(),
                status: sinon.stub().returns({send: sinon.stub()}),
            };
        });

        it("should transform the handlers to send json through a response object", () => {
            request = {
                headers: { "user-id": GenerateRandomUUID().value },
            };
            sut.publicRoute = true;
            const handlers = sut._getHandlers();
            handlers.getSomething(request, response);
            expect(response.send.calledWith(SOMETHING));
        });

        // it("should return 401 for unauthenticated requests", () => {
        //     request = {
        //         headers: {},
        //     };
        //     sut.publicRoute = false;
        //     const handlers = sut._getHandlers();
        //     handlers.getSomething(request, response);
        //     expect(response.send.calledWith(SOMETHING));
        // });
    });
});
