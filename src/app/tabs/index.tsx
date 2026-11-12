import AddPayButton from '@/components/addpaybutton';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
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
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [currentMonthSpending, setCurrentMonthSpending] = useState(0); 
  useEffect(() => {
    async function fetchCurrentMonthData() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const totalIncome = await db.getFirstAsync('SELECT SUM(amount) as totalIncome FROM income WHERE strftime("%m", date) = ? AND strftime("%Y", date) = ?',
      [currentMonth.toString().padStart(2, '0'), currentYear.toString()]);
    const totalSpending = await db.getFirstAsync('SELECT SUM(amount) as totalSpending FROM spending WHERE strftime("%m", date) = ? AND strftime("%Y", date) = ?',
      [currentMonth.toString().padStart(2, '0'), currentYear.toString()]);
    // setCurrentMonthIncome(totalIncome?.totalIncome?? 0);
    // setCurrentMonthSpending(totalSpending?.totalSpending ?? 0);
  }

    fetchCurrentMonthData();
  }, []);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <ThemedText type="subtitle">FinTrack</ThemedText>
        <ThemedText type="title">{currentMonthSpending}<span style = {styles.monthIncomeText}>/{currentMonthIncome}</span></ThemedText>
        <AddPayButton onPress = {addpaymenttab}/>
        <div style={ styles.categoryContainer}>
          <div style={styles.categoryPressable}>
            <ThemedText type="default">Income</ThemedText>
            {/* <PercentageCircle percentage={currentMonthIncome === 0 ? 0 : (currentMonthSpending / currentMonthIncome) * 100} /> */}
          </div>
          <div style={styles.categoryPressable}>
          </div>
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
  monthIncomeText: {
    fontSize: 24,
    fontWeight: 300,
    lineHeight: 26,
  },
  categoryContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  categoryPressable:{
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center' 
  }
});
