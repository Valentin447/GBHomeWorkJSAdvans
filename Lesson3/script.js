"use strict";

const nameEl = document.querySelector(".name-product");
const reviewEl = document.querySelector(".review");
const btnEl = document.querySelector(".button");
const errorEl = document.querySelector(".error");
const viewEl = document.querySelector(".view-products");

if (viewEl !== null) {
  for (const name in localStorage) {
    if (localStorage.hasOwnProperty(name)) {
      const productEl = document.createElement("li");
      productEl.setAttribute("data-name", `${name}`);
      const reviewsArr = JSON.parse(localStorage.getItem(name));
      const reviewsHTML = [];

      for (let i = 0; i < reviewsArr.length; i++) {
        reviewsHTML.push(
          `<li>${reviewsArr[i]}<button class="delete" data-product="${name}">Удалить</button></li>`
        );
      }

      productEl.innerHTML = `
        <h3>${name}</h3>
        <button class="button-show">показать отзывы</button>
        <ul class="reviews-list">${reviewsHTML.join("")}</ul>
      `;
      viewEl.append(productEl);
    }
  }
  hiddenReviews();
  addEventButtonDelete();
  addEventButtonShow();
}

if (btnEl !== null) {
  btnEl.addEventListener("click", (e) => {
    if (validateInput()) {
      addReview();
    }
  });
}

function addEventButtonDelete() {
  const buttonsDel = document.querySelectorAll(".delete");
  for (const button of buttonsDel) {
    button.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      deleteReview(
        button.getAttribute("data-product"),
        e.target.parentElement.textContent
      );
    });
  }
}

function addEventButtonShow() {
  const buttonShow = document.querySelectorAll(".button-show");
  for (const button of buttonShow) {
    button.addEventListener("click", (e) => {
      let ul = e.target.parentElement.querySelector("ul");
      if (ul.hidden) {
        ul.hidden = false;
        button.textContent = "скрыть отзывы";
      } else {
        ul.hidden = true;
        button.textContent = "показать отзывы";
      }
    });
  }
}

function hiddenReviews() {
  const reviewsLists = document.querySelectorAll(".reviews-list");
  for (const reviewsList of reviewsLists) {
    reviewsList.hidden = true;
  }
}

function validateInput() {
  if (nameEl.value.length === 0 || reviewEl.value.length === 0) {
    errorEl.textContent = "Все поля должны быть заполнены!";
    return false;
  } else {
    errorEl.textContent = "";
    return true;
  }
}

function addReview() {
  const reviewsArr = JSON.parse(localStorage.getItem(nameEl.value));
  if (reviewsArr) {
    reviewsArr.push(reviewEl.value);
    localStorage.setItem(nameEl.value, JSON.stringify(reviewsArr));
  } else {
    localStorage.setItem(nameEl.value, JSON.stringify([reviewEl.value]));
  }
}

function deleteReview(productName, review) {
  const reviewsArr = JSON.parse(localStorage.getItem(productName));
  reviewsArr.splice(reviewsArr.indexOf(review), 1);
  localStorage.setItem(productName, JSON.stringify(reviewsArr));
  if (JSON.parse(localStorage.getItem(productName)).length === 0) {
    localStorage.removeItem(productName);
    document.querySelector(`[data-name="${productName}"]`).remove();
  }
}
