import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoPage from './pages/VideoPage';
import ChannelPage from './pages/ChannelPage';
import Header from './components/Header';
import UploadVideo from './pages/UploadVideo';


// I create this component to protect pages that should only be accessible
// when the user is logged in.
const ProtectedRoute = ({ children }) => {

    // I get the authentication status and loading status from my AuthContext.
    const { isAuthenticated, loading } = useAuth();

    // While I am checking whether the user is logged in, I show a loading message.
    if (loading) return <div>Loading...</div>;

    // If the user is not logged in, I redirect them to the login page.
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If the user is logged in, I allow the requested page to be displayed.
    return children;
};


function AppContent() {
    return (
        <Router>

            <div className="app">

                {/* I display the Header across my application. */}
                <Header />

                <Routes>

                    {/* I display Home when the user visits the root URL "/". */}
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* :id is a dynamic value that identifies a particular video. */}
                    <Route path="/video/:id" element={<VideoPage />} />

                    {/* :id identifies a particular channel. */}
                    <Route path="/channel/:id" element={<ChannelPage />} />

                    {/* I protect My Channel so only logged-in users can access it. */}
                    <Route
                        path="/my-channel"
                        element={
                            <ProtectedRoute>
                                <ChannelPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/upload" element={ <ProtectedRoute><UploadVideo /></ProtectedRoute> }/>

                </Routes>
            </div>

        </Router>
    );
}


function App() {

    // I wrap my application with AuthProvider so that
    // authentication information can be accessed by my components.
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;