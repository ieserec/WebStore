import React from "react";
import { Link} from "react-router-dom";


const ProductItem = props => {
  const { product } = props;
  return (
    <div className=" column is-half container">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image tam">
              <img
                src={product.imagen}
                alt={product.shortDesc}
              />
              <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open(product.imagen);}} >ver imagen</Link> 
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }} className="tamlet">
              {product.name}{" "}
              <span className="tag is-primary tamlet">${product.price}</span>
            </b>
            <div className="tamlet">{product.shortDesc}</div>
            {product.stock > 0 ? (
              <small className="tamlet">{product.stock + " Available"}</small>
            ) : (
              <small className=" tamlet has-text-danger">Out Of Stock</small>
            )}
            <div className="is-clearfix">
              <button
                className=" tamlet button is-small is-outlined is-primary   is-pulled-right"
                onClick={() =>
                  props.addToCart({
                    id: product.id,
                    product,
                    amount: 1
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;