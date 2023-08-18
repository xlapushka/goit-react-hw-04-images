import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';

import css from '../styles.module.css';


const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    }

});

  const handleEscape = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    return createPortal(
      <div className={css.modal} onClick={handleClick}>
        <div className={css.modalContent}>{children}</div>
      </div>,
      modalRoot
    );
  }


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};



