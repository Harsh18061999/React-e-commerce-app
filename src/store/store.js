import { compose,createStore,applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore,persistReducer } from "redux-persist";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root.saga";
// import persistReducer from "redux-persist/es/perssistReducer";

const persistConfig = {
    key : "root",
    storage,
    blackList: ["user"] 
}

const SagaMiddlware = createSagaMiddleware();
const persistReducerStore = persistReducer(persistConfig,rootReducer);

const middleWares = [process.env.NODE_ENV != "productions " && logger,SagaMiddlware].filter(Boolean);
console.log(middleWares);

const composeEnhancers = (process.env.NODE_ENV != "production" && window && window.__REDUX__DEVTOOLS__EXTENSION__COMPOSE__) || compose;

const composdeEnhancers = composeEnhancers(applyMiddleware(...middleWares));

export const Store = createStore(persistReducerStore,undefined,composdeEnhancers);

SagaMiddlware.run(rootSaga);
export const PersistStoreData = persistStore(Store);
 