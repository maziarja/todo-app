import * as model from "./model.js";
import todoView from "./view.js";
import "core-js/stable";
import "regenerator-runtime/runtime";

const contorlRenderData = function () {
  // get data
  model.newTodo();
  // reverse data for rendering
  const data = model.state.data.slice().reverse();
  if (!data) return;
  // render data
  todoView._renderData(data);
  // update item numbers
  todoView._renderItemNumbers(model.state.data);
  /// drag and drop functionality
  todoView._dragAndDrop();
};

const controlCheckTodo = function (e) {
  // get data from DOM
  const element = todoView._checkTodo(e);

  model.checkTodo(element);
};

const contolActiveTodo = function () {
  const data = model.activeTodo().slice().reverse();
  if (!data) return;
  // render data
  todoView._renderData(data);
  // update item numbers
  todoView._renderItemNumbers(data);
  /// drag and drop functionality
  todoView._dragAndDrop();
  /// show actions even if there is no data
  todoView._showAction();
};

const controlAlltodo = function () {
  const data = model.state.data.slice().reverse();
  ///////////
  if (!data) return;
  // render data
  todoView._renderData(data);
  // update item numbers
  todoView._renderItemNumbers(data);
  /// drag and drop functionality
  todoView._dragAndDrop();
};

const controlCompleteTodo = function () {
  const data = model.completedTodo().slice().reverse();
  if (!data) return;
  // render data
  todoView._renderData(data);
  // update item numbers
  todoView._renderItemNumbers(data);
  /// drag and drop functionality
  todoView._dragAndDrop();
  /// show actions even if there is no data
  todoView._showAction();
};

const controlClearCompleted = function () {
  model.clearCompleted();
  // render data
  todoView._renderData(model.state.data.slice().reverse());
  // update item numbers
  todoView._renderItemNumbers(model.state.data);
  /// drag and drop functionality
  todoView._dragAndDrop();
};

const controlDeleteTodo = function (e) {
  // get element
  const data = todoView._deleteTodo(e);
  if (!data) return;
  // delete it from data
  model.deleteTodo(data);
  // render it
  todoView._renderData(model.state.data.slice().reverse());
  // update item numbers
  todoView._renderItemNumbers(model.state.data);
  // drag and drop functionality
  todoView._dragAndDrop();
};

const controlChangingMode = function () {
  // change mode from data
  model.ChangeMode();
  // const mode = model.ChangeMode();
  if (!model.localStorageData()) return;
  const { mode } = model.localStorageData();
  // chande mode from dom
  todoView._changeMode(mode);
};
const controlLocalStorage = function () {
  if (!model.localStorageData()) return;
  const { data } = model.localStorageData();
  if (!data) return;
  // render data
  todoView._renderData(data.slice().reverse());
  // update item numbers
  todoView._renderItemNumbers(model.state.data);
  // drag and drop functionality
  todoView._dragAndDrop();
};

const controlDragAndDrop = function (draggable, afterElement, isDraggedUp) {
  model.dragAndDrop(draggable, afterElement, isDraggedUp);
};

const inital = function () {
  /// submit a todo
  todoView._addHandlerSubmitData(contorlRenderData);
  /// check a todo
  todoView._addHandlerCheck(controlCheckTodo);
  /// active list
  todoView._addHandlerActive(contolActiveTodo);
  /// all list
  todoView._addHandlerAll(controlAlltodo);
  /// completed list
  todoView._addHandlerCompleted(controlCompleteTodo);
  /// clear completed
  todoView._addHandlerClearCompleted(controlClearCompleted);
  /// delete a todo
  todoView._addHandlerDeleteTodo(controlDeleteTodo);
  /// drag and drop
  todoView._dragAndDrop(controlDragAndDrop);
  /// dark and light mode
  todoView._addHandlerChangingMode(controlChangingMode);
  /// load local storage data
  controlLocalStorage();
  todoView._changeMode(model.state.mode);
};

inital();
