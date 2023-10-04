import View from "./View.js";
import Controller from "./Controller.js";
import Model from "./Model.js";
import "../css/style.scss";

function initialize() {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);

  controller.init();
}

window.addEventListener("DOMContentLoaded", initialize);
