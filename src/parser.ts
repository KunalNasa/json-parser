

export function parser(node: any): any {
    switch (node.type) {
      case 'Program':
        // Assuming single top-level element (object or array)
        return parser(node.body[0]);
  
      case 'ObjectExpression':
        const obj: Record<string, any> = {};
        for (const prop of node.properties) {
          const key = prop.key.value; // STRING type
          const value = parser(prop.value);
          obj[key] = value;
        }
        return obj;
  
      case 'ArrayExpression':
        return node.elements.map(parser);
  
      case 'StringLiteral':
      case 'NumberLiteral':
      case 'BooleanLiteral':
      case 'NullLiteral':
        return node.value;
  
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  }
  