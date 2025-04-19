import { lexer } from "./lexer"
import { parser } from "./parser";


const input = '{"name":"Kunal","age":18}'

const tokens = lexer(input);

console.log(tokens);

const ast = parser(tokens);

console.log(ast.body[0].properties);