import { ReactNode } from "react";

type PageTitleParams = {
    children: ReactNode
}

export default function PageTitle ({ children } : PageTitleParams) {
    return (
        <h1 className="text-4xl font-bold">{children}</h1>
    );
}