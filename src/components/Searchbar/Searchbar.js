import { Component } from 'react';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchingWord: '',
  };

  setSearchingWord = e => {
    this.setState({ searchingWord: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.searchingWord.trim() === '') {
      alert('Треба, щось ввести у поле.');
      return;
    }

    this.props.onSubmit(this.state);

    this.setState({ searchingWord: '' });
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.onSubmit}>
          <button type="submit" className={style.button}>
            <span className={style.buttonLabel}>Search</span>
          </button>

          <input
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.setSearchingWord}
            value={this.state.searchingWord}

            // Паттерн временный, может будет время разобраться
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
