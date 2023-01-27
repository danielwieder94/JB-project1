let noteArray = JSON.parse(localStorage.getItem("noteData")) || [];

const prettifyDate = (noteDate) => {
  newDate = new Date(noteDate).toLocaleDateString();
  myDate = newDate.split("/");
  return `${myDate[1]}/${myDate[0]}/${myDate[2]}`;
};

const insertData = () => {
  const notesContainer = document.getElementById("notes");
  notesContainer.innerHTML = noteArray
    .map((item) => {
      return `<div class="note">
      <span class="deleteNote" onclick="deleteItem(this, ${noteArray.indexOf(
        item
      )})"><i class="fa-solid fa-xmark"></i></span>
      <div class="textWrap">
        <div class="noteText">${item.noteText}</div>
      </div>
      <div class="date">${prettifyDate(item.noteDate)}</div>
      <div class="time">${item.noteTime}</div>
    </div>`;
    })
    .join(""); //to make sure all array elements will show. without join.("") it would show only the first element of the array
};

const deleteItem = (element, index) => {
  element.parentNode.remove();
  noteArray.splice(index, 1);
  localStorage.setItem("noteData", JSON.stringify(noteArray));
};

insertData();
const addNote = () => {
  const note = {
    noteText: document.getElementById("noteText").value,
    noteDate: document.getElementById("noteDate").value,
    noteTime: document.getElementById("noteTime").value,
  };
  noteArray.push(note);
  document.getElementById("noteForm").reset();
  localStorage.setItem("noteData", JSON.stringify(noteArray));
  insertData();
  const lastAddedNote = document.querySelector(".note:last-of-type");
  lastAddedNote.classList.add("new-note");
  setTimeout(() => lastAddedNote.classList.remove("new-note"), 700);
};
