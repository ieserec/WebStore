import React from "react";

const CartItem = props => {
  const { cartItem, cartKey } = props;
  const { product, amount } = cartItem;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image tam28">
              <img
                src={product.imagen}
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b className="tamlet" style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary tamlet">${product.price}</span>
            </b>
            <div className="tamlet" >{product.shortDesc}</div>
            <label>
              <span className="tag is-primary tamlet" 
              onClick={() => props.lessToCart(cartKey)}
              >- </span>
              <small className="tamlet" >{`    ${amount} in cart     `}</small>
              <span className="tag is-primary tamlet"
             onClick={() => props.addToCart({
              id: product.id,
              product,
              amount: 1
            }) 
              }
              > +</span>
            </label>
          </div>
          <div className="media-right">
          <div
            onClick={() => props.removeFromCart(cartKey)}
          >
            <span className="delete is-large tamlet"></span>
          </div>
          <div className="tag is-second tamlet">
            $ {parseFloat(product.price)*parseFloat(amount)}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;