"use strict";

import { renderOutcomesList } from "./updates.js";

export let outcomes = [];
export let editFlags = {};

export const addOutcome = (e) => {
  e.preventDefault();

  const form = e.target;
  const nameValue = form.querySelector("#outcome-name").value.trim();
  const valueValue = parseFloat(
    form.querySelector("#outcome-value").value
  ).toFixed(2);

  if (!nameValue || isNaN(valueValue) || Number(valueValue) <= 0) {
    alert("Wprowadź poprawne dane wydatku.");
    return;
  }

  const _outcome = {
    name: nameValue,
    value: parseFloat(valueValue),
    id: Math.random().toString(),
  };

  outcomes.push(_outcome);
  renderOutcomesList();

  form.reset();
};

export const deleteOutcome = (e) => {
  e.preventDefault();

  const idToDelete = e.target.id;
  outcomes = outcomes.filter((el) => el.id !== idToDelete);
  renderOutcomesList();
};

export const editOutcomesList = (e) => {
  e.preventDefault();

  const idToEdit = e.target.id.split("-")[2];
  const nameValue = document.getElementById(`update-name-${idToEdit}`).value;
  const outcomeValue = parseFloat(
    document.getElementById(`update-outcome-${idToEdit}`).value
  ).toFixed(2);

  if (!nameValue || isNaN(outcomeValue) || Number(outcomeValue) <= 0) {
    return;
  }

  outcomes = outcomes.map((outcome) => {
    if (outcome.id === idToEdit) {
      return { ...outcome, name: nameValue, value: parseFloat(outcomeValue) };
    }
    return outcome;
  });

  renderOutcomesList();
  editFlags[idToEdit] = false;
};
