const api = new Api();

function renderData(data) {
  const eNewsList = document.querySelector("#newsList");
  const result = data.map((news) => {
    return newsTemplate
      .replace("{{id}}", news.id)
      .replace("{{img}}", news.img)
      .replace("{{title}}", news.title)
      .replace("{{content}}", news.content);
  });
  eNewsList.innerHTML = result.join("");
}

function renderPagination(links) {
  console.log("links: ", links);
}

async function initNewsList() {
  const {
    data: { data, links },
  } = await api.getNews({
    page: 1,
    pageSize: 20,
  });
  renderData(data);
  renderPagination(links);
  console.log("links: ", links);
}

ready(() => {
  initMobileMenu();
  initNewsList();
});
