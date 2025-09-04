// Funções utilitárias para crypto
export interface CryptoPriceData {
  symbol: string;
  price_usd: number;
  price_brl: number;
  change_24h: number;
  last_updated: string;
}

// Função para buscar preço do Bitcoin
export async function getBitcoinPrice(): Promise<CryptoPriceData> {
  try {
    // Usar CoinGecko API (gratuita)
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,brl&include_24hr_change=true",
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 60 }, // Cache por 1 minuto
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      symbol: "BTC",
      price_usd: data.bitcoin.usd,
      price_brl: data.bitcoin.brl,
      change_24h: data.bitcoin.usd_24h_change || 0,
      last_updated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    // Retornar dados mock em caso de erro
    return {
      symbol: "BTC",
      price_usd: 45000,
      price_brl: 225000,
      change_24h: 0,
      last_updated: new Date().toISOString(),
    };
  }
}

// Função para buscar preço do DOG TO THE MOON (usando CoinGecko)
export async function getDogPrice(): Promise<CryptoPriceData> {
  try {
    // Nota: DOG TO THE MOON pode não estar disponível em todas as APIs
    // Você pode precisar ajustar o ID baseado na API que encontrar
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=dog-to-the-moon&vs_currencies=usd,brl&include_24hr_change=true",
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 300 }, // Cache por 5 minutos
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      symbol: "DOG",
      price_usd: data["dog-to-the-moon"]?.usd || 0,
      price_brl: data["dog-to-the-moon"]?.brl || 0,
      change_24h: data["dog-to-the-moon"]?.usd_24h_change || 0,
      last_updated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error fetching DOG price:", error);
    // Retornar dados mock em caso de erro
    return {
      symbol: "DOG",
      price_usd: 0.00001,
      price_brl: 0.00005,
      change_24h: 0,
      last_updated: new Date().toISOString(),
    };
  }
}

// Função para calcular valor total de holdings
export function calculateCryptoValue(amount: number, price: number): number {
  return amount * price;
}

// Função para formatar preços de crypto
export function formatCryptoPrice(
  price: number,
  currency: "USD" | "BRL" = "BRL",
): string {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: currency === "USD" ? 2 : 2,
  });

  return formatter.format(price);
}

// Função para formatar quantidade de crypto
export function formatCryptoAmount(amount: number, symbol: string): string {
  if (symbol === "BTC") {
    return `${amount.toLocaleString("pt-BR", {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8,
    })} BTC`;
  }

  return `${amount.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${symbol}`;
}

// Função para obter cor baseada na variação
export function getChangeColor(change: number): string {
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-gray-600";
}

// Função para formatar percentual de mudança
export function formatPercentChange(change: number): string {
  const sign = change > 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}
