import { useEffect, useState, useMemo } from 'react'
import './appHeroesList.scss'
import useMarvelService from '../../services/MarvelService'
import Loading from '../spiner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import PropTypes from 'prop-types'
import Skeleton from '@mui/material/Skeleton'
import { motion } from "framer-motion"

const Heroeslist = (props) => {

   const [heroes, setHeroes] = useState([]);
   const [nineHeroLoading, setNineHeroLoading] = useState(false);
   const [offset, setOffset] = useState(210);
   const [noMoreHeroesInDataFromServer, setNoMoreHeroesInDataFromServer] = useState(false);
   const [firstLoadNineHero, setFirstLoadNineHero] = useState(true)
   const [animatedHeroes, setAnimatedHeroes] = useState([]);

   const { clearError, getAllHeroes, process, setProcess } = useMarvelService();

   useEffect((offset) => {
      onLoadNineNewHeroes(offset)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   const preLoad = () => {
      const arrayLoading = [];
      for (let i = 0; i < 9; i++) {
         arrayLoading.push(<Skeleton variant="rectangular" width={200} height={320} animation="wave" key={i} />)
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

         const isAnimated = animatedHeroes.includes(item.id);

         return (
            <motion.li
               initial={!isAnimated ? { opacity: 0, scale: 0.5 } : {}}
               animate={!isAnimated ? { opacity: 1, scale: 1 } : {}}
               transition={{ duration: 0.2, delay: 0.2 }}
               className={classActive}
               key={item.id}
               tabIndex="0"
               onClick={handleClick}
               onKeyDown={handleKeyDown}
               onAnimationComplete={() => {
                  if (!isAnimated) {
                     setAnimatedHeroes(prev => [...prev, item.id]);
                  }
               }}
            >
               <img src={item.thumbnail} alt={item.name} style={imgStyle} />
               <div className="hero_name">{item.name}</div>
            </motion.li>
         );
      });
   }

   const onLoadNineNewHeroes = (offset) => {
      firstLoadNineHero ? setNineHeroLoading(false) : setNineHeroLoading(true)
      getAllHeroes(offset).then(res => {
         if (res.length < 9) {
            setNoMoreHeroesInDataFromServer(true);
         }
         const newNineHero = res.map(hero => ({
            ...hero, active: false
         }))
         setHeroes(prevHeroes => [...prevHeroes, ...newNineHero]);
         setNineHeroLoading(false)
         setFirstLoadNineHero(false)
         clearError()
         setOffset(prevOffset => prevOffset + 9)
      }).then(() => setProcess('confirmed'));
   }

   const buttonRender = () => {
      return (
         <button className="button button__main button__long" onClick={() => onLoadNineNewHeroes(offset + 9)}>
            <div className="inner">load more</div>
         </button>
      )
   }

   const setContent = (process, Component) => {
      switch (process) {
         case 'waiting':
         case 'loading':
            return firstLoadNineHero ? preLoad() : <Component />
         case 'confirmed':
            return renderNineNewHeroes(heroes)
         case 'error':
            return <ErrorMessage />
         default:
            throw new Error("Quelque chose s'est mal passe")
      }
   }

   const content = useMemo(() => {
      return setContent(process, () => renderNineNewHeroes(heroes))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [process, heroes])

   let newNineHero = nineHeroLoading ? <Loading /> : buttonRender();

   if (noMoreHeroesInDataFromServer) {
      newNineHero = null
   }
   return (
      <div className="heroes_list" >
         <ul className="heroes_grid">
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