export const state = {
  todo: {
    value: "",
    completed: false,
    active: true,
    num: 0,
  },
  data: [],
  mode: "dark",
};

export const newTodo = function () {
  const newTodo = {
    value: document.querySelector(".todo-type").value,
    completed: state.todo.completed,
    active: state.todo.active,
    num: state.todo.num++,
  };
  if (newTodo.value === "") return;
  state.data.push(newTodo);
  // local storage
  persistData();
};

export const checkTodo = function (data) {
  const index = state.data.findIndex((d) => {
    return d.num === +data.dataset.num;
  });

  if (state.data[index].completed === false) {
    state.data[index].completed = true;
    state.data[index].active = false;
  } else {
    state.data[index].completed = false;
    state.data[index].active = true;
  }
  // local storage
  persistData();
};

export const activeTodo = function () {
  const data = state.data.filter((d) => d.active === true);
  return data;
};
export const completedTodo = function () {
  const data = state.data.filter((d) => d.completed === true);
  return data;
};

export const clearCompleted = function () {
  const data = state.data.filter((d) => d.completed === true);
  data.forEach((d) => {
    let index = state.data.indexOf(d);
    while (index !== -1) {
      state.data.splice(index, 1);
      index = state.data.indexOf(d);
    }
  });
  // local storage
  persistData();
};

export const deleteTodo = function (data) {
  const index = state.data.findIndex((d) => {
    return d.num === +data.dataset.num;
  });
  state.data.splice(index, 1);
  // local storage
  persistData();
};

export const ChangeMode = function () {
  if (state.mode === "dark") {
    state.mode = "light";
  } else {
    state.mode = "dark";
  }
  persistData();
  return state.mode;
};

export const dragAndDrop = function (draggable, afterElement, isDraggedUp) {
  const draggableIndex = state.data.findIndex((d) => {
    return d.num === +draggable.dataset.num;
  });
  if (!afterElement) {
    const dragging = state.data.splice(draggableIndex, 1);
    state.data.splice(0, 0, ...dragging);
  }
  if (afterElement) {
    const afterElementIndex = state.data.findIndex((d) => {
      return d.num === +afterElement.dataset.num;
    });
    const dragging = state.data.splice(draggableIndex, 1);
    !isDraggedUp
      ? state.data.splice(afterElementIndex + 1, 0, ...dragging)
      : state.data.splice(afterElementIndex, 0, ...dragging);
  }
  persistData();
};

const persistData = function () {
  localStorage.setItem("data", JSON.stringify(state));
};

export const localStorageData = function () {
  const getData = JSON.parse(localStorage.getItem("data"));
  if (!getData) return;
  state.todo.num = getData.todo?.num;
  state.data = getData.data;
  state.mode = getData.mode;
  return { data: state.data, mode: state.mode };
};
