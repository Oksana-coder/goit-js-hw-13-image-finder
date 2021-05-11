const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '20958387-96a830a6962a2a719bbaccdc5';

export default class PicsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPictures() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    
        return fetch(url)
            .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
/* Part of the first index.js connected to apiService.fetchPictures 

function fetchPictures() {
    loadMoreBtn.disable();
    picsApiService.fetchPictures().then(pictures => {
        appendPicturesMarkup(pictures);
        loadMoreBtn.enable();
    })
}
*/