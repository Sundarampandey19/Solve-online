import { env } from "@/lib/env";
import axios from "axios";

export default async function getSubmissions(username: string) {     
    try {
        console.log(username);
        if (!username) {
            return;
        }
        const response = await axios.get( env.SERVER_URL +'submit', {
            params: {
                username: username
            }
        });
        return response.data;  
    } catch (error) {
        console.error('Error fetching submissions:', error);
        throw error;  // Re-throw the error to be handled by the caller
    }
}