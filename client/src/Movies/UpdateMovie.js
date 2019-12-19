import React, { Component } from 'react';
import axios from 'axios';


class UpdateMovie extends Component {
  state = {
    title: '',
    director: '',
    actor: '',
    metaScore: '',
    stars: []

  };

  handleAddStars = () => {
    const { stars } = this.state;
    stars.push(this.state.actor);
    this.setState({ actor: '', stars });
  };

  handleInput = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitMovie = () => {
    const { stars, title, metascore, director } = this.state;
    const newMovie = { stars, title, metascore, director, id : this.props.match.params.id };
    axios
    .put(`http://localhost:5000/api/movies/${this.props.match.params.id}`, newMovie)
      .then(response => {
        console.log(response);
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h1>Update Movie Info</h1>
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={this.state.title}
          onChange={this.handleInput}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={this.state.director}
          onChange={this.handleInput}         
        />
        <input
          type="text"
          name="metascore"
          placeholder="Metascore"
          value={this.state.metascore}
          onChange={this.handleInput}          
        />
        <input
          type="text"
          name="actor"
          placeholder="Add Actor"
          value={this.state.actor}
          onChange={this.handleInput}          
        />

        <button onClick={this.handleAddStars}>Add Actor</button>
        <button onClick={this.handleSubmitMovie}>Save Movie</button>
        {this.state.stars.map(stars => {
          return <div>{ stars }</div>;
        })}
      </div>
    );
  }
}

export default UpdateMovie;