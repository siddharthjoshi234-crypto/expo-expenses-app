import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{headerShown: false}} />
        <Tabs.Screen name="addpayment" options={{headerShown: false}} />
        <Tabs.Screen name="settings" options={{headerShown: false}} />
    </Tabs>
  );
}