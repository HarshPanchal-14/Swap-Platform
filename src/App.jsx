import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Breadcrumb from './components/ui/Breadcrumb';
import { STORAGE_KEYS, APP_CONFIG } from './config/constants';
import AdminDashboard from './pages/AdminDashboard';
import BrowseSkills from './pages/BrowseSkills';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import cacheService from './services/cache';
import webSocketService from './services/websocket';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize app on mount
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async() => {
    try {
      // Check for cached user data
      const cachedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

      if (cachedUser && authToken) {
        const userData = JSON.parse(cachedUser);
        setIsLoggedIn(true);
        setUser(userData);

        if (userData.email === 'admin@skillswap.com') {
          setIsAdmin(true);
        }

        // Initialize WebSocket connection
        try {
          await webSocketService.connect(authToken);
        } catch (error) {
          console.warn('WebSocket connection failed:', error);
        }
      }

      // Initialize cache service
      cacheService.cleanup();
    } catch (error) {
      console.error('App initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async(userData) => {
    try {
      setIsLoggedIn(true);
      setUser(userData);

      // Store user data
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'demo-token'); // In real app, get from API

      // Cache user data
      cacheService.cacheUserData(userData.id, userData, { persistent: true });

      // Check if user is admin
      if (userData.email === 'admin@skillswap.com' || userData.role === 'admin') {
        setIsAdmin(true);
      }

      // Initialize WebSocket connection
      try {
        await webSocketService.connect('demo-token');
      } catch (error) {
        console.warn('WebSocket connection failed:', error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignUp = async(userData) => {
    try {
      setIsLoggedIn(true);
      setUser(userData);

      // Store user data
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'demo-token'); // In real app, get from API

      // Cache user data
      cacheService.cacheUserData(userData.id, userData, { persistent: true });

      // Check if user is admin
      if (userData.role === 'admin') {
        setIsAdmin(true);
      }

      // Initialize WebSocket connection
      try {
        await webSocketService.connect('demo-token');
      } catch (error) {
        console.warn('WebSocket connection failed:', error);
      }
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsAdmin(false);

    // Clear stored data
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);

    // Disconnect WebSocket
    webSocketService.disconnect();

    // Clear cache
    cacheService.clear(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading SkillSwap...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
            <main className="container mx-auto px-4 py-8">
              <Breadcrumb className="mb-6" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse-skills" element={<BrowseSkills />} />
                <Route
                  path="/dashboard"
                  element={
                    isLoggedIn ? (
                      <Dashboard user={user} />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/admin"
                  element={
                    isAdmin ? (
                      <AdminDashboard />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route
                  path="/login"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <Login onLogin={handleLogin} />
                    )
                  }
                />
                <Route
                  path="/signup"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <SignUp onSignUp={handleSignUp} />
                    )
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
