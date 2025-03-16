import { Link } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { getAllTaskLists, saveTaskList } from '@/services/realmService';
import { TaskListDTO } from '@/dtos/TaskListDTO';

export default function HomeScreen() {
  
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    console.log('home loaded')
  }, []);

  const persistRealmDBData = async () => {
    try {
      const response = await axios.get<TaskListDTO[]>(`${apiUrl}/task-list`);
      console.log('Dados da API:', response.data[0]);
      saveTaskList(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  }

  const loadRealmDBData = () => {
    const realmResponse = getAllTaskLists();
    console.log(realmResponse);
  }

  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="/details">View details</Link>

      <View>
        <Button
          onPress={persistRealmDBData}
          title="Persist in RealmDB"
          color="#141584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>

      <Separator />
      
      <View>
        <Button
          onPress={loadRealmDBData}
          title="Load from RealmDB"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
