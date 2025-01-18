import { name } from "ejs";
import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = Router();

const options = {
  openapi: "3.0.1",
  info: {
    title: "taskforce-wallet-backend apis",
    version: "1.0.0",
    description: "taskforce-wallet-backend APIs documentation using swagger",
  },
  basePath: "/api",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "Authontication", description: "" },
    { name: "Users", description: "Users" },
    { name: "Account", description: "Account" },
    { name: "budgets", description: "budgets" },
    { name: "category", description: "category" },
    { name: "subcategory", description: "subcategory" },
    { name: "transaction", description: "transaction" },
    { name: "report", description: "report" },
  ],
  paths: {
    "/api/v1/auth/login": {
      post: {
        tags: ["Authontication"],
        summary: "Login a user",
        description: "Login a user",
        operationId: "loginUser",
        security: [],
        requestBody: {
          content: {
            "application/json": {
              // schema: {
              //   $ref: "#/components/schemas/User",
              // },
              example: {
                email: "cedrickhakuzimana@gmail.com",
                password: "Cedro@2312!",
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User logged in successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


    "/api/v1/users/signup": {
      post: {
        tags: ["Users"],
        summary: "signup as user ",
        description: "this endpoint used by user who create acount for use all activities system do! like create account,do transaction...",
        operationId: "user_signup",
        requestBody: {
          content: {
            "application/json": {
              // schema: {
              //   $ref: "#/components/schemas/User",
              // },
              example: {
                firstname: "John",
                lastname: "cedrick",
                phone: "078654325",
                email: "cedrickhakuzimana@gmail.com",
                password: "Cedro@2312!",
                comfirmpassword: "Cedro@2312!",
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


    "/api/v1/users/check": {
      post: {
        tags: ["Users"],
        summary: "Get  users user by email by email and send code",
        description: "Get all users",
        operationId: "getAllUserscheck",
        requestBody: {
          content: {
            "application/json": {
              // schema: {
              //   $ref: "#/components/schemas/User",
              // },
              example: {
                email: "cedrickhakuzimana.com",                    
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User retrived successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/code/{email}": {
      post: {
        tags: ["Users"],
        summary: "check code !",
        description: "checking code send thrugth email",
        operationId: "code",
        parameters: [
          {
            name: "email",
            in: "path",
            description: "User's email",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              // schema: {
              //   $ref: "#/components/schemas/User",
              // },
              example: {
                code: "10000",                    
              },
            },
            required: true,
          },
        },
        responses: {
          200: {
            description: "User retrived successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Get all users",
        operationId: "getAllUsers",
        responses: {
          200: {
            description: "User retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a user",
        description: "Get a user",
        operationId: "getOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/update/{id}": {
      put: {
        tags: ["Users"],
        summary: "Update a user",
        description: "Update a user",
        operationId: "updateOneUser",
       
        requestBody: {
          content: {
            "application/json": {
              // schema: {
              //   $ref: "#/components/schemas/User",
              // },
              example: {
                firstname: "John",
                lastname: "Doe",
                phone: "08012345678",
              },
            },
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


// resetPassword
"/api/v1/users/resetPassword/{email}": {
  put: {
    tags: ["Users"],
    summary: "reset  user password",
    description: "reset  user password  !! ",
    operationId: "reset-passwordr",
    parameters: [
      {
        name: "email",
        in: "path",
        description: "User's email",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/User",
          },
          example: {
            newPassword: "newp",
            confirmPassword: "cpass",
           
          },
        },
      },
    },
    responses: {
      200: {
        description: "User password updated  successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      404: {
        description: "User not found",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

    "/api/v1/users/changePassword": {
      put: {
        tags: ["Users"],
        summary: "change  user password",
        description: "change  user password  for current loged in user !! ",
        operationId: "change-passwordr",
        requestBody: {
          content: {
            "application/json": {
              // schema: {
              //   $ref: "#/components/schemas/User",
              // },
              example: {
                oldPassword: "oldp",
                newPassword: "newp",
                confirmPassword: "cpass",
               
              },
            },
          },
        },
        responses: {
          200: {
            description: "User password updated  successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/users/delete/{id}": {
      delete: {
        tags: ["Users"],
        summary: "Delete a user",
        description: "Delete a user",
        operationId: "deleteOneUser",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "User's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "User deleted successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "User not found",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },


// accounts related endpoints
   
    "/api/v1/Account/": {
      get: {
        tags: ["Account"],
        summary: "all  a Account",
        description: "Account",
        operationId: "all Account",
      
      
        responses: {
          201: {
            description: "Account retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    "/api/v1/Account/one/{id}": {
      get: {
        tags: ["Account"],
        summary: "one  a Account",
        description: "Account",
        operationId: "one Account",
         parameters: [
          {
            name: "id",
            in: "path",
            description: "Account's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
      
        responses: {
          201: {
            description: "Account retrieved successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/Account/delete/{id}": {
      delete: {
        tags: ["Account"],
        summary: "delete a Account",
        description: "delete Account",
        operationId: "deleteAccount",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Posts's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
      
        responses: {
          201: {
            description: "Posts rejected successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    
    "/api/v1/Account/add": {
      post: {
        tags: ["Account"],
        summary: "add account ",
        description: "this endpoint used add account",
        operationId: "add_account",
        requestBody: {
          content: {
            "application/json": {
              // schema: {
              //   $ref: "#/components/schemas/Account",
              // },
              example: {
                "balance": 1000.0,
                "accountType": "savings",
                "name": "mtn"
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "Account created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },

    "/api/v1/Account/update/{id}": {
      put: {
        tags: ["Account"],
        summary: "update account ",
        description: "this endpoint used update account",
        operationId: "update_account",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Account's id",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              // schema: {
              //   $ref: "#/components/schemas/User",
              // },
              example: {
                "balance": 1000.0,
                "accountType": "savings",
                "name": "mtn"
              },
            },
            required: true,
          },
        },
        responses: {
          201: {
            description: "User created successfully",
          },
          400: {
            description: "Bad request",
          },
          401: {
            description: "Unauthorized",
          },
          500: {
            description: "Something went wrong",
          },
        },
      },
    },
    

    
// budget related endpoints
   
"/api/v1/budgets/": {
  get: {
    tags: ["budgets"],
    summary: "geting  a budgets",
    description: "budgets",
    operationId: "budgets",
  
  
    responses: {
      201: {
        description: "budgets retrieved successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},


"/api/v1/budgets/add": {
  post: {
    tags: ["budgets"],
    summary: "add budgets ",
    description: "this endpoint used add budgets",
    operationId: "add_budgets",
    requestBody: {
      content: {
        "application/json": {
          // schema: {
          //   $ref: "#/components/schemas/budgets",
          // },
          example: {
            "limit": 1000.0,
            // "currentSpending": 200.0,
   
          },
        },
        required: true,
      },
    },
    responses: {
      201: {
        description: "budgets created successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/budgets/edit": {
  put: {
    tags: ["budgets"],
    summary: "update budgets ",
    description: "this endpoint used update budgets",
    operationId: "update_budgets",
    requestBody: {
      content: {
        "application/json": {
          // schema: {
          //   $ref: "#/components/schemas/budgets",
          // },
          example: {
            "limit": 1000.0,
          
          },
        },
        required: true,
      },
    },
    responses: {
      201: {
        description: "budgets created successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},


// category related endpoints
   
"/api/v1/category/": {
  get: {
    tags: ["category"],
    summary: "all  a my category",
    description: "category",
    operationId: "all_category",
  
  
    responses: {
      201: {
        description: "category retrieved successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},
"/api/v1/category/one/{id}": {
  get: {
    tags: ["category"],
    summary: "one  a category",
    description: "category",
    operationId: "one_category",
     parameters: [
      {
        name: "id",
        in: "path",
        description: "category's id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
  
  
    responses: {
      201: {
        description: "category retrieved successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/category/delete/{id}": {
  delete: {
    tags: ["category"],
    summary: "delete a category",
    description: "delete category",
    operationId: "deletecategory",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "category's id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
  
    responses: {
      201: {
        description: "category rejected successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/category/add": {
  post: {
    tags: ["category"],
    summary: "add category ",
    description: "this endpoint used add category",
    operationId: "add_category",
    requestBody: {
      content: {
        "application/json": {
          // schema: {
          //   $ref: "#/components/schemas/category",
          // },
          example: {
            "name": "Food & Beverages",
            "description": "All expenses related to food and drinks",
          },
        },
        required: true,
      },
    },
    responses: {
      201: {
        description: "category created successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/category/update/{id}": {
  put: {
    tags: ["category"],
    summary: "update category ",
    description: "this endpoint used update category",
    operationId: "update_category",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "category's id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          // schema: {
          //   $ref: "#/components/schemas/category",
          // },
          example: {
            "name": "Food & Beverages",
            "description": "All expenses related to food and drinks",
          },
        },
        required: true,
      },
    },
    responses: {
      201: {
        description: "User created successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},


// subcategory related endpoints
   
"/api/v1/subcategory/": {
  get: {
    tags: ["subcategory"],
    summary: "all  a my subcategory",
    description: "subcategory",
    operationId: "all_subcategory",
  
  
    responses: {
      201: {
        description: "subcategory retrieved successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},
"/api/v1/subcategory/one/{id}": {
  get: {
    tags: ["subcategory"],
    summary: "one  a subcategory",
    description: "subcategory",
    operationId: "one_subcategory",
     parameters: [
      {
        name: "id",
        in: "path",
        description: "subcategory's id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
  
  
    responses: {
      201: {
        description: "subcategory retrieved successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/subcategory/delete/{id}": {
  delete: {
    tags: ["subcategory"],
    summary: "delete a subcategory",
    description: "delete subcategory",
    operationId: "delete_subcategory",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "subcategory's id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
  
    responses: {
      201: {
        description: "subcategory rejected successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/subcategory/add": {
  post: {
    tags: ["subcategory"],
    summary: "add subcategory ",
    description: "this endpoint used add subcategory",
    operationId: "add_subcategory",
    requestBody: {
      content: {
        "application/json": {
          // schema: {
          //   $ref: "#/components/schemas/category",
          // },
          example: {
            "name": "Engine Repair",
            "categoryId": 1
          },
        },
        required: true,
      },
    },
    responses: {
      201: {
        description: "subcategory created successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/subcategory/update/{id}": {
  put: {
    tags: ["subcategory"],
    summary: "update subcategory ",
    description: "this endpoint used update subcategory",
    operationId: "update_subcategory",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "subcategory's id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          // schema: {
          //   $ref: "#/components/schemas/subcategory",
          // },
          example: {
            "name": "Engine Repair",
            "categoryId": 1
          },
        },
        required: true,
      },
    },
    responses: {
      201: {
        description: "subcategory created successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},



// transaction related endpoints
   
"/api/v1/transaction/": {
  get: {
    tags: ["transaction"],
    summary: "all  a my transaction",
    description: "transaction",
    operationId: "all_transaction",

    responses: {
      201: {
        description: "transaction retrieved successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},
"/api/v1/transaction/one/{id}": {
  get: {
    tags: ["transaction"],
    summary: "one  a transaction",
    description: "transaction",
    operationId: "one_transaction",
     parameters: [
      {
        name: "id",
        in: "path",
        description: "transaction's id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
  
  
    responses: {
      201: {
        description: "transaction retrieved successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/transaction/delete/{id}": {
  delete: {
    tags: ["transaction"],
    summary: "delete a transaction",
    description: "delete transaction",
    operationId: "delete_transaction",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "transaction's id",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
  
    responses: {
      201: {
        description: "transaction rejected successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/transaction/add": {
  post: {
    tags: ["transaction"],
    summary: "add transaction ",
    description: "this endpoint used add transaction",
    operationId: "add_transaction",
    requestBody: {
      content: {
        "application/json": {
          // schema: {
          //   $ref: "#/components/schemas/transaction",
          // },
          example: {
            "accountId": 2,
            "subcategoryId": 1,
            "type": "income or expense",
            "amount": 100.00,
            "description": "Purchased office supplies"
          },
        },
        required: true,
      },
    },
    responses: {
      201: {
        description: "transaction created successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/transaction/transaction-report": {
  get: {
    tags: ["report"],
    summary: "get all  my transactions report in date range",
    description: "get all  my transactions report in date range passed by user !",
    operationId: "all_transaction_report",
    parameters: [
      {
        name: "startDate",
        in: "query",
        description: "he start date of the report range (format: YYYY-MM-DD).",
        required: true,
        schema: {
          type: "string",
          format:'date'
        },
      },
      {
        name: "endDate",
        in: "query",
        description: "he end date of the report range (format: YYYY-MM-DD).",
        required: true,
        schema: {
          type: "string",
          format:'date'
        },
      },
    ],

    responses: {
      201: {
        description: "report  retrieved successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

"/api/v1/transaction/transaction-summary": {
  get: {
    tags: ["report"],
    summary: "all  a my report",
    description: "transaction",
    operationId: "all_transaction_summary",


    responses: {
      201: {
        description: "report  retrieved successfully",
      },
      400: {
        description: "Bad request",
      },
      401: {
        description: "Unauthorized",
      },
      500: {
        description: "Something went wrong",
      },
    },
  },
},

  },

  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "User's username",
          },
         
          role: {
            type: "string",
            description: "User's role",
          },
    
          email: {
            type: "string",
            description: "User's email",
          },
          password: {
            type: "string",
            description: "User's password",
          },
          password: {
            type: "string",
            description: "User's ponts",
          },

        },
      },
    
    

    
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
