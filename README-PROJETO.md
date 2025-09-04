# 💰 FinanceCouple - Controle Financeiro para Casais

Uma aplicação completa de controle financeiro desenvolvida especialmente para casais, com recursos avançados de gestão de receitas, despesas, metas, dívidas e acompanhamento de criptomoedas.

## 🚀 Recursos Principais

### 📊 Dashboard Completo
- Visão geral do saldo total do casal
- Gráficos interativos de receitas vs despesas
- Distribuição de gastos por categoria
- Acompanhamento de metas e dívidas
- Portfolio de criptomoedas em tempo real

### 💸 Gestão de Transações
- Registro de receitas e despesas por pessoa
- Categorização automática com cores personalizadas
- Filtros avançados por usuário, categoria e período
- Transações recorrentes
- Exportação de dados

### 🎯 Metas Financeiras
- **Meta Principal**: Guardar R$ 50.000 em 12 meses
- Acompanhamento de progresso visual
- Metas individuais e compartilhadas
- Sistema de prioridades (Alta/Média/Baixa)
- Cálculo automático de valores mensais necessários

### 💳 Controle de Dívidas
- **Empréstimo Enzo**: R$ 4.340,50 (6x R$ 723,42)
- **Empréstimo Letícia**: R$ 12.017,88 (6x R$ 2.002,98)
- **Fotos da Faculdade**: R$ 1.016,00 (4x R$ 254,00)
- **Pillow Top**: R$ 1.137,38 (8x R$ 71,17) - Compartilhada
- Visualização de progresso de pagamento
- Alertas de vencimento

### ₿ Portfolio de Criptomoedas
- **Bitcoin**: 0,02680471 BTC (0,02568 + 0,00112471)
- **DOG TO THE MOON**: 520.333,22 unidades
- Cotações em tempo real (BRL e USD)
- Gráficos de preços históricos
- Cálculo de lucro/prejuízo automático
- Opção de ocultar valores para privacidade

### 📅 Gastos Recorrentes Configurados
- **Spotify**: R$ 27,90/mês (dividido por 2)
- **ChatGPT**: R$ 18,50/mês (Enzo)
- **NuCell**: R$ 45,00/mês (Letícia)

## 🛠️ Tecnologias Utilizadas

- **Framework**: Next.js 15.5.2 com App Router
- **Runtime**: Bun (gerenciamento de pacotes e execução)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Banco de Dados**: Neon PostgreSQL
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Deploy**: Pronto para Vercel

## 🏗️ Arquitetura do Banco de Dados

### Tabelas Principais
- `users` - Usuários do sistema (Enzo e Letícia)
- `categories` - Categorias de receitas e despesas
- `transactions` - Histórico de transações financeiras
- `debts` - Dívidas e empréstimos
- `goals` - Metas financeiras
- `crypto_holdings` - Holdings de criptomoedas
- `monthly_bills` - Gastos mensais fixos
- `budgets` - Orçamentos planejados

## 🎨 Design System

### Paleta de Cores
- **Primária**: Azul (#3B82F6) - Confiança e estabilidade
- **Receitas**: Verde (#10B981) - Crescimento e sucesso
- **Despesas**: Vermelho (#EF4444) - Atenção e alerta
- **Background**: Branco e tons de cinza claro
- **Acentos**: Laranja para urgências

### Componentes UI
- Cards responsivos com bordas coloridas
- Gráficos interativos (Area, Bar, Line, Pie, Radar)
- Progress bars para metas e dívidas
- Badges coloridas para status
- Sidebar de navegação moderna
- Modais para formulários

## 📱 Layout Responsivo

- **Desktop**: Sidebar + conteúdo principal
- **Mobile**: Navigation drawer otimizada
- **Tablet**: Layout adaptável híbrido

## 🔐 Segurança e Privacidade

- Variáveis de ambiente para credenciais sensíveis
- Opção de ocultar valores monetários
- Conexão segura com banco de dados
- Validação de dados no frontend e backend

## 🚀 Como Executar o Projeto

### 1. Configurar o Banco de Dados
1. Acesse o [Console do Neon](https://console.neon.tech)
2. Crie um novo projeto
3. Execute o SQL fornecido no arquivo `database-schema.sql`

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
COINAPI_KEY="your-coinapi-key-here" # Opcional para cotações crypto
NEXT_PUBLIC_APP_NAME="FinanceCouple"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

### 3. Instalar e Executar
```bash
# Instalar dependências
bun install

# Executar em desenvolvimento
bun run dev

# Build para produção
bun run build
bun run start
```

### 4. Configurar GitHub Actions (Opcional)
O projeto já inclui workflow para criar branches automáticas do Neon para cada PR:
- Configure `NEON_PROJECT_ID` como variável do repositório
- Configure `NEON_API_KEY` como secret do repositório

## 📊 Dados Iniciais Configurados

### Usuários
- **Enzo**: R$ 6,18 de saldo
- **Letícia**: R$ 0,00 de saldo

### Dívidas Reais
- Empréstimos pessoais com parcelas mensais
- Financiamentos compartilhados
- Cálculo automático de progressos

### Meta Principal
- **Objetivo**: R$ 50.000 em 12 meses
- **Progresso Atual**: R$ 2.500 (5%)
- **Meta Mensal**: R$ 4.166,67

### Holdings Crypto
- Portfolio diversificado em Bitcoin e altcoins
- Integração com APIs de cotação
- Tracking de performance

## 🎯 Próximos Passos para Produção

1. **Integração Real com APIs**
   - CoinGecko para cotações crypto
   - Open Banking para extratos bancários
   - Notificações push

2. **Recursos Avançados**
   - Relatórios PDF
   - Backup automático
   - Sincronização entre dispositivos
   - Modo escuro

3. **Análises Inteligentes**
   - IA para categorização automática
   - Previsões de gastos
   - Recomendações personalizadas

## 📞 Suporte e Contato

Este projeto foi desenvolvido especificamente para Enzo e Letícia, com base em suas necessidades reais de controle financeiro familiar.

---

**Desenvolvido com ❤️ para o casal Enzo & Letícia**

*Controle financeiro inteligente, design moderno, e funcionalidades pensadas para quem quer organizar a vida financeira a dois.*
