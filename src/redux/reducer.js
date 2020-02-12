import { combineReducers } from "redux";
import demand from "./demand";
import hospitals from "./hospitals";
import demandsMap from "./demandsMap";

export default combineReducers({
  demand, 
  hospitals, 
  demandsMap
});
