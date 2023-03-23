import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  //Protect the page
  useEffect(() => {
    const getData = async () => {
      if (loading) return;
      if (!user) return route.push("/auth/login");
    };

    getData();
  }, [user, loading]);

  return (
    <div>
      <div className="max-w-[400px] mx-auto">
        <div className="bg-[#1B2730]">
          <h1>Dashboard</h1>
          <div>Posts</div>
          <button onClick={() => auth.signOut()}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
