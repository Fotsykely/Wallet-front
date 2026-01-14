import { useState, useEffect, useMemo } from 'react';
import { accountsService } from '@/services/api/account';
import { transactionService } from '@/services/api/transaction';
import { budgetService } from '@/services/api/budget';

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [analysisData, setAnalysisData] = useState([]);
  const [budgetData, setBudgetData] = useState(null);

  const currentMonth = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const [acc, trans, analysis, budget] = await Promise.allSettled([
          accountsService.getAccountDetails(1, true),
          transactionService.getAccountTransaction(1, { maxDate: 5 }),
          accountsService.getAccountAnalysis(1, { maxDate: 7 }),
          budgetService.getBudget(1, currentMonth)
        ]);
        
        setAccountData(acc.value || null);
        setRecentTransactions(trans.value || []);
        setAnalysisData(analysis.value || []);
        setBudgetData(budget.value || null);
      } catch (e) {
        console.error("Dashboard load error", e);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, [currentMonth]);

  return { loading, accountData, recentTransactions, analysisData, budgetData, currentMonth };
};