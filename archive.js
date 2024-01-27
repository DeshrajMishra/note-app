import { renderNotes } from "./app.js";

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

let showArchiveNotes = document.querySelector(".archive-notes-container");

showArchiveNotes.addEventListener("click", (e) => {
    let type = e.target.dataset.type;
    let noteId = e.target.dataset.id;

    switch(type){
        case "del":
            arrayOfNotes = arrayOfNotes.filter(({id}) => id.toString() !== noteId);
            showArchiveNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isArchived}) => isArchived));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "archive":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note, isArchived: !note.isArchived} : note);
            showArchiveNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isArchived}) => !isArchived));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
    }
});

showArchiveNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isArchived}) => isArchived));