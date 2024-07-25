const readyCallStack = [];

function readyCall() {
  readyCallStack.forEach((fn) => {
    fn();
  });
}

function readyInit() {
  if (document.readyState !== "loading") {
    readyCall();
  } else {
    document.addEventListener("DOMContentLoaded", readyCall);
  }
}

readyInit();

function ready(fn) {
  readyCallStack.push(fn);
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

const newsTemplate = `
    <a class="block" href="./detail.html?id={{id}}">
        <img
            class="scrollShow aspect-[2/3] w-full object-cover"
            data-effect="fadeIn"
            src="{{img}}"
            alt=""
        />
        <h6 class="scrollShow py-4 text-base lg:text-xl" data-effect="fadeIn">
        {{title}}
        </h6>
        <p class="scrollShow pb-6 text-sm leading-6" data-effect="fadeIn">{{content}}</p>
    </a>
    `;

class Api {
  constructor(baseURL = "https://apifoxmock.com/m1/4090542-3728567-default") {
    this.axios = axios.create({
      baseURL,
    });
  }
  async getNews({ pageSize, page }) {
    return this.axios({
      url: "/news",
      params: {
        pageSize,
        page,
      },
    });
  }
}
