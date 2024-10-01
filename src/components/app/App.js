import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Loading from '../spiner/Spiner'
import AppHeader from '../appHeader/appHeader'
import './App.scss';

const Page404 = lazy(() => import('../pages/404Page'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const HeroPage = lazy(() => import('../pages/HeroPage/HeroPage'));

const App = () => {

   return (
      <div className="App">
         <Router>
            <AppHeader />
            <main>
               <Suspense fallback={<Loading />}>
                  <Routes>
                     <Route exact path='/' element={<MainPage />}></Route>
                     <Route exact path='/:heroName' element={<HeroPage />}></Route>
                     <Route exact path='/comics' element={<ComicsPage />}></Route>
                     <Route exact path='/comics/:comicId' element={<SingleComicPage />}></Route>
                     <Route path='*' element={<Page404 />}></Route>
                  </Routes>
               </Suspense>
            </main>
         </Router>
      </div>
   );
}

export default App;
