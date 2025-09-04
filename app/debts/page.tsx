"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  AlertTriangle,
  CreditCard,
  DollarSign,
  PlusCircle,
  TrendingDown,
  Calendar,
  Users,
  Edit,
  Trash2,
  CheckCircle2,
} from "lucide-react";

// Mock data baseado nos dados reais fornecidos
const mockDebts = [
  {
    id: 1,
    description: "Empréstimo Letícia",
    totalAmount: 12017.88,
    remainingAmount: 12017.88,
    monthlyPayment: 2002.98,
    remainingMonths: 6,
    interestRate: 2.5,
    dueDate: "2024-07-15",
    isShared: false,
    user: "Letícia",
    status: "active" as const,
    paymentHistory: [
      { month: "Janeiro", paid: false, amount: 2002.98 },
      { month: "Fevereiro", paid: false, amount: 2002.98 },
      { month: "Março", paid: false, amount: 2002.98 },
      { month: "Abril", paid: false, amount: 2002.98 },
      { month: "Maio", paid: false, amount: 2002.98 },
      { month: "Junho", paid: false, amount: 2002.98 },
    ]
  },
  {
    id: 2,
    description: "Empréstimo Enzo",
    totalAmount: 4340.50,
    remainingAmount: 4340.50,
    monthlyPayment: 723.42,
    remainingMonths: 6,
    interestRate: 2.0,
    dueDate: "2024-07-15",
    isShared: false,
    user: "Enzo",
    status: "active" as const,
    paymentHistory: [
      { month: "Janeiro", paid: false, amount: 723.42 },
      { month: "Fevereiro", paid: false, amount: 723.42 },
      { month: "Março", paid: false, amount: 723.42 },
      { month: "Abril", paid: false, amount: 723.42 },
      { month: "Maio", paid: false, amount: 723.42 },
      { month: "Junho", paid: false, amount: 723.42 },
    ]
  },
  {
    id: 3,
    description: "Fotos da Faculdade (2/5)",
    totalAmount: 1270.00,
    remainingAmount: 1016.00,
    monthlyPayment: 254.00,
    remainingMonths: 4,
    interestRate: 0,
    dueDate: "2024-05-15",
    isShared: false,
    user: "Enzo",
    status: "active" as const,
    paymentHistory: [
      { month: "Janeiro", paid: true, amount: 254.00 },
      { month: "Fevereiro", paid: false, amount: 254.00 },
      { month: "Março", paid: false, amount: 254.00 },
      { month: "Abril", paid: false, amount: 254.00 },
      { month: "Maio", paid: false, amount: 254.00 },
    ]
  },
  {
    id: 4,
    description: "Pillow Top (4/12)",
    totalAmount: 1708.08,
    remainingAmount: 1137.38,
    monthlyPayment: 142.34,
    remainingMonths: 8,
    interestRate: 0,
    dueDate: "2024-09-15",
    isShared: true,
    user: "Ambos",
    status: "active" as const,
    paymentHistory: [
      { month: "Janeiro", paid: true, amount: 142.34 },
      { month: "Fevereiro", paid: true, amount: 142.34 },
      { month: "Março", paid: true, amount: 142.34 },
      { month: "Abril", paid: true, amount: 142.34 },
      { month: "Maio", paid: false, amount: 142.34 },
    ]
  },
];

const mockUsers = ["Enzo", "Letícia", "Ambos"];

export default function DebtsPage() {
  const [selectedUser, setSelectedUser] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDebt, setNewDebt] = useState({
    description: "",
    totalAmount: "",
    monthlyPayment: "",
    remainingMonths: "",
    interestRate: "",
    dueDate: "",
    user: "",
    isShared: false,
  });

  const filteredDebts = mockDebts.filter((debt) => {
    const matchesUser = selectedUser === "all" || debt.user === selectedUser;
    const matchesStatus = selectedStatus === "all" || debt.status === selectedStatus;
    return matchesUser && matchesStatus;
  });

  const totalDebt = filteredDebts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
  const totalMonthlyPayments = filteredDebts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
  const avgInterestRate = filteredDebts.reduce((sum, debt) => sum + debt.interestRate, 0) / filteredDebts.length;

  const handleAddDebt = () => {
    console.log("Nova dívida:", newDebt);
    setIsAddDialogOpen(false);
    setNewDebt({
      description: "",
      totalAmount: "",
      monthlyPayment: "",
      remainingMonths: "",
      interestRate: "",
      dueDate: "",
      user: "",
      isShared: false,
    });
  };

  const getProgressPercentage = (total: number, remaining: number) => {
    return ((total - remaining) / total) * 100;
  };

  const getUrgencyLevel = (remainingMonths: number) => {
    if (remainingMonths <= 3) return "high";
    if (remainingMonths <= 6) return "medium";
    return "low";
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-orange-600 bg-orange-50 border-orange-200";
      default: return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dívidas & Empréstimos</h1>
            <p className="text-gray-600">Gerencie suas obrigações financeiras</p>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Dívida
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Dívida</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newDebt.description}
                  onChange={(e) => setNewDebt({...newDebt, description: e.target.value})}
                  placeholder="Ex: Empréstimo Banco X, Financiamento..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Valor Total (R$)</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    step="0.01"
                    value={newDebt.totalAmount}
                    onChange={(e) => setNewDebt({...newDebt, totalAmount: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyPayment">Parcela Mensal (R$)</Label>
                  <Input
                    id="monthlyPayment"
                    type="number"
                    step="0.01"
                    value={newDebt.monthlyPayment}
                    onChange={(e) => setNewDebt({...newDebt, monthlyPayment: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="remainingMonths">Parcelas Restantes</Label>
                  <Input
                    id="remainingMonths"
                    type="number"
                    value={newDebt.remainingMonths}
                    onChange={(e) => setNewDebt({...newDebt, remainingMonths: e.target.value})}
                    placeholder="12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Taxa de Juros (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={newDebt.interestRate}
                    onChange={(e) => setNewDebt({...newDebt, interestRate: e.target.value})}
                    placeholder="2,5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user">Responsável</Label>
                  <Select 
                    value={newDebt.user} 
                    onValueChange={(value) => setNewDebt({...newDebt, user: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
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
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Data de Vencimento</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newDebt.dueDate}
                    onChange={(e) => setNewDebt({...newDebt, dueDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isShared"
                  checked={newDebt.isShared}
                  onChange={(e) => setNewDebt({...newDebt, isShared: e.target.checked})}
                  className="rounded border-gray-300"
                  aria-describedby="shared-description"
                />
                <Label htmlFor="isShared" className="text-sm font-normal" id="shared-description">
                  Dívida compartilhada (dividir valor)
                </Label>
              </div>

              <Button 
                onClick={handleAddDebt} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!newDebt.description || !newDebt.totalAmount || !newDebt.monthlyPayment}
              >
                Adicionar Dívida
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total em Dívidas</CardTitle>
            <CreditCard className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalDebt.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-600">
              {filteredDebts.length} dívidas ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamento Mensal</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              R$ {totalMonthlyPayments.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-gray-600">
              Comprometimento mensal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Média</CardTitle>
            <TrendingDown className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {avgInterestRate.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-600">
              Taxa de juros média
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Término Médio</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(filteredDebts.reduce((sum, debt) => sum + debt.remainingMonths, 0) / filteredDebts.length)} meses
            </div>
            <p className="text-xs text-gray-600">
              Tempo médio restante
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Responsável</Label>
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

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="completed">Quitado</SelectItem>
                  <SelectItem value="paused">Pausado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Dívidas */}
      <div className="grid gap-4">
        {filteredDebts.map((debt) => {
          const progressPercentage = getProgressPercentage(debt.totalAmount, debt.remainingAmount);
          const urgencyLevel = getUrgencyLevel(debt.remainingMonths);
          const urgencyColor = getUrgencyColor(urgencyLevel);

          return (
            <Card key={debt.id} className={`border-l-4 ${
              urgencyLevel === "high" ? "border-l-red-500" :
              urgencyLevel === "medium" ? "border-l-orange-500" : "border-l-blue-500"
            }`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${urgencyColor}`}>
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{debt.description}</CardTitle>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {debt.user}
                        </Badge>
                        {debt.isShared && (
                          <Badge variant="secondary">Compartilhada</Badge>
                        )}
                        <Badge variant={urgencyLevel === "high" ? "destructive" : urgencyLevel === "medium" ? "default" : "secondary"}>
                          {debt.remainingMonths} meses restantes
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Valor Total</div>
                    <div className="text-lg font-semibold">
                      R$ {debt.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Valor Restante</div>
                    <div className="text-lg font-semibold text-red-600">
                      R$ {debt.remainingAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Parcela Mensal</div>
                    <div className="text-lg font-semibold text-orange-600">
                      R$ {debt.monthlyPayment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Taxa de Juros</div>
                    <div className="text-lg font-semibold">
                      {debt.interestRate.toFixed(1)}% a.m.
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso de Pagamento</span>
                    <span>{progressPercentage.toFixed(1)}% concluído</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Vencimento: {new Date(debt.dueDate).toLocaleDateString('pt-BR')}
                  </div>
                  {urgencyLevel === "high" && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      Urgente
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDebts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-600 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Parabéns!</h3>
            <p className="text-gray-600 mb-4">Você não possui dívidas ativas no momento</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Dívida
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
