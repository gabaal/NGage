import Link from "next/link";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"
import ClerkCurrentUser from "@/components/ClerkCurrentUser";

export default function NewPostPost() {
  
  async function handleSavePost(formData) {
    "use server"
    
    const title = formData.get("title")
    const content = formData.get("content")
    const clerk_id = await ClerkCurrentUser()
    
    await sql`INSERT INTO Posts (title, comment, user_clerk_id)
    VALUES (${title}, ${content}, ${clerk_id})`
    
    revalidatePath("/posts")
    redirect("/posts")
  }
  
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Add a Post</h1>
      <form action={handleSavePost} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block">Title</label>
          <input id="title" name="title" type="text" placeholder="Post Title" required className="border border-gray-300 rounded-md w-full py-2 px-4"/>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block">Content</label>
          <input id="content" name="content" type="text" placeholder="Post Content" required className="border border-gray-300 rounded-md w-full py-2 px-4"/>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Add Post
          </button>
        </div>
        <Link href="/posts" className="block text-center mt-2 text-indigo-600 hover:text-indigo-500">Back to Posts</Link>
      </form>
    </div>
  );
  
}