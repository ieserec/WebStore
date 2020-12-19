import React from 'react';
import { Link} from "react-router-dom";
import withContext from "../../../withContext";
import firebase from 'firebase';
import Products from './Products';

class Subservices extends React.Component {
	constructor(props){
        super(props);
        this.state={
            subservices:[],
            serv:{
                id:this.props.match.params.id,
				tipo:"servicio"
			},
			imagen:"",
			nombre:""

        }
    }

    componentDidMount(){
        this._isMounted = true;
            if(this.props.match.params.id){
              const thisa= this
              firebase.firestore().collection("subservice").where("servicio", "==", this.props.match.params.id).onSnapshot(function(querySnapshot) {
                thisa.setState({
                  subservices:[]
                })
                querySnapshot.forEach(function(doc) {
                  thisa.setState({
                  subservices: thisa.state.subservices.concat({id:doc.id, ...doc.data()})
                   })});
                });
		  
			
			
			}
			this.setState({
				imagen:this.props.location.state.imagen,
				nombre:this.props.location.state.nombre,
			})
      }

      componentWillUnmount() {
        this._isMounted = false;
     }

	render() {
        const { subservices, serv } = this.state;
		return(
			<>
				<div className="hero is-primarys">
				<div className="hero-body">
					<h4 className="title tamleta">{this.state.nombre}</h4>
				</div>
				</div>
		        <div className="album bg-light" >
				    <div className="hero-body container" >
					<div className="row">
					{subservices && subservices.length ? (
						subservices.map((service) => (
							<div className="col-md-4" key={service.id}>
							<div className="card mb-4 shadow-sm">
							<div className="card-body">
								<p className="card-text"> <b>{service.name} </b></p>
								<div>
								{service.description}
							  	</div>
							  </div>
							<Link to={{
									pathname: `/subproducts/${service.id}`,
									state: {imagen: service.imagen,
										nombre: service.name}
								}}>
								  <img className="img-service" src={service.imagen} />
								</Link>
							 
							</div>
						  </div>
						))
					) : (
						<div className="column">
						<span className="title has-text-grey-light">
							No services found!
						</span>
						</div>
					)}
					</div>
				</div>
			</div>
			<div className="hero is-primarys">
				<div className="hero-body">
					<h4 className="title tamleta">Productos</h4>
				</div>
				</div>
                <Products servicio={serv} />
          </>
		)
	}
}
 
export default withContext(Subservices);