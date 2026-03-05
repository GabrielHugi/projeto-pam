import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from "../styles/styles";
import React, { useEffect } from 'react';

export default function HomeScreen() {
  return (
    <View style={styles.centerContainer}>
      <Text>Bem vindo ao app dos brainrots, mr sigma</Text>
      <Text>Va para a tab dos brainrots para ver e adicionar brainrots</Text>
    </View>
  );
}
