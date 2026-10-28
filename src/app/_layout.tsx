import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { useColorScheme } from 'react-native';

export default function StackLayout() {
  const colorScheme = useColorScheme();
  return (
    <SQLiteProvider
      databaseName = "database.db"
      assetSource = {{
        assetId: require('../assets/database.db'),
      }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
        </Stack>
      </ThemeProvider>
    </SQLiteProvider>
  );
}
