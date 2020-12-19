import React from "react";
import ProductItema from "./ProductItema";
import withContext from "../../../withContext";
import { Redirect } from "react-router-dom";

const CrudProduct = props => {
  const { products } = props.context;
  const { user } = props.context;
  return !(user && user.accessLevel < 1) ? (
    <Redirect to="/products" />
  ) : (
    <>
      <div className="hero is-primarys">
        <div className="hero-body container">
          <h4 className="title tamleta">Mis Productos</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItema
                product={product}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(CrudProduct);