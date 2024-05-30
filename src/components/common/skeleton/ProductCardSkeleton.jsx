import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function ProductCardSkeleton() {
    return (
        <Card className="w-[250px] h-fit space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-[200px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <div className="flex justify-between">
                    <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-1/5 rounded-lg">
                        <div className="h-6 w-1/5 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>

            </div>
        </Card>
    );
}
