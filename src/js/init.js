function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
var sw;
ready(() => {
  sw = new Swiper("#swiper", {
    pagination: {
      class: [
        "aspect-square",
        "w-3",
        "rounded-full",
        "border-2",
        "border-gray-600",
      ],
      activeClass: ["w-4", "border-white"],
    },
  });
  sw.autoPlay();
});
