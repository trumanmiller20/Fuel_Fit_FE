import React from 'react';
import { Link } from "react-router-dom"
import { SideBarData } from './SideBarData';


const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SideBarData.map((val, key) => {
          return (
            <li className='side-link-container'
              key={key}>
                <Link className="sidebar-link" to={val.link}>
                  {" "}
                  <div id="icon">
                    {val.icon}
                  </div>
                  <div id="title">
                    {val.title}
                  </div>
                  {" "}
                </Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
  }

  export default SideBar

