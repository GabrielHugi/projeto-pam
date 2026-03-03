import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../styles/styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Bem vindo ao app dos brainrots</Text>
    </View>
  );
}
