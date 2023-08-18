import React, { useState } from 'react';
import PropTypes from 'prop-types';

import css from '../styles.module.css';

export const Searchbar = ({ changeKeyWord }) => {
  const [keyWord, setKeyWord] = useState('');

  const handleChange = event => {
    setKeyWord(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    changeKeyWord(keyWord.trim());
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          value={keyWord}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos.."
          onChange={handleChange}
        />

        <button type="submit" className={css.submitBtn}>
          <span>Search</span>
        </button>
      </form>
    </header>
  );
};
  

Searchbar.propTypes = {
  changeKeyWord: PropTypes.func.isRequired,
};
