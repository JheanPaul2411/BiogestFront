import axios from "axios";
import { baseUrl } from "@/helpers/constants/BaseURL";
import { headerBearer } from "@/helpers/constants/Headers";
import { Usuario } from "@/helpers/models/User";
import { handleErrors } from "./HandleErrors";



interface Props {
  selectedUser: Usuario;
  data: Partial<Usuario>;
}

const UpdateUserData = async ({ selectedUser, data }: Props)=> {
  try {
    await axios.put(`${baseUrl}/usuarios/${selectedUser.id}`, data, {
      headers: headerBearer(),
    });
  } catch (error) {
    handleErrors(error);
  }
};

export default UpdateUserData;