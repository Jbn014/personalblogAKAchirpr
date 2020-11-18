import * as React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import Home from "./components/Home"
import Navbar from "./components/navbar"
import AddBlog from "./components/AddBlog"
import SingleBlog from "./components/SingleBlog"

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			name: null
		};
	}

	async componentDidMount() {
		try {
			let r = await fetch('/api/hello');
			let name = await r.json();
			this.setState({ name });
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/" component ={Home} />
					<Router exact path="/blog/add" component={AddBlog} />
					<Route exact path="/chirp/:id/" component={SingleBlog} />
				</Switch>
				</Router>
		);
	}
}

export interface IAppProps {}

export interface IAppState {
	name: string;
}

export default App;
