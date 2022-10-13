import {add} from "./add";

function main() {
    const sum = add!(1, 2, 3);
    defer console.log("sum", sum);

    console.log("bla");
}
main();
