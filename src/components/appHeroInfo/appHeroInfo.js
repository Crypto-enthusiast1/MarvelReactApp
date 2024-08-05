/* eslint-disable array-callback-return */
import { Component } from 'react'
import MarvelService from '../../services/MarvelService'
import './appHeroInfo.scss';

class AppHeroInfo extends Component {

   constructor(props) {
      super(props);

      this.state = {
         hero: {}

      }
   }

   componentDidMount() {
      this.updateHeroInfo()
   }

   componentDidUpdate(prevProps) {
      if (this.props.charId !== prevProps.charId) {
         this.updateHeroInfo();
         this.renderComics()
      }
   }

   marvelService = new MarvelService();

   updateHeroInfo = () => {
      const { charId } = this.props;
      if (!charId) {
         return;
      }
      this.marvelService.getHeroWithComicsById(charId).then(item => {
         if (!item.description) {
            item.description = 'There is no data about this character.'
         } else if (item.description && item.description.length > 228) {
            item.description = item.description.slice(0, 228) + '...'
         }
         this.setState({ hero: { ...item } })
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
      const { hero: { thumbnail, name, description, homepage, wiki } } = this.state
      const content = this.renderComics();
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
}

export default AppHeroInfo;