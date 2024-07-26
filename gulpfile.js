var gulp = require("gulp");
var responsive = require("gulp-responsive");
gulp.task("default", function () {
  return gulp
    .src("origin/*.{png, jpg}")
    .pipe(
      responsive(
        {
          "*": [
            {
              width: 90,
              quality: 50,
              rename: {
                suffix: "-90",
              },
            },
            {
              width: 180,
              quality: 75,
              rename: {
                suffix: "-180",
              },
            },
            {
              width: 360,
              rename: {
                suffix: "-360",
              },
            },
            {
              rename: {
                suffix: "-original",
              },
            },
          ],
        },
        {
          errorOnEnlargement: false,
          skipOnEnlargement: true,
          withoutEnlargement: true,
        },
      ),
    )
    .pipe(gulp.dest("dist/images"));
});
