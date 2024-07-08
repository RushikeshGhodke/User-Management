import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiErrors.js";
import { ApiRespone } from "../utils/ApiResponse.js";
import { connection } from "../db/index.js";

const sayHello = async (req, res) => {
  res.status(200).json(200, new ApiRespone(200, "All set!"));
};

const addUser = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(name, email, phone);

  if (![name, email, phone].every((param) => param && param.trim())) {
    throw new ApiError(400, "Provide all necessary parameters");
  }

  await connection.query(
    "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    (error, results, fields) => {
      if (error) {
        console.error("Error creating user: ", error);
        return res.status(500).json({ error: "Error creating user" });
      }
      res
        .status(201)
        .json(
          new ApiRespone(
            201,
            { id: results.insertId,
              name,
              email,
              phone
             },
            "User Added successfully."
          )
        );
    }
  );
});

const listUsers = asyncHandler(async (req, res) => {
  await connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) {
      res.status(500).json(new ApiError(500, "Error Fetching users"));
      throw new ApiError(500, "Error Fetching users");
    }
    if (result) {
      console.log(result);
      res.status(200).json(new ApiRespone(200, result, "Data fetched."));
    }
  });
});

const listUsersByNameAsc = asyncHandler(async (req, res) => {
  await connection.query(
    "SELECT * FROM users ORDER BY name ASC;",
    function (err, result, fields) {
      if (err) {
        res.status(500).json(new ApiError(500, "Error Fetching users"));
        throw new ApiError(500, "Error Fetching users");
      }
      if (result) {
        console.log(result);
        res.status(200).json(new ApiRespone(200, result, "Data fetched."));
      }
    }
  );
});

const listUsersByNameDesc = asyncHandler(async (req, res) => {
  await connection.query(
    "SELECT * FROM users ORDER BY name DESC;",
    function (err, result, fields) {
      if (err) {
        res.status(500).json(new ApiError(500, "Error Fetching users"));
        throw new ApiError(500, "Error Fetching users");
      }
      if (result) {
        console.log(result);
        res.status(200).json(new ApiRespone(200, result, "Data fetched."));
      }
    }
  );
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  try {
    await connection.query(
      `DELETE FROM users WHERE id = ${id}`,
      function (err, result, fields) {
        if (err) {
          console.error("Error while deleting user:", err);
          throw new ApiError(500, "Error while deleting user");
        }
        if (result) {
          console.log(result);
          res.status(200).json(new ApiRespone(200, result, "User Deleted."));
        }
      }
    );
  } catch (error) {
    console.error("Caught an error while deleting user:", error);
    res.status(500).json(new ApiError(500, "Internal server error"));
  }
});


const searchUser = asyncHandler(async (req, res) => {
  const { searchTerm } = req.body;

  if (!searchTerm) {
    throw new ApiError(401, "Provide some search parameter.");
  }

  connection.query(
    `SELECT * FROM users WHERE name LIKE '${searchTerm}%'`,
    (err, results) => {
      if (err) {
        console.error("Error executing search query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length <= 0) {
        res.status(200).json(new ApiRespone(200, "No User Found"));
      }
      res.status(200).json(new ApiRespone(200, results, `${results.length} User Found.`));
    }
  );
});

const editUser = asyncHandler(async(req, res) => {
    const { id, name, email, phone } = req.body;

    await connection.query(`update users SET name = '${name}', email = '${email}', phone = '${phone}' where id = '${id}';`, function (err, results, fields) {
        if (err) {
            console.error("Error executing search query:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
    
          res.status(200).json(new ApiRespone(200, {id, name, email, phone}, `User Updated.`));
    });
});

export {
  sayHello,
  addUser,
  listUsers,
  listUsersByNameAsc,
  listUsersByNameDesc,
  deleteUser,
  searchUser,
  editUser
};
