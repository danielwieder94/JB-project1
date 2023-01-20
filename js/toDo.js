noteArray = [];
const notesContainer = document.getElementById("notes");

const checkForData = () => {
  console.log(localStorage.getItem("noteData"));
  noteArray = JSON.parse(localStorage.getItem("noteData"));
  console.log(noteArray);
  addNote();
};

Date.prototype.getNewDate = function () {
  let myDate = this.toLocaleDateString(noteDate).split("/");
  // myDate = myDate.split("/");
  return `${myDate[1]}/${myDate[0]}/${myDate[2]}`;
};

// const prettifyDate = () => {
//   let myDate = new Date(noteDate.value).toLocaleDateString();
//   let newDate = myDate.split("/");
//   return `${newDate[1]}/${newDate[0]}/${newDate[2]}`;
// };

const deleteItem = (element, newNote) => {
  element.remove();
  noteArray = noteArray.filter((item) => item.element !== element);
  localStorage.removeItem("newNote");
  newNote.element = null;
  console.log(noteArray);
};

const addNote = () => {
  const noteText = document.getElementById("noteText").value;
  const noteDate = document.getElementById("noteDate").value;
  const noteTime = document.getElementById("noteTime").value;

  //Create note and its content
  const newNote = {
    text: noteText,
    noteDate: noteDate,
    noteTime: noteTime,
    element: document.createElement("div"),
  };
  newNote.element.classList.add("note");

  const noteTextWrap = document.createElement("div");
  noteTextWrap.classList.add("textWrap");

  const newNoteText = document.createElement("div");
  newNoteText.classList.add("noteText");
  newNoteText.innerHTML = noteText;
  noteTextWrap.appendChild(newNoteText);
  newNote.element.appendChild(noteTextWrap);

  const newNoteDate = document.createElement("div");
  newNoteDate.classList.add("date");
  newNoteDate.innerHTML = `${getNewDate(this)}`;
  newNote.element.appendChild(newNoteDate);

  const newNoteTime = document.createElement("div");
  newNoteTime.classList.add("time");
  newNoteTime.innerHTML = noteTime;
  newNote.element.appendChild(newNoteTime);

  //create delete option
  const deleteNote = document.createElement("button");
  deleteNote.classList.add("deleteNote");
  deleteNote.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  deleteNote.addEventListener("click", () => {
    deleteItem(newNote.element, newNote);
  });
  newNote.element.appendChild(deleteNote);

  notesContainer.appendChild(newNote.element);
  noteArray.push(newNote);
  console.log(noteArray);
  localStorage.setItem("noteData", JSON.stringify(noteArray));
  document.getElementById("noteForm").reset();
};
