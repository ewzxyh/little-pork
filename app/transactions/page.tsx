"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusCircle,
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Receipt,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";

// Mock data
const mockTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    description: "Supermercado Extra",
    category: "Alimentação",
    categoryColor: "#EF4444",
    user: "Enzo",
    type: "expense" as const,
    amount: 125.50,
    account: "Conta Corrente",
  },
  {
    id: 2,
    date: "2024-01-15",
    description: "Salário Janeiro",
    category: "Salário",
    categoryColor: "#10B981",
    user: "Letícia",
    type: "income" as const,
    amount: 2500.00,
    account: "Conta Corrente",
  },
  {
    id: 3,
    date: "2024-01-14",
    description: "ChatGPT Subscription",
    category: "Assinaturas",
    categoryColor: "#9A3412",
    user: "Enzo",
    type: "expense" as const,
    amount: 18.50,
    account: "Cartão de Crédito",
  },
  {
    id: 4,
    date: "2024-01-14",
    description: "Spotify Premium",
    category: "Assinaturas",
    categoryColor: "#9A3412",
    user: "Ambos",
    type: "expense" as const,
    amount: 27.90,
    account: "Conta Corrente",
  },
  {
    id: 5,
    date: "2024-01-13",
    description: "Gasolina Posto Shell",
    category: "Transporte",
    categoryColor: "#B91C1C",
    user: "Enzo",
    type: "expense" as const,
    amount: 85.00,
    account: "Conta Corrente",
  },
  {
    id: 6,
    date: "2024-01-12",
    description: "Freelance Design",
    category: "Freelance",
    categoryColor: "#059669",
    user: "Letícia",
    type: "income" as const,
    amount: 350.00,
    account: "Conta Corrente",
  },
];

const mockCategories = [
  { id: 1, name: "Alimentação", type: "expense", color: "#EF4444" },
  { id: 2, name: "Transporte", type: "expense", color: "#B91C1C" },
  { id: 3, name: "Assinaturas", type: "expense", color: "#9A3412" },
  { id: 4, name: "Salário", type: "income", color: "#10B981" },
  { id: 5, name: "Freelance", type: "income", color: "#059669" },
];

const mockUsers = ["Enzo", "Letícia", "Ambos"];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUser, setSelectedUser] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
    user: "",
    type: "expense" as "income" | "expense",
    account: "Conta Corrente",
    date: new Date().toISOString().split('T')[0],
  });

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory;
    const matchesUser = selectedUser === "all" || transaction.user === selectedUser;
    const matchesType = selectedType === "all" || transaction.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesUser && matchesType;
  });

  const totalIncome = filteredTransactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const handleAddTransaction = () => {
    // Aqui seria feita a integração com a API
    console.log("Nova transação:", newTransaction);
    setIsAddDialogOpen(false);
    setNewTransaction({
      description: "",
      amount: "",
      category: "",
      user: "",
      type: "expense",
      account: "Conta Corrente",
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transações</h1>
            <p className="text-gray-600">Gerencie suas receitas e despesas</p>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Transação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select 
                    value={newTransaction.type} 
                    onValueChange={(value: "income" | "expense") => 
                      setNewTransaction({...newTransaction, type: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user">Usuário</Label>
                  <Select 
                    value={newTransaction.user} 
                    onValueChange={(value) => setNewTransaction({...newTransaction, user: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockUsers.map((user) => (
                        <SelectItem key={user} value={user}>
                          {user}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  placeholder="Ex: Supermercado, Salário..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor (R$)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={newTransaction.category} 
                  onValueChange={(value) => setNewTransaction({...newTransaction, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories
                      .filter(cat => cat.type === newTransaction.type)
                      .map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleAddTransaction} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!newTransaction.description || !newTransaction.amount || !newTransaction.category}
              >
                Adicionar Transação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-600">
              {filteredTransactions.filter(t => t.type === "income").length} transações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-600">
              {filteredTransactions.filter(t => t.type === "expense").length} transações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <Receipt className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              totalIncome - totalExpenses >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}>
              R$ {(totalIncome - totalExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-600">
              {filteredTransactions.length} transações totais
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar transações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="income">Receitas</SelectItem>
                  <SelectItem value="expense">Despesas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Usuário</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {mockUsers.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Transações */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Histórico de Transações
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: transaction.categoryColor }}
                      />
                      {transaction.category}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.user}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {transaction.account}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "income" ? "+" : "-"}R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Nenhuma transação encontrada</p>
              <p className="text-sm">Ajuste os filtros ou adicione uma nova transação</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
