import { useState } from 'react';
import style from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const onSubmitForm = e => {
    e.preventDefault();

    if (query.trim() === '') {
      alert('Треба, щось ввести у поле.');
      return;
    }

    onSubmit(query);

    setQuery('');
  };

  return (
    <header className={style.searchbar}>
      <form className={style.form} onSubmit={onSubmitForm}>
        <button type="submit" className={style.button}>
          <span className={style.buttonLabel}>Search</span>
        </button>

        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setQuery(e.target.value)}
          value={query}

          // Паттерн временный, может будет время разобраться
          // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
      </form>
    </header>
  );
}

export default Searchbar;
