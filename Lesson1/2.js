"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

const foodArr = [
  "Маргарита",
  "Пепперони",
  "Три сыра",
  "Филадельфия",
  "Калифорния",
  "Чизмаки",
  "Сеякемаки",
  "Тирамису",
  "Чизкейк",
];
const cooks = {
  Пицца: "Олег",
  Суши: "Андрей",
  Десерт: "Анна",
};

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  constructor(food, cooks) {
    this.orders = new Map();
    this.food = new Set(food);
    this.cooks = cooks;
  }

  newOrder(client, ...args) {
    for (const newOrder of args) {
      if (!this.food.has(newOrder.name)) {
        throw new Error(
          `${newOrder.type} "${newOrder.name}" - такого блюда не существует.`
        );
      }
    }

    if (!this.orders.has(client)) {
      this.orders.set(client, [...args]);
    } else {
      let isOrder = false;
      for (const newOrder of args) {
        for (const ordersArr of this.orders.get(client)) {
          if (newOrder.name === ordersArr.name) {
            ordersArr.quantity += newOrder.quantity;
            isOrder = true;
          }
        }
        if (!isOrder) {
          this.orders.get(client).push(newOrder);
        }
        isOrder = false;
      }
    }
    this.printOrder(client);
  }

  printOrder(client) {
    console.log(`Клиент ${client.firstname} заказал:`);
    for (const order of this.orders.get(client)) {
      console.log(
        `${order.type} "${order.name}" - ${order.quantity}; готовит повар ${
          cooks[order.type]
        }`
      );
    }
  }
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager(foodArr, cooks);

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"),
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" }
);
// Вывод:
// Клиент Иван заказал:
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" }
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel,
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" }
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" }
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.
