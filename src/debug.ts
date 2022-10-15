import { FunctionMacro, findAncestor, isFunctionDeclaration, NodeFactory, Expression, StringLiteral, EmitHint, createPrinter, SourceFile, isStringLiteral } from "compiler";

const printer = createPrinter({});

function createLogCall(factory: NodeFactory, sourceFile: SourceFile, initialArgs: StringLiteral[], args: Expression[]) {
    const finalArguments = [
        ...initialArgs.flatMap(arg => ([arg, factory.createStringLiteral("|")])),
        ...args.flatMap((arg, index) => {
            const result: Expression[] = [];

            if (!isStringLiteral(arg)) {
                result.push(factory.createStringLiteral(printer.printNode(4 as EmitHint.Unspecified, arg, sourceFile) + " = ", false));
            }

            result.push(arg);

            if (index != args.length - 1) {
                result.push(factory.createStringLiteral("|"));
            }

            return result;
        })
    ];

    return factory.createCallExpression(
        factory.createPropertyAccessExpression(factory.createIdentifier("console"), "log"),
        [],
        finalArguments
    );
}

export macro function debug(this: FunctionMacro, ..._args: unknown[]) {
    this.transform(({ node, factory, sourceFile }) => {
        const fn = findAncestor(node, isFunctionDeclaration);
        const fnName = factory.createStringLiteral(`component: ${fn?.name?.escapedText ?? "unknown"}`, false);

        node.replace(createLogCall(factory, sourceFile, [fnName], [...node.arguments]));
    });
}
