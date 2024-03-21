import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { cookies } from 'next/headers'
import { redirect} from "next/navigation";

export default function Home() {
  async function buttonHandler(formdata:FormData) {
    "use server"
    const usernameValue = formdata.get("username");
    
    if (usernameValue === null) {
      console.log("username not found")
      return;
    }
    const username = usernameValue.toString()
    console.log(username)
    try{
      // console.log(username)
      const response = await axios.post("http://localhost:3000/", {
        username: username
      } );
      console.log(response.data)
    }catch(e){
      console.log("Error while setting user",e)
    }

    cookies().set("username",username)
    
    redirect('/ide')
  }
    
    

  return (
    <div>
      <div className="flex justify-center mt-4 ">
        <h1>Enter Username</h1>
      </div>
     
        <form className="flex flex-col items-center justify-center mt-4 " action={buttonHandler}>
        <Input type="" placeholder="Enter Username" name="username" required className="w-1/3" ></Input>
        
        <Button className="w-1/12 mt-4" variant={"outline"} type="submit">Submit</Button>
        </form>
      
    </div>
  );
}
