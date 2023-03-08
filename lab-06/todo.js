(() => {
    "use strict";

function addItem(text, done) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    label.textContent = text;
    input.type = "checkbox";
    input.checked = done;
    input.id = `todo${todo.querySelectorAll('li').length + 1}`;
    input.addEventListener('input', ev => {
        saveToStorage();
    });
    label.htmlFor = input.id;
    //button
    const button = document.createElement('button');
    button.textContent = "x";
    button.addEventListener('click', ev => {
        item.remove();
        saveToStorage();
    });
    item.appendChild(input);
    item.appendChild(label);
    item.appendChild(button);
    todo.appendChild(item);
}

add.addEventListener('click', ev => {
    if(text.value) { //check data is in text field
        addItem(text.value);
        text.value = null; //clear the input
        text.focus(); //give it the focus
        saveToStorage();
    }
});

function clearList() {
    while(todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }
}

clear.addEventListener('click', ev => {
    if(confirm("Are you sure you want to delete the entire list?")) {
        clearList();
        saveToStorage();
    }
});

text.addEventListener('keydown', ev => {
    if(ev.key == "Enter") {
        add.click();
    }
});

[
    {text: "Study learning materials",done: true},
    {text: "Complete lab exercises", done: false},
    {text: "Attend lab sessions", done:false},
    {text: "Conduct self-directed research", done: false},
    {text: "Ask questions", done: false}
]

function saveToStorage() {
	const elements = Array.from(todo.querySelectorAll('li'));
	const data = elements.map(el => {
		 return {
       text: el.querySelector('label').textContent,
			 done: el.querySelector('input').checked
		 }
	});
	localStorage.setItem(todo.id, JSON.stringify(data));
}

function loadFromStorage() {
	const data = JSON.parse(localStorage.getItem(todo.id));
	if(data) {
		clearList();
		for (const item of data) {
			addItem(item.text, item.done);
		}
	}
}

loadFromStorage();
})()