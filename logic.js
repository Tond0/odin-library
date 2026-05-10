class Book {
    #id;
    #title;
    #author;
    #completed;

    constructor(title, author, completed = false) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#author = author;
        this.#completed = completed;
    }

    // I metodi definiti qui finiscono automaticamente sul "Prototype", 
    // risparmiando memoria perché non vengono ricreati per ogni singolo libro
    GetId() { return this.#id; }
    GetName() { return this.#title; }
    GetAuthor() { return this.#author; }
    GetCompleted() { return this.#completed; }

    ToggleCompleted() { this.#completed = !this.#completed; }
}

let library = [];

//HTML Elements
//Get library
const libraryContainer = document.querySelector("#library");

//Get the add book button
const addBookButton = document.querySelector("#addBookButton");

//Form
const inputForm = document.querySelector(".floatingForm");
const inputBookTitle = document.querySelector("#bookTitle");
const inputBookAuthor = document.querySelector("#bookAuthor");


onStart();

function onStart() {
    //Add the books
    addBookToLibrary(new Book("Animal Farm", "George Orwell", true));
    addBookToLibrary(new Book("The Little Prince", "Antoine de Saint-Exupéry", false));
    addBookToLibrary(new Book("Hunger Games", "Suzanne Collins", false));
    addBookToLibrary(new Book("Dune", "Frank Herbert", false));
    addBookToLibrary(new Book("The Great Gatsby", "F. Scott Fitzgerald", true));
    addBookToLibrary(new Book("Atomic Habits", "James Clear", true));
    addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", true));
    addBookToLibrary(new Book("The Midnight Library", "Matt Haig", false));
    addBookToLibrary(new Book("Sapiens", "Yuval Noah Harari", false));
    addBookToLibrary(new Book("Never Lie", "Freida McFadden", true));
    addBookToLibrary(new Book("Dark Matter", "Blake Crouch", false));

    //Bind to inputForm submit event
    inputForm.addEventListener('submit', onFormSubmit);

    //Bind the add new book button
    // addBookButton.addEventListener('click', onAddClicked);

    //Display the library
    refreshLibrary();
}

//Function is kinda useless right now, but might be a useful initialization container in the future
function addBookToLibrary(bookToAdd) {
    //Push in the array
    library.push(bookToAdd);

    //Create a div
    const bookDiv = createBookDiv(bookToAdd);

    //Add as child
    libraryContainer.prepend(bookDiv);
}

//Factory pattern: Get a book div
function createBookDiv(bookData) {
    //Create the div
    const bookTemplate = document.querySelector("#bookTemplate");

    //Create a copy of the template
    const bookClone = bookTemplate.content.cloneNode(true);

    //Get Elements
    const bookDiv = bookClone.querySelector('.book');
    const titleSpan = bookClone.querySelector('.title');
    const authorSpan = bookClone.querySelector('.author');
    const btnDelete = bookClone.querySelector('#buttonDelete');
    const btnCompleted = bookClone.querySelector('#buttonCompleted');

    //Populate text
    titleSpan.textContent = bookData.GetName();
    authorSpan.textContent = bookData.GetAuthor();
    btnCompleted.textContent = bookData.GetCompleted() ? "Completed" : "Not Completed";

    //Bind buttons event
    btnDelete.addEventListener('click', () => onRemoveClicked(bookData, bookDiv));
    btnCompleted.addEventListener('click', () => onCompletedClicked(bookData, btnCompleted));

    //Return the div
    return bookDiv;
}

//Force the refresh of the entire library.
function refreshLibrary() {
    //DEBUG
    // myLibrary.forEach((book) => {
    //     console.log(book.title);
    // });

    //Clear the library
    libraryContainer.innerHTML = "";

    //Populate library
    library.forEach((book) => {
        //Create the div
        const bookDiv = createBookDiv(book);

        //Display the current book div
        libraryContainer.appendChild(bookDiv);
    });
}

function onFormSubmit(e) {
    //Do not reload the page
    e.preventDefault();

    //Get data
    const title = inputBookTitle.value;
    const author = inputBookAuthor.value;

    //Create book
    const newBook = new Book(title, author, false);

    //Add to the library
    addBookToLibrary(newBook);
    inputForm.reset();
}

function onRemoveClicked(bookData, bookDiv) {
    //Returns an array without the book in it.
    library = library.filter(book => book.GetId() !== bookData.GetId());

    //Display the library without the new book
    bookDiv.remove();
}

function onCompletedClicked(bookData, bookBtnCompleted) {
    bookData.ToggleCompleted();
    
    bookBtnCompleted.textContent = bookData.GetCompleted() ? "Completed" : "Not Completed";
}
