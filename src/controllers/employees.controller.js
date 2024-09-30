import { pool } from "../db.js";

const getEmployees = async (req, res) => {
	try {
		const [response] = await pool.query("select * from employee");
		res.send(response);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "something goes wrong" + error.message });
	}
};

const getEmployee = async (req, res) => {
	try {
		const [response] = await pool.query("select * from employee where id = ?", [
			req.params.id,
		]);

		if (response.length <= 0)
			return res.status(404).json({
				message: "employee not found",
			});

		res.send(response);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "something goes wrong" + error.message });
	}
};

const postEmployees = async (req, res) => {
	try {
		const { name, salary } = req.body;
		const [response] = await pool.query(
			"INSERT INTO employee (name,salary) VALUES (?,?)",
			[name, salary]
		);

		res.send({
			id: response.insertId,
			name,
			salary,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "something goes wrong" + error.message });
	}
};

const putEmployees = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, salary } = req.body;
		const [response] = await pool.query(
			"UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?,salary) WHERE id = ?",
			[name, salary, id]
		);

		if (response.affectedRows === 0) {
			return res.status(404).json({ message: "not found employee" });
		}

		const [result] = await pool.query("SELECT * FROM employee WHERE id = ?", [
			id,
		]);

		res.json(result[0]);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "something goes wrong" + error.message });
	}
};

const deleteEmployees = async (req, res) => {
	try {
		const [response] = await pool.query("DELETE from employee where id = ?", [
			req.params.id,
		]);

		if (response.affectedRows <= 0) {
			return res.status(404).json({ message: "not found employee" });
		}

		res.sendStatus(204);
	} catch (error) {
		return res
			.status(500)
			.json({ message: "something goes wrong" + error.message });
	}
};

export {
	getEmployees,
	getEmployee,
	postEmployees,
	putEmployees,
	deleteEmployees,
};
