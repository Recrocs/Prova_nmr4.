DROP DATABASE IF EXISTS escola3;

CREATE DATABASE escola3;

USE escola3;

CREATE TABLE alunos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    turma VARCHAR(20) NOT NULL
);

INSERT INTO alunos (nome, turma) VALUES
('Maria Silva', '6A'),
('João Pedro', '7B');


CREATE TABLE oficinas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    vagas INT NOT NULL CHECK (vagas >= 1)
);

INSERT INTO oficinas (nome, categoria, vagas) VALUES
('Teatro', 'Artes', 25),
('Futsal', 'Esportes', 20);


CREATE TABLE inscricoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data_inscricao DATE NOT NULL,
    id_aluno INT NOT NULL,
    id_oficina INT NOT NULL,
    FOREIGN KEY (id_aluno) REFERENCES alunos(id),
    FOREIGN KEY (id_oficina) REFERENCES oficinas(id)
);

INSERT INTO inscricoes (data_inscricao, id_aluno, id_oficina) VALUES
(CURDATE(), 1, 1), 
(CURDATE(), 2, 2);