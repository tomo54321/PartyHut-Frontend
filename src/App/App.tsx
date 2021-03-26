import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NavBar } from './Components/NavBar';
import { Home } from './Pages/Home';
import { Room } from './Pages/Room';
const App: React.FC<{}> = () => {

	return (
		<div className="sm:flex h-screen w-screen">
			<BrowserRouter>
				<NavBar />
				<div className="max-w-full sm:h-full sm:w-full sm:overflow-y-auto">
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/room/:roomId" exact component={Room} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	)

};
export default App;
