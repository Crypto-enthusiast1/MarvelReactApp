import AppHeader from '../appHeader/appHeader'
import RandomHero from '../appRandomHero/appRandomHero'
import Heroeslist from '../appHeroesList/appHeroesList'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

import './App.scss';


function App() {
   return (
      <div className="App">
         <ErrorBoundary>
            <AppHeader />
            <RandomHero />
            <Heroeslist />
         </ErrorBoundary>
      </div>
   );
}

export default App;
