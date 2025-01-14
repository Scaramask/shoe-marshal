import { Button } from "@/components/ui/button";
import { 
  RegisterLink, 
  LoginLink 
} from "@kinde-oss/kinde-auth-nextjs/components";
//import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Button asChild>
        <LoginLink>Login</LoginLink>
      </Button>
      <Button asChild>
        <RegisterLink>Register</RegisterLink>
      </Button>
    </div>
  );
}
