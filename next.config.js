// custom sass support without module.scss
const withSass = require("@zeit/next-sass");
module.exports = withSass({
    sassLoaderOptions: {},
});
