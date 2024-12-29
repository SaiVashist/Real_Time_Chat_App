import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './components/Home/Home';
import LoggedIn from './components/Dashboard/Dashboard';
import { CssBaseline, TextField, Button } from '@mui/material';
import theme from './theme';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Routes>
      <Route path='/' element = {<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<LoggedIn />} /> {/* Add this route */}
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
