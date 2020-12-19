import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../../../withContext";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Campos vacios!" });
    }
    this.props.context.login(username, password)
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-primarys">
          <div className="hero-body container">
            <h4 className="title tamleta">Login</h4>
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
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <Link to="/singup" variant="body2" className="is-inlined tamlet">
                  {"Sign Up"}
                </Link>
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

export default withContext(Login);