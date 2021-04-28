import { combineReducers } from 'redux';
import AnswerReducer from './AnswerReducer';
import ModelReducer from './ModelReducer';
import PhotoReaducer from './PhotoReaducer';
import UserReducer from './UserReducer';
import RiskReducer from './RiskReducer';
import RiskAnswerReducer from './RiskAnswerReducer';
import ChecklistReducer from './ChecklistReducer';

export default combineReducers({
    risk: RiskReducer, 
    riskAnswer: RiskAnswerReducer, 
    answer: AnswerReducer, 
    model: ModelReducer, 
    photo: PhotoReaducer, 
    user: UserReducer,
    checklist: ChecklistReducer
});
