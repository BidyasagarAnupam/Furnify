import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function RatingSkeleton() {
    return (
        <Card className="w-[250px] h-fit space-y-5 p-4" radius="lg">
            <Skeleton className="h-4 w-3/5 rounded-lg" />
            <Skeleton className="rounded-lg">
                <div className="h-[100px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="max-w-[300px] w-full flex items-center gap-3">
                <div>
                    <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
            </div>
        </Card>
    );
}
