"use client"

import PageTitle from "@/components/page-title";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function ChatPage() {

    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState('N/A');
    const [newMessage, setNewMessage] = useState('');

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


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    }

    const handleOnClick = () => {
        console.log('New Message: ', newMessage)
        socket.emit('publish-message', newMessage); 
    }

    return (
        <div>
            <PageTitle>Chat Window</PageTitle>
            <div>
                <input placeholder="message" onChange={handleOnChange}></input>
                <button onClick={handleOnClick}>Send New Message</button>
            </div>
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