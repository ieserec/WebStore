import React from 'react';
//import './Slider.css';
import imguno from '../../../assets/imagenes/logo.png'
import imgdos from '../../../assets/imagenes/logo2.jpeg'
import imgtres from '../../../assets/imagenes/logo3.jpg'
class Slider extends React.Component {
 
	constructor(){
        super();
        this.state={
			pictureuno:imguno,
			picturedos:imgdos,
			picturetres:imgtres
            
        };
    }
  render() {
 
  	return (
 
  		<div id="slider" className="carousel slide" data-ride="carousel">
		    <ol className="carousel-indicators">
		        <li data-target="#slider" data-slide-to="0" className="active"></li>
		        <li data-target="#slider" data-slide-to="1"></li>
		        <li data-target="#slider" data-slide-to="2"></li>
		    </ol>
		    <div className="carousel-inner">
		        <div className="carousel-item active">
					<img className="img-fluida" src={this.state.pictureuno} />
		        </div>
		        <div className="carousel-item">
					<img className="img-fluida" src={this.state.picturedos} />
		        </div>
		        <div className="carousel-item">
		            <img className="img-fluida" src={this.state.picturetres} />
		        </div>
		    </div>
		    <a className="carousel-control-prev" href="#slider" role="button" data-slide="prev">
		        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
		        <span className="sr-only">Previous</span>
		    </a>
		    <a className="carousel-control-next" href="#slider" role="button" data-slide="next">
		        <span className="carousel-control-next-icon" aria-hidden="true"></span>
		        <span className="sr-only">Next</span>
		    </a>
		</div>
 
  	)
    
  }
 
}
 
export default Slider;