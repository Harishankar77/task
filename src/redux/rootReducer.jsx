import { combineReducers } from "redux";
// import { persistReducer } from 'redux-persist';

import storage from "redux-persist/lib/storage";
import authReducer from "./slices/authSlice";
import todoReducer from "./slices/todoSlice";

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [""],
};

export const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: [""],
};

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

export default rootReducer;
