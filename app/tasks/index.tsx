import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TaskListDTO } from '@/dtos/TaskListDTO';
import { TaskDTO } from '@/dtos/TaskDTO';

export default function Task() {
    const params = useLocalSearchParams();
    const [item, setItem] = useState<TaskListDTO>();

    useEffect(() => {
        if (params.item) {
            const parsedItem = JSON.parse(params.item as string) as TaskListDTO;
            setItem(parsedItem);
        }
    }, [params.item]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    const renderTask = ({ item }: { item: TaskDTO }) => (
        <TouchableOpacity
            style={styles.taskContainer}
            onPress={() => {
                router.push({
                    pathname: '/tasks/details',
                    params: { task: JSON.stringify(item) },
                });
            }}
        >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDate}>
                Criado em: {formatDate(item.created_at)}
            </Text>

        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    {item ? (
                        <FlatList
                            data={item.tasks}
                            renderItem={renderTask}
                            keyExtractor={(task) => task.id.toString()}
                            contentContainerStyle={styles.listContainer}
                        />
                    ) : (
                        <Text style={styles.loadingText}>Carregando...</Text>
                    )}
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    taskContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    taskTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    taskDate: {
        fontSize: 12,
        color: '#999999',
        marginTop: 8,
    },
    loadingText: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
        marginTop: 20,
    },
});