-- =====================================================
-- FINANCECOUPLE - CONTROLE FINANCEIRO PARA CASAL
-- Schema completo para Neon Database PostgreSQL
-- =====================================================
-- 
-- Execute este SQL no SQL Editor do Neon Console
-- 1. Acesse https://console.neon.tech
-- 2. Vá no seu projeto
-- 3. Cole e execute todo este código
--
-- =====================================================

-- Tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de categorias
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    color VARCHAR(7) DEFAULT '#3B82F6',
    icon VARCHAR(50) DEFAULT 'circle',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de contas bancárias
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de transações (receitas e despesas)
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    category_id INTEGER REFERENCES categories(id),
    account_id INTEGER REFERENCES accounts(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_frequency VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de dívidas e empréstimos
CREATE TABLE debts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    description VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    remaining_amount DECIMAL(10, 2) NOT NULL,
    monthly_payment DECIMAL(10, 2) NOT NULL,
    remaining_months INTEGER NOT NULL,
    interest_rate DECIMAL(5, 2) DEFAULT 0.00,
    due_date DATE,
    is_shared BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de metas financeiras
CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    target_amount DECIMAL(10, 2) NOT NULL,
    current_amount DECIMAL(10, 2) DEFAULT 0.00,
    target_date DATE,
    is_shared BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de holdings de cryptomoedas
CREATE TABLE crypto_holdings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    symbol VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    amount DECIMAL(18, 8) NOT NULL,
    purchase_price DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de orçamento mensal
CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    category_id INTEGER REFERENCES categories(id),
    month INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
    year INTEGER NOT NULL,
    planned_amount DECIMAL(10, 2) NOT NULL,
    actual_amount DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, category_id, month, year)
);

-- Tabela de faturas mensais
CREATE TABLE monthly_bills (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    category_id INTEGER REFERENCES categories(id),
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    due_day INTEGER NOT NULL CHECK (due_day BETWEEN 1 AND 31),
    is_shared BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DADOS INICIAIS - ENZO E LETÍCIA
-- =====================================================

-- Inserir usuários reais
INSERT INTO users (name, email, balance) VALUES
('Enzo', 'enzo@email.com', 6.18),
('Letícia', 'leticia@email.com', 0.00);

-- Inserir categorias com cores
INSERT INTO categories (name, type, color, icon) VALUES
-- Receitas
('Salário', 'income', '#10B981', 'banknote'),
('Freelance', 'income', '#059669', 'laptop'),
('Investimentos', 'income', '#047857', 'trending-up'),
('Outros', 'income', '#065F46', 'plus-circle'),

-- Despesas
('Alimentação', 'expense', '#EF4444', 'utensils'),
('Moradia', 'expense', '#DC2626', 'home'),
('Transporte', 'expense', '#B91C1C', 'car'),
('Saúde', 'expense', '#991B1B', 'heart-pulse'),
('Educação', 'expense', '#7F1D1D', 'graduation-cap'),
('Lazer', 'expense', '#F97316', 'gamepad-2'),
('Roupas', 'expense', '#EA580C', 'shirt'),
('Tecnologia', 'expense', '#C2410C', 'smartphone'),
('Assinaturas', 'expense', '#9A3412', 'credit-card'),
('Outros', 'expense', '#7C2D12', 'minus-circle');

-- Inserir contas bancárias
INSERT INTO accounts (user_id, name, type, balance) VALUES
(1, 'Conta Corrente Enzo', 'checking', 6.18),
(2, 'Conta Corrente Letícia', 'checking', 0.00);

-- =====================================================
-- DÍVIDAS REAIS DO CASAL
-- =====================================================

INSERT INTO debts (user_id, description, total_amount, remaining_amount, monthly_payment, remaining_months, is_shared) VALUES
-- Empréstimo Enzo: R$ 4.340,50 em 6 meses
(1, 'Empréstimo Enzo', 4340.50, 4340.50, 723.42, 6, false),

-- Empréstimo Letícia: R$ 12.017,88 em 6 meses
(2, 'Empréstimo Letícia', 12017.88, 12017.88, 2002.98, 6, false),

-- Fotos da Faculdade: 2/5 parcelas (R$ 254/mês) - 4 parcelas restantes
(1, 'Fotos da Faculdade (2/5)', 1270.00, 1016.00, 254.00, 4, false),

-- Pillow Top: 4/12 parcelas (R$ 142,34/mês dividido por 2)
(1, 'Pillow Top (4/12)', 1708.08, 1137.38, 71.17, 8, true);

-- =====================================================
-- HOLDINGS DE CRIPTOMOEDAS
-- =====================================================

INSERT INTO crypto_holdings (user_id, symbol, name, amount) VALUES
-- Bitcoin: 0,02568 + 0,00112471 = 0,02680471 BTC total
(1, 'BTC', 'Bitcoin', 0.02568),
(1, 'BTC', 'Bitcoin', 0.00112471),

-- DOG TO THE MOON: 520.333,22 unidades
(1, 'DOG', 'DOG TO THE MOON (BITCOIN)', 520333.22);

-- =====================================================
-- META PRINCIPAL: R$ 50.000 EM 12 MESES
-- =====================================================

INSERT INTO goals (user_id, title, target_amount, target_date, is_shared) VALUES
(1, 'Guardar R$ 50.000 em 12 meses', 50000.00, CURRENT_DATE + INTERVAL '12 months', true);

-- =====================================================
-- GASTOS CONSTANTES MENSAIS
-- =====================================================

INSERT INTO monthly_bills (user_id, category_id, name, amount, due_day, is_shared) VALUES
-- Spotify: R$ 27,90 dividido por 2 (R$ 13,95 cada)
(1, (SELECT id FROM categories WHERE name = 'Assinaturas'), 'Spotify', 13.95, 15, true),

-- ChatGPT: R$ 18,50 (Enzo)
(1, (SELECT id FROM categories WHERE name = 'Tecnologia'), 'ChatGPT', 18.50, 10, false),

-- NuCell: R$ 45,00 (Letícia)  
(2, (SELECT id FROM categories WHERE name = 'Tecnologia'), 'NuCell', 45.00, 20, false);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

CREATE INDEX idx_transactions_user_date ON transactions(user_id, date);
CREATE INDEX idx_transactions_category ON transactions(category_id);
CREATE INDEX idx_debts_user ON debts(user_id);
CREATE INDEX idx_goals_user ON goals(user_id);
CREATE INDEX idx_crypto_user ON crypto_holdings(user_id);
CREATE INDEX idx_budgets_user_month ON budgets(user_id, month, year);

-- =====================================================
-- TRIGGERS AUTOMÁTICOS
-- =====================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar triggers em todas as tabelas necessárias
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_debts_updated_at BEFORE UPDATE ON debts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crypto_updated_at BEFORE UPDATE ON crypto_holdings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON budgets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON monthly_bills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- PRONTO! BANCO CONFIGURADO COM TODOS OS DADOS REAIS
-- =====================================================
--
-- Agora configure a DATABASE_URL no seu .env.local:
-- DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
-- 
-- Execute: bun install && bun run dev
-- Acesse: http://localhost:3000
--
-- ✅ Usuários: Enzo (R$ 6,18) e Letícia (R$ 0,00)
-- ✅ Meta: R$ 50.000 em 12 meses
-- ✅ Dívidas: Empréstimos e financiamentos reais
-- ✅ Crypto: Bitcoin + DOG TO THE MOON
-- ✅ Gastos: Spotify, ChatGPT, NuCell configurados
--
-- =====================================================
