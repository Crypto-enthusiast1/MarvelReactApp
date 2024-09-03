import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppHeader from '../appHeader/appHeader'
import MainPage from '../pages/MainPage'
import ComicsPage from '../pages/ComicsPage'
import './App.scss';

const App = () => {

   return (
      <div className="App">
         <Router>
            <AppHeader />
            <main>
               <Switch>
                  <Route exact path='/'>
                     <MainPage />
                  </Route>
                  <Route exact path='/comics'>
                     <ComicsPage />
                  </Route>
               </Switch>
            </main>
         </Router>
      </div>
   );
}

export default App;
