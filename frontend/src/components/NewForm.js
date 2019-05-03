import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus  } from '@fortawesome/free-solid-svg-icons';

class NewForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    /**
     * Handles form submit
     * @param {Event} e 
     */
    onSubmit(e) {
        e.preventDefault();
        var input = ReactDOM.findDOMNode(this.refs.newTask);
        var newTask = input.value;
        if(newTask) {
            this.props.addTask({task: 
                newTask,
                done: false
            });
            input.value = '';
        }
    }

    render() {
        return (
        <div className="addNewtForm">
            <form onSubmit={this.onSubmit}>
                <input type="text" placeholder=" Task" ref="newTask" />
                <button className="btn btn-lg" type="submit">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </form>
        </div>
        )
    }
}
export default NewForm