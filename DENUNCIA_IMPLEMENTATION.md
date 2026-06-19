# Página de Denúncia - Implementação

## 📋 Visão Geral
Implementação da página de denúncia segura baseada no design do Figma. A página foi desenvolvida em **React** com **Tailwind CSS**, seguindo a estrutura e estilos do projeto existente.

## ✅ O que foi implementado

### 1. **Página Principal (Denuncia.jsx)**
- **Localização**: `frontend/src/pages/Denuncia.jsx`
- **Características**:
  - Toggle de identificação (Anônima/Identificada)
  - Formulário completo com campos para:
    - Tipo de denúncia
    - Descrição do incidente
    - Data do incidente
    - Local do incidente
    - Pessoa afetada
    - Testemunhas
    - Informações adicionais
  - Campos adicionais condicionais para denúncias identificadas
  - Validação básica (campo obrigatório)
  - Tela de confirmação com feedback visual
  - Dados mockados (nenhuma conexão com banco de dados)

### 2. **Responsividade**
- ✅ Mobile-first design
- ✅ Layout fluído com Tailwind CSS
- ✅ Grid responsivo (1 coluna em mobile, 2 em tablet, etc)
- ✅ Integrado com `MobileLayout` existente
- ✅ Compatível com navegação mobile (BottomNav)

### 3. **Linkagem de Páginas**
- **FeatureCard.jsx**: Adicionado suporte a links
- **FeaturesSection.jsx**: Card "Canal Seguro" linkado para `/denuncia`
- **BottomNav.jsx**: Já tinha link para `/denuncia`
- **Sidebar.jsx**: Já tinha link para `/denuncia`
- **appRoute.jsx**: Rota `/denuncia` já estava configurada

### 4. **Design & Estilos**
- Cores consistentes com a paleta do projeto:
  - Primária: `#fcaa33` (laranja)
  - Secundária: `#00694c` (verde)
  - Neutra: `#1b1c19` (preto)
- Componentes visuais usando Lucide Icons:
  - `AlertCircle` - Header da página
  - `CheckCircle` - Confirmação de envio
- Shadows e rounded corners seguindo design system existente

## 📱 Estrutura do Formulário

### Toggle de Identificação
```
┌─────────────────────┐
│ IDENTIFICAÇÃO       │
├─────────┬───────────┤
│ Anônima │Identificada│
└─────────┴───────────┘
```

### Campos do Formulário
1. **Tipo de Denúncia** (select)
   - Assédio
   - Discriminação
   - Violência
   - Conduta Inapropriada
   - Outro

2. **Descrição do Incidente** (textarea)

3. **Data e Local** (grid responsivo)
   - Data do Incidente
   - Local do Incidente

4. **Envolvidos**
   - Pessoa Afetada
   - Testemunhas

5. **Informações Adicionais** (textarea)

6. **Dados de Contato** (condicionais para identificadas)
   - Nome completo
   - Email
   - Telefone
   - Registro (aluno/professor)

## 🎨 Componentes Modificados

### `FeatureCard.jsx`
- Adicionado suporte a propriedade `link`
- Integração com `react-router-dom`
- Efeito hover com `scale-105`

### `FeaturesSection.jsx`
- Adicionados links às features:
  - "Escuta Qualificada" → `/acolhimento`
  - "Apoio em Rede" → `/acolhimento`
  - "Canal Seguro" → `/denuncia`

## 🔄 Fluxo de Usuário

1. Usuário entra na home
2. Clica em "Canal Seguro" ou navegação
3. Chega à página de denúncia
4. Escolhe tipo de identificação
5. Preenche formulário com dados
6. Clica em "Enviar Denúncia"
7. Recebe confirmação visual
8. Formulário é resetado após 3 segundos

## 💾 Dados Mockados

Todos os dados são processados localmente (console.log) e resetados após 3 segundos:
```javascript
console.log('Denúncia enviada:', formData)
```

## 🚀 Como Usar

### Desenvolvimento
```bash
cd frontend
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## 📋 Checklist de Implementação

- ✅ Página de denúncia responsiva
- ✅ React com Tailwind CSS
- ✅ Dados mockados
- ✅ Seguiu estrutura de pasta
- ✅ Linkagem entre páginas
- ✅ Apenas camada frontend
- ✅ Build sem erros
- ✅ Lint validação passada
- ✅ Design baseado em Figma
- ✅ Acessibilidade básica

## 📁 Arquivos Modificados

1. `/frontend/src/pages/Denuncia.jsx` - Nova implementação completa
2. `/frontend/src/components/FeatureCard.jsx` - Adicionado suporte a links
3. `/frontend/src/components/FeaturesSection.jsx` - Adicionados links

## 🎯 Próximos Passos (Futuro)

- [ ] Integração com API backend
- [ ] Autenticação de usuário
- [ ] Persistência de dados
- [ ] Envio de email de confirmação
- [ ] Dashboard para visualização de denúncias
- [ ] Sistema de rastreamento
- [ ] Upload de anexos
- [ ] Notificações em tempo real

---

**Status**: ✅ Implementação Concluída
**Data**: 14 de Junho de 2026
**Build**: Verificado e Funcionando
