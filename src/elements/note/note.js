import './note.scss';
import { createElementFromHTML } from "../../utils/dom";

const template = `
    <div class="note">
        <div class="note__editor">
            <input type="text" class="note__editor-input">
            <button class="note__ok-button">ok</button>
        </div>
            
         <div class="note__viewer">
            <span class="note__value"></span>
            <button class="note__edit-button">&#9998;</button>
        </div>
    </div>
`;

export class Note {
    constructor(){
        this._initElements();
        this.editMode = true;
        this._initHandlers();
    }

    getElement() {
        return this.element;
    }

    setPosition(x, y) {
        if (x > 90) {
            x = 90;
        }
        this.element.style.left = x + '%';
        this.element.style.top = y + '%';
    }

    setFocus() {
        this.inputElement.focus();
    }

    setEditMode() {
        this.editMode = true;
        this.element.classList.remove('note_view-mode');

        this.setFocus();
    }

    setViewMode() {
        this.viewValueElement.innerHTML = this.inputElement.value;

        this.editMode = false;
        this.element.classList.add('note_view-mode');
    }

    _initElements() {
        this.element = createElementFromHTML(template);
        this.inputElement = this.element.querySelector('.note__editor-input');
        this.okButtonElement = this.element.querySelector('.note__ok-button');
        this.editButtonElement = this.element.querySelector('.note__edit-button');
        this.viewValueElement = this.element.querySelector('.note__value');
    }

    _initHandlers() {
        this.okButtonElement.onclick = (event) => {
            this.setViewMode();
        };

        this.editButtonElement.onclick = (event) => {
            this.setEditMode();
        };
    }
}