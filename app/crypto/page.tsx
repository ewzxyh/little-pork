"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Bitcoin,
  TrendingUp,
  TrendingDown,
  DollarSign,
  RefreshCw,
  Wallet,
  BarChart3,
  Globe,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react";

// Mock data baseado nos dados reais fornecidos
const mockCryptoHoldings = [
  {
    id: 1,
    symbol: "BTC",
    name: "Bitcoin",
    amount: 0.02680471, // 0.02568 + 0.00112471
    purchasePrice: 180000, // Preço médio de compra estimado
    currentPrice: 225000, // Preço atual em BRL
    currentPriceUSD: 45000, // Preço atual em USD
    change24h: 2.5,
    change7d: -1.2,
    icon: Bitcoin,
    color: "#F7931A",
  },
  {
    id: 2,
    symbol: "DOG",
    name: "DOG TO THE MOON (BITCOIN)",
    amount: 520333.22,
    purchasePrice: 0.00008, // Preço médio de compra estimado
    currentPrice: 0.00005, // Preço atual em BRL
    currentPriceUSD: 0.00001, // Preço atual em USD
    change24h: -1.2,
    change7d: 15.8,
    icon: DollarSign,
    color: "#FFD700",
  },
];

// Dados históricos mockados para os gráficos
const mockPriceHistory = {
  BTC: [
    { time: "00:00", price: 220000, priceUSD: 44000 },
    { time: "04:00", price: 218000, priceUSD: 43600 },
    { time: "08:00", price: 223000, priceUSD: 44600 },
    { time: "12:00", price: 227000, priceUSD: 45400 },
    { time: "16:00", price: 225000, priceUSD: 45000 },
    { time: "20:00", price: 225000, priceUSD: 45000 },
  ],
  DOG: [
    { time: "00:00", price: 0.000052, priceUSD: 0.0000104 },
    { time: "04:00", price: 0.000048, priceUSD: 0.0000096 },
    { time: "08:00", price: 0.000051, priceUSD: 0.0000102 },
    { time: "12:00", price: 0.000049, priceUSD: 0.0000098 },
    { time: "16:00", price: 0.000050, priceUSD: 0.0000100 },
    { time: "20:00", price: 0.000050, priceUSD: 0.0000100 },
  ],
};

const chartConfig = {
  price: {
    label: "Preço",
    color: "#3B82F6",
  },
  priceUSD: {
    label: "Preço USD",
    color: "#10B981",
  },
} satisfies ChartConfig;

export default function CryptoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  const [showValues, setShowValues] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => setIsLoading(false), 1500);
    
    // Simular atualizações de preço a cada 30 segundos
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Aqui seria feita a chamada real para API de crypto
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Calcular valores do portfolio
  const portfolioValue = mockCryptoHoldings.reduce((total, crypto) => {
    return total + (crypto.amount * crypto.currentPrice);
  }, 0);

  const portfolioValueUSD = mockCryptoHoldings.reduce((total, crypto) => {
    return total + (crypto.amount * crypto.currentPriceUSD);
  }, 0);

  const totalProfitLoss = mockCryptoHoldings.reduce((total, crypto) => {
    const currentValue = crypto.amount * crypto.currentPrice;
    const purchaseValue = crypto.amount * crypto.purchasePrice;
    return total + (currentValue - purchaseValue);
  }, 0);

  const profitLossPercentage = mockCryptoHoldings.reduce((total, crypto) => {
    const purchaseValue = crypto.amount * crypto.purchasePrice;
    const currentValue = crypto.amount * crypto.currentPrice;
    return purchaseValue > 0 ? ((currentValue - purchaseValue) / purchaseValue) * 100 : 0;
  }, 0) / mockCryptoHoldings.length;

  const handleRefreshPrices = () => {
    setIsLoading(true);
    setLastUpdate(new Date());
    // Simular atualização
    setTimeout(() => setIsLoading(false), 1000);
  };

  const formatCryptoAmount = (amount: number, symbol: string) => {
    if (symbol === "BTC") {
      return amount.toFixed(8);
    }
    return amount.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const formatPrice = (price: number, currency: string = "BRL") => {
    if (currency === "USD") {
      return `$${price.toLocaleString('en-US', { 
        minimumFractionDigits: price < 1 ? 8 : 2,
        maximumFractionDigits: price < 1 ? 8 : 2 
      })}`;
    }
    return `R$ ${price.toLocaleString('pt-BR', { 
      minimumFractionDigits: price < 1 ? 8 : 2,
      maximumFractionDigits: price < 1 ? 8 : 2
    })}`;
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center gap-4 mb-6">
          <SidebarTrigger />
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Crypto</h1>
            <p className="text-gray-600">Acompanhe seus investimentos em criptomoedas</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowValues(!showValues)}
          >
            {showValues ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {showValues ? "Ocultar" : "Mostrar"} Valores
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefreshPrices}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total (BRL)</CardTitle>
            <Wallet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {showValues ? `R$ ${portfolioValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "••••••"}
            </div>
            <p className="text-xs text-gray-600">
              Portfolio total em Reais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total (USD)</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {showValues ? `$${portfolioValueUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : "••••••"}
            </div>
            <p className="text-xs text-gray-600">
              Portfolio total em Dólares
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro/Prejuízo</CardTitle>
            {totalProfitLoss >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {showValues ? (
                `${totalProfitLoss >= 0 ? '+' : ''}R$ ${Math.abs(totalProfitLoss).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              ) : "••••••"}
            </div>
            <p className={`text-xs ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {showValues ? `${totalProfitLoss >= 0 ? '+' : ''}${profitLossPercentage.toFixed(2)}%` : "••••"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Atualização</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {lastUpdate.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            <p className="text-xs text-gray-600">
              {lastUpdate.toLocaleDateString('pt-BR')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Gráfico de Preços */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Gráfico de Preços - {selectedCrypto}
              </CardTitle>
              <div className="flex gap-2">
                {mockCryptoHoldings.map((crypto) => (
                  <Button
                    key={crypto.symbol}
                    variant={selectedCrypto === crypto.symbol ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCrypto(crypto.symbol)}
                  >
                    {crypto.symbol}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockPriceHistory[selectedCrypto as keyof typeof mockPriceHistory]}>
                  <XAxis 
                    dataKey="time" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Lista de Holdings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              Suas Holdings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCryptoHoldings.map((crypto) => {
              const currentValue = crypto.amount * crypto.currentPrice;
              const purchaseValue = crypto.amount * crypto.purchasePrice;
              const profitLoss = currentValue - purchaseValue;
              const profitLossPercentage = purchaseValue > 0 ? (profitLoss / purchaseValue) * 100 : 0;
              const IconComponent = crypto.icon;

              return (
                <div key={crypto.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="crypto-icon-bg"
                        style={{'--crypto-color': crypto.color} as React.CSSProperties}
                      >
                        <IconComponent 
                          className="h-5 w-5 crypto-icon" 
                          style={{'--crypto-color': crypto.color} as React.CSSProperties}
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{crypto.name}</div>
                        <div className="text-sm text-gray-600">{crypto.symbol}</div>
                      </div>
                    </div>
                    <Badge 
                      variant={crypto.change24h >= 0 ? "default" : "destructive"}
                      className={crypto.change24h >= 0 ? "bg-green-50 text-green-700 hover:bg-green-100" : ""}
                    >
                      {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quantidade:</span>
                      <span className="font-medium">
                        {formatCryptoAmount(crypto.amount, crypto.symbol)} {crypto.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Preço Atual:</span>
                      <span className="font-medium">
                        {showValues ? formatPrice(crypto.currentPrice) : "••••••"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Valor Total:</span>
                      <span className="font-medium text-blue-600">
                        {showValues ? formatPrice(currentValue) : "••••••"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Lucro/Prejuízo:</span>
                      <span className={`font-medium ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {showValues ? (
                          <>
                            {profitLoss >= 0 ? '+' : ''}R$ {Math.abs(profitLoss).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            <br />
                            <span className="text-xs">
                              ({profitLoss >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%)
                            </span>
                          </>
                        ) : "••••••"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Market Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Visão Geral do Mercado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {mockCryptoHoldings.map((crypto) => (
              <div key={crypto.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="crypto-icon-bg-sm"
                    style={{'--crypto-color': crypto.color} as React.CSSProperties}
                  >
                    <crypto.icon 
                      className="h-4 w-4 crypto-icon" 
                      style={{'--crypto-color': crypto.color} as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <div className="font-medium">{crypto.symbol}</div>
                    <div className="text-sm text-gray-600">{crypto.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {showValues ? formatPrice(crypto.currentPrice) : "••••••"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {showValues ? formatPrice(crypto.currentPriceUSD, "USD") : "••••••"}
                  </div>
                  <div className={`text-xs ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}% 24h
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
