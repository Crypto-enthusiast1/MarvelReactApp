import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import ComicsHeader from '../appHeaderComics/appHeaderComics'
import useMarvelService from "../../services/MarvelService"
import './SingleComicPage.scss'


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
      })
   }

   const renderComic = () => {
      return (
         <>
            <ComicsHeader />
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
         </>

      )
   }



   const newComic = renderComic();
   return (
      <>
         {newComic}
      </>
   )
}

export default SingleComicPage