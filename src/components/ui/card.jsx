/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Card as MuiCard } from '@mui/material';
import clsx from 'clsx';

export const Card = ({ children, className, ...props }) => {
  return (
    <motion.div whileHover={{ y: -2 }}>
      <MuiCard 
        className={clsx(
          'rounded-xl p-4 shadow-sm transition-all',
          'hover:shadow-md border border-gray-100',
          className
        )}
        {...props}
      >
        {children}
      </MuiCard>
    </motion.div>
  );
};