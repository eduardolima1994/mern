import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function UsuariosListagem() {

  const classes = useStyles();

  const [usuarios, setUsuarios] = useState([]);

  useEffect(()=>{
    async function loadUsuarios(){
      const response = await api.get("/api/usuarios");
      setUsuarios(response.data);
    };
    loadUsuarios();
  }, []);

  async function handleDelete(id){
    if(window.confirm("Deseja realmente excluir esse usuário?")){
      var result = await api.delete('/api/usuarios/'+id);
      if(result.status === 200){
        window.location = '/admin/usuarios';
      }else{
        alert('Ocorreu um erro, tente novamente!');
      }
    }
  };

  return (
    <div className={classes.root}>
      <MenuAdmin title={'USUÁRIOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Listagem de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">Data de Cadastro</TableCell>
                            <TableCell align="right">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          
                          {usuarios.map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.nome_usuario}
                              </TableCell>
                              <TableCell align="center">{row.email_usuario}</TableCell>
                              <TableCell align="center">{row.tipo_usuario === 1 ? 
                              <>
                                  <Stack spacing={1} alignItems="center">
                                    <Stack direction="row" spacing={1}>
                                      <Chip label="Administrador" color="primary" />
                                    </Stack>
                                  </Stack>
                              </> : <>
                                  <Stack spacing={1} alignItems="center">
                                    <Stack direction="row" spacing={1}>
                                      <Chip label="Funcionário" color="error" />
                                    </Stack>
                                  </Stack>
                              </>}
                              </TableCell>
                              <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                              <TableCell align="right">
                                <ButtonGroup aria-label="outlined button group">
                                  <Button color="primary" href={'/admin/usuarios/editar/'+ row._id}>Alterar</Button>
                                  <Button color="error" onClick={() => handleDelete(row._id)}>Excluir</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                          
                        </TableBody>
                      </Table>
                    </TableContainer>
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