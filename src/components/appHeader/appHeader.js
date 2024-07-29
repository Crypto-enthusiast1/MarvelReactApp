/* eslint-disable jsx-a11y/anchor-is-valid */
import './appHeader.scss'

const AppHeader = () => {
   return (
      <header className='appHeader'>
         <h1 className="leftHeader">
            <a href='#'>Marvel</a>
            <span> information portal</span>
         </h1>
         <nav className="rightHeader">
            <ul>
               <li><a href='#' className='red'>Characters</a></li>
               <span>/</span>
               <a href='#'><li>Comics</li></a>
            </ul>
         </nav>
      </header>
   )
}

export default AppHeader;