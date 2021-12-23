import { combineReducers } from "redux";
import { loginReducer } from "../screens/login/redux";

const rootReducer = combineReducers({
  loginReducer
})

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer