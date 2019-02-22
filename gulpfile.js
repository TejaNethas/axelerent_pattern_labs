/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library.
******************************************************/
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));

/******************************************************
 * PATTERN LAB  NODE WRAPPER TASKS with core library
******************************************************/
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/patternlab-node')(config);

function build() {
  return patternlab.build({
    watch: argv.watch,
    cleanPublic: config.cleanPublic
  }).then(() =>{
    // do something else when this promise resolves
  });
}

function serve() {
  return patternlab.serve({
    cleanPublic: config.cleanPublic
  }
).then(() => {
  // do something else when this promise resolves
  });
}

/******************************************************
 * SERVER AND WATCH TASKS
******************************************************/
// watch task utility functions
function getSupportedTemplateExtensions() {
  var engines = require('./node_modules/patternlab-node/core/lib/pattern_engines');
  return engines.getSupportedFileExtensions();
}
function getTemplateWatches() {
  return getSupportedTemplateExtensions().map(function (dotExtension) {
    return resolvePath(paths().source.patterns) + '/**/*' + dotExtension;
  });
}

function reload() {
  browserSync.reload();
}

function reloadCSS() {
  browserSync.reload('*.css');
}

function watch() {
  gulp.watch(resolvePath(paths().source.css) + '/**/*.css', { awaitWriteFinish: true }).on('change', gulp.series('pl-copy:css', reloadCSS));
  gulp.watch(resolvePath(paths().source.styleguide) + '/**/*.*', { awaitWriteFinish: true }).on('change', gulp.series('pl-copy:styleguide', 'pl-copy:styleguide-css', reloadCSS));

  var patternWatches = [
    resolvePath(paths().source.patterns) + '/**/*.json',
    resolvePath(paths().source.patterns) + '/**/*.md',
    resolvePath(paths().source.data) + '/*.json',
    resolvePath(paths().source.fonts) + '/*',
    resolvePath(paths().source.images) + '/*',
    resolvePath(paths().source.meta) + '/*',
    resolvePath(paths().source.annotations) + '/*'
  ].concat(getTemplateWatches());

  console.log(patternWatches);

  gulp.watch(patternWatches, { awaitWriteFinish: true }).on('change', gulp.series(build, reload));
}

gulp.task('patternlab:version', function () {
  patternlab.version();
});

gulp.task('patternlab:help', function () {
  patternlab.help();
});

gulp.task('patternlab:patternsonly', function () {
  patternlab.patternsonly(config.cleanPublic);
});

gulp.task('patternlab:liststarterkits', function () {
  patternlab.liststarterkits();
});

gulp.task('patternlab:loadstarterkit', function () {
  patternlab.loadstarterkit(argv.kit, argv.clean);
});

gulp.task('patternlab:build', function () {
  build().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:serve', function () {
  serve().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:installplugin', function () {
  patternlab.installplugin(argv.plugin);
});

gulp.task('default', ['patternlab:help']);

