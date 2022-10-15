import React , {useState, useEffect} from 'react';
import ListLayout from './layout/ListLayout.js';
import AuthService from '../tools/axiosAPI.js';


function List(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [lists, setLists] = useState([]);

  async function getMessage(){
    try {
        let response = await AuthService.get('todo_list/');
        const data = response.data;
        setLists(data);
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
        <ListLayout className='lists' list = {lists}/>
      </div>
    )
  }
}

export default List;
