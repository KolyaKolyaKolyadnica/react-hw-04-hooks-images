import { useState, useEffect } from 'react';
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

function App() {
  const [foundImages, setFoundImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  // const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageOnModal, setImageOnModal] = useState(null);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query !== null) {
      api.startSearchingNewQuery();
      fetchImages();
    }
  }, [query]);

  const startSearchImages = newQuery => {
    if (query === newQuery) {
      toast.info(
        `Я і так показую картинки за запитом: "${query}". Придумай щось новеньке.`
      );
      return;
    }

    setQuery(newQuery);
    setFoundImages([]);
  };

  const loadMoreImages = () => {
    api.loadMore();
    fetchImages();
  };

  const fetchImages = () => {
    setStatus(Status.PENDING);

    api
      .fetchImages(query)
      .then(newImages => {
        setFoundImages([...foundImages, ...newImages.hits]);
        setStatus(Status.RESOLVED);

        if (newImages.hits.length === 0) {
          setStatus(Status.REJECTED);
          toast.info(`Ничего не найдено по запросу "${query}".`);
        }
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        toast.error(`Произошла ОШИБКА!!! А именно: "${error.message}".`);
      });
  };

  // const fetchImages = () => {
  //   setStatus(Status.PENDING);

  //   api
  //     .fetchImages(query)
  //     .then(newImages => {
  //       setFoundImages([...foundImages, ...newImages.hits]);
  //       setStatus(Status.RESOLVED);

  //       if (newImages.hits.length === 0) {
  //         setStatus(Status.REJECTED);
  //         toast.info(`Ничего не найдено по запросу "${query}".`);
  //       }
  //     })
  //     .catch(error => {
  //       setStatus(Status.REJECTED);
  //       toast.error(`Произошла ОШИБКА!!! А именно: "${error.message}".`);
  //     });
  // };

  const getLargeImage = e => {
    setImageOnModal({
      src: e.target.dataset.largeImage,
      alt: e.target.alt,
    });

    setShowModal(!showModal);
  };

  if (status === 'idle') {
    return (
      <>
        <Searchbar onSubmit={startSearchImages} />
      </>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={startSearchImages} />
        {foundImages.length > 0 && <ImageGallery images={foundImages} />}
        <Loader />
      </>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <Searchbar onSubmit={startSearchImages} />
        <ImageGallery images={foundImages} getChosenImg={getLargeImage} />
        {foundImages.length >= api.perPage && (
          <Button onClickLoadMoreButton={loadMoreImages} />
        )}

        {showModal && (
          <Modal
            onClose={() => setShowModal(!showModal)}
            image={imageOnModal}
          />
        )}
        <ToastContainer />
      </>
    );
  }

  if (status === 'rejected') {
    return (
      <>
        <Searchbar onSubmit={startSearchImages} />
        <ToastContainer />
      </>
    );
  }
}

export default App;
