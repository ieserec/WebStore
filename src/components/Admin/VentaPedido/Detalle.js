import React, { Component } from "react";
import withContext from "../../../withContext";
import { Redirect, Link } from "react-router-dom";
import firebase from 'firebase';
import Itema from "./Itema";

class Detalle extends Component {
    constructor(props) {
      super(props);
      this.state={
        pedido:[],
        items:[]
      }
    this._isMounted = false;
    }
  
     componentDidMount() {
      this._isMounted = true;
              if(this.props.match.params.id){
            if(this.props.location.state.pedido){
                this.setState({
                    pedido:this.props.location.state.pedido,
                    items:this.props.location.state.pedido.items
                })
            }
        }
    }
 
    
  vender = async () => {
    if(window.confirm("Esta venta ha sido concluida?")){
      this.props.context.vender(this.state.pedido)
      }
  };

  cancelar =  async () => {
    console.log(this.state.pedido.uid)
    if(window.confirm("Esta seguro de eliminar este pedido?")){
    this.props.context.eliminar(this.state.pedido.uid)
    }
  };

    render() {
        const cart=this.state.pedido
        const user=this.state.pedido.userinfo
        const items=this.state.items
        const cartKeys = Object.keys(items || []);
        const cartKey= Object(items || []);
        const infuser= Object(user || []);
    return ( 
        <>
        <div className="hero is-primarys">
        <div className="hero-body container">
                <h4 className="title tamleta">Factura</h4>
            </div>
        </div>
        <br />
        <div className="containerb">
        <div className="media spad">
                <div className="tmed">
                    Cliente: {infuser.nombre} {infuser.apellido}
                </div>
            <div className="tmed" >
                    Ced: {infuser.nombre} {infuser.apellido}
            </div>
            </div>   
        <div className="media spad">
                <div className="tmed">
                 Fecha: {cart.fecha}
                </div>
            <div className="tmed" >
                    Telf: {infuser.pricontacto}
            </div>
            </div> 
            <div className="media spad">
            <div className="tmed">
            Dir: {infuser.pridireccion} 

            </div>
          <div className="tmed" >
                Correo: {infuser.correo}
          </div>
        </div>   
        <div className="media ">
                <div className="tnprod">
                    <b style={{ textTransform: "capitalize" }}>
                    PRODUCTO
                    </b>
                </div>
                <b className="tpiprod">P. Unit</b>
                <b className="tpiprod"> Cant.</b>
                <b className="tpiprod" >
                P. Total
                </b>
            </div>   
            {cartKeys.length ? (
          <div>
            {cartKeys.map(key => (
                <Itema
                cartKey={key}
                key={key}
                cartItem={cartKey[key]}
              />
            ))}
            <div className="media spad">
            <div className="tdesprod">
               <b>
                   Subtotal
               </b>
            </div>
          <div className="tptprod" >
             $ {(parseFloat(cart.total)/parseFloat(1.12)).toFixed(2)}
          </div>
        </div>
        <div className="media spad">
            <div className="tdesprod">
               <b>
                Iva 12%
               </b>
            </div>
          <div className="tptprod" >
          $ {(parseFloat(cart.total)-parseFloat(cart.total)/parseFloat(1.12)).toFixed(2)}
          </div>
        </div>
        <div className="media spad">
            <div className="tdesprod">
               <b>
                   Total
               </b>
            </div>
          <div className="tptprod" >
          $ {parseFloat(cart.total).toFixed(2)}
          </div>
        </div>
              <br />
              {!(cart.fin==='true') && (
                <div className="form-row distribucion">
                <button
                  onClick={() => this.cancelar()}
                  className="tpuidp button is-warning tamlet ">
                  Cancelar Venta
                </button>{" "}
                <button
                  onClick={() => this.vender()}
                  className="tpuidp button is-success tamlet">
                  Confirmar Venta
                </button>{" "}
              </div>
              )}
            </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No item in cart!</div>
          </div>
        )}
        </div>
            <br/>
        </>
    )
    }
}

export default withContext(Detalle);
