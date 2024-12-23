"use client"; // Required for client-side rendering

import { useState, useEffect } from "react";
import { signInWithPopup, GithubAuthProvider, onAuthStateChanged } from "firebase/auth";
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

  // GitHub Sign-In Handler
  const handleGitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("GitHub login successful!");
      router.push("/000002/townhall"); // Redirect to the townhall page
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
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
            <h1>Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleGitHubSignIn} className="github-btn">
              <img
                src="/elif-logo/github.svg"
                alt="GitHub Logo"
                className="github-logo"
              />
              Sign in with GitHub
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
