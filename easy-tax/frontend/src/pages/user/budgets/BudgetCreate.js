import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';
import UserLayout from '../../../components/UserLayout';
import BudgetForm from '../../../components/BudgetForm';
import BudgetService from '../../../services/budget.service';

const BudgetCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Categories for budgets
  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Housing',
    'Utilities',
    'Healthcare',
    'Personal Care',
    'Education',
    'Shopping',
    'Travel',
    'Gifts & Donations',
    'Investments',
    'Taxes',
    'Other'
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true);
      setError('');
      
      // Make API call to create budget
      await BudgetService.createBudget(values);
      
      // Show success message
      setOpenSnackbar(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/budgets');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Error creating budget');
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <UserLayout title="Create Budget">
      <Box sx={{ maxWidth: 800, mx: 'auto', my: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Create a New Budget
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <BudgetForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            categories={categories}
            buttonText="Create Budget"
          />
        </Paper>
      </Box>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">
          Budget created successfully!
        </Alert>
      </Snackbar>
    </UserLayout>
  );
};

export default BudgetCreate; 