import { createStore, combineReducers } from "redux";
import authenticationReducer from "./reducers/authentication";
import inMemoryDataReducer from "./reducers/inMemoryData";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  inMemoryData: inMemoryDataReducer,
});

const store = createStore(rootReducer);
export default store;
