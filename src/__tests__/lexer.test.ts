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
  it("Test all types", () => {
    const input = '{"name" : "kunal", "isAdult":true, "isFemale":false, "age":21, "techstack":["React", "Python","Javascript"]}'
    const tokens = lexer(input);
    expect(tokens).toEqual([
      { type: TOKEN_TYPES.LEFT_BRACE },
      { type: TOKEN_TYPES.STRING, value: 'name' },
      { type: TOKEN_TYPES.COLON },
      { type: TOKEN_TYPES.STRING, value: 'kunal' },
      { type: TOKEN_TYPES.COMMA },
      { type: TOKEN_TYPES.STRING, value: 'isAdult' },
      { type: TOKEN_TYPES.COLON },
      { type: TOKEN_TYPES.TRUE },
      { type: TOKEN_TYPES.COMMA },
      { type: TOKEN_TYPES.STRING, value: 'isFemale' },
      { type: TOKEN_TYPES.COLON },
      { type: TOKEN_TYPES.FALSE },
      { type: TOKEN_TYPES.COMMA },
      { type: TOKEN_TYPES.STRING, value: 'age' },
      { type: TOKEN_TYPES.COLON },
      { type: TOKEN_TYPES.NUMBER, value: '21' },
      { type: TOKEN_TYPES.COMMA },
      { type: TOKEN_TYPES.STRING, value: 'techstack' },
      { type: TOKEN_TYPES.COLON },
      { type: TOKEN_TYPES.LEFT_BRACKET },
      { type: TOKEN_TYPES.STRING, value: 'React' },
      { type: TOKEN_TYPES.COMMA },
      { type: TOKEN_TYPES.STRING, value: 'Python' },
      { type: TOKEN_TYPES.COMMA },
      { type: TOKEN_TYPES.STRING, value: 'Javascript' },
      { type: TOKEN_TYPES.RIGHT_BRACKET },
      { type: TOKEN_TYPES.RIGHT_BRACE },
    ]);
  })
});
