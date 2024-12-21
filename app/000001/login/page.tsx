"use client"; // Required for client-side rendering

import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged, // Added import here
} from "firebase/auth";
import { useRouter } from "next/navigation"; // Import useRouter
import { auth } from "../../../firebaseConfig";
import "./auth.css";
import CustomCursor from "../../000000/0-0-cursor/page";
import Navigation from "../../000000/0-0-navigation/navigation";
import Footer from "../../000000/0-0-footer/footer";

export default function Home() {
  const router = useRouter(); // Initialize useRouter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
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

  // Handle Email/Password Authentication
  const handleAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("User registered successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        router.push("/000002/townhall"); // Redirect to the townhall page
      }
      setEmail("");
      setPassword("");
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  // Handle Google Authentication
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert("Login with Google successful!");
      router.push("/000002/townhall"); // Redirect to the dashboard page
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to sign in with Google. Please try again.");
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
            <h1>{isRegister ? "Register" : "Login"}</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleAuth}>{isRegister ? "Register" : "Login"}</button>
            <button onClick={() => setIsRegister(!isRegister)}>
              Switch to {isRegister ? "Login" : "Register"}
            </button>
          </div>
          <div className="google-auth-card">
            <h2>Or Login with Google</h2>
            <button className="google-signin-btn" onClick={handleGoogleSignIn}>
              Login with Google
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
