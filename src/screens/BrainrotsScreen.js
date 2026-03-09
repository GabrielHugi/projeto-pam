import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from "../styles/styles";
import React, { useEffect, useState } from 'react';

const dbUrl = "https://3d77-2804-1450-fec8-8900-c10b-40b2-4385-9306.ngrok-free.app/brainrots";

export default function BrainrotsScreen() {

  // esse use state com os bgl já colocado é porque no pc da escola não vai funcionar o db
  const [brainrots, setBrainrots] = useState([]);

  const [isBrainrotAddFormVisible, setIsBrainrotAddFormVisible] = useState(false);
  const [isBrainrotEditFormVisible, setIsBrainrotEditFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    skill: '',
    height: '',
    width: '',
    weight: ''
  });
  const [formId, setFormId] = useState(null);

  // fetch não vai funcionar porque pc e celular usam internets diferentes (na escola)
  //
  useEffect(() => {
    fetch(dbUrl)
      .then(response => response.json())
      .then(data => setBrainrots(data))
      .catch(error => console.error(error));
  }, []);
  //

  //quando brainrots muda de valor adiciona o add no final
  // essa coisa não ta dando certo mas eu sei porque então vou concertar for real :sigma:
  useEffect(() => {
    // esse if concerta o problema de adicionar multiplos isAdd a cada reset da tela, só adicionando se não já tiver no final o isAdd.
    if (brainrots.length > 0 && !brainrots[brainrots.length-1].isAdd) setBrainrots([...brainrots, {isAdd: true}]);
  }, [brainrots]);

  function addNewBrainrot() {
    setIsBrainrotAddFormVisible(true);
  }

  // Saves the data and closes the popup
  async function saveBrainrot() {
    try {
      // adicionario o novo bnrainrot na db, no pc da escola não vai funcionar, só se usar ngrok mas ai sei lá se vou fazer isso
      const response = await fetch(dbUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save data to database');
      }
      //

      // tira o isadd e adiciona o novo brainrot
      //const listWithoutAddButton = brainrots.filter(item => !item.isAdd);
      //setBrainrots([...listWithoutAddButton, formData]);
      // em vez disso só le os dados do bd
      fetch(dbUrl)
        .then(response => response.json())
        .then(data => setBrainrots(data))
        .catch(error => console.error(error));

      
      // limpa a var do formulario e fecha o formulario
      setFormData({ name: '', skill: '', height: '', width: '', weight: '' });
      setIsBrainrotAddFormVisible(false);

    } catch (error) {
      console.error("Error saving brainrot:", error);
    }
  }


  function editExistingBrainrot(id) {
    setFormId(id);
    setIsBrainrotEditFormVisible(true);
  }

  // Saves the data and closes the popup
  async function editBrainrot() {
    try {
      //

      // edita
      const list = brainrots.map((item) => {
        // se for o que a gente quer a gente edita
        if (item.id === formId) {
          return {
            ...item, // copia todos os dados antigos deste item
            // sbstitui só o que tiver alguma coisa no form data
            name: formData.name != '' ? formData.name : item.name,
            height: formData.height != '' ? formData.height : item.height,
            width: formData.width != '' ? formData.width : item.width,
            weight: formData.weight != '' ? formData.weight : item.weight,
            skill: formData.skill != '' ? formData.skill : item.skill,
            id: formId
          };
        }
        
        // se não é o que a gente quer então a gente não faz nada
        return item;
      });

      // muda o brainrot na db, no pc da escola não vai funcionar, só se usar ngrok mas ai sei lá se vou fazer isso
      const response = await fetch(`${dbUrl}/${formId}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(list.find(item => item.id == formId)), 
      });

      if (!response.ok) {
        throw new Error('Failed to save data to database');
      }

      setBrainrots(list);
      
      // limpa a var do formulario e fecha o formulario
      setFormData({ name: '', skill: '', height: '', width: '', weight: '' });
      setFormId(null);
      setIsBrainrotEditFormVisible(false);

    } catch (error) {
      console.error("Error saving brainrot:", error);
    }
  }

  async function deleteBrainrot() {
    try {
      // muda o brainrot na db, no pc da escola não vai funcionar, só se usar ngrok mas ai sei lá se vou fazer isso
      const response = await fetch(`${dbUrl}/${formId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      }
    });

      if (!response.ok) {
        throw new Error('Failed to delete data from database');
      }
      //

      // edita
      const listWithoutDeletedItem = brainrots.filter(item => item.id !== formId);
      setBrainrots(listWithoutDeletedItem);
      
      // limpa a var do formulario e fecha o formulario
      setFormData({ name: '', skill: '', height: '', width: '', weight: '' });
      setFormId(null);
      setIsBrainrotEditFormVisible(false);

    } catch (error) {
      console.error("Error saving brainrot:", error);
    }
  }

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
              <TouchableOpacity style={styles.addCard} onPress={() => addNewBrainrot()}>
                <Text style={styles.addText}>＋</Text>
                <Text style={styles.addText}>Add Brainrot</Text>
              </TouchableOpacity>
            );
          }
          // normal
          return (
            <TouchableOpacity style={styles.brainrotCard} onPress={() => {
            editExistingBrainrot(item.id)}}> 
              <Text style={styles.brainrotName}>{item.name}</Text>
              <Text>Skill: {item.skill}</Text>
              <Text>Height: {item.height}</Text>
              <Text>Width: {item.width}</Text>
              <Text>Weight: {item.weight}</Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* formulario popup de adicionar */}
      <Modal
        visible={isBrainrotAddFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsBrainrotAddFormVisible(false)} // deixa invisivel quando manda
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Brainrot</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Skill"
              value={formData.skill}
              onChangeText={(text) => setFormData({ ...formData, skill: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Height"
              value={formData.height}
              onChangeText={(text) => setFormData({ ...formData, height: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Width"
              value={formData.width}
              onChangeText={(text) => setFormData({ ...formData, width: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight"
              value={formData.weight}
              onChangeText={(text) => setFormData({ ...formData, weight: text })}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {setIsBrainrotAddFormVisible(false); setFormData({ name: '', skill: '', height: '', width: '', weight: '' });}} ><Text>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={saveBrainrot} ><Text>Save</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* formulario popup de editar e deletar */}
      <Modal
        visible={isBrainrotEditFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsBrainrotEditFormVisible(false)} // deixa invisivel quando manda
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Brainrot</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Skill"
              value={formData.skill}
              onChangeText={(text) => setFormData({ ...formData, skill: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Height"
              value={formData.height}
              onChangeText={(text) => setFormData({ ...formData, height: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Width"
              value={formData.width}
              onChangeText={(text) => setFormData({ ...formData, width: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight"
              value={formData.weight}
              onChangeText={(text) => setFormData({ ...formData, weight: text })}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {setIsBrainrotEditFormVisible(false); setFormData({ name: '', skill: '', height: '', width: '', weight: '' });}} ><Text>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => editBrainrot()} ><Text>Save</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => deleteBrainrot()} ><Text>Delete</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}