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
               <li><NavLink exact to='/' activeClassName='red'>Characters</NavLink></li>
               <span>/</span>
               <li><NavLink exact to='/comics' activeClassName='red'>Comics</NavLink></li>
            </ul>
         </nav>
      </header>
   )
}

export default AppHeader;