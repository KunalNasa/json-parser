import { createToken } from "../createToken";
import { TOKEN_TYPES } from "../grammar/token_types";

describe("Test whether createTokens function is returning correct tokens or not", () => {
    it("Test String token", () => {
        const token_type = TOKEN_TYPES.STRING;
        const value = "Kunal";

        const token = createToken(token_type, value);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(value);
    });
    it("Test Colon Token", () => {
        const token_type = TOKEN_TYPES.COLON;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test Colon Token", () => {
        const token_type = TOKEN_TYPES.COLON;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test Comma Token", () => {
        const token_type = TOKEN_TYPES.COMMA;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test False Token", () => {
        const token_type = TOKEN_TYPES.FALSE;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test True Token", () => {
        const token_type = TOKEN_TYPES.TRUE;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test Null Token", () => {
        const token_type = TOKEN_TYPES.NULL;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test Number Token", () => {
        const token_type = TOKEN_TYPES.NUMBER;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test Leftbrace Token", () => {
        const token_type = TOKEN_TYPES.LEFT_BRACE;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test Right brace Token", () => {
        const token_type = TOKEN_TYPES.RIGHT_BRACE;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test Right bracket Token", () => {
        const token_type = TOKEN_TYPES.RIGHT_BRACKET;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })
    it("Test Left bracket Token", () => {
        const token_type = TOKEN_TYPES.LEFT_BRACKET;
        
        const token = createToken(token_type);
        expect(token.type).toBe(token_type);
        expect(token.value).toBe(undefined);
    })

    
});