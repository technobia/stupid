/**
 * Created by kevin on 7/7/15.
 */
import StaticFolder from "express/middlewares/StaticFolder";
import {StaticFolderDefinition} from "express/middlewares/StaticFolder";

describe("StaticFolders", () => {
    function listener() {
        const baseListener = {
            use: () => {
                //
            },
        };
        sinon.stub(baseListener);
        return baseListener;
    }

    function statics(folder: StaticFolderDefinition, exp = express()) {
        return new StaticFolder(folder, exp);
    }

    function express() {
        const exp = {
            static: () => ({}),
        };
        sinon.stub(exp);
        exp.static = sinon.stub().returns({});
        return exp;
    }

    describe("use", () => {

        it("should expose the upload folder", () => {
            const listn = listener();
            statics({folder: "/public/", path: "/somewhere"}).setup(listn);
            expect((<any>listn.use)).to.have.been.calledWith("/public/", {});
        });
    });
});
