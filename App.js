import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AlunoScreen from './AlunoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Alunos" component={AlunoScreen} />
        {/* Adicione mais telas aqui, se necessário */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
