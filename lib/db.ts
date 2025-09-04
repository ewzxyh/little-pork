import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be defined");
}

const sql = neon(process.env.DATABASE_URL);

// Tipos para TypeScript
export interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
  color: string;
  icon: string;
  created_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  category_id: number;
  account_id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  is_recurring: boolean;
  recurring_frequency: string | null;
  created_at: string;
  updated_at: string;
  user_name?: string;
  category_name?: string;
  category_color?: string;
  category_icon?: string;
}

export interface Debt {
  id: number;
  user_id: number;
  description: string;
  total_amount: number;
  remaining_amount: number;
  monthly_payment: number;
  remaining_months: number;
  interest_rate: number;
  due_date: string | null;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
  user_name?: string;
}

export interface Goal {
  id: number;
  user_id: number;
  title: string;
  target_amount: number;
  current_amount: number;
  target_date: string | null;
  is_shared: boolean;
  status: "active" | "completed" | "paused";
  created_at: string;
  updated_at: string;
  progress_percentage?: number;
}

export interface CryptoHolding {
  id: number;
  user_id: number;
  symbol: string;
  name: string;
  amount: number;
  purchase_price: number | null;
  created_at: string;
  updated_at: string;
  current_price?: number;
  current_value?: number;
  profit_loss?: number;
}

export interface MonthlyBill {
  id: number;
  user_id: number;
  category_id: number;
  name: string;
  amount: number;
  due_day: number;
  is_shared: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category_name?: string;
  category_color?: string;
  user_name?: string;
}

// Funções do banco de dados

// Usuários
export async function getUsers(): Promise<User[]> {
  const result = await sql`SELECT * FROM users ORDER BY name`;
  return result as User[];
}

export async function getUserById(id: number): Promise<User | null> {
  const result = await sql`SELECT * FROM users WHERE id = ${id}`;
  return (result[0] as User) || null;
}

// Categorias
export async function getCategories(): Promise<Category[]> {
  const result = await sql`SELECT * FROM categories ORDER BY type, name`;
  return result as Category[];
}

export async function getCategoriesByType(
  type: "income" | "expense",
): Promise<Category[]> {
  const result =
    await sql`SELECT * FROM categories WHERE type = ${type} ORDER BY name`;
  return result as Category[];
}

// Transações
export async function getTransactions(limit?: number): Promise<Transaction[]> {
  const query = limit
    ? sql`
        SELECT t.*, u.name as user_name, c.name as category_name, c.color as category_color, c.icon as category_icon
        FROM transactions t
        JOIN users u ON t.user_id = u.id
        JOIN categories c ON t.category_id = c.id
        ORDER BY t.date DESC, t.created_at DESC
        LIMIT ${limit}
      `
    : sql`
        SELECT t.*, u.name as user_name, c.name as category_name, c.color as category_color, c.icon as category_icon
        FROM transactions t
        JOIN users u ON t.user_id = u.id
        JOIN categories c ON t.category_id = c.id
        ORDER BY t.date DESC, t.created_at DESC
      `;

  const result = await query;
  return result as Transaction[];
}

export async function getTransactionsByUser(
  userId: number,
): Promise<Transaction[]> {
  const result = await sql`
    SELECT t.*, c.name as category_name, c.color as category_color, c.icon as category_icon
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${userId}
    ORDER BY t.date DESC, t.created_at DESC
  `;
  return result as Transaction[];
}

export async function createTransaction(
  transaction: Omit<Transaction, "id" | "created_at" | "updated_at">,
): Promise<Transaction> {
  const result = await sql`
    INSERT INTO transactions (user_id, category_id, account_id, type, amount, description, date, is_recurring, recurring_frequency)
    VALUES (${transaction.user_id}, ${transaction.category_id}, ${transaction.account_id}, ${transaction.type}, ${transaction.amount}, ${transaction.description}, ${transaction.date}, ${transaction.is_recurring}, ${transaction.recurring_frequency})
    RETURNING *
  `;
  return result[0] as Transaction;
}

// Dívidas
export async function getDebts(): Promise<Debt[]> {
  const result = await sql`
    SELECT d.*, u.name as user_name
    FROM debts d
    JOIN users u ON d.user_id = u.id
    ORDER BY d.remaining_amount DESC
  `;
  return result as Debt[];
}

export async function createDebt(
  debt: Omit<Debt, "id" | "created_at" | "updated_at">,
): Promise<Debt> {
  const result = await sql`
    INSERT INTO debts (user_id, description, total_amount, remaining_amount, monthly_payment, remaining_months, interest_rate, due_date, is_shared)
    VALUES (${debt.user_id}, ${debt.description}, ${debt.total_amount}, ${debt.remaining_amount}, ${debt.monthly_payment}, ${debt.remaining_months}, ${debt.interest_rate}, ${debt.due_date}, ${debt.is_shared})
    RETURNING *
  `;
  return result[0] as Debt;
}

// Metas
export async function getGoals(): Promise<Goal[]> {
  const result = await sql`
    SELECT *, 
           CASE 
             WHEN target_amount > 0 THEN (current_amount / target_amount * 100)::numeric(5,2)
             ELSE 0 
           END as progress_percentage
    FROM goals 
    ORDER BY target_date ASC NULLS LAST, created_at DESC
  `;
  return result as Goal[];
}

export async function createGoal(
  goal: Omit<Goal, "id" | "created_at" | "updated_at" | "progress_percentage">,
): Promise<Goal> {
  const result = await sql`
    INSERT INTO goals (user_id, title, target_amount, current_amount, target_date, is_shared, status)
    VALUES (${goal.user_id}, ${goal.title}, ${goal.target_amount}, ${goal.current_amount}, ${goal.target_date}, ${goal.is_shared}, ${goal.status})
    RETURNING *
  `;
  return result[0] as Goal;
}

// Cryptos
export async function getCryptoHoldings(): Promise<CryptoHolding[]> {
  const result = await sql`SELECT * FROM crypto_holdings ORDER BY symbol`;
  return result as CryptoHolding[];
}

// Gastos mensais
export async function getMonthlyBills(): Promise<MonthlyBill[]> {
  const result = await sql`
    SELECT mb.*, c.name as category_name, c.color as category_color, u.name as user_name
    FROM monthly_bills mb
    JOIN categories c ON mb.category_id = c.id
    JOIN users u ON mb.user_id = u.id
    WHERE mb.is_active = true
    ORDER BY mb.due_day ASC
  `;
  return result as MonthlyBill[];
}

// Analytics e relatórios
export async function getMonthlyExpensesByCategory(
  month: number,
  year: number,
) {
  const result = await sql`
    SELECT 
      c.name,
      c.color,
      c.icon,
      SUM(t.amount) as total,
      COUNT(t.id) as count
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.type = 'expense' 
      AND EXTRACT(MONTH FROM t.date) = ${month}
      AND EXTRACT(YEAR FROM t.date) = ${year}
    GROUP BY c.id, c.name, c.color, c.icon
    ORDER BY total DESC
  `;
  return result;
}

export async function getMonthlyIncomeVsExpense(months: number = 6) {
  const result = await sql`
    SELECT 
      EXTRACT(YEAR FROM date) as year,
      EXTRACT(MONTH FROM date) as month,
      TO_CHAR(date, 'Mon YYYY') as month_year,
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
    FROM transactions
    WHERE date >= CURRENT_DATE - INTERVAL '${months} months'
    GROUP BY EXTRACT(YEAR FROM date), EXTRACT(MONTH FROM date), TO_CHAR(date, 'Mon YYYY')
    ORDER BY year DESC, month DESC
  `;
  return result;
}

export async function getTotalsByUser() {
  const result = await sql`
    SELECT 
      u.name,
      u.balance,
      SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as total_income,
      SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as total_expenses,
      SUM(CASE WHEN d.is_shared = false THEN d.remaining_amount ELSE d.remaining_amount / 2 END) as total_debt
    FROM users u
    LEFT JOIN transactions t ON u.id = t.user_id
    LEFT JOIN debts d ON u.id = d.user_id
    GROUP BY u.id, u.name, u.balance
    ORDER BY u.name
  `;
  return result;
}

export default sql;
