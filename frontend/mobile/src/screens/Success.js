import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle } from 'lucide-react-native';
import { successStyles as styles } from '../styles/successStyles';
import { COLORS } from '../styles/homeStyles'; // Importando a paleta global

export default function Success({ navigation }) {
  // Valores iniciais para a animação (Opacidade 0 e Y = 20 para baixo)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Inicia a animação assim que a tela for carregada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600, // Transição levemente mais suave
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, translateYAnim]);

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.surface} barStyle="dark-content" />

        <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }]
              }
            ]}
        >
          <View style={styles.iconWrapper}>
            <CheckCircle size={56} color={COLORS.primary} strokeWidth={2.5} />
          </View>

          <Text style={styles.title}>
            Registro enviado com sucesso!
          </Text>

          <Text style={styles.description}>
            Agradecemos pela sua coragem e confiança. A equipe de Acolhimento do Campus Nova Cruz analisará suas informações com total sigilo e entrará em contato em breve.
          </Text>

          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
                style={styles.primaryBtn}
                activeOpacity={0.85}
                // O reset limpa o histórico, impedindo que o aluno volte para a tela de sucesso pelo botão nativo do Android
                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Splash' }] })}
            >
              <Text style={styles.primaryBtnText}>Voltar ao Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryBtn}
                activeOpacity={0.75}
                // O replace substitui a tela de sucesso pelo novo formulário, não empilhando as telas
                onPress={() => navigation.replace('Home')}
            >
              <Text style={styles.secondaryBtnText}>Fazer Novo Registro</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
  );
}