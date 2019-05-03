import React, { Component } from 'react';
import ListItem from './ListItem';

class TodoList extends Component {
    render() {
        return (
            <div className="todoListMain">
                <div className="col-md-12">
                {(this.props.list.length === 0) ? 
                    <h4 className="text-center">List is empty</h4> : ''
                }
                {this.props.list.map((value, index) => {
                    return <ListItem key={index}
                        data={value}
                        completeTask={() => this.props.completeTask(index)}
                        deleteTask={() => this.props.deleteTask(index)}/>
                })}  
                </div> 
            </div>
        )
    }
}
export default TodoList