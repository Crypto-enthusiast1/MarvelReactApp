import { Component } from 'react'
import './appHeroInfo.scss';
import loki from '../../resources/img/loki.png'

class AppHeroInfo extends Component {

   constructor(props) {
      super(props);

      this.state = {
         thumbnail: null,
         name: null,
         description: null,
         homepage: null,
         wiki: null,

      }
   }

   render() {
      const { thumbnail, name, description, homepage, wiki } = this.state

      return (
         <div className="aboutComicsHero">
            <div className="wrapper">
               <img src={loki} alt='hero'></img>
               <h1 className='heroName'>LOKI</h1>
                  <a href={homepage} className="button button__main">
                     <div className="inner">HOMEPAGE</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                     <div className="inner">WIKI</div>
                  </a>
            </div>
            <div className="heroDescription">In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.</div>

            <h2 className="comics">Comics:</h2>
            <ul>
               <li>All-Winners Squad: Band of Heroes (2011) #3</li>
               <li>Alpha Flight (1983) #50</li>
               <li>Amazing Spider-Man (1999) #503</li>
               <li>Amazing Spider-Man (1999) #504</li>
               <li>AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)</li>
               <li>Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)</li>
               <li>Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)</li>
               <li>Vengeance (2011) #4</li>
               <li>Avengers (1963) #1</li>
               <li>Avengers (1996) #1</li>
            </ul>
         </div>
      )
   }
}

export default AppHeroInfo;