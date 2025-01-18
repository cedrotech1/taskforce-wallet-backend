import bcrypt from "bcryptjs";
import db from "../database/entity/index.js";
const users = db["User"];
import Sequelize from "sequelize";
import { resetPassword } from "../controllers/userController.js";

export const createUserCustomer = async (user) => {
  // hashing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const newUser = await users.create(user);
  return newUser;
};


export const getUserByEmail = async (email) => {
  try {
    const user = await users.findOne(
      {
        where: { email: email },
      }
    );

    return user;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getUserByCode = async (email, code) => {
  try {
    const user = await users.findOne(
      {
        where: { resetkey: code, email: email },
      }
    );

    return user;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getUserChristian = async () => {
  try {
    const allUsers = await users.findAll({
      where: { role: "christian", notify: "yes" },
      attributes: {
        exclude: ["password"],
      },
    });

    return allUsers;

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};





export const getUser = async (id) => {
  const user = await users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  return user;
};
export const GetUserPassword = async (id) => {
  const user = await users.findByPk(id, {
    attributes: ['password'],
  });
  return user ? user.password : null;
};





export const getUserByPhone = async (phone) => {
  try {
    const user = await users.findOne({
      where: { phone }

    });

    return user;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching user:", error);
    throw error;
  }
};






export const getUsers = async (restaurents, id) => {
  const allUsers = await users.findAll({
    where: {
      restaurents,
      id: {
        [Sequelize.Op.not]: id,
      },
    },
    attributes: { exclude: ["password"] },
  });
  return allUsers;
};


export const getallUsers = async () => {
  const allUsers = await users.findAll({
    // where: { restaurents },
    attributes: { exclude: ["password"] },
  });
  return allUsers;
};



export const updateUser = async (id, user) => {
  const userToUpdate = await users.findOne(
    { where: { id } },
    { attributes: { exclude: ["password"] } }
  );
  if (userToUpdate) {
    await users.update(user, { where: { id } });
    return user;
  }
  return null;
};

export const updateUserCode = async (email, user) => {
  const userToUpdate = await users.findOne(
    { where: { email } },
    { attributes: { exclude: ["password"] } }
  );
  if (userToUpdate) {
    await users.update(user, { where: { email } });
    return user;
  }
  return null;
};

export const deleteUser = async (id) => {
  const userToDelete = await users.findOne({ where: { id } });
  if (userToDelete) {
    await users.destroy({ where: { id } });
    return userToDelete;
  }
  return null;
};






