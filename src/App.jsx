import { Type } from "./utility/ActionType";
import { useContext, useEffect } from "react";
import "./App.css";
import Routing from "./Router";
import { DataContext } from "./components/DataProvider/DataProvider";
import { auth } from "./utility/Firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({ type: Type.SET_USER, user: authUser });
      } else {
        console.log("No user is signed in");
        dispatch({ type: Type.SET_USER, user: null });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
