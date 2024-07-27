const { src, dest } =require("gulp");
const sharpResponsive =require("gulp-sharp-responsive");

const img = () => {
  console.log('----')
  return src("origin/*.{jpg,png}")
  .pipe(sharpResponsive({
    formats: [32, 90, 180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 2048].map(width => {
      return {
        width: (metadata) => {
          return Math.min(metadata.width, width, 1080)
        },
        format: 'webp',
        rename: {suffix: `-${width}`}
      }
    })
    // formats: [
      // { 
      //   width: (metadata) => {
      //     return Math.floor(metadata.width * 0.3)
      //   },
      //   rename: { suffix: "-1x" }
      // },
      // { 
      //   width: (metadata) => {
      //     return Math.floor(metadata.width * 0.5)
      //   },
      //   rename: { suffix: "-2x" }
      // }, {
      //   rename: {suffix: '-3x'}
      // }
    // ]
  }))
  .pipe(dest("src/assets"))
};
exports.default = img;