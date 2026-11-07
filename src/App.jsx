import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import authservice from "./appwrite/auth";
import {login, logout} from "./store/authslice";
import "./index.css";
import {Outlet} from "react-router-dom";
import {Footer, Header} from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice
      .getcurrentuser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({userData: userdata}))
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
