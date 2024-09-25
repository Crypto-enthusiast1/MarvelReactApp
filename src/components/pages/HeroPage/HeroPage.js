import ComicsHeader from "../../appHeaderComics/appHeaderComics"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from '../../spiner/Spiner'
import useMarvelService from "../../../services/MarvelService"
import './HeroPage.scss'


const HeroPage = () => {
   const [hero, setHero] = useState({})
   const { heroName } = useParams();
   const { getHeroByName } = useMarvelService();

   useEffect(() => {
      getHero(heroName)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [heroName])

   const getHero = (name) => {
      getHeroByName(name).then(res => {
         setHero(res)
         renderHero()
      })
   }

   const renderHero = () => {
      if (hero.length > 0) {
         return (
            <div className="oneHero">
               <img src={hero[0].thumbnail} alt="logo" />
               <div className="heroInfo">
                  <h2>{hero[0].name}</h2>
                  <div>{hero[0].description ? hero[0].description : 'No description abour this hero'}</div>
               </div>
            </div>
         );
      } else {
         return null;
      }
   }

   const content = hero.length > 0 ? renderHero() : <Loading />

   return (
      <>
         <ComicsHeader />
         {content}
      </>

   )
}

export default HeroPage