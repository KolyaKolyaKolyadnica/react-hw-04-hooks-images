class ImageApiService {
  constructor() {
    this.URL = `https://pixabay.com/api`;
    this.KEY = '29580630-b4d6d43b83d12c4d9cbbf2fc9';
    this.page = 1;
    this.perPage = 12;
  }

  fetchImages(query) {
    return fetch(
      `${this.URL}/?key=${this.KEY}&q=${query}&page=${this.page}&per_page=${this.perPage}`
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
    });
  }

  startSearchingNewQuery() {
    this.page = 1;
  }
  loadMore() {
    this.page += 1;
  }
}

export default ImageApiService;
