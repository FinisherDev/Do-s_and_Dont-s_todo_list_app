import React, {useState} from 'react';
import AuthService from '../../../tools/axiosAPI.js';

const Modal = (props) => {
  const [title, setTitle] = useState(props.title || '');
  const [description, setDes] = useState(props.description || '');
  const [errors, setErrors] = useState([]);

  if (!props.show){
    return null
  }

  function handleSubmit(props) {
    AuthService.post('todo_list/', {
      title : title,
      description: description
    })
    .then(
      (result) => {
      console.log(result);
      window.location.href = '/';
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          New Item
          <button type = 'button' onClick={props.onClose} id = "close_btn">
            <svg className = "xclose"stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7"/>
            </svg>
          </button>
        </header>
        <div className="modal-body">
          <div id='todo' >
            <label id='title'>Title</label>
            <input name="title" placeholder="Enter title here" onChange={(event) => setTitle(event.target.value)} value={title} />
            <label id='description'>Description</label>
            <input name="description" placeholder="Enter a description" onChange={(event) => setDes(event.target.value)} value={description} />
          </div>
        </div>
        <footer className="modal-footer">
          <button type = 'submit' id="save_btn" onClick={handleSubmit} >
            Save
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Modal;
