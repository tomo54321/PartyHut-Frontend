import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppContainer } from './Components/AppContainer';
import { AuthRoute } from './Components/AuthRoute';
import { NavBar } from './Components/NavBar';
import { Home } from './Pages/Home';
import { Music } from './Pages/Music';
import { AllPlaylists } from './Pages/Playlist/All';
import { ShowPlaylist } from  './Pages/Playlist/Show';
import { AuthPopup } from './Pages/Popups/Auth/Popup';
import { Room } from './Pages/Room';

const App: React.FC<{}> = () => {

	return (
		<AppContainer>
			<div className="sm:flex h-screen w-screen">
				<NavBar />
				<div className="max-w-full sm:h-full sm:w-full sm:overflow-y-auto">
					<Switch>
						<Route path="/" exact component={Home} />
						<AuthRoute path="/room/:roomId" exact component={Room} />

						<AuthRoute path="/music" exact component={Music} />
						
						<AuthRoute path="/playlists" exact component={AllPlaylists} />
						<AuthRoute path="/playlist/:playlistId" exact component={ShowPlaylist} />
					</Switch>
				</div>
				<AuthPopup />
			</div>
		</AppContainer>
	)

};
export default App;
