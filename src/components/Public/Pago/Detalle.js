import React, { Component } from "react";
import withContext from "../../../withContext";
import { Redirect, Link } from "react-router-dom";
import Item from "./Item";


const Factura = props => 
{
  

  let usrinf = localStorage.getItem("usrinf");
  usrinf = usrinf ? JSON.parse(usrinf) : null;
  let now= new Date();
  var mes= parseFloat(now.getMonth())+parseFloat(1);
  var fecha=now.getFullYear()+'/'+mes+'/'+now.getDate();
  const { cart } = props.context;
  const { price } = props.context;
  const cartKeys = Object.keys(cart || []);
  console.log(cart)
  console.log(cartKeys)
  return usrinf ? ( 
    <>
      <div className="hero is-primarys">
      <div className="hero-body container">
            <h4 className="title tamleta">Detalle</h4>
          </div>
      </div>
      <br />
      <div className="containerb">
      <div className="media spad">
            <div className="tmed">
                  Cliente: {usrinf.nombre} {usrinf.apellido}
            </div>
          <div className="tmed" >
                Ced: {usrinf.cedula}
          </div>
        </div>   
        <div className="media spad">
            <div className="tmed">
                 Dir: {usrinf.pridireccion}
            </div>
          <div className="tmed" >
                Telf: {usrinf.pricontacto}
          </div>
        </div>   
        <div className="media spad">
            <div className="tmed">
                 Fecha: {fecha}
            </div>
          <div className="tmed" >
                Correo: {usrinf.correo}
          </div>
        </div>   
        <div className="media ">
            <div className="tnprod">
                <b style={{ textTransform: "capitalize" }}>
                  PRODUCTO
                </b>
            </div>
            <b className="tpiprod">P. Unit</b>
            <b className="tpiprod">Cantidad</b>
            <b className="tpiprod" >
            P. Total
            </b>
        </div>
        {cartKeys.length ? (
          <div>
            {cartKeys.map(key => (
              <Item
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
                addToCart={props.context.addToCart}
                lessToCart={props.context.lessToCart}
              />
            ))}
            <div className="media spad">
            <div className="tdesprod">
               <b>
                   Subtotal
               </b>
            </div>
          <div className="tptprod" >
           $ {(price/parseFloat(1.12)).toFixed(2)}
          </div>
        </div>
        <div className="media spad">
            <div className="tdesprod">
               <b>
                Iva 12%
               </b>
            </div>
          <div className="tptprod" >
           $ {(price-price/parseFloat(1.12)).toFixed(2)}
          </div>
        </div>
        <div className="media spad">
            <div className="tdesprod">
               <b>
                   Total
               </b>
            </div>
          <div className="tptprod" >
           $ {((price/parseFloat(1.12))*parseFloat(1.12)).toFixed(2)}
          </div>
        </div>
        
              <br />
              <div className="form-row distribucion">
                <button
                  onClick={props.context.clearCart}
                  className="tpuidp button is-warning tamlet ">
                  Cancelar Pedido
                </button>{" "}
                <button
                  onClick={props.context.confirmarpedido}
                  className="tpuidp button is-success tamlet">
                  Confirmar Pedido
                </button>{" "}
              </div>
            </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light">No item in cart!</div>
          </div>
        )}
         </div>
    </>
  ): (
    <Redirect to="/products" />
  );
};

export default withContext(Factura);