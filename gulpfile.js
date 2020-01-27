let gulp = require('gulp');
let jsValidate = require('gulp-jsvalidate');
let robocure = require('./robocure');
let fs = require('fs');

// transpile & bundle
let concat = require('gulp-concat');
let browserify = require('browserify');
let uglify = require('gulp-uglify');
let rimraf = require('rimraf');
let tsify = require('tsify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let rename = require('gulp-rename');

let copyTo = async (src, dst) => new Promise(res => gulp.src(src).pipe(gulp.dest(dst)).on("end", res));

function validate() 
{
    return gulp.src(`src/learning_modules/**/*/story_content/user.js`).pipe(jsValidate());
}

async function normalize() 
{
    rimraf.sync(".normalized");
    fs.mkdirSync(".normalized");
    await robocure.normalizeVideos(".normalized");
}

function cleanJs() {
    rimraf.sync("dist/robot");
    fs.mkdirSync("dist/robot");
    return Promise.resolve("done");
}

function cleanAll() {
    rimraf.sync("dist");
    fs.mkdirSync("dist");
    return Promise.resolve("done");
}

async function bundleVendor() 
{
    let files = [
        'src/robot/qimessaging.js', 
        'src/robot/annyang.js', 
        'src/robot/responsivevoice.js', 
        'src/robot/xapi_functions.js'
    ];

    // Bundle javascript files from src folder
    await gulp.src(files)
        .pipe(concat('vendor.js'))    
        .pipe(gulp.dest('dist/robot'))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/robot'));
}

function bundleRobocure() 
{
    // Bundle custom javascript
    return browserify("src/robot/robocure/api.ts",{debug: true})
        .on('error',console.error.bind(console))
        .plugin(tsify)
        .bundle()
        .pipe(source('robocure.js'))
        .pipe(buffer())
        .pipe(gulp.dest("dist/robot"))
        .pipe(rename('robocure.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest("dist/robot"));
}

async function assemble() 
{
    console.log(`Adding folders for modules (can be removed?)`) 
    await copyTo(`src/learning_modules/*`, `dist/storyline`);

    console.log(`Add web.config`);
    await copyTo(`src/web.config`, `dist`);
    
    console.log(`Build and add startpage with module selection`) 
    await robocure.buildHomepage();

    console.log(`Add storyline modules`) 
    await robocure.buildStorylineModules();

    console.log(`Building deploy package`);
    await robocure.buildDeployPackage();
}

exports.validate = validate;
exports.assemble = assemble;
exports.normalize = normalize;
exports.build = gulp.series(cleanJs, bundleVendor, bundleRobocure);
exports.assemble = assemble;
exports.default = gulp.series(validate, cleanAll, bundleVendor, bundleRobocure, assemble);
