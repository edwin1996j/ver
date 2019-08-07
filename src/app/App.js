import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      nombre1:'',
    nombre2:'',
    apellido1:'',
    apellido2:'',
    direccion:'',
      _id: '',
      estudiantes: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addEstudiante = this.addEstudiante.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addEstudiante(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/estudiantes/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
             nombre1:this.state.nombre1,
             nombre2:this.state.nombre2,
             apellido1:this.state.apellido1,
             apellido2:this.state.apellido2,
              direccion:this.state.direccion,
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'ha sido actulizado'});
          this.setState({_id: '', nombre1:'',nombre2:'',apellido1:'',apellido2:'',direccion:''});
          this.fetchEstudiantes();
        });
    } else {
      fetch('/api/estudiantes', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          window.M.toast({html: 'guardado'});
          this.setState({ nombre1:'',nombre2:'',apellido1:'',apellido2:'',direccion:''});
          this.fetchEstudiantes();
        })
        .catch(err => console.error(err));
    }

  }

  deleteEstudiante(id) {
    if(confirm('estas seguro de borrar')) {
      fetch(`/api/estudiantes/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          M.toast({html: 'Tborrar estudiante'});
          this.fetchEstudiantes();
        });
    }
  }

  editEstudiante(id) {
    fetch(`/api/estudiantes/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
             nombre1:data.nombre1,
             nombre2:data.nombre2,
             apellido1:data.apellido1,
             pellido2:data.apellido2,
             direccion:data.direccion,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    this.fetchEstudiantes();
  }

  fetchEstudiantes() {
    fetch('/api/estudiantes')
      .then(res => res.json())
      .then(data => {
        this.setState({estudiantes: data});
        console.log(this.state.estudiantes);
      });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo"></a>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addEstudiante}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="Nombre" onChange={this.handleChange} value={this.state.nombre1} type="text" placeholder="primer nombre" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="segundo nombre" onChange={this.handleChange} value={this.state.nombre2} type="text" placeholder="segundo nombre" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="Apellido" onChange={this.handleChange} value={this.state.apellido1} type="text" placeholder="primer apellido" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="Segundo apellido" onChange={this.handleChange} value={this.state.apellido2} type="text" placeholder="segundo apellido" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="Direccion" onChange={this.handleChange} value={this.state.direccion} type="text" placeholder="direccion" autoFocus/>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      ENVIAR
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Segundo nombre</th>
                    <th>Primer apellido</th>
                    <th>Segundo apellido</th>
                    <th>Direccion</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.estudiantes.map(Estudiante => {
                      return (
                        <tr key={Estudiante._id}>
                          <td>{Estudiante.nombre1}</td>
                          <td>{Estudiante.nombre2}</td>
                           <td>{Estudiante.apellido1}</td>
                          <td>{Estudiante.apellido2}</td>
                           <td>{Estudiante.direccion}</td>
                          <td>
                            <button onClick={() => this.deleteEstudiante(Estudiante._id)} className="btn light-blue darken-4">
                              <i className="material-icons">borrar</i>
                            </button>
                            <button onClick={() => this.editEstudiante(Estudiante._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">editar</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default App;
