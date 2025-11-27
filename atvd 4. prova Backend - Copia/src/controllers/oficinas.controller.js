const pool = require('../config/db');

const criarOficina = async (req, res) => {
  try {
    const { nome, categoria, vagas } = req.body;

    if (!nome || !categoria || vagas == null)
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });

    if (vagas < 1)
      return res.status(400).json({ message: "A oficina deve ter ao menos 1 vaga." });

    const [result] = await pool.query(
      "INSERT INTO oficinas (nome, categoria, vagas) VALUES (?, ?, ?)",
      [nome, categoria, vagas]
    );

    res.status(201).json({
      id: result.insertId,
      nome,
      categoria,
      vagas
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listarOficinas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM oficinas");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const atualizarOficina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, categoria, vagas } = req.body;

    if (vagas < 1)
      return res.status(400).json({ message: "Vagas devem ser >= 1." });

    const [result] = await pool.query(
      "UPDATE oficinas SET nome=?, categoria=?, vagas=? WHERE id=?",
      [nome, categoria, vagas, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Oficina não encontrada." });

    res.json({ message: "Oficina atualizada com sucesso." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletarOficina = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM oficinas WHERE id=?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Oficina não encontrada." });

    res.json({ message: "Oficina deletada com sucesso." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  criarOficina,
  listarOficinas,
  atualizarOficina,
  deletarOficina
};
