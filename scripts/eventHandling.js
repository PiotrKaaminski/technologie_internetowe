
let eventTile = document.getElementById("event-tile");
let eventContent = eventTile.getElementsByClassName("event-content");

let dayOfWeek = new Date().getDay();
fetch('./resources/booksOfDay.json')
    .then((response) => response.json())
    .then((json) => showEvent(json))

function showEvent(booksOfDay) {
    let bookOfDay = booksOfDay.booksOfDay.find((e) => e.dayOfWeek === dayOfWeek)
    console.log(bookOfDay)

    eventContent[0].innerHTML = "Książka <b>" + bookOfDay.title + "</b> autora <b>" + bookOfDay.author + "</b> jest dzisiaj najchętniej czytana! Sprawdź już teraz.";
    eventTile.style.visibility = "visible";
}

function hideEventTile() {
    let eventTile = document.getElementById("event-tile");
    eventTile.style.visibility = "hidden";
}