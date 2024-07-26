class Pagination {
  constructor(option) {
    this.template = `
        <div
            data-role="pagination"
            class="flex items-center justify-center gap-5 text-gray-500 text-xs"
        >
            <select data-role="pageSize" class="h-6 lg:h-8 border">
                <option value="10">10条/页</option>
                <option value="20">20条/页</option>
                <option value="30">30条/页</option>
            </select>
            <div class="flex gap-3 lg:gap-5">
            <button data-role="prevBtn" class="enabled:hover:text-red-400 disabled:text-gray-300 disabled:cursor-not-allowed">
                &lt;
            </button>
            <div data-role="pages" class="flex gap-3 lg:gap-5">
            </div>
            <button data-role="nextBtn" class="enabled:hover:text-red-400 disabled:text-gray-300 disabled:cursor-not-allowed">
                &gt;
            </button>
            </div>
            <div>
            前往
            <input
                data-role="pageInput"
                class="h-6 lg:h-8 w-11 border px-3"
                type="text"
            />
            页
            </div>
        </div>`;
    this.$root = document.createElement("div");
    this.$root.innerHTML = this.template;
    this.eventBind();
    this.pagination = {
      current: 1,
      pageSize: 10,
      total: 80,
      ...option,
    };
    // 事件触发映射
    this.invokingMap = new Map();
    this.paginationProxy = new Proxy(this.pagination, {
      get: (target, propKey, receiver) => {
        return Reflect.get(target, propKey, receiver);
      },
      set: (target, propKey, value, receiver) => {
        const updateFlag = target[propKey] !== value;
        const result = Reflect.set(target, propKey, value, receiver);
        if (updateFlag) {
          if (propKey === "current" || propKey === "total") {
            this.pagesRender();
          }
          if (propKey === "pageSize") {
            this.pageSizeRender();
          }
          // 触发事件
          this.invoking(propKey);
        }
        return result;
      },
    });
  }
  eventBind() {
    this.$pageSizeSelect = this.$root.querySelector("[data-role=pageSize]");
    this.$prevBtn = this.$root.querySelector("[data-role=prevBtn]");
    this.$nextBtn = this.$root.querySelector("[data-role=nextBtn]");
    this.$pageInput = this.$root.querySelector("[data-role=pageInput]");
    this.$pages = this.$root.querySelector("[data-role=pages]");
    this.$pageSizeSelect.addEventListener("change", (e) => {
      this.paginationProxy.pageSize = Number(e.target.value);
    });
    this.$prevBtn.addEventListener("click", () => {
      this.paginationProxy.current--;
    });
    this.$nextBtn.addEventListener("click", () => {
      this.paginationProxy.current++;
    });
    this.$pageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.paginationProxy.current = Number(e.target.value);
      }
    });
    this.$pages.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        this.paginationProxy.current = Number(e.target.dataset.value);
      }
    });
  }
  mount(target) {
    document.querySelector(target).append(this.$root);
    this.pageSizeRender();
    this.pagesRender();
  }
  pageSizeRender() {
    this.$pageSizeSelect.value = `${this.pagination.pageSize}`;
  }
  pagesRender() {
    const { current, total } = this.pagination;
    const pages = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, start + 4);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (start > 1) {
      pages.unshift(1, null);
    }
    if (end < total) {
      pages.push(null, total);
    }
    this.$pages.innerHTML = pages
      .map((page) => {
        if (page === null) {
          return `<button>...</button>`;
        }
        return `<button data-value="${page}" class="${current === page ? "text-red-600 " : ""}hover:text-red-400">${
          page
        }</button>`;
      })
      .join("");
    if (current === total) {
      this.$nextBtn.disabled = true;
    }
    if (current === 1) {
      this.$prevBtn.disabled = true;
    }
  }
  invoking(keyStr) {
    this.invokingMap.get(keyStr)?.forEach((fn) => fn(this.pagination));
  }
  addInvoking(keyStr, fn) {
    if (this.invokingMap.has(keyStr)) {
      this.invokingMap.get(keyStr).push(fn);
    } else {
      this.invokingMap.set(keyStr, [fn]);
    }
  }
  update(option) {
    Object.assign(this.paginationProxy, option);
  }
  onPageSizeChange(fn) {
    this.addInvoking("pageSize", fn);
  }
  onCurrentChange(fn) {
    this.addInvoking("current", fn);
  }
}
