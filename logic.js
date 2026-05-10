/**
 * Represents a book with private properties for ID, title, author, and completion status.
 */
class Book {
    #id;
    #title;
    #author;
    #completed;

    /**
     * Initializes a new book instance with a unique UUID.
     */
    constructor(title, author, completed = false) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#author = author;
        this.#completed = completed;
    }
    
    // Getter methods for private properties
    GetId() { return this.#id; }
    GetName() { return this.#title; }
    GetAuthor() { return this.#author; }
    GetCompleted() { return this.#completed; }

    /**
     * Toggles the book's completion status.
     */
    ToggleCompleted() { this.#completed = !this.#completed; }
}

// Global state: array to store book objects
let library = [];

// DOM Element references
// Main container for book display
const libraryContainer = document.querySelector("#library");

// Button to trigger adding a book
const addBookButton = document.querySelector("#addBookButton");

// Form and input fields for adding new books
const inputForm = document.querySelector(".floatingForm");
const inputBookTitle = document.querySelector("#bookTitle");
const inputBookAuthor = document.querySelector("#bookAuthor");


// Initialize the application
onStart();

/**
 * Sets up initial data, event listeners, and initial render.
 */
function onStart() {
    // Populate the library with default books
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

    // Handle form submissions
    inputForm.addEventListener('submit', onFormSubmit);

    // Reserved for manual button binding if needed
    // addBookButton.addEventListener('click', onAddClicked);

    // Initial UI render
    refreshLibrary();
}

/**
 * Adds a book object to the array and prepends it to the DOM.
 */
function addBookToLibrary(bookToAdd) {
    // Update the data array
    library.push(bookToAdd);

    // Generate the UI component
    const bookDiv = createBookDiv(bookToAdd);

    // Insert at the top of the container
    libraryContainer.prepend(bookDiv);
}

/**
 * Creates a DOM element from a template based on book data.
 */
function createBookDiv(bookData) {
    // Select the HTML template
    const bookTemplate = document.querySelector("#bookTemplate");

    // Clone the template content
    const bookClone = bookTemplate.content.cloneNode(true);

    // Reference internal template elements
    const bookDiv = bookClone.querySelector('.book');
    const titleSpan = bookClone.querySelector('.title');
    const authorSpan = bookClone.querySelector('.author');
    const btnDelete = bookClone.querySelector('#buttonDelete');
    const btnCompleted = bookClone.querySelector('#buttonCompleted');

    // Sync element text with object data
    titleSpan.textContent = bookData.GetName();
    authorSpan.textContent = bookData.GetAuthor();
    btnCompleted.textContent = bookData.GetCompleted() ? "Completed" : "Not Completed";

    // Attach event listeners for delete and toggle functionality
    btnDelete.addEventListener('click', () => onRemoveClicked(bookData, bookDiv));
    btnCompleted.addEventListener('click', () => onCompletedClicked(bookData, btnCompleted));

    // Return the ready-to-use node
    return bookDiv;
}

/**
 * Clears the UI container and re-renders all books from the array.
 */
function refreshLibrary() {
    // Clear existing DOM content
    libraryContainer.innerHTML = "";

    // Iterate through the library array and append each book to the container
    library.forEach((book) => {
        const bookDiv = createBookDiv(book);
        libraryContainer.appendChild(bookDiv);
    });
}

/**
 * Handles the creation of a new book via form submission.
 */
function onFormSubmit(e) {
    // Prevent the default browser reload
    e.preventDefault();

    // Extract values from input fields
    const title = inputBookTitle.value;
    const author = inputBookAuthor.value;

    // Instantiate new Book object
    const newBook = new Book(title, author, false);

    // Update data and UI, then reset the form
    addBookToLibrary(newBook);
    inputForm.reset();
}

/**
 * Removes a book from both the data array and the DOM.
 */
function onRemoveClicked(bookData, bookDiv) {
    // Filter the global array to exclude the removed book
    library = library.filter(book => book.GetId() !== bookData.GetId());

    // Update the UI by removing the specific node
    bookDiv.remove();
}

/**
 * Toggles the completion status and updates the button label.
 */
function onCompletedClicked(bookData, bookBtnCompleted) {
    // Update data model
    bookData.ToggleCompleted();
    
    // Synchronize the button text with the new state
    bookBtnCompleted.textContent = bookData.GetCompleted() ? "Completed" : "Not Completed";
}