/**
 * Created by jose on 26/09/16.
 */
import {parseLine} from "infrastructure/CSVReader";

describe("infrastructure/CSVReader", () => {
    describe("parseLine", () => {
        const validLineProvider: string[] = [
            "",
        ];

        validLineProvider.forEach((line: string, i: number) => {
            it("should parse the line " + i, () => {
                parseLine(line);
                // expect(actual).to.eql({});
            });
        });
    });
});

