import React, {useRef,useEffect} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export function ProgresseValue({percentage = 0, style={},duration=800}) {

  const animated = useRef(new Animated.Value(0)).current;
  const inputRef = useRef();

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 300,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}%`,
        });
      }
    }, [percentage]);

    return () => {
      animated.removeAllListeners();
    };
  });


  return (
        <AnimatedTextInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          editable={false}
          defaultValue="0"
          style={[
            { fontSize: 15 , color: '#151515'},
            styles.text,
            {...style}
          ]}
        />
  );
}
const styles = StyleSheet.create({
  text: { fontWeight: '200' },
});
