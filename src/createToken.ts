import { Token } from "./grammar/token";
import { TOKEN_TYPES } from "./grammar/token_types";

export function createToken(type : TOKEN_TYPES, value?: any) : Token {
    return {
        type,
        value
    }
}