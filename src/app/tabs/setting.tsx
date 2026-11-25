import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { AddCategory } from '@/lib/categories';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SettingsScreen(){
    const db = useSQLiteContext();
    const scheme = useColorScheme();
    const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
    const [inputCategory, setInputCategory] = useState('');
    const [inputAmt, setInputAmt] = useState('0.00');
    const [deleteHistory, setDeleteHistory] = useState(false);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const firstdate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
    const lastdate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-31`;

    function addIncome() {
        db.runAsync('DELETE FROM income WHERE date BETWEEN ? AND ? AND description = ?', [firstdate, lastdate, 'monthly income']);
        db.runAsync('INSERT INTO income (description,amount) VALUES (?,?)', ['monthly income', inputAmt]);
  }
    function DeleteHistory() {
        console.log('Deleting history!');
        db.runAsync('DELETE FROM income');
        db.runAsync('DELETE FROM payments');
        setDeleteHistory(true);
    }
return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
        <TextInput placeholder = {inputAmt} keyboardType="numeric" onChangeText={(inputAmt) => setInputAmt(inputAmt)} onEndEditing={addIncome} />
        <View>
            <TextInput placeholder = 'Additional income' keyboardType="numeric" onChangeText={(inputAmt) => setInputAmt(inputAmt)} onEndEditing={addIncome} />
            <TextInput placeholder = 'New category' onChangeText={(inputCategory) => setInputCategory(inputCategory)} />
            <Pressable onPress={() => AddCategory(inputCategory)}>
                <ThemedText>Add Category</ThemedText>
            </Pressable>
            <View> 
                <Pressable onPress={DeleteHistory}>
                    <ThemedText>Delete History</ThemedText>
                </Pressable>
            </View>
        </View>
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