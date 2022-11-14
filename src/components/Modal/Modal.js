import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import style from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    });
  }

  clickOnOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={style.overlay} onClick={this.clickOnOverlay}>
        <div className={style.modal}>
          <img src={this.props.image} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
