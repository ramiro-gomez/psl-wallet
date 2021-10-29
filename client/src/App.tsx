import {
	HashRouter, Switch, Route,
} from 'react-router-dom';
import 'materialize-css';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Activities from './views/Activities';

const App = () => (
	<HashRouter>
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/activities" exact>
				<Activities />
			</Route>
			<Route path="/login" exact>
				<Login />
			</Route>
			<Route path="/register" exact>
				<Register />
			</Route>
		</Switch>
	</HashRouter>
);

export default App;
