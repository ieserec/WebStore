import React from "react";

const Itema = props => {
    const { cartItem, cartKey } = props;
  return (
    <div className="bordera">
        <div className="media   pad">
            <div className="tnprod">
                <span>
                {cartItem.name}{" "}
                </span>
                <div>{cartItem.desc}</div>
            </div>
            <span className="tpiprod">$ {(cartItem.uprice/parseFloat(1.12)).toFixed(3)}</span>
            <label className="tpiprod">
              <span> {cartItem.amount}</span>
            </label>
          <div className="tpiprod" >
            $ {(parseFloat(cartItem.pprice)/parseFloat(1.12)).toFixed(2)}
          </div>
        </div>
    </div>
  );
};

export default Itema;