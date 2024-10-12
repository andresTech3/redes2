import { pool } from "../db.js";

const getEmployees = async (req, res) => {
	try {
		const [response] = await pool.query("SELECT * FROM employee");
		res.json({ success: true, data: response }); // Estructura de respuesta mejorada
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

const getEmployee = async (req, res) => {
	try {
		const [response] = await pool.query("SELECT * FROM employee WHERE id = ?", [
			req.params.id,
		]);

		if (response.length <= 0)
			return res
				.status(404)
				.json({ success: false, message: "Employee not found" });

		res.json({ success: true, data: response[0] }); // Estructura de respuesta mejorada
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

const postEmployees = async (req, res) => {
	try {
		const { name, salary } = req.body;
		const [response] = await pool.query(
			"INSERT INTO employee (name, salary) VALUES (?, ?)",
			[name, salary]
		);

		res
			.status(201)
			.json({ success: true, id: response.insertId, name, salary }); // Estructura de respuesta mejorada
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

const putEmployees = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, salary } = req.body;
		const [response] = await pool.query(
			"UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
			[name, salary, id]
		);

		if (response.affectedRows === 0) {
			return res
				.status(404)
				.json({ success: false, message: "Employee not found" });
		}

		const [result] = await pool.query("SELECT * FROM employee WHERE id = ?", [
			id,
		]);
		res.json({ success: true, data: result[0] }); // Estructura de respuesta mejorada
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

const deleteEmployees = async (req, res) => {
	try {
		const [response] = await pool.query("DELETE FROM employee WHERE id = ?", [
			req.params.id,
		]);

		if (response.affectedRows <= 0) {
			return res
				.status(404)
				.json({ success: false, message: "Employee not found" });
		}

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export {
	getEmployees,
	getEmployee,
	postEmployees,
	putEmployees,
	deleteEmployees,
};
