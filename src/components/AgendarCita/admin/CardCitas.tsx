import { useContext } from "react"
import { Cita } from "../../../models/Cita"
import UserContext from "../../../context/UserPrivider"

interface Props{
    citas: Cita[]
}
function CardCitas({citas}:Props) {
    const { user } = useContext(UserContext);

    return (
        <div className="contenedor">
            <span>Doctor: {user?.nombre} {user?.apellido}</span>

            {citas.map((cita, index) => {
                return <div key={index}>
                    <h2>Fecha de la cita: {cita.fecha}</h2>

                    <div className="motivo">
                        <span>Motivo de la cita:</span>
                        <p>{cita.motivo}</p>
                    </div>

                    {cita.sintomas && <div>
                        <span>Sintomas</span>
                        <p>{cita.sintomas}</p>
                    </div>}


                </div>
            })}
        </div>
    )
}

export default CardCitas