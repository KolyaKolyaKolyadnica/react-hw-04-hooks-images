class ImageApiService {
  constructor() {
    this.URL = `https://pixabay.com/api`;
    this.KEY = '29580630-b4d6d43b83d12c4d9cbbf2fc9';
    this.page = 1;
    this.perPage = 12;

    this.query = '';
  }

  fetchImages(searchingWord) {
    this.query = searchingWord;

    const fetchImages = fetch(
      `${this.URL}/?key=${this.KEY}&q=${this.query}&page=${this.page}&per_page=${this.perPage}`
    );

    return fetchImages;
  }
}

export default ImageApiService;
