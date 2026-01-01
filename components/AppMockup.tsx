import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Wallet, 
  ArrowDownLeft, 
  Send, 
  Home, 
  ArrowRightLeft, 
  CreditCard, 
  History, 
  ShoppingBag, 
  TrendingUp, 
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { Transaction, MarketToken } from '../types';
import { getMarketInsights } from '../services/ai';
import { fetchCryptoPrices, CryptoPrice } from '../services/crypto';

const RecentActivityItem: React.FC<{ tx: Transaction }> = ({ tx }) => {
  const getIcon = () => {
    switch (tx.icon) {
      case 'store': return <ShoppingBag className="w-5 h-5 text-purple-600" />;
      case 'download': return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
      case 'upload': return <Send className="w-5 h-5 text-red-600 -rotate-45" />; // Visual trick for 'sell/out'
      case 'send': return <Send className="w-5 h-5 text-blue-600" />;
      default: return <Wallet className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = () => {
    switch (tx.icon) {
      case 'store': return 'bg-purple-100';
      case 'download': return 'bg-green-100';
      case 'upload': return 'bg-red-100';
      case 'send': return 'bg-blue-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <motion.div
      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${getBgColor()} flex items-center justify-center`}>
          {getIcon()}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{tx.title}</h4>
          <p className="text-xs text-gray-500">{tx.date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-sm ${tx.isPositive ? 'text-green-600' : 'text-gray-900'}`}>
          {tx.isPositive ? '+' : ''}{tx.amountCrypto}
        </p>
        <p className="text-xs text-gray-400">{tx.amountFiat}</p>
      </div>
    </motion.div>
  );
};

const MarketCard: React.FC<{ token: MarketToken }> = ({ token }) => (
  <motion.div
    className="min-w-[140px] p-3 rounded-2xl bg-white border border-gray-100 shadow-sm mr-3"
    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center gap-2 mb-2">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${token.symbol === 'USDT' ? 'bg-green-100' : token.symbol === 'BTC' ? 'bg-orange-100' : 'bg-blue-100'}`}>
        {token.symbol === 'USDT' && <span className="text-[10px] font-bold text-green-600">$</span>}
        {token.symbol === 'BTC' && <span className="text-[10px] font-bold text-orange-600">₿</span>}
        {token.symbol === 'ETH' && <span className="text-[10px] font-bold text-blue-600">Ξ</span>}
      </div>
      <span className="font-bold text-gray-800">{token.symbol}</span>
    </div>
    <div className="mt-1">
      <p className="text-xs text-gray-500">Price</p>
      <p className="font-semibold text-gray-900">KES {token.price.toLocaleString()}</p>
    </div>
    <div className={`mt-2 text-xs font-medium flex items-center ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {token.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
      {token.change > 0 ? '+' : ''}{token.change}%
    </div>
  </motion.div>
);

export const AppMockup: React.FC = () => {
  const [insight, setInsight] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [marketData, setMarketData] = useState<MarketToken[]>([
    { symbol: 'USDT', name: 'Tether', price: 133, change: 0.15 },
    { symbol: 'BTC', name: 'Bitcoin', price: 8543000, change: 2.4 },
    { symbol: 'ETH', name: 'Ethereum', price: 340000, change: -1.2 },
  ]);

  // Mock Data
  const transactions: Transaction[] = [
    { id: '1', type: 'payment', title: 'Paid KFC Galitos', subtitle: '', date: '2024-12-03 10:20', amountCrypto: '-12.5 USDT', amountFiat: '1,650 KES', currency: 'USDT', isPositive: false, icon: 'store' },
    { id: '2', type: 'buy', title: 'Bought USDT', subtitle: '', date: '2024-12-02 14:30', amountCrypto: '500 USDT', amountFiat: '69,250 KES', currency: 'USDT', isPositive: true, icon: 'download' },
    { id: '3', type: 'sell', title: 'Sold USDT', subtitle: '', date: '2024-12-01 09:15', amountCrypto: '-250 USDT', amountFiat: '34,375 KES', currency: 'USDT', isPositive: false, icon: 'upload' },
    { id: '4', type: 'send', title: 'Sent to Achieng Wanjiku', subtitle: '(0712...)', date: '2024-12-01 08:45', amountCrypto: '-35 USDT', amountFiat: '4,620 KES', currency: 'USDT', isPositive: false, icon: 'send' },
  ];

  // Fetch crypto prices
  const updatePrices = async () => {
    try {
      const prices = await fetchCryptoPrices();
      setMarketData(prices.map(p => ({
        symbol: p.symbol,
        name: p.name,
        price: p.priceKES,
        change: p.change24h
      })));
    } catch (error) {
      console.error('Failed to update prices:', error);
    }
  };

  useEffect(() => {
    // Fetch prices on mount
    updatePrices();

    // Refresh prices every hour (3600000 ms)
    const priceInterval = setInterval(updatePrices, 3600000);

    // Generate insight on mount
    const fetchInsight = async () => {
      setLoadingInsight(true);
      const text = await getMarketInsights(marketData);
      setInsight(text);
      setLoadingInsight(false);
    };
    fetchInsight();

    return () => {
      clearInterval(priceInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-top">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[750px] w-[360px] shadow-xl overflow-hidden">
      <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-10"></div>
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
      
      {/* App Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#F5F7FA] font-sans flex flex-col relative">
        
        {/* Status Bar Spacer */}
        <div className="h-8 w-full bg-white/0 shrink-0"></div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
          
          {/* Header */}
          <div className="px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                CA
              </div>
              <div>
                <p className="text-xs text-gray-500">Hello,</p>
                <h3 className="text-gray-900 font-bold leading-tight">Carlos Andreas</h3>
              </div>
            </div>
            <button className="p-2 text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>

          {/* Main Balance Card */}
          <div className="px-5 mt-2">
            <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
              {/* Background Decoration */}
              <div className="absolute -right-4 -top-4 opacity-10">
                <Wallet size={120} />
              </div>

              <p className="text-blue-100 text-sm font-medium">Portfolio Value</p>
              <h2 className="text-3xl font-bold mt-1">KES 108,722.25</h2>
              <p className="text-blue-200 text-sm mt-1">≈ 820.55 USDT</p>

              <div className="flex gap-4 mt-8">
                <motion.button
                  className="flex-1 bg-white/20 backdrop-blur-sm transition py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowDownLeft className="w-4 h-4" /> Receive
                </motion.button>
                <motion.button
                  className="flex-1 bg-white/20 backdrop-blur-sm transition py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" /> Send
                </motion.button>
              </div>
            </div>
          </div>

          {/* AI Insight Pill */}
          <div className="px-5 mt-6">
            <motion.div
              className="bg-white rounded-xl p-3 shadow-sm border border-blue-50 flex gap-3 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white shrink-0">
                 <motion.div
                   animate={loadingInsight ? { rotate: 360 } : { rotate: 0 }}
                   transition={{ duration: 2, repeat: loadingInsight ? Infinity : 0, ease: 'linear' }}
                 >
                   <Sparkles className="w-4 h-4" />
                 </motion.div>
               </div>
               <AnimatePresence mode="wait">
                 {loadingInsight ? (
                   <motion.div
                     key="loading"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="flex items-center gap-1"
                   >
                     <motion.span
                       className="text-xs text-gray-600"
                       animate={{ opacity: [0.5, 1, 0.5] }}
                       transition={{ duration: 1.5, repeat: Infinity }}
                     >
                       Analyzing market trends
                     </motion.span>
                     <motion.span
                       className="text-xs text-gray-600"
                       animate={{ opacity: [0, 1, 0] }}
                       transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                     >
                       ...
                     </motion.span>
                   </motion.div>
                 ) : (
                   <motion.p
                     key="insight"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-xs text-gray-600 leading-tight"
                   >
                     {insight}
                   </motion.p>
                 )}
               </AnimatePresence>
            </motion.div>
          </div>

          {/* Market Trends */}
          <div className="px-5 mt-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Market Trends</h3>
            <div className="flex overflow-x-auto no-scrollbar pb-2 -mr-5 pr-5">
              {marketData.map((token) => (
                <MarketCard key={token.symbol} token={token} />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="px-5 mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-800 text-sm">Recent Activity</h3>
              <button className="text-blue-600 text-xs font-semibold">See All</button>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              {transactions.map(tx => <RecentActivityItem key={tx.id} tx={tx} />)}
            </div>
          </div>

        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-4 pb-8 flex justify-between items-center z-20">
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <ArrowRightLeft className="w-6 h-6" />
            <span className="text-[10px] font-medium">Convert</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <CreditCard className="w-6 h-6" />
            <span className="text-[10px] font-medium">Pay</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <Wallet className="w-6 h-6" />
            <span className="text-[10px] font-medium">Wallet</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <History className="w-6 h-6" />
            <span className="text-[10px] font-medium">History</span>
          </button>
        </div>

      </div>
      </div>
    </div>
  );
};
