module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
        '**/tests/unit/**/?(*.)+(unit.spec|unit.test).[jt]s?(x)',
        '**/tests/integration/**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    resolver: undefined,
    testEnvironment: 'jsdom',
};
