import React from  'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Link, Route} from 'react-router-dom';
import Planets from './planets';
import Planet from './planet';
import Create from './create';
import { Provider, connect } from 'react-redux';
import store, { fetchPlanets } from './store';

class App extends React.Component{
    constructor(){
        super()
    }
    componentDidMount(){
        this.props.load()
    }
    render(){
        return(
            <Router>
            <div >
                <h1>Our solar system</h1>
                <h3>Add your planet</h3>
                <ul>
                    <li>
                    <Link to='/'>HOME</Link>
                  </li>
                  <li>
                <Link to='/planets'>PLANETS</Link>
                </li>
                <li>
                <Link to='/create'>CREATE PLANET</Link>
                </li>
                </ul>
                <Route path='/planets'  exact component={Planets}/>
                <Route path='/planets/:id' component={Planet}/>
                <Route path='/create' component={Create}/>
            </div>
            </Router>

           
        );
    }
}
const PlanetApp=connect(({planets})=>{
    return{ planets};
},
(dispatch)=>{
    return {
        load:()=>dispatch(fetchPlanets())
    };
})(App)
ReactDOM.render(<Provider store={ store }><PlanetApp /></Provider>, document.querySelector('#root'));
