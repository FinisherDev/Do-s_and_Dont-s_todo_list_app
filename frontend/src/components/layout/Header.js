import React, {useState, useEffect} from "react";


export default function Header() {
  const [open, setOpen] = useState(false);

  function openMenu() {
    if (open === false) {
      document.getElementById('menu').style.width = '250px';
      document.getElementById('root').style.marginLeft = '250px';
      setOpen(true);
    } else {
      document.getElementById('menu').style.width = '0px';
      document.getElementById('root').style.marginLeft = '0px';
      setOpen(false);
    }
  }

  const animateMenu = (x) => {
    x.classList.toggle("change");
  }
  return (
      <header className="page-header">
        <button id='menu_btn' onClick={() => {openMenu(); animateMenu(document.getElementById('menu_btn'));}}>
          <div className='bar_1'></div>
          <div className='bar_2'></div>
          <div className='bar_3'></div>
        </button>
        <h1 className='title'>Do's and Dont's</h1>
      </header>
  )
}
