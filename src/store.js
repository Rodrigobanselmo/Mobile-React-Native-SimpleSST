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
    blacklist: ['user','risk','answer','model','photo','riskAnswer','riskPosition','header','riskData','allModels','obs'] // user will not be persisted    ,'checklist'
    // blacklist: ['user','risk','answer','model','photo','riskAnswer','riskData','riskPosition','header','allModels','obs','company','employee'] // user will not be persisted    ,'checklist'
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer,applyMiddleware(thunk));
export const persistor = persistStore(store);
//export const store = createStore(rootReducer,applyMiddleware(thunk));