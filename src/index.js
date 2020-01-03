import {ImgLoader} from './elements/img-loader/img-loader';
import './styles.scss';

let imgLoader = new ImgLoader();

document.body.appendChild(imgLoader.getElement());

window.addEventListener("resize", () => {
    imgLoader.adaptImgPosition();
}, false);