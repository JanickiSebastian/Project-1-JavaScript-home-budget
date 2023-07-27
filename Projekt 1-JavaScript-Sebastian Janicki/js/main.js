"use strict";
import { addIncome } from "./incomes/actions.js";
import { addOutcome } from "./outcomes/actions.js";
// INCOMES
export const incomeName = document.getElementById("income-name");
export const incomeValue = document.getElementById("income-value");
export const incomesList = document.getElementById("incomes-list");
export const incomesSum = document.getElementById("incomes-sum");

export const outcomesList = document.getElementById("outcomes-list");
export const outcomesSum = document.getElementById("outcomes-sum");
export const outcomeName = document.getElementById("outcome-name");
export const outcomeValue = document.getElementById("outcome-value");
const balanceInfoText = document.getElementById("info-text");
const addIncomeForm = document.getElementById("add-income-form");
const addOutcomeForm = document.getElementById("add-outcome-form");

addIncomeForm.addEventListener("submit", addIncome);
addOutcomeForm.addEventListener("submit", addOutcome);

export const displayCurrentBalance = () => {
  const outcome = Number(outcomesSum.innerText);
  const income = Number(incomesSum.innerText);
  const balance = income - outcome;
  if (balance > 0) {
    balanceInfoText.innerText = `Jesteś na plusie możesz jeszcze wydać ${balance.toFixed(
      2
    )} zł.`;
  } else if (balance < 0) {
    balanceInfoText.innerText = `Wydałeś za dużo, jesteś na minusie ${Math.abs(
      balance
    ).toFixed(2)} zł.`;
  } else {
    balanceInfoText.innerText = "Jesteś na zerze";
  }
};
