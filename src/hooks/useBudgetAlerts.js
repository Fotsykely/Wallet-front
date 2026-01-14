import { useEffect, useState } from 'react';
import { settingsService } from '@/services/api/settings';
import { useNotifier } from '@/components/ui/notifications/NotifierContext';

const ALERT_THRESHOLD = 0.8; // 80%
const STORAGE_KEY_PREFIX = 'wallet_alert_shown_';

/**
 * Hook responsable de vérifier si le budget est en danger.
 * @param {number} spent - Montant dépensé
 * @param {number} budget - Budget total défini
 * @param {string} month - Mois concerné (ex: '2026-01')
 */
export function useBudgetAlerts(spent, budget, month) {
  const { show } = useNotifier();
  const [isEnabled, setIsEnabled] = useState(false);

  // Charge user preferences for the alert
  useEffect(() => {
    let mounted = true;
    settingsService.getSettings()
      .then(settings => {
        if (mounted) {
          // Save in the state if budget alerts are enabled
          setIsEnabled(settings.pref_budget_alerts === 'true');
        }
      })
      .catch(console.error);
    return () => { mounted = false; };
  }, []);

  // Check budget status and show alerts if necessary
  useEffect(() => {
    if (!isEnabled || !budget || budget <= 0 || !month) return;

    const ratio = spent / budget;
    const sessionKey = `${STORAGE_KEY_PREFIX}${month}`;
    const alreadyNotified = sessionStorage.getItem(sessionKey);

    // Case 1: Budget exceeded
    if (ratio >= 1 && alreadyNotified !== 'critical') {
      show(`Attention : Vous avez dépassé votre budget de ${month} !`, 'error');
      sessionStorage.setItem(sessionKey, 'critical');
    }
    // Case 2: Budget nearing limit
    else if (ratio >= ALERT_THRESHOLD && ratio < 1 && !alreadyNotified) {
      show(`Alerte : Vous avez consommé ${(ratio * 100).toFixed(0)}% de votre budget.`, 'warning');
      sessionStorage.setItem(sessionKey, 'warning');
    }

  }, [spent, budget, month, isEnabled, show]);
}