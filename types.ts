export interface Transaction {
  id: string;
  type: 'payment' | 'buy' | 'sell' | 'send';
  title: string;
  subtitle: string;
  date: string;
  amountCrypto: string;
  amountFiat: string;
  currency: string;
  isPositive: boolean;
  icon: 'store' | 'download' | 'upload' | 'send';
}

export interface MarketToken {
  symbol: string;
  price: number;
  change: number;
  name: string;
}

export interface UserProfile {
  name: string;
  balanceKes: number;
  balanceUsdt: number;
}
