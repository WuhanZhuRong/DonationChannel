import { combineReducers } from "redux";
import demand from "./demand";
import hospitals from "./hospitals";

export default combineReducers({
  demand, hospitals
});
