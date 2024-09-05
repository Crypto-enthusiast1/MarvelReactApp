import { Link } from 'react-router-dom'
import imgPage from './404page.png'

const Page404 = () => {

   return (
      <div>
         <img src={imgPage} alt="img" />
         <Link to='/' style={{ "display": "inline-block", "fontSize": "26px", "marginTop": "20px" }}>Back to main page</Link>
      </div>
   )
}

export default Page404