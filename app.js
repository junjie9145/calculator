//dec var
const display = document.querySelector('.display-txt');
const numberButtons = document.querySelectorAll('.number-btn');
const clearAll = document.querySelector('.clear');
let displayNumber = '';




//update display
let numArray = [];
numberButtons.forEach(button => { 
    button.addEventListener('click', function() {  
        numArray.push(button.textContent);
        if (numArray.length >10) {
            numArray.slice(0, 9);
            return numArray;
        }
        displayNumber = numArray.join('');
        display.textContent = displayNumber;
        console.table(numArray);
    })
})
// delete button
const deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', ()=>{
    numArray = numArray.splice(-1, 1);
    console.table(numArray);
})


//clear all function
const clear = () => {
    numArray = [];
    displayNumber = '';
    display.textContent = '';
}
clearAll.addEventListener('click', clear);