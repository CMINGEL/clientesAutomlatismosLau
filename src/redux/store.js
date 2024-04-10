import { thunk } from 'redux-thunk'
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userSlice from "./userSlice";
import sesionReducer from "./sesionSlice"
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import persistStore from 'redux-persist/es/persistStore';



const persisConfig = {
    key: 'root',
    storage: storage,
    whitelist:['user', 'session']
}

const rootReducer = combineReducers({
    user : userSlice,
    session: sesionReducer
})

const persistedReducer = persistReducer(persisConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store)