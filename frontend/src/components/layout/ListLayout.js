import React from 'react';
import ListItem from './ListItem.js';
import AuthService from '../../tools/axiosAPI.js';

function ListLayout(props){
  function deleteList(id){
    AuthService.delete(`/todo_list/${id}/`)
    .then((response) => {
      let list = JSON.parse(sessionStorage.getItem('display_list'));
      delete list[list.findIndex(x => x.id === id)];
      let dense_list = list.filter(() => true);
      sessionStorage.display_list = JSON.stringify(dense_list);
      console.log(list);
      console.log(JSON.parse(sessionStorage.getItem('display_list')));
      props.onClose();
    });
  }

  return (
  <div>
        {
          props.list.length !== 0 ? props.list.map((item,index) =>
            <ListItem key={index} id={item.id} title={item.title} description={item.description} completed={item.completed} date={item.date_added} timestamp={item.timestamp} deletion={() => deleteList(item.id)}/>
          ) : <span id='empty'>Nothing here!</span>
        }
  </div>
  );
}

export default ListLayout;
