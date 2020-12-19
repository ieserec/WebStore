import React from 'react';
 
import Jumbotron from './jumbotron/Jumbotron';
import Detalles from './detalles/Detalles'; 
 
 
class Nosotros extends React.Component {
 
	render() {
 
		return(
 
			<>
				<Jumbotron /> 
				<Detalles /> 
	  		</>
 
		)
 
	}
 
}
 
export default Nosotros;