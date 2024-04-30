import {jwtDecode} from 'jwt-decode';
import { UserRole } from './UserRole';

interface DecodedToken {
  id: number;
  name: string;
  rol: UserRole;
  iat: number;
  exp: number;
}

class JwtUtils {
    static getUserRole(): UserRole | undefined {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.rol;
      }
      return undefined;
    }
  
    static isTokenValid(): boolean {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: DecodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          return decodedToken.exp > currentTime;
        } catch (error) {
          return false;
        }
      }
      return false;
    }
  }
  
  export default JwtUtils;