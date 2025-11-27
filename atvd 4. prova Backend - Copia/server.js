const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const inscricoesRoutes = require('./src/routes/inscricoes.routes');
const alunosRoutes = require('./src/routes/alunos.routes');
const oficinasRoutes = require('./src/routes/oficinas.routes');

app.use(express.json());
app.use(cors());

app.use("/alunos", alunosRoutes);
app.use("/oficinas", oficinasRoutes);
app.use("/inscricoes", inscricoesRoutes);

app.listen(port, () => {
  console.log('Servidor On ' + port);
});
