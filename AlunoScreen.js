import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function AlunoScreen() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [turno, setTurno] = useState('');
  const [curso, setCurso] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  

  const salvarDados = async () => {
    try {
      if (editIndex !== null) {
        const novosAlunos = [...alunos];
        novosAlunos[editIndex] = { nome, matricula, turno, curso };
        setAlunos(novosAlunos);
        setEditIndex(null);
      } else {
        const novoAluno = { nome, matricula, turno, curso };
        setAlunos([...alunos, novoAluno]);
      }

      setNome('');
      setMatricula('');
      setTurno('');
      setCurso('');

      await AsyncStorage.setItem('alunos', JSON.stringify(alunos));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  const editarAluno = (index) => {
    const aluno = alunos[index];
    setNome(aluno.nome);
    setMatricula(aluno.matricula);
    setTurno(aluno.turno);
    setCurso(aluno.curso);
    setEditIndex(index);
  };

  const excluirAluno = async (index) => {
    const novosAlunos = [...alunos];
    novosAlunos.splice(index, 1);
    setAlunos(novosAlunos);
    setEditIndex(null);

    await AsyncStorage.setItem('alunos', JSON.stringify(novosAlunos));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNome(text)}
        value={nome}
      />

      <Text style={styles.label}>Matrícula:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setMatricula(text)}
        value={matricula}
      />

      <Text style={styles.label}>Turno:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setTurno(text)}
        value={turno}
      />

      <Text style={styles.label}>Curso:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCurso(text)}
        value={curso}
      />

      <Button title={editIndex !== null ? 'Editar Aluno' : 'Adicionar Aluno'} onPress={salvarDados} />

      <FlatList
        data={alunos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.alunoItem}>
            <Text style={styles.alunoItemText}>Nome: {item.nome}</Text>
            <Text style={styles.alunoItemText}>Matrícula: {item.matricula}</Text>
            <Text style={styles.alunoItemText}>Turno: {item.turno}</Text>
            <Text style={styles.alunoItemText}>Curso: {item.curso}</Text>
            <TouchableOpacity onPress={() => editarAluno(index)}>
              <Text style={styles.editButton}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => excluirAluno(index)}>
              <Text style={styles.deleteButton}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#98FB98',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 16,
    paddingLeft: 8,
  },
  alunoItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    margin: 4,
    backgroundColor: '#6B8E23',
  },
  alunoItemText: {
    fontSize: 16,
  },
  editButton: {
    color: '#7B68EE',
  },
  deleteButton: {
    color: '#DC143C',
  },
});
