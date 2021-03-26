import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import { Home } from './Pages/Home';
import { AuthPopup } from './Pages/Popups/Auth/Popup';
import { Room } from './Pages/Room';

const App: React.FC<{}> = () => {

	return (
		<div className="sm:flex h-screen w-screen">
			<NavBar />
			<div className="max-w-full sm:h-full sm:w-full sm:overflow-y-auto">
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/room/:roomId" exact component={Room} />
				</Switch>
			</div>
			<AuthPopup />
		</div>
	)

};
export default App;
