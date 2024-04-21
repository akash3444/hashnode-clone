import Button from "@/shared/Button";
import { Input } from "@nextui-org/react";
import { FC } from "react";

interface NewsletterProps {
  authorName: string;
}

const Newsletter: FC<NewsletterProps> = ({ authorName }) => {
  return (
    <>
      <h5 className="text-3xl font-bold tracking-wide">
        Subscribe to my newsletter
      </h5>
      <p className="mt-6 text-xl tracking-wide text-foreground-700">
        Read articles from <b>{authorName}</b> directly inside your inbox.
        Subscribe to the newsletter, and don&apos;t miss out.
      </p>
      <div className="mt-10 max-w-lg mx-auto flex items-center">
        <Input
          type="email"
          placeholder="Enter your email address"
          classNames={{
            inputWrapper: "shadow-none h-12 rounded-r-none pl-6",
          }}
          variant="bordered"
        />
        <Button
          className="h-12 rounded-l-none px-6 rounded-r-xl bg-black text-white"
          disableAnimation
        >
          Subscribe
        </Button>
      </div>
    </>
  );
};

export default Newsletter;
