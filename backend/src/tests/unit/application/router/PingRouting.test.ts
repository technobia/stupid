import PingRouting from "express/routes/public/PingRouting";
import RoutingTester from "./RoutingTester";

describe("PingRouting", () => {

    let sut: any;
    beforeEach(() => {
        sut = new PingRouting;
    });

    RoutingTester.testFillRoutes([
        {handler: "getPing", method: "GET", url: "/ping/:name" },
    ], () => sut);
});
