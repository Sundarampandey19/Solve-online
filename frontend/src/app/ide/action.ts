"use server"
import { env } from "@/lib/env";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/dist/client/components/headers";

interface createSubmissionProps {
  stdin: string;
  sourceCode: string;
  language: string;
}
export default async function createSubmission({
  stdin,
  sourceCode,
  language,
}: createSubmissionProps) {
  try {
    const username = cookies().get("username")?.value;
    console.log(username);
    if (!username) {
      prompt("User not found, Go to homepage to set the username");
    } else {
        console.log(username,language,stdin,sourceCode)

        const requestBody = {
            username: username,
            lang: language,
            stdin,
            code: sourceCode,
          };
          
      const response = await axios.post( env.SERVER_URL + "submit", requestBody);
      revalidatePath("/submissions");
      return response.data;
      
    }
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
}
