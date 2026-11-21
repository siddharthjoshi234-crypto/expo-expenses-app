import { StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export default function PercentageCircle({ percentage }: { percentage: number }) {
  const angle = (percentage / 100) * Math.PI * 2;
  const x = 50 + 45 * Math.cos(angle - Math.PI / 2);
  const y = 50 + 45 * Math.sin(angle - Math.PI / 2);

  return (
    <Svg width={100} height={100} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth={2} />
      <Path d={`M 50 100 A 45 45 0 0 1 ${x} ${y}`} stroke="red" strokeWidth={3} />
    </Svg>
  );
}

const styles = StyleSheet.create({});
