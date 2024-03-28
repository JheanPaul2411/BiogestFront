import UserContext from "@/helpers/context/UserPrivider";
import { agendarCita } from "@/helpers/handlers/HandlerAgendarCita";
import { Label, Textarea, TextInput, Button } from "flowbite-react";
import { useState, useContext } from "react";


const CitaForm: React.FC = () => {

  const [fecha, setFecha] = useState('');
  const { user } = useContext(UserContext)
  const [motivo, setMotivo] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [hora, setHora] = useState('')

  const handleSendCita = () => {
    const response = agendarCita({
      fecha: new Date(`${fecha.toString()} ${hora.toString()}`),
      pacienteId: user?.id,
      motivo,
      sintomas,
    });

    setMotivo('');
    setSintomas('');
    setFecha('');
    setHora('');
    console.log(response)
    alert("Has solicitado la cita correctamente");


  };

  return (
    <form className='dark:bg-gray-700 bg-gray-50 p-10 rounded-md grid items-center justify-center gap-5 sm:grid-cols-2 sm:items-start'>
      <div className="row2 grid container_inputs">

        <div className='flex flex-col'>
          <Label className='font-normal'>Motivo</Label>
          <Textarea name="motivo" id="motivo" cols={30} rows={4} maxLength={280} required
            value={motivo} onChange={e => setMotivo(e.target.value)} placeholder='¿Cuál es el motivo de su consulta?'></Textarea>
        </div>

        <div className='flex flex-col'>
          <Label className='font-normal'>Síntomas</Label>
          <Textarea id="sintomas" cols={30} rows={6} onChange={e => setSintomas(e.target.value)} value={sintomas} placeholder='En caso de que presente algunos síntomas, especifique.'></Textarea>
        </div>
      </div>

      <div className="container_inputs row1 flex flex-col items-start gap-5">
        <div className="">
          <Label className='font-normal'>Fecha</Label>
          <TextInput type="date" lang='es' onChange={e => setFecha(e.target.value)} value={fecha} />
        </div>

        <div>
          <Label className='font-normal'>Hora tentativa</Label>
          <TextInput type='time' min="08:00" max="18:00" value={hora} onChange={e=>setHora(e.target.value)}/>
        </div>

      </div>


      <Button className='sm:col-span-2' color='purple' onClick={handleSendCita}>Solicitar cita</Button>




    </form>
  );
};

export default CitaForm;
