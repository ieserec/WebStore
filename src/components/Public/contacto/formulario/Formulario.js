import React from 'react';
 
class Formulario extends React.Component {
 
  render() {
 
    return (
 
        <form className="mb-5">
          <div className="form-group">
            <label htmlFor="nya" className="negrita tamlet">Nombres y Apellidos</label>
            <input type="text" className="form-control textform tamlet" id="nya" required />            
          </div>
 
          <div className="form-group">
            <label htmlFor="email" className="negrita tamlet">Email</label>
            <input type="email" className="form-control tamlet textform" id="email" required />
          </div>
 
          <div className="form-group">
            <label htmlFor="asunto" className="tamlet negrita">Asunto</label>
            <input type="text" className="form-control tamlet textform" id="asunto" required />
          </div>
 
          <div className="form-group">
            <label htmlFor="mensaje" className="negrita tamlet">Mensaje</label>
            <textarea className="form-control tamlet textform" id="mensaje" required></textarea>
          </div>
 
          <button type="submit" className="button tamlet is-primary is-outlined ">Enviar</button>
 

        </form>
 
    )
    
  }
 
}
 
export default Formulario;