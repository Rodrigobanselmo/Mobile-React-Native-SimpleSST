import React, {useState,useContext,useRef,useEffect} from 'react';
import {Dimensions,Text,View,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import {ThemeContext} from "styled-components/native";
import {Header} from '../../../components/basicComponents/Header';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import {Container,RiskComponent,AddRecComponent,IconsPlusMinus,RecText,RecView,TitleRecText,ContainerSafe,ExpoTouch,ProbText,Checkbox,ProbabilityTouch,ContainerButtons,ButtonCancel,TextCancel,ButtonOk,TextOk,AddRecContainer,AddRecText} from './styles';
import { useSelector, useDispatch } from 'react-redux';
import {InputSearch} from '../../../components/basicComponents/InputSearch';

import {Modal} from '../Main/comp'


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function Employee({title,children,navigation, ...restProps }) {
  //const themeContext = useContext(ThemeContext);
  return (
        <ContainerSafe {...restProps}>
          {/* <Header navigation={navigation} text={'Sumário'} type="Back"/> */}
              {children}
        </ContainerSafe>
    );
}

// export function Modal({fator,item,onClose,answers,riskPosition,dispatch,callBack,notDispatch,cargoArrayId}) {  //item.risk

//   const [active, setActive] = useState(item?.prob?item.prob:0)
//   const [expo, setExpo] = useState(item?.exp?item.exp:0)
//   const [primary, setPrimary] = useState(item?.primary?item.primary:false)

//   function answerIndex() {
//     if (answers.findIndex(i=>i.questionId==riskPosition.position.id) != -1) return answers[answers.findIndex(i=>i.questionId==riskPosition.position.id)]
//     if (riskPosition.parent[riskPosition.position.id] && answers.findIndex(i=>i.questionId==riskPosition.parent[riskPosition.position.id][riskPosition.parent[riskPosition.position.id].length-1].questionId) !=-1) return answers[answers.findIndex(i=>i.questionId==riskPosition.parent[riskPosition.position.id][riskPosition.parent[riskPosition.position.id].length-1].questionId)]
//   }

//   function onConfirm() { //{selected:peek,questionId:item.id,groupId}
   
//     if (cargoArrayId) {
//       if (Array.isArray(answerIndex().selected)) {
//         //const returnedData = []
//         answerIndex().selected.map(ans=>{
//             if (ans && riskPosition.position && riskPosition.position?.action && riskPosition.position.action[ans] && riskPosition.position.action[ans].data) {
//               if (riskPosition.position.action[ans].data.findIndex(i=>i.risk == item.risk) != -1) {
//                 dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item,data:{exp:expo,prob:active,primary},cargoArrayId,answer:{selected:ans,questionId:riskPosition.position.id,groupId:answerIndex().groupId}}})
//               }
//             }
//           })
//         //const newReturn = [...returnedData.filter((item, i) => returnedData.findIndex(i=>i.risk==item.risk) === i)]
//       }
//       else dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item,data:{exp:expo,prob:active,primary},cargoArrayId,answer:answerIndex()}}) //erro aqui
//       onClose()
//       return
//     }
    
//     if (!notDispatch) {
//       if (Array.isArray(answerIndex().selected)) {
//         //const returnedData = []
//         answerIndex().selected.map(ans=>{
//             if (ans && riskPosition.position && riskPosition.position?.action && riskPosition.position.action[ans] && riskPosition.position.action[ans].data) {
//               if (riskPosition.position.action[ans].data.findIndex(i=>i.risk == item.risk) != -1) {
//                 dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item,data:{exp:expo,prob:active,primary},answer:{selected:ans,questionId:riskPosition.position.id,groupId:answerIndex().groupId}}})
//               }
//             }
//           })
//         //const newReturn = [...returnedData.filter((item, i) => returnedData.findIndex(i=>i.risk==item.risk) === i)]
//       }
//       else dispatch({type: 'CHOOSE_RISK_ANSWER',payload:{item,data:{exp:expo,prob:active,primary},answer:answerIndex()}}) //erro aqui
//     }
//     onClose()
//     if (callBack) callBack({item,data:{exp:expo,prob:active,primary},answer:answers})
//   }

//   return (
//     <View style={{}}>
//       <Text style={{fontSize:16,fontWeight:'bold',marginBottom:12,width:windowWidth*0.8,maxWidth:400}}>{fator}</Text>
//       <ProbText style={{marginBottom:8}}>Exposição</ProbText>
//       <ExpoTouch activeOpacity={0.7} onPress={()=>setExpo('o')} active={'o' == expo} >
//         <ProbText adjustsFontSizeToFit numberOfLines={1} active={'o' == expo}>Ocasional</ProbText>
//       </ExpoTouch>
//       <ExpoTouch activeOpacity={0.7} onPress={()=>setExpo('hp')} active={'hp' == expo} >
//         <ProbText adjustsFontSizeToFit numberOfLines={1} active={'hp' == expo}>Habitual/Permanente</ProbText>
//       </ExpoTouch>
//       <ExpoTouch activeOpacity={0.7} onPress={()=>setExpo('hi')} active={'hi' == expo} >
//         <ProbText adjustsFontSizeToFit numberOfLines={1} active={'hi' == expo}>Habitual/Intermitente</ProbText>
//       </ExpoTouch>
//       <View style={{flexDirection:'row',marginBottom:10,marginTop:10}}>
//         <ProbText >Marcar se exposição primária</ProbText>
//         <TouchableOpacity style={{flex:1,alignItems:'flex-end'}} activeOpacity={0.7} onPress={()=>setPrimary(primary=>!primary)}>
//           <Checkbox active={primary}/>
//         </TouchableOpacity>
//       </View>
//       <ProbText style={{marginTop:10,marginBottom:8}}>Probabilidade</ProbText>
//       <View style={{flexDirection:'row',marginBottom:10}}>
//         {[1,2,3,4,5].map(i=>
//           <ProbabilityTouch key={i} activeOpacity={0.7} onPress={()=>setActive(i)} active={i == active} last={i == 5} >
//             <ProbText active={i == active}>{i}</ProbText>
//           </ProbabilityTouch>
//         )}
//       </View>
//       <ContainerButtons style={{marginTop:20,marginBottom:0}}>
//         <ButtonCancel activeOpacity={0.5} onPress={onClose}>
//             <TextCancel>Calcelar</TextCancel>
//         </ButtonCancel>
//         <ButtonOk disabled={Boolean(active==0 || expo==0)} disable={active==0 || expo==0} activeOpacity={0.7} onPress={()=>onConfirm()} >
//             <TextOk>Adicionar</TextOk>
//         </ButtonOk>
//       </ContainerButtons>
//     </View>
//   )
// }

Employee.Body = function EmployeeBOdy({navigation,route}) {
  
  const reactModal = useReactModal();
  const themeContext = useContext(ThemeContext);
  const employeeChosen = useSelector(state => state.employeeChosen);
  const riskAnswer = useSelector(state => state.riskAnswer);
  const riskPosition = useSelector(state => state.riskPosition);
  const risk = useSelector(state => state.risk);
  const riskData = useSelector(state => state.riskData);
  const checklist = useSelector(state => state.checklist);
  const company = useSelector(state => state.company);
  const answers = useSelector(state => state.answer);
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false)
  const [riskID, setRiskID] = useState('')
  const [search, setSearch] = useState('')
  const [active, setActive] = useState([])

  useEffect(() => {
    if (route.params?.id ) setActive([...active,route.params.id])
  }, [route])

  function onChooseRisk({data={},onFunction}) {  //item.risk
    reactModal.alert({
      confirmButton:'Adicionar',
      optionHide:true,
      childrenComponent:(onConfirm,onClose)=>Modal({fator:route.params.text,answer:route.params.answer,item:{...route.params.item,...data},onClose,answers,riskPosition,dispatch,cargoArrayId:data?.risk?null:active,onFunction:onFunction}),
      onConfirm:()=>{},
    })
  }

  function onConfirm() { //{selected:peek,questionId:item.id,groupId}

    function onFunction() {
      dispatch({type:'ADD_EMPLOYEE_CARGO_UPDATE',payload:active})
      setActive([])
      if (route.params.onCallback) route.params.onCallback() //para adicionar no answer reducer se adicionar algo
    }
    onChooseRisk({onFunction}) 

    // reactModal.close()
    // setTimeout(() => {
    //   onChooseRisk(fator,item)
    // }, 200);  
}

function HAS_MANDATORY(riskId) {
  var bool = false
  riskAnswer.risks[riskId].created.map(i=>{
    const categoryIndex =  checklist.data.findIndex(fi=>fi.id==i.groupId)
    const questionIndex =  checklist.data[categoryIndex].questions.findIndex(fi=>fi.id==i.questionId)
    const actionDataIndex =  checklist.data[categoryIndex].questions[questionIndex].action[i.selected].data.findIndex(fi=>fi.risk==riskId)
    if (actionDataIndex != -1) {
      if (checklist.data[categoryIndex].questions[questionIndex].action[i.selected].data[actionDataIndex].man) {
        bool = true
      }
    }
  })
  return bool
}

function getData() {
  // if (route && route.params && route.params.workplace) return filterFunction(company.workplace,'name')
  // else if (tree) { //employee
  //   // if (search.length==0 && route.params.type != 'all') return [...filterFunction(route.params.tree,'text'),{id:route.params.item.type != 'Cargo'?'Adicionar novo cargo':'Adicionar nova função'}]
  //   if (search.length==0 && (route.params?.item && route.params.item?.type && (route.params.item.type == 'Cargo'|| route.params.item.type == 'Função') )) return [...filterFunction(route.params.tree,'text'),...filterFunction(employee.filter(i=>i.cargoId == route.params.item.id && i.status != 'Desligado'),'name')]
  //   if (search.length==0) return filterFunction(route.params.tree,'text')
  //   if (search.length>0) return filterObjFunction(route.params.tree,'text')
  // }
  // return filterFunction(data,'name')
  return Object.keys(employeeChosen.chosen).filter(i=>!active.includes(i))
}

function onChooseRiskData(item,riskId) {
  dispatch({type: 'CHOOSE_RISK_ANSWER_DATA',payload:{dataId:item.id,riskId}})
}

function onRemoveRiskData(item,riskId) {
  dispatch({type: 'REMOVE_RISK_ANSWER_DATA',payload:{dataId:item.id,riskId}})
}

function onEditRisk(key) {
  onChooseRisk({data:{risk:key,prob:riskAnswer.risks[key].prob,primary:riskAnswer.risks[key].primary,exp:riskAnswer.risks[key].exp}})
}

function onDeleteRisk(riskId,riskAnsId) {
  function onConfirm() {
    dispatch({type: 'DELETE_RISK',payload:riskAnsId})
    setRiskID(false)
  }
  
  reactModal.alert({
    title:'Deletar Checklist',
    text:`Você tem certeza que deseza deletar o fator de risco ${risk[riskId].name}?`,
    confirmButton:'Deletar',
    warn:true,
    option:true,
    onConfirm:onConfirm,
  })
}

// const renderItem = ({ item,index }) => {
//   return (
//     <ExpoTouch  key={item} style={{position:'relative'}} activeOpacity={0.7} onPress={()=>setActive([...active,item])} >
//       <ProbText adjustsFontSizeToFit numberOfLines={1} >{employeeChosen.chosen[item].text}</ProbText>
//       <Icons style={{position:'absolute', bottom:10,right:5}} name={'PlusStroke'} size={16} color={themeContext.text.third} />
//     </ExpoTouch>
//   )
// }

  function lastOrSelection() {
    if (checklist.periculoso) return Object.keys(employeeChosen.chosen).filter(i=>!active.includes(i) && !Object.keys(riskAnswer.risks).includes(`${route.params.item.risk}--${i}`) ).sort((a, b) => employeeChosen.chosen[b].lastUpdate - employeeChosen.chosen[a].lastUpdate).slice(0,5)
    return Object.keys(employeeChosen.chosen).filter(i=>!active.includes(i) && !Object.keys(riskAnswer.risks).includes(`${route.params.item.risk}--${i}`) )
  }

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%',flex:1,paddingHorizontal:20}}>
        <>
        {!focus &&
        <>
          <Text style={{fontSize:16,marginBottom:12,width:windowWidth*0.8,maxWidth:400}}>
            Escolha onde deseja adicionar {checklist.periculoso?'as atividades':"o risco"}:&nbsp;
            <Text style={{fontSize:16,fontWeight:'bold'}}>
              {route.params?.text ?? route.params?.atividade}
            </Text>
          </Text>
          <ProbText style={{marginBottom:8}}>{checklist.periculoso?'Atividade Adicionada':"Risco Adicionado"}</ProbText>
          {Object.keys(riskAnswer.risks).filter(fi=>fi.includes(route.params.item.risk)).length == 0 ?
            <AddRecContainer >
              <AddRecText>Nenhum Adicionado</AddRecText>
            </AddRecContainer>
          :
            Object.keys(riskAnswer.risks).filter(fi=>fi.includes(route.params.item.risk)).map((key,index)=>{ //employeeChosen.chosen[key.split('--')[1]].text
            if (!risk[key.split('--')[0]]) return
            return(
              <View style={{marginBottom:index+1 == Object.keys(riskAnswer.risks).filter(fi=>fi.includes(route.params.item.risk)).length? 25:15}} key={key.split('--')[1]}>
                <RiskComponent onLongPress={()=>console.log(riskData)} onPress={()=>setRiskID(riskID==key?false:key)} text={employeeChosen.chosen[key.split('--')[1]]?.text} type={risk[key.split('--')[0]]?.type}>
                {/* <RiskComponent onLongPress={()=>console.log(riskData)} onPress={()=>navigation.navigate('CardEmployee',{text:risk[item.risk]?.name,item})} key={item} text={risk[item.risk]?.name} type={risk[item.risk]?.type}> */}
                {checklist.periculoso?null:
                  riskID == key && ['font','rec','med'].map((type)=>{
                    return ( 
                      <View key={type}>
                        {riskAnswer.risks[key].data.filter(i=>i.type == type).map((itemSel,indexSel)=>{
                          return (
                            <View key={itemSel.id}>
                              {indexSel == 0 && 
                                <>
                                  <TitleRecText >
                                    {`${type == 'rec'?'Recomendações':type == 'med'?'Medidas de Controle':'Fontes Geradoras'}`}
                                  </TitleRecText>
                                  <TitleRecText sub>
                                    Ativas
                                  </TitleRecText>
                                </>
                              }
                              <RecView onPress={()=>onRemoveRiskData(itemSel,key)} rec activeOpacity={0.8}>
                                <RecText >{riskData[itemSel.id].text}</RecText>
                                <IconsPlusMinus  name={'MinusStroke'} size={16} color={themeContext.text.third} />
                              </RecView>
                            </View>
                        )})}
                        {riskAnswer.risks[key].data.filter(i=>i.type == type).length == 0 ?
                          <>
                            <TitleRecText >
                              {`${type == 'rec'?'Recomendações':type == 'med'?'Medidas de Controle':'Fontes Geradoras'}`}
                            </TitleRecText>
                            <AddRecComponent text={`Adicionar ${type == 'rec'?'Recomendação':type == 'med'?'Medida de Controle':'Fonte Geradora'}`} />
                          </>
                          :
                          <AddRecComponent style={{marginTop:18}} text={`Adicionar ${type == 'rec'?'Recomendação':type == 'med'?'Medida de Controle':'Fonte Geradora'}`} />
                        }
                        {riskAnswer.risks[key].suggest.filter(i=>i.type == type).map((itemSug,indexSug)=>{
                          return (
                            <View key={itemSug.id}>
                              {indexSug == 0 && 
                                <TitleRecText sub>
                                  Sugestões
                                </TitleRecText>
                              }
                              <RecView onPress={()=>onChooseRiskData(itemSug,key)} activeOpacity={0.8}>
                                <RecText>{riskData[itemSug.id].text}</RecText>
                                <IconsPlusMinus  name={'PlusStroke'} size={17} color={themeContext.text.third} />
                              </RecView>
                            </View>
                        )})}
                      </View>
                    )
                  })
                }
                  {riskID == key && 
                    <>
                      <ButtonInitial
                        secondary={true}
                        style={{marginBottom:0,marginTop:30}}
                        onPress={()=>onEditRisk(key)}
                        scale={0.55}
                        elevation={false}
                        text='EDITAR'
                      />
                      {!HAS_MANDATORY(key) &&
                        <ButtonInitial
                          secondary={true}
                          style={{marginBottom:10,backgroundColor:'transparent' ,borderRadius:10,borderColor:themeContext.text.fourth,borderWidth:1}}
                          onPress={()=>onDeleteRisk(key.split('--')[0],key)}
                          textStyle={{color:themeContext.text.fourth}}
                          scale={0.55}
                          elevation={false}
                          text='DELETAR'
                        />
                      }
                    </>
                  }
                </RiskComponent>

              </View>
            );
            })
          }
        </>
        }
        <ProbText style={{marginBottom:8}}>Para Adicionar</ProbText>
        {active.length == 0 ?
          <AddRecContainer >
            <AddRecText>Nenhum Selecionado</AddRecText>
          </AddRecContainer>
        :
          active.map(key=>{
            return (
              <ExpoTouch style={{position:'relative'}} key={key} activeOpacity={0.7} onPress={()=>setActive([...active.filter(i=>i!=key)])} >
                <ProbText adjustsFontSizeToFit numberOfLines={1} >{employeeChosen.chosen[key].text}</ProbText>
                <Icons style={{position:'absolute', bottom:10,right:5}}  name={'MinusStroke'} size={16} color={themeContext.text.third} />
              </ExpoTouch>
            )
          })
        }
        <ProbText style={{marginBottom:8}}>{checklist.periculoso?'Últimos Selecionados':"Selecione"}</ProbText>
          {lastOrSelection().map((item,index)=>{
            return (
              <ExpoTouch  key={item} style={{position:'relative',marginTop:index==0 ?10:0}} activeOpacity={0.7} onPress={()=>setActive([...active,item])} >
                <ProbText adjustsFontSizeToFit numberOfLines={1} >{employeeChosen.chosen[item].text}</ProbText>
                <Icons style={{position:'absolute', bottom:10,right:5}} name={'PlusStroke'} size={16} color={themeContext.text.third} />
              </ExpoTouch>
            )
          })}
          {/* <InputSearch
            onFocus={()=>setFocus(true)}
            onBlur={()=>setFocus(false)}
            noMargin
            dense
            placeholder="Pesquisar..."
            clearButtonMode='while-editing'
            keyboardType='default'
            autoCompleteType='off'
            value={search}
            onChangeText={(val)=>setSearch(val)}
            setCleanFunc={()=>setSearch('')}
            showClean={search.length>0}
          /> */}
          <AddRecContainer button onPress={()=>navigation.navigate('CardChose',{nav:'CardChose',tree:company.selectedWorkplace.org.children,text:'Adicionar Todos os Cargos da Empresa',type:'all'})}>
            <AddRecText>Adicionar Outro</AddRecText>
          </AddRecContainer>
        </>
      </ScrollView>
      <ContainerButtons style={{marginTop:20,marginHorizontal:20,marginBottom:0}}>
        <ButtonCancel activeOpacity={0.5} onPress={()=>navigation.goBack()}>
            <TextCancel>Fechar</TextCancel>
        </ButtonCancel>
        <ButtonOk disabled={Boolean(active.length==0)} disable={active.length==0} activeOpacity={0.7} onPress={()=>onConfirm()} >
            <TextOk>Confirmar</TextOk>
        </ButtonOk>
      </ContainerButtons>
    </>
  );
}
// <FlatList
//   data={checklist.data}
//   renderItem={MapData}
//   keyExtractor={item => item.id}
//   showsVerticalScrollIndicator={false}
// />