// Crypto price fetching service using CoinGecko API
// Free tier: No API key needed, but rate limited to ~10-50 calls/minute

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const KES_TO_USD_RATE = 129; // Approximate rate, could also be fetched from API

export interface CryptoPrice {
  symbol: string;
  name: string;
  priceUSD: number;
  priceKES: number;
  change24h: number;
}

export const fetchCryptoPrices = async (): Promise<CryptoPrice[]> => {
  try {
    // Fetch prices for USDT, BTC, and ETH
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=tether,bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch crypto prices');
    }

    const data = await response.json();

    return [
      {
        symbol: 'USDT',
        name: 'Tether',
        priceUSD: data.tether?.usd || 1,
        priceKES: Math.round((data.tether?.usd || 1) * KES_TO_USD_RATE),
        change24h: parseFloat((data.tether?.usd_24h_change || 0).toFixed(2))
      },
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        priceUSD: data.bitcoin?.usd || 0,
        priceKES: Math.round((data.bitcoin?.usd || 0) * KES_TO_USD_RATE),
        change24h: parseFloat((data.bitcoin?.usd_24h_change || 0).toFixed(2))
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        priceUSD: data.ethereum?.usd || 0,
        priceKES: Math.round((data.ethereum?.usd || 0) * KES_TO_USD_RATE),
        change24h: parseFloat((data.ethereum?.usd_24h_change || 0).toFixed(2))
      }
    ];
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // Return fallback prices
    return [
      {
        symbol: 'USDT',
        name: 'Tether',
        priceUSD: 1,
        priceKES: 133,
        change24h: 0.15
      },
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        priceUSD: 66000,
        priceKES: 8543000,
        change24h: 2.4
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        priceUSD: 2635,
        priceKES: 340000,
        change24h: -1.2
      }
    ];
  }
};
