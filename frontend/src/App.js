import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <Switch>
                <Route path="/register" component={Registration} />
                <Route path="/login">
                    <Login setToken={setToken} />
                </Route>
                <ProtectedRoute
                    path="/protected"
                    component={() => <div>Protected Content</div>}
                    token={token}
                />
                <Route path="/" component={() => <div>Home</div>} />
            </Switch>
        </Router>
    );
}

export default App;