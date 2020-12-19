import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import withContext from "../../../withContext";
import firebase from 'firebase';

class MisVentas extends Component {
  constructor(props) {
    super(props);
    this.state={
      pedidos:[]
    }
    this._isMounted = false;

  }

  async componentDidMount() {
    this._isMounted = false;

    const thisa=this;
     firebase.firestore().collection("venta").onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        thisa.setState({
          pedidos: thisa.state.pedidos.concat({uid:doc.id, ...doc.data()})
         })
        });
      });
  }

  render() {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    const { pedidos } = this.state;
    return !(user && user.accessLevel < 1) ? (
      <Redirect to="/products" />
      ) : (
        <>
        <div className="hero is-primarys">
          <div className="hero-body container">
            <h1 className="title tamleta">Mis Ventas </h1>
          </div>
        </div>
        <br />
        <div className="containerc">
          {pedidos.length ? (
            <div className="column columns is-multiline">
                <div className="media pad">
                    <span className="tpuidp">
                    Usuario
                    </span>
                    <span className="tpuidp">
                    Fecha
                    </span>
                    <span className="tpuidp">
                    telefono
                    </span>
                    <span className="tpuidp">
                    correo
                    </span>
                    <span className="tpuidp">
                        Valor
                    </span>
                    <span className="tpuidp">
                        Pago/ Entrega
                    </span>
                                    
                    </div>
              {pedidos.map(pedido => (
                <div key={pedido.uid}>
                   <div className="box">
                    <div className="media pad">
                      
                        <Link  className="tpuidp" to={{
                            pathname: `/ventas/${pedido.uid}`,
                            state: {pedido:{...pedido}}
                        }}>
                        <span>
                        {pedido.userinfo.nombre} {pedido.userinfo.apellido}
                        </span>

                        </Link>
                        <span className="tpuidp">
                        {pedido.fecha}
                        </span>
                        <span className="tpuidp">
                        {pedido.userinfo.pricontacto}
                        </span>
                        <span className="tpuidp">
                        {pedido.userinfo.correo}
                        </span>
                        <span className="tpuidp">
                          $ {pedido.total}
                        </span>
                        <span className="tpuidp">
                          {pedido.infopago.formapago}/ {pedido.infopago.formaentrega}
                        </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="column">
              <div className="title has-text-grey-light tamleta">No hay ventas!</div>
            </div>
          )}
        </div>
      </> );
 }
}

export default withContext(MisVentas);