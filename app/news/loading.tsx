import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="p-0">
          <Skeleton className="rounded-lg">
            <div className="h-64 rounded-lg bg-default-300"></div>
          </Skeleton>
        </CardHeader>
        <CardBody className="p-8 space-y-6">
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-8 w-3/4 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="flex items-center gap-4">
            <Skeleton className="rounded-full">
              <div className="h-12 w-12 rounded-full bg-default-300"></div>
            </Skeleton>
            <div className="space-y-2">
              <Skeleton className="w-32 rounded-lg">
                <div className="h-4 w-32 rounded-lg bg-default-300"></div>
              </Skeleton>
              <Skeleton className="w-24 rounded-lg">
                <div className="h-3 w-24 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </div>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-full rounded-lg">
              <div className="h-4 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}

