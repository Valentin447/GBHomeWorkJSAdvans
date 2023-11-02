"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
  #books = [];

  constructor(books) {
    this.validateBooks(books);
    this.#books = books;
  }
  validateBooks(books) {
    if (new Set(books).size !== books.length) {
      throw Error("Начальный массив содержит дубликаты.");
    }
  }
  get allBooks() {
    return this.#books;
  }
  set addBook(title) {
    if (this.#books.includes(title)) {
      throw Error("Книга с таким названием уже существует.");
    } else {
      this.#books.push(title);
    }
  }
  removeBook(title) {
    const index = this.#books.indexOf(title);
    if (index === -1) {
      throw Error("Книги с таким названием нет в списке.");
    } else {
      this.#books.splice(index, 1);
    }
  }
  hasBook(title) {
    return this.#books.includes(title);
  }
}

const lib = new Library(["1", "2", "3", "4"]);
console.log(lib.allBooks);
lib.addBook = "5";
console.log(lib.allBooks);
console.log(lib.hasBook("2"));

lib.removeBook("3");
console.log(lib.allBooks);
