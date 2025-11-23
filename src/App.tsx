// App.jsx (Updated)
import { useState } from 'react'; // Not used here, but keeping if needed elsewhere
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Correct imports
import './App.css';
import Navigation from './components/Navigation'; // Ensure path is correct
import { routeConfig } from './contacts/Route';
// Import a Home component if you have one, or create a simple placeholder below

// Optional: Create a simple Home component inline or in a separate file

function App() {
  return (
    <BrowserRouter> {/* Wrap everything in BrowserRouter */}
      <div className="App"> {/* Optional wrapper for global styles */}
        <Navigation /> {/* This will always show (e.g., navbar with links) */}
        <Routes> {/* Routes component wraps all Route elements */}
          {routeConfig.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
