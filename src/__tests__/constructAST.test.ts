import { constructAST } from "../constructAST";
import { TOKEN_TYPES } from "../grammar/token_types";

describe("constructAST", () => {
  it("parses an empty object", () => {
    const tokens = [
      { type: TOKEN_TYPES.LEFT_BRACE },
      { type: TOKEN_TYPES.RIGHT_BRACE },
    ];

    const ast = constructAST(tokens);
    expect(ast).toEqual({
      type: "Program",
      body: [
        {
          type: "ObjectExpression",
          properties: [],
        },
      ],
    });
  });

  it("parses a simple object with one property", () => {
    const tokens = [
      { type: TOKEN_TYPES.LEFT_BRACE },
      { type: TOKEN_TYPES.STRING, value: "name" },
      { type: TOKEN_TYPES.COLON },
      { type: TOKEN_TYPES.STRING, value: "Kunal" },
      { type: TOKEN_TYPES.RIGHT_BRACE },
    ];

    const ast = constructAST(tokens);
    expect(ast).toEqual({
      type: "Program",
      body: [
        {
          type: "ObjectExpression",
          properties: [
            {
              type: "Property",
              key: { type: TOKEN_TYPES.STRING, value: "name" },
              value: {
                type: "StringLiteral",
                value: "Kunal",
              },
            },
          ],
        },
      ],
    });
  });

  it("parses a nested array", () => {
    const tokens = [
      { type: TOKEN_TYPES.LEFT_BRACKET },
      { type: TOKEN_TYPES.NUMBER, value: 1 },
      { type: TOKEN_TYPES.COMMA },
      { type: TOKEN_TYPES.NUMBER, value: 2 },
      { type: TOKEN_TYPES.COMMA },
      { type: TOKEN_TYPES.LEFT_BRACKET },
      { type: TOKEN_TYPES.TRUE },
      { type: TOKEN_TYPES.COMMA },
      { type: TOKEN_TYPES.NULL },
      { type: TOKEN_TYPES.RIGHT_BRACKET },
      { type: TOKEN_TYPES.RIGHT_BRACKET },
    ];

    const ast = constructAST(tokens);
    expect(ast).toEqual({
      type: "Program",
      body: [
        {
          type: "ArrayExpression",
          elements: [
            { type: "NumberLiteral", value: 1 },
            { type: "NumberLiteral", value: 2 },
            {
              type: "ArrayExpression",
              elements: [
                { type: "BooleanLiteral", value: true },
                { type: "NullLiteral", value: null },
              ],
            },
          ],
        },
      ],
    });
  });

  it("throws on unknown token", () => {
    const tokens = [{ type: "RANDOM_UNKNOWN_TOKEN" } as any];
    expect(() => constructAST(tokens)).toThrow(TypeError);
  });
});
