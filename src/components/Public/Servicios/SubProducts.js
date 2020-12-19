import React from 'react';
import withContext from "../../../withContext";
import Products from './Products';

class SubProducts extends React.Component {
	constructor(props){
        super(props);
        this.state={
            serv:{
                id:this.props.match.params.id,
                tipo:"subservicio"
            }
        }
        
    }

    componentDidMount(){
        this.setState({
            imagen:this.props.location.state.imagen,
            nombre:this.props.location.state.nombre,
        })
    }
 
	render() {
        const {serv}=this.state
		return(
			<>
            	<div className="hero is-primarys">
				<div className="hero-body">
					<h4 className="title tamleta">{this.state.nombre}</h4>
				</div>
				</div>
				<Products servicio={serv} />
	  	</>
		)
	}
}
 
export default withContext(SubProducts);