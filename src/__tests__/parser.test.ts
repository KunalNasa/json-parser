import { parser } from "../parser";

describe("parser", () => {
  it("parses a simple number literal", () => {
    const ast = {
      type: "Program",
      body: [{ type: "NumberLiteral", value: 123 }],
    };

    expect(parser(ast)).toBe(123);
  });

  it("parses a string literal", () => {
    const ast = {
      type: "Program",
      body: [{ type: "StringLiteral", value: "hello" }],
    };

    expect(parser(ast)).toBe("hello");
  });

  it("parses a boolean literal - true", () => {
    const ast = {
      type: "Program",
      body: [{ type: "BooleanLiteral", value: true }],
    };

    expect(parser(ast)).toBe(true);
  });

  it("parses a boolean literal - false", () => {
    const ast = {
      type: "Program",
      body: [{ type: "BooleanLiteral", value: false }],
    };

    expect(parser(ast)).toBe(false);
  });

  it("parses a null literal", () => {
    const ast = {
      type: "Program",
      body: [{ type: "NullLiteral", value: null }],
    };

    expect(parser(ast)).toBe(null);
  });

  it("parses an empty array", () => {
    const ast = {
      type: "Program",
      body: [{ type: "ArrayExpression", elements: [] }],
    };

    expect(parser(ast)).toEqual([]);
  });

  it("parses a flat array", () => {
    const ast = {
      type: "Program",
      body: [
        {
          type: "ArrayExpression",
          elements: [
            { type: "NumberLiteral", value: 1 },
            { type: "StringLiteral", value: "a" },
          ],
        },
      ],
    };

    expect(parser(ast)).toEqual([1, "a"]);
  });

  it("parses a nested object", () => {
    const ast = {
      type: "Program",
      body: [
        {
          type: "ObjectExpression",
          properties: [
            {
              type: "Property",
              key: { type: "StringLiteral", value: "name" },
              value: { type: "StringLiteral", value: "Kunal" },
            },
            {
              type: "Property",
              key: { type: "StringLiteral", value: "nested" },
              value: {
                type: "ObjectExpression",
                properties: [
                  {
                    type: "Property",
                    key: { type: "StringLiteral", value: "valid" },
                    value: { type: "BooleanLiteral", value: true },
                  },
                ],
              },
            },
          ],
        },
      ],
    };

    expect(parser(ast)).toEqual({
      name: "Kunal",
      nested: {
        valid: true,
      },
    });
  });

  it("parses an array of objects", () => {
    const ast = {
      type: "Program",
      body: [
        {
          type: "ArrayExpression",
          elements: [
            {
              type: "ObjectExpression",
              properties: [
                {
                  type: "Property",
                  key: { type: "StringLiteral", value: "id" },
                  value: { type: "NumberLiteral", value: 1 },
                },
              ],
            },
            {
              type: "ObjectExpression",
              properties: [
                {
                  type: "Property",
                  key: { type: "StringLiteral", value: "id" },
                  value: { type: "NumberLiteral", value: 2 },
                },
              ],
            },
          ],
        },
      ],
    };

    expect(parser(ast)).toEqual([{ id: 1 }, { id: 2 }]);
  });
  it("throws an error for unsupported node type", () => {
    const ast = {
      type: "Program",
      body: [
        { type: "UnsupportedLiteral", value: "🚫" },
      ],
    };
  
    expect(() => parser(ast)).toThrow("Unknown node type: UnsupportedLiteral");
  });
  
});
