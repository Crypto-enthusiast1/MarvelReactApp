import { Helmet } from "react-helmet"
import ComicsHeader from '../appHeaderComics/appHeaderComics'
import ComicsList from '../appComicsList/appComicsList'

const ComicsPage = () => {

   return (
      <>
         <Helmet>
            <meta name="description"
               content="Site about Marvel Universe and its heroes" />
            <title>Marvel Comics</title>
         </Helmet>
         <ComicsHeader />
         <ComicsList />
      </>
   )
}

export default ComicsPage