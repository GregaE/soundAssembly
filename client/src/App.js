import './App.css';
import Login from "./components/Login/login";
import Dashboard from "./components/Library/dashboard";

function App() {
  // Code returned by spotify API during auth
  const code = new URLSearchParams(window.location.search).get('code');

  // const [artistList, setArtistList] = useState([]);
  // const [username, setUsername] = useState("");
  // const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   // if account has existing library
  //   getLibrary().then(account => {
  //     if (account.length > 0) {
  //       setArtistList(account[0].artists);
  //       setUsername(account[0].username);
  //       account[0].tags.forEach(tag => tag.status = "inactive");
  //       if (account[0]) {
  //         setTags(account[0].tags);
  //       }
  //     }
  //   })
  // },[setArtistList, setUsername, setTags])

  return code ? <Dashboard code={code} /> : <Login />

}

export default App;
