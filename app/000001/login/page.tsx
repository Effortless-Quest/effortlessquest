"use client"; // Required for client-side rendering

import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import useRouter
import { auth } from "../../../firebase/firebaseConfig";
import "./auth.css";
import CustomCursor from "../../000000/0-0-cursor/page";
import Navigation from "../../000000/0-0-navigation/navigation";
import Footer from "../../000000/0-0-footer/footer";
import Image from "next/image";

export default function Home() {
  const router = useRouter(); // Initialize useRouter
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UseEffect hook to check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/000002/townhall"); // Redirect to the townhall page if logged in
      }
    });
    return () => unsubscribe(); // Cleanup listener
  }, [router]);

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google login successful!");
      router.push("/000002/townhall"); // Redirect to the townhall page
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  // Email/Password Sign-In Handler
  const handleEmailPasswordSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Email login successful!");
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
          <div className="auth-card email-card">
            <h1>Email Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="email-login">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button onClick={handleEmailPasswordSignIn} className="email-btn login-button">
                Login with Email
              </button>
            </div>
          </div>

          <div className="auth-card google-card"> 
            <h1>Google Login</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleGoogleSignIn} className="google-btn login-button">
              <Image
                src="/elif-logo/google.png" // Path to your image
                alt="Google Logo"
                width={24} // Set width for the image
                height={24} // Set height for the image
                className="google-logo"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
