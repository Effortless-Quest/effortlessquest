"use client"; // Required for client-side rendering

import { useState, useEffect } from "react";
import { GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"; // Corrected import
import { useRouter } from "next/navigation"; // Import useRouter
import { auth } from "../../../firebase/firebaseConfig";
import "./auth.css";
import CustomCursor from "../../000000/0-0-cursor/page";
import Navigation from "../../000000/0-0-navigation/navigation";
import Footer from "../../000000/0-0-footer/footer";

export default function Home() {
  const router = useRouter(); // Initialize useRouter
  const [error, setError] = useState("");

  // UseEffect hook to check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/000002/townhall"); // Redirect to the townhall page if logged in
      }
    });
    return () => unsubscribe(); // Cleanup listener
  }, [router]);

  // Handle GitHub Authentication
  const handleGitHubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider(); // Corrected provider name
      await signInWithPopup(auth, provider);
      alert("Login with GitHub successful!");
      router.push("/000002/townhall"); // Redirect to the townhall page
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to sign in with GitHub. Please try again.");
      }
    }
  };

  return (
    <div>
      <CustomCursor />
      <Navigation />
      <div className="home-container">
        <div className="auth-wrapper">
          <div className="auth-card">
            <h1>Login with GitHub</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleGitHubSignIn}>
              Login with GitHub
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
