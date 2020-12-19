import React from "react";
import withContext from "../../../withContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Cart = props => {
  const { cart } = props.context;
  const { price } = props.context;
  const cartKeys = Object.keys(cart || []);
  return (
    <>
      <div className="hero is-primarys">
        <div className="hero-body container">
          <h1 className="title tamleta">My Cart</h1>
        </div>
        <div className="hero-bodys container">
          <h5 className="title tamleta">$ {price}</h5>
        </div>
      </div>
      <br />
      <div>
        {cartKeys.length ? (
          <div className="column columns is-multiline">
            {cartKeys.map(key => (
              <CartItem
                cartKey={key}
                key={key}
                cartItem={cart[key]}
                removeFromCart={props.context.removeFromCart}
                addToCart={props.context.addToCart}
                lessToCart={props.context.lessToCart}
              />
            ))}
            <div className="column is-12 is-clearfix">
              <br />
              <div className="is-pulled-right">
                <button
                  onClick={props.context.clearCart}
                  className="button is-warning tamlet"
                >
                  Clear cart
                </button>{" "}
                <Link to="/info" className="button is-success tamlet">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="column">
            <div className="title has-text-grey-light tamleta">No item in cart!</div>
          </div>
        )}
      </div>
    </>
  );
}

export default withContext(Cart);