/* eslint-disable jsx-a11y/anchor-is-valid */
import './appHeader.scss'
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {

   return (
      <header className='appHeader'>
         <h1 className="leftHeader">
            <Link to='/'>Marvel</Link>
            <span> information portal</span>
         </h1>
         <nav className="rightHeader">
            <ul>
               <li><NavLink
                  end
                  to='/'
                  className={({ isActive }) => "nav-link" + (isActive ? " red" : "")}>Characters</NavLink></li>
               <span>/</span>
               <li><NavLink
                  end
                  to='/comics'
                  className={({ isActive }) => "nav-link" + (isActive ? " red" : "")}>Comics</NavLink></li>
            </ul>
         </nav>
      </header>
   )
}

export default AppHeader;