//obs: Fa - biblioteca icons
//modal é tipo o alert, abre ua caixa de confirmar a acão, como excluir e editar
//onClick no modal
import React, { useState, useEffect } from 'react'
import axios from '../../api'//com isso ja chama url e axios
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import Modal from 'react-modal'



const PacienteList = () => {


  const [pacientes, setPacientes] = useState([])
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [modalSucessoAberto, setModalSucessoAberto] = useState(false)
  
  useEffect (() => {
    const buscarPacientes = () => {
      axios.get('/pacientes') //endpoint
      .then(response => {
        setPacientes(response.data)
      })
      .catch(error => {
        console.error("Ocorreu um erro: ", error)
      })
    }
    buscarPacientes()

  }, [])

  const abrirModal = (paciente) => {
    setPacienteSelecionado(paciente)
    setModalAberto(true)
  }

  const fecharModal = () => {
    setModalAberto(false)
    setPacienteSelecionado(null)
  }

  const abrirModalSucesso = () => {
    setModalSucessoAberto(true)
    setTimeout(() => setModalSucessoAberto(false), 2000)

  }

  const removerPaciente = () => {
    axios.delete(`/pacientes/${pacienteSelecionado.id}`)
    .then(() => {
        setPacientes(prevPacientes => prevPacientes.filter(paciente => paciente.id !== pacienteSelecionado.id))
        fecharModal()
        abrirModalSucesso()
    })
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4" style={{ position: 'relative '}}>Lista de Pacientes {' '}</h2>
          <Link to="/add-pacientes" className="btn btn-primary mb-2">
              <FaPlus className="icon" /> Adicionar Paciente
          </Link>

      <table className='table'>
        <thead>
          <tr>
            <th>Nome Completo:</th>
            <th>Telefone:</th>
            <th>Sexo:</th>
            <th>CPF:</th>
            <th>RG:</th>
            <th>Plano de Saúde:</th>
            <th>Ações:</th>           
          </tr>
        </thead>
        <tbody>
       
        {
          <tr key={pacientes.id}>
          <td>{pacientes.nome}</td>
          <td>{pacientes.telefone}</td>
          <td>{pacientes.sexo}</td>
          <td>{pacientes.cpf}</td>
          <td>{pacientes.rg}</td>
          <td>{pacientes.planoDeSaude}</td>
          <td>
            <Link to={`/edit-pacientes/${pacientes.id}`} className="btn btn-sm btn-warning">
              <FaEdit className="icon icon-btn" /> Editar
            </Link>
            <button onClick={() => abrirModal(pacientes)} className="btn btn-sm btn-danger">
              <FaTrash className="icon icon-btn" /> Excluir
            </button>
          </td>
       </tr>
       
        }
            
        </tbody>

      </table>

      <Modal
        isOpen={modalAberto}
        onRequestClose={fecharModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className='modalContent'>
            <FaExclamationTriangle className="icon"/>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o paciente
                  {pacienteSelecionado && pacienteSelecionado.nome}?
            </p>
            <div className='modalButtons'>
                 <button onClick={fecharModal} className='btn btn-secondary'>Cancelar</button>
                 <button onClick={removerPaciente} className='btn btn-danger'>Excluir</button>  
            </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalSucessoAberto}
        onRequestClose={() => setModalSucessoAberto(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <div className='modalContent'>
          <FaCheckCircle className="icon successIcon" />
          <h2>Paciente excluído com sucesso!</h2>  
        </div>  
      </Modal>

    </div>
  )

}
export default PacienteList