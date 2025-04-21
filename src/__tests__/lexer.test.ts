import { lexer } from "../lexer";
import { TOKEN_TYPES } from "../grammar/token_types";

describe("Lexer", () => {
  it("should tokenize brackets and punctuation", () => {
    const input = '{ [ ] } : ,';
    const tokens = lexer(input);

    expect(tokens).toEqual([
      { type: TOKEN_TYPES.LEFT_BRACE },
      { type: TOKEN_TYPES.LEFT_BRACKET },
      { type: TOKEN_TYPES.RIGHT_BRACKET },
      { type: TOKEN_TYPES.RIGHT_BRACE },
      { type: TOKEN_TYPES.COLON },
      { type: TOKEN_TYPES.COMMA },
    ]);
  });

  it("should tokenize true, false, null", () => {
    const input = 'true false null';
    const tokens = lexer(input);

    expect(tokens).toEqual([
      { type: TOKEN_TYPES.TRUE },
      { type: TOKEN_TYPES.FALSE },
      { type: TOKEN_TYPES.NULL },
    ]);
  });

  it("should tokenize numbers", () => {
    const input = '123';
    const tokens = lexer(input);

    expect(tokens).toEqual([
      { type: TOKEN_TYPES.NUMBER, value: '123' },
    ]);
  });

  it("should tokenize strings", () => {
    const input = `"hello"`;
    const tokens = lexer(input);

    expect(tokens).toEqual([
      { type: TOKEN_TYPES.STRING, value: 'hello' },
    ]);
  });

  it("should throw on unexpected character", () => {
    const input = 'Hello';

    expect(() => lexer(input)).toThrow("Unexpected character: H");
  });

  it("should throw on invalid boolean", () => {
    const input = 'tru';
    
    expect(() => lexer(input)).toThrow("Invalid character passed");
  });

  it("should through on invalid false boolean", () => {
    const input = 'fales';
    expect(() => lexer(input)).toThrow("Invalid character passed")
  })

  it("should throw on invalid null", () => {
    const input = 'nul';

    expect(() => lexer(input)).toThrow("Invalid character passed");
  });

  it("should skip whitespace", () => {
    const input = ' 123   ';
    const tokens = lexer(input);

    expect(tokens).toEqual([
      { type: TOKEN_TYPES.NUMBER, value: '123' },
    ]);
  });
});
