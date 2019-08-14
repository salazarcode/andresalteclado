import React from 'react';
//import logo from './logo.svg';
import secrets from './secrets.json';
import './App.css';
import * as firebase from 'firebase'

class App extends React.Component {
  
  componentDidMount(){
    var firebaseConfig = secrets;
    
    firebase.initializeApp(firebaseConfig);
  }
  
  render () {
    return (
      <div>
        <input id="email" type="text" name="email" /><br/>
        <input id="password" type="text" name="password" /><br/><br/>
        <button onClick={async ()=>{
          let res = await firebase.auth().createUserWithEmailAndPassword(document.querySelector("#email").value, document.querySelector("#password").value).catch(function(error) {
            alert(error.message)
          });
          console.log(res);
        }}>Registrarte</button><br/><br/>

        <button onClick={async ()=>{
          let res = await firebase.auth().signInWithEmailAndPassword(document.querySelector("#email").value, document.querySelector("#password").value).catch(function(error) {
            alert(error.message)
          });
          console.log(res);
        }}>Iniciar Sesión</button><br/><br/>

        <button onClick={async ()=>{
          var user = await firebase.auth().currentUser;
          if (user) {
            console.log("Hay un usuario loggeado")    
            var res = {
              name: user.displayName,
              email: user.email,
              photoUrl:user.photoUrl,
              emailVerified: user.emailVerified,
              uid: user.uid
            }        
            console.log(res);
          } else {
            console.log("No hay nadie loggeado");
          }
        }}>Usuario activo?</button><br/><br/>
        
        <button onClick={async ()=>{
          firebase.auth().signOut().then(function() {
            console.log("Salida exitosa!")
          }).catch(function(error) {
            console.log("Salida erronea!")
          });
        }}>Cerrar Sesión</button><br/><br/>

      </div>


    )
  }
}

export default App;
