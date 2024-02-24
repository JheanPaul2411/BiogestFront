import CitaForm from "./CitaForm"

function AgendarCita() {
  return (
    <main className="grid items-center justify-center">
      <h1 className="font-bold text-lg my-9 text-white">Agendación de cita</h1>
      <p className="text-gray-300 m-5">
        Cuando envíes una solicitud de cita a la doctora, ella podrá aceptar tu solicitud, o reagendarla para una nueva fecha, cercana a la que has proporiconado.
      </p>
      <CitaForm />
    </main>

  )
}

export default AgendarCita