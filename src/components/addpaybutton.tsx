import { ThemedText } from '@/components/themed-text';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function AddPayButton({onPress}: {onPress: () => void}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <ThemedText style={styles.buttonText}>Add Payment</ThemedText>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
