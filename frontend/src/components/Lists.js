import React , {useState, useEffect} from 'react';
import ListLayout from './layout/ListLayout.js';
import AuthService from '../tools/axiosAPI.js';


function List(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);

  async function getMessage(){
    try {
        let response = await AuthService.get('todo_list/');
        sessionStorage.setItem('display_list', JSON.stringify(response.data));
        setLists(JSON.parse(sessionStorage.getItem('display_list')));
      }catch(error){
        window.location.href = '/login';
    }
  }


  useEffect(
    () => {
      getMessage();
      setIsLoading(false);
    },
    [],
  )

  if (isLoading){
    return <code>Loading lists. Please stand by...</code>
  }else {
    return (
      <div className='listings'>
        <ListLayout className='lists' list = {lists} onClose = {() => (setLists(JSON.parse(sessionStorage.getItem('display_list'))))}/>
      </div>
    )
  }
}

export default List;
