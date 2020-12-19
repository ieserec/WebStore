import React, { Component } from "react";
import withContext from "../../../withContext";
import { Redirect } from "react-router-dom";
import firebase from 'firebase';
//import axios from 'axios';

const initState = {
  name: "",
  price: "",
  mprice:"",
  stock: "",
  shortDesc: "",
  description: "",
  imagen:"",
  picture:"",
  fileup:"",
  defaul:"",
  tipo:"",
  modelo:[],
  class:"visible",
  servicio:"",
  subservicio:""

};

class AddProduct extends Component {
  constructor(props) {
    
    super(props);
    this.state = initState;
  }

  componentDidMount(){
    if(this.props.match.params.id){
      if(this.props.match.params.id!=='crear'){
        try{
          this.setState({
            id:this.props.location.state.producto.id,
            name: this.props.location.state.producto.name,
            price: this.props.location.state.producto.price,
            stock: this.props.location.state.producto.stock,
            shortDesc: this.props.location.state.producto.shortDesc,
            description: this.props.location.state.producto.description,
            picture:this.props.location.state.producto.imagen,
            imagen:"",
            fileup:"",
            default:this.props.location.state.producto.imagen,
            mprice:this.props.location.state.producto.mprice,
            tipo:this.props.location.state.producto.tipo,
          })
        }catch(error){
          window.location.href="/store"
        }
        
      }else{
        this.setState({
          id:"",
          name: "",
          price: "",
          stock: "",
          shortDesc:"",
          description: "",
          picture:"",
          imagen:"",
          fileup:"",
          default:"",
          mprice:"",
          tipo:""
        })
      }
     
    }
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
    const { name, price, stock, shortDesc, description,  servicio,subservicio } = this.state;

    if (name && price) {
      var id ="";
      if(this.props.match.params.id!=='crear'){
        id = this.props.location.state.producto.id
      }else{
        id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      }
      if(this.state.fileup!==""){
        const storageRef = firebase.storage().ref(`/ProductImages/${id}`); 
        const uploadTask = storageRef.put(this.state.fileup); 
        
          uploadTask.on('state_changed', snapshot =>{ 
            console.log("Guardando imagen")
          }, error=> {console.log(error); 
          }, ()=>{ 
              uploadTask.snapshot.ref.getDownloadURL().then( 
                  function(downloadURL) { 
                      console.log(downloadURL)
                      firebase.firestore().collection("products").doc(id).set({
                          name : name, 
                          price : price, 
                          stock : stock, 
                          shortDesc : shortDesc, 
                          description:description,
                          imagen:downloadURL,
                          servicio:servicio,
                          subservicio:subservicio
                      }).then(function(){
                        window.location.href="/store"    
                      })
                  });
          });
  
      }else{
        firebase.firestore().collection("products").doc(id).set({
          name : name, 
          price : price, 
          stock : stock, 
          shortDesc : shortDesc, 
          description:description,
          imagen: this.state.default,
          servicio:servicio,
          subservicio:subservicio
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
          this.props.context.addProduct(
            {
              name,
              price,
              shortDesc,
              description,
              imagen:this.state.default,
              stock: stock || 0,
              servicio:servicio,
              subservicio:subservicio
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

  handleSelected = e =>{
    this.setState({ [e.target.name]: e.target.value, error: "" })
    const thisa= this
    firebase.firestore().collection("subservice").where("servicio", "==", e.target.value).onSnapshot(function(querySnapshot) {
      thisa.setState({
        modelo:[]
      })
      querySnapshot.forEach(function(doc) {
        thisa.setState({
        modelo: thisa.state.modelo.concat({id:doc.id, ...doc.data()})
         })});
      });
    this.setState({
      class:""
    })
  } 

  render() {
    const { name, price,mprice, stock, shortDesc, description,tipo,modelo } = this.state;
    const { user } = this.props.context;
    const { services } = this.props.context;
    return !(user && user.accessLevel < 1) ? (
      <Redirect to="/store" />
    ) : (
      <>
        <div className="hero is-primarys ">
          <div className="hero-body container">
            <h4 className="title tamleta">Add Product</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
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
                <label className="label">Product Name: </label>
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
                <label className="label">Precio: </label>
                <input
                  className="input"
                  type="number"
                  name="mprice"
                  value={mprice}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Precio publico: </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Disponible en Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={this.handleChange}
                />
              </div>
              
              <div>
              <div>
                <label><b>
                  Servicios</b></label>
              </div>
              <select className="custom-select dimension" name="servicio" onChange={this.handleSelected}> 
              <option value="0" >Elegir...</option>
                {
                  services.map(task => {
                  return(
                    <option key={task.id} value={task.id}>{task.name}</option>
                  )})
                }
              </select>
              <div>
                <label><b>
                  Sub-Servicios</b></label>
              </div>
              <select className="custom-select dimension" name="subservicio" onChange={this.handleChange}>
              <option value="0">Elegir...</option>
                {
                  modelo.map(task => {
                  return(
                    <option key={task.id} value={task.id}>{task.name}</option>
                  )})
                }
              </select>
              </div>
              <div className="field">
                <label className="label">Descripción corta: </label>
                <input
                  className="input"
                  type="text"
                  name="shortDesc"
                  value={shortDesc}
                  onChange={this.handleChange}
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
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withContext(AddProduct);