"use client";

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
  Target,
  Calendar,
  DollarSign,
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  Trophy,
} from "lucide-react";

// Mock data baseado na meta real fornecida
const mockGoals = [
  {
    id: 1,
    title: "Guardar R$ 50.000 em 12 meses",
    description: "Meta de poupança para emergências e investimentos",
    targetAmount: 50000.0,
    currentAmount: 2500.0,
    targetDate: "2024-12-31",
    startDate: "2024-01-01",
    isShared: true,
    category: "Poupança",
    status: "active" as const,
    priority: "high" as const,
    user: "Ambos",
    monthlyTarget: 4166.67,
    progressHistory: [
      { month: "Janeiro", target: 4166.67, achieved: 2500.0, percentage: 60 },
      { month: "Fevereiro", target: 4166.67, achieved: 0, percentage: 0 },
      { month: "Março", target: 4166.67, achieved: 0, percentage: 0 },
    ],
  },
  {
    id: 2,
    title: "Quitar Empréstimos",
    description: "Eliminar todas as dívidas pessoais",
    targetAmount: 18511.76,
    currentAmount: 5000.0,
    targetDate: "2024-07-31",
    startDate: "2024-01-01",
    isShared: false,
    category: "Dívidas",
    status: "active" as const,
    priority: "high" as const,
    user: "Ambos",
    monthlyTarget: 2644.54,
    progressHistory: [
      { month: "Janeiro", target: 2644.54, achieved: 5000.0, percentage: 189 },
    ],
  },
  {
    id: 3,
    title: "Fundo de Emergência",
    description: "6 meses de gastos em reserva",
    targetAmount: 25000.0,
    currentAmount: 1200.0,
    targetDate: "2024-06-30",
    startDate: "2024-01-01",
    isShared: true,
    category: "Emergência",
    status: "active" as const,
    priority: "medium" as const,
    user: "Ambos",
    monthlyTarget: 4000.0,
    progressHistory: [
      { month: "Janeiro", target: 4000.0, achieved: 1200.0, percentage: 30 },
    ],
  },
  {
    id: 4,
    title: "Viagem de Férias",
    description: "Europa - 15 dias",
    targetAmount: 15000.0,
    currentAmount: 800.0,
    targetDate: "2024-07-01",
    startDate: "2024-01-01",
    isShared: true,
    category: "Lazer",
    status: "active" as const,
    priority: "low" as const,
    user: "Ambos",
    monthlyTarget: 2142.86,
    progressHistory: [
      { month: "Janeiro", target: 2142.86, achieved: 800.0, percentage: 37 },
    ],
  },
];

const categories = [
  "Poupança",
  "Dívidas",
  "Emergência",
  "Lazer",
  "Educação",
  "Saúde",
  "Casa",
];
const users = ["Enzo", "Letícia", "Ambos"];

export default function GoalsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetAmount: "",
    targetDate: "",
    category: "",
    priority: "medium" as "low" | "medium" | "high",
    user: "",
    isShared: false,
  });

  const filteredGoals = mockGoals.filter((goal) => {
    const matchesCategory =
      selectedCategory === "all" || goal.category === selectedCategory;
    const matchesPriority =
      selectedPriority === "all" || goal.priority === selectedPriority;
    const matchesStatus =
      selectedStatus === "all" || goal.status === selectedStatus;
    return matchesCategory && matchesPriority && matchesStatus;
  });

  const totalTargetAmount = filteredGoals.reduce(
    (sum, goal) => sum + goal.targetAmount,
    0,
  );
  const totalCurrentAmount = filteredGoals.reduce(
    (sum, goal) => sum + goal.currentAmount,
    0,
  );
  const overallProgress =
    totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  const handleAddGoal = () => {
    console.log("Nova meta:", newGoal);
    setIsAddDialogOpen(false);
    setNewGoal({
      title: "",
      description: "",
      targetAmount: "",
      targetDate: "",
      category: "",
      priority: "medium",
      user: "",
      isShared: false,
    });
  };

  const getProgressPercentage = (current: number, target: number) => {
    return target > 0 ? (current / target) * 100 : 0;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return AlertCircle;
      case "medium":
        return Clock;
      default:
        return Target;
    }
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Metas Financeiras
            </h1>
            <p className="text-gray-600">Planeje e acompanhe seus objetivos</p>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nova Meta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Criar Nova Meta</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título da Meta</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, title: e.target.value })
                  }
                  placeholder="Ex: Guardar para viagem, Casa própria..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={newGoal.description}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, description: e.target.value })
                  }
                  placeholder="Descreva sua meta em detalhes"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Valor Alvo (R$)</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    step="0.01"
                    value={newGoal.targetAmount}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, targetAmount: e.target.value })
                    }
                    placeholder="50000,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetDate">Data Limite</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, targetDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newGoal.category}
                    onValueChange={(value) =>
                      setNewGoal({ ...newGoal, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select
                    value={newGoal.priority}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setNewGoal({ ...newGoal, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user">Responsável</Label>
                <Select
                  value={newGoal.user}
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, user: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user} value={user}>
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isShared"
                  checked={newGoal.isShared}
                  onChange={(e) =>
                    setNewGoal({ ...newGoal, isShared: e.target.checked })
                  }
                  className="rounded border-gray-300"
                  aria-describedby="shared-goal-description"
                  title="Meta compartilhada do casal"
                  aria-label="Meta compartilhada do casal"
                />
                <Label
                  htmlFor="isShared"
                  className="text-sm font-normal"
                  id="shared-goal-description"
                >
                  Meta compartilhada do casal
                </Label>
              </div>

              <Button
                onClick={handleAddGoal}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={
                  !newGoal.title || !newGoal.targetAmount || !newGoal.targetDate
                }
              >
                Criar Meta
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Progresso Geral
            </CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {overallProgress.toFixed(1)}%
            </div>
            <Progress value={overallProgress} className="mt-2 h-2" />
            <p className="text-xs text-gray-600 mt-1">
              {filteredGoals.length} metas ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Atual</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R${" "}
              {totalCurrentAmount.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-gray-600">
              De R${" "}
              {totalTargetAmount.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Metas Concluídas
            </CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">0</div>
            <p className="text-xs text-gray-600">
              Nenhuma meta concluída ainda
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faltam</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              R${" "}
              {(totalTargetAmount - totalCurrentAmount).toLocaleString(
                "pt-BR",
                { minimumFractionDigits: 2 },
              )}
            </div>
            <p className="text-xs text-gray-600">
              Para completar todas as metas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Select
                value={selectedPriority}
                onValueChange={setSelectedPriority}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
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
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="paused">Pausado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Metas */}
      <div className="grid gap-4">
        {filteredGoals.map((goal) => {
          const progressPercentage = getProgressPercentage(
            goal.currentAmount,
            goal.targetAmount,
          );
          const priorityColor = getPriorityColor(goal.priority);
          const PriorityIcon = getPriorityIcon(goal.priority);
          const daysRemaining = getDaysRemaining(goal.targetDate);
          const remainingAmount = goal.targetAmount - goal.currentAmount;

          return (
            <Card
              key={goal.id}
              className={`border-l-4 ${
                goal.priority === "high"
                  ? "border-l-red-500"
                  : goal.priority === "medium"
                    ? "border-l-orange-500"
                    : "border-l-blue-500"
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${priorityColor}`}>
                      <PriorityIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {goal.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Users className="h-3 w-3" />
                          {goal.user}
                        </Badge>
                        <Badge variant="secondary">{goal.category}</Badge>
                        {goal.isShared && (
                          <Badge
                            variant="default"
                            className="bg-blue-100 text-blue-800"
                          >
                            Compartilhada
                          </Badge>
                        )}
                        <Badge
                          variant={
                            goal.priority === "high"
                              ? "destructive"
                              : goal.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {goal.priority === "high"
                            ? "Alta"
                            : goal.priority === "medium"
                              ? "Média"
                              : "Baixa"}{" "}
                          prioridade
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Valor Alvo</div>
                    <div className="text-lg font-semibold">
                      R${" "}
                      {goal.targetAmount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Valor Atual</div>
                    <div className="text-lg font-semibold text-green-600">
                      R${" "}
                      {goal.currentAmount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Faltam</div>
                    <div className="text-lg font-semibold text-orange-600">
                      R${" "}
                      {remainingAmount.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Meta Mensal</div>
                    <div className="text-lg font-semibold text-blue-600">
                      R${" "}
                      {goal.monthlyTarget.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{progressPercentage.toFixed(1)}% concluído</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Prazo:{" "}
                      {new Date(goal.targetDate).toLocaleDateString("pt-BR")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {daysRemaining > 0
                        ? `${daysRemaining} dias restantes`
                        : "Prazo vencido"}
                    </div>
                  </div>
                  {progressPercentage >= 100 && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Meta Concluída!
                    </div>
                  )}
                  {daysRemaining <= 30 && daysRemaining > 0 && (
                    <div className="flex items-center gap-1 text-orange-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      Prazo próximo
                    </div>
                  )}
                  {daysRemaining <= 0 && (
                    <div className="flex items-center gap-1 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      Prazo vencido
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredGoals.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="h-16 w-16 mx-auto mb-4 text-blue-600 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">
              Nenhuma meta encontrada
            </h3>
            <p className="text-gray-600 mb-4">
              Crie sua primeira meta financeira para começar
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Criar Meta
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
