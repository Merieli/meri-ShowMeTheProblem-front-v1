module.exports = {
    // preset: 'ts-jest',
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
        '**/tests/unit/**/?(*.)+(unit.spec|unit.test).[t]s?(x)',
        '**/tests/integration/**/?(*.)+(spec|test).[t]s?(x)',
    ],
    resolver: undefined,
    testEnvironment: 'jsdom',
};
