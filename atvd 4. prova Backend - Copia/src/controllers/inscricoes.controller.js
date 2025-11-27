const pool = require('../config/db');

const criarInscricao = async (req, res) => {
  try {
    const { id_aluno, id_oficina } = req.body;

    if (!id_aluno || !id_oficina)
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });

    const [result] = await pool.query(
      `INSERT INTO inscricoes (data_inscricao, id_aluno, id_oficina)
       VALUES (CURDATE(), ?, ?)`,
      [id_aluno, id_oficina]
    );

    res.status(201).json({
      id: result.insertId,
      id_aluno,
      id_oficina
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listarInscricoes = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT i.id, i.data_inscricao,
             a.nome AS aluno,
             o.nome AS oficina
      FROM inscricoes i
      JOIN alunos a ON a.id = i.id_aluno
      JOIN oficinas o ON o.id = i.id_oficina
    `);

    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const atualizarInscricao = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_aluno, id_oficina } = req.body;

    if (!id_aluno || !id_oficina)
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });

    const [result] = await pool.query(
      `UPDATE inscricoes
       SET id_aluno = ?, id_oficina = ?
       WHERE id = ?`,
      [id_aluno, id_oficina, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Inscrição não encontrada." });

    res.json({ message: "Inscrição atualizada com sucesso." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletarInscricao = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM inscricoes WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Inscrição não encontrada." });

    res.json({ message: "Inscrição excluída com sucesso." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const TotalPorOficina = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        o.id,
        o.nome AS oficina,
        COUNT(i.id) AS total_inscricoes
      FROM oficinas o
      LEFT JOIN inscricoes i ON o.id = i.id_oficina
      GROUP BY o.id, o.nome
      ORDER BY total_inscricoes DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const TotalPorCategoria = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        o.categoria,
        COUNT(i.id) AS total_inscricoes
      FROM oficinas o
      LEFT JOIN inscricoes i ON o.id = i.id_oficina
      GROUP BY o.categoria
      ORDER BY total_inscricoes DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  criarInscricao,
  listarInscricoes,
  atualizarInscricao,
  deletarInscricao,
  TotalPorOficina,
  TotalPorCategoria
};
