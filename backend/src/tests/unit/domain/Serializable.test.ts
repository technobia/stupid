/**
 * Created by jose on 27/04/2016.
 */
import {JsonObject, Serializable} from "domain/Serializable";

describe("Serializable", () => {

    it("should compile 2", () => {
        class Whatever2 implements Serializable<string> {
            public toJSON(): JsonObject & any {
                return "whatever";
            }
        }
        expect(new Whatever2().toJSON()).to.eql("whatever");
    });

    it("should compile 3", () => {
        interface DTO {
            value: string;
        }

        class Whatever3 implements Serializable<DTO> {
            public toJSON(): JsonObject & DTO {
                return {
                    value: "fuck",
                };
            }
        }
        expect(new Whatever3().toJSON().value).to.eql("fuck");
    });

    it("should compile 4", () => {
        interface DTO {
            value: number;
        }

        class Whatever4 implements Serializable<DTO> {
            public toJSON(): JsonObject & DTO {
                return {
                    value: 4,
                };
            }
        }
        expect(new Whatever4().toJSON().value).to.eql(4);
    });

});

