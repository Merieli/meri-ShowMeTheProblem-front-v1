module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['**/tests/unit/**/*spec.ts', '**/tests/integration/**/*spec.ts', '**/tests/**/*test.ts'],
    resolver: undefined,
}
