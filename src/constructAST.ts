import { TOKEN_TYPES } from "./grammar/token_types";

export const constructAST = (tokens: Array<{ type: string; value?: any }>) => {
    let current = 0
  
  
    const walk = () => {
      let token = tokens[current]
  
  
      if (token.type === TOKEN_TYPES.LEFT_BRACE) {
        token = tokens[++current]
  
  
        const node: {
          type: string
          properties?: Array<{ type: string; key: any; value: any }>
        } = {
          type: 'ObjectExpression',
          properties: [],
        }
  
  
        while (token.type !== TOKEN_TYPES.RIGHT_BRACE) {
          const property: { type: string; key: any; value: any } = {
            type: 'Property',
            key: token,
            value: null,
          }
  
          // on colon (:)
          token = tokens[++current]
          
          
          // next of colon (:)
          token = tokens[++current]
          property.value = walk()
          node.properties?.push(property)
  
          // walk might eat more than one tokens, therefore we are not sure where is current and what should be the value of token, thats why we are re assigning token value.
          token = tokens[current]
          if (token.type === TOKEN_TYPES.COMMA) {
            token = tokens[++current]
          }
        }
  
  
        current++;
        return node
      }
  
      // be extra careful
      if (token.type === TOKEN_TYPES.RIGHT_BRACE) {
        current++
        return {
          type: 'ObjectExpression',
          properties: [],
        }
      }
  
  
      if (token.type === TOKEN_TYPES.LEFT_BRACKET) {
        token = tokens[++current]  
  
        const node: {
          type: string
          elements?: Array<{ type?: string; value?: any }>
        } = {
          type: 'ArrayExpression',
          elements: [],
        }
  
  
        while (token.type !== TOKEN_TYPES.RIGHT_BRACKET) {
          node.elements?.push(walk())
          token = tokens[current]
  
  
          if (token.type === TOKEN_TYPES.COMMA) {
            token = tokens[++current]
          }
        }
  
  
        current++
        return node
      }
  
  
      if (token.type === TOKEN_TYPES.STRING) {
        current++
        return {
          type: 'StringLiteral',
          value: token.value,
        }
      }
  
  
      if (token.type === TOKEN_TYPES.NUMBER) {
        current++
        return {
          type: 'NumberLiteral',
          value: token.value,
        }
      }
  
  
      if (token.type === TOKEN_TYPES.TRUE) {
        current++
        return {
          type: 'BooleanLiteral',
          value: true,
        }
      }
  
  
      if (token.type === TOKEN_TYPES.FALSE) {
        current++
        return {
          type: 'BooleanLiteral',
          value: false,
        }
      }
  
  
      if (token.type === TOKEN_TYPES.NULL) {
        current++
        return {
          type: 'NullLiteral',
          value: null,
        }
      }
  
  
      throw new TypeError(token.type)
    }
  
  
    const ast : {type : string, body : Array<any>} = {
      type: 'Program',
      body: [],
    }
  
  
    while (current < tokens.length) {
      ast.body.push(walk());
    } 
  
    return ast;
}
  