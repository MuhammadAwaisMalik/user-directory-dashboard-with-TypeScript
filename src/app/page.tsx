// @ imopprt dependencies
import { z } from "zod";
// @ import pages
import HomePage from "@/js/pages/home";
// @ import components
import EmptyState from "@/js/components/emptyStates";
import ErrorMessage from "@/js/components/errorMessage";

const UserSchema = z.object({
  name: z.object({
    first: z.string(),
    last: z.string(),
  }),
  email: z.string().email(),
  gender: z.string(),
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
  }),
  picture: z.object({
    thumbnail: z.string().url(),
    large: z.string().url(),
  }),
});

const ApiResponseSchema = z.object({
  results: z.array(UserSchema),
  info: z.object({}).passthrough(),
});

type User = z.infer<typeof UserSchema>;

export default async function Home() {
  let users: User[] = [];
  let errorMessage = "";

  try {
    const res = await fetch("https://randomuser.me/api/?results=50");
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    // ✅ Validate and parse the API response
    const parsed = ApiResponseSchema.parse(data);

    users = parsed.results;
  } catch (error) {
    if (error instanceof z.ZodError) {
      errorMessage = "Invalid API response structure: " + error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
  }

  if (errorMessage) return <ErrorMessage message={errorMessage} />;
  if (users?.length === 0) return <EmptyState message="No users found." />;

  return <HomePage data={users} />;
}
