import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image ,StatusBar,Animated, SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';
import {Header} from '../../../components/basicComponents/Header';
import {InputSearch} from '../../../components/basicComponents/InputSearch';
import {ButtonInitial} from '../../../components/basicComponents/Button';
import {InputInitial} from '../../../components/basicComponents/Input';
import styled, {ThemeContext} from "styled-components/native";
import { TextInputMask } from 'react-native-masked-text'
import {useReactModal} from '../../../context/ModalContext'
import { useSelector, useDispatch } from 'react-redux';
import {onGetAllCompanies,onGetCompany,onGetWorkplace} from './func'
import {CheckFlatList,Container,ItemContainer,TextGroup,ItemContainerButton} from './style'
import Icons from '../../../components/Icons'
import { StackActions } from '@react-navigation/native';

const AddRecContainer = styled.TouchableOpacity`
  flex:1;
  border-radius:15px;
  align-items: center;
  justify-content:center;
  border-color:${({theme})=>theme.text.third};
  border-style:dashed; 
  border-width:1px;
  padding: 0px 20px;
  margin-bottom:10px;
  margin-top:5px;
  margin:10px 20px 5px 20px;
  max-height:60px;
  min-height:60px;
`;

const AddRecText = styled.Text`
  text-align:center;
  padding:5px 0px;
  color:${({theme})=>theme.text.third};
`;


export default ({navigation,route}) => {

  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const company = useSelector(state => state.company);
  const employee = useSelector(state => state.employee);
  const employeeChosen = useSelector(state => state.employeeChosen);

  const tree = (route && route.params && route.params.tree)

  useEffect(() => {
    if (!(route && route.params && (route.params.workplace || route.params.tree))) onGetAllCompanies({setData,user,reactModal,navigation})
  }, [])

  function getCompanyData(item) {
    if (item?.cargoId) return 
    if (route && route.params && route.params.workplace) onGetWorkplace({item,user,company,reactModal,navigation,dispatch})
    else if (tree && item?.children && item.children.length > 0) {
      if (route.params?.nav) navigation.push('CardChose',{nav:route.params?.nav,tree:item.children,text:`Adicinar ${item.type != 'Cargo' ?'Todos os Cargos':'Todas os Empregados'} de ${item.text}`,item:{...item}})
      else navigation.push('ChooseCompany',{tree:item.children,text:`Adicinar ${item.type != 'Cargo' ?'Todos os Cargos':'Todas os Empregados'} de ${item.text}`,item:{...item}})   
     
    } else if (route && route.params && (item.type == 'Cargo' || item.type == 'Função')) {
      if (route.params?.nav) navigation.push('CardChose',{nav:route.params?.nav,tree:item.children,text:`Adicinar ${'Todos os Empregados'} de ${item.text}`,item:{...item}})
      else navigation.push('ChooseCompany',{tree:item.children,text:`Adicinar ${'Todos os Empregados'} de ${item.text}`,item:{...item}})   
      // navigation.navigate('ChooseCargo')
      // dispatch({type:'ADD_EMPLOYEE_CARGO',payload:item})
    } else if (tree && item?.children && item.children.length == 0 &&  (/* item.type != 'Cargo' ||  */item.type != 'Função')) {
      reactModal.alert({text:`Essa empresa não possui nenhum cargo cadastrado dentro de ${item.text}, você precisa cadastrar um cargo para poder realizar o checklist.`,title:"Nenhum Cadastrado"})
    } else onGetCompany({item,user,reactModal,navigation,dispatch})
  }

  function header() {
    if (route && route.params && route.params.workplace) return 'Estabelecimento'
    else if (tree && route.params?.item?.text) return route.params.item.text
    else if (tree) return 'Selecionar Cargo'
    return 'Empresa'
  }
 
  function getData() {
    if (route && route.params && route.params.workplace) return filterFunction(company.workplace,'name')
    else if (tree) { //employee
      // if (search.length==0 && route.params.type != 'all') return [...filterFunction(route.params.tree,'text'),{id:route.params.item.type != 'Cargo'?'Adicionar novo cargo':'Adicionar nova função'}]
      if (search.length==0 && (route.params?.item && route.params.item?.type && (route.params.item.type == 'Cargo'|| route.params.item.type == 'Função') )) return [...filterFunction(route.params.tree,'text'),...filterFunction(employee.filter(i=>i.cargoId == route.params.item.id && i.status != 'Desligado'),'name')]
      if (search.length==0) return filterFunction(route.params.tree,'text')
      if (search.length>0) return filterObjFunction(route.params.tree,'text')
    }
    return filterFunction(data,'name')
  }

  function bottomButton(item) {

    if (item && item != 'Jump') {
      if (route.params?.nav) navigation.navigate('CardEmployee',{id:item.id})
      else navigation.navigate('ChooseCargo')    
      dispatch({type:'ADD_EMPLOYEE_CARGO',payload:{...item}})
      return
    }


    if (route.params?.type && route.params.type=='all') {
      if (route.params?.nav) navigation.navigate('CardEmployee',{id:company.cnpj})
      else navigation.navigate('ChooseCargo')    
      dispatch({type:'ADD_EMPLOYEE_CARGO',payload:{text:'Todos os Cargos',type:'Empresa',id:company.cnpj}})
    } else if (tree) {
      if (route.params?.nav) navigation.navigate('CardEmployee',{id:route.params.item.id})
      else navigation.navigate('ChooseCargo')    
      dispatch({type:'ADD_EMPLOYEE_CARGO',payload:{...route.params.item}})
    } else {
      navigation.navigate('ChooseName',{name:true})  
      dispatch({type:'REMOVE_EMPLOYEE_ALL'})
    }
    // navigation.navigate('ChooseName')
    // if (route && route.params && route.params.workplace) return filterFunction(company.workplace,'name')
    // else if (tree) return filterFunction(route.params.tree,'text')
    // return filterFunction(data,'name')
  }

  function onAddCargo() {

  }

  function filterFunction(array,type) {
    const AscendentText = function (a, b) {
      if (a[type].toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "") > b[type].toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "")) {
          return 1;
      }
      if (b[type].toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "") > a[type].toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "")) {
          return -1;
      }
      return 0;
    };
    return array.filter(i=>i[type] &&i[type].toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").includes( search.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "") )||i?.CNPJ&&i.CNPJ.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "").includes( search.toLowerCase().normalize("NFD").replace(/[^a-zA-Z0-9s]/g, "") )).sort(AscendentText)
  }

  function filterObjFunction() {
    var cargos = [];
    function count(root){
      root.forEach((item)=> {
        if (item.type != 'Empresa') cargos.push(item)
        if(item.children.length>0){
          count(item.children)
        } 
      })
    }
    count([company.selectedWorkplace.org])
    return filterFunction(cargos,'text')
  }
  

  const renderItem = ({ item,index }) => {
    if (item.id != 'Adicionar novo cargo' && item.id != 'Adicionar nova função') return (
      <ItemContainer employee={item?.cargoId} activeOpacity={0.7} last={index == data.length-1} tree={(tree)} onPress={()=>getCompanyData(item)} >
          {!item?.cargoId && tree && 
            <ItemContainerButton activeOpacity={0.7} onPress={()=>bottomButton(item)}>
              <Icons name={'Plus'} color={themeContext.primary.textInside} size={20}/>
            </ItemContainerButton>
          }
          <View style={{flex:1}}>
            <TextGroup  numberOfLines={2}  style={{textAlignVertical: 'center'}}>{item?.text??item?.name}</TextGroup>
            {tree ? null : <TextGroup style={{fontSize:13}} numberOfLines={1}>{item?.CNPJ ?? item?.city}</TextGroup>}
          </View>
          {!item?.cargoId && <Icons name={"ArrowRight"} color={themeContext.text.fourth} size={20}/> }
          {/* <Icons name={(route && route.params && (!item?.children || (item?.children && item.children.length == 0)) && (item.type == 'Cargo' || item.type == 'Função' || item?.cargoId))?'Plus':"ArrowRight"} color={themeContext.text.fourth} size={20}/> */}
      </ItemContainer>
    );

    return (
      <AddRecContainer activeOpacity={0.7} onPress={onAddCargo}>
        <AddRecText>
          {item.id}
        </AddRecText>
      </AddRecContainer>
    )
  }

  return (
    <Container >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      <Header text={header()} type="Back" navigation={navigation} style={{marginBottom:15}}/>
      <InputSearch
        placeholder="Pesquisar..."
        // placeholder={tree?"Pesquisar...":"Pesquisar..."}
        clearButtonMode='while-editing'
        keyboardType='default'
        autoCompleteType='off'
        value={search}
        onChangeText={(val)=>setSearch(val)}
        setCleanFunc={()=>setSearch('')}
        showClean={search.length>0}
        // returnKeyType="next"
      />
      <CheckFlatList
        data={getData()}
        renderItem={renderItem}
        keyExtractor={item => item?.CNPJ ?? item?.id}
        showsVerticalScrollIndicator={false}
      />
      {tree&&<ButtonInitial
        secondary={tree?true:false}
        style={{marginBottom:0,borderRadius:0}}
        textStyle={{color:tree?'#fff':'#000',textAlign:'center'}}
        height={80}
        onPress={()=>bottomButton('Jump')}
        scale={0.67}
        elevation={true}
        text={tree?route.params.text:'Pular'}
      />}
    </Container>
  );
}
