import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Home' }}/>
      <Stack.Screen name="details" options={{ title: 'Task List' }}/>
      <Stack.Screen name="tasks/index" options={{ title: 'Tasks' }}/>
    </Stack>
  );
}
