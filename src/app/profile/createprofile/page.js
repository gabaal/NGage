
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"
import ClerkCurrentUser from "@/components/ClerkCurrentUser";

export default function NewProfile() {
  
  
  async function handleSaveProfile(formData) {
    'use server'
    
    const clerk_id = await ClerkCurrentUser()
    console.log(`Clerk ID returned from ClerkCurrentUser ${clerk_id}`)
    const name = formData.get("name")
    const display_name = formData.get("display_name")
    const email = formData.get("email")
    const bio = formData.get("bio")
    const date_of_birth = formData.get("date_of_birth")
    const location = formData.get("location")
    
    await sql `
    INSERT INTO users
      (clerk_id, name, display_name, email, bio, date_of_birth, location)
    VALUES
      (${clerk_id}, ${name}, ${display_name}, ${email}, ${bio}, ${date_of_birth}, ${location})
    `
    revalidatePath("/profile")
    redirect("/profile")

  }
  
  return (
    <div className="container mx-auto mt-8">
      <form action={handleSaveProfile} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block">Full Name</label>
          <input id="name" name="name" type="text" placeholder="Not shown to other users" required className="border border-gray-300 rounded-md w-full py-2 px-4" />
        </div>
        <div className="mb-4">
          <label htmlFor="display_name" className="block">Display Name</label>
          <input id="display_name" name="display_name" type="text" placeholder="Other users can see this" required className="border border-gray-300 rounded-md w-full py-2 px-4" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">Email Address</label>
          <input id="email" name="email" type="email" placeholder="Not shown to other users" required className="border border-gray-300 rounded-md w-full py-2 px-4" />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="block">Biography</label>
          <input id="bio" name="bio" type="text" placeholder="Other users can see this" className="border border-gray-300 rounded-md w-full py-2 px-4" />
        </div>
        <div className="mb-4">
          <label htmlFor="date_of_birth" className="block">Date of Birth, month and day only seen by other users</label>
          <input id="date_of_birth" name="date_of_birth" type="date" placeholder="Date of Birth," required className="border border-gray-300 rounded-md w-full py-2 px-4" />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block">Location</label>
          <input id="location" name="location" type="text" placeholder="Other users can see this" required className="border border-gray-300 rounded-md w-full py-2 px-4" />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
  
}