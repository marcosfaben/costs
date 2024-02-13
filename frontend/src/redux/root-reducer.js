import { combineReducers } from "redux";

import useReducer from "./user/reducer";
import projectReducer from "./project/reducer";
import categoryReducer from "./category/reducer";

const rootReducer = combineReducers({useReducer, projectReducer, categoryReducer})

export default rootReducer;