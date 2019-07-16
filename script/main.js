// data.
var header = new Subject('Untitled Note');
var description = new Subject('Greetings from Mynote dev. ' + greetings());
// type NoteContent = { id: number, text: string, children?: Note }
// type Note = NoteContent[];
var content = new Subject([]);

function NoteContent() {
    this.id = null;
    this.text = new Subject('');
    this.children = new Subject([]);
}
NoteContent.prototype.subscribe = function (config) {
    this._subscription = {
        text: this.text.subscribe({
            onValue: config.onNewText
        }),
        children: this.text.subscribe({
            onValue: 
        })
    };
}



function Note(init) {
    this.content = [];
}
Note.prototype.


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
        leftshift.onclick = function (e) {
            e.preventDefault();

        }
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
function makeInsertField(hook, onInsert) {

}

// content hook.
var contentElement = [];

function _renderNote(parentHook, parentElem) {
    parentElem.append(parentHook.value.map(function (content) {
        if (content.value.__proto__ === Array.prototype) {
            var r = document.createElement('ul');
            r.setAttribute('id', 'field-' + gensym());
            _renderNote(content, r);
            return r;
        } else {
            return makeContentField(content, {

            })
        }
    }));

    // 在列表末尾添加用于往列表末尾添加新数据的元素。
    parentElem.append(makeInsertField, function (value) {
        parentHook.push(value);
    })
}
function renderNote() {
    
}

function importNote() {
}

function exportNote() {

}

function exportNoteAsMarkdown() {

}



// refresh.
function refresh() {
    clearChild(mainElem);
    mainElem.append(headerElem, descriptionElem);
    renderNote();
}
refresh();


// setting up toolbar.
document.getElementById('toolbar-import').onclick = importNote;
document.getElementById('toolbar-export').onclick = exportNote;
document.getElementById('toolbar-export-md').onclick = exportNoteAsMarkdown;