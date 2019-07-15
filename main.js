// data.
var header = new Subject('Untitled Note');
var description = new Subject('Greetings from Mynote dev. ' + greetings());
// type Note = { id: number, text: string, children?: Content }
// type Content = (Note | Placeholder)[]
// type Placeholder = null;
var content = [null];


// gensym.
var symCounter = 0;
var symBuffer = [];
function gensym() {
    if (symBuffer && symBuffer.length) {
        return symBuffer.shift();
    } else {
        return symCounter++;
    }
}
function putback(sym) {
    symBuffer.unshift(sym);
}

function makeField(className, hook, onSave, onCancel) {
    var res = document.createElement('div');
    res.setAttribute('class', 'editable ' + className);
    res.setAttribute('id', 'field-' + gensym());

    var text;
    var form;

    // text.
    text = document.createElement('div');
    text.innerHTML = hook.value;
    text.ondblclick = function () {
        text.style.setProperty('display', 'none', 'important');
        form.style.removeProperty('display');
    }

    // editor.
    form = document.createElement('form');
    {
        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        var submit = document.createElement('input');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', 'Save');
        var reset = document.createElement('input');
        reset.setAttribute('type', 'submit');
        reset.setAttribute('value', 'Reset');
        var cancel = document.createElement('input');
        cancel.setAttribute('type', 'submit');
        cancel.setAttribute('value', 'Cancel');
        submit.onclick = function (e) {
            e.preventDefault();
            onSave(hook, text, input, submit, cancel);
            text.style.removeProperty('display');
            form.style.setProperty('display', 'none', 'important');
        }
        reset.onclick = function (e) {
            e.preventDefault();
            input.value = hook.value;
        }
        cancel.onclick = function (e) {
            e.preventDefault();
            onCancel(hook, text, input, submit, cancel);
            text.style.removeProperty('display');
            form.style.setProperty('display', 'none', 'important');
        }
    }
    form.append(input, submit, reset, cancel);
    form.style.setProperty('display', 'none', 'important');

    res.append(text, form);

    return res;
}
function clearChild(element) {
    for (var _i = 0; _i < element.childNodes.length; _i++) {
        element.removeChild(element.childNodes[_i]);
    }
}

// stuff for controlling rendering.
// basically we avoid updating the whole stuff by manually tracking all the
// *parent* node so that we can `appendChild` new nodes directly, without
// doing DOM.

// main.
var mainElem = document.getElementById('main');

// header & desc hook.
var headerElem = makeField(
    "header",
    header,
    function (hook, text, input, submit, cancel) {
        header.next(input.value);
    },
    function () {}
);
var descriptionElem = makeField(
    "description",
    description,
    function (form, text, input, submit, cancel) {
        description.next(input.value);
    },
    function () {}
);
var headerSubscription = header.subscribe({
    onValue: function (newValue) {
        headerElem.children[0].innerHTML = newValue || '&nbsp;';
    }
});
var descriptionSubscription = description.subscribe({
    onValue: function (newValue) {
        descriptionElem.children[0].innerHTML = newValue || '&nbsp;';
    }
});


// content field.
function makeContentField(hook, config) {
    var form = document.createElement('form');

    // toolbox.
    var toolbox = document.createElement('div');
    {
        // leftshift.
        var leftshift = document.createElement('input');
        leftshift.setAttribute('type', 'submit');
        leftshift.setAttribute('value', '<<');
        // rightshift.
        var rightshift = document.createElement('input');
        rightshift.setAttribute('type', 'submit');
        rightshift.setAttribute('value', '>>');
        // move up.
        var moveup = document.createElement('input');
        moveup.setAttribute('type', 'input');
        moveup.setAttribute('value', '↑');
        // move down.
        var movedown = document.createElement('input');
        movedown.setAttribute('type', 'input');
        movedown.setAttribute('value', '↓');
        // remove.
        var remove = document.createElement('input');
        remove.setAttribute('type', 'input');
        remove.setAttribute('value', 'Remove');
    }
    // completing toolbox.
    toolbox.append(leftshift, rightshift, moveup, movedown, remove);

    // editor.
    var editor = document.createElement('div');
    {
        // text.
        var text = document.createElement('div');

    }

}


// content hook.
var contentElement = [];



function renderNote() {

}

function importNote() {
}

function exportNote() {

}

function exportNoteAsMarkdown() {

}


function greetings() {
    var hour = new Date().getHours();
    return (
        (2 <= hour && hour <= 9)? 'Hope you have a good day :) '
        : (9 < hour && hour <= 12)? 'Keep up with your good work :)'
        : (12 < hour && hour <= 14)? 'Please, have a nice noon break :)'
        : (14 < hour && hour <= 18)? 'Keep up with your good work :)'
        : (18 < hour && hour <= 21)? 'Hope you have a good evening :)'
        : (21 < hour && hour < 24) || (0 < hour && hour <= 2)? 'Hope you have a good night :)'
        : ':)'
    );
}

// refresh.
function refresh() {
    clearChild(mainElem);
    mainElem.append(headerElem, descriptionElem);
    renderNote();
}
refresh();

