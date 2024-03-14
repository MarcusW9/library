const cardContainer = document.querySelector(".card-container")
const addBookBtn = document.querySelector("#add-book-btn")
const addBookDialog = document.querySelector("#add-book-dialog")
const modalConfirmBtn = document.querySelector("#modal-confirm-btn")

// form inputs
const inputTitle = document.querySelector("#title")
const inputAuthor = document.querySelector("#author")
const inputPages =  document.querySelector("#pages")
const inputRead =  document.querySelector("#read-or-unread")

// create a card in html

const createCard = (book) => {
    const card = document.createElement("div")
    card.classList.add("book-card")
    const title = document.createElement("p")
    title.textContent = `Title: ${book.title}`;
    const author = document.createElement("p")
    author.textContent = `Author: ${book.author}`;
    const pages = document.createElement("p")
    pages.textContent = `Pages: ${book.pages}`;
    const read = document.createElement("p")
    read.textContent = `${book.read}`;

    const cardBtnContainers = document.createElement("div")
    cardBtnContainers.classList.add("card-btns")
    const removeBtn = document.createElement("button")
    removeBtn.textContent = "Remove"
    removeBtn.addEventListener("click", () => {card.classList.add("hidden")})
    const readToggleBtn = document.createElement("button")
    readToggleBtn.textContent = `${book.read}`
    readToggleBtn.addEventListener("click", () => {
        if (book.read === "Read") {
            book.read = "Unread"
        } else {
            book.read = "Read"
        }
        readToggleBtn.textContent = book.read
    });
    
    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(read)
    card.appendChild(cardBtnContainers)
    cardBtnContainers.appendChild(removeBtn)
    cardBtnContainers.appendChild(readToggleBtn)

    cardContainer.appendChild(card)
}


const myLibrary = [];
const addBookToLibrary = (book) => {
  myLibrary.push(book)
}
const displayLibrary = (library) => {
  library.map((book) => createCard(book))
}

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read,
    this.info = function() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    },
    this.createBookCard = createCard
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "Unread")
const theHobbit2 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 324, "Read")

// Bring up form so user can type the book info

const addBookForm = () => {
    addBookDialog.setAttribute("open", "")
} 

addBookBtn.addEventListener("click", addBookForm)

// Capture info once user confirms 

const submitBook = () => {
    let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.value)
    myLibrary.push(newBook)
    createCard(newBook)
    console.log(myLibrary)
}

modalConfirmBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    if (inputTitle.value != "" && 
    inputAuthor.value != "" &&
    inputPages.value != "") {
    submitBook()
    addBookDialog.close()
    }
})

addBookToLibrary(theHobbit)
addBookToLibrary(theHobbit2)
displayLibrary(myLibrary)
