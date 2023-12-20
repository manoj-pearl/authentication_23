import { combineReducers, configureStore } from "@reduxjs/toolkit";
import examCategoryReducer from "./slices/examCategory"
import authReducer from "./slices/authSlices"
import homeReducer from "./slices/homeSlices"
import examsFaq from './slices/examFaqSlice'
import quizReducer from './slices/quizSlice'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import newsSlice from "./slices/newsSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,

};

const rootReducer = combineReducers({
  examsCategory:examCategoryReducer,
    auth:authReducer,
    home:homeReducer,
    examsFaq : examsFaq,
    quiz:quizReducer,
    news:newsSlice,

});


// const rootReducer = (state, action) => {
// };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});






