import Home from './views/Home'
import UserGenerator from './views/UserGenerator'
import SelectableGrid from './views/SelectableGrid';
import { Switch, Route} from 'react-router-dom';
import TimeOverlay from './components/TimeOverlay';
import './App.css';

function Error () {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}> 
      <h1>Error 404 - Page Not Found</h1>
    </div>
  )
}

function App() {
  return (
    <main>
      <TimeOverlay>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/user-generator' component={UserGenerator}/>
          <Route path='/selectable-grid' component={SelectableGrid}/>
          <Route component={Error}/>
        </Switch>
      </TimeOverlay>
    </main>
  )
}

export default App;
