const pool = require('../config/db');

const criarAluno = async (req, res) => {
  try {
    const { nome, turma } = req.body;

    if (!nome || !turma)
      return res.status(400).json({ message: "Todos os campos são obrigatórios." });

    const [result] = await pool.query(
      "INSERT INTO alunos (nome, turma) VALUES (?, ?)",
      [nome, turma]
    );

    res.status(201).json({
      id: result.insertId,
      nome,
      turma
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listarAlunos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM alunos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, turma } = req.body;

    const [result] = await pool.query(
      "UPDATE alunos SET nome=?, turma=? WHERE id=?",
      [nome, turma, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Aluno não encontrado." });

    res.json({ message: "Aluno atualizado com sucesso." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM alunos WHERE id=?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Aluno não encontrado." });

    res.json({ message: "Aluno deletado com sucesso." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  criarAluno,
  listarAlunos,
  atualizarAluno,
  deletarAluno
};
