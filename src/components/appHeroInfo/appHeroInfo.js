/* eslint-disable array-callback-return */
import { Component, Fragment } from 'react'
import MarvelService from '../../services/MarvelService'
import Loading from '../spiner/Spiner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './appHeroInfo.scss';

class AppHeroInfo extends Component {

   constructor(props) {
      super(props);

      this.state = {
         hero: {},
         firstRenderDone: false,
         loading: true,
         error: false

      }
   }

   componentDidMount() {
      if (this.props.randomHero) {
         console.log('componentDidMount')
         this.checkAndRender();
      }
   }

   componentDidUpdate(prevProps) {
      const { charId, randomHero } = this.props;

      if (randomHero !== prevProps.randomHero) {
         console.log('componentDidUpdate')
         this.checkAndRender();
      }

      if (charId && charId !== prevProps.charId) {
         this.updateHeroInfo(charId);
         this.renderComics()
      }
   }

   checkAndRender = () => {
      const { randomHero } = this.props;
      if (!this.state.firstRenderDone && randomHero) {
         console.log('checkAndRender после if')
         this.setState({
            hero: { ...randomHero },
            firstRenderDone: true,
            // loading: false
         });
      }
   };

   onError = () => {

      return (
         <div className="aboutComicsHero">
            <div className="wrapper" style={{ 'justifyContent': 'center' }}>
               <ErrorMessage />
            </div>
         </div>
      )
   }

   onLoading = () => {
      return (
         <div className="aboutComicsHero">
            <div className="wrapper" style={{ 'justifyContent': 'center' }}>
               <Loading />
            </div>
         </div>
      )
   }


   marvelService = new MarvelService();
   updateHeroInfo = (id) => {
      if (!id) {
         return
      }
      this.setState({ loading: true })
      this.marvelService.getHeroWithComicsById(id).then(item => {
         if (!item.description) {
            item.description = 'There is no data about this character.'
         } else if (item.description && item.description.length > 228) {
            item.description = item.description.slice(0, 228) + '...'
         }
         this.setState({ hero: { ...item }, loading: false })
      })
   }

   renderComics = () => {
      const { comics } = this.state.hero;
      if (!comics) {
         return;
      }
      return comics.map((item, i) => {
         if (i > 9) return;
         return (<a href={item.resourceURI} key={i}>
            <li>{item.name}</li>
         </a>
         )
      })
   }

   render() {
      const { hero, loading, error } = this.state
      const load = loading ? this.onLoading() : null;
      const errorMessage = error ? this.onError() : null;
      const allContent = !(loading || error) ? <View hero={hero} comics={this.renderComics} /> : null;
      return (
         <Fragment>
            {load}
            {errorMessage}
            {allContent}
         </Fragment>
      )
   }
}

const View = ({ hero, comics }) => {
   const { thumbnail, name, description, homepage, wiki } = hero;
   const content = comics();
   return (
      <div className="aboutComicsHero">
         <div className="wrapper">
            <img src={thumbnail} alt='hero'></img>
            <h1 className='heroName'>{name}</h1>
            <a href={homepage} className="button button__main">
               <div className="inner">HOMEPAGE</div>
            </a>
            <a href={wiki} className="button button__secondary">
               <div className="inner">WIKI</div>
            </a>
         </div>
         <div className="heroDescription">{description}</div>

         <h2 className="comics">Comics:</h2>
         <ul>
            {content}
         </ul>
      </div>
   )
}

export default AppHeroInfo;