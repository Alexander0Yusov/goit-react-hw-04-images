import { useState } from 'react';
import css from './Searchbar.module.css';
import { CiSearch } from 'react-icons/ci';
import PropTypes from 'prop-types';
// https://react-icons.github.io/react-icons/icons?name=ci

const Searchbar = ({ onSubmit }) => {
  const [queryInput, setQueryInput] = useState('');

  const handleInput = e => {
    setQueryInput(e.target.value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={e => onSubmit(e)}>
        <button className={css.SearchFormButton} type="submit">
          <CiSearch />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => handleInput(e)}
          value={queryInput}
          name="input"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
