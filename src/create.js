import React from 'react';
import{connect} from 'react-redux'
import {Link}  from 'react-router-dom'
import{createPlanets} from './store';

class Create extends React.Component{
    constructor(){
        super()
        this.state={
            name:''
        };
        this.save=this.save.bind(this);
    }
    save(ev){
       ev.preventDefault();
       this.props.createPlanets({name:this.state.name,history:this.props.history})
    }

    render(){
        const {name}=this.state
        const{save}=this


        return(
            <div>
                <form onSubmit={save}>
                    <input value={name} onChange={ ev=>this.setState({name:ev.target.value})}/>
                    <button >CREATE</button>
                </form>
                <ul>
                    <li>
                        <Link to='/planets'>CANCEL</Link>
                    </li>
                 </ul>
            </div>

        );
    }
}

export default connect(()=>{
    return{};
},
(dispatch)=>{
    return{
        createPlanets:(planet)=>{dispatch(createPlanets(planet))}
    }
}

)(Create);