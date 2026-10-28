import AddPayButton from '@/components/addpaybutton';
import { DescriptionInput } from '@/components/desc-input';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen(){

  const db = useSQLiteContext();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();
  async function addPayment(desc: string, amt: number, category: string) {
    if (!amt && !category) {
      alert('Please fill in the Amount & select a category');
      return;
    }
    else if (!amt )
    {
      alert('Please fill in the Amount');
      return;
    }
    else if (!category)
    {
      alert('Please select a category');
      return;
    }
    else if (desc === "Description" || desc === "")
    {
      desc = "No Description";
    }
    await db.runAsync('INSERT INTO payments (description, amount, category) VALUES (?, ?, ?)', [desc, amt, category] );
  }
  const [inputAmt, setInputAmt] = useState('0.00');
  const [inputDesc, setInputDesc] = useState('');
  const [inputCategory, setInputCategory] = useState('');
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <ThemedText type="title">FinTrack</ThemedText>
        <TextInput placeholder="0.00" keyboardType="numeric" onChangeText={(inputAmt) => setInputAmt(inputAmt)} />
        <DescriptionInput onChangeText={(inputDesc) => setInputDesc(inputDesc)} />
        <TextInput placeholder="Category" onChangeText={setInputCategory} />
        <AddPayButton onPress = {() => addPayment(inputDesc, parseFloat(inputAmt), inputCategory)}/>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
  
