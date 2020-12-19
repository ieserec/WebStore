import React from "react";
import { Link} from "react-router-dom";
import firebase from 'firebase';
const ProductItem = props => {
    
  const { product } = props;
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image tam">
              <img
                src={product.imagen}
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">${product.price}</span>
            </b>
            <div>{product.shortDesc}</div>
            {product.stock > 0 ? (
              <small>{product.stock + " Available"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
            <div className="is-clearfix">
                <Link to={{
                    pathname: `/add-product/${product.id}`,
                    state: {producto:{...product}}
                }}>
                    <button
                        className="button is-small is-outlined is-primary   is-pulled-right">
                        Editar
                    </button>
                </Link>
                    <button onClick={() =>{
                        firebase.firestore().collection("products").doc(product.id).delete().then(function(){
                        window.location.href="/crud-product"    
                        })
                    }}
                    className="button is-small is-outlined is-primary is-pulled-right">
                      Eliminar
                    </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  ProductItem;