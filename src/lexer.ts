import { createToken } from "./createToken";
import { Token } from "./grammar/token";
import { TOKEN_TYPES } from "./grammar/token_types";

export function lexer(input: string): Token[] {
  let current = 0;
  const tokens: Token[] = [];

  while (current < input.length) {
    let char = input[current];

    const WHITESPACE = /\s/;
    const NUMBER = /[0-9]/;

    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    switch (char) {
      case '{':
        tokens.push(createToken(TOKEN_TYPES.LEFT_BRACE));
        current++;
        continue;

      case '}':
        tokens.push(createToken(TOKEN_TYPES.RIGHT_BRACE));
        current++;
        continue;

      case '[':
        tokens.push(createToken(TOKEN_TYPES.LEFT_BRACKET));
        current++;
        continue;

      case ']':
        tokens.push(createToken(TOKEN_TYPES.RIGHT_BRACKET));
        current++;
        continue;

      case ':':
        tokens.push(createToken(TOKEN_TYPES.COLON));
        current++;
        continue;

      case ',':
        tokens.push(createToken(TOKEN_TYPES.COMMA));
        current++;
        continue;

      case 'n':
        if (
          input[current + 1] === 'u' &&
          input[current + 2] === 'l' &&
          input[current + 3] === 'l'
        ) {
          tokens.push(createToken(TOKEN_TYPES.NULL));
          current += 4;
          continue;
        }
        throw new Error("Invalid character passed");

      case 't':
        if (
          input[current + 1] === 'r' &&
          input[current + 2] === 'u' &&
          input[current + 3] === 'e'
        ) {
          tokens.push(createToken(TOKEN_TYPES.TRUE));
          current += 4;
          continue;
        }
        throw new Error("Invalid character passed");

      case 'f':
        if (
          input[current + 1] === 'a' &&
          input[current + 2] === 'l' &&
          input[current + 3] === 's' &&
          input[current + 4] === 'e'
        ) {
          tokens.push(createToken(TOKEN_TYPES.FALSE));
          current += 5;
          continue;
        }
        throw new Error("Invalid character passed");

      case '"': {
        let value = "";
        char = input[++current];
        while (char !== '"') {
          char = input[current++];
          if(char === '"') break;
          value += char;
        }
        tokens.push(createToken(TOKEN_TYPES.STRING, value));
        continue;
      }

      default:
        if (NUMBER.test(char)) {
          let value = "";
          while (NUMBER.test(char)) {
            value += char;
            char = input[++current];
          }
          tokens.push(createToken(TOKEN_TYPES.NUMBER, Number(value)));
          continue;
        }

        throw new Error("Unexpected character: " + char);
    }
  }

  return tokens;
}
