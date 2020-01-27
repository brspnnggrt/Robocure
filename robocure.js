let fs = require('fs');
let path = require('path');
let gulp = require('gulp');
let rename = require('gulp-rename');
let cheerio = require('gulp-cheerio');
let replace = require('gulp-replace');
let normalize = require('ffmpeg-normalize');

/* Utils */
let getFolders = dir => fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
let getFilesRecursive = function(dir, test) {
    var results = [];
    fs.readdirSync(dir).forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(getFilesRecursive(file, test));
        else {
            if (test == null) results.push(file);
            else if (test(file)) results.push(file);
        }
    });
    return results;
}

async function buildHomepage() 
{
    let pepperIp = process.env.npm_package_config_ip;
    let speechToTextIp = process.env.npm_package_config_speechserverip;

    let homepage = gulp.src(`src/index.html`);
    let homepageWithScripts = homepage.pipe(cheerio({
        run: $ => {
            let modules = ``;
            for (let folder of getFolders(`src/learning_modules`)) 
            {
                modules += `
                    <li>
                        <button onclick="redirect('${folder}');">
                            ${folder}
                        </button>
                    </li>
                `;
            }
            $(modules).appendTo(`.navbar`);
        }
    }));

    let taskHomePage = homepageWithScripts.
        pipe(replace('{{pepperIp}}', pepperIp)).
        pipe(replace('{{speechToTextIp}}', speechToTextIp)).
        pipe(gulp.dest(`dist`));   

    await new Promise(res => taskHomePage.on("end", res));
}

async function buildStorylineModules() 
{
    for (let folder of getFolders("src/learning_modules")) 
    {
        // Move all storyline content to dist
        let content = gulp.src([`src/learning_modules/${folder}/* - Storyline output/**/*`]);
        content = content.pipe(rename(f => f.dirname = f.dirname.replace(/.* - Storyline output\\*/, '')));
        taskStorylineContent = content.pipe(gulp.dest(`dist/storyline/${folder}`));
        await new Promise(resolve => taskStorylineContent.on("end", () => 
        {
            console.log(`Add storyline modules - finished module ${folder}`);  
            resolve();
        }));

        // Fix homepage of module in dist
        let homepage = gulp.src(`dist/storyline/${folder}/story_html5.html`, {base: "./"});
        let homepageWithScripts = homepage.pipe(cheerio({
            run: $ => 
            {
                $(`<script src="../../robot/vendor.min.js"></script>`).appendTo('head');
                $(`<script src="../../robot/robocure.min.js"></script>`).appendTo('body');
            }
        }));
        await new Promise(resolve => homepageWithScripts.pipe(gulp.dest(`./`)).on(`end`, () => 
        {
            console.log(`Add storyline modules - finished configuring homepage for ${folder}`);
            resolve();
        }));

        // Fix app.min.js of module in dist (make sure play button is skipped)
        let appJs = gulp.src(`dist/storyline/${folder}/html5/lib/scripts/app.min.js`, {base: "./"});
        let appJsWithoutPlayButton = appJs.pipe(replace(
            'MobileStartOverlay:function(){var i=e("polyfills/detection");',
            'MobileStartOverlay:function(){var i=e("polyfills/detection");setTimeout(this.onStart, 1);'
        ));
        await new Promise(resolve => appJsWithoutPlayButton.pipe(gulp.dest(`./`)).on(`end`, () => 
        {
            console.log(`Add storyline modules - finished configuring app.min.js for ${folder}`);
            resolve();
        }));
    }
}

async function buildDeployPackage() 
{   
    console.log("pepper version: generating source files for package")
    let pepperPackage = gulp.src(`src/package/pepper.pml`);
    let pepperPackageWithFiles = pepperPackage.pipe(cheerio({
        run: $ => {
            let files = [];
            for (let file of getFilesRecursive(`dist`)) 
            {
                splitPath = file.split(["/"])
                fileName = splitPath[splitPath.length - 1]
                fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."));
                relativePath = file.split("dist")[1].substring(1)
                files.push(`<File name="${fileNameWithoutExtension}" src="${relativePath} " />
                `);
            }
            for (let file of files)
            {
                $(file).appendTo(`Package Resources`);
            }
        }, 
        parserOptions: 
        {
            xmlMode: true
        }
    }));
    let taskPepperPackageFiles = pepperPackageWithFiles.pipe(gulp.dest(`dist`));   
    await new Promise(res => taskPepperPackageFiles.on("end", res));

    console.log("pepper version: copy manifest for package")
    let taskPepperManifest = gulp.src(`src/package/manifest.xml`).pipe(gulp.dest(`dist`));   
    await new Promise(res => taskPepperManifest.on("end", res));

    console.log("moving behaviors to pepper");
    for (let folder of getFolders(`src/package`))
    {
        let taskPepperManifest = gulp.src(`src/package/${folder}/**/*`).pipe(gulp.dest(`dist/${folder}`));   
        await new Promise(res => taskPepperManifest.on("end", res));
    }
}

async function normalizeVideos(root) {
    for (let audiofile of getFilesRecursive(`src`, file => file.endsWith(`.mp4`)))
    {
        let pathrelative = path.dirname(audiofile);
        let filename = path.basename(audiofile);
        console.log(`processing video: ${filename}`);

        await new Promise(res => normalize({
            input: `"${audiofile}"`,
            output: `${root}/${filename}`,
            loudness: {
                normalization: 'ebuR128',
                target: 
                {
                    input_i: -5,
                    input_lra: 7.0,
                    input_tp: 0.0
                }
            }
        }).then(async () => {
            let audiofileMoveAction = gulp.src(`${root}/${filename}`).pipe(gulp.dest(pathrelative, { overwrite: true }));   
            await new Promise(res => audiofileMoveAction.on("end", res));
            res();
        }).catch(async (err) => {
            console.log(err);
            res();
        }));
    }
}

exports.buildHomepage = buildHomepage;
exports.buildStorylineModules = buildStorylineModules;
exports.buildDeployPackage = buildDeployPackage;
exports.normalizeVideos = normalizeVideos;
