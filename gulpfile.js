var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

var paths = {
  jsSrc: 'src/*.js',
  baseDest: 'dist/'
};

gulp.task('clean-dist', function() {
  return gulp.src(paths.baseDest, {read: false})
    .pipe(plugins.clean());
});

gulp.task('lint', function() {
  var eslintRules = {
    quotes: [1, 'single', 'avoid-escape'],
    'consistent-this': [0, 'self'],
    'brace-style': ['2', '1tbs'],
    'space-infix-ops': 1,
    'space-after-keywords': 1,
    'func-style': [1, 'expression'],
    'guard-for-in': 1,
    'no-else-return': 1,
    'no-with': 2,
    'radix': 2,
    'wrap-iife': [1, 'outside'],
    'no-nested-ternary': 2,
    'space-in-brackets': [1, 'never'],
    'space-unary-word-ops': 1,
    'no-plusplus': 1,
    'no-native-reassign': 0
  };

  return gulp.src(paths.jsSrc)
    .pipe(plugins.cached('lint'))
    .pipe(plugins.eslint(
      {
        rules: eslintRules,
        env: {
          browser: true
        }
      }
    ))
    .pipe(plugins.eslint.format());
});

var minify = function (src) {
  return src
    .pipe(plugins.cached('minify'))
    .pipe(plugins.uglifyjs('itsalways.min.js', {output: {comments: /^!\n/}}))
    .pipe(gulp.dest(paths.baseDest));
};

gulp.task('minify', ['clean-dist', 'lint'], function() {
  return minify(gulp.src(paths.jsSrc));
});

gulp.task('gz', ['clean-dist', 'lint'], function() {
  return minify(gulp.src(paths.jsSrc))
    .pipe(plugins.cached('gz'))
    .pipe(plugins.gzip())
    .pipe(gulp.dest(paths.baseDest));
});

gulp.task('watch', function() {
  var watcher = gulp.watch([paths.jsSrc], ['lint']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ['minify']);
