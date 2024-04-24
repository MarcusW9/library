const cardContainer = document.querySelector(".card-container")
const addBookBtn = document.querySelector("#add-book-btn")
const addBookDialog = document.querySelector("#add-book-dialog")
const modalConfirmBtn = document.querySelector("#modal-confirm-btn")

// form inputs
const form = document.querySelector("#add-book-form")
const inputTitle = document.querySelector("#title")
const inputAuthor = document.querySelector("#author")
const inputPages =  document.querySelector("#pages")
const inputRead =  document.querySelector("#read-or-unread")

// form validation
const pagesError = document.querySelector("#pages + span.error")
inputPages.addEventListener("input", (e) => {
    if (inputPages.validity.valid) {
        pagesError.textContent = "";
        pagesError.className = "error";
    } else {
        showPagesError()
    }
})

function showPagesError() {
    if (inputPages.validity.valueMissing) {
        pagesError.textContent = "Please enter the number of pages"
    } else if (inputPages.validity.patternMismatch) {
        pagesError.textContent = "Please enter a valid number"
    }
    pagesError.className = "error active"
}

const titleError = document.querySelector("#title + span.error")
inputTitle.addEventListener("input", (e) => {
    if (inputTitle.validity.valid) {
        titleError.textContent = ""
        titleError.className = "error";
    } else {
        showTitleError()
    }
})

function showTitleError() {
    if (inputTitle.validity.valueMissing) {
        titleError.textContent = "Please enter a title"
    } 
    titleError.className = "error active"
}

const authorError = document.querySelector("#author + span.error")
inputAuthor.addEventListener("input", (e) => {
    if (inputAuthor.validity.valid) {
        authorError.textContent = ""
        authorError.className = "error";
    } else {
        showAuthorError()
    }
})

function showAuthorError() {
    if (inputAuthor.validity.valueMissing) {
        authorError.textContent = "Please enter an author"
    } 
    authorError.className = "error active"
}

function showErrors() {
    if (!inputTitle.validity.valid) {
        showTitleError()
    } 
    if (!inputAuthor.validity.valid) {
        showAuthorError()
    }
    if (!inputPages.validity.valid) {
        showPagesError()
    }
}

form.addEventListener("submit", (e) => {
    if (!inputTitle.validity.valid ||
        !inputAuthor.validity.valid ||
        !inputPages.validity.valid
    ) {
        showErrors();
        console.log("test")
        e.preventDefault();
    }
} )


// create library class 
class Library {
    constructor() {
        this.books = []
    }

    addBook(book) {
        this.books.push(book)
    }

    displayLibrary(library) {
        library.map((book) => this.createCard(book))
    }

    createCard(book) {
        const card = document.createElement("div")
        card.classList.add("book-card")
        const title = document.createElement("p")
        title.textContent = `${book.title}`;
        title.classList.add("book-main-info")
        const author = document.createElement("p")
        author.textContent = `${book.author}`;
        author.classList.add("book-main-info")
        const pages = document.createElement("p")
        pages.textContent = `Pages: ${book.pages}`;
        pages.classList.add("book-side-info")
        const read = document.createElement("p")
        read.textContent = `${book.read}`;
        read.classList.add("book-side-info")
    
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

        return card;
    }
}

// class for a book
class Book {
    constructor (title, author, pages, read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
    }
}

const library = new Library

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
    library.books.push(newBook)
    library.createCard(newBook)
    console.log(library.books)
}

modalConfirmBtn.addEventListener("click", (e) => {
    // e.preventDefault(); 
    if (inputTitle.value != "" && 
    inputAuthor.value != "" &&
    inputPages.value != "") {
    submitBook()
    addBookDialog.close()
    }
})

library.addBook(theHobbit)
library.addBook(theHobbit2)
library.displayLibrary(library.books)

