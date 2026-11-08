import { Colors } from '@/constants/theme';
import { AddCategory } from '@/lib/categories';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen(){
    const db = useSQLiteContext();
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
    const [inputCategory, setInputCategory] = useState('');
    const [inputAmt, setInputAmt] = useState('0.00');
    function addIncome() {
        db.runAsync('INSERT INTO income (description,amount) VALUES (?,?)', ['monthly income', inputAmt]);
  }
return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
        <TextInput placeholder = {inputAmt} keyboardType="numeric" onChangeText={(inputAmt) => setInputAmt(inputAmt)} onEndEditing={addIncome} />
        <div>
            <TextInput placeholder = 'Additional income' keyboardType="numeric" onChangeText={(inputAmt) => setInputAmt(inputAmt)} onEndEditing={addIncome} />
            <TextInput placeholder = 'New category' onChangeText={(inputCategory) => setInputCategory(inputCategory)} />
            <button onClick={() => AddCategory(inputCategory)}>Add Category</button>
        </div>
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