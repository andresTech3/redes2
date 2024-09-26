import { Router } from "express";
import {
	getEmployees,
	getEmployee,
	postEmployees,
	putEmployees,
	deleteEmployees,
} from "../controllers/employees.controller.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employee/:id", getEmployee);

router.post("/employees", postEmployees);

router.patch("/employee/:id", putEmployees);

router.delete("/employee/:id", deleteEmployees);

export default router;
