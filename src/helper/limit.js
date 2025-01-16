// helpers/paginationHelper.js

import { Model } from "sequelize";

export const getPaginatedResults = async (model, page, limit) => {
    const skip = (page - 1) * limit;
    const results =Model;
    const totalResults = await model.countDocuments();
    
    return {
      results,
      totalResults,
    };
  };
  