import { auth, signIn, signOut } from "@/auth";
import AnimatedNavbar from "@/app/components/AnimatedNavbar";

const Navbar = async () => {
  const session = await auth();

  return (
    <AnimatedNavbar
      session={session}
      onSignOut={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      onSignIn={async () => {
        "use server";
        await signIn("github");
      }}
    />
  );
};

export default Navbar;
