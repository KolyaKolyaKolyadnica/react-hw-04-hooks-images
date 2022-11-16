import style from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image, getChosenImg }) {
  return (
    <li className={style.galleryItem}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        onClick={getChosenImg}
        id={image.id}
        data-large-image={image.largeImageURL}
      />
    </li>
  );
}

export default ImageGalleryItem;
