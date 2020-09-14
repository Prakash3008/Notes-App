import React from 'react';

import './App.css';
import ReactDraggable from 'react-draggable';
class Note extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editing : false
        }
    }
    componentWillMount = () => {
        this.style = {
            right: this.randomBetween( 0, window.innerWidth - 150, 'px' ),
            top: this.randomBetween( 0, window.innerHeight - 150, 'px')
        }
    }

    randomBetween = (x,y,s) =>{
        return ( x + Math.ceil( Math.random() * (y-x) ) ) + s
    }

    edit = () =>{
        this.setState({ editing: true})
    }
    save = () =>{
        this.props.onChange(this.refs.newText.value, this.props.id)
        this.setState({editing: false})
    }

    delete = ( id ) => {
        this.props.onRemove(this.props.id)
    }

    renderForm = () => {
        return(
           <div className="note" style={this.style}> 
            <textarea rows="15" cols="50" ref="newText"></textarea>
            <button onClick={this.save}>Save</button>
            </div>
        )
    }

    renderDisplay = () => {
        return(
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>    
                <span>
                    <button onClick={this.edit}>Edit Note</button>
                    <button onClick={this.delete}>Delete Note</button>
                </span>
            </div>
        )
    }
    render(){

        return( <ReactDraggable>{
            (this.state.editing) ? this.renderForm() : this.renderDisplay()
        }</ReactDraggable>)
        
    }
}

export default Note;