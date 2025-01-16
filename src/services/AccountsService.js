import db from "../database/entity/index.js";
const Account = db["Account"];
const Transaction = db["Transaction"];
const User = db["User"];

export const createAccount = async (accountData) => {
  return Account.create(accountData);
};

export const getAllAccounts = async (filter = {}) => {
  return Account.findAll({ where: filter, include: [
    { model: Transaction, as: "transactions" }, 
      { model: User, as: "user", attributes: ["id", "firstname", "lastname", "email"] },
  ] });
};

export const getAccountById = async (id) => {
  return Account.findByPk(id, { include: [
    { model: Transaction, as: "transactions" }, 
      { model: User, as: "user", attributes: ["id", "firstname", "lastname", "email"] },
  ] });
};

export const updateAccount = async (id, accountData) => {
  const account = await Account.findByPk(id);
  if (!account) return null;
  return account.update(accountData);
};

export const deleteAccount = async (id) => {
  const account = await Account.findByPk(id);
  if (!account) return null;
  return account.destroy();
};

