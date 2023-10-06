/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from "redux";
import headerMainReducer from "./HeaderMain";
 
/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer() {
    return combineReducers({
        headerMain: headerMainReducer,
    });
 }