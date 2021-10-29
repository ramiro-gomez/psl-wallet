import {
	HashRouter, Switch, Route,
} from 'react-router-dom';
import 'materialize-css';
import Register from './components/Register';
import Login from './components/Login';

const App = () => (
	<HashRouter>
		<Switch>
			<Route path="/register" exact>
				<Register />
			</Route>
			<Route path="/login" exact>
				<Login />
			</Route>
		</Switch>
	</HashRouter>
);

export default App;
