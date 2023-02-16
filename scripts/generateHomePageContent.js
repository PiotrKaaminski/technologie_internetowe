let books;

fetch('./resources/books.json')
    .then((response) => response.json())
    .then((json) => {
        books = json.books;
        generateTiles(books)
        populateFilterOptions(books);
    })

function generateTiles(booksToGenerate) {
    let sortBy = document.getElementById("sortBy").value;
    let sortDirection = document.getElementById("sortDirection").value;
    let direction = sortDirection === "asc" ? -1 : 1;
    booksToGenerate.sort(function (a, b) {
        let valA;
        let valB
        switch (sortBy) {
            case "title":
                valA = a.title;
                valB = b.title;
                break;
            case "publisher":
                valA = a.publisher;
                valB = b.publisher;
                break;
            case "author":
                valA = a.author;
                valB = b.author;
                break;
        }
        if (valA > valB) {
            return -1 * direction;
        }
        if (valA < valB) {
            return 1 * direction;
        }
        return 0;
    })

    let booksContainer = document.getElementById("bookTilesContainer");
    for (const element of booksToGenerate) {
        booksContainer.appendChild(generateTile(element));
    }
}

function generateTile(book) {
    let bookContainer = document.createElement("div");
    bookContainer.className = "col-4 align-items-center text-center bookTileContainer";
    
    let bookLink = document.createElement("a");
    bookLink.href = "book.html?bookId=" + book.id;
    bookLink.className = "book-link";
    bookContainer.appendChild(bookLink);
    
    let bookTile = document.createElement("div");
    bookTile.className = "book-tile";
    bookLink.appendChild(bookTile);
    
    let row = document.createElement("row");
    row.className = "row";
    bookTile.appendChild(row);
    
    row.appendChild(generateCover(book));
    row.appendChild(generateBookInfo(book));
    
    return bookContainer;
}

function generateCover(book) {
    let coverCol = document.createElement("div");
    coverCol.className = "col-auto";
    
    let coverImg = document.createElement("img");
    coverImg.className = "book-cover";
    coverImg.src = book.coverUrl;
    coverImg.alt = "okładka";
    
    coverCol.appendChild(coverImg);
    
    return coverCol;
}

function generateBookInfo(book) {
    let bookInfoDiv = document.createElement("div");
    bookInfoDiv.className = "col-auto text-center book-description";

    let title = document.createElement("p");
    title.style.fontSize = "30px";
    title.innerHTML = book.title;
    bookInfoDiv.appendChild(title);

    let authorHeader = document.createElement("p");
    authorHeader.style.fontSize = "15px";
    authorHeader.innerHTML = "Autor";
    bookInfoDiv.appendChild(authorHeader);

    let authorValue = document.createElement("p");
    authorValue.style.fontSize = "20px";
    authorValue.innerHTML = book.author;
    bookInfoDiv.appendChild(authorValue);

    let categoryHeader = document.createElement("p");
    categoryHeader.style.fontSize = "15px";
    categoryHeader.innerHTML = "Kategoria"
    bookInfoDiv.appendChild(categoryHeader);

    let categoryValue = document.createElement("p");
    categoryValue.style.fontSize = "20px";
    categoryValue.innerHTML = book.category;
    bookInfoDiv.appendChild(categoryValue);

    let publisherHeader = document.createElement("p");
    publisherHeader.style.fontSize = "15px";
    publisherHeader.innerHTML = "Wydawnictwo";
    bookInfoDiv.appendChild(publisherHeader);

    let publisherValue = document.createElement("p");
    publisherValue.style.fontSize = "20px";
    publisherValue.innerHTML = book.publisher;
    bookInfoDiv.appendChild(publisherValue);
    
    return bookInfoDiv;
}

function populateFilterOptions(books) {
    let publishers = new Set();
    let categories = new Set();
    let authors = new Set();
    
    for (let book of books) {
        publishers.add(book.publisher);
        categories.add(book.category);
        authors.add(book.author);
    }
    
    let publisherFilterSelect = document.getElementById("publisherFilter");
    let categoryFilterSelect = document.getElementById("categoryFilter");
    let authorFilterSelect = document.getElementById("authorFilter");
    
    appendFilterOptions(publishers, publisherFilterSelect);
    appendFilterOptions(categories, categoryFilterSelect);
    appendFilterOptions(authors, authorFilterSelect);
}

function appendFilterOptions(filterOptions, filterSelect) {
    for (let filterOption of filterOptions) {
        var optionTag = document.createElement("option");
        optionTag.label = filterOption;
        optionTag.value = filterOption;
        filterSelect.appendChild(optionTag);
    }
}

function applyFilters() {
    document.getElementById("bookTilesContainer").innerHTML = "";
    let titleFilter = document.getElementById("titleFilter").value;
    let booksToGenerate = books.filter(book => book.title.toLowerCase().startsWith(titleFilter.toLowerCase()))

    let publisherFilter = document.getElementById("publisherFilter").value;
    if (publisherFilter!== "null") {
        booksToGenerate = booksToGenerate.filter(book => book.publisher === publisherFilter)
    }

    let categoryFilter = document.getElementById("categoryFilter").value;
    if (categoryFilter !== "null") {
        booksToGenerate = booksToGenerate.filter(book => book.category === categoryFilter)
    }

    let authorFilter = document.getElementById("authorFilter").value;
    if (authorFilter !== "null") {
        booksToGenerate = booksToGenerate.filter(book => book.author === authorFilter)
    }

    generateTiles(booksToGenerate);
}