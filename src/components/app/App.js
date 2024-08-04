import AppHeader from '../appHeader/appHeader'
import RandomHero from '../appRandomHero/appRandomHero'
import Heroeslist from '../appHeroesList/appHeroesList'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import AppHeroInfo from '../appHeroInfo/appHeroInfo'

import './App.scss';


function App() {
   return (
      <div className="App">
         <ErrorBoundary>
            <AppHeader />
            <RandomHero />
            <div className="heroWrapper">
               <Heroeslist />
               <AppHeroInfo />
            </div>
         </ErrorBoundary>
      </div>
   );
}

export default App;
