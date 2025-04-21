/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', // Recommended shorthand instead of setting transform manually
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // supports .test.ts(x) and .spec.ts(x)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
  // Optional if you're using path aliases (like @/components)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
