/* eslint-disable no-unused-vars */
// pages/Dashboard/DashboardPage.jsx
import { motion } from 'framer-motion';
import { IncomeCard } from '../../components/cards/IncomeCard';
import { OutcomeCard } from '../../components/cards/OutcomeCard';

export const DashboardPage = () => {
  // Données temporaires - à remplacer par vos appels API
  const todayData = {
    income: 13910,
    incomePercentage: '+2.4%',
    outcome: 10067,
    outcomePercentage: '-1.2%',
  };

  return (
    <div className="bg-black-100 p-0">
      <motion.div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section (gardez votre code existant) */}

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <IncomeCard 
            amount={todayData.income} 
            percentage={todayData.incomePercentage} 
          />
          <OutcomeCard 
            amount={todayData.outcome} 
            percentage={todayData.outcomePercentage} 
          />
          {/* Ajoutez deux cartes supplémentaires ici */}
        </div>

        {/* Graph Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Monthly Overview</h2>
            <select className="bg-gray-100 px-4 py-2 rounded-lg">
              <option>November 2023</option>
            </select>
          </div>
          {/* Ici vous ajouterez votre composant de graphique */}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Transfer Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold mb-4">Quick Transfer</h3>
            {/* Liste des contacts */}
          </div>

          {/* My Wallets Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold mb-4">My Wallets</h3>
            {/* Liste des wallets */}
          </div>

          {/* Recent Transactions Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold mb-4">Recent Transactions</h3>
            {/* Liste des transactions */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};