import style from './ImageGalleryItem.module.css';

function ImageGalleryItem({ images, getIdChosenImg }) {
  const imageGalleryItem = images.map(image => {
    return (
      <li className={style.galleryItem} key={image.id}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          onClick={getIdChosenImg}
          id={image.id}
          data-large-image={image.largeImageURL}
        />
      </li>
    );
  });

  return <>{imageGalleryItem}</>;
}

export default ImageGalleryItem;
