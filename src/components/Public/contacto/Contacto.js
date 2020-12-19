import React from 'react';
 
import Formulario from './formulario/Formulario'; 
import Mapa from './mapa/Mapa'
 
class Contacto extends React.Component {
 
	render() {
 
		return(
			<>
			
					<div className="hero is-primarys">
					<div className="hero-body">
						<h4 className="title tamleta">Contacto</h4>
					</div>
					</div>
					<br/>
				<div className="container ">

            		<div className="row">
            			<div className="col-md-6">
							<Formulario /> 
						</div>
						<div className="col-md-6">
							<Mapa /> 
						</div>
					</div>
				</div>	
	  		</>
		)
	}
}
 
export default Contacto;