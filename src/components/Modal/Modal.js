import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, image }) {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });
  }, []);

  const clickOnOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={style.overlay} onClick={clickOnOverlay}>
      <div className={style.modal}>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
