/* eslint-disable no-unused-vars */
// pages/Dashboard/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IncomeCard } from '../../components/cards/IncomeCard';
import { OutcomeCard } from '../../components/cards/OutcomeCard';
import { SummaryCard } from '../../components/cards/SummaryCard';
import { useOutletContext } from 'react-router-dom';
import { WeeklyAnalysisChart } from '../../components/charts/WeeklyAnalysisChart';
import { RecentTransactionsCard } from '../../components/cards/RecentTransactionsCard';
import { accountsService } from '@/services/api/account';
import { transactionService } from '@/services/api/transaction';

// Animation de fade-in et slide-up
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: 'easeOut' }
};

export const DashboardPage = () => {
  const { theme, isDark } = useOutletContext();
  const [accountData, setAccountData] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [analysisData, setAnalysisData] = useState([]);
  const [loading, setLoading] = useState(true);
  // Données temporaires - à remplacer par vos appels API
  useEffect(() => {
    accountsService.getAccountDetails(1)
      .then(setAccountData)
      .catch(() => setAccountData(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    transactionService.getAccountTransaction(1, { maxDate: 5 })
      .then(setRecentTransactions)
      .catch(() => setRecentTransactions([]));
  }, []);

  useEffect(() => {
    accountsService.getAccountAnalysis(1, { maxDate: 7 })
      .then(setAnalysisData)
      .catch(() => setAnalysisData([]));
  }, []);

  const todayData = {
    income: 13910,
    incomePercentage: '+2.4%',
    outcome: 10067,
    outcomePercentage: '-1.2%',
  };

  const [showChart, setShowChart] = useState(false);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!accountData) {
    return <div>Erreur lors du chargement des données du compte.</div>;
  }

  return (
    <div className="bg-black-100 p-0">
      <motion.div 
        className="max-w-7xl mx-auto space-y-8"
        initial="initial"
        animate="animate"
      >
        {/* Stats Cards Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            initial: {},
            animate: { transition: { staggerChildren: 0.12 } }
          }}
        >
          <motion.div variants={fadeInUp}>
            <IncomeCard 
              amount={accountData.income} 
              percentage={todayData.incomePercentage}
              className={isDark ? 'bg-[#18181b] text-white border-gray-700' : 'bg-white text-gray-900 border-gray-100'}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <OutcomeCard 
              amount={accountData.expense} 
              percentage={todayData.outcomePercentage}
              className={isDark ? 'bg-[#18181b] text-white border-gray-700' : 'bg-white text-gray-900 border-gray-100'}
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <SummaryCard 
              amount={accountData.balance}
              className={isDark ? 'bg-[#18181b] text-white border-gray-700' : 'bg-white text-gray-900 border-gray-100'}
            />
          </motion.div>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Graph Section */}
          <motion.div
            className={`lg:col-span-2 ${isDark ? 'bg-[#18181b] text-white' : 'bg-white text-gray-900'} p-6 rounded-2xl shadow-lg`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            onAnimationComplete={() => setShowChart(true)}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Analyse de la semaine</h2>
              <select
                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-[#232326] text-white' : 'bg-gray-100 text-gray-900'}`}
              >
                <option>Cette semaine</option>
              </select>
            </div>
            { showChart ? <WeeklyAnalysisChart isDark={isDark} data={analysisData} /> : null}
            
          </motion.div>

          {/* Recent Transactions */}
          <RecentTransactionsCard
            transactions={recentTransactions}
            className={isDark ? 'bg-[#18181b] text-white' : 'bg-white text-gray-900'}
          />
        </div>
      </motion.div>
    </div>
  );
};