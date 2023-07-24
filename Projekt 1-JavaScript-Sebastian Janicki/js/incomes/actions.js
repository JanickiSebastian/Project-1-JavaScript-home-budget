"use strict";
import { incomeName, incomeValue } from "../main.js";
import { renderIncomesList } from "./updates.js";

export let incomes = [];

export const addIncome = (e) => {
  e.preventDefault();
  const nameValue = incomeName.value.trim();
  const valueValue = parseFloat(incomeValue.value).toFixed(2);

  if (
    !nameValue ||
    valueValue === "" ||
    isNaN(valueValue) ||
    Number(valueValue) <= 0
  ) {
    return;
  }
  const _income = {
    name: incomeName.value,
    value: parseFloat(valueValue),
    id: Math.random().toString(),
  };

  incomes.push(_income);

  renderIncomesList();

  incomeName.value = "";
  incomeValue.value = "";
};

export const deleteIncome = (e) => {
  e.preventDefault();
  const idToDelete = e.target.id;
  incomes = incomes.filter((el) => el.id !== idToDelete);

  renderIncomesList();
};

export const editIncomesList = (e) => {
  e.preventDefault();
  const idToEdit = e.target.id.split("-")[2];
  const nameValue = document.getElementById(`update-name-${idToEdit}`).value;
  const incomeValue = parseFloat(
    document.getElementById(`update-income-${idToEdit}`).value
  ).toFixed(2);

  if (
    !nameValue ||
    incomeValue === "" ||
    isNaN(incomeValue) ||
    Number(incomeValue) <= 0
  ) {
    return;
  }
  {
    incomes = incomes.map((income) => {
      if (income.id === idToEdit) {
        return { ...income, name: nameValue, value: parseFloat(incomeValue) };
      }
      return income;
    });

    renderIncomesList();
  }
};
