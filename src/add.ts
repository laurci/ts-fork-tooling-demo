import { FunctionMacro, isNumericLiteral, NumericLiteral } from "compiler";

export macro function add(this: FunctionMacro, ..._args: number[]): number {
    this.check(({ node, diagnostic }) => {
        for (const arg of node.arguments) {
            if (!isNumericLiteral(arg)) {
                diagnostic("error", "Expected a numeric literal", arg);
                continue;
            }
        }
    });

    this.transform(({ node, factory }) => {
        const args = node.arguments.filter(x => isNumericLiteral(x)) as NumericLiteral[];
        const operation = `(${args.map((arg) => arg.text).join(" + ")})`;
        node.replace(
            factory.createNumericLiteral(eval(operation))
        );
    });
}
