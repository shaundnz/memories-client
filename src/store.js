import {configureStore, combineReducers} from "@reduxjs/toolkit";

import postsSlice from "./components/Posts/postsSlice";

const rootReducer = combineReducers({
    posts: postsSlice.reducer
})

export default configureStore({
    reducer: rootReducer
})