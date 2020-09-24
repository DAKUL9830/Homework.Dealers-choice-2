import React from 'react'
import {Link}  from 'react-router-dom'
import {connect} from 'react-redux'

const Planets=({planets,match})=>{
    return(
      <ul>
         {
             planets.map(planet=>{
                 return(
                     <li key={planet.id}  className={match.params.id*1===planet.id?'selected':''}>
                     <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
                     </li>
                 )
             })
         } 

      </ul>
    )

};
export default connect(({planets})=>{
    return {planets};
}
)(Planets);