const api = new Api();

var sw;
function initSwiper() {
  sw = new Swiper("#swiper", {
    pagination: {
      class: ["aspect-square", "w-3", "rounded-full"],
      activeClass: ["w-4", "border-white", "active"],
    },
  });
}

async function initNews() {
  const eNewsList = document.querySelector("#newsList");
  const {
    data: { data },
  } = await api.getNews({
    page: 1,
    pageSize: 20,
  });
  const result = data.map((news) => {
    return newsTemplate
      .replace("{{id}}", news.id)
      .replace("{{thumb}}", news.thumb)
      .replace("{{title}}", news.title)
      .replace("{{summary}}", news.summary);
  });
  eNewsList.innerHTML = result.join("");
}

ready(async () => {
  initSwiper();
  initMobileMenu();
  await initNews();
  // 防止数据加载导致动画失效
  const scrollShow = new ScrollShow();
  scrollShow.init(".scrollShow");
});
