function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

var sw;
function initSwiper() {
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
}

function initMobileMenu() {
  const handleBar = document.querySelector("#mobileHandleBar");
  const mobileMenu = document.querySelector("#mobileMenu");
  const mobileMenuClose = document.querySelector("#mobileMenuClose");
  const mobileMenuContent = document.querySelector("#mobileMenuContent");
  const body = document.body;
  handleBar.addEventListener("click", () => {
    mobileMenu.classList.toggle("h-screen");
    mobileMenu.classList.add("in");
    body.classList.add("overflow-hidden");
    mobileMenuContent.addEventListener(
      "animationend",
      () => {
        mobileMenu.classList.remove("in");
      },
      { once: true },
    );
  });
  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.add("out");
    mobileMenuContent.addEventListener(
      "animationend",
      () => {
        mobileMenu.classList.toggle("h-screen");
        mobileMenu.classList.remove("out");
        body.classList.remove("overflow-hidden");
      },
      { once: true },
    );
  });
}
ready(() => {
  initSwiper();
  initMobileMenu();
});