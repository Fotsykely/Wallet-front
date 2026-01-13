import { useState, useEffect, useCallback, useMemo } from 'react';
import { budgetService } from '@/services/api/budget';
import { accountsService } from '@/services/api/account';

export function useBudget(accountId = 1, initialMonth) {
  const [month, setMonth] = useState(initialMonth);
  const [summary, setSummary] = useState({ budget: 0, spent: 0, remaining: 0, percent: 0 });
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [accountData, setAccountData] = useState(null);

  const load = useCallback(async (m = month) => {
    setLoading(true);
    setError(null);
    try {
      const [s, acc] = await Promise.all([
        budgetService.getBudgetSummary(accountId, m),
        accountsService.getAccountDetails(accountId, true).catch(() => null),
      ]);
      setSummary(s || { budget: 0, spent: 0, remaining: 0, percent: 0 });
      setAmount((s && s.budget) ? String(s.budget) : '');
      setAccountData(acc);
    } catch (err) {
      setError(err?.message || 'Erreur load budget');
    } finally {
      setLoading(false);
    }
  }, [accountId, month]);

  useEffect(() => { load(); }, [month, load]);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await budgetService.setBudget({ account_id: accountId, month, amount: Number(amount) });
      const updated = await budgetService.getBudgetSummary(accountId, month);
      setSummary(updated);
    } catch (err) {
      setError(err?.message || 'Erreur save budget');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const isFutureMonth = useMemo(() => {
    if (!month) return false;
    const parts = (month || '').split('-').map(Number);
    if (parts.length !== 2 || !Number.isInteger(parts[0]) || !Number.isInteger(parts[1])) return false;
    const [y, m] = parts;
    if (m < 1 || m > 12) return false;
    const now = new Date();
    const curY = now.getFullYear();
    const curM = now.getMonth() + 1;
    return y > curY || (y === curY && m > curM);
  }, [month]);

  return {
    month, setMonth, amount, setAmount,
    summary, accountData, loading, saving, error,
    load, save, isFutureMonth
  };
}