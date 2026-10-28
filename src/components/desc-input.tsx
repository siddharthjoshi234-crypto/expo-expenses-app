import {
    BasicTextField,
    Box,
    Host,
    useNativeState
} from '@expo/ui/jetpack-compose';
import {
    background,
    clip,
    fillMaxWidth,
    padding,
    Shapes,
} from '@expo/ui/jetpack-compose/modifiers';
import { ThemedText } from './themed-text';

type props = {
    onChangeText: (text: string) => void;
}
export function DescriptionInput({ onChangeText }: props) {
  const value = useNativeState('');

  return (
    <Host
      matchContents={{ vertical: true }}
      style={{ width: '100%' }}>
      <BasicTextField
        cursorColor="#7c3aed"
        value={value}
        onValueChange = {onChangeText}
        modifiers={[
          fillMaxWidth(),
          clip(Shapes.RoundedCorner(12)),
          background('#f3f4f6'),
          padding(12, 10, 12, 10),
        ]}>
        <BasicTextField.DecorationBox>
          <Box>
            <BasicTextField.Placeholder>
              <ThemedText type="default">Description</ThemedText>
            </BasicTextField.Placeholder>
            <BasicTextField.InnerTextField />
          </Box>
        </BasicTextField.DecorationBox>
      </BasicTextField>
    </Host>
  );
}
