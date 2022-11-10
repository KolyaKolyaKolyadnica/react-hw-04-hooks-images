import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

const apiAttributes = {
  KEY: '29580630-b4d6d43b83d12c4d9cbbf2fc9',
  PER_PAGE: 12,
};
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    request: '',
    foundImages: [],
    imagesPage: 1,
    status: Status.IDLE,
    error: '',
    showModal: false,
    imageOnModal: null,
  };

  startSearchImages = ({ searchingWord }) => {
    this.fetchImages(searchingWord, 1);

    this.setState({ request: searchingWord, foundImages: [], imagesPage: 1 });
  };

  fetchImages = (searchingWord, page) => {
    const { KEY, PER_PAGE } = apiAttributes;

    this.setState({ status: Status.PENDING });

    setTimeout(() => {
      //
      // Только для теста!!! В финальном варианте вырезать начиная от сюда:
      //

      fetch(
        `https://pixabay.com/api/?key=${KEY}&q=${searchingWord}&page=${page}&per_page=${PER_PAGE}`
      )
        .then(response => {
          console.log('response ', response);
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`Не удалось найти картинки по запросу ${searchingWord}`)
          );
        })
        .then(newImages => {
          // console.log('dass');
          this.setState(prevState => ({
            foundImages: [...prevState.foundImages, ...newImages.hits],
            status: Status.RESOLVED,
          }));
        })
        .catch(error => {
          this.setState({ error: error.message, status: Status.REJECTED });
        });

      //
      // Только для теста!!! Заканчивая тут!!!
      //
    }, 500);
  };

  loadMoreImages = () => {
    const { request, imagesPage } = this.state;

    this.fetchImages(request, imagesPage + 1);

    this.setState(prevState => ({
      imagesPage: prevState.imagesPage + 1,
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState,
    }));
  };

  getLargeImage = e => {
    this.setState({
      imageOnModal: e.target.dataset.largeImage,
      showModal: true,
    });
  };

  render() {
    const { foundImages, status, error, showModal, imageOnModal } = this.state;

    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={this.startSearchImages} />
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.startSearchImages} />
          {foundImages.length > 0 && <ImageGallery images={foundImages} />}
          <Loader />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.startSearchImages} />
          <ImageGallery
            images={foundImages}
            getIdChosenImg={this.getLargeImage}
          />
          {foundImages.length >= apiAttributes.PER_PAGE && (
            <Button onClickLoadMoreButton={this.loadMoreImages} />
          )}

          {showModal && (
            <Modal onClose={this.toggleModal} image={imageOnModal} />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Searchbar onSubmit={this.startSearchImages} />
          <div>
            <p>Йой, щось зламалось... Помилка: {error}</p>
            <p>Oops, something broke... Error: {error}</p>
            <p>Ой, что-то сломалось... Ошибка: {error}</p>
          </div>
        </>
      );
    }
  }
}

export default App;
