import './appHeroesList.scss'
import MarvelService from '../../services/MarvelService'
import Loading from '../spiner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import AppHeroInfo from '../appHeroInfo/appHeroInfo'
import { Component } from 'react'


class Heroeslist extends Component {

   state = {
      heroes: [],
      active: true,
      loading: true,
      error: false
   }

   marvelService = new MarvelService();

   onError = () => {
      this.setState({ loading: false, error: true })
   }

   componentDidMount() {
      this.marvelService.getAllHeroes().then(res => {
         this.setState({ heroes: [...res] })
      }).catch(this.onError)
   }

   renderNineNewHeroes = (heroes) => {
      return heroes.map(item => {
         let imgStyle = { 'objectFit': 'cover' };
         if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = { 'objectFit': 'unset' };
         }
         return (<li className="hero_item" key={item.id} onClick={() => this.props.onCharSelected(item.id)} >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="hero_name">{item.name}</div>
         </li>
         )
      });
   }


   render() {
      const { heroes } = this.state;
      const content = this.renderNineNewHeroes(heroes)
      return (

         <div className="heroes_list" >
            <ul className="heroes_grid">
               {content}
            </ul>
            <button className="button button__main button__long">
               <div className="inner">load more</div>
            </button>
         </div>
      )
   }
}

export default Heroeslist;