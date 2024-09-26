import axios from "axios";

axios.interceptors.request.use(
    function (config) {
        config.headers["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)


export const callLoginAPI = async (email: string, password: string): Promise<any> => {
    try {
        const response = await axios.post("http://localhost:3000/login", {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("callLoginAPI response: ", response);
        return response; 
    } catch (error) {
        console.error("Error during login: ", error);
        throw error; 
    }
};

export const callSignupAPI = async ( first_name:string, second_name:string,email: string, password: string): Promise<any> => {
    try {
        const response = await axios.post("http://localhost:3000/user", {
            first_name:first_name,
            second_name:second_name,
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("callSignupAPI response: ", response);
        return response; 
    } catch (error) {
        console.error("Error during login: ", error);
        throw error; 
    }
};



