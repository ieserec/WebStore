import React from 'react';
import { Link} from "react-router-dom";
import withContext from "../../../withContext";
 
class Servicios extends React.Component {
	constructor(props){
        super(props);
    }
	render() {
		const { services } = this.props.context;
		return(
			<>
				<div className="hero is-primarys">
				<div className="hero-body">
					<h4 className="title tamleta">Nuestros Servicios</h4>
				</div>
				</div>
		        <div className="album bg-light">
				    <div className="hero-body container" >
					<div className="row">
					{services && services.length ? (
						services.map((service) => (
							<div className="col-md-4 animacion" key={service.id}>
							<div className="card mb-4 shadow-sm">
							<div className="card-body">
								<p className="card-text"> <b>{service.name} </b></p>
								<div>
								{service.description}
							  	</div>
							  </div>
							<Link to={{
									pathname: `/subservice/${service.id}`,
									state: {imagen: service.imagen,
											nombre:service.name}
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
	  	</>
		)
	}
}
 
export default withContext(Servicios);