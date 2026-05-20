import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando todas as telas do fluxo do aluno
import SplashScreen from './src/screens/SplashScreen'; // Tela inicial de boas-vindas
import Home from './src/screens/Home';       // O formulário de humor e denúncia
import Success from './src/screens/Success'; // A tela de confirmação animada

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        // screenOptions aplica regras para TODAS as telas de uma vez só
        screenOptions={{ 
          headerShown: false,           // Remove o cabeçalho padrão nativo
          animation: 'slide_from_right' // Transição nativa e suave entre telas
        }}
      >
        
        {/* 1. Tela Inicial de Boas-Vindas */}
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
        />
        
        {/* 2. Tela Principal (Formulário do Aluno) */}
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
        
        {/* 3. Tela de Confirmação e Sucesso */}
        <Stack.Screen 
          name="Success" 
          component={Success} 
          options={{
            // A tela de sucesso não deve permitir voltar pelo gesto (iOS) ou botão voltar (Android)
            gestureEnabled: false 
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}