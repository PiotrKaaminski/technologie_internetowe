fetch('./resources/books.json')
    .then((response) => response.json())
    .then((json) => {
        generateInfo(json.books);
    })

function generateInfo(books) {
    let urlParams = new URLSearchParams(window.location.search);
    let bookId = urlParams.get('bookId');
    console.log(bookId);
    let book = books.find(book => book.id === bookId);
    console.log(book);

    document.getElementById("bookCoverImg").src = book.coverUrl;
    document.getElementById("bookTitle").innerHTML = book.title;
    document.getElementById("bookPublisher").innerHTML = book.publisher;
    document.getElementById("bookAuthor").innerHTML = book.author;
    document.getElementById("bookCategory").innerHTML = book.category;
    document.getElementById("bookDescription").innerHTML = book.description;

}
