import { Grid } from '@mui/material';
import { Card } from '../../components/ui/card';
import { SummaryCard } from '../../components/cards/SummaryCard';
import { IncomeChart } from '../../components/charts/IncomeChart';
// import { RecentTransactions } from '../../components/transactions/RecentTransactions';

export const DashboardPage = () => {
  // Données temporaires - à remplacer par vos appels API
  const summaryData = {
    balance: 4544,
    income: 980,
    expenses: 460,
  };

  // const transactions = [
  //   { id: 1, name: 'Ahn Balarine', amount: 12599, type: 'income', date: '2022-06-10' },
  //   { id: 2, name: 'James Johnny', amount: 635, type: 'expense', date: '2022-06-10' },
  // ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="text-gray-600">Here's your most recent summary</p>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Balance"
            value={`$${summaryData.balance.toLocaleString()}`}
            trend={{ value: '2.4%', direction: 'up' }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Income"
            value={`$${summaryData.income.toLocaleString()}`}
            trend={{ value: '24%', direction: 'up' }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard
            title="Expenses"
            value={`$${summaryData.expenses.toLocaleString()}`}
            trend={{ value: '3.4%', direction: 'down' }}
          />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card className="h-full">
            <IncomeChart data={summaryData} />
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card className="h-full">
            {/* <RecentTransactions transactions={transactions} /> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};