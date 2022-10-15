import React from "react";
import { add } from "./add";
import { debug } from "./debug";

function Hello() {
    const sum = add!(1, 2, 3);

    debug!("before render", sum);
    defer {
        debug!("after render", sum);
    }

    return (
        <div>
            <h1>Hello world!</h1>
            <h2>sum is {sum}</h2>
        </div>
    );
}
export default Hello;
