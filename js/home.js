const api = new Api();
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
      .replace("{{img}}", news.img)
      .replace("{{title}}", news.title)
      .replace("{{content}}", news.content);
  });
  eNewsList.innerHTML = result.join("");
}

ready(() => {
  initSwiper();
  initMobileMenu();
  initNews();
});
