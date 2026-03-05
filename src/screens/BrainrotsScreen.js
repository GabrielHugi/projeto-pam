import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from "../styles/styles";
import React, { useEffect, useState } from 'react';

export default function BrainrotsScreen() {

  const [brainrots, setBrainrots] = useState([
    {
      "name": "pipi kiwi",
      "skill": "tail attack",
      "height": "1.3m",
      "width": "1.2m",
      "weight": "110kg"
    },
    {
      "name": "tralalero tralala",
      "skill": "bite",
      "height": "1.15m",
      "width": "3.5m",
      "weight": "340kg"
    },
    {
      "name": "pipi kiwi",
      "skill": "tail attack",
      "height": "1.3m",
      "width": "1.2m",
      "weight": "110kg"
    },
    {
      "name": "tralalero tralala",
      "skill": "bite",
      "height": "1.15m",
      "width": "3.5m",
      "weight": "340kg"
    },
    {
      "name": "pipi kiwi",
      "skill": "tail attack",
      "height": "1.3m",
      "width": "1.2m",
      "weight": "110kg"
    },
    {
      "name": "tralalero tralala",
      "skill": "bite",
      "height": "1.15m",
      "width": "3.5m",
      "weight": "340kg"
    },
    {
      "name": "pipi kiwi",
      "skill": "tail attack",
      "height": "1.3m",
      "width": "1.2m",
      "weight": "110kg"
    },
    {
      "name": "tralalero tralala",
      "skill": "bite",
      "height": "1.15m",
      "width": "3.5m",
      "weight": "340kg"
    },
    {
      "name": "pipi kiwi",
      "skill": "tail attack",
      "height": "1.3m",
      "width": "1.2m",
      "weight": "110kg"
    },
    {
      "name": "tralalero tralala",
      "skill": "bite",
      "height": "1.15m",
      "width": "3.5m",
      "weight": "340kg"
    },
    {
      "name": "pipi kiwi",
      "skill": "tail attack",
      "height": "1.3m",
      "width": "1.2m",
      "weight": "110kg"
    },
    {
      "name": "tralalero tralala",
      "skill": "bite",
      "height": "1.15m",
      "width": "3.5m",
      "weight": "340kg"
    }
  ]);

  // fetch não vai funcionar porque pc e celular usam internets diferentes (na escola)
  /*useEffect(() => {
    fetch('http://localhost:3000/peoples')
      .then(response => response.json())
      .then(data => setBrainrots(data));
      .catch(error => console.error(error));
  }, []);*/

  //quando brainrots muda de valor adiciona o add no final
  useEffect(() => {
    setBrainrots([...brainrots, {isAdd: true}]);
  }, brainrots);

  console.log(brainrots);

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Brainrots</Text>

      <FlatList
        data={brainrots}
        numColumns={2}
        contentContainerStyle={styles.brainrotListContainer}
        columnWrapperStyle={{ justifyContent: "center" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          // se for um add
          if (item.isAdd) {
            return (
              <TouchableOpacity style={styles.addCard} onPress={() => alert("Add a new Brainrot!")}>
                <Text style={styles.addText}>＋</Text>
                <Text>Add Brainrot</Text>
              </TouchableOpacity>
            );
          }
          // normal
          return (
            <View style={styles.brainrotCard}>
              <Text style={styles.brainrotName}>{item.name}</Text>
              <Text>Skill: {item.skill}</Text>
              <Text>Height: {item.height}</Text>
              <Text>Width: {item.width}</Text>
              <Text>Weight: {item.weight}</Text>
            </View>
          );
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}