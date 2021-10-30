import {
	HashRouter, Switch, Route,
} from 'react-router-dom';
import 'materialize-css';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Activities from './views/Activities';
import Editor from './views/Editor';

const App = () => (
	<div className="custom-container">
		<HashRouter>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/activities" exact>
					<Activities />
				</Route>
				<Route path="/editor" exact>
					<Editor />
				</Route>
				<Route path="/login" exact>
					<Login />
				</Route>
				<Route path="/register" exact>
					<Register />
				</Route>
			</Switch>
		</HashRouter>
	</div>
);

export default App;
