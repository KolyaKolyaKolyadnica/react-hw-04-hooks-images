import ImageGalleryItem from '../ImageGalleryItem';
import style from './ImageGallery.module.css';

function ImageGallery({ images, getIdChosenImg }) {
  console.log('images ', images);

  return (
    <ul className={style.gallery}>
      <ImageGalleryItem images={images} getIdChosenImg={getIdChosenImg} />
    </ul>
  );
}

export default ImageGallery;
