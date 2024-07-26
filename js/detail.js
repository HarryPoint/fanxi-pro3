ready(async () => {
  const api = new Api();
  const {
    data: { data },
  } = await api.getNewsDetail({
    id: getQueryParam("id"),
  });
  const { title, img, content, date } = data;
  document.getElementById("detail").innerHTML = `
    <div>
        <div class="overflow-hidden">
            <img
                class="srcollShow w-full aspect-video object-cover"
                data-always="true"
                src="${img}"
            />
        </div>
        <div class="py-5">
            <h2 class="text-center text-2xl">${title}</h2>
            <h6 class="text-center text-gray-400 mt-2">${date}</h6>
            <div class="mt-5 indent-8 text-gray-500">${content}</div>
        </div>
    </div>
      `;
});
