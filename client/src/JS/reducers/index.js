import { combineReducers } from "redux";
import { userReducer } from "./user";
import {pubReducer} from "./pub"
import {alertReducer} from "./alert"
export const rootReducer = combineReducers({ userReducer,pubReducer,alertReducer });
