const gulp = require("gulp")
const babel = require("gulp-babel")
const sass = require('gulp-sass')

let destination = "es5"

gulp.task("es6toes5", () => {
    return gulp.src("src/**/*.js")
    .pipe(babel({ presets: "es2015"}))
    .pipe(gulp.dest(destination))
})

gulp.task("sass", () => {
    return gulp.src("src/browser/assets/**/*.scss")
    .pipe(sass({
        includePaths: [
            'node_modules/bulma',
            'node_modules/font-awesome/scss',
            'node_modules/croppie'
        ]
      }).on('error', sass.logError))
    .pipe(gulp.dest(`${destination}/browser/assets/css`))
})

gulp.task("fonts", () => {
    return gulp.src("node_modules/font-awesome/fonts/*.*")
        .pipe(gulp.dest(`${destination}/browser/assets/fonts`))
})

gulp.task("htmls", () => {
    return gulp.src("src/browser/**/*.html")
        .pipe(gulp.dest(`${destination}/browser`))
})

gulp.task('dev', ["es6toes5", "sass", "fonts", "htmls"])

// () => {
//     gulp.watch("src/**/*.js", ["es6toes5"])
//     gulp.watch("src/browser/assets/**/*.scss", ['sass']);
// }