import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import {
  homeStyles as s,
  COLORS,
  MOOD_ITEMS,
  COURSE_OPTIONS,
  TURNO_OPTIONS,
  ANO_OPTIONS,
  GENERO_OPTIONS
} from '../styles/homeStyles';
import { Send, ShieldAlert, HeartHandshake, Home as HomeIcon, AlertTriangle } from 'lucide-react-native';

export default function Home({ navigation }) {
  // Estados do formulário
  const [mood, setMood] = useState(null);
  const [curso, setCurso] = useState('');
  const [turno, setTurno] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [nome, setNome] = useState('');
  const [anonimo, setAnonimo] = useState(false);

  // Controle da seção de denúncia
  const [isDenuncia, setIsDenuncia] = useState(false);
  const [denunciaType, setDenunciaType] = useState(null);
  const [relato, setRelato] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [progresso, setProgresso] = useState(20);

  // Validação do formulário baseada nos campos obrigatórios
  const canSubmit = mood !== null && curso !== '' && turno !== '' && ano !== '' && (!isDenuncia || denunciaType !== null);

  // Gerencia a mudança do toggle de anonimato
  const handleAnonToggle = (val) => {
    setAnonimo(val);
    if (val) setNome('');
  };

  // Atualiza a barra de progresso dinamicamente com base nas seções preenchidas
  useEffect(() => {
    let base = 20;
    if (mood !== null) base += 25;
    if (curso !== '' && turno !== '' && ano !== '') base += 25;
    if (isDenuncia) base += 30;
    setProgresso(base > 100 ? 100 : base);
  }, [mood, curso, turno, ano, isDenuncia]);

   const handleEnviar = async () => {
     if (!canSubmit || isLoading) return;
     setIsLoading(true);
     try {
       // Monta o payload para o backend
       const payload = {
         curso,
         turno,
         ano,
         genero,
         anonimo,
         nome: anonimo ? null : nome,
         mood,
         isDenuncia,
         denunciaType: isDenuncia ? denunciaType : null,
         relato: isDenuncia ? relato : null
       };
       await api.post('/denuncias', payload);
       setIsLoading(false);
       navigation.navigate('Success');
     } catch (err) {
       setIsLoading(false);
       alert('Erro ao enviar registro. Tente novamente.');
     }
   };

  return (
      <SafeAreaView style={s.container}>

            {/* ── HEADER INSTITUCIONAL (Sem hambúrguer, sem avatar) ── */}
            <View style={s.header}>
              <View style={s.headerLogoRow}>
                <View style={[s.ifBadge, { backgroundColor: 'transparent' }]}>
                  <Image 
                    source={require('../../assets/Campus_Nova_Cruz_-_Logo_Color_Vert.original.png')} 
                    style={{ width: 44, height: 44 }} 
                    resizeMode="contain" 
                  />
                </View>
                <View style={s.headerTextBlock}>
              <Text style={s.headerTitle}>IF Cuidado</Text>
              <Text style={s.headerSubtitle}>IFRN · Nova Cruz</Text>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
            style={s.flex1}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

            {/* ── INTRODUÇÃO E PROGRESSO ── */}
            <View style={s.introSection}>
              <Text style={s.mainTitle}>Como você está hoje?</Text>
              <Text style={s.subTitle}>
                Seu relato é seguro e nos ajuda a cuidar melhor de você e do ambiente escolar.
              </Text>
              <View style={s.progressBarTrack}>
                <View style={[s.progressBarFill, { width: `${progresso}%` }]} />
              </View>
            </View>

            {/* ── 1. ESTADO EMOCIONAL ── */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Estado emocional *</Text>
              <View style={s.emojiGrid}>
                {MOOD_ITEMS.map((item, i) => {
                  const selected = mood === i;
                  return (
                      <TouchableOpacity
                          key={i}
                          style={[s.emojiItem, selected && s.emojiItemSelected]}
                          onPress={() => setMood(i)}
                          activeOpacity={0.75}
                      >
                        <Text style={s.emojiChar}>{item.emoji}</Text>
                        <Text style={[s.emojiShort, selected && s.emojiShortSelected]}>
                          {item.short}
                        </Text>
                        {selected && (
                            <Text style={s.emojiFullLabel}>{item.full}</Text>
                        )}
                      </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* ── 2. SUA TURMA (PICKERS COM ENUMS) ── */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Sua turma</Text>

              <Text style={s.label}>Curso *</Text>
              <View style={s.pickerWrapper}>
                <Picker selectedValue={curso} onValueChange={setCurso} style={s.picker} dropdownIconColor={COLORS.primary}>
                  {COURSE_OPTIONS.map(o => <Picker.Item key={o.value} label={o.label} value={o.value} color={o.value === '' ? '#64748b' : undefined} />)}
                </Picker>
              </View>

              <View style={s.row}>
                <View style={s.flex1}>
                  <Text style={s.label}>Turno *</Text>
                  <View style={s.pickerWrapper}>
                    <Picker selectedValue={turno} onValueChange={setTurno} style={s.picker} dropdownIconColor={COLORS.primary}>
                      {TURNO_OPTIONS.map(o => <Picker.Item key={o.value} label={o.label} value={o.value} color={o.value === '' ? '#64748b' : undefined} />)}
                    </Picker>
                  </View>
                </View>

                <View style={s.flex1}>
                  <Text style={s.label}>Ano *</Text>
                  <View style={s.pickerWrapper}>
                    <Picker selectedValue={ano} onValueChange={setAno} style={s.picker} dropdownIconColor={COLORS.primary}>
                      {ANO_OPTIONS.map(o => <Picker.Item key={o.value} label={o.label} value={o.value} color={o.value === '' ? '#64748b' : undefined} />)}
                    </Picker>
                  </View>
                </View>
              </View>

              <Text style={s.label}>Gênero (opcional)</Text>
              <View style={s.pickerWrapper}>
                <Picker selectedValue={genero} onValueChange={setGenero} style={s.picker} dropdownIconColor={COLORS.primary}>
                  {GENERO_OPTIONS.map(o => <Picker.Item key={o.value} label={o.label} value={o.value} />)}
                </Picker>
              </View>
            </View>

            {/* ── 3. IDENTIDADE E ANONIMATO ── */}
            <View style={s.section}>
              <Text style={s.sectionTitle}>Sua identidade</Text>
              <View style={s.identityCard}>
                <View>
                  <Text style={s.label}>Nome (opcional)</Text>
                  <Text style={s.identityNameHint}>
                    Preencha se quiser que a equipe multiprofissional possa entrar em contato com você.
                  </Text>
                  <TextInput
                      style={[s.textInput, anonimo && { opacity: 0.35, backgroundColor: COLORS.disabledBg }]}
                      placeholder="Seu nome completo…"
                      placeholderTextColor={COLORS.onSurfaceVariant}
                      value={nome}
                      onChangeText={setNome}
                      editable={!anonimo}
                  />
                </View>

                <View style={s.anonRow}>
                  <View style={s.anonTextBlock}>
                    <Text style={s.anonTitle}>🔒 Enviar anonimamente</Text>
                    <Text style={s.anonSubtitle}>
                      Ativando esta opção, nenhum dado de identificação pessoal será vinculado ao registro enviado.
                    </Text>
                  </View>
                  <Switch
                      value={anonimo}
                      onValueChange={handleAnonToggle}
                      trackColor={{ false: COLORS.outlineVariant, true: COLORS.primary }}
                      thumbColor={COLORS.white}
                      ios_backgroundColor={COLORS.outlineVariant}
                  />
                </View>
              </View>
            </View>

            {/* ── 4. CANAL DE DENÚNCIA EXPANSÍVEL E MODERNO ── */}
            <View style={s.section}>
              <View style={s.denunciaHeader}>
                <View style={s.denunciaTitleWrapper}>
                  <View style={s.denunciaIconCircle}>
                    <ShieldAlert size={20} color={COLORS.error} />
                  </View>
                  <Text style={s.denunciaTitle}>Deseja registrar uma denúncia?</Text>
                </View>
                <Switch
                    value={isDenuncia}
                    onValueChange={setIsDenuncia}
                    trackColor={{ false: COLORS.outlineVariant, true: COLORS.primary }}
                    thumbColor={COLORS.white}
                    ios_backgroundColor={COLORS.outlineVariant}
                />
              </View>

              {isDenuncia && (
                  <View>
                    <Text style={s.denunciaHelpText}>
                      Relate situações de bullying, assédio, discriminação ou problemas estruturais. Sua denúncia é totalmente sigilosa e tratada com prioridade absoluta pela equipe pedagógica.
                    </Text>

                    <Text style={s.label}>Tipo de Ocorrência *</Text>
                    <View style={s.radioGrid}>
                      {['Bullying', 'Assédio', 'Discriminação', 'Outro'].map((tipo) => {
                        const selected = denunciaType === tipo;
                        return (
                            <TouchableOpacity
                                key={tipo}
                                style={[s.radioItem, selected && s.radioItemSelected]}
                                onPress={() => setDenunciaType(tipo)}
                                activeOpacity={0.75}
                            >
                              <View style={[s.radioCircle, selected && s.radioCircleSelected]}>
                                {selected && <View style={s.radioInnerCircle} />}
                              </View>
                              <Text style={s.radioLabel}>{tipo}</Text>
                            </TouchableOpacity>
                        );
                      })}
                    </View>

                    <Text style={s.label}>Relato Detalhado</Text>
                    <TextInput
                        style={[s.textInput, s.textArea]}
                        placeholder="Descreva o ocorrido com o máximo de detalhes possível de forma segura..."
                        placeholderTextColor={COLORS.onSurfaceVariant}
                        multiline
                        value={relato}
                        onChangeText={setRelato}
                    />
                  </View>
              )}
            </View>

            {/* ── BOTÃO ENVIAR ROBUSTO ── */}
            <TouchableOpacity
                style={[s.submitBtn, (!canSubmit || isLoading) && s.submitBtnDisabled]}
                disabled={!canSubmit || isLoading}
                activeOpacity={0.82}
                onPress={handleEnviar}
            >
              {isLoading ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                  <>
                    <Text style={[s.submitBtnText, !canSubmit && s.submitBtnTextDisabled]}>
                      Enviar registro
                    </Text>
                    <Send size={18} color={canSubmit ? COLORS.onPrimaryContainer : COLORS.disabledText} />
                  </>
              )}
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>

        {/* ── BOTTOM NAVIGATION MOBILE ── */}
        <View style={s.bottomNav}>
          <TouchableOpacity style={s.navItem} onPress={() => navigation.navigate('Splash')}>
            <HomeIcon size={24} color={COLORS.onSurfaceVariant} />
            <Text style={s.navText}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.navItem, s.navItemActive]}>
            <HeartHandshake size={24} color={COLORS.primary} />
            <Text style={s.navTextActive}>Acolher</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.navItem} onPress={() => { setIsDenuncia(true); }}>
            <AlertTriangle size={24} color={COLORS.onSurfaceVariant} />
            <Text style={s.navText}>Denúncia</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
  );
}