/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const Page = () => {
  const [data, setData] = useState(0);

  const socketRef = useRef<Socket | null>(null); // Use useRef to persist socket instance

  useEffect(() => {
    // Initialize the socket connection
    socketRef.current = io("http://localhost:8000");

    return () => {
      // Clean up the socket connection on unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendData = (id: number) => {
    setData(id);
    console.log("Sending data:", id);

    if (socketRef.current) {
      socketRef.current.emit("send_data", id); // Emit data using the persistent socket instance
    }
  };

  return (
    <div className="m-4 flex flex-col gap-4 md:max-w-sm md:mx-auto">
      <h1 className="text-xl font-medium tracking-tight">SlideIT Remote Control</h1>
      <div className="flex flex-col gap-4">
        <h1 className="text-sm font-medium tracking-tight">Slides Available</h1>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
            <Button
              key={id}
              size="lg"
              onClick={() => sendData(id)}
              variant="outline"
              className="px-8"
            >
              {id}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex gap-4 w-full">
        <Button onClick={()=>sendData(data-1)} disabled={data==1} className="w-full">Left</Button>
        <Button onClick={()=>sendData(data+1)} disabled={data==12} className="w-full">Right</Button>
      </div>
    </div>
  );
};

export default Page;
