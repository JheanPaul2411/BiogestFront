import ToastAlert from "@/components/Common/Alert";
import axios from "axios";
import { baseUrl } from "@/helpers/constants/BaseURL";
import { headerBearer } from "@/helpers/constants/Headers";
import { Usuario } from "@/helpers/models/User";
import { handleErrors } from "./HandleErrors";



interface Props {
  selectedUser: Usuario;
  data: Partial<Usuario>;
}

const UpdateUserData = async ({ selectedUser, data }: Props): Promise<JSX.Element> => {
  try {
    await axios.put(`${baseUrl}/usuarios/${selectedUser.id}`, data, {
      headers: headerBearer(),
    });
    return <ToastAlert message="Rol cambiado correctamente" />;
  } catch (error) {
    handleErrors(error);
    return <ToastAlert message="Error al cambiar el rol" />;
  }
};

export default UpdateUserData;