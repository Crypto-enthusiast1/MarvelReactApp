/* eslint-disable array-callback-return */
import { Fragment, useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'
import Loading from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import './appHeroInfo.scss';

const AppHeroInfo = (props) => {

   const [hero, setHero] = useState({});
   const [firstRenderDone, setFirstRenderDone] = useState(false);
   const { clearError, getHeroWithComicsById, process, setProcess } = useMarvelService();
   const { randomHero, charId } = props;

   useEffect(() => {
      if (randomHero) {
         checkAndRender();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [randomHero])

   useEffect(() => {
      if (charId) {
         updateHeroInfo(charId);
         renderComics()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [charId])

   const checkAndRender = () => {
      const { randomHero } = props;
      if (!firstRenderDone && randomHero && Object.keys(randomHero).length > 0) { //Обязательно проверять не пустой ли приходит объект randomHero
         setProcess('loading')
         setHero({ ...randomHero });
         setFirstRenderDone(true);
         setProcess('confirmed')
      }
   };

   const onError = () => {
      return (
         <div className="aboutComicsHero">
            <div className="wrapper_error" >
               <ErrorMessage />
            </div>
         </div>
      )
   }

   const onLoading = () => {
      return (
         <div className="aboutComicsHero">
            <div className="wrapper wrapper_loading" style={{ justifyContent: 'center', display: 'unset' }}>
               <Loading />
            </div>
         </div>
      )
   }

   const updateHeroInfo = (id) => {
      if (!id) {
         return
      }
      getHeroWithComicsById(id).then(item => {
         if (!item.description) {
            item.description = 'There is no data about this character.'
         } else if (item.description && item.description.length > 228) {
            item.description = item.description.slice(0, 228) + '...'
         }
         clearError();
         setHero({ ...item });
      }).then(() => setProcess('confirmed'))
         .catch(onError)
   }

   const renderComics = () => {
      const { comics } = hero;
      if (!comics || comics.length === 0) {
         return <li>They are no comics avaible about this hero</li>
      }
      return comics.map((item, i) => {
         if (i > 9) return null;
         return (<a href={item.resourceURI} key={i}>
            <li>{item.name}</li>
         </a>
         )
      })
   }

   const setContent = (process, hero) => {
      switch (process) {
         case 'waiting':
         case 'loading':
            return onLoading()
         case 'confirmed':
            return <View hero={hero} comics={renderComics} />
         case 'error':
            return onError()
         default:
            throw new Error("Quelque chose s'est mal passe")
      }
   }

   return (
      <Fragment>
         {setContent(process, hero)}
      </Fragment>
   )
}

const View = ({ hero, comics }) => {

   const { thumbnail, name, description, homepage, wiki } = hero;
   let imgStyle = { objectFit: 'cover' }
   if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
      imgStyle = { 'objectFit': 'unset' };
   }

   const content = comics();

   return (
      <div className="aboutComicsHero">
         <div className="wrapper" >
            <img src={thumbnail} alt='hero' style={imgStyle}></img>
            <h1 className='heroName'>{name}</h1>
            <a href={homepage} className="button button__main">
               <div className="inner">HOMEPAGE</div>
            </a>
            <a href={wiki} className="button button__secondary">
               <div className="inner">WIKI</div>
            </a>
         </div>
         <div className="heroDescription">{description}</div>

         <h2 className="comics">Comics:</h2>
         <ul>
            {content}
         </ul>
      </div>

   )
}

AppHeroInfo.propTypes = {
   charId: PropTypes.number,
   randomHero: PropTypes.object,
}

export default AppHeroInfo;