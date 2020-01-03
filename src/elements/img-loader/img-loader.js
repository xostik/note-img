import './img-loader.scss';
import {createElementFromHTML} from '../../utils/dom';
import {Note} from '../note/note';

const template = `
    <div class="img-loader">
        <input type="file" class="img-loader__input" multiple accept="image/*" name="img"/>
        
        <div class="img-preview">
            <img class="img-preview__img" src="data:image/png;base64,ii">
            <div class="img-preview__img-overlay"></div>
        </div>
    </div>
    
`;

export class ImgLoader{
    constructor(){
        this._initElements();
        this._initHandlers();
    }

    getElement() {
        return this.element;
    }

    adaptImgPosition() {
        let wrapW = this.previewElement.clientWidth;
        let wrapH = this.previewElement.clientHeight;
        let imgW = this.imgElement.clientWidth;
        let imgH = this.imgElement.clientHeight;

        if (wrapH === 0 || imgH === 0) {
            return;
        }

        if (wrapW > imgW) {
            this.imgElement.style.left = ((wrapW - imgW) / 2) + 'px';

        } else {
            this.imgElement.style.left = 0;
        }

        if (wrapH > imgH) {
            this.imgElement.style.top = ((wrapH - imgH) / 2) + 'px';

        } else {
            this.imgElement.style.top = 0;
        }

        this.imgOverlayElement.style.width = imgW + 'px';
        this.imgOverlayElement.style.height = imgH + 'px';
        this.imgOverlayElement.style.left = this.imgElement.style.left;
        this.imgOverlayElement.style.top = this.imgElement.style.top;
    }

    addNote(x, y) {
        let note = new Note();
        let relativeX = x * 100 / this.imgOverlayElement.clientWidth;
        let relativeY = y * 100 / this.imgOverlayElement.clientHeight;

        this.imgOverlayElement.appendChild(note.getElement());

        note.setPosition(relativeX, relativeY);
        note.setFocus();
    }

    _initElements() {
        this.element = createElementFromHTML(template);
        this.previewElement = this.element.querySelector('.img-preview');
        this.imgElement = this.element.querySelector('.img-preview__img');
        this.imgOverlayElement = this.element.querySelector('.img-preview__img-overlay');
        this.inputElement = this.element.querySelector('.img-loader__input');
    }

    _initHandlers() {
        this.imgOverlayElement.onclick = (event) => {
            if (event.target === this.imgOverlayElement) {
                this.addNote(event.offsetX, event.offsetY);
            }
        };

        this.inputElement.onchange  = () => {
            const input = this.inputElement;

            if (input.files && input.files[0]) {
                if (input.files[0].type.match('image.*')) {
                    var reader = new FileReader();

                    reader.onload = (e) => {
                        this.imgElement.src = e.target.result;
                        this._setPreviewMode();
                    };

                    reader.readAsDataURL(input.files[0]);

                } else {
                    console.log('ошибка, не изображение');
                }
            }
        };

        this.imgElement.onload = () => {
            this.adaptImgPosition();
        };
    }

    _setPreviewMode() {
        this.element.classList.add('note_preview-mode');
    }
}