

export function parser(ast: any): any {
    switch (ast.type) {
      case 'Program':
        return parser(ast.body[0]);
  
      case 'ObjectExpression':
        const obj: Record<string, any> = {};
        for (const prop of ast.properties) {
          const key = prop.key.value; 
          const value = parser(prop.value);
          obj[key] = value;
        }
        return obj;
  
      case 'ArrayExpression':
        return ast.elements.map(parser);
  
      case 'StringLiteral':
      case 'NumberLiteral':
      case 'BooleanLiteral':
      case 'NullLiteral':
        return ast.value;
  
      default:
        throw new Error(`Unknown node type: ${ast.type}`);
    }
  }
  