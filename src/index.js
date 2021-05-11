import './styles.css';
import _ from "../node_modules/lodash";
import PicsApiService from './js/apiService';
import picsTpl from './templates/picture-cards.hbs';
import LoadMoreBtn from './js/load-more-btn';
import { error } from '../node_modules/@pnotify/core';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '../node_modules/@pnotify/confirm';
import '../node_modules/@pnotify/confirm/dist/PNotifyConfirm.css';


const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
}
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const picsApiService = new PicsApiService();

refs.searchForm.addEventListener('input', _.debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchPictures);

function onSearch(evt) {
    picsApiService.query = evt.target.value;
    if (picsApiService.query === '') {
        error({
            text: 'Enter something in the search field!'
        })
    }

    loadMoreBtn.show();
    picsApiService.resetPage();
    clearGalleryContainer();
    fetchPictures();   
}
console.log(document.documentElement.offsetHeight);
async function fetchPictures() {
    try {
        loadMoreBtn.disable();
        const pictures = await picsApiService.fetchPictures();
        appendPicturesMarkup(pictures);
        
        window.scrollTo({
            top: document.documentElement.offsetHeight,
            behavior: 'smooth',
        })
        loadMoreBtn.enable();
    } catch (error) {
        const name = error.name;
        const message = error.message;
        onFetchError(name, message);
    }
}

function appendPicturesMarkup(pictures) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', picsTpl(pictures));
}

function clearGalleryContainer() {
    refs.galleryContainer.innerHTML = '';
}

function onFetchError(name, message) {
    error({
        title: name,
        text: message,
        modules: new Map([
            [Confirm,
                {
                    confirm: true,
                    buttons: [{
                        text: "Ok",
                        primary: true,
                        click: notice => {
                            notice.close();
                        }
                }]}]
        ])
    })
}