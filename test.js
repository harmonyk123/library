///////////////////////////////GLOBAL VARIABLE///////////////////////

//myLibrary = []; //contain book objects version 2 added storage local

const openModal = document.getElementById("open-modal");
const form = document.getElementById("addBookForm");

//////////////////////////DATA STRUCTURE ///////////////////////

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
    const myLibrary = Store.getBooks(); //which is an array at the bottom 109line

    //loop through the array add book to list
    for (let book of myLibrary) {
      UI.addBooksToList(book);
      console.log(book);
    }
  }

  static addBooksToList(book) {
    const booksContainer = document.getElementById("bookGrid");

    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    title.classList.add("titleClass");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const buttonGroup = document.createElement("div");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    bookCard.classList.add("book-card");
    buttonGroup.classList.add("button-group");
    readBtn.setAttribute('class', "btn");
    readBtn.setAttribute('id', "readButton");
    removeBtn.classList.add("btn");
    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages} `;
    removeBtn.textContent = "Remove";

    if (book.isRead === true) {
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

    removeBtn.addEventListener("click", (element) => {
      UI.deleteBook(element.target);

      //store deleted books
      Store.removeBook(
        element.target.parentElement.parentElement.children[0].textContent
      );
    });


    readBtn.addEventListener("click",()=>{
      if (readBtn.textContent === 'Read'){
       readBtn.textContent= 'Not read'
        readBtn.classList.remove("btn-light-green")
        readBtn.classList.add("btn-light-red")
       
      }else{
        readBtn.textContent = 'Read'
        readBtn.classList.remove("btn-light-red")
        readBtn.classList.add("btn-light-green")
      }
    })

  };

  static deleteBook(target) {
    const titleClass = document.getElementsByClassName("titleClass");
    if (target.textContent = "Remove") {
      console.log( target.parentElement.parentElement.children[3].children[0]);
      //
     // console.log(target.parentElement.parentElement);
      target.parentElement.parentElement.remove();
    }
  }

//    static updateStatus(target){
//     target.preventDefault;
//     const readBtn =  target.parentElement.parentElement.children[3].children[0]
    
//     if (readBtn.textContent === "Read"){
//         readBtn.textContent === 'Not read' 
//         console.log('not read')
//         readBtn.classList.replace("btn-light-green","btn-light-red")
//         //readBtn.classList.add("btn-light-red")
//     }else{
//       readBtn.textContent === 'Read'
//       console.log('read')
//       readBtn.classList.replace("btn-light-red","btn-light-green")
//       //readBtn.classList.add("btn-light-green")

//     }

// }

}
/////////////////stored////////////////
class Store {
  static getBooks() {
    let myLibrary;
    if (localStorage.getItem("myLibrary") === null) {
      myLibrary = [];
    } else {
      myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    }

    return myLibrary;
  }

  static addBook(book) {
    const myLibrary = Store.getBooks();
    myLibrary.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }

  static removeBook(title) {
    const myLibrary = Store.getBooks();

    myLibrary.forEach((book, index) => {
      if (book.title === title) {
        myLibrary.splice(index, 1);
      }
    });

    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  }
}

//////////////////////EVENT LISTENER////////////////////////////////

openModal.addEventListener("click", () => {
  modal.style.display = "block";
});

form.addEventListener("submit", (e) => {
  //prevent actual submit
  e.preventDefault();
  modal.style.display = "none";

  //Get form values.
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;

  //instatiate book
  const book = new Book(title, author, pages, isRead);

  //add book to UI
  UI.addBooksToList(book);

  // Add book to store
  Store.addBook(book);

  form.reset();
});

//const readButton= document.getElementsByIdName('readButton')





//////////////////////////// display book at the end///////////////////////////////////////////
UI.displayBooks();
