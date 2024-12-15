/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"


import Image from "next/image";

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export default function ScreenPage() {
  const [messages, setMessages] = useState(1);
  let socket : any;

  useEffect(() => {
    socket = io('http://localhost:8000'); 
    // Listen for data from the backend
    socket.on('screen_data', (data :any) => {
      console.log('Data received on screen:', data);
      setMessages(data); // Append the new message
    });

    return () => socket.disconnect(); // Clean up on component unmount
  }, []);

  return (
    <div className="relative h-screen w-screen">
    <Image
      src={`/cloud/${messages}.png`} // Path to your image in the public folder
      alt="Full Page Background"
      layout="fill" // Make the image cover the entire container
      objectFit="cover" // Ensures the image covers the entire area without distortion
      objectPosition="center" // Center the image
      priority // Load the image with high priority for better performance
    />
  </div>
  );
}
