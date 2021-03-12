import { useSelector, useDispatch } from 'react-redux';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { userActionsSign, userActionsGoogle, userActionsCreate, userActionsDataChange } from '../services/UserActions';

const useDispatchActions = (onModalVisible) => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function navigationActions(screen,screenName) {
    let subScreen = screenName ? screenName : 'TabStack'
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: screen, params: {screen:subScreen} }
        ],
      })
    );
  }

  function dispatchUserSign(userLogin) {
    dispatch(userActionsSign(userLogin,navigationActions,onModalVisible));   
  }

  function dispatchUserCreate(userLogin) {
    dispatch(userActionsCreate(userLogin,navigationActions,onModalVisible));   
  }
  
  function dispatchUserGoogle(userLogin) {
    dispatch(userActionsGoogle(userLogin,navigationActions,onModalVisible));   
  }

  function dispatchUserDataChange(data) {
    dispatch(userActionsDataChange(data,navigationActions,onModalVisible));    
  }

  return [dispatchUserGoogle,dispatchUserCreate,dispatchUserSign,dispatchUserDataChange,navigationActions];
}
export default useDispatchActions
