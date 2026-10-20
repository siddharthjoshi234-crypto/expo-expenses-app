import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <Link href="/tabs" style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        color: 'blue',
    }
})