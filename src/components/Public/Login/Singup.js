import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../../../withContext";

class Singup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      pass:""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();
    const { username, password,pass } = this.state;
    if (!username || !password || !pass) {
      return this.setState({ error: "Campos vacios!" });
    }else{
        if(password!==pass){
            return this.setState({ error: "Contrasenas no coinciden!" });
        }
    }
    this.props.context.create(username, password)
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-primarys">
          <div className="hero-body container">
            <h4 className="title tamleta">Crear Cuenta</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.login}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label tamlet">Email: </label>
                <input
                  className="input tamlet"
                  type="email"
                  name="username"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label tamlet">Password: </label>
                <input
                  className="input tamlet"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label tamlet">Repeat Password: </label>
                <input
                  className="input tamlet"
                  type="password"
                  name="pass"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger tamlet">{this.state.error}</div>
              )}
              <div className="field is-clearfix tamlet">
                <button onClick={this.login} 
                  className="button is-primary is-outlined is-pulled-right tamlet">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    ) : (
      <Redirect to="/products" />
    );
  }
}

export default withContext(Singup);