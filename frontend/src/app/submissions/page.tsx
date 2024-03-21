import React from 'react';
import ListSub from './listSub';
import getSubmissions from './action'; 
import { cookies } from "next/dist/client/components/headers";
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export interface Submission {
    id: number;
    user_id: number;
    language: string;
    stdin: string;
    source_code: string;
    submission_date: string;
    username: string;
}

export const metadata: Metadata = {
    title: "Submissions",
    description: "Submissions by the user",
  };

const SubmissionsPage: React.FC = async () => {
    const username = cookies().get("username")?.value
    let submissions :Submission[] = [] 
    if(username){
         submissions = await getSubmissions(username)

    }else{
         redirect('/')
        
    }

    return (
        <>
            <ListSub submission={submissions} />
        </>
    );
}

export default SubmissionsPage;
