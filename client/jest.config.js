module.exports = {
  "moduleFileExtensions": [
    "js",
    "json"
  ],
  "transform": {
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.js?$": "babel-jest"
  },
  "transformIgnorePatterns": [
    "<rootDir>/node_modules/(!ol)"
  ],
  "globals": {
    "NODE_ENV": "test"
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^handsontable": "handsontable"
  },
  "testURL": "http://localhost/",
  "verbose": true
};