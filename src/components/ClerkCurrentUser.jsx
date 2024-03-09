import { currentUser } from '@clerk/nextjs';
 
export default async function ClerkCurrentUser() {
  const user = await currentUser();
 
  if (!user) return <div>Not logged in</div>;
  return user.id;
}