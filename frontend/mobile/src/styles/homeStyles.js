import { StyleSheet, Platform } from 'react-native';

export const COLORS = {
  primary: '#00682f',
  primaryDark: '#004d22',       // Verde escuro IFRN para o header
  primaryContainer: '#00843d',
  onPrimaryContainer: '#e7ffe6',
  surface: '#f8f9fa',
  surfaceVariant: '#e1e3e4',
  surfaceContainer: '#edeeef',
  surfaceContainerHigh: '#e7e8e9',
  surfaceContainerHighest: '#e1e3e4',
  surfaceLowest: '#ffffff',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3e4a3e',
  outlineVariant: '#bdcabb',
  error: '#ba1a1a',
  white: '#ffffff',
  disabledBg: '#e1e3e4',
  disabledText: '#a0a6a3',

  // Paleta emocional — usada nos emojis e badges de humor
  mood1: '#e53935', // Péssimo
  mood2: '#fb8c00', // Ruim
  mood3: '#fdd835', // Neutro
  mood4: '#7cb342', // Bem
  mood5: '#2e7d32', // Ótimo
};

// ─── Nomes completos dos estados emocionais ───────────────────────────────────
export const MOOD_ITEMS = [
  { emoji: '😔', short: 'Péssimo', full: 'Muito mal / Angustiado', color: COLORS.mood1 },
  { emoji: '😕', short: 'Ruim',    full: 'Triste / Estressado',    color: COLORS.mood2 },
  { emoji: '😐', short: 'Neutro',  full: 'Nem bem, nem mal',       color: COLORS.mood3 },
  { emoji: '🙂', short: 'Bem',     full: 'Tranquilo / Animado',    color: COLORS.mood4 },
  { emoji: '😄', short: 'Ótimo',   full: 'Muito bem / Feliz',      color: COLORS.mood5 },
];

// ─── Opções de curso / turno / ano ────────────────────────────────────────────
export const COURSE_OPTIONS = [
  { label: 'Selecione o curso…', value: '' },
  { label: 'Informática (Técnico)', value: 'informatica' },
  { label: 'Química (Técnico)',     value: 'quimica' },
  { label: 'Administração (Técnico)', value: 'administracao' },
  { label: 'TADS (Superior)',       value: 'tads' },
  { label: 'TPQ (Superior)',        value: 'tpq' },
];

export const TURNO_OPTIONS = [
  { label: 'Selecione o turno…', value: '' },
  { label: 'Matutino',  value: 'matutino' },
  { label: 'Vespertino', value: 'vespertino' },
  { label: 'Noturno',   value: 'noturno' },
];

export const ANO_OPTIONS = [
  { label: 'Selecione o ano…', value: '' },
  { label: '1º Ano', value: '1' },
  { label: '2º Ano', value: '2' },
  { label: '3º Ano', value: '3' },
  { label: '4º Ano', value: '4' },
];

export const GENERO_OPTIONS = [
  { label: 'Prefiro não informar', value: '' },
  { label: 'Feminino',             value: 'f' },
  { label: 'Masculino',            value: 'm' },
  { label: 'Não-binário',          value: 'nb' },
  { label: 'Outro',                value: 'outro' },
];

// ─── Estilos ──────────────────────────────────────────────────────────────────
export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  // ── Header (cor institucional IFRN) ────────────────────────────────────────
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 54 : 42,
    paddingBottom: 14,
    backgroundColor: COLORS.white,   // ← Agora branco
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },

  // Logo IF + texto — sem hamburger, sem avatar
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  // Quadrado branco com "IF" — tamanho aumentado
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

  // ── Scroll ──────────────────────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },

  // ── Intro + Progresso ───────────────────────────────────────────────────────
  introSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.onSurface,
    marginBottom: 8,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 15,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 22,
  },
  progressBarTrack: {
    width: '100%',
    height: 8,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },

  // ── Seções ──────────────────────────────────────────────────────────────────
  section: {
    paddingBottom: 28,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(189, 202, 187, 0.4)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 16,
  },

  // ── Inputs genéricos ────────────────────────────────────────────────────────
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
    marginBottom: 7,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  textInput: {
    backgroundColor: 'rgba(231, 232, 233, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.onSurface,
    borderWidth: 1,
    borderColor: 'rgba(189,202,187,0.5)',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  flex1: { flex: 1 },

  // ── Picker (Curso / Turno / Ano / Gênero) ───────────────────────────────────
  pickerWrapper: {
    backgroundColor: 'rgba(231, 232, 233, 0.7)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(189,202,187,0.5)',
    overflow: 'hidden',
    marginBottom: 14,
    // Altura explícita garante visibilidade em ambas as plataformas
    height: Platform.OS === 'ios' ? 50 : 52,
    justifyContent: 'center',
  },
  picker: {
    height: Platform.OS === 'ios' ? 50 : 52,
    color: COLORS.onSurface,
    // Remove o padding extra que o Android adiciona
    marginHorizontal: Platform.OS === 'android' ? -4 : 0,
  },

  // ── Grade de emojis / Estado emocional ──────────────────────────────────────
  // Agora exibe label completo abaixo do emoji em duas linhas
  emojiGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(231, 232, 233, 0.5)',
    padding: 6,
    borderRadius: 16,
  },
  emojiItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 2,
    borderRadius: 12,
    flex: 1,
  },
  emojiItemSelected: {
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
  },
  emojiChar: {
    fontSize: 30,
    marginBottom: 5,
  },
  // Nome curto em cima
  emojiShort: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  emojiShortSelected: {
    color: COLORS.primary,
  },
  // Descrição completa — visível apenas quando selecionado
  emojiFullLabel: {
    fontSize: 9,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 12,
    paddingHorizontal: 2,
  },

  // ── Seção Identidade / Anonimato ────────────────────────────────────────────
  // Card discreto que engloba o bloco de nome + toggle
  identityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(189,202,187,0.5)',
    padding: 16,
    marginBottom: 16,
    gap: 14,
  },
  // Linha: nome opcional
  identityNameHint: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: -6,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  // Linha: toggle de anonimato
  anonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(189,202,187,0.35)',
  },
  anonTextBlock: {
    flex: 1,
    marginRight: 12,
  },
  anonTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  anonSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 16,
  },
  // O próprio toggle segue o componente nativo Switch do RN — apenas passamos as cores
  // activeTrackColor = COLORS.primary, inactiveTrackColor = COLORS.outlineVariant

  // ── Denúncia ────────────────────────────────────────────────────────────────
  denunciaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  denunciaTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  // Ícone de alerta dentro de um círculo vermelho
  denunciaIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(186,26,26,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  denunciaTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  denunciaHelpText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginBottom: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(189, 202, 187, 0.4)',
    paddingTop: 16,
    lineHeight: 21,
  },
  radioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  radioItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(189, 202, 187, 0.5)',
    marginBottom: 12,
    backgroundColor: COLORS.white,
    gap: 10,
  },
  radioItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(0, 104, 47, 0.05)',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: COLORS.primary,
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.onSurface,
    flex: 1,
  },

  // ── Botão Enviar ────────────────────────────────────────────────────────────
  submitBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    borderRadius: 30,
    gap: 10,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
  },
  submitBtnText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.disabledBg,
    elevation: 0,
    shadowOpacity: 0,
  },
  submitBtnTextDisabled: {
    color: COLORS.disabledText,
  },

  // ── Bottom Navigation ───────────────────────────────────────────────────────
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 86,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
  },
  navItemActive: {
    backgroundColor: 'rgba(0,104,47,0.12)',
  },
  navText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
    fontWeight: '600',
  },
  navTextActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
});