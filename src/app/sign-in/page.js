import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">NGage sign in page</h1>
      <div className="flex justify-center"> 
        <SignIn />
      </div>
    </div>
  );
  
}