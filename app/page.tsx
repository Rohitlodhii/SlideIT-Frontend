"use client"

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {

  const [data , setData] = useState<string | undefined>(undefined);

  useEffect(()=>{
      const socket = io("http://localhost:8000");
      socket.on("connect" , ()=>{
        console.log(socket.id);
        setData(socket.id);
      })
      

    return () => {
      socket.disconnect();
    }
  } , [])

  return (
    <div className="h-screen flex items-center justify-center">
        Hey
        {data}
    </div>
  );
}
