import React from "react";

const Item = props => {
  const { cartItem, cartKey } = props;
  const { product, amount } = cartItem;

  return (
    <div className="bordera">
        <div className="media   pad">
            <div className="tnprod">
                <span>
                {product.name}{" "}
                </span>
                <div>{product.shortDesc}</div>
            </div>
            <span className="tpiprod">$ {(product.price/parseFloat(1.12)).toFixed(3)}</span>
            <label className="tpiprod">
              <span> {amount}</span>
            </label>
          <div className="tpiprod" >
            $ {(parseFloat(product.price)*parseFloat(amount)/parseFloat(1.12)).toFixed(2)}
          </div>
        </div>
    </div>
  );
};

export default Item;