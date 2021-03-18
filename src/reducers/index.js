import { combineReducers } from 'redux';
import AnswerReducer from './AnswerReducer';
import ModelReducer from './ModelReducer';
import PhotoReaducer from './PhotoReaducer';
import UserReducer from './UserReducer';

export default combineReducers({
    answer: AnswerReducer, 
    model: ModelReducer, 
    photo: PhotoReaducer, 
    user: UserReducer
});
