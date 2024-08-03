class TodoView {
  _parentEl = document.querySelector(".lists");
  _form = document.querySelector(".form");
  _itemNumbers = document.querySelector(".items-number");
  _scrollContainer = document.querySelector(".scroll");
  _activeBtn = document.querySelector(".active");
  _allBtn = document.querySelector(".all");
  _completedBtn = document.querySelector(".completed");
  _clearBtn = document.querySelector(".clear");
  _modeToggle = document.querySelector(".mode-toggle");

  _renderData(data) {
    document.querySelector(".todo-type").value = "";
    this._parentEl.innerHTML = "";
    //prettier-ignore
    this._parentEl.insertAdjacentHTML('beforeend', this._generateMarkup(data));
    // hide actions if there is no data
    this._hideAction(data);
  }

  _generateMarkup(data) {
    return data
      .map((d) => {
        return `
    <li class="todo-list ${d.completed ? "cross" : ""}" data-num="${
          d.num
        }" draggable=${true}>
          <div class="check-box">
            <svg class="icon-check" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
          </div>
          <p class="todo-text"><span class="line">${d.value}</span></p>
          <div class="icon-cross">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
              <path
                fill="#494C6B"
                fill-rule="evenodd"
                d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
              />
            </svg>
          </div>
        </li>
  `;
      })
      .join("");
  }
  _hideAction(data) {
    if (data.length === 0) {
      document.querySelector(".actions").classList.add("hidden");
    } else {
      document.querySelector(".actions").classList.remove("hidden");
    }
  }
  _showAction() {
    document.querySelector(".actions").classList.remove("hidden");
  }
  _renderItemNumbers(data) {
    this._itemNumbers.textContent = data.length;
  }

  _checkTodo(e) {
    const checkBox = e.target.closest(".check-box");
    if (!checkBox) return;

    //// implemnt checkbox
    const iconCheck = checkBox.querySelector(".icon-check");
    iconCheck.closest(".todo-list").classList.toggle("cross");
    const element = checkBox.closest(".todo-list");
    return element;
  }

  _deleteTodo(e) {
    const crossBtn = e.target.closest(".icon-cross");
    const element = crossBtn.closest(".todo-list");
    return element;
  }

  _changeMode(mode) {
    if (mode === "light") {
      //// moon and sun icons changing
      document.querySelector(".mode__light").classList.remove("hidden");
      document.querySelector(".mode__dark").classList.add("hidden");
      //// changing background
      document.querySelector(".main").classList.remove("main__dark");
      document.querySelector(".main").classList.add("main__light");
      //// changing form color
      this._form.classList.remove("dark");
      this._form.classList.add("light");
      //// changing drag and drop color
      document.querySelector(".drag-drop").classList.remove("dark");
      document.querySelector(".drag-drop").classList.add("light");
    }
    if (mode === "dark") {
      //// moon and sun icons changing
      document.querySelector(".mode__light").classList.add("hidden");
      document.querySelector(".mode__dark").classList.remove("hidden");
      //// changing background
      document.querySelector(".main").classList.add("main__dark");
      document.querySelector(".main").classList.remove("main__light");
      //// changing form color
      this._form.classList.remove("light");
      this._form.classList.add("dark");
      //// changing drag and drop color
      document.querySelector(".drag-drop").classList.remove("light");
      document.querySelector(".drag-drop").classList.add("dark");
    }
  }

  _getDragAfterElement(e) {
    const draggableElements = [
      ...this._parentEl.querySelectorAll(".todo-list:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
  _dragAndDrop(handler) {
    const draggables = document.querySelectorAll(".todo-list");
    //// drag start
    draggables.forEach((draggable) => {
      return draggable.addEventListener("dragstart", (e) => {
        draggable.classList.add("dragging");
        e.dataTransfer.setData("text/plain", e.clientY);
      });
    });
    //// drag end
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });
    //// dragover on container
    this._parentEl.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    //// drop for getting data
    this._parentEl.addEventListener("drop", (e) => {
      e.preventDefault();
      const initialY = parseInt(e.dataTransfer.getData("text/plain"), 10);
      const finalY = e.clientY;
      let isDraggedUp = true;
      if (finalY > initialY) isDraggedUp = false;

      const afterElement = this._getDragAfterElement(e);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        this._parentEl.appendChild(draggable);
      } else {
        this._parentEl.insertBefore(draggable, afterElement);
      }
      if (handler) handler(draggable, afterElement, isDraggedUp);
    });
  }

  _addHandlerCheck(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      const checkBox = e.target.closest(".check-box");
      if (!checkBox) return;
      handler(e);
    });
  }

  _addHandlerSubmitData(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
  _addHandlerActive(handler) {
    this._activeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // blue color
      this._allBtn.classList.remove("blue");
      this._activeBtn.classList.add("blue");
      this._completedBtn.classList.remove("blue");
      handler();
    });
  }
  _addHandlerAll(handler) {
    this._allBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // blue color
      this._allBtn.classList.add("blue");
      this._activeBtn.classList.remove("blue");
      this._completedBtn.classList.remove("blue");
      handler();
    });
  }

  _addHandlerCompleted(handler) {
    this._completedBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // blue color
      this._allBtn.classList.remove("blue");
      this._activeBtn.classList.remove("blue");
      this._completedBtn.classList.add("blue");
      handler();
    });
  }
  _addHandlerClearCompleted(handler) {
    this._clearBtn.addEventListener("click", (e) => {
      // blue color
      this._allBtn.classList.add("blue");
      this._activeBtn.classList.remove("blue");
      this._completedBtn.classList.remove("blue");
      e.preventDefault();
      handler();
    });
  }
  _addHandlerDeleteTodo(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const crossBtn = e.target.closest(".icon-cross");
      if (!crossBtn) return;
      handler(e);
    });
  }
  _addHandlerChangingMode(handler) {
    this._modeToggle.addEventListener("click", function () {
      handler();
    });
  }
}

export default new TodoView();
