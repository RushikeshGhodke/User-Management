import { Router } from "express";
import {
  sayHello,
  addUser,
  listUsers,
  listUsersByNameAsc,
  listUsersByNameDesc,
  deleteUser,
  searchUser,
  editUser
} from "../controllers/user.controller.js";

const router = Router();

router.route("/hello").get(sayHello);
router.route("/addUser").post(addUser);

router.route("/listUsers").get(listUsers);
router.route("/listUsersByNameAsc").get(listUsersByNameAsc);
router.route("/listUsersByNameDesc").get(listUsersByNameDesc);
router.route("/deleteUser").post(deleteUser);
router.route("/searchUser").post(searchUser);
router.route("/editUser").post(editUser);
export default router;
