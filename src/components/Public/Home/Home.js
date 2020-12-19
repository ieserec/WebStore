import React from 'react';
 
import Slider from './Slider';
import Servicios from '../Servicios/Servicios';
import Nosotros from '../Nosotros/Nosotros'
import Contacto from '../contacto/Contacto';

class Home extends React.Component {
 
	render() {
 
		return(
			<>
			<main role="main" className="flex-shrink-0 ">
		  	        <Slider /> 
		  	        <Servicios />
					<Nosotros/>
					<Contacto/>
	  		</main>

		</>
			  
		)
	}
}
 
export default Home;