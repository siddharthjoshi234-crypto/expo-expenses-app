import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

export default function PercentageCircle({ percentage }: { percentage: number }) {
  const angle = (percentage / 100) * Math.PI * 2;
  const x = 50 + 45 * Math.cos(angle - Math.PI / 2);
  const y = 50 + 45 * Math.sin(angle - Math.PI / 2);

  return (
    <Svg width={80} height={80} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="45" fill="none" stroke="gray" strokeWidth={2} />
      <Path d={`M 50 5 A 45 45 0 0 0 ${x} ${y}`} fill = "none" stroke="red" strokeWidth={8} strokeLinecap="round" />
      <SvgText x="50" y="50" textAnchor="middle" fontSize="20" fontWeight="bold" fill="black" dy=".3em">
        {`${percentage.toFixed(0)}%`}
      </SvgText>
    </Svg>
  );
}
