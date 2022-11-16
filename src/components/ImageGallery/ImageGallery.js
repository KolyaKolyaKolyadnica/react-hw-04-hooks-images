import ImageGalleryItem from '../ImageGalleryItem';
import style from './ImageGallery.module.css';

function ImageGallery({ images, getChosenImg }) {
  return (
    <ul className={style.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          image={image}
          getChosenImg={getChosenImg}
          key={image.id}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
