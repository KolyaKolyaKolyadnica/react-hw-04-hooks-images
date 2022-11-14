import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import Loader from './Loader';

import ImageApiService from 'services/ImageApiService';

const api = new ImageApiService({});

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    foundImages: [],
    status: Status.IDLE,
    error: '',
    showModal: false,
    imageOnModal: null,
  };

  startSearchImages = query => {
    this.setState({
      foundImages: [],
    });

    api.page = 1;

    this.fetchImages(query);
  };

  fetchImages = query => {
    this.setState({
      status: Status.PENDING,
    });

    const fetchImages = api.fetchImages(query);

    setTimeout(() => {
      fetchImages
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          // У Репеты работало от кракозябры. У меня нет.
          // Может это из-за особенности бэка Pixabay?
          // Так или иначе, как мне смоделировать работу этой "нью Эрор"?
          return Promise.reject(
            new Error(
              `При поиске по запросу ${query} с сервера пришел промис с ошибкой.`
            )
          );
        })
        .then(newImages => {
          this.setState(prevState => ({
            foundImages: [...prevState.foundImages, ...newImages.hits],
            status: Status.RESOLVED,
          }));

          // От кракозябры вот эти строки:
          if (newImages.hits.length === 0) {
            this.setState({ status: Status.REJECTED });
            toast(`Ничего не найдено по запросу "${query}".`);
          }
        })
        .catch(error => {
          this.setState({ error: error.message, status: Status.REJECTED });
          toast(`Произошла ОШИБКА!!! А именно: "${error.message}".`);
        });
    }, 300);
  };

  loadMoreImages = () => {
    api.page += 1;

    this.fetchImages(api.query);
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
    const { foundImages, status, showModal, imageOnModal } = this.state;

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
          {foundImages.length >= api.perPage && (
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
          <ToastContainer />
        </>
      );
    }
  }
}

export default App;
