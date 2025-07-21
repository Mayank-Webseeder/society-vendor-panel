import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './AuthContext.jsx';
import { OnboardingProvider } from './pages/onboarding/OnboardingContext.jsx';
import { UserProvider } from './UserContext.jsx';
import './index.css';
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <AuthProvider>
        <OnboardingProvider>
          <App />
        </OnboardingProvider>
      </AuthProvider>
    </UserProvider>
  </BrowserRouter>,
)