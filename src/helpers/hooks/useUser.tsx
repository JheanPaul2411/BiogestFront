import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants/BaseURL';
import { handleErrors } from '../handlers/HandleErrors';
import { Usuario } from '../models/User';
import { headerBearer } from '../constants/Headers';

const useUsers = () => {
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/usuarios`,{headers:headerBearer()}); 
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        handleErrors(error)
      }
    };

    fetchUsers();

    
  }, []);

  return { users, loading };
};

export default useUsers;
