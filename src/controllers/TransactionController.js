import {
    createTransaction,
    getAllTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    generateUserReportService,
    transactionSummaryService
  } from "../services/TransactionService";
  
  // Create Transaction
  export const addTransaction = async (req, res) => {
    try {
      const { accountId, categoryId, type, amount, description } = req.body;
      const userId = req.user.id;
      // Validate transaction type
      if (!["income", "expense"].includes(type.toLowerCase())) {
        return res
          .status(400)
          .json({ success: false, message: "Type must be 'income' or 'expense'." });
      }
  
      // Validate amount
      if (!amount || amount <= 0) {
        return res
          .status(400)
          .json({ success: false, message: "Amount must be greater than zero." });
      }
  
      const transaction = await createTransaction({
        accountId,
        userId,
        categoryId,
        type,
        amount,
        description,
      });
  
      // Notify if the expense exceeds the budget
      if (type.toLowerCase() === "expense") {
        const account = await transaction.getAccount(); // Get associated account
        if (account && account.balance < amount) {
          return res.status(400).json({
            success: false,
            message: "Expense exceeds the available account balance.",
          });
        }
      }
  
      res.status(201).json({
        success: true,
        message: "Transaction created successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  // Get All Transactions
  export const Transactions = async (req, res) => {
    try {
      const transactions = await getAllTransactions();
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
      const transaction = await getTransactionById(id);
  
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
  
  // Update Transaction
  export const editTransaction = async (req, res) => {
    try {
      const { id } = req.params;
      const { type, amount } = req.body;
  
      if (type && !["income", "expense"].includes(type.toLowerCase())) {
        return res
          .status(400)
          .json({ success: false, message: "Type must be 'income' or 'expense'." });
      }
  
      if (amount && amount <= 0) {
        return res
          .status(400)
          .json({ success: false, message: "Amount must be greater than zero." });
      }
  
      const [rows, [updatedTransaction]] = await updateTransaction(id, req.body);
  
      if (!rows) {
        return res
          .status(404)
          .json({ success: false, message: "Transaction not found." });
      }
  
      res.status(200).json({
        success: true,
        message: "Transaction updated successfully",
        data: updatedTransaction,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  // Delete Transaction
  export const removeTransaction = async (req, res) => {
    try {
      const { id } = req.params;
  
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
