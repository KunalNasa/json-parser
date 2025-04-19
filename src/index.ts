import { lexer } from "./lexer"
import { constructAST } from "./constructAST";
import { parser } from "./parser";


const input = '{"name":"Kunal","age":18,"address":{"city":"Mumbai","zip":400001},"hobbies":["reading","coding"],"isStudent":false,"scores":{"math":95,"science":90}}'

const tokens = lexer(input);

console.log(tokens);

const ast = constructAST(tokens);
const result = parser(ast);

console.log(ast.body[0].properties);
console.log(result);
