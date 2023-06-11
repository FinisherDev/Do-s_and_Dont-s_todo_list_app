import React from 'react';
import AuthService from '../tools/axiosAPI.js';
import {useState, useEffect} from 'react';
import ListLayout from './layout/ListLayout.js';
import Modal from './layout/modal_layout/Modal.js';

function Tabs(props) {
  const [done, setDone] = useState([]);
  const [undone, setUndone] = useState([]);
  const [viewDone, setViewDone] = useState(false);
  const [viewUndone, setViewUndone] = useState(false);


  const displayComplete = () => {
    let cleared = props.full_list.filter(item => item.completed === true);
    setDone(cleared);
    setViewDone(true);
    setViewUndone(false);
  };

  const displayIncomplete = () => {
    let not_yet = props.full_list.filter(item => item.completed === false);
    setUndone(not_yet);
    setViewDone(false);
    setViewUndone(true);
  };

  return (
    <div className='home_tabs'>
      <nav className = 'tabs'>
        <button onClick = {() => { setViewDone(false); setViewUndone(false); }} className='tab_button'>All</button>
        <button onClick = {() => {displayComplete()}} className='tab_button'>Completed</button>
        <button onClick = {() => {displayIncomplete()}} className='tab_button'>Incompleted</button>
      </nav>
      {
        viewDone === false && viewUndone === false ? <ListLayout list = {props.full_list} onClose = {()  => window.location.replace('/list')}/> :
        viewDone === true && viewUndone === false ? <ListLayout list = {done} onClose = {()  => window.location.replace('/list')}/> :
        viewDone === false && viewUndone === true ? <ListLayout list = {undone} onClose = {()  => window.location.replace('/list')}/>:
        null
      }
    </div>
  );
}

function Home (props) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [todayList, setTodayList] = useState([]);

  async function getMessage(){
    try {
        let response = await AuthService.get('/hello/');
        sessionStorage.setItem('display_list', JSON.stringify(response.data));
        setTodayList(JSON.parse(sessionStorage.getItem('display_list')));
      }catch(error){
        window.location.replace('/login');
    }
  }

  useEffect(
    () => {
      getMessage();
      if (todayList){
          setIsLoading(false);
      }
    }, [isLoading],
  );

  if (isLoading){
    return <code>Loading...</code>
  }else{
    return (
      <div id='home'>
        <button id='add-task' onClick={() => setShow(true)}>Add Task</button>
        <Modal onClose={() => (setTodayList(JSON.parse(sessionStorage.getItem('display_list'))), setShow(false))} show={show} submit={() => setShow(false)}/>
        { todayList.length === 0 ? <p id="no_list">Woohoo! It's a free day</p> : <Tabs full_list = {todayList} /> }
      </div>
    );
  }
};

export default Home;
