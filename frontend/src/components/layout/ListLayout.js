import React from 'react';
import ListItem from './ListItem.js';
import AuthService from '../../tools/axiosAPI.js';

function ListLayout(props){
  function deleteList(id){
    AuthService.delete(`/todo_list/${id}/`)
    .then((response) => {
      window.location.href = '/list';
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
