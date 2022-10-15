import React , {Component} from 'react';
import AuthService from '../../tools/axiosAPI.js';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: "",
      description: "",
      completed: false,
      date: null,
      timestamp: null,
      show: false,
      showClass: "panel-disabled",
      completeClass: "undone",
    }
    this.setShow = this.setShow.bind(this);
    this.setComplete = this.setComplete.bind(this);
    this.complete = this.complete.bind(this);
  }

  setShow(event) {
    if (this.state.show === false) {
      this.setState({show : true, showClass : "panel-enabled"});
    } else {
      this.setState({show : false, showClass : "panel-disabled"});
    }
  }

  setComplete(event) {
    if (this.props.completed === false) {
      this.setState({completeClass : "undone"});
    } else {
      this.setState({completeClass : "done"});
    }
  }

  complete(id, title) {
    if (this.props.completed === false) {
      AuthService.put(`todo_list/${id}/`, {
        title: title,
        completed: true
      })
      .then((result) => {
        window.location.href = '/';
      })
    } else {
      AuthService.put(`todo_list/${id}/`, {
        title: title,
        completed: false
      })
      .then((result) => {
        window.location.href = '/';
      })
    }
  }

  componentDidMount() {
    this.setComplete();
  }

  render() {
    return(
      <div className= {'list '+this.state.completeClass}>
        <h3 className={"title_hd "+this.state.completeClass} onClick={this.setShow}>{this.props.title}</h3>
        <div id={this.state.showClass}>
          <span className={"panel "+this.state.completeClass}>{this.props.description}</span>
          <div className='buttons'>
            <var id='completion'>
              Check(or_not) <input type="checkbox" name="completion" value="" onClick={() => this.complete(this.props.id, this.props.title)}/>
            </var>
            <var className={this.state.completeClass}>
              Delete
              <svg onClick={this.props.deletion} className = "delete" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7"/>
              </svg>
            </var>
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem;
