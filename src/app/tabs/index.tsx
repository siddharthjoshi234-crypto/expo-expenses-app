import AddPayButton from '@/components/addpaybutton';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen(){
  const db = useSQLiteContext();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  function addpaymenttab() {
    router.push('/tabs/addpayment');
  }
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <ThemedText type="title">FinTrack</ThemedText>
        <AddPayButton onPress = {addpaymenttab}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
});
