import { combineReducers } from 'redux';
import AnswerReducer from './AnswerReducer';
import ModelReducer from './ModelReducer';
import PhotoReaducer from './PhotoReaducer';
import UserReducer from './UserReducer';
import RiskReducer from './RiskReducer';
import RiskDataReducer from './RiskDataReducer';
import RiskAnswerReducer from './RiskAnswerReducer';
import RiskPositionReducer from './RiskPositionReducer';
import HeaderReducer from './HeaderReducer';
import ChecklistReducer from './ChecklistReducer';
import AllModelReducer from './AllModelReducer';
import ObsReducer from './ObsReducer';
import EmployeeReducer from './EmployeeReducer';
import CompanyReducer from './CompanyReducer';
import EmployeeChosenReducer from './EmployeeChosenReducer';

export default combineReducers({
    risk: RiskReducer, 
    riskData: RiskDataReducer, 
    riskAnswer: RiskAnswerReducer, 
    answer: AnswerReducer, 
    model: ModelReducer, 
    photo: PhotoReaducer, 
    user: UserReducer,
    checklist: ChecklistReducer,
    header: HeaderReducer,
    riskPosition: RiskPositionReducer,
    allModels: AllModelReducer,
    obs: ObsReducer,
    employee: EmployeeReducer,
    company: CompanyReducer,
    employeeChosen: EmployeeChosenReducer,
});
