import { TaskListDTO } from '@/dtos/TaskListDTO';
import { getAllTaskLists } from '@/services/realmService';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';


export default function DetailsScreen() {

  const [taskList, setTaskList] = useState<TaskListDTO[]>([])

  useEffect(() => {
    loadRealmDBData();
  }, []);

  const loadRealmDBData = () => {
    const realmResponse = getAllTaskLists();
    setTaskList(realmResponse.map(task => task as any));
  }

  const Item = ({ name }: { name: string }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={taskList}
            renderItem={({ item }) => <Item name={item.name} />}
            keyExtractor={item => item.id.toString()}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f4511e',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

