import { useState, useEffect } from 'react'
import './appRandomHero.scss'
import '../../style/button.scss'
import MarvelService from '../../services/MarvelService'
import Loading from '../spiner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import mjolnir from '../../resources/img/mjolnir.png'
import shield from '../../resources/img/shield.png'
import PropTypes from 'prop-types';
// import AppHeroInfo from '../appHeroInfo/appHeroInfo'

const RandomHero = (props) => {

   const [hero, setHero] = useState({});
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);

   useEffect(() => {
      updateHero()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const onError = () => {
      setLoading(false);
      setError(true);
   }

   const marvelService = new MarvelService();

   const updateHero = () => {
      setLoading(true);
      setError(false);
      marvelService.getHeroById().then(res => {
         props.onHeroLoad(res)
         if (!res.description) {
            res.description = 'There is no data about this character.';
         } else if (res.description && res.description.length > 228) {
            res.description = res.description.slice(0, 228) + '...'
         }
         setHero(res);
         setLoading(false);
      }).catch(onError);
   }

   const errorMessage = error ? <ErrorMessage /> : null;
   const load = loading ? <Loading /> : null;
   const newHero = !(loading || error) ? <View hero={hero} /> : null;
   return (
      <div className="randomHero">
         {errorMessage}
         {load}
         {newHero}
         <div className="heroToday">
            <div>Random character for today! <br />
               Do you want to get to know him better?</div>
            <div>Or choose another one</div>
            <button className="button button__main" onClick={updateHero}>
               <div className="inner">TRY IT</div>
            </button>
            <img src={shield} alt='shield' className='shield'></img>
            <img src={mjolnir} alt='mjolnir' className='mjolnir'></img>
         </div>
      </div>
   )
}

const View = ({ hero }) => {

   const { thumbnail, name, description, homepage, wiki } = hero

   return (
      <div className="heroBlockInfo">
         <img src={thumbnail} alt='hero'></img>
         <div className="wrapper">
            <h1 className='heroName'>{name}</h1>
            <div className="heroDescription">{description}</div>
            <div className="btns">
               <a href={homepage} className="button button__main">
                  <div className="inner">HOMEPAGE</div>
               </a>
               <a href={wiki} className="button button__secondary">
                  <div className="inner">WIKI</div>
               </a>
            </div>
         </div>
      </div>
   )
}

RandomHero.propTypes = {
   onHeroLoad: PropTypes.func,
}

export default RandomHero;