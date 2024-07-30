import './appHeroesList.scss'
import abyss from '../../resources/img/abys.png'
import loki from '../../resources/img/loki.png'
import warlock from '../../resources/img/warlock.png'
import boom from '../../resources/img/boom.png'
import calypso from '../../resources/img/calypso.png'
import colen from '../../resources/img/collen.png'
import hellstorm from '../../resources/img/hellstorm.png'
import damage from '../../resources/img/damage.png'
import hulk from '../../resources/img/hulk.png'

const Heroeslist = () => {
   return (
      <div className="heroes_list">
         <ul className="heroes_grid">
            <li className="hero_item">
               <img src={abyss} alt="abyss" />
               <div className="hero_name">ABYSS</div>
            </li>
            <li className="hero_item hero_item_selected">
               <img src={loki} alt="loki" />
               <div className="hero_name">loki</div>
            </li>
            <li className="hero_item">
               <img src={warlock} alt="warlock" />
               <div className="hero_name">Adam Warlock</div>
            </li>
            <li className="hero_item">
               <img src={boom} alt="boom" />
               <div className="hero_name">Boom Boom</div>
            </li>
            <li className="hero_item">
               <img src={calypso} alt="calypso" />
               <div className="hero_name">Calypso</div>
            </li>
            <li className="hero_item">
               <img src={colen} alt="colen" />
               <div className="hero_name">Colleen Wing</div>
            </li>
            <li className="hero_item">
               <img src={hellstorm} alt="hellstorm" />
               <div className="hero_name">Daimon Hellstrom</div>
            </li>
            <li className="hero_item">
               <img src={damage} alt="damage" />
               <div className="hero_name">Damage Control</div>
            </li>
            <li className="hero_item">
               <img src={hulk} alt="hulk" />
               <div className="hero_name">hulk</div>
            </li>
         </ul>
      </div>
   )
}

export default Heroeslist;