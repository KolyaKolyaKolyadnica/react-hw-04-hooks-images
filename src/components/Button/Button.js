import style from './Button.module.css';

function Button({ onClickLoadMoreButton }) {
  return (
    <button
      type="button"
      className={style.btn}
      onClick={() => {
        onClickLoadMoreButton();
      }}
    >
      Load More
    </button>
  );
}

export default Button;
