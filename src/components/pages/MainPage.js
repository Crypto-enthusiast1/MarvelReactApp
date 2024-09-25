import { useState } from 'react'
import { Helmet } from "react-helmet"
import RandomHero from '../appRandomHero/appRandomHero'
import Heroeslist from '../appHeroesList/appHeroesList'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import AppHeroInfo from '../appHeroInfo/appHeroInfo'
import bgImg from '../../resources/img/bg_asset.png'
import up from '../../resources/img/hummerUp.svg'
import ScrollUpButton from 'react-scroll-up'
import FindHeroByName from '../appFindHeroByName/appFindHeroByName'


const MainPage = () => {
   const [selectedChar, setSelectedChar] = useState(null);
   const [firstRenderHeroOnPage, setFirstRenderHeroOnPage] = useState({});

   const onCharSelected = (id) => {
      setSelectedChar(id)
   }

   const onHeroLoad = (id) => {
      setFirstRenderHeroOnPage(id)
   }

   return (
      <>
         <Helmet>
            <meta name="description"
               content="Site about Marvel Universe and its heroes" />
            <title>Marvel Universe</title>
         </Helmet>
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
            <FindHeroByName />
            <img src={bgImg} alt='backGround' className='backGroundImg' />
            <ScrollUpButton showUnder={500}>
               <img src={up} alt='up' className='hummer' />
            </ScrollUpButton>
         </div>
      </>
   )
}

export default MainPage