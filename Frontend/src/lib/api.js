const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiRequest(
    endpoint,
    method = "GET",
    body = null,
    token = null
    ){
        const headers = {
            "Content-Type": "application/json",
        };

        if(token){
            headers["Authorization"] = `Bearer ${token}`;
        }

        const config = { 
            method,
            headers,
        };

        if(body){
            config.body = JSON.stringify(body);
        }

        try {
            const res = await fetch(`${BASE_URL}${endpoint}`, config);
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message || "API request failed");
            }
            return data;
        } catch (err) {
            throw new Error(err.message || "Network error");
        }

    }
