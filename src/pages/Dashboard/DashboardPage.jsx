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
import { budgetService } from '@/services/api/budget';

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
  const [budgetData, setBudgetData] = useState(null);

  // Données temporaires - à remplacer par vos appels API
  useEffect(() => {
    accountsService.getAccountDetails(1, true)
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

  useEffect(() => {
    // Get Budget for current month in YYYY-MM format
    const now = new Date();
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    budgetService.getBudget(1, month)
      .then(setBudgetData)
      .catch(() => setBudgetData(null));
  }, []);

  const [showChart, setShowChart] = useState(false);

  const budgetAmount = budgetData?.amount || 0;
  const expense = Math.abs(accountData?.expense || 0);
  const remaining = budgetAmount - expense;
  const percentUsed = budgetAmount > 0 ? Math.min((expense / budgetAmount) * 100, 100) : 0;

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!accountData) {
    return <div>Erreur lors du chargement des données du compte.</div>;
  }

  return (
    <div className="bg-black-100 p-0">
      <motion.div 
        className="max-w-7xl mx-auto lg:h-[calc(100vh-140px)] min-h-[700px]"
        initial="initial"
        animate="animate"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="lg:col-span-2 flex flex-col gap-8 h-full">       
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 shrink-0"
              variants={{
                initial: {},
                animate: { transition: { staggerChildren: 0.12 } }
              }}
            >
              <motion.div variants={fadeInUp}>
                <IncomeCard 
                  amount={accountData.income} 
                  percentage={accountData.incomePercentage}
                  className={isDark ? 'bg-[#18181b] text-white border-gray-700' : 'bg-white text-gray-900 border-gray-100'}
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <OutcomeCard 
                  amount={accountData.expense} 
                  percentage={accountData.expensePercentage}
                  className={isDark ? 'bg-[#18181b] text-white border-gray-700' : 'bg-white text-gray-900 border-gray-100'}
                />
              </motion.div>
            </motion.div>

            {/* Ligne 2 : Graphique */}
            <motion.div
              className={`${isDark ? 'bg-[#18181b] text-white' : 'bg-white text-gray-900'} p-6 rounded-2xl shadow-lg flex-1 flex flex-col min-h-0`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              onAnimationComplete={() => setShowChart(true)}
            >
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Analyse de la semaine</h2>
              </div>
              <div className="flex-1 min-h-[200px]">
                 { showChart ? <WeeklyAnalysisChart isDark={isDark} data={analysisData} height="100%" /> : null}
              </div>
            </motion.div>
          </div>

          {/* COLONNE DROITE */}
          <div className="flex flex-col gap-8 h-full">
            
            {/* Balance */}
             <motion.div variants={fadeInUp} className="shrink-0">
              <SummaryCard 
                amount={accountData.balance}
                budget={budgetAmount}
                spent={expense}
                remaining={remaining}
                percentUsed={percentUsed}
                className={isDark ? 'bg-[#18181b] text-white border-gray-700' : 'bg-white text-gray-900 border-gray-100'}
              />
            </motion.div>

            {/* Transactions */}
            <div className="flex-1 min-h-0">
              <RecentTransactionsCard
                transactions={recentTransactions}
                className={isDark ? 'bg-[#18181b] text-white' : 'bg-white text-gray-900'}
              />
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};