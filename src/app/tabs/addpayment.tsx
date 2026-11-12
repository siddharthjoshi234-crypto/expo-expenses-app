import AddPayButton from '@/components/addpaybutton';
import CategoryButton from '@/components/categorybutton';
import { DescriptionInput } from '@/components/desc-input';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { GetCategory } from '@/lib/categories';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
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
    router.push('/tabs');
  }
  const [addedCategories,setCategories] = useState<string[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      const storedCategories = await GetCategory();
      setCategories(storedCategories);
    }
    fetchCategories();
  }, []);
  const [inputAmt, setInputAmt] = useState('0.00');
  const [inputDesc, setInputDesc] = useState('');
  const [inputCategory, setInputCategory] = useState('');
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <ThemedText type="title">FinTrack</ThemedText>
        <TextInput placeholder="0.00" keyboardType="numeric" onChangeText={(inputAmt) => setInputAmt(inputAmt)} />
        <DescriptionInput onChangeText={(inputDesc) => setInputDesc(inputDesc)} />
        <div style={styles.categoryContainer}>
          {/* <CategoryButton onPress = {() => setInputCategory('Food')} category="Food" />
          <CategoryButton onPress = {() => setInputCategory('Transport')} category="Transport" />
          <CategoryButton onPress = {() => setInputCategory('Entertainment')} category="Entertainment" /> */}
          {addedCategories.map((category: string) => (
            <CategoryButton onPress={() => setInputCategory(category)} category={category} />
          ))}
        </div>
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
  categoryContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
  
