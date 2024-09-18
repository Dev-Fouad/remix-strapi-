import { json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@vercel/remix";

// import profile card component
import ProfileCard from "~/components/ProfileCard";

// import get profiles function
import { getProfiles } from "~/models/profiles.server";

// loader data type definition
type Loaderdata = {
  // this implies that the "profiles type is whatever type getProfiles resolves to"
  profiles: Awaited<ReturnType<typeof getProfiles>>;
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// loader for route
export const loader = async () => {
  return json<Loaderdata>({
    profiles: await getProfiles(),
  });
};

export default function Index() {
  const { profiles } = useLoaderData<any>() as Loaderdata;

  return (
    <section className="site-section profiles-section">
      <div>
        <header className="section-header">
          <h2 className="text-4xl">Explore profiles</h2>
          <p>Find and connect with amazing people all over the world!</p>
        </header>
        {profiles.length > 0 ? (
          <ul className="profiles-list">
            {profiles.map((profile) => (
              <li key={profile.id} className="profile-item">
                <ProfileCard profile={profile} preview={false} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No profiles yet 🙂</p>
        )}{" "}
      </div>
    </section>
  );
}
