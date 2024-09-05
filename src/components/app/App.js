import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppHeader from '../appHeader/appHeader'
import MainPage from '../pages/MainPage'
import ComicsPage from '../pages/ComicsPage'
import Page404 from '../pages/404Page'
import SingleComicPage from '../pages/SingleComicPage'
import './App.scss';

const App = () => {

   return (
      <div className="App">
         <Router>
            <AppHeader />
            <main>
               <Routes>
                  <Route exact path='/' element={<MainPage />}></Route>
                  <Route exact path='/comics' element={<ComicsPage />}></Route>
                  <Route exact path='/comics/:comicId' element={<SingleComicPage />}></Route>
                  <Route path='*' element={<Page404 />}></Route>
               </Routes>
            </main>
         </Router>
      </div>
   );
}

export default App;
