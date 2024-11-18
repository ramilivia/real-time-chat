import PageTitle from "@/components/page-title";
import { prisma } from "@/lib/prisma";

export default async function ChatPage() {

    const messages = await prisma.message.findMany({
        include: {
            author: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

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
        </div>

    );
}