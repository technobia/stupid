declare var expect: any;
declare var sinon: any;
declare var GLOBAL: any;
declare function noId(json: any): any;
declare function noAttribute(json: any, keyName: string): any;

chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
GLOBAL.expect = chai.expect;
GLOBAL.sinon = require("sinon");
require("sinon-as-promised");
GLOBAL.noId = function(json: any): any {
    return GLOBAL.noAttribute(json, "id");
};
GLOBAL.noAttribute = function(json: any, keyName: any): any {
    let ret: any = {};
    Object.keys(json)
        .filter(function(key: any) { return key !== keyName; })
        .forEach(function(key: any) { ret[key] = json[key]; });
    return ret;
};
