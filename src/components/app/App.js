import AppHeader from '../appHeader/appHeader'
import RandomHero from '../appRandomHero/appRandomHero'
import Heroeslist from '../appHeroesList/appHeroesList'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import AppHeroInfo from '../appHeroInfo/appHeroInfo'
import bgImg from '../../resources/img/bg_asset.png'
import up from '../../resources/img/hummerUp.svg'
import ScrollUpButton from 'react-scroll-up';
import { useState } from 'react'
import './App.scss';

const App = () => {

   const [selectedChar, setSelectedChar] = useState(null);
   const [firstRenderHeroOnPage, setFirstRenderHeroOnPage] = useState({});

   const onCharSelected = (id) => {
      setSelectedChar(id)
   }

   const onHeroLoad = (id) => {
      setFirstRenderHeroOnPage(id)
   }

   return (
      <div className="App">
         <AppHeader />
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
      </div>
   );
}

export default App;
