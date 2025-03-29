import { Link } from 'expo-router';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { clean, getAllTaskLists, saveTaskList } from '@/services/realmService';
import { TaskListDTO } from '@/dtos/TaskListDTO';

export default function HomeScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const persistRealmDBData = async () => {
    try {
      const response = await axios.get<TaskListDTO[]>(`${apiUrl}/task-list`);
      saveTaskList(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };

  const loadRealmDBData = () => {
    const realmResponse = getAllTaskLists();
    console.log(realmResponse);
  };

  const cleanAll = () => clean();

  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <TouchableOpacity style={styles.linkButton}>
        <Link href="/details" style={styles.linkText}>View Details</Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton}>
        <Link href="/camera" style={styles.linkText}>Camera</Link>
      </TouchableOpacity>

      <View>
        <Button onPress={persistRealmDBData} title="Persist in RealmDB" color="#3361ff" />
      </View>

      <Separator />

      <View>
        <Button onPress={loadRealmDBData} title="Load from RealmDB" color="#841584" />
      </View>

      <Separator />

      <View>
        <Button onPress={cleanAll} title="Clean All" color="#ff5733" />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  linkButton: {
    backgroundColor: '#3361ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});