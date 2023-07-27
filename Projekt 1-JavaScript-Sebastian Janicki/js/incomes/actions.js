"use strict";
import { renderIncomesList } from "./updates.js";

export let incomes = [];
export let editFlags = {};

export const addIncome = (e) => {
  e.preventDefault();
  const form = e.target; 
  const nameValue = form.querySelector("#income-name").value.trim();
  const valueValue = parseFloat(
    form.querySelector("#income-value").value
  ).toFixed(2);
  

  if (!nameValue || isNaN(valueValue) || Number(valueValue) <= 0) {
    alert("Wprowadź poprawne dane przychodu.");
    return;
  }

  const _income = {
    name: nameValue,
    value: parseFloat(valueValue),
    id: Math.random().toString(),
  };

  incomes.push(_income);
  renderIncomesList();

  form.reset(); 
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

  if (!nameValue || isNaN(incomeValue) || Number(incomeValue) <= 0) {
    return;
  }

  incomes = incomes.map((income) => {
    if (income.id === idToEdit) {
      return { ...income, name: nameValue, value: parseFloat(incomeValue) };
    }
    return income;
  });

  renderIncomesList();
  editFlags[idToEdit] = false;
};
