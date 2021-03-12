import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ColorsDark from './ColorsDark';
import ColorsLight from './ColorsLight';

const useColors = () => {
const theme = useSelector(state => state.user.theme);

console.log(theme)
    var Colors = ColorsLight

    if (theme == 'dark') {Colors = ColorsDark}

    return [Colors];

};

export default useColors;
