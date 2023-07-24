"use strict";
import { displayCurrentBalance, outcomesList, outcomesSum } from "../main.js";
import { outcomes, deleteOutcome, editOutcomesList } from "./actions.js";

export const renderOutcomesList = () => {
  outcomesList.innerHTML = "";

  for (let outcome of outcomes) {
    const listElement = document.createElement("li");
    listElement.classList.add("list-outcome-item");
    listElement.id = outcome.id;

    const listElementWrapper = document.createElement("div");
    listElementWrapper.classList.add("list-element-wrapper");

    const name = document.createElement("p");
    name.innerText = outcome.name;

    const value = document.createElement("p");
    value.innerText = outcome.value;

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("buttons-wrapper");

    const editButton = document.createElement("button");
    editButton.id = outcome.id;
    editButton.innerText = "Edytuj";

    const removeButton = document.createElement("button");
    removeButton.id = outcome.id;
    removeButton.innerText = "Usuń";

    buttonsWrapper.appendChild(editButton);
    buttonsWrapper.appendChild(removeButton);
    outcomesList.appendChild(listElement);

    listElementWrapper.appendChild(name);
    listElementWrapper.appendChild(value);
    listElementWrapper.appendChild(buttonsWrapper);

    listElement.appendChild(listElementWrapper);

    removeButton.addEventListener("click", deleteOutcome);
    editButton.addEventListener("click", renderUpdateInputs);
  }
  calculateOutcomesSum();
};
const calculateOutcomesSum = () => {
  const _outcomesSum = outcomes.reduce((acc, outcome) => {
    return acc + outcome.value;
  }, 0);

  outcomesSum.innerText = _outcomesSum.toFixed(2);
  displayCurrentBalance();
};
let editFlags = {};
const renderUpdateInputs = (e) => {
  const id = e.target.id;
  if (editFlags[id]) {
    return;
  }
  const listElement = document.getElementById(id);
  const updateInputsWrapper = document.createElement("div");
  updateInputsWrapper.id = `update-${id}`;

  const nameInput = document.createElement("input");
  nameInput.id = `update-name-${id}`;

  const outcomeInput = document.createElement("input");
  outcomeInput.type = "number";
  outcomeInput.id = `update-outcome-${id}`;

  const saveButton = document.createElement("button");
  saveButton.innerHTML = "SAVE";
  saveButton.id = `update-save-${id}`;

  const cancelButton = document.createElement("button");
  cancelButton.innerHTML = "CANCEL";
  cancelButton.id = `update-cancel-${id}`;

  updateInputsWrapper.appendChild(nameInput);
  updateInputsWrapper.appendChild(outcomeInput);
  updateInputsWrapper.appendChild(saveButton);
  updateInputsWrapper.appendChild(cancelButton);

  listElement.appendChild(updateInputsWrapper);
  editFlags[id] = true;
  cancelButton.addEventListener("click", cancelEditInputs);
  saveButton.addEventListener("click", editOutcomesList);
};

const cancelEditInputs = (e) => {
  e.preventDefault();

  const id = e.target.id.split("-")[2];
  const listElement = document.getElementById(id);
  const updateElement = document.getElementById(`update-${id}`);
  listElement.removeChild(updateElement);
};
