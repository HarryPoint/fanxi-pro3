// 实现元素缓动
class ScrollShow {
  constructor(option, effectMap = {}) {
    this.option = {
      // 缓动时间
      duration: 1000,
      // 缓动函数
      easing: "ease",
      ...option,
    };

    // 保存动画类型映射
    this.effectMap = {
      // 默认动画类型
      slideUp: [
        {
          transform: `translateY(150px)`,
          opacity: 0,
        },
        {
          transform: `translateY(0px)`,
          opacity: 1,
        },
      ],
      slideDown: [
        {
          transform: `translateY(-150px)`,
          opacity: 0,
        },
        {
          transform: `translateY(0px)`,
          opacity: 1,
        },
      ],
      slideLeft: [
        {
          transform: `translateX(-150px)`,
          opacity: 0,
        },
        {
          transform: `translateX(0px)`,
          opacity: 1,
        },
      ],
      slideRight: [
        {
          transform: `translateX(150px)`,
          opacity: 0,
        },
        {
          transform: `translateX(0px)`,
          opacity: 1,
        },
      ],
      fadeIn: [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      blurIn: [
        {
          filter: "blur(50px)",
        },
        {
          filter: "blur(0px)",
        },
      ],
      ...effectMap,
    };

    // 保存元素与动画的映射
    this.animationMap = new WeakMap();
    // 元素与视口交集检测
    this.ob = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const animation = this.animationMap.get(entry.target);
          animation.play();
          this.ob.unobserve(entry.target);
        }
      }
    });
  }
  init(target = ".scrollShow") {
    const els = document.querySelectorAll(target);
    for (let el of els) {
      this.effectBind(el);
    }
    return this;
  }
  isBelowViewPort(el) {
    if (el.dataset.always) {
      // 如果设置总是显示，则不排除视口上方的元素
      return true;
    }
    return el.getBoundingClientRect().top > window.innerHeight;
  }
  // 应用效果
  effectBind(el) {
    // 排除已经绑定的元素
    if (this.animationMap.has(el)) {
      return;
    }
    // 排除视口上方的元素
    if (!this.isBelowViewPort(el)) {
      return;
    }
    const effectKey = el.dataset.effect ?? "slideUp";
    const animation = el.animate(this.effectMap[effectKey], {
      duration: this.option.duration,
      easing: this.option.easing,
    });
    animation.pause();
    this.animationMap.set(el, animation);
    this.ob.observe(el);
  }
}
