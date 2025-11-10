import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center bg-black">
      <SignIn />
    </main>
  );
}



// in our src we can create a "(auth)" folder and can keep the sign in and sign up folders in them
