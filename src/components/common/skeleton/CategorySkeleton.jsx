import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function CategorySkeleton() {
    return (
        <Card className="w-[200px] space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-[130px] max-w-20 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-full rounded-lg">
                    <div className="h-3 w-full rounded-lg bg-default-200"></div>
                </Skeleton>
            </div>
        </Card>
    );
}
