import React from 'react';
import ListSub from './listSub';
import getSubmissions from './action'; 
import { cookies } from "next/dist/client/components/headers";

export interface Submission {
    id: number;
    user_id: number;
    language: string;
    stdin: string;
    source_code: string;
    submission_date: string;
    username: string;
}

const SubmissionsPage: React.FC = async () => {
    const username = cookies().get("username")?.value
    let submissions :Submission[] = [] 
    if(username){
         submissions = await getSubmissions(username)

    }else{
         submissions = await getSubmissions("sam")
        
    }

    return (
        <>
            <ListSub submission={submissions} />
        </>
    );
}

export default SubmissionsPage;
