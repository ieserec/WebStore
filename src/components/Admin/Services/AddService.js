import React, { Component } from "react";
import withContext from "../../../withContext";
import { Redirect } from "react-router-dom";
import { Link} from "react-router-dom";
import firebase from 'firebase';
import agregar from '../../../assets/imagenes/servicio.jfif'
const initState = {
  name: "",
  description: "",
  imagen:"",
  picture:"",
  fileup:"",
  subservices:{},
  agregar:agregar,
  user:null
};

class AddService extends Component {
  constructor(props) {
    
    super(props);
    this.state = initState;
    this._isMounted = false;
  }

  componentDidMount(){
    this._isMounted = true;
   

      if(this.props.match.params.tipo==='service'){
        if(this.props.match.params.id!=='crear'){
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
            try{
              this.setState({
                id:this.props.location.state.service.id,
                name: this.props.location.state.service.name,
                description: this.props.location.state.service.description,
                picture:this.props.location.state.service.imagen,
                imagen:"",
                fileup:"",
              })
            }catch(error){
              window.location.href="/store"
            }
          }else{
            console.log("crear")
            this.setState({
              id:"",
              name: "",
              description: "",
              picture:"",
              imagen:"",
              fileup:"",
            })
          }
          
      }else{
        if(this.props.match.params.id!=='crear'){
          var subserv = localStorage.getItem("subservicio");
          subserv = subserv ? JSON.parse(subserv) : null;
          if(subserv){
            this.setState({
              id:subserv.id,
              name: subserv.name,
              description: subserv.description,
              picture:subserv.imagen,
              imagen:"",
              fileup:"",
            })
  
        }else{
          this.setState({
            id:"",
            name: "",
            description: "",
            picture:"",
            imagen:"",
            fileup:"",
          })
        }
       }
      }
  }

  componentWillUnmount() {
    this._isMounted = false;
 }
  
  handleUpload = event =>{ 
    const file= event.target.files[0];
    let reader = new FileReader();

    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(file);

    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function(){
         document.getElementById("img_cargada").src=reader.result;
    }
      this.setState({ picture: file,fileup: file});
    }


  save = async (e) => {
    e.preventDefault();
    const { name, description } = this.state;

    if (name) {
      var id ="";
      if(this.props.match.params.id!=='crear'){
        id = this.props.location.state.service.id
      }else{
        id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      }
      if(this.state.fileup!==""){
        const storageRef = firebase.storage().ref(`/ServiceImages/${id}`); 
        const uploadTask = storageRef.put(this.state.fileup); 
        
          uploadTask.on('state_changed', snapshot =>{ 
            console.log("Guardando imagen")
          }, error=> {console.log(error); 
          }, ()=>{ 
              uploadTask.snapshot.ref.getDownloadURL().then( 
                  function(downloadURL) { 
                      console.log(downloadURL)
                      firebase.firestore().collection("service").doc(id).set({
                          name : name, 
                          description:description,
                          imagen:downloadURL
                      }).then(function(){
                        window.location.href="/store"    
                      })
                  });
          });
  
      }else{
        firebase.firestore().collection("service").doc(id).set({
          name : name, 
          description:description,
          imagen: this.state.default
          })
          .then(function() {
              console.log("Document successfully written!");
              window.location.href="/store"        
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
      }

        if(this.props.match.params.id!=='crear'){
          this.props.context.addService(
            {
              name,
              description,
              imagen:this.state.default,
            },
            () => this.setState(initState)
          );
          this.setState(
            { flash: { status: 'is-success', msg: 'Product created successfully' }}
          );
              
        }else{
          this.setState(
            { flash: { status: 'is-success', msg: 'Product edited successfully' }}
          );
          this.setState(initState)
        }
    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name and price' }}
      );
    }
  };

  savesub = async (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    if (name) {
      var servid ="";
      var subserv = localStorage.getItem("servicesub");
        subserv = subserv ? JSON.parse(subserv) : null;
        if(subserv!==null){
          servid=subserv.id;
        }
      var id ="";
      if(this.props.match.params.id!=='crear'){
        id = this.props.location.state.service.id
      }else{
        id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      }

      if(this.state.fileup!==""){
        const storageRef = firebase.storage().ref(`/ServiceImages/${id}`); 
        const uploadTask = storageRef.put(this.state.fileup); 
        
          uploadTask.on('state_changed', snapshot =>{ 
            console.log("Guardando imagen")
          }, error=> {console.log(error); 
          }, ()=>{ 
              uploadTask.snapshot.ref.getDownloadURL().then( 
                  function(downloadURL) { 
                      console.log(downloadURL)
                      firebase.firestore().collection("subservice").doc(id).set({
                          name : name, 
                          servicio:servid,
                          description:description,
                          imagen:downloadURL
                      }).then(function(){
                        window.location.href="/store"    
                      })
                  });
          });
  
      }else{
        firebase.firestore().collection("subservice").doc(id).set({
          name : name, 
          description:description,
          servicio:servid,
          imagen: this.state.default
          })
          .then(function() {
              console.log("Document successfully written!");
              window.location.href="/store"        
          })
          .catch(function(error) {
              console.error("Error writing document: ", error);
          });
      }

        if(this.props.match.params.id!=='crear'){
          this.props.context.addSubservice(
            {
              name,
              description,
              servicio:servid,
              imagen:this.state.default,          
            },
            () => this.setState(initState)
          );
          this.setState(
            { flash: { status: 'is-success', msg: 'Product created successfully' }}
          );
              
        }else{
          this.setState(
            { flash: { status: 'is-success', msg: 'Product edited successfully' }}
          );
          this.setState(initState)
        }
    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name and price' }}
      );
    }
  };
  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { name, description, subservices } = this.state;
    var user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    var subserv = localStorage.getItem("servicesub");
    subserv = subserv ? JSON.parse(subserv) : null;
    return !(user && user.accessLevel < 1) ? (
      <div>
        Prueba
      </div>
      ) : (
      <>
        <div className="hero is-primarys ">
          <div className="hero-body container">
          {this.props.match.params.tipo==="service" ? (
            <h4 className="title tamleta">Servicio</h4>
          ):(
            <h4 className="title tamleta">Sub Servicio</h4>
          )}
            
          </div>
        </div>
        <br />

        <form onSubmit={this.savesub}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
        
            <div id="div_img_carreraedi">
             <img id="img_cargada" src={this.state.picture} ></img>
                <div id="filebtn">
                    <div id="div_file">
                        <p id="texto">Subir Imagen</p>
                        <input 
                            id="cargarimagen"
                            type="file" 
                            required
                            onChange={this.handleUpload}
                        />
                    </div>        
                  </div>                              
                </div>       
                <div className="field">
                {subserv!==null && this.props.match.params.tipo==="subservice" && (
                <div>
                  <label className="label">Servicio: </label>
                  <label className="label">{subserv.name} </label>
                </div>
                )}
                  </div>  
              <div className="field">
                <label className="label">Nombre: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Descripcion: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
              {this.props.match.params.tipo==="service" ? (
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              ):(
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.savesub}
                >
                  Submit
                </button>
              )}
                
              </div>
            </div>
          </div>
        </form>
        <br />
        {this.props.match.params.tipo==="service" && this.props.match.params.id!=="crear" && (
          <div>
            		<div className="hero is-primarys">
				<div >
					<h4 className="title tamleta">Sub Servicios</h4>
				</div>
				</div>
		        <div className="album py-5 bg-light">
				    <div className=" container" >
					<div className="row">
					<div className="col-md-4" >
							<div className="card mb-4 shadow-sm"
                onClick={() =>{
                  const subserv={
                    id:this.props.location.state.service.id,
                    name: this.props.location.state.service.name,
                  }
                localStorage.setItem("servicesub", JSON.stringify(subserv));
                window.location.href="/add-service/subservice/crear"    
              }}>
								<img className="img-service" src={this.state.agregar}/>
							  <div className="card-body">
								<p className="card-text"> <b>AGREGAR SUBSERVICIO </b></p>
							  </div>
							</div>
						  </div>
					{subservices && subservices.length ? (
						subservices.map((service) => (
							<div className="col-md-4" key={service.id}>
							<div className="card mb-4 shadow-sm" >
                <div onClick={() =>{
                  const subservicio={
                    id:service.id,
                    name: service.name,
                    description: service.description,
                    imagen: service.imagen
                  }
                localStorage.setItem("subservicio", JSON.stringify(subservicio));
                window.location.href=`/add-service/subservice/${service.id}`    
                }}>
                    <img className="img-service" src={service.imagen} />
                </div>
							  <div className="card-body">
								<p className="card-text"> <b>{service.name} </b></p>
								<div>
								{service.description}
							  	</div>
								<div className="d-flex justify-content-between align-items-center">
								  <div className="btn-group">
                    <div className="is-clearfix">
                      <button onClick={() =>{
                          firebase.firestore().collection("subservice").doc(service.id).delete().then(function(){
                          window.location.href="/services"    
                      })
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
	 
          </div>
        ) }
        
      </>
    );
  }
}

export default withContext(AddService);