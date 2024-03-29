import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '22%',
  },

}));

export default function UsuarioEditar() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');

  const { idUsuario } = useParams();

  useEffect(()=>{
    async function getUsuario(){
      var response = await api.get('/api/usuarios.details/'+ idUsuario);

      setNome(response.data.nome_usuario);
      setEmail(response.data.email_usuario);
      setTipo(response.data.tipo_usuario);
      setSenha(response.data.senha_usuario);
    };
    getUsuario();
  },[]);

  async function handleSubmit() {
      const data = {
        nome_usuario: nome, 
        email_usuario: email, 
        senha_usuario: senha, 
        tipo_usuario: tipo,
        _id: idUsuario,
      };
      const response = await api.put('/api/usuarios', data);

      if (nome!=='' && email!=='' && senha!=='' && tipo!==''){
        if (response.status === 200){
          window.location.href='/admin/usuarios';
        }else{
          alert('Erro ao atualizar usuário!');
        }
      }else{
        alert('Por favor, preencher todos os dados!')
      }

  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'USUÁRIOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Atualização de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="family-name"
                      variant="standard"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <FormControl className={classes.formControl} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="labelTipo">Tipo *</InputLabel>
                    <Select
                      labelId="labelTipo"
                      id="tipo"
                      value={tipo}
                      onChange={e => setTipo(e.target.value)}
                    >
                      
                      <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Funcionário</MenuItem>
                    </Select>
                  </FormControl>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="password"
                      id="senha"
                      name="senha"
                      label="Senha"
                      fullWidth
                      autoComplete="senha"
                      variant="standard"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}