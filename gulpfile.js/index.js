const {
    generateFavicon,
    injectFaviconMarkups,
    checkForFaviconUpdate
} = require("./generate-favicon");

function defaultTask(cb) {
    cb();
}

exports.default = defaultTask;
exports.generateFavicon = generateFavicon;
exports.injectFaviconMarkups = injectFaviconMarkups;
exports.checkForFaviconUpdate = checkForFaviconUpdate;
