import { HashRouter, Switch } from 'react-router-dom';
import 'materialize-css';
import { Provider } from 'react-redux';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Activities from './views/Activities';
import Editor from './views/Editor';
import { UserRoles } from './types/Auth';
import AppRoute from './routes/AppRoute';
import store from './store';

const App = () => (
	<Provider store={store}>
		<div className="custom-container">
			<HashRouter>
				<Switch>
					<AppRoute path="/" exact component={Home} onlyFor={UserRoles.USER} redirectPath="/login" />
					<AppRoute path="/activities" exact component={Activities} onlyFor={UserRoles.USER} redirectPath="/login" />
					<AppRoute path="/editor" exact component={Editor} onlyFor={UserRoles.USER} redirectPath="/login" />
					<AppRoute path="/login" exact component={Login} onlyFor={UserRoles.ANONYM} redirectPath="/" />
					<AppRoute path="/register" exact component={Register} onlyFor={UserRoles.ANONYM} redirectPath="/" />
				</Switch>
			</HashRouter>
		</div>
	</Provider>
);

export default App;
