import React, { useContext, createContext, useState,useReducer, } from "react"
import {Loader as LoaderModal,ModalLoadScreen} from '../components/modalComponents/Loader'
import {View,Dimensions} from 'react-native';
import AnimatedModal from '../components/modalComponents/AnimatedModal'
import ModalAlert from '../components/modalComponents/ModalAlert'

const ModalContext = createContext()

export function useLoaderScreen() {
  return useContext(ModalContext)
}

initial={}

export default function ModalProvider(props) {

  const [open, setOpen] = useState(true)

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "LOADER":
        setOpen(true)
        return {typeModal:'loader'};
      case "LOADER_SCREEN":
        setOpen(true)
        return {typeModal:'loaderScreen',...action.payload};
      case "ANIMATED":
        if (open) setOpen(false)
        return {typeModal:'animated',type:'Check',position:'UP',text:'Um problema foi encontrado, tente novamente mais tarde',height:70,random:Math.random(),...action.payload};
      case "ALERT_MODAL":
        setOpen(true)
        return {typeModal:'alertModal',...action.payload};
      default:
        setOpen(false)
        return {typeModal:'NONE'}
    }
  }, []);


  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <ModalContext.Provider value={dispatch}>
      <View style={{position:'relative',zIndex:918293482034829023904432423423,width:windowWidth,height:'100%'}}>
      {state.typeModal === 'loader' && <LoaderModal open={open}/>}
      {state.typeModal === 'loaderScreen' && <ModalLoadScreen  open={open} onClose={()=>dispatch('')} {...state}/>}
      {state.typeModal === 'animated' &&<AnimatedModal random={state.random} dispatch={()=>dispatch('')} type={state.type} position={state.position} text={state.text} HEIGHT={state.height}/>}
      {state.typeModal === 'alertModal' && 
        <ModalAlert 
          open={open} 
          dispatch 
          onClose={()=>{
            dispatch('')
            if (state.onCloseModal) state.onCloseModal()
          }}
          {...state}
        />
      }
        {props.children}
      </View>
    </ModalContext.Provider>
  )
}

export const useReactModal = () => {
  const dispatch = useContext(ModalContext);

  function dispatchAction(type,props) {
    if (type==='loader') return dispatch({type: "LOADER",payload: {...props }})
    if (type==='loaderScreen') return dispatch({type: "LOADER_SCREEN",payload: {...props }})
    else if (type==='animatedModal') return dispatch({type: "ANIMATED",payload: {...props }})
    else if (type==='alertModal') return dispatch({type: "ALERT_MODAL",payload: {...props }})
    else return dispatch({type: "CLOSE"})
  }

  return {
    loader: function (props) {
      dispatchAction('loader',props)
    },
    loaderScreen: function (props) {
      dispatchAction('loaderScreen',props)
    },
    close: function () {
      dispatchAction('')
    },
    animated: function (props) {
      dispatchAction('animatedModal',props) //text //type
    },
    alert: function (props) {
      dispatchAction('alertModal',props) //text //title //confirmButton
    },
  }
};
