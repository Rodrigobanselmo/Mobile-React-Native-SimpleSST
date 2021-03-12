import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: hardSet,
    blacklist: ['user','answer'] // user will not be persisted
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer,applyMiddleware(thunk));
export const persistor = persistStore(store);
//export const store = createStore(rootReducer,applyMiddleware(thunk));