import Fs from 'fs/promises';
import Path from 'node:path';
import Stream from 'stream';
import Vinyl from 'vinyl';

import Gulp from 'gulp';
import GulpCleanCss from 'gulp-clean-css';
import GulpHtmlmin from 'gulp-htmlmin';
import gulpRename from 'gulp-rename';
import gulpReplace from 'gulp-replace';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpTerser from 'gulp-terser';

const DEST = './dist';
const CDN_URL_PREFIX = 'https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/web-component-boilerplate';

const tagFlagIndex = process.argv.indexOf('--tag');
const tagFlagValue = tagFlagIndex === -1 ? false : process.argv[tagFlagIndex + 1];
const destValue = `${!tagFlagValue ? '' : `${CDN_URL_PREFIX}@${tagFlagValue}`}/${Path.join(DEST)}`;

function stringSrc(filename, string) {
  const src = Stream.Readable({ objectMode: true });
  src._read = function () {
    this.push(new Vinyl({
      cwd: '',
      base: '.',
      path: filename,
      contents: Buffer.from(string, 'utf-8')
    }));
    this.push(null);
  };
  return src;
}

function buildSrcCss() {
	return Gulp.src(['./src/**/*.css'])
		.pipe(gulpReplace('{{DEST}}', destValue))
		.pipe(gulpReplace('{{INFIX}}', ''))
		.pipe(Gulp.dest(DEST));
}

function buildSrcCssMin() {
	return Gulp.src(['./src/**/*.css'])
		.pipe(gulpRename((path) => {
			path.basename = path.basename + '.min';
		}))
		.pipe(gulpReplace('{{DEST}}', destValue))
		.pipe(gulpReplace('{{INFIX}}', '.min'))
		.pipe(gulpSourcemaps.init())
		.pipe(GulpCleanCss())
		.pipe(gulpSourcemaps.write('.'))
		.pipe(Gulp.dest(DEST));
}

function buildSrcHtml() {
	return Gulp.src(['./src/**/*.html'])
		.pipe(gulpReplace('{{DEST}}', destValue))
		.pipe(gulpReplace('{{INFIX}}', ''))
		.pipe(Gulp.dest(DEST));
}

function buildSrcHtmlMin() {
	return Gulp.src(['./src/**/*.html'])
		.pipe(gulpRename((path) => {
			path.basename = path.basename + '.min';
		}))
		.pipe(gulpReplace('{{DEST}}', destValue))
		.pipe(gulpReplace('{{INFIX}}', '.min'))
		.pipe(GulpHtmlmin({ collapseWhitespace: true }))
		.pipe(Gulp.dest(DEST));
}

function buildSrcJs() {
	return Gulp.src(['./src/**/*.js'])
		.pipe(gulpReplace('{{DEST}}', destValue))
		.pipe(gulpReplace('{{INFIX}}', ''))
		.pipe(Gulp.dest(DEST));
}

function buildSrcJsMin() {
	return Gulp.src(['./src/**/*.js'])
		.pipe(gulpRename((path) => {
			path.basename = path.basename + '.min';
		}))
		.pipe(gulpReplace('{{DEST}}', destValue))
		.pipe(gulpReplace('{{INFIX}}', '.min'))
		.pipe(gulpSourcemaps.init())
		.pipe(gulpTerser())
		.pipe(gulpSourcemaps.write('.'))
		.pipe(Gulp.dest(DEST));
}

function buildOther() {
	return Gulp.src([
		'./src/**/*',
		'!./src/**/*.css',
		'!./src/**/*.html',
		'!./src/**/*.js'
	])
		.pipe(Gulp.dest('./dist'));
}

function buildCdnFilesMd() {
	function getFiles(path = '.') {
		return Fs.readdir(Path.join(DEST, path)).then((files) => {
			let promise = Promise.resolve([]);
			const length = files.length;
			for (let index = 0; index < length; index++) {
				const file = files[index];
				promise = promise.then((list) => {
					return Fs.lstat(Path.join(DEST, path, file)).then((stat) => {
						if (stat.isDirectory()) {
							return getFiles(Path.join(path, file)).then((resultList) => {
								list.push(...resultList);
								return list;
							});
						}
						list.push(`${destValue}/${Path.join(path, file)}`);
						return list;
					});
				});
			}
			return promise;
		});
	}

	return getFiles().then((list) => {
		const content = [
			'# CDN Files\n\n',
			list.map((item) => `- ${item}`).join('\n')
		].join('');
		return stringSrc('CDN-FILES.md', content).pipe(Gulp.dest(DEST));
	});
}

export default Gulp.series(
	Gulp.parallel(
		buildSrcCss,
		buildSrcCssMin,
		buildSrcHtml,
		buildSrcHtmlMin,
		buildSrcJs,
		buildSrcJsMin,
		buildOther
	),
	buildCdnFilesMd
);
