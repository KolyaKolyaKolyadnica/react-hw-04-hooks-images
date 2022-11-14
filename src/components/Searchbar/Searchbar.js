import { Component } from 'react';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  setquery = e => {
    this.setState({ query: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      alert('Треба, щось ввести у поле.');
      return;
    }

    this.props.onSubmit(this.state.query);

    this.setState({ query: '' });
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
            onChange={this.setquery}
            value={this.state.query}

            // Паттерн временный, может будет время разобраться
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
