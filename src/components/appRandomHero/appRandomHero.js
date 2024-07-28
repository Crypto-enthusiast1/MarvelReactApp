import './appRandomHero.scss'
import thor from '../../resources/img/mjolnir.png'

const RandomHero = () => {
   return (
      <div className="randomHero">
         <div className="heroBlockInfo">
            <img src='' alt='hero'></img>
            <h1 className='heroName'>Thor</h1>
            <div className="heroDescription">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</div>
            <button>HOMEPAGE</button>
            <button>WIKI</button>
         </div>
         <div className="randomHero">
            <div>Random character for today! <br />
               Do you want to get to know him better?</div>
            <div>Or choose another one</div>
            <button>TRY IT</button>
            <img src='../../resources/img/shield.png' alt='shield'></img>
            <img src={thor} alt='mjolnir'></img>
         </div>
      </div>
   )
}

export default RandomHero;