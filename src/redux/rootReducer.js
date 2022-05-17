import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userReducer";
import teamReducer from "./team/teamReducer";
import dataReducer from "./data/dataReducer";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  team: teamReducer,
  data: dataReducer
});

export default persistReducer(persistConfig, rootReducer);