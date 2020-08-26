module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageDirectory: "./coverage/",
    collectCoverage: true,
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
