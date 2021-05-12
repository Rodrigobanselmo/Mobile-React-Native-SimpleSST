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
import {onGetAllEmployee,onGetCompany} from './func'
import {CheckFlatList,Container,ItemContainer,TextGroup,} from './style'
import Icons from '../../../components/Icons'

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

export default ({navigation}) => {

  
  const [search, setSearch] = useState('')
  const [employees, setEmployees] = useState([]) 
  const [data, setData] = useState([])
  
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const company = useSelector(state => state.company);
  const employee = useSelector(state => state.employee);
  const employeeChosen = useSelector(state => state.employeeChosen);

  useEffect(() => {
    onGetAllEmployee({company,user,reactModal,navigation,dispatch})
  }, [])

  function onAddCargo() {
    if (company.selectedWorkplace?.org && company.selectedWorkplace.org?.children) {
      navigation.push('ChooseCompany',{tree:company.selectedWorkplace.org.children,text:'Adicionar Todos os Cargos da Empresa',type:'all'})
    } else reactModal.animated({text:'Organograma não cadastrado.',type:'warn'});
  }

  function onContinue() {
    if (Object.keys(employeeChosen.chosen).length>0) navigation.navigate('ChooseName')
    else reactModal.alert({text:'Selecione ao menos um cargo e/ou área para continuar.',title:"Só mais um pouco."})
  }

  function onDeleteCargo(item) {
    console.log(item)
    reactModal.alert({
      title:'Remover',
      text:`Você tem certeza que deseza remover essa área/cargo?`,
      confirmButton:'Remover',
      warn:true,
      option:true,
      onConfirm:()=>dispatch({type:'REMOVE_EMPLOYEE_CARGO',payload:item}),
    })
  }

  const renderItem = ({ item,index }) => (
    <ItemContainer activeOpacity={0.7} last={index == data.length-1} onPress={()=>onDeleteCargo(item)} >
        <TextGroup  numberOfLines={2}>{employeeChosen.chosen[item].text}</TextGroup>
        <Icons name="Trash" color={themeContext.text.fourth} size={20}/>
    </ItemContainer>
  );

  return (
    <Container >
      <StatusBar backgroundColor={themeContext.background.back} barStyle="dark-content"/>
      <Header text='Áreas e Cargos' type="Back" navigation={navigation} style={{marginBottom:15}}/>
      <AddRecContainer activeOpacity={0.7} onPress={onAddCargo}>
        <AddRecText>
          Adicionar área e/ou cargo
        </AddRecText>
      </AddRecContainer>
      <CheckFlatList
        data={Object.keys(employeeChosen.chosen)}
        renderItem={renderItem}
        keyExtractor={(item,index)=> employeeChosen.chosen[item].id}
        showsVerticalScrollIndicator={false}
      />
      <ButtonInitial
        secondary={false}
        style={{marginBottom:0,}}
        textStyle={{color:'#000'}}
        height={80}
        onPress={onContinue}
        scale={0.67}
        elevation={true}
        text='Continuar'
      />
    </Container>
  );
}
