import axios from '../config.js'
import useAuth from './useAuth.js';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.tokens.accessToken);
            return { ...prev, accessToken: response.data.tokens.accessToken }
        });
        return response.data.tokens.accessToken;
    }
    return refresh;
};

export default useRefreshToken;