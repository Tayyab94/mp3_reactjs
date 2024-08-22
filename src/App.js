import logo from './logo.svg';
import './App.css';
import { Mp3Player } from './Mp3Player';
import { CustomMp3Player } from "./customMp3Player";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom"
function App() {
  return (
    <>

      <BrowserRouter>
        <div className="App">
          <nav style={styles.navbar}>
            <Link to="/" style={styles.navLink}>MP3 Player</Link>
            <Link to="/upload-file" style={styles.navLink}>Upload MP3 files</Link>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Mp3Player />} />
          <Route path="/upload-file" element={<CustomMp3Player />} />
          <Route path="*" element={<Mp3Player />} />
        </Routes>
      </BrowserRouter>


    </>

  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#333',
  },
  navLink: {
    color: 'white',
    margin: '0 15px',
    textDecoration: 'none',
    fontSize: '18px',
  },
  pageContainer: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default App;
