import { sql } from "@vercel/postgres";
import ClerkCurrentUser from "./ClerkCurrentUser";

export default async function AddLike(postId) {
  const clerk_id = await ClerkCurrentUser()
 try {
  await sql`
    INSERT INTO post_likes (user_clerk_id, post_id)
    VALUES (clerk_id, ${post_id})`
  
  return true;
} catch (error) {
  console.error('Error adding like:', error);
  return false;
}
}