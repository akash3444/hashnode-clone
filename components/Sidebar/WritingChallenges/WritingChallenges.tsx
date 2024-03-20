import { getWritingChallenges } from "@/api/sidebar";
import Card, { CardBody, CardHeader } from "@/shared/Card";
import Typography from "@/shared/Typography";
import ChallengeTabs from "./ChallengeTabs";

const WritingChallenges = () => {
  const challengesPromise = getWritingChallenges();

  return (
    <Card>
      <CardHeader className="pt-2 justify-between gap-5">
        <Typography variant="h2" className="shrink-0">
          Writing Challenges
        </Typography>
      </CardHeader>
      <CardBody>
        <ChallengeTabs challengesPromise={challengesPromise} />
      </CardBody>
    </Card>
  );
};

export default WritingChallenges;
