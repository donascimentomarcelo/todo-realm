import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const FloatingButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButton: {
        position: 'absolute', // Posiciona o botão absolutamente
        bottom: 20, // Distância do fundo
        right: 20, // Distância da direita
        width: 60, // Largura do botão
        height: 60, // Altura do botão
        borderRadius: 30, // Bordas arredondadas para criar um círculo
        backgroundColor: '#f4511e', //'#007BFF', // Cor de fundo
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    buttonText: {
        fontSize: 24,
        color: '#FFF', // Cor do texto
    },
});