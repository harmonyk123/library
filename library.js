const openModal = document.getElementById('open-modal');
openModal.addEventListener("click", () => {
  modal.style.display = "block";
});

myLibrary = []; //contain book objects

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

//UI class: Handle UserInterface tasks
class UI {
  static displayBooks() {
    //hard coded array
    const storedBooks =[
      {
        title: 'Book One',
        author: 'Johnn Doe',
        pages: '256',
        isRead: true
      },
      {
        title: 'Book two',
        author: 'Jane Doe',
        pages: '600',
        isRead: false
      }
    ];
    const books = storedBooks
    //const storeBooks=Store.getBooks();

    //loop through the array add book to list
    for (let book of books) {
      UI.addBooksToList(book);
      console.log(book);
    }

  }

  static addBooksToList(book) {
    const booksContainer = document.getElementById("bookGrid");

    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    title.classList.add('titleClass')
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const buttonGroup = document.createElement("div");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    bookCard.classList.add("book-card");
    buttonGroup.classList.add("button-group");
    readBtn.classList.add("btn");
    removeBtn.classList.add("btn");
    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages} `;
    removeBtn.textContent = "Remove";

    if (book.isRead) {
      readBtn.textContent = "Read";
      readBtn.classList.add("btn-light-green");
    } else {
      readBtn.textContent = "Not read";
      readBtn.classList.add("btn-light-red");
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttonGroup.appendChild(readBtn);
    buttonGroup.appendChild(removeBtn);
    bookCard.appendChild(buttonGroup);
    booksContainer.appendChild(bookCard);
  }

  static deleteBook(target) {
    const titleClass= document.getElementsByClassName('titleClass')
    if ((target.textContent = "Remove")) {
     // console.log(target.parentElement.children[0].children[0].textContent);
      target.parentElement.parentElement.remove();
      console.log(target.parentElement.parentElement)
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    console.log(div.appendChild(document.createTextNode(message)));
    console.log(div.className);
    const alertContainer = document.querySelector(".container");
    const form = document.getElementById("addBookForm");
    alertContainer.insertBefore(div, form);

    //vanishing in 2 seconds

    setTimeout(() => document.querySelector(".alert").remove, 3000);
  }

  static clearFields() {
    const form = document.getElementById("addBookForm");
    form.innerHTML = ''
}
}

//store Class: Handles storage
// class Store {
//   static getBooks() {
//     let books;
//     if (localStorage.getItem("books") === null) {
//       books = [];
//     } else {
//       books = JSON.parse(localStorage.getItem("books"));
//     }
//     return books;
//   }
//   static addBook(book) {
//     const books = Store.getBooks();
//     books.push(book);

//     localStorage.setItem("books", JSON.stringify(books));
//   }
//   static removeBook(title) {
//     const books = Store.getBooks();
//     books.forEach((book, index) => {
//       if (book.title === title) {
//         book.splice(index, 1);
//       }
//     });
//     localStorage.setItem("books", JSON.stringify(books));
//   }
// }

//1. Event: Add a book
const form = document.getElementById("addBookForm");
form.addEventListener("submit", (e) => {
  //prevent actual submit
  e.preventDefault();
  modal.style.display = "none";

  
  //Get form values.
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  //validate

    //instatiate book
    const book = new Book(title, author, pages, isRead);
   // console.log(book);
    //add book to UI
    UI.addBooksToList(book);

    //ADD BOOK TO STORE
    //Store.addBook(book);

     form.reset();
  
});

//Event: remove a book
const booksContainer = document.getElementById("bookGrid");
booksContainer.addEventListener("click", (element) => {
  //console.log(e.target)
  //remove book from UI
  UI.deleteBook(element.target);
  //REMOVE BOOK FROM STORE
  //const bookTitle= element.parentElement.children[0].children[0].textContent
  //console.log(bookTitle)
  //Store.removeBook=bookTitle
 
});

// display book at the end
UI.displayBooks();
