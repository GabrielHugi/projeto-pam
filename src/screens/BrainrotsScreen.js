import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../styles/styles";
import { useEffect } from 'react';

const brainrots = useEffect(() => {
  fetch('http://localhost:3000/peoples')
    .then(response => response.json())
    .then(data => setPeoples(data))
    .catch(error => console.error(error));
}, []);

console.log(brainrots);

export default function BrainrotsScreen() {
  return (
    <View style={styles.container}>
      <Text>Bem vindo ao app dos brainrots</Text>
    </View>
  );
}