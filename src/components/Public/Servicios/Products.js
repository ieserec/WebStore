import React from 'react';
import { Link} from "react-router-dom";
import withContext from "../../../withContext";
import firebase from 'firebase';
import ProductItem from '../Product/ProductItem'
class Products extends React.Component {
	constructor(props){
        super(props);
        this.state={
            product:[]
        }
    }

    componentDidMount(){
        this._isMounted = true;
        const thisa= this
          if(this.props.servicio.tipo==="servicio"){
              firebase.firestore().collection("products").where("servicio", "==", this.props.servicio.id).onSnapshot(function(querySnapshot) {
                thisa.setState({
                  product:[]
                })
                querySnapshot.forEach(function(doc) {
                  thisa.setState({
                    product: thisa.state.product.concat({id:doc.id, ...doc.data()})
                   })});
                });
          }else{
            firebase.firestore().collection("products").where("subservicio", "==", this.props.servicio.id).onSnapshot(function(querySnapshot) {
                thisa.setState({
                  product:[]
                })
                querySnapshot.forEach(function(doc) {
                  thisa.setState({
                    product: thisa.state.product.concat({id:doc.id, ...doc.data()})
                   })});
                });
          }
      }
      
      componentWillUnmount() {
        this._isMounted = false;
     }

	render() {
		const { product } = this.state;
		return(
			<>
		
                <div  className=" container" >
                <div className="column columns is-multiline">
                {product && product.length ? (
                    product.map((producto, index) => (
                    <ProductItem
                        product={producto}
                        key={index}
                        addToCart={this.props.context.addToCart}
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
		)
	}
}
 
export default withContext(Products);