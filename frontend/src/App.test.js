import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect'
import { shallow, configure } from 'enzyme'
import toJson from 'enzyme-to-json'
import ListItem from './components/ListItem'
import NewForm from './components/NewForm'
import TodoList from './components/TodoList'
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders page header', () => {
    const { getByText } = render(<App />);
    expect(getByText('ToDo List')).toBeInTheDocument();
  });
});

describe('NewForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('input is cleared after submit', () => {
    const fakeEvent = { 
      preventDefault: () => console.log('preventDefault'),
      
    };
    const NewFormComponent = shallow(<NewForm />);
    NewFormComponent.find('input').simulate('submit', {value: "test"});
    console.log(Object.keys(NewFormComponent.find('input')));
    expect(NewFormComponent.find('input')).toEqual({});
  });
});

describe('TodoList', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      list: [
        {
          id: 0, 
          task: "test 1", 
          done: 0
        }, {
          id: 1, 
          task: "test 2", 
          done: 1
        }]
    }
    const wrapper = shallow(<TodoList {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  it('understands if the list is empty', () => {
    const props = {
      list: []
    }
    const wrapper = shallow(<TodoList {...props} />)
    const header = wrapper.find('h4.text-center')
    expect(header.text().includes('List is empty')).toBe(true);
  });
});

describe('ListItem', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      key: 0,
      data: {
        id: 0,
        task: "test task",
        done: 1
      }
    }
    const wrapper = shallow(<ListItem {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  });

  it('renders without complete button and crossed text when task is completed', () => {
    const props = {
      key: 0,
      data: {
        id: 0,
        task: "test task",
        done: 1
      }
    }
    const wrapper = shallow(<ListItem {...props} />)
    expect(wrapper.find('.taskDone')).toBeDefined();
    console.log(wrapper.find('.taskDone'));
    expect(wrapper.find('.completeBtn')).toEqual({});
  });

  it('renders with complete button when task is not completed', () => {
    const props = {
      key: 0,
      data: {
        id: 0,
        task: "test task",
        done: 0
      }
    }
    const wrapper = shallow(<ListItem {...props} />)
    expect(wrapper.find('.completeBtn')).toBeDefined();
  });

  it('renders with delete button', () => {
    const props = {
      key: 0,
      data: {
        id: 0,
        task: "test task",
        done: 0
      }
    }
    const wrapper = shallow(<ListItem {...props} />)
    expect(wrapper.find('.deleteBtn')).toBeDefined();
  });
});

