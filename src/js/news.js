const api = new Api();

function renderData(data) {
  const eNewsList = document.querySelector("#newsList");
  eNewsList.classList.remove('loading');
  const result = data.map((news) => {
    return newsTemplate
      .replace("{{id}}", news.id)
      .replace("{{thumb}}", news.thumb)
      .replace("{{title}}", news.title)
      .replace("{{summary}}", news.summary);
  });
  eNewsList.innerHTML = result.join("");
}

function renderPagination(links) {
  console.log("links: ", links);
}

async function initNewsList(callBack) {
  const paginationIns = new Pagination();
  paginationIns.mount("#pagination-wrapper");
  paginationIns.onCurrentChange(({ current }) => {
    updateQueryParam("page", current);
    update();
  });
  paginationIns.onPageSizeChange(({ pageSize }) => {
    updateQueryParam("pageSize", pageSize);
    update();
  });
  async function update({ page, pageSize } = {}) {
    page = page || getQueryParam("page") || 1;
    pageSize = pageSize || getQueryParam("pageSize") || 20;
    document.querySelector("#newsList").classList.add('loading');
    const {
      data: { data, links },
    } = await api.getNews({
      page,
      pageSize,
    });
    renderData(data);
    callBack();
    paginationIns.update({
      current: links.current,
      pageSize: links.pageSize,
      total: links.total,
    });
  }
  await update();
}

ready(async () => {
  initMobileMenu();
  const scrollShow = new ScrollShow();
  scrollShow.init(".scrollShow");
  initNewsList(() => {
    scrollShow.init(".scrollShow");
  });
});
