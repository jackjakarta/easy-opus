import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Event Name",
    description: "Single Event Page",
    keywords: "Event, Page",
};


export default function SingleEvent({ params }: { params: { id: string } }) {
    return (
        <div>
            <p>{params.id}</p>
        </div>
    );
};
