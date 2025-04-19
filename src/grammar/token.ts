import { TOKEN_TYPES } from "./token_types";

export interface Token {
    type : TOKEN_TYPES,
    value? : any
}