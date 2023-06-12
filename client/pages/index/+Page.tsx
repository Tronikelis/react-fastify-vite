import React from "react";

import Counter from "./Counter";

export default function Page() {
    return (
        <div>
            <a href="/about">about</a>
            <h1>Welcome</h1>
            This page is:
            <ul>
                <li>Rendered to HTML.</li>
                <li>
                    Interactive. <Counter />
                </li>
            </ul>
        </div>
    );
}
