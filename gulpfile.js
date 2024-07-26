const { src, dest } =require("gulp");
const sharpResponsive =require("gulp-sharp-responsive");

const img = () => {
  console.log('----')
  return src("origin/*.{jpg,png}")
  .pipe(sharpResponsive({
    formats: [
      { 
        width: (metadata) => {
          return Math.floor(metadata.width * 0.5)
        },
        rename: { suffix: "-2x" }
      }, {
        rename: {suffix: '-1x'}
      }
    ]
  }))
  .pipe(dest("src/assets"))
};
exports.default = img;