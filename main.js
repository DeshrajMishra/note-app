import {renderNotes} from "./app.js"

let note = document.querySelector(".note");
let title = document.querySelector(".title");
let noteAddButton = document.querySelector(".add-btn");
let noteDisplay = document.querySelector(".notes-display");
let showOtherNotes = document.querySelector(".notes-container");
let showPinnedNotes = document.querySelector(".pinned-notes-container");
let pinTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");

let arrayOfNotes = JSON.parse(localStorage.getItem("notes")) || [];

if(arrayOfNotes.length > 0){
    pinTitle.classList.toggle("d-none");
    otherTitle.classList.toggle("d-none");
}

noteAddButton.addEventListener("click", () => {
    if (note.value.trim().length > 0 || title.value.trim().length > 0) {
        arrayOfNotes = [...arrayOfNotes, {
            id: Date.now(),
            title: title.value,
            note: note.value,
            isPinned: false,
            isArchived: false
        }];
        note.value = title.value = "";
        localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
    }
    showOtherNotes.innerHTML = renderNotes(arrayOfNotes);
})

showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => isPinned));

noteDisplay.addEventListener("click", (e) => {
    let type = e.target.dataset.type;
    let noteId = e.target.dataset.id;
    
    switch(type){
        case "del":
            arrayOfNotes = arrayOfNotes.filter(({id}) => id.toString() !== noteId);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => isPinned));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));    
            break;
        case "pinned":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note, isPinned: !note.isPinned} : 
            note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            showPinnedNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned}) => isPinned));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
            break;
        case "archive":
            arrayOfNotes = arrayOfNotes.map(note => note.id.toString() === noteId ? {...note, isArchived: !note.isArchived} : note);
            showOtherNotes.innerHTML = renderNotes(arrayOfNotes.filter(({isPinned, isArchived}) => !isPinned && !isArchived));
            localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
    }
})