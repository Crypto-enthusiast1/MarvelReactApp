import { Component } from 'react'
import './appHeroesList.scss'
import MarvelService from '../../services/MarvelService'
import Loading from '../spiner/Spiner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import PropTypes from 'prop-types';
class Heroeslist extends Component {

   state = {
      heroes: [],
      loading: true,
      error: false,
      nineHeroLoading: false,
      offset: 210,
      noMoreHeroesInDataFromServer: false
   }

   componentDidMount(offset) {
      this.marvelService.getAllHeroes(offset).then(res => {
         const updatedHeroes = res.map(hero => ({
            ...hero, active: false
         }))
         this.setState({ heroes: updatedHeroes, loading: false })
      }).catch(this.onError)
   }

   componentDidUpdate() {

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

   onChangeActivehero = (id) => {
      const heroes = this.state.heroes;
      const updatedHeroes = heroes.map(hero => {
         return hero.id === id ? { ...hero, active: true } : { ...hero, active: false }
      });

      this.setState({ heroes: updatedHeroes });
   }

   renderNineNewHeroes = (heroes) => {

      return heroes.map(item => {
         let imgStyle = { 'objectFit': 'cover' };
         const classActive = item.active ? 'hero_item hero_item_selected' : 'hero_item';
         if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = { 'objectFit': 'unset' };
         }
         return (<li className={classActive} key={item.id} onClick={() => {
            this.props.onCharSelected(item.id);
            this.onChangeActivehero(item.id);
         }} >
            <img src={item.thumbnail} alt={item.name} style={imgStyle} />
            <div className="hero_name">{item.name}</div>
         </li>
         )
      });
   }

   onLoadNineNewHeroes = (offset) => {
      this.setState({ nineHeroLoading: true })
      this.marvelService.getAllHeroes(offset).then(res => {
         if (res.length < 9) {
            this.setState({ noMoreHeroesInDataFromServer: true })
         }
         const newNineHero = res.map(hero => ({
            ...hero, active: false
         }))
         this.setState(prevState => ({ heroes: [...prevState.heroes, ...newNineHero], nineHeroLoading: false, offset: prevState.offset + 9 }))
      }).catch(this.onError);
   }


   render() {
      const { heroes, loading, error, nineHeroLoading, noMoreHeroesInDataFromServer } = this.state;
      const content = !(loading || error) ? this.renderNineNewHeroes(heroes) : null;
      const load = loading ? this.preLoad() : null;
      const errorMessage = error ? <ErrorMessage /> : null;
      let newNineHero = nineHeroLoading ? <Loading /> : this.buttonRender()
      if (noMoreHeroesInDataFromServer) {
         newNineHero = null
      }
      return (
         <div className="heroes_list" >
            <ul className="heroes_grid">
               {load}
               {errorMessage}
               {content}
            </ul>
            {newNineHero}
         </div>
      )
   }

   buttonRender = () => {
      return (
         <button className="button button__main button__long" onClick={() => this.onLoadNineNewHeroes(this.state.offset + 9)}>
            <div className="inner">load more</div>
         </button>
      )
   }
}

Heroeslist.propTypes = {
   onCharSelected: PropTypes.func,
}

export default Heroeslist;