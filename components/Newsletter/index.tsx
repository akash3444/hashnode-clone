"use client";

import { subscribeToNewsletter } from "@/api/post";
import { emailPattern } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/shared/Button";
import { Input } from "@nextui-org/react";
import { FC, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { PaperPlaneIcon } from "../icons";

interface NewsletterProps {
  authorName: string;
  publicationId: string;
}

const Newsletter: FC<NewsletterProps> = ({ authorName, publicationId }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubscription = async (formData: FormData) => {
    const email = formData.get("email") as string;
    if (!email) return;

    if (!email.match(emailPattern)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      const data = await subscribeToNewsletter({ email, publicationId });
      if (data && data.status === "PENDING") setIsSubscribed(true);
    } catch {
      toast.error("Could not subscribe to newsletter");
    }
  };

  return (
    <>
      <h5 className="text-3xl font-bold tracking-wide">
        Subscribe to my newsletter
      </h5>
      <p className="mt-6 text-lg md:text-xl tracking-wide text-foreground-700 dark:text-foreground-300">
        Read articles from <b>{authorName}</b> directly inside your inbox.
        Subscribe to the newsletter, and don&apos;t miss out.
      </p>
      {isSubscribed ? (
        <div className="mt-6 md:mt-10 border border-success-600 bg-success-50 rounded-lg p-6">
          <PaperPlaneIcon className="h-10 w-10 text-success-600 mx-auto animate-bounce" />
          <div className="mt-6 text-lg font-medium">
            <p>We&apos;ve sent a confirmation email;</p>
            <p>
              click on the link to complete your subscription to this
              newsletter.
            </p>
          </div>
        </div>
      ) : (
        <form action={handleSubscription} noValidate>
          <div className="mt-6 md:mt-10 max-w-lg mx-auto flex items-center">
            {/* TODO: Do not display input built-in error message */}
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              classNames={{
                inputWrapper: "shadow-none h-12 rounded-r-none pl-6",
              }}
              variant="bordered"
            />
            <SubscribeButton />
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>
      )}
    </>
  );
};

const SubscribeButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={cn(
        "h-12 rounded-l-none px-6 rounded-r-xl bg-black dark:bg-foreground-800 text-white",
        {
          "opacity-50": pending,
        }
      )}
      disableAnimation
      disabled={pending}
    >
      Subscribe
    </Button>
  );
};

export default Newsletter;
