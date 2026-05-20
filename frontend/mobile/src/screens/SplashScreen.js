import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShieldCheck, HeartHandshake, AlertTriangle } from 'lucide-react-native';

// Importamos a paleta de cores para manter o app 100% padronizado
import { COLORS } from '../styles/homeStyles';

export default function SplashScreen({ navigation }) {
  return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

        {/* ── CABEÇALHO INSTITUCIONAL PADRONIZADO ── */}
        <View style={styles.header}>
          <View style={styles.headerLogoRow}>
            <View style={[styles.ifBadge, { backgroundColor: 'transparent' }]}>
              <Image 
                source={require('../../assets/Campus_Nova_Cruz_-_Logo_Color_Vert.original.png')} 
                style={{ width: 44, height: 44 }} 
                resizeMode="contain" 
              />
            </View>
            <View style={styles.headerTextBlock}>
              <Text style={styles.headerTitle}>IF Cuidado</Text>
              <Text style={styles.headerSubtitle}>IFRN · Nova Cruz</Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* LOGO E TEXTOS INTRODUTÓRIOS */}
          <View style={styles.logoContainer}>
            <ShieldCheck size={76} color={COLORS.primary} strokeWidth={1.5} />
          </View>

          <Text style={styles.title}>IF Cuidado</Text>
          <Text style={styles.subtitle}>Este é o seu espaço seguro.</Text>

          <Text style={styles.description}>
            Uma plataforma digital exclusiva do IFRN Campus Nova Cruz. Ela conecta estudantes e equipe pedagógica de forma segura, rápida e confidencial.{"\n\n"}
            <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>Monitoramento de Bem-Estar:</Text> Permite que a instituição acompanhe como os alunos estão se sentindo no dia a dia acadêmico.{"\n\n"}
            <Text style={{ fontWeight: 'bold', color: COLORS.error }}>Canal de Denúncia:</Text> Oferece um espaço seguro para relatar bullying, assédio ou dificuldades pessoais com total anonimato.
          </Text>

          {/* CARDS DE FUNCIONALIDADES */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureRow}>
              <View style={styles.iconBoxGreen}>
                <HeartHandshake size={28} color={COLORS.primary} />
              </View>
              <View style={styles.featureTextContent}>
                <Text style={styles.featureTitle}>Acolhimento</Text>
                <Text style={styles.featureDesc}>
                  Acompanhe e registre como você está se sentindo para ajudar a instituição a apoiar melhor as turmas.
                </Text>
              </View>
            </View>

            <View style={styles.featureRow}>
              <View style={styles.iconBoxRed}>
                <AlertTriangle size={28} color={COLORS.error} />
              </View>
              <View style={styles.featureTextContent}>
                <Text style={styles.featureTitle}>Canal de Denúncia</Text>
                <Text style={styles.featureDesc}>
                  Relate casos de bullying ou problemas estruturais. O sigilo é total e protegido pela LGPD.
                </Text>
              </View>
            </View>
          </View>

          {/* BOTÃO DE AÇÃO */}
          <View style={styles.footer}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.85}
                onPress={() => navigation.replace('Home')}
            >
              <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  // ── Estilos do Cabeçalho (Idêntico ao Home.js) ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 16,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ifBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ifBadgeText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primaryDark,
    letterSpacing: -0.5,
  },
  headerTextBlock: {
    flexDirection: 'column',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.primaryDark,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ── Conteúdo da Tela ──
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 4,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
  },
  featuresContainer: {
    marginBottom: 16,
    gap: 16, // Espaçamento moderno entre os cards
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(189, 202, 187, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBoxGreen: {
    backgroundColor: COLORS.onPrimaryContainer,
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  iconBoxRed: {
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
  },
  featureTextContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    lineHeight: 20,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 32,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});