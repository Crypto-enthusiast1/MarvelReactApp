import { useEffect, useState } from 'react'
import './appHeroesList.scss'
import MarvelService from '../../services/MarvelService'
import Loading from '../spiner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import PropTypes from 'prop-types';
const Heroeslist = (props) => {

   const [heroes, setHeroes] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [nineHeroLoading, setNineHeroLoading] = useState(false);
   const [offset, setOffset] = useState(210);
   const [noMoreHeroesInDataFromServer, setNoMoreHeroesInDataFromServer] = useState(false);

   const marvelService = new MarvelService();

   useEffect((offset) => {
      marvelService.getAllHeroes(offset).then(res => {
         const updatedHeroes = res.map(hero => ({
            ...hero, active: false
         }))
         setHeroes(updatedHeroes)
         setLoading(false)
      }).catch(onError)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const onError = () => {
      setLoading(false);
      setError(true);
   }

   const preLoad = () => {
      const arrayLoading = [];
      for (let i = 0; i < 9; i++) {
         arrayLoading.push(<Loading key={i} />)
      }
      return arrayLoading
   }

   const onChangeActivehero = (id) => {
      const updatedHeroes = heroes.map(hero => {
         return hero.id === id ? { ...hero, active: true } : { ...hero, active: false }
      });
      setHeroes(updatedHeroes)
   }

   const renderNineNewHeroes = (heroes) => {
      return heroes.map(item => {
         let imgStyle = { 'objectFit': 'cover' };
         const classActive = item.active ? 'hero_item hero_item_selected' : 'hero_item';
         if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = { 'objectFit': 'unset' };
         }

         const handleClick = () => {
            props.onCharSelected(item.id);
            onChangeActivehero(item.id);
         };

         const handleKeyDown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
               handleClick();
            }
         };

         return (
            <li
               className={classActive}
               key={item.id}
               tabIndex="0"
               onClick={handleClick}
               onKeyDown={handleKeyDown}
            >
               <img src={item.thumbnail} alt={item.name} style={imgStyle} />
               <div className="hero_name">{item.name}</div>
            </li>
         );
      });
   }

   const buttonRender = () => {
      return (
         <button className="button button__main button__long" onClick={() => onLoadNineNewHeroes(offset + 9)}>
            <div className="inner">load more</div>
         </button>
      )
   }


   const onLoadNineNewHeroes = (offset) => {
      setNineHeroLoading(true)
      marvelService.getAllHeroes(offset).then(res => {
         if (res.length < 9) {
            setNoMoreHeroesInDataFromServer(true);
         }
         const newNineHero = res.map(hero => ({
            ...hero, active: false
         }))
         setHeroes(prevHeroes => [...prevHeroes, ...newNineHero]);
         setNineHeroLoading(false);
         setOffset(prevOffset => prevOffset + 9)
      }).catch(onError);
   }

   const content = !(loading || error) ? renderNineNewHeroes(heroes) : null;
   const load = loading ? preLoad() : null;
   const errorMessage = error ? <ErrorMessage /> : null;
   let newNineHero = nineHeroLoading ? <Loading /> : buttonRender()
   if (noMoreHeroesInDataFromServer) {
      newNineHero = null
   }
   return (
      <div className="heroes_list" >
         <ul className="heroes_grid">
            {load}
            {errorMessage}
            {content}
         </ul>
         {newNineHero}
      </div>
   )

}

Heroeslist.propTypes = {
   onCharSelected: PropTypes.func.isRequired,
}

export default Heroeslist;