let library = [];
let libraryContainer;
onStart();

function Book(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;

    this.GetId = function () {
        return id;
    };
    this.GetName = function () {
        return title;
    };
    this.GetAuthor = function () {
        return author;
    };
}

function onStart() {
    addBookToLibrary(new Book(crypto.randomUUID(), "Animal Farm", "George Orwell"));
    addBookToLibrary(new Book(crypto.randomUUID(), "The Little Prince", "Antoine de Saint-Exupéry"));
    addBookToLibrary(new Book(crypto.randomUUID(), "Hunger Games", "Suzanne Collins"));
    addBookToLibrary(new Book(crypto.randomUUID(), "Dune", "Frank Herbert"));
    addBookToLibrary(new Book(crypto.randomUUID(), "The Great Gatsby", "F. Scott Fitzgerald"));
    addBookToLibrary(new Book(crypto.randomUUID(), "Atomic Habits", "James Clear"));
    addBookToLibrary(new Book(crypto.randomUUID(), "The Hobbit", "J.R.R. Tolkien"));
    addBookToLibrary(new Book(crypto.randomUUID(), "The Midnight Library", "Matt Haig"));
    addBookToLibrary(new Book(crypto.randomUUID(), "Sapiens", "Yuval Noah Harari"));
    addBookToLibrary(new Book(crypto.randomUUID(), "Never Lie", "Freida McFadden"));
    addBookToLibrary(new Book(crypto.randomUUID(), "Dark Matter", "Blake Crouch"));

    //Get the library container
    libraryContainer = document.getElementById("library");
    displayLibrary();
}

function addBookToLibrary(bookToAdd) {
    library.push(bookToAdd);
}

function displayLibrary() {
    //DEBUG
    // myLibrary.forEach((book) => {
    //     console.log(book.title);
    // });

    //Clear the library
    libraryContainer.innerHTML = "";

    //Populate library
    library.forEach((book) => {
        //Create the div
        const bookDiv = document.createElement('div');
        //Add the class
        bookDiv.classList.add('book');
        //Construct the div with all the elements needed
        bookDiv.innerHTML = `
            <md-outlined-icon-button class="button-delete">
                <md-icon>delete</md-icon>
            </md-outlined-icon-button>
            <div class="cover">
                <span class="title">${book.GetName()}</span>
                <span class="author">${book.GetAuthor()}</span>
            </div>`;

        const btnDelete = bookDiv.querySelector('.button-delete');
        btnDelete.addEventListener('click', () => onRemoveClicked(book));

        //Display the current book div
        libraryContainer.appendChild(bookDiv);
    });

}

function onRemoveClicked(bookToRemove) 
{
    //Returns an array without the book in it.
    library = library.filter(book => book.GetId() !== bookToRemove.GetId());

    //Display the library without the new book
    displayLibrary();
}