import axios from "axios";

interface ResponseValidateToken {
    data: {
        isValid: boolean;
    };
}

async function validateToken(token: string | null) {
    try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const apiUrl = `${baseUrl}/auth/validate`;

        const response: ResponseValidateToken = await axios.get(apiUrl, {
            headers: {
                'authorization': `${token}`
            },
            withCredentials: true
        });

        console.log(response.data.isValid);
        return response.data.isValid;
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}

export default validateToken;
