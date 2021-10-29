import {
	HashRouter, Switch, Route,
} from 'react-router-dom';
import 'materialize-css';
import Register from './components/Register';

const App = () => (
	<HashRouter>
		<Switch>
			<Route path="/register" exact>
				<Register />
			</Route>
		</Switch>
	</HashRouter>
);

export default App;
