import React, {Component} from 'react';
import TodoList from './components/TodoList';
import NewForm from './components/NewForm';
import axios from "axios"
import './styles/App.css';

/**
 * General component
 */
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  /**
  * Fetches list of todos from server
  */
  getList(){
    axios.get("/task").then(results => {
      return results;
    }).then(data => {
        let tasks = data.data.map((task) => {
          return {
            id: task.id,
            task: task.task,
            done: task.done
          }
        });
        this.setState({list: tasks});
    });
  }

  componentDidMount(){
    this.getList();
  }

  /**
   * Submits new task to server and updates list
   * @param {Object} item 
   */
  handleAdd(item) {
    axios.post("/task", {
      task: item.task
    }).catch(function (error) {
      console.log(error);
    });
    this.getList();
  }

  /**
   * Sends delete request to server, updates state 
   * @param {int} id 
   */
  handleDelete(id) {
    var self = this;
    let tasks = [...this.state.list];
    tasks.forEach((element, index) => {
      if (index === id){
        axios.delete("/task?id="+element.id)
        .then(function (response) {
          if (response.status === 200){
            self.setState({list: tasks.filter((element, index) => {
              return index !== id;
            })});
          }
        }).catch(function (error) {
          console.log(error);
        });
      }
    });
  }

  /**
   * Sends request to server to make selected task completed, updates state 
   * @param {int} id 
   */
  handleComplete(id) {
    var self = this;
    let tasks = [...this.state.list];
    tasks[id].done = true;
    axios.put("/task?id="+tasks[id].id)
    .then(function (response) {
      if (response.status === 200){
        self.setState({list: tasks});
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (<div className="App">
      <div className="header">
        <div className="col-md-12 col-sm-12">
          <h3 className="text-center">ToDo List</h3>
        </div>
      </div>
      <NewForm addTask={this.handleAdd}/>
      <TodoList list={this.state.list}
      completeTask={id => this.handleComplete(id)}
      deleteTask={id => this.handleDelete(id)}/>
    </div>)
  };
}

export default App;
