"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const productsEl = document.querySelector(".product-list");
const productTemplateEl = document.querySelector(".product");

const arrId = [];

function renderPage() {
  productsEl.innerHTML = "";
  for (let i = 0; i < initialData.length; i++) {
    const clone = productTemplateEl.content.cloneNode(true);
    const heading = clone.querySelector(".product__name");
    heading.textContent = initialData[i].product;

    const button = clone.querySelector(".product__button-add-reviews");
    button.setAttribute("data-index", `${i}`);

    for (const review of initialData[i].reviews) {
      const reviewEl = document.createElement("li");
      reviewEl.textContent = `id = ${review.id}   ${review.text}`;
      const listReview = clone.querySelector(".product__reviews-list");
      listReview.appendChild(reviewEl);
      if (!arrId.includes(review.id)) {
        arrId.push(review.id);
      }
    }
    productsEl.appendChild(clone);
  }

  const productItemsEls = document.querySelectorAll(".product__item");
  for (let i = 0; i < productItemsEls.length; i++) {
    const textarea = productItemsEls[i].querySelector(".product__textarea");
    const button = productItemsEls[i].querySelector(
      ".product__button-add-reviews"
    );

    button.addEventListener("click", (e) => {
      const index = +e.target.getAttribute("data-index");
      if (validateReview(textarea.value, index)) {
        initialData[i].reviews.push({ id: nextId(), text: textarea.value });
        renderPage();
      }
    });
  }
}
renderPage();

function nextId() {
  let maxId = 0;
  for (const id of arrId) {
    if (id > maxId) {
      maxId = id;
    }
  }
  return maxId + 1;
}

function validateReview(review, indexProduct) {
  const productItemsEls = document.querySelectorAll(".product__item");
  if (review.length < 50 || review.length > 500) {
    const err = document.createElement("p");
    err.textContent = "неверная длина";
    err.setAttribute("style", "color: red");
    const errorDivEl =
      productItemsEls[indexProduct].querySelector(".error-mesage");
    errorDivEl.innerHTML = "";
    errorDivEl.appendChild(err);
    return false;
  }
  return true;
}
