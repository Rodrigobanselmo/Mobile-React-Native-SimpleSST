import { combineReducers } from 'redux';
import AnswerReducer from './AnswerReducer';
import ThemeReducer from './ThemeReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    answer: AnswerReducer, 
    theme: ThemeReducer, 
    user: UserReducer
});
