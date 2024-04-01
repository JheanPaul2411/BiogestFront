import axios, {  AxiosResponse } from "axios";
import { HistorialMedico } from "../models/HistorialMedico";
import { Usuario } from "../models/User";
import { handleErrors } from "./HandleErrors";
import { baseUrl } from "../constants/BaseURL";
import { headerBearer } from "../constants/Headers";

interface Props {
  selectedUser: Usuario;
  dataHistorial: HistorialMedico;
}
export default async function handleRegistrarHistorial({
  selectedUser,
  dataHistorial,
}: Props) {
  try {
    const response: AxiosResponse<HistorialMedico> = await axios.post(
      `${baseUrl}/ficha-medica/`,
      { ...dataHistorial, pacienteId : selectedUser.id },
      { headers: headerBearer() }
    );
    if (response.statusText === axios.HttpStatusCode.Ok.toString()) {
      console.log(response.statusText);
      console.log(axios.HttpStatusCode.Ok);
      return response;
    }
  } catch (error) {
    handleErrors(error);
  }
}
