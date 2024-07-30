import AppHeader from '../appHeader/appHeader'
import RandomHero from '../appRandomHero/appRandomHero'
import Heroeslist from '../appHeroesList/appHeroesList'

import './App.scss';


function App() {
   return (
      <div className="App">
         <AppHeader />
         <RandomHero />
         <Heroeslist />
      </div>
   );
}

export default App;
