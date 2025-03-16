import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams, Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TaskListDTO } from '@/dtos/TaskListDTO';

export default function Task() {
    const params = useLocalSearchParams();
    const [item, setItem] = useState<TaskListDTO>();


    useEffect(() => {

        if (params.item) {
            const parsedItem = JSON.parse(params.item as string) as TaskListDTO;
            setItem(parsedItem);
        }
    }, [params.item]);

    const details = (item: any) => {
        router.push({
            pathname: '/tasks',
            params: { item: JSON.stringify(item) },
        })
    }

    const Item = ({ item }: { item: { title: string; description: string } }) => (
        <TouchableOpacity style={styles.item} onPress={() => details(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.description} tasks</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={item?.tasks}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
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
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    item: {
        backgroundColor: '#FFFFFF', // Fundo branco para os itens
        padding: 20,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333', // Texto escuro
    },
    subtitle: {
        fontSize: 14,
        color: '#666666', // Texto cinza
        marginTop: 4,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E0E0E0', // Fundo da barra de progresso
        borderRadius: 4,
        marginTop: 12,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4ECDC4', // Cor de preenchimento da barra de progresso
    },
});