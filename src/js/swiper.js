class Swiper {
  constructor(el, params) {
    this.el = el;

    this.params = params;

    this.params.pagination = {
      class: [],
      activeClass: [],
      ...this.params.pagination,
    };

    this.$el = document.querySelector(this.el);
    this.$wrapper = this.$el.querySelector(".swiper-wrapper");
    this.$slides = Array.from(
      this.$wrapper.querySelectorAll(".swiper-slide"),
    ).map((item) => {
      const slide = document.createElement("div");
      slide.classList.add(
        "swiper-slide-wrapper",
        "group",
        "w-full",
        "h-full",
        "absolute",
      );
      slide.append(item);
      return slide;
    });
    this.$slides.forEach(($slide) => {
      $slide.addEventListener("mouseenter", () => {
        this.stop();
      });
      $slide.addEventListener("mouseleave", () => {
        this.play();
      });
    });

    this.slidesCount = this.$slides.length;

    this.currentIndex = 0;

    // dom 构造
    this.$inner = document.createElement("div");
    this.$inner.classList.add(
      "swiper-wrapper-inner",
      "relative",
      "w-full",
      "h-full",
      "overflow-hidden",
    );
    this.$inner.append(...this.$slides);
    this.$wrapper.append(this.$inner);

    this.$pagination = this.$el.querySelector(".swiper-pagination");

    this.$dots = Array.from({ length: this.slidesCount }).map((_, index) => {
      const dot = document.createElement("div");
      dot.innerHTML = `<div class="inner"></div>`;
      dot.classList.add(...this.params.pagination.class, "spin");
      dot.style.cursor = "pointer";
      dot.addEventListener("click", () => {
        this.moveTo(index);
      });
      dot.addEventListener("animationend", () => {
        this.next();
      });
      return dot;
    });
    this.$pagination.append(...this.$dots);
    this.autoPlay();
  }
  slideSetOut(dom) {
    dom.classList.remove("active", "in");
    dom.classList.add("out");
  }
  slideSetIn(dom) {
    dom.classList.remove("out");
    dom.classList.add("in", "active");
  }
  dotSetOut(dot) {
    dot.classList.remove(...this.params.pagination.activeClass);
  }
  dotSetIn(dot) {
    dot.classList.add(...this.params.pagination.activeClass);
  }
  moveTo(nextIndex) {
    this.$dots.forEach((dot, index) => {
      if (index === nextIndex) {
        this.dotSetIn(dot);
      } else {
        this.dotSetOut(dot);
      }
    });
    this.slideSetOut(this.$slides[this.currentIndex]);
    this.slideSetIn(this.$slides[nextIndex]);
    this.currentIndex = nextIndex;
  }
  next() {
    if (this.currentIndex >= this.slidesCount - 1) {
      this.moveTo(0);
    } else {
      this.moveTo(this.currentIndex + 1);
    }
  }
  prev() {
    if (this.currentIndex === 0) {
      this.moveTo(this.slidesCount - 1);
    } else {
      this.moveTo(this.currentIndex - 1);
    }
  }
  autoPlay(tick = 5000) {
    this.$dots.forEach((itm) => {
      itm.style.animationDuration = `${tick}ms`;
    });
    this.moveTo(this.currentIndex);
  }
  stop() {
    this.$dots.forEach((itm) => {
      itm.classList.add("stop");
    });
  }
  play() {
    this.$dots.forEach((itm) => {
      itm.classList.remove("stop");
    });
  }
}
