import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

import AddProduct from './components/Admin/Products/AddProduct';
import CrudProduct from './components/Admin/Products/CrudProduct';
import Cart from './components/Public/Cart/Cart';
import Login from './components/Public/Login/Login';
import Informacion from './components/Public/Pago/Informacion';

import Home from './components/Public/Home/Home';
import Contacto from './components/Public/contacto/Contacto';
import Nosotros from './components/Public/Nosotros/Nosotros';

import ProductList from './components/Public/Product/ProductList';
import firebase from 'firebase';
import Context from "./Context";
import './App.css'
import PEntrega from "./components/Public/Pago/PEntrega";
import Factura from "./components/Public/Pago/Detalle";
import Singup from "./components/Public/Login/Singup";
import MisPedidos from "./components/Admin/VentaPedido/MisPedidos";
import Detalle from "./components/Admin/VentaPedido/Detalle";
import MisVentas from "./components/Admin/VentaPedido/MisVentas";

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import steps from './components/Chats/config/steps';
import chat_styles from './components/Chats/config/chatstyles'
import botAvatar from './assets/imagenes/bot.jpg'
import Footer from "./components/Public/Home/Footer";
import AddService from "./components/Admin/Services/AddService";
import Services from "./components/Admin/Services/Services";
import Subservices from "./components/Public/Servicios/Subservices"
import Products from "./components/Public/Servicios/Products";
import SubProducts from "./components/Public/Servicios/SubProducts";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      usrinf:null,
      infpago:null,
      cart: {},
      fac: {},
      products: [],
      services: [],
      price:0
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let price = localStorage.getItem("price");
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");
    let fac = localStorage.getItem("fac");
    let usrinf = localStorage.getItem("usrinf");
    let infpago = localStorage.getItem("infpago");
    const thisa= this
    firebase.firestore().collection("products").onSnapshot(function(querySnapshot) {
      thisa.setState({
        product:[]
      })
      querySnapshot.forEach(function(doc) {
          thisa.setState({
          products: thisa.state.products.concat({id:doc.id, ...doc.data()})
         })});
      });
      firebase.firestore().collection("service").onSnapshot(function(querySnapshot) {
        thisa.setState({
          services:[]
        })
        querySnapshot.forEach(function(doc) {
            thisa.setState({
            services: thisa.state.services.concat({id:doc.id, ...doc.data()})
           })});
        });
    user = user ? JSON.parse(user) : null;
    usrinf = usrinf ? JSON.parse(usrinf) : null;
    infpago = infpago ? JSON.parse(infpago) : null;
    cart = cart? JSON.parse(cart) : {};
    fac = fac? JSON.parse(fac) : {};
    price = price? JSON.parse(price) : 0;
    this.setState({ user,usrinf, cart, price, infpago, fac });
  }
  
  login = async (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email,password)       
    .then(result => {
        const user = {
          email:email,
          token: result.user.getIdToken,
          uid: result.user.uid,
          accessLevel: email === 'admin@ieserec.com' ? 0 : 1
        }
        this.setState({ user });
        localStorage.setItem("user", JSON.stringify(user));
        window.alert("Inicio de sesion exitoso")    
        this.routerRef.current.history.push("/");
        return true;
    }).catch(error=> {
        console.log(`Error ${error.code}: ${error.mesage}`)
        if(error.code==="auth/wrong-password"){
            window.alert("Wrong Password")    
            return false;
        }else if(error.code==="auth/user-not-found") {
            window.alert("No existe Usuario")    
            return false;
        }else if(error.code==="auth/invalid-email"){
            window.alert("Ingrese un formato de correo valido")    
            return false;
        }
    });
  }

  create = async (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email,password)       
    .then(result => {
        window.alert("Cuenta creada exitosamente")    
        this.routerRef.current.history.push("/login");
    });
  }
  
  logout = async(e) => {
    e.preventDefault();
    firebase.auth().signOut();
    this.setState({ user: null });
    localStorage.removeItem("user");
    this.clearCart()
    this.routerRef.current.history.push("/login");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addService = (service, callback) => {
    let services = this.state.services.slice();
    services.push(service);
    this.setState({ services }, () => callback && callback());
  };
  addToCart = cartItem => {
    let cart = this.state.cart;
    let fac = this.state.fac;
    let price = this.state.price;

    let item={
      id: cartItem.product.id,
      name: cartItem.product.name,
      desc:cartItem.product.shortDesc,
      uprice:cartItem.product.price,
      pprice: "0",
      amount:cartItem.amount,
    }
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock; 
    }else{
      price= (parseFloat(price)+parseFloat(cartItem.product.price)).toFixed(2)
    }
    
    if (fac[cartItem.id]) {
      fac[cartItem.id].amount += cartItem.amount;
    } else {
      fac[cartItem.id] = item;
    }
    if (fac[cartItem.id].amount > cart[cartItem.id].product.stock) {
      fac[cartItem.id].amount = cart[cartItem.id].product.stock; 
    }else{
      fac[cartItem.id].pprice= (parseFloat(fac[cartItem.id].pprice)+parseFloat(fac[cartItem.id].uprice)).toFixed(2)
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("price", JSON.stringify(price));
    localStorage.setItem("fac", JSON.stringify(fac));
    this.setState({ cart });
    this.setState({ price });
    this.setState({ fac });
  };

  lessToCart = cartItemId => {
    let cart = this.state.cart;
    let price = this.state.price;
    
    cart[cartItemId].amount =cart[cartItemId].amount-1;
    price= (parseFloat(price)-parseFloat(cart[cartItemId].product.price)).toFixed(2)
    if(cart[cartItemId].amount===0){
      delete cart[cartItemId];  
    } 
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("price", JSON.stringify(price));
    this.setState({ cart });
    this.setState({ price });
  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    let price = this.state.price;
    price=(parseFloat(price)-parseFloat(cart[cartItemId].product.price)*parseFloat(cart[cartItemId].amount)).toFixed(2)
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("price", JSON.stringify(price));
    this.setState({ cart });
    this.setState({ price });
  };

  
  clearCart = () => {
    let cart = {};
    let fac={};
    let price = 0;
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    if(user===null){
      this.setState({usrinf:null})
      localStorage.removeItem("usrinf");
    }
    localStorage.removeItem("infpago");
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("price", JSON.stringify(price));
    localStorage.setItem("fac", JSON.stringify(fac));
    this.setState({ cart });
    this.setState({ price });
    this.setState({ fac });
    this.routerRef.current.history.push("/");
  };

  userinfo = async (nombre,apellido,pridireccion,segdireccion,pricontacto,segcontacto,provincia,ciudad,cedula,correo) => {
     const usrinf = {
       nombre,
       apellido,
       pridireccion,
       segdireccion,
       pricontacto,
       segcontacto,
       provincia,
       ciudad,
       cedula,
       correo
     };
     this.setState({ usrinf });
    localStorage.setItem("usrinf", JSON.stringify(usrinf));
    this.routerRef.current.history.push("/pentrega");
  };

  infopago = (formaentrega,formapago) => {
    const infpago = {
      formaentrega,
      formapago
    };
    this.setState({ infpago });
    localStorage.setItem("infpago", JSON.stringify(infpago));
    this.routerRef.current.history.push("/detalle");
 };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }
  
    const cart = this.state.cart;
    const products = this.state.products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;
        console.log('actualizar stock')
    //    axios.put(
     //     `http://localhost:3001/products/${p.id}`,
      ///    { ...p },
      //  )
      }
      return p;
    });
  
    this.setState({ products });
    this.clearCart();
  };

  handleEnd = async({steps, values})=> {
    window.location.href="/products"  
 }

  confirmarpedido= async()=>{
    var id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    let fac = this.state.fac;
    let price = this.state.price;
    let usrinf = this.state.usrinf;
    let infpago= this.state.infpago;
    let now= new Date();
    var mes= parseFloat(now.getMonth())+parseFloat(1);
    var fecha=now.getFullYear()+'/'+mes+'/'+now.getDate();

      await firebase.firestore().collection('pedido').doc(id).set(
        {
        id:usrinf.cedula,
        userinfo : usrinf, 
        infopago : infpago, 
        items:fac,
        fecha:fecha,
        total:price
        })
        .then(function() {
            console.log("Document successfully written!");
            window.alert("guardo")
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            window.alert("error")
        });
        
    this.clearCart();
    this.routerRef.current.history.push("/products");
  }
  eliminar= async(uid)=>{
      await firebase.firestore().collection('pedido').doc(uid).delete()
        .then(function() {
            console.log("Document successfully written!");
            window.alert("eliminado")
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            window.alert("error")
        });
        
    this.clearCart();
    this.routerRef.current.history.push("/mispedidos");
  }

  vender= async(pedido)=>{
    await firebase.firestore().collection('venta').doc(pedido.uid).set(
      {
        id:pedido.userinfo.cedula,
        userinfo : pedido.userinfo, 
        infopago : pedido.infopago, 
        items:pedido.items,
        fecha:pedido.fecha,
        total:pedido.total,
        fin:'true'
      })
      .then(function() {
          window.alert("guardo")
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
          window.alert("error")
      });
      await firebase.firestore().collection('pedido').doc(pedido.uid).delete();
  this.clearCart();
  this.routerRef.current.history.push("/products");
     
  }
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          lessToCart: this.lessToCart,
          addToCart: this.addToCart,
          login: this.login,
          create: this.create,
          confirmarpedido:this.confirmarpedido,
          userinfo:this.userinfo,
          infopago:this.infopago,
          addProduct: this.addProduct,
          addService: this.addService,
          clearCart: this.clearCart,
          checkout: this.checkout,
          eliminar:this.eliminar,
          vender:this.vender
        }}
      >
        <Router ref={this.routerRef}>
        <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <Link to="/" className="navbar-brand">
              <h1>
                Ieserec
              </h1>
            </Link>
          <button className="navbar-toggler" type="button" 
          data-toggle="collapse" data-target="#navbarCollapse" 
          aria-controls="navbarCollapse" aria-expanded="false" 
          aria-label="Toggle navigation"
          onClick={e => {
            e.preventDefault();
            this.setState({ showMenu: !this.state.showMenu });
          }}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse"  id="navbarCollapse">
            <ul className="navbar-nav">
            <div className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`}>
                <li className="dropdown">
                  <a data-toggle="dropdown" 
                  role="button" aria-haspopup="true" aria-expanded="true"> 
                  <span className="navbar-item tamlet">
                  Productos</span> <span className="caret"></span></a>
                  <ul className="dropdown-menu dropdown-menus">
                    <Link to="/products" className="navbar-item tamlet">
                      Ver Todos
                    </Link>

                    
                  </ul>
                </li>
                <Link to="/cart" className="navbar-item tamlet">
                  Cart
                  <span
                    className="tag is-primary"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length }
                  </span>
                </Link>
                <Link to="/about" className="navbar-item tamlet">
                  Nosotros
                </Link>
                <Link to="/contact" className="navbar-item tamlet">
                  Contactenos
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                <li className="dropdown">
                  <a data-toggle="dropdown" 
                  role="button" aria-haspopup="true" aria-expanded="true"> 
                  <span className="navbar-item tamlet">
                    {this.state.user.email}</span> <span className="caret"></span></a>
                  <ul className="dropdown-menu dropdown-menus">
                    <Link to="/services" className="navbar-item tamlet">
                      Mis Servicio
                    </Link>
                    <Link to="/add-product/crear" className="navbar-item tamlet">
                      Nuevo Producto
                    </Link>
                    <Link to="/crud-product" className="navbar-item tamlet">
                      Mis Productos
                    </Link>
                    <Link to="/mispedidos" className="navbar-item tamlet">
                      Mis Pedidos
                    </Link>
                    <Link to="/misventas" className="navbar-item tamlet">
                      Mis Ventas
                    </Link>
                  </ul>
                </li>
                )}
              
                {this.state.user && this.state.user.accessLevel > 0 && (
                  <li className="dropdown">
                  <a data-toggle="dropdown" 
                  role="button" aria-haspopup="true" aria-expanded="true"> 
                  <span className="navbar-item tamlet">
                    {this.state.user.email} </span> 
                  </a>
                  <ul className="dropdown-menu dropdown-menus">
                    <Link to="/" className="navbar-item tamlet">
                      Mi Informacion
                    </Link>  
                    <Link to="/" className="navbar-item tamlet">
                      Mis Compras
                    </Link>  
                    <Link to="/" className="navbar-item tamlet">
                      Mis Pedidos
                    </Link>
                  </ul>
                </li>
                )}
                {!this.state.user ? (
                  <Link to="/login" className="navbar-item tamlet">
                    Login
                  </Link>
                ) : (
                  
                  <Link to="/store" onClick={this.logout} className="navbar-item tamlet">
                   Logout 
                  </Link>
                  
                )}
              </div>
           
            </ul> 
          </div>
        </nav>
     <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/info" component={Informacion} />
              <Route exact path="/singup" component={Singup} />
              <Route exact path="/detalle" component={Factura} />
              <Route exact path="/pentrega" component={PEntrega} />
              <Route exact path="/about" component={Nosotros} />
              <Route exact path="/misventas" component={MisVentas} />
              <Route exact path="/mispedidos" component={MisPedidos} />
              <Route exact path="/contact" component={Contacto} />
              <Route exact path="/services" component={Services} />
              <Route exact path="/subservice/:id" component={Subservices} />
              <Route exact path="/store" component={ProductList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product/:id" component={AddProduct} />
              <Route exact path="/add-service/:tipo/:id" component={AddService} />
              <Route exact path="/pedido/:id" component={Detalle} />
              <Route exact path="/ventas/:id" component={Detalle} />
              <Route exact path="/subservprod/:id" component={Products} />
              <Route exact path="/subproducts/:id" component={SubProducts} />
              
              <Route exact path="/crud-product" component={CrudProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
        <br />
        <Footer/>
        <div className="row justify-content-md-center">
            <div className="col">
              <ThemeProvider theme={chat_styles}>
                <ChatBot
                  handleEnd={this.handleEnd}
                  steps={steps}
                  headerTitle="Ieserec Solutions"
                  placeholder="..."
                  customDelay="300"
                  botAvatar={botAvatar}
                  floating="true"
                  width="400px"
                />
              </ThemeProvider>
            </div>
          </div>
      </Context.Provider>
    );
  }
}