const myLibrary = [];

start();

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

function start() {
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

    displayLibrary();
}

function addBookToLibrary(bookToAdd) {
    myLibrary.push(bookToAdd);
}

function displayLibrary() {
    const libraryContainer = document.getElementById("library");

    //DEBUG
    // myLibrary.forEach((book) => {
    //     console.log(book.title);
    // });

    //Clear the library
    libraryContainer.innerHTML = "";

    var i = 0;
    //Populate library
    myLibrary.forEach((book) => {
        libraryContainer.innerHTML += `
        <div class="book">
            <div class="cover">
                <span class="title">${book.GetName()}</span>
                <span class="author">${book.GetAuthor()}</span>
            </div>
        </div>`;

        i++;
    });
}
