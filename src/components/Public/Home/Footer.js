import React from 'react';


class Footer extends React.Component {

  render() {

    return (

      
        <footer className="container">
            <p className="float-right"><a href="/home">Subir</a></p>
            <p>&copy; {(new Date().getFullYear())} Mi Proyecto, Inc. &middot; <a href="/home">Política de Privacidad</a> &middot; <a href="/home">Términos</a></p>
        </footer>

    )
    
  }

}

export default Footer;