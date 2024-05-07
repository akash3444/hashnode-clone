import { authenticateWithDemoAccount } from "@/api-handlers/auth";
import Button from "@/shared/Button";
import { useFormState, useFormStatus } from "react-dom";

const LoginWithDemoAccount = () => {
  const [_, formAction] = useFormState(authenticateWithDemoAccount, undefined);

  return (
    <form action={formAction}>
      <LoginWithDemoAccountButton />
    </form>
  );
};

const LoginWithDemoAccountButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      color="default"
      variant="bordered"
      type="submit"
      isDisabled={pending}
      fullWidth
    >
      Login with demo account
    </Button>
  );
};

export default LoginWithDemoAccount;
