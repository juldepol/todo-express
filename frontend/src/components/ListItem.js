import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

class ListItem extends Component {
    /**
     * Renders complete button if task is not completed yet
     */
    completeButton(){
        if (!this.props.data.done){
            return (
                <button className="btn btn-lg completeBtn"
                        onClick={this.props.completeTask}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            );
        } 
    }
    
    render() {
        return (
            <div className="todoListItem">
                <div className="col-md-8 offset-md-2">
                    <div className="row">
                        <div className="col-md-10 col-sm-8">
                            <h3 className={(this.props.data.done) ? "taskText taskDone" : "taskText"}>
                                {this.props.data.task}
                            </h3>
                        </div>
                        <div className="col-md-1 col-sm-2">
                            {this.completeButton()}
                        </div>
                        <div className="col-md-1 col-sm-2">
                            <button className="btn btn-lg float-right deleteBtn"
                                    onClick={this.props.deleteTask}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListItem