const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '20958387-96a830a6962a2a719bbaccdc5';

export default class PicsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchPictures() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    
        const response = await fetch(url);
        const pictures = await response.json();
        this.incrementPage();

        return pictures.hits;
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