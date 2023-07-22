// backend/routes/userRoute.js
const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userController');

router.get('/editExpense', userControllers.editExpense);
router.get('/deleteExpense', userControllers.deleteExpense);
router.get('/getExpenses', userControllers.getExpenses);
router.post('/newExpense', userControllers.postExpense);
router.get('/', userControllers.getExpensesPage);

module.exports = router;
