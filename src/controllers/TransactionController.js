import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  generateUserReportService,
  transactionSummaryService
} from "../services/TransactionService";

import {
  getAccountByUser,
  updateAccount
} from "../services/AccountsService";

import {
  getBudgetByUserId,
  updateBudget
} from "../services/BudgetService";



// Create Transaction
export const addTransaction = async (req, res) => {
  try {
    const { accountId, subcategoryId, type, amount, description } = req.body;
    const userId = req.user.id;
    const { id } = req.params;
    // console.log(accountId);

    const budget = await getBudgetByUserId(userId);

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found for this user",
      });
    }

    // console.log(budget)

    let User_account = await getAccountByUser(accountId, userId);
    if (!User_account) {
      return res.status(400).json({
        success: false,
        message: "Account not found",
      });
    }
    // console.log(User_account.balance)
    let account_balance = User_account.balance;
    let account_id = User_account.id;
    let budget_limit = budget.limit;
    let currentSpending = budget.currentSpending;
    let updatedSpending;
    let message = 'Transaction created successfully';
    //  console.log(budget_limit);

    // Validate amount
    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be greater than zero." });
    }


    // Validate transaction type
    if (!["income", "expense"].includes(type.toLowerCase())) {
      return res
        .status(400)
        .json({ success: false, message: "Type must be 'income' or 'expense'." });
    }
    let balance

    if (type.toLowerCase() === "expense") {
      if (account_balance < amount) {
        return res.status(400).json({
          success: false,
          message: "Expense exceeds the available account balance.",
        });
      }
      else {
        balance = account_balance - amount;
        updatedSpending = currentSpending + amount;
        if (budget_limit < updatedSpending) {
          message = "Transaction created successfully but you exceed bugget limit"
          console.log("now you exceed your bugdet limit!");
        }
      }
    } else {
      balance = account_balance + amount;
    }
    const transaction = await createTransaction({
      accountId,
      userId,
      subcategoryId,
      type,
      amount,
      description,
    });

    const updatedAccount = await updateAccount(account_id, { balance: balance });
    const updatedBudget = await updateBudget(userId, { currentSpending: updatedSpending });


    res.status(201).json({
      success: true,
      message: message,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Transactions
export const Transactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const transactions = await getAllTransactions(userId);
    res.status(200).json({
      success: true,
      message: "Transactions retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Transaction by ID
export const TransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const transaction = await getTransactionById(id, userId);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    }

    res.status(200).json({
      success: true,
      message: "Transaction retrieved successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Transaction
export const removeTransaction = async (req, res) => {
  try {


    const { id } = req.params;
    const userId = req.user.id;
    const transaction = await getTransactionById(id, userId);

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    }

    // console.log(transaction);
    let transaction_amount = transaction.amount;
    let transaction_type = transaction.type;
    let account_id = transaction.account.id;
    let account_balance = transaction.account.balance;
    let budget_limit = transaction.user.Budget.currentSpending;
    let currentSpending = transaction.user.Budget.currentSpending; 
    let updatedSpending;
    let account_balance_toupdate = 0;
    let budget_limit_to_update = 0;
    let currentSpending_toupdate = 0;

    if (transaction_type.toLowerCase() === "expense") {
      account_balance_toupdate = account_balance + transaction_amount;
      currentSpending_toupdate = currentSpending - transaction_amount
    } else {
      account_balance_toupdate = account_balance - transaction_amount;
    }


    const updatedAccount = await updateAccount(account_id, { balance: account_balance_toupdate });
    const updatedBudget = await updateBudget(userId, { currentSpending: currentSpending_toupdate });

    const rows = await deleteTransaction(id);

    if (!rows) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found." });
    }

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export const generateUserReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id; // Extract user ID from the logged-in user context

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide both startDate and endDate in the query parameters.",
      });
    }

    const report = await generateUserReportService(userId, startDate, endDate);

    return res.status(200).json({
      success: true,
      message: "User-specific report generated successfully.",
      report,
    });
  } catch (error) {
    console.error("Error generating user report:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while generating the report.",
    });
  }
};

export const getTransactionSummary = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the logged-in user context

    const summary = await transactionSummaryService(userId);

    return res.status(200).json({
      success: true,
      message: "Transaction summary retrieved successfully.",
      summary,
    });
  } catch (error) {
    console.error("Error retrieving transaction summary:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while retrieving the transaction summary.",
    });
  }
};
