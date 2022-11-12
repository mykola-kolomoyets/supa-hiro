const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = {
  moduleNameMapper: {
    "^@supabase-api": "<rootDir>/supabase/index",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@api/(.*)$": "<rootDir>/api/$1",
    "^@utils/(.*)$": "<rootDir>/utils/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  // collectCoverage: true,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  // coverageProvider: "v8",
  // collectCoverageFrom: [
  //   "**/*.{js,jsx,ts,tsx}",
  //   "!**/*.d.ts",
  //   "!**/node_modules/**",
  //   "!<rootDir>/out/**",
  //   "!<rootDir>/.next/**",
  //   "!<rootDir>/*.config.js",
  //   "!<rootDir>/coverage/**",
  // ],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  ...createJestConfig(customJestConfig),
};

// "@supabase-api": ["supabase/index"],
//       "@components/*": ["components/*"],
//       "@api/*": ["api/*"],
//       "@utils/*": ["utils/*"]
