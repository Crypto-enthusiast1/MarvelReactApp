/* eslint-disable jsx-a11y/anchor-is-valid */
import './appRandomHero.scss'
import '../../style/button.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import shield from '../../resources/img/shield.png'
import thor from '../../resources/img/Thumbnail.jpg'


const RandomHero = () => {
   return (
      <div className="randomHero">
         <div className="heroBlockInfo">
            <img src={thor} alt='hero'></img>
            <div className="wrapper">
               <h1 className='heroName'>Thor</h1>
               <div className="heroDescription">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</div>
               <div className="btns">
                  <a href='#' className="button button__main">
                     <div className="inner">HOMEPAGE</div>
                  </a>
                  <a href='#' className="button button__secondary">
                     <div className="inner">WIKI</div>
                  </a>
               </div>
            </div>
         </div>
         <div className="heroToday">
            <div>Random character for today! <br />
               Do you want to get to know him better?</div>
            <div>Or choose another one</div>
            <button className="button button__main">
               <div className="inner">TRY IT</div>
            </button>
            <img src={shield} alt='shield' className='shield'></img>
            <img src={mjolnir} alt='mjolnir' className='mjolnir'></img>
         </div>
      </div>
   )
}

export default RandomHero;