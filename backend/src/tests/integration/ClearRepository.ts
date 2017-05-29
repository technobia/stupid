/**
 * Created by jose on 26/08/2015.
 */

import WaitForPromise from "infrastructure/WaitForPromise";
import Initializer from "application/Initializer";
import {IgnoreOrThrowLogger} from "helpers/IgnoreOrThrowLogger";

let migrationsDone = false;
export default function(repo: any): void {
    WaitForPromise(new Promise((resolve, reject) => {
        if (migrationsDone === false) {
            WaitForPromise(Initializer.make(new IgnoreOrThrowLogger).init());
            migrationsDone = true;
        }
        repo.schema.destroy({force: true, where: {}}).then(resolve).catch(reject);
    }));
}
