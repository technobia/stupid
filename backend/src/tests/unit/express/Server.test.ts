/**
 * Created by kevin on 7/7/15.
 */
import Server from "express/Server";

describe("Server", () => {
    function listener() {
        const baseListener = {
            get: () => {
                //
            },
            listen: () => {
                //
            },
            use: () => {
                //
            },
        };
        sinon.stub(baseListener);
        return baseListener;
    }

    function server(dc = <any>[], ln = listener(), exp = express()) {
        return new Server(dc, ln, {
            info: () => {
                //
            },
            warn: () => {
                //
            },
        }, exp);
    }

    function express() {
        const exp = {
            static: () => {
                //
            },
        };
        sinon.stub(exp);
        exp.static = sinon.stub().returns({});
        return exp;
    }

    describe("listen", () => {
        it("should setup the passed decorator", () => {
            class DecoratorMock {
                public setup(listener: any) {
                    listener.get("/");
                }
            }

            const listn = listener();
            server([new DecoratorMock], listn).listen(9000);
            expect((<any>listn.get).calledWith("/")).to.equal(true);
        });

        it("should listen incoming requests", () => {
            const listn = listener();
            server([], listn).listen(9000);
            expect((<any>listn.listen).calledOnce).to.equal(true);
        });
    });
});
