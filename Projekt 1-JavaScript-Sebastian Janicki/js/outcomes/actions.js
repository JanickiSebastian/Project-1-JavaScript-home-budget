"use strict";
import { outcomeName, outcomeValue } from "../main.js";
import { renderOutcomesList } from "./updates.js";

export let outcomes = [];

export const addOutcome = (e) => {
  e.preventDefault();

  const nameValue = outcomeName.value.trim();
  const valueValue = parseFloat(outcomeValue.value).toFixed(2);

  if (
    !nameValue ||
    valueValue === "" ||
    isNaN(valueValue) ||
    Number(valueValue) <= 0
  ) {
    return;
  }
  const _outcome = {
    name: outcomeName.value,
    value: parseFloat(valueValue),
    id: Math.random().toString(),
  };

  outcomes.push(_outcome);

  renderOutcomesList();

  outcomeName.value = "";
  outcomeValue.value = "";
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
  const outcomeValue = parseFloat(document.getElementById(`update-outcome-${idToEdit}`).value).toFixed(2);

  if (
    !nameValue ||
    outcomeValue === "" ||
    isNaN(outcomeValue) ||
    Number(outcomeValue) <= 0
  ) {
    return;
  }
  {
    outcomes = outcomes.map((outcome) => {
      if (outcome.id === idToEdit) {
        return { ...outcome, name: nameValue, value: parseFloat(outcomeValue) };
      }
      return outcome;
    });

    renderOutcomesList();
  }
};
