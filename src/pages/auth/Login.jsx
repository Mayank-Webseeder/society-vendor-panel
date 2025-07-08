import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Login = ({ onSwitch, onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  
  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy Login Credentials --> Replace this with real validation!
    if (email === "demo@velra.com" && password === "velra123") {
      if (onLogin) onLogin();
    } else {
      alert("Invalid email or password");
    }
  };




  return (
    <form onSubmit={handleLogin}>
      {/* Email Field */}
      <div className="mb-8">
        <label htmlFor="email" className="block text-[#1C1B1F]/[0.69] text-base font-semibold mb-1">Email</label>
        <input
          type="email"
          id="email"
          placeholder="abc9@gmail.com"
          className="w-full px-2 py-2 border-0 border-b-2 border-black/[0.12] rounded-none placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-blue-400 text-gray-800 text-lg transition-colors"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-[#1C1B1F]/[0.69] text-base font-semibold mb-1">Password</label>
        <input
          type="password"
          id="password"
          placeholder="velra123"
          className="w-full px-2 py-2 border-0 border-b-2 border-black/[0.12] rounded-none placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-blue-400 text-gray-800 text-lg transition-colors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {/* Remember Me & Forgot Password */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="form-checkbox h-4 w-4 text-blue-600 rounded cursor-pointer"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember" className={`ml-2 text-sm ${rememberMe ? 'text-gray-700' : 'text-black/50'} cursor-pointer`}>
            Remember Me
          </label>
        </div>
        <button
          type="button"
          className="text-[#56A9D9] border-none bg-white text-sm hover:text-blue-600 cursor-pointer"
          onClick={() => navigate('/auth/forgot-password')}
        >
          Forgot Password?
        </button>
      </div>


      {/* Login Button */}
      <button
        type="submit"
        className="w-full bg-[#56A9D9] text-lg text-white border-none font-bold py-2 rounded-md mb-6 shadow-xl hover:bg-blue-500 transition-colors cursor-pointer"
      >
        Log in
      </button>

      {/* Create New Account Button */}
      <button
        type="button"
        className="w-full border-solid border-2 bg-white border-[#56A9D9] text-[#56A9D9] text-lg font-medium py-2 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
        onClick={onSwitch}
      >
        Create New Account
      </button>
    </form>
  );
};


export default Login;