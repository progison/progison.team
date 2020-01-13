const realFavicon = require("gulp-real-favicon");
const fs = require("fs");
const gulp = require("gulp");

// File where the favicon markups are stored
const FAVICON_DATA_FILE = "faviconData.json";
const themeColor = "#667799";
const masterPicture = "res/img/pt_inv_logo_padding.svg";
const silhouettePicture = "res/img/pt_white_logo.svg";

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
function generateFavicon(done) {
    realFavicon.generateFavicon(
        {
            masterPicture: "res/img/pt_inv_logo_padding.svg",
            dest: "./",
            iconsPath: "/",
            design: {
                ios: {
                    pictureAspect: "noChange",
                    assets: {
                        ios6AndPriorIcons: true,
                        ios7AndLaterIcons: true,
                        precomposedIcons: true,
                        declareOnlyDefaultIcon: true
                    }
                },
                desktopBrowser: {},
                windows: {
                    masterPicture: silhouettePicture,
                    pictureAspect: "noChange",
                    backgroundColor: themeColor,
                    onConflict: "override",
                    assets: {
                        windows80Ie10Tile: true,
                        windows10Ie11EdgeTiles: {
                            small: true,
                            medium: true,
                            big: true,
                            rectangle: true
                        }
                    }
                },
                androidChrome: {
                    pictureAspect: "noChange",
                    themeColor: themeColor,
                    manifest: {
                        name: "Progison Team",
                        display: "browser",
                        orientation: "notSet",
                        onConflict: "override",
                        declared: true
                    },
                    assets: {
                        legacyIcon: true,
                        lowResolutionIcons: true
                    }
                },
                safariPinnedTab: {
                    masterPicture: silhouettePicture,
                    pictureAspect: "silhouette",
                    themeColor: themeColor
                }
            },
            settings: {
                scalingAlgorithm: "Mitchell",
                errorOnImageTooSmall: false,
                readmeFile: false,
                htmlCodeFile: false,
                usePathAsIs: false
            },
            versioning: {
                paramName: "v",
                paramValue: "QEGR8p5LrY"
            },
            markupFile: FAVICON_DATA_FILE
        },
        function() {
            done();
        }
    );
}

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
function injectFaviconMarkups() {
    return gulp
        .src("src/*.html")
        .pipe(
            realFavicon.injectFaviconMarkups(
                JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code
            )
        )
        .pipe(gulp.dest("./"));
}

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
function checkForFaviconUpdate(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
}

exports.generateFavicon = generateFavicon;
exports.injectFaviconMarkups = injectFaviconMarkups;
exports.checkForFaviconUpdate = checkForFaviconUpdate;
