import axios from 'axios';

const baseURL =  "http://evening-refuge-3851.herokuapp.com/api";

const AuthService = axios.create({
    baseURL: baseURL,
    timeout: 60000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null,
    }
});

const RefreshService = axios.create({
    baseURL: baseURL,
    timeout: 10000
});

AuthService.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === baseURL + '/token/refresh/') {
            window.location.href = '/';
            return Promise.reject(error);
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized")
            {
                const refreshToken = localStorage.getItem('refresh_token');

                if (refreshToken){
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return AuthService.post('/token/refresh/', {refresh: refreshToken})
                        .then((response) => {

                            localStorage.setItem('access_token', response.data.access);
                            localStorage.setItem('refresh_token', response.data.refresh);

                            AuthService.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;

                            return AuthService(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    } else {
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        AuthService.defaults.headers['Authorization'] = null;
                        window.location.href = '/';
                    }
                } else{
                    console.log("Refresh token not available.")
                    window.location.href = '/';
                }
        }

      // specific error handling done elsewhere
      return Promise.reject(error);
  }
);

export default AuthService;
