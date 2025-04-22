import { constructAST } from "../constructAST";
import { TOKEN_TYPES } from "../grammar/token_types";
import { lexer } from "../lexer"
import { parser } from "../parser";

const input = '{"name":"kunal","age":18, "skills":["Python", "React", "Javascript"]}'
const lexerOutput = lexer(input);
const astOutput = constructAST(lexerOutput);
const parserOutput = parser(astOutput);
describe("Integration test for JSON parser", () => {
    it("test the lexer", () => {
        const validOutput = [
            {type : TOKEN_TYPES.LEFT_BRACE, value: undefined},
            {type: TOKEN_TYPES.STRING, value : 'name'},
            {type: TOKEN_TYPES.COLON, value : undefined},
            {type: TOKEN_TYPES.STRING, value : 'kunal'},
            {type: TOKEN_TYPES.COMMA, value : undefined},
            {type: TOKEN_TYPES.STRING, value : 'age'},
            {type: TOKEN_TYPES.COLON, value : undefined},
            {type: TOKEN_TYPES.NUMBER, value : 18},
            {type: TOKEN_TYPES.COMMA, value : undefined},
            {type: TOKEN_TYPES.STRING, value : 'skills'},
            {type: TOKEN_TYPES.COLON, value : undefined},
            {type : TOKEN_TYPES.LEFT_BRACKET, value: undefined},
            {type: TOKEN_TYPES.STRING, value : 'Python'},
            {type: TOKEN_TYPES.COMMA, value : undefined},
            {type: TOKEN_TYPES.STRING, value : 'React'},
            {type: TOKEN_TYPES.COMMA, value : undefined},
            {type: TOKEN_TYPES.STRING, value : 'Javascript'},
            {type: TOKEN_TYPES.RIGHT_BRACKET, value : undefined},
            {type: TOKEN_TYPES.RIGHT_BRACE, value : undefined},
        ]
        expect(lexerOutput).toEqual(validOutput);
    })
    it("Checks construct AST", () => {
        const validAST = {
            type: 'Program',
            body: [
              {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: { type: TOKEN_TYPES.STRING, value: 'name' },
                    value: { type: 'StringLiteral', value: 'kunal' },
                  },
                  {
                    type: 'Property',
                    key: { type: TOKEN_TYPES.STRING, value: 'age' },
                    value: { type: 'NumberLiteral', value: 18 },
                  },
                  {
                    type: 'Property',
                    key: { type: TOKEN_TYPES.STRING, value: 'skills' },
                    value: {
                      type: 'ArrayExpression',
                      elements: [
                        { type: 'StringLiteral', value: 'Python' },
                        { type: 'StringLiteral', value: 'React' },
                        { type: 'StringLiteral', value: 'Javascript' },
                      ],
                    },
                  },
                ],
              },
            ],
          };
          expect(astOutput).toEqual(validAST);          
    })
    it("Checks parser output", () => {
        const validParserOutput = {name: "kunal", age:18, skills: ["Python", "React", "Javascript"]}
        expect(parserOutput).toEqual(validParserOutput);
    })

})