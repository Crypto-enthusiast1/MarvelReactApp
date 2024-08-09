import AppHeader from '../appHeader/appHeader'
import RandomHero from '../appRandomHero/appRandomHero'
import Heroeslist from '../appHeroesList/appHeroesList'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import AppHeroInfo from '../appHeroInfo/appHeroInfo'
import bgImg from '../../resources/img/bg_asset.png'
import up from '../../resources/img/hummerUp.svg'
import ScrollUpButton from 'react-scroll-up';
import { Component } from 'react'

import './App.scss';



class App extends Component {

   state = {
      selectedChar: null,
      firstRenderHeroOnPage: {}
   }

   onCharSelected = (id) => {
      this.setState({
         selectedChar: id
      })
   }

   onHeroLoad = (id) => {
      this.setState({
         firstRenderHeroOnPage: id
      })
   }

   render() {
      return (
         <div className="App">
            <ErrorBoundary>
               <AppHeader />
               <RandomHero onHeroLoad={this.onHeroLoad} />
               <div className="heroWrapper">
                  <Heroeslist onCharSelected={this.onCharSelected} />
                  <AppHeroInfo charId={this.state.selectedChar} randomHero={this.state.firstRenderHeroOnPage} />
                  <img src={bgImg} alt='backGround' className='backGroundImg' />
                  <ScrollUpButton showUnder={500}>
                     <img src={up} alt='up' className='hummer' />
                  </ScrollUpButton>

               </div>
            </ErrorBoundary>
         </div>
      );
   }
}

export default App;
