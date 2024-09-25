import { useState, useEffect } from 'react'
import './appRandomHero.scss'
import '../../style/button.scss'
import Loading from '../spiner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import mjolnir from '../../resources/img/mjolnir.png'
import shield from '../../resources/img/shield.png'
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService'

const RandomHero = (props) => {

   const { getHeroById, clearError, process, setProcess } = useMarvelService();
   const [hero, setHero] = useState({});

   useEffect(() => {
      setProcess('loading')
      updateHero()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const updateHero = () => {
      setProcess('loading')
      getHeroById().then(res => {
         props.onHeroLoad(res)
         if (!res.description) {
            res.description = 'There is no data about this character.';
         } else if (res.description && res.description.length > 228) {
            res.description = res.description.slice(0, 228) + '...'
         }
         setHero(res);
         clearError();
      }).then(() => setProcess('confirmed'))
   }

   const setContent = (process, hero) => {
      switch (process) {
         case 'waiting':
         case 'loading':
            return <Loading />
         case 'confirmed':
            return <View hero={hero} />
         case 'error':
            return <ErrorMessage />
         default:
            throw new Error("Quelque chose s'est mal passe")
      }
   }

   return (
      <div className="randomHero">
         {setContent(process, hero)}
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