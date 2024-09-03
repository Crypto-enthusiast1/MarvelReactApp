import { useState } from 'react'
import RandomHero from '../appRandomHero/appRandomHero'
import Heroeslist from '../appHeroesList/appHeroesList'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import AppHeroInfo from '../appHeroInfo/appHeroInfo'
import bgImg from '../../resources/img/bg_asset.png'
import up from '../../resources/img/hummerUp.svg'
import ScrollUpButton from 'react-scroll-up';


const MainPage = () => {
   const [selectedChar, setSelectedChar] = useState(null);
   const [firstRenderHeroOnPage, setFirstRenderHeroOnPage] = useState({});
   const [selectedComics, setSelectedComics] = useState(null);

   const onCharSelected = (id) => {
      setSelectedChar(id)
   }

   const onHeroLoad = (id) => {
      setFirstRenderHeroOnPage(id)
   }

   const onComicsSelected = (id) => {
      setSelectedComics(id)
   }

   return (
      <>
         <ErrorBoundary>
            <RandomHero onHeroLoad={onHeroLoad} />
         </ErrorBoundary>
         <div className="heroWrapper">
            <ErrorBoundary>
               <Heroeslist onCharSelected={onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
               <AppHeroInfo charId={selectedChar} randomHero={firstRenderHeroOnPage} />
            </ErrorBoundary>
            <img src={bgImg} alt='backGround' className='backGroundImg' />
            <ScrollUpButton showUnder={500}>
               <img src={up} alt='up' className='hummer' />
            </ScrollUpButton>
         </div>
      </>
   )
}

export default MainPage