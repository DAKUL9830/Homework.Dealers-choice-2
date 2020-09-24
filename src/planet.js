import React from 'react'
import {Link}  from 'react-router-dom'
import {connect} from 'react-redux'
import {deletePlanets} from './store'






const Planet=(props)=>{
   const {planets,match}=props;
   console.log(planets)
    const id = match.params.id;
   // console.log(id)
    const planet=planets.find(planet=>{
    return planet.id===id*1
    })
   console.log(planet)

   const {name,description,imageUrl}=planet;
   
   

  return(
      <div >
         
          <img src={imageUrl} />
          <h3 key={planet.id}>Planet:{name}</h3>
          <h3>Description:{description}</h3>
         
          <ul>
              <li>
                  <Link to='/planets'>CANCEL</Link>
              </li>
          </ul>
          <button onClick={ ()=> this.props.delete({id: this.props.match.params.id, history: this.props.history }) }>Delete</button>
          
      </div>
  )
};
export default connect(
    ({ planets} ,props)=> {

        console.log(props)
      return {
       planets
      };
    },(dispatch)=>{
        return {
            delete:(obj)=>{
                dispatch(deletePlanets(obj))
            }
        };
    }
  )(Planet);