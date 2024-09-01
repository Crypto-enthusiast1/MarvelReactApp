import logo1 from '../../resources/img/Avengers_logo.svg'
import logo2 from '../../resources/img/Avengers.svg'
import './appHeaderComics.scss'

const ComicsHeader = () => {
   return (
      <div className='comicsHeader'>
         <img src={logo2} alt="logo" className="logo" />
         <span>
            New comics every week! <br />
            Stay tuned!
         </span>
         <img src={logo1} alt="logo" className="logo" />
      </div>
   )
}

export default ComicsHeader;