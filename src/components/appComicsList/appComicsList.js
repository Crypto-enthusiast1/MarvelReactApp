import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useMarvelService from "../../services/MarvelService"
import Skeleton from '@mui/material/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Loading from '../spiner/Spiner'
import './appComicsList.scss'

const ComicsList = (props) => {
   const [comics, setComics] = useState([]);
   const [newOffset, setNewOffset] = useState(0);
   const [firstLoading, setFirstLoading] = useState(true)
   const [noMoreHeroesInDataFromServer, setNoMoreHeroesInDataFromServer] = useState(false);
   const { getAllComics, loading, error, clearError } = useMarvelService();

   useEffect(() => {
      getAllComics().then(res =>
         setComics(prevComics => [...prevComics, ...res.map(comic => ({ ...comic, active: false }))]))
         .finally(() => {
            setFirstLoading(false)
         })
      renderComics()

      clearError()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   const getNewComics = (newOffset) => {
      getAllComics(newOffset).then(res => {
         if (res.length < 8) {
            setNoMoreHeroesInDataFromServer(true);
         }
         setComics(prevComics => [...prevComics, ...res.map(comic => ({ ...comic, active: false }))])
      })
      setNewOffset(prevOffset => prevOffset + 8)
   }

   const preLoadSkeleton = () => {
      const arraySkeleton = [];
      for (let i = 0; i < 8; i++) {
         arraySkeleton.push(<li key={i}>
            <Skeleton variant="rectangular" width={225} height={346} animation="wave" />
            <Skeleton height={36} animation="wave" />
            <Skeleton width="30%" animation="wave" />
         </li>)
      }

      return arraySkeleton;
   }

   const onChangeActivehero = (id) => {
      const updatedComics = comics.map(hero => {
         return hero.id === id ? { ...hero, active: true } : { ...hero, active: false }
      });
      setComics(updatedComics)
   }

   const renderComics = () => {

      return comics.map(item => {
         const classActive = item.active ? 'selected' : null;
         let imgStyle = { 'objectFit': 'cover' };

         const handleClick = () => {
            // props.onCharSelected(item.id);
            onChangeActivehero(item.id);
         };
         if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = { 'objectFit': 'unset' };
         }

         const handleKeyDown = (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
               handleClick();
            }
         };

         return (
            <Link
               to={`/comics/${item.id}`}
               key={item.id}
               tabIndex={0}
               className={classActive}
               onClick={handleClick}
               onKeyDown={handleKeyDown}>
               <img src={item.thumbnail} style={imgStyle} alt="comics" />
               <div className='comicsTitle'>{item.title}</div>
               <div className='price'>{item.price}</div>
            </Link>
         )
      })
   }

   const buttonRender = () => {
      return (
         <button className="button button__main button__long" onClick={() => getNewComics(newOffset + 8)}>
            <div className="inner">load more</div>
         </button>
      )
   }


   const load = firstLoading ? preLoadSkeleton() : null;
   const errorMessage = error ? <ErrorMessage /> : null;
   const content = renderComics();
   let button = loading && !firstLoading ? <Loading /> : buttonRender();

   if (noMoreHeroesInDataFromServer) {
      button = null
   }

   return (
      <div>
         <ul className='comicsWrapper'>
            {load}
            {errorMessage}
            {content}
         </ul>
         {button}
      </div>
   )

}

export default ComicsList;