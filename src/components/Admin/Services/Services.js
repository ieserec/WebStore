import React from 'react';
import withContext from "../../../withContext";
import { Link} from "react-router-dom";
import firebase from 'firebase';
import agregar from '../../../assets/imagenes/servicio.jfif'

class Services extends React.Component {
	constructor(props){
        super(props);
        this.state={
			agregar:agregar
        };
    }
	render() {
		const { services } = this.props.context;
		return(
			<>
				<div className="hero is-primarys">
				<div >
					<h4 className="title hero-body">Mis Servicios</h4>
				</div>
				</div>
		        <div className="album py-5 bg-light">
				    <div className=" container" >
					<div className="row">
					<div className="col-md-4" >
							<div className="card mb-4 shadow-sm">
								<Link to={{
									pathname: '/add-service/service/crear',
								}}>
								<img className="img-service" src={this.state.agregar}/>
								</Link>
							  <div className="card-body">
								<p className="card-text"> <b>AGREGAR SERVICIO </b></p>
							  </div>
							</div>
						  </div>
						 
					{services && services.length ? (
						services.map((service) => (
							<div className="col-md-4" key={service.id}>
							<div className="card mb-4 shadow-sm">
							<Link className="img-service"  to={{
                                        pathname: `/add-service/service/${service.id}`,
                                        state: {service:{...service}}
                                    }}>
                                       	<img className="img-service" src={service.imagen} />
                                    </Link>
							  <div className="card-body">
								<p className="card-text"> <b>{service.name} </b></p>
								<div>
								{service.description}
							  	</div>
								<div className="d-flex justify-content-between align-items-center">
								  <div className="btn-group">
                                  <div className="is-clearfix">
                                    
                                        <button onClick={() =>{
											firebase.firestore().collection("service").doc(service.id).delete();
											firebase.firestore().collection("subservice").onSnapshot(function(querySnapshot) {
												querySnapshot.forEach(function(doc) {
													console.log(doc.data().servicio)
													console.log(service.id)
													if(doc.data().servicio===service.id){
														firebase.firestore().collection("subservice").doc(doc.id).delete().then(function(){
															//window.location.href="/services"    ;
														})
													}
													});
												});
                                        }}
                                        className="button is-small is-outlined is-primary is-pulled-right">
                                        Eliminar
                                        </button>
                                </div>
								  </div>
								</div>
							  </div>
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
	  	</>
		)
	}
}
 
export default withContext(Services);