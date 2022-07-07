import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./db";
const MyContext = createContext();
let defaultDate = new Date( Date.UTC());
//defaultDate.setHours(0,0,0,0);

function Parent({ children }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "LOGIN":
          return {
            ...state,
            user: action.payload
          };
        case "LOGOUT":
          return {
            ...state,
            user: undefined
          };
        case "ADDDATE":
          let d = new Date(state.data);
          d.setDate(d.getDate() + 1);
          d.setHours(0,0,0,0);
          return {
            ...state,
            data: d
          };
        case "MINUSDATE":
          let dm = new Date(state.data);
          dm.setDate(dm.getDate() - 1);
          dm.setHours(0,0,0,0);
          return {
            ...state,
            data: dm
          };
          case "SETDEBUG":
            return{
              ...state,
              debug:!state.debug
            }
        default:
          return { ...state };
      }
    },
    { user: undefined, list: [], data: defaultDate, debug:false }
  );

  const actions = useMemo(() => {
    return {
      login: (user) => {
        dispatch({ type: "LOGIN", payload: user });
      },
      logout: () => {
        dispatch({ type: "LOGOUT" });
      },
      addDate: () => {
        dispatch({ type: "ADDDATE" });
      },
      minusDate: () => {
        dispatch({ type: "MINUSDATE" });
      },
      toggleDebug: ()=> {
        dispatch({type:"SETDEBUG"})
      }
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user login", user);
        actions.login(user);
      } else {
        actions.logout("user logout");
      }
    });
  }, []);

  return (
    <MyContext.Provider value={[state, actions]}>{children}</MyContext.Provider>
  );
}
export const useMyContext = () => useContext(MyContext);
export default Parent;
