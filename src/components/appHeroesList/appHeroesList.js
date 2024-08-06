import { Component } from 'react'
import './appHeroesList.scss'
import MarvelService from '../../services/MarvelService'
import Loading from '../spiner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
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

   preLoad = () => {
      const arrayLoading = [];
      for (let i = 0; i < 9; i++) {
         arrayLoading.push(<Loading key={i} />)
      }
      return arrayLoading
   }

   componentDidMount() {
      this.marvelService.getAllHeroes().then(res => {
         this.setState({ heroes: [...res], loading: false })
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
      const { heroes, loading, error } = this.state;
      const content = !(loading || error) ? this.renderNineNewHeroes(heroes) : null;
      const load = loading ? this.preLoad() : null;
      const errorMessage = error ? <ErrorMessage /> : null;
      return (

         <div className="heroes_list" >
            <ul className="heroes_grid">
               {load}
               {errorMessage}
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