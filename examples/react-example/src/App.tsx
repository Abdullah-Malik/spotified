import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpotifyWrapped from './SpotifyWrapped';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpotifyWrapped />} />
        <Route path="/callback" element={<SpotifyWrapped />} />
      </Routes>
    </Router>
  );
}

export default App;