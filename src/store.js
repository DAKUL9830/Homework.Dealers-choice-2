import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
const SET_PLANETS ='SET_PLANETS';
const CREATE_PLANETS='CREATE_PLANETS'
const DELETE_PLANETS='DELETE_PLANETS'

const planetReducer=(state=[],action)=>{
    if(action.type===SET_PLANETS){
        state=action.planets
    }
    if(action.type===CREATE_PLANETS){
        state=[action.planet,...state]
    }

    if(action.type===DELETE_PLANETS){
        state=state.filter(planet=>planet.id!==action.id*1)
    }
    return state
}

const setPlanets =(planets)=>{
    return{
    type:SET_PLANETS,
    planets
    }
}
const setDeletePlanets=(id)=>{
    return{
        type:DELETE_PLANETS,
        id
    }

}

const setCreatePlanets=(planet)=>{
    return{
        type:CREATE_PLANETS,
        planet
    }

}

const fetchPlanets=()=>{
    return async(dispatch)=>{
        const response=await axios.get('/api/planets');
        dispatch(setPlanets(response.data));
    }
}

const deletePlanets=({id,history})=>{
    return async(dispatch)=>{
        await axios.delete(`/api/planets/${id}`);
        dispatch(setDeletePlanets(id));
        history.push('/planets')
    }
}

const createPlanets=({name,history})=>{
    return async(dispatch)=>{
        const response=await axios.post('/api/planets',{name});
        dispatch(setCreatePlanets(response.data));
        history.push('/planets')
    }
}

const reducer = combineReducers({
    planets: planetReducer
    
  });
  
  const store = createStore(reducer, applyMiddleware(thunk));
  
  export default store;
  export { fetchPlanets, deletePlanets, createPlanets };