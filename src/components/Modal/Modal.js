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

  componentDidUpdate() {}

  render() {
    return createPortal(
      <div className={style.overlay}>
        <div className={style.modal}>
          <img src={this.props.image} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
