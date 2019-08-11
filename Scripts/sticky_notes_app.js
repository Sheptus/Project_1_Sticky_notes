//? Sticky Note app 

const STICKY_NOTES_DOM = {
    create_sticky_notes_form: document.getElementById("fromInputs"),
    sticky_note_task_name: document.getElementById("noteTaskName"),
    sticky_note_due_date: document.getElementById("noteDueDate"),
    sticky_note_due_time: document.getElementById("noteDueTime"),
    sticky_note_data: document.getElementById("note_cards_data"),
    stikcy_note_id: document.getElementsByClassName("noteId"),
}

let arrayOfData = [{
    // sticky_note_task_name: "Cleaning 2nd floor",
    // sticky_note_due_date: "02/08/2019",
    // sticky_note_due_time: "10:30",
    // stikcy_note_id: "wee223  ",
}]

let arrayOfDelNoteData = [{}]

const NoteId = []

// console.log(arrayOfData);
// console.log(STICKY_NOTES_DOM);


//!creatingStickyNote
function creatingStickyNote(stickyNote) {
    const {
        sticky_note_task_name,
        sticky_note_due_date,
        sticky_note_due_time,
    } = stickyNote;

    if (!sticky_note_task_name || !sticky_note_due_date || !sticky_note_due_time) return;


    // const uid = "note" + (new Date()).getMilliseconds() + Math.floor(Math.random(36));
    // while (document.getElementById(uid))
    //     id += 1;
    // // alert(uid)



    const cardNoteHolder = document.createElement("div");
    cardNoteHolder.setAttribute("class", "card-deck"),
        cardNoteHolder.style.width = "18rem";

    const cardNoteBody = document.createElement("div");
    cardNoteBody.id = "note" // newid //uid
    cardNoteBody.setAttribute("class", "card mb-4 main_card_style noteId");
    // cardNoteBody.addEventListener("mouseover", delBtn);


    const cardNoteTaskName = document.createElement("p");
    cardNoteTaskName.setAttribute("class", "card-body card-text text-muted task_text task_name");
    cardNoteTaskName.innerText = "Task Description: " + sticky_note_task_name;

    const cardNoteDueDate = document.createElement("div");
    cardNoteDueDate.setAttribute("class", "card-footer card-text text-muted task_date");
    cardNoteDueDate.innerText = "Due Date: " + sticky_note_due_date;

    const cardNoteDueTime = document.createElement("p");
    cardNoteDueTime.setAttribute("class", "card-footer card-text task_time");
    cardNoteDueTime.innerText = "Due time: " + sticky_note_due_time;


    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fas fa-trash-alt fa-4x red-text pr-3" aria-hidden="true"></i>';
    delBtn.className = "btn btn-link";
    delBtn.setAttribute("id", "noteDelBtn")
    delBtn.addEventListener("click", deleteNoteHandler);


    $(document).ready(function () {
        $('.uid').hover(function () {
            $('#noteDelBtn').show();
        }, function () {
            $('#noteDelBtn').hide();
        });
    });

    const cardNoteDelBtn = document.createElement("p");
    cardNoteDelBtn.append(delBtn)

    cardNoteBody.append(
        cardNoteTaskName,
        cardNoteDueDate,
        cardNoteDueTime,
        cardNoteDelBtn,
    );

    // console.log(cardNoteBody)

    return cardNoteBody;

}


// $(".card mb-4").hover(function(){
//     $('.noteDelBtn').show();
// },function(){
//     $('.noteDelBtn').hide();
// });

// function delBtnHover() {
//     let btn = document.getElementsByClassName("main_card_style");
//     if (btn.style.display === "none") {
//         btn.style.display = "block";
//     } else {
//         btn.style.display = "none";
//     }
// }


function clearNotes() {
    STICKY_NOTES_DOM.sticky_note_data.innerText = " ";
}

//?\\ Draw function //?\\
function draw(arrayOfData) {
    clearNotes()
    for (let index = 0; index < arrayOfData.length; index++) {
        drawStickyNote(arrayOfData[index]);
    }
}

//?\\ Draw Sticky Note function //?\\
function drawStickyNote(stickyNotes) {
    const {
        sticky_note_data
    } = STICKY_NOTES_DOM
    const stickyNoteCard = creatingStickyNote(stickyNotes);
    if (!stickyNoteCard) return;
    sticky_note_data.append(stickyNoteCard)
}


// //*~~~find Index Func~~~*\\
// function findIndex(data, id) {
//     // for (let index = 0; index < data.length; index++);
//     //  {
//     for (let index = 0; index < data.length; index++) {
//         if (data[index].sticky_note_task_name === id) {
//             // if (data[index].sticky_note_task_name === id) 
//             return index;
//         }
//     }
// }

function findIndex(data, id) {
    for (let index = 0; index < data.length; index++) {
        if (data[index].sticky_note_task_name === id) {
            return index
        }
        console.log(index)

    }
}


//*~~~Delete Sticky Note~~~*\\
function delStickyNote(id) {
    const index = findIndex(arrayOfData, id);
    if (id === undefined) return;
    arrayOfData.splice(index, 1);
    storingDeletedNotes("deletedNotes", arrayOfDelNoteData);
    draw(arrayOfDelNoteData);
    saveToLocalStorage("stickyNoteData", arrayOfData);
    draw(arrayOfData);
}


//*~~~Delete Btn Event Listener~~~*\\
function deleteNoteHandler() {
    delStickyNote(this.parentElement.parentElement.id)
}

// // $(document).ready(function(){
//     $("div").mouseover(function(){
//     $("div").css("visible");
//     });



//todo\\~~Saving the Card by pushing the inputs to the Dom~~//todo\\
function saveStickyNote() {
    const {
        sticky_note_task_name,
        sticky_note_due_date,
        sticky_note_due_time,
        create_sticky_notes_form,
    } = STICKY_NOTES_DOM;
    const result = validateStickyNote(sticky_note_task_name);
    if (result !== undefined) {
        alert("note with this discreptions ready Exist");
        return;
    }

    console.log(result)

    arrayOfData.push(
        new StickyNote(
            sticky_note_task_name.value,
            sticky_note_due_date.value,
            sticky_note_due_time.value,
        )
    );

    saveToLocalStorage("stickyNoteData", arrayOfData);
    draw(arrayOfData);
    create_sticky_notes_form.reset();
    console.log(StickyNote)
}

// console.log(saveStickyNote())

//?~~Creating Validation Sticky Note Function~~?\\
function validateStickyNote(sn) {
    return findIndex(arrayOfData, sn);
}



function StickyNote(_task, _date, _time) {
    this.sticky_note_task_name = _task;
    this.sticky_note_due_date = _date;
    this.sticky_note_due_time = _time;
    // this.selected = false;
}


//* Setup Global Function to save Data the Local Storage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function storingDeletedNotes(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


//* initiallize the Local Storage function
// converting arrayOfData text into a JavaScript object --> [] !!!
function initSaveNotes() {
    arrayOfData = JSON.parse(localStorage.getItem("stickyNoteData"))
    draw(arrayOfData);
}

function initDelNote() {
    arrayOfDelNoteData = JSON.parse(localStorage.getItem("deletedNotes"))
    draw(arrayOfDelNoteData);
}

initSaveNotes()

// // //todo\\~~creating func dateIso~~//todo\\
//     function dateId() {
//         let timestamp = new Date();
//         let dateID = timestamp.toISOString();

//         return dateID;

//     }

// console.log(dateId())



// const dateId = function () {
//     var id = "note" + (new Date()).getMilliseconds() + Math.floor(Math.random(36));
//     // or use any random number generator
//     // whatever prefix can be used instead of "item"
//     while (document.getElementById(id))
//         id += 1;
//     alert(id)
//     console.log(id)
// }

// var newid = "note" + (new Date()).getMilliseconds() + Math.floor(Math.random(36));
// // or use any random number generator
// // whatever prefix can be used instead of "item"
// while (document.getElementById(id))
//     id += 1;
// alert(id)
// //# set id right here so that no element can get that id between the check and setting it

// console.log(id)

