import { User } from "@/lib/types";
import Card, { CardBody } from "@/shared/Card";
import Typography from "@/shared/Typography";
import { Avatar, Chip } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

interface TechStackProps {
  techStack: User["techStack"];
}

const TechStack: FC<TechStackProps> = ({ techStack }) => {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardBody className="pb-8">
        <Typography variant="h2" className="mb-3">
          My tech stack
        </Typography>
        {techStack?.nodes?.length ? (
          <div className="flex flex-wrap gap-x-2 gap-y-2.5">
            {techStack.nodes.map(({ id, name, slug, logo }) => (
              <Link key={id} href={`/tags/${slug}`}>
                <Chip
                  radius="sm"
                  variant="flat"
                  avatar={
                    logo && (
                      <Avatar
                        className="object-contain"
                        src={logo}
                        radius="sm"
                      />
                    )
                  }
                >
                  {name}
                </Chip>
              </Link>
            ))}
          </div>
        ) : (
          <p className="my-10 text-center text-foreground-500 dark:text-foreground-400">
            No tech stack available
          </p>
        )}
      </CardBody>
    </Card>
  );
};

export default TechStack;
