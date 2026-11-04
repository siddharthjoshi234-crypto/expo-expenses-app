import AddPayButton from '@/components/addpaybutton';
import { Colors } from '@/constants/theme';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen(){
  const db = useSQLiteContext();
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const [inputAmt, setInputAmt] = useState('0.00');
return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
        <TextInput placeholder = {inputAmt} keyboardType="numeric" onChangeText={(inputAmt) => setInputAmt(inputAmt)} />
        <AddPayButton onPress = {() => db.runAsync('INSERT INTO statistics monthly_income VALUES (?)', [inputAmt])}/>
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