import React from "react";
import { add } from "./add";

export default function Hello() {
    const sum = add!(1, 3, 6);

    return <div>
        <h1>Hello world!</h1>
        <h2>sum is {sum}</h2>
    </div>;
}
