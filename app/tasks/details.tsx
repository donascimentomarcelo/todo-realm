import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TaskDTO } from '@/dtos/TaskDTO';

export default function TaskDetails() {
    const params = useLocalSearchParams();
    const [item, setItem] = useState<TaskDTO>();

    useEffect(() => {
        if (params.task) {
            const parsedItem = JSON.parse(params.task as string) as TaskDTO;
            setItem(parsedItem);
        }
    }, [params.task]);

    // Função para formatar a data
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    // Renderiza cada nota da tarefa
    const renderNote = ({ item }: { item: { id: number; content: string } }) => (
        <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item.content}</Text>
        </View>
    );

    // Renderiza cada tarefa
    const renderTask = ({ item }: { item: TaskDTO }) => (
        <View
            style={styles.taskContainer}
        >
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskDate}>
                Criado em: {formatDate(item.created_at)}
            </Text>
            <Text style={styles.taskDate}>
                Atualizado em: {formatDate(item.updated_at)}
            </Text>
            <FlatList
                data={item.notes}
                renderItem={renderNote}
                keyExtractor={(note) => note.id.toString()}
                style={styles.notesList}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    {item ? renderTask({ item }) : <Text style={styles.loadingText}>Carregando...</Text>}
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5', // Fundo suave
    },
    taskContainer: {
        backgroundColor: '#FFFFFF', // Fundo branco para os itens
        padding: 20,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        paddingHorizontal: 16,
        paddingTop: 16,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%',
        marginTop: 20
    },
    taskTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333', // Texto escuro
    },
    taskDescription: {
        fontSize: 14,
        color: '#666666', // Texto cinza
        marginTop: 4,
    },
    taskDate: {
        fontSize: 12,
        color: '#999999', // Texto cinza claro
        marginTop: 8,
    },
    notesList: {
        marginTop: 12,
    },
    noteContainer: {
        backgroundColor: '#E0F7FA', // Fundo azul claro para as notas
        padding: 10,
        borderRadius: 8,
        marginVertical: 4,
    },
    noteText: {
        fontSize: 14,
        color: '#00796B', // Texto verde-escuro
    },
    loadingText: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
        marginTop: 20,
    },
});