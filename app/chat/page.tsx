"use client"

import PageTitle from "@/components/page-title";
import { prisma } from "@/lib/prisma";
import { socket } from "../socket";
import { useEffect, useState } from "react";

export default function ChatPage() {

    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A")//

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport: any) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("initial-messages", (messages: any) => {
            console.log('initial messages client')
            setMessages(messages);
        });

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return (
        <div>
            <PageTitle>Chat Window</PageTitle>
            <ul className="">
                {messages.map(msg => (
                    <li className="mb-6" key={msg.id}>
                        <div>{msg.content}</div>
                        <div>{msg.author.username}</div>
                    </li>
                ))}
            </ul>
            <div>
                <p>Status: {isConnected ? "connected" : "disconnected"}</p>
                <p>Transport: {transport}</p>
            </div>
        </div>

    );
}