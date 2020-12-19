import React, { Component } from "react";
import { Link} from "react-router-dom";
import withContext from "../../../withContext";

class Informacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      apellido: "",
      pridireccion: "",
      segdireccion: "",
      pricontacto: "",
      segcontacto:"",
      provincia:"",
      ciudad:"",
      cedula:"",
      correo:"",
      user:null
    };
  }

  handleChange = e =>{
    this.setState({ [e.target.name]: e.target.value, error: "" });
  }

  async componentDidMount() {
    let usrinf = localStorage.getItem("usrinf");
    usrinf = usrinf ? JSON.parse(usrinf) : null;
    if(usrinf!==null){
      this.setState({
        nombre: usrinf.nombre,
        apellido: usrinf.apellido,
        pridireccion: usrinf.pridireccion,
        segdireccion: usrinf.segdireccion,
        pricontacto: usrinf.pricontacto,
        segcontacto:usrinf.segcontacto,
        provincia:usrinf.provincia,
        ciudad:usrinf.ciudad,
        cedula: usrinf.cedula,
        correo:usrinf.correo
  
      });
    }
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    if(user!==null){
      this.setState({
        user
      });
    }
  }

  info = (e) => {
    e.preventDefault();
    const {nombre,apellido,pridireccion,segdireccion,pricontacto,segcontacto,provincia,ciudad,cedula,correo} = this.state;

    if (!nombre || !apellido || !pridireccion || 
      !pricontacto || !provincia || !ciudad || !cedula || !correo) {
      return this.setState({ error: "Campos vacios!" });
    }
    this.props.context.userinfo(nombre,apellido,pridireccion,segdireccion,pricontacto,segcontacto,provincia,ciudad,cedula,correo)
    
  };

  render() {
    return (
      <>
     <div className="hero is-primarys">
          <div className="hero-body container">
            <h4 className="title tamleta">Informacion</h4>
          </div>
        </div>
        <br />
        <div className=" containera">
        {!this.state.user ? (
          <div>
            <div className=" form-row distribucion">
          <label>
            Realizar pedido con su cuenta de usuario?    
          </label>
          <Link to="/login" className="button is-primary is-outlined is-pulled-right">
            Iniciar Sesion
            </Link>
          </div>
            <br/>
          </div>
         ) : (
          <label></label>                  
        )}
        
  <form onSubmit={this.info}>
  <div className="form-row">
    <div className="form-group col-md-6">
    <label htmlFor="inputState">*Nombre</label>
      <input type="text" className="form-control"
      name="nombre"
      defaultValue={this.state.nombre}
      onChange={this.handleChange} placeholder="Nombre"/>
    </div>
    <div className="form-group col-md-6">
    <label htmlFor="inputState">*Apellido</label>
      <input type="text" className="form-control" 
      name="apellido"
      defaultValue={this.state.apellido}
      onChange={this.handleChange} placeholder="Apellido"/>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="inputState">*Correo</label>
      <input type="text" className="form-control"
      name="correo"
      defaultValue={this.state.correo}
      onChange={this.handleChange} placeholder="Correo"/>
    </div>
  <div className="form-group">
    <label htmlFor="inputState">*Cedula</label>
      <input type="number" className="form-control"
      name="cedula"
      defaultValue={this.state.cedula}
      onChange={this.handleChange} placeholder="Cedula"/>
    </div>
    <div className="form-row">
    <div className="form-group col-md-6">
    <label htmlFor="inputState">*Contacto 1</label>
      <input type="number" className="form-control" 
      name="pricontacto"
      defaultValue={this.state.pricontacto}
      onChange={this.handleChange}
      placeholder="# Contacto 1"/>
    </div>
    <div className="form-group col-md-6">
    <label htmlFor="inputState">Contacto 2 (Opcional)</label>
      <input type="number" className="form-control" 
      name="segcontacto"
      defaultValue={this.state.segcontacto}
      onChange={this.handleChange}
       placeholder="# Contacto 2"/>
    </div>
  </div>
 
  <div className="form-group">
  <label htmlFor="inputState">*Direccion 1</label>
    <input type="text" className="form-control" 
    name="pridireccion"
    defaultValue={this.state.pridireccion}
    onChange={this.handleChange}
    placeholder="Direccion 1"/>
  </div>
  <div className="form-group">
  <label htmlFor="inputState">Direccion 2 (Opcional)</label>
    <input type="text" className="form-control" 
    name="segdireccion"
    defaultValue={this.state.segdireccion}
    onChange={this.handleChange} placeholder="Direccion 2"/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="inputState">*Provincia</label>
      <select
      value={this.state.provincia}
      name="provincia"
      onChange={this.handleChange}
      className="form-control">
        <option value="0">Choose...</option>
        <option value="azuay">Azuay</option>
        <option value="bolivar">Bolivar</option>
        <option value="cañar">Cañar</option>
        <option value="chimborazo">Chimborazo</option>
        <option value="cotopaxi">Cotopaxi</option>
        <option value="oro">El Oro</option>
        <option value="esmeraldas">Esmeraldas</option>
        <option value="guayas">Guayas</option>
        <option value="imbabura">Imbabura</option>
        <option value="loja">Loja</option>
        <option value="rios">Los Rios</option>
        <option value="manabi">Manabi</option>
        <option value="morona">Morona Santiago</option>
        <option value="napo">Napo</option>
        <option value="orellana">Orellana</option>
        <option value="pastaza">Pastaza</option>
        <option value="pichincha">Pichincha</option>
        <option value="santaelena">Santa Elena</option>
        <option value="santodomingo">Santo Domingo</option>
        <option value="sucumbios">Sucumbios</option>
        <option value="tungurahua">Tungurahua</option>
        <option value="zamora">Zamora Chinchipe</option>
      </select>
    </div>
    <div className="form-group col-md-6">
    <label htmlFor="inputState">*Ciudad</label>
      <input type="text" className="form-control" 
      name="ciudad"
      defaultValue={this.state.ciudad}
      onChange={this.handleChange}
      placeholder="Ciudad"/>
    </div>
  </div>
  {this.state.error && (
      <div className="has-text-danger">{this.state.error}</div>
  )} 
 <div className="form-row distribucion">
  <Link to="/cart" className="button is-warning ">
       Volver
    </Link>
  <button onClick={this.info} className="button is-success ">
    Siguiente
  </button>
</div>        
</form>
<br />

</div>
      </>
    ) ;
  }
}

export default withContext(Informacion);