import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '@mui/material/Skeleton';
import ComicsHeader from '../appHeaderComics/appHeaderComics';
import useMarvelService from "../../services/MarvelService";
import './SingleComicPage.scss';


const SingleComicPage = () => {
   const { comicId } = useParams();
   const [comic, setComic] = useState({});
   const { getComic, loading, error, clearError } = useMarvelService();
   useEffect(() => {
      getNewComic(comicId)
      renderComic()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [comicId])

   const getNewComic = (id) => {
      getComic(id).then(res => {
         setComic(...res)
      }).catch((e) => { throw new Error(e) })
      clearError();
   }

   const renderComic = () => {
      return (
         <div className='comic'>
            <img src={comic.thumbnail} alt="img" className='img' />
            <div className='wrapper'>
               <h2 className='title'>{comic.title}</h2>
               <div className='description'>{comic.description}</div>
               <span className='pageCount'>{comic.pageCount}</span>
               <span className='language'>{comic.language}</span>
               <span className='price'>{comic.price}</span>
            </div>
            <Link to='/comics' className='toAll'>Back to all</Link>
         </div>
      )
   }

   const renderSkeleton = () => {
      return (
         <div className='sketelonWrapper'>
            <Skeleton variant="rectangular" width={300} height={460} animation="wave" className='photo' />
            <Skeleton width={300} height={30} />
            <Skeleton width={550} height={150} />
            <Skeleton width={75} height={30} />
            <Skeleton width={120} height={30} />
            <Skeleton width={60} height={30} />
         </div>
      )
   }

   const newError = error ? <ErrorMessage /> : null;
   const load = loading ? renderSkeleton() : null;
   const newComic = (!load && !error && Object.keys(comic).length > 0) ? renderComic() : null;
   return (
      <>
         <ComicsHeader />
         {newError}
         {load}
         {newComic}
      </>
   )

}

export default SingleComicPage