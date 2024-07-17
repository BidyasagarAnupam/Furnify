import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function AddressSkeleton() {
    return (
        <Card className="max-w-[610px] p-4 grid grid-cols-4 gap-2" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-28 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3 col-span-3">
                <Skeleton className="w-1/5 rounded-lg">
                    <div className="h-3 w-1/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    );
}
