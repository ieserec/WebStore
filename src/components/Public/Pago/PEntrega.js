import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../../../withContext";

class PEntrega extends Component {
  constructor(props) {
    super(props);
    this.state = {
        formaentrega:"",
        formapago:"",
    };
  }

  handleChange = e =>{
    this.setState({ [e.target.name]: e.target.value, error: "" });
  }

  info = (e) => {
    e.preventDefault();
    const {formaentrega,formapago} = this.state;

    if (!formaentrega || !formapago ) {
      return this.setState({ error: "Campos vacios" });
    }
    this.props.context.infopago(formaentrega,formapago)
    
  };

  render() {
    return this.props.context.usrinf ? (
      <>
     <div className="hero is-primarys">
          <div className="hero-body container">
            <h4 className="title tamleta">Forma de Entrega y Pago</h4>
          </div>
        </div>
        <br />
        <div className="containera">
  <form onSubmit={this.info}>
  <label>
    Por favor, seleccione el metodo de entrega preferido para este pedido
</label>
  <fieldset className="form-group">
        <div className="form-check is-inlined">
          <input className="form-check-input " type="radio" onChange={this.handleChange} name="formaentrega" id="acordar" value="acordar"/>
          <label className="form-check-label" htmlFor="acordar">
            Acordar con el vendedor
          </label>
        </div>
  </fieldset>
  <fieldset className="form-group">
  <div className="form-check is-inlined">
          <input className="form-check-input" type="radio" onChange={this.handleChange} name="formaentrega" id="entrega" value="entrega"/>
          <label className="form-check-label" htmlFor="entrega">
            Tarifa de envio
          </label>
        </div>
  </fieldset>
  <fieldset className="form-group">
  <div className="form-check is-inlined">
          <input className="form-check-input" type="radio" onChange={this.handleChange} name="formaentrega" id="retiro" value="retiro"/>
          <label className="form-check-label" htmlFor="retiro">
            Recoger en la tienda
          </label>
        </div>
  </fieldset>
<label>
    Por favor, seleccione el metodo de pago preferido para este pedido
</label>
  <fieldset className="form-group">
        <div className="form-check is-inlined">
          <input className="form-check-input " type="radio" onChange={this.handleChange} name="formapago" id="efectivo" value="efectivo"/>
          <label className="form-check-label" htmlFor="efectivo">
            Pago con entrega
          </label>
        </div>
  </fieldset>
  <fieldset className="form-group">
  <div className="form-check is-inlined">
          <input className="form-check-input" type="radio" onChange={this.handleChange} name="formapago" id="deposito" value="deposito"/>
          <label className="form-check-label" htmlFor="deposito">
            Transferencia Bancaria
          </label>
        </div>
  </fieldset>
  {this.state.error && (
        <div className="has-text-danger">{this.state.error}</div>
    )} 
    <div className="form-row distribucion">
    <Link to="/info" className="button is-warning is-inlined">
       Volver
    </Link>
        <button onClick={this.info} className="button is-success is-outlined">
            Siguiente
        </button>
    </div>
    </form>
 <br/>
</div>
      </>
    ): (
      <Redirect to="/products" />
    );
  }
}

export default withContext(PEntrega);