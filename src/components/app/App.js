import AppHeader from '../appHeader/appHeader'
import RandomHero from '../appRandomHero/appRandomHero'
import Heroeslist from '../appHeroesList/appHeroesList'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import AppHeroInfo from '../appHeroInfo/appHeroInfo'
import { Component } from 'react'

import './App.scss';



class App extends Component {

   state = {
      selectedChar: null
   }

   onCharSelected = (id) => {
      this.setState({
         selectedChar: id
      })
   }

   render() {
      return (
         <div className="App">
            <ErrorBoundary>
               <AppHeader />
               <RandomHero />
               <div className="heroWrapper">
                  <Heroeslist onCharSelected={this.onCharSelected} />
                  <AppHeroInfo charId={this.state.selectedChar} />
               </div>
            </ErrorBoundary>
         </div>
      );
   }
}

export default App;
