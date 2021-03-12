import { combineReducers } from 'redux';
import AnswerReducer from './AnswerReducer';
import ModelReducer from './ModelReducer';
import ThemeReducer from './ThemeReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    answer: AnswerReducer, 
    model: ModelReducer, 
    theme: ThemeReducer, 
    user: UserReducer
});
