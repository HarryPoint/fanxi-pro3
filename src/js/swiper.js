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
    this.width = this.$wrapper.clientWidth;
    this.$slides = Array.from(this.$wrapper.querySelectorAll(".swiper-slide"));
    this.$slides.forEach(($slide) => {
      $slide.style.width = `${this.width}px`;
      $slide.addEventListener("mouseenter", () => {
        this.stop();
      });
      $slide.addEventListener("mouseleave", () => {
        if (this.autoPlayFlag) {
          this.autoPlay();
        }
      });
    });

    this.slidesCount = this.$slides.length;

    this.currentIndex = 0;

    // dom 构造
    this.$inner = document.createElement("div");
    this.$inner.classList.add("swiper-wrapper-inner");
    this.$inner.style.width = `${this.width * this.slidesCount}px`;
    this.$inner.append(...this.$slides);
    this.$fakePreSlide = this.$slides[this.slidesCount - 1].cloneNode(true);
    this.$fakePreSlide.style = `position: absolute; width: ${this.width}px; height: 100%; left: -${this.width}px; top: 0`;
    this.$fakeEndSlide = this.$slides[0].cloneNode(true);
    this.$fakeEndSlide.style = `position: absolute; width: ${this.width}px; height: 100%; left: ${this.width * this.slidesCount}px; top: 0`;
    this.$inner.prepend(this.$fakePreSlide);
    this.$inner.append(this.$fakeEndSlide);
    this.$wrapper.append(this.$inner);

    this.$pagination = this.$el.querySelector(".swiper-pagination");

    this.$dots = Array.from({ length: this.slidesCount }).map((_, index) => {
      const dot = document.createElement("div");
      dot.addEventListener("click", () => {
        this.moveTo(index);
      });
      return dot;
    });
    this.$pagination.append(...this.$dots);

    this.moveTo(this.currentIndex);
  }
  moveTo(nextIndex) {
    this.$inner.style.transform = `translateX(-${this.width * nextIndex}px)`;
    this.$inner.style.transition = "0.5s";
    this.$dots.forEach((dot, index) => {
      dot.classList.add(...this.params.pagination.class);
      if (index === nextIndex) {
        dot.classList.add(...this.params.pagination.activeClass);
      } else {
        dot.classList.remove(...this.params.pagination.activeClass);
      }
    });
    this.currentIndex = nextIndex;
  }
  next() {
    if (this.currentIndex >= this.slidesCount - 1) {
      // 重置位置
      this.$inner.style.transition = "none";
      this.$inner.style.transform = `translateX(${this.width}px)`;
      // 触发渲染
      this.$inner.clientHeight;
      this.moveTo(0);
    } else {
      this.moveTo(this.currentIndex + 1);
    }
  }
  prev() {
    if (this.currentIndex === 0) {
      // 重置位置
      this.$inner.style.transition = "none";
      this.$inner.style.transform = `translateX(-${this.width * this.slidesCount}px)`;
      // 触发渲染
      this.$inner.clientHeight;
      this.moveTo(this.slidesCount - 1);
    } else {
      this.moveTo(this.currentIndex - 1);
    }
  }
  autoPlay(tick = 5000) {
    this.autoPlayFlag = true;
    this.timer = setInterval(() => {
      this.next();
    }, tick);
    return () => {
      this.stop();
      this.autoPlayFlag = false;
    };
  }
  stop() {
    clearInterval(this.timer);
  }
}
