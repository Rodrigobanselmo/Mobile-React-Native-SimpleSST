import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';


export default function Donut({
  percentage = 75,
  radius = 90,
  strokeWidth = 7.5,
  color = "tomato",
  max = 100,
  textColor,
}) {
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const maxPerc = 100 * percentage / max;
  const strokeDashoffset = circumference - (circumference * maxPerc) / 100;

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <View style={{ opacity:1 }}>
        <Svg
          height={radius * 2}
          width={radius * 2}
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
          <G
            rotation="-90"
            origin={`${halfCircle}, ${halfCircle}`}>
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDashoffset={strokeDashoffset}
              strokeDasharray={circumference}
              />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeOpacity=".1"
              />
          </G>
        </Svg>
        <Text
          style={[
            StyleSheet.absoluteFillObject,
            { fontSize: radius / 2.7, color: textColor ?? color},
            styles.text,
          ]}
        >
          {`${Math.round(maxPerc)}%`}
        </Text>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: { fontWeight: '200', textAlign: 'center',justifyContent:'center',height:'100%',textAlignVertical:'center' },
});
