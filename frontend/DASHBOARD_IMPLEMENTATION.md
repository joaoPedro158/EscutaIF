# Dashboard EscutaIF - Implementação

## Componentes Criados

### 1. **StatCard** (`src/components/StatCard.jsx`)
Componente reutilizável para exibir cartões de estatísticas com:
- Suporte a tema destacado (para "Sentimento Geral")
- Título, valor principal e subtítulo
- Cores customizáveis via variáveis CSS
- Efeito de hover (scale-105)
- Responsivo

### 2. **DashboardFilters** (`src/components/DashboardFilters.jsx`)
Componente de filtros com:
- Dois dropdowns (Cursos e Turmas)
- Design responsivo (flex-col em mobile, flex-row em desktop)
- Ícone ChevronDown da lucide-react
- Estado visual com hover

### 3. **SentimentChart** (`src/components/SentimentChart.jsx`)
Gráfico de Pizza (Pie Chart) usando Recharts:
- Mostra distribuição de sentimentos (Positivo, Neutro, Moderado, Crítico)
- 4 cores distintas baseadas nas cores do design
- Legenda customizada abaixo do gráfico
- Responsivo com ResponsiveContainer
- Dados mockados

### 4. **CategoryChart** (`src/components/CategoryChart.jsx`)
Gráfico de Barras (Bar Chart) usando Recharts:
- Mostra categorias de denúncias
- Eixos X e Y customizados
- Grid de fundo sutil
- Responsivo
- Dados mockados

### 5. **ReportsTable** (`src/components/ReportsTable.jsx`)
Tabela de relatórios com:
- 5 colunas (Curso, Categoria, Sentimento, Data, Status)
- Badges de cores diferentes para sentimentos
- Cores de status customizadas
- Hover effects em linhas
- Dados mockados
- Responsivo com scroll horizontal em mobile

### 6. **Dashboard** (Atualizado `src/pages/Dashboard.jsx`)
Página principal que integra todos os componentes:
- Header com título e descrição
- Seção de filtros
- Grid de 4 cards de estatísticas (responsivo: 1 col mobile, 2 cols tablet, 4 cols desktop)
- Seção de gráficos (1 col mobile, 2 cols desktop)
- Tabela de relatórios
- Usa MobileLayout para layout consistente

## Design System

### Cores Utilizadas (do `index.css`)
```css
--primary: #00694c (Verde principal)
--color-accent: #fcaa33 (Laranja/Amarelo)
--color-text: #3d4943 (Cinza escuro)
--color-heading: #1b1c19 (Preto)
--color-surface: #f7f9f8 (Cinza claro)
--color-surface-strong: #ffffff (Branco)
--color-soft-border: #f0eee9 (Borda sutil)
```

### Cores dos Gráficos
- Positivo: `#00694c` (Verde)
- Neutro: `#fcaa33` (Laranja)
- Moderado: `#e8724d` (Coral)
- Crítico: `#ff6b6b` (Vermelho)

## Responsividade

### Breakpoints Utilizados
- **Mobile**: 1 coluna para stats e gráficos
- **Tablet (sm: 640px)**: 2 colunas para stats
- **Desktop (lg: 1024px)**: 4 colunas para stats, 2 colunas para gráficos

### Grid Layout
```jsx
// Stats Grid
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4

// Charts Grid
grid-cols-1 lg:grid-cols-2

// Legend (SentimentChart)
grid-cols-2 (sempre 2 colunas)
```

## Dados Mockados

### Estatísticas
- Acolhimentos: 247 (+12 esta semana)
- Denúncias: 89 (+5 esta semana)
- Pendências: 34 (-8 esta semana)
- Sentimento Geral: Neutro

### Sentimentos (Gráfico de Pizza)
- Positivo: 45%
- Neutro: 30%
- Moderado: 15%
- Crítico: 10%

### Categorias (Gráfico de Barras)
- Saúde Mental: 32
- Assédio: 28
- Discriminação: 24
- Financeiro: 18
- Acadêmico: 15

### Relatórios (Tabela)
5 exemplos com diferentes:
- Cursos
- Categorias
- Sentimentos
- Datas
- Status (Pendente, Em Análise, Resolvido)

## Dependências Adicionadas
- `recharts`: Biblioteca para gráficos React

## Padrões de Código

### Imports
- Usar destructuring para componentes lucide-react
- Importar apenas o necessário do recharts

### Estilo
- Classes Tailwind inline
- Variáveis CSS para cores (usando `var()`)
- Cores específicas quando necessário (ex: gradientes)
- `text-[#...]` para valores específicos não padronizados

### Componentes
- Functional components
- Props para customização
- Default exports
- Nomes descritivos em PascalCase

## Como Usar

1. O Dashboard está acessível em `/dashboard`
2. Todos os dados são mockados (sem chamadas à API)
3. Os componentes são reutilizáveis e podem ser usados em outras páginas
4. As cores seguem o design system do projeto

## Validação

✅ Build bem-sucedido sem erros
✅ Lint passando (ESLint)
✅ Responsivo em todos os breakpoints
✅ Segue padrões de arquitetura existentes
✅ Dados mockados fornecidos
✅ Cores usando variáveis CSS
