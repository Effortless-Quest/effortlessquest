"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Dynamically import the router to ensure it's only available on the client
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Link from "next/link"; // Import Link for client-side navigation
import styles from "./navigation.module.css";

// Dynamically import the useRouter hook from Next.js
const DynamicRouter = dynamic(() => import("next/router").then((mod) => mod.useRouter), { ssr: false });

interface DropdownMenuProps {
  toggleDropdown: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ toggleDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [router, setRouter] = useState<any>(null); // Store the router

  // Handle the opening and closing of the dropdown menu
  const handleButtonClick = () => {
    setIsOpen((prevState) => !prevState);
    toggleDropdown(); // Call the function passed from the parent
  };

  // Handle user logout and close dropdown
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully!");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });

    handleButtonClick(); // Close the dropdown after logout
  };

  // Generic function to handle link click (close dropdown and navigate)
  const handleLinkClick = (href: string) => {
    handleButtonClick(); // Close the dropdown
  };

  // Set isClient to true once the component is mounted
  useEffect(() => {
    const routerInstance = DynamicRouter(); // Initialize the router dynamically
    setRouter(routerInstance); // Store the router instance
  }, []);

  return (
    <nav>
      <button className={styles.dropdownButton} onClick={handleButtonClick}>
        Menu
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <ul className={styles.dropdownMenu}>
            <li>
              <Link href="/000002/townhall" passHref>
                <button onClick={() => handleLinkClick("/000002/townhall")} className={styles.dropdownLink}>
                  Town Hall
                </button>
              </Link>
            </li>
            <li>
              <Link href="/000002/myquest" passHref>
                <button onClick={() => handleLinkClick("/000002/myquest")} className={styles.dropdownLink}>
                  My Quest
                </button>
              </Link>
            </li>
            <li>
              <Link href="/000002/leaderboards" passHref>
                <button onClick={() => handleLinkClick("/000002/leaderboards")} className={styles.dropdownLink}>
                  Leaderboards
                </button>
              </Link>
            </li>
            <li>
              <Link href="/000002/inventioncenter" passHref>
                <button onClick={() => handleLinkClick("/000002/inventioncenter")} className={styles.dropdownLink}>
                  Invention Center
                </button>
              </Link>
            </li>
            <li>
              <Link href="/000002/myteam" passHref>
                <button onClick={() => handleLinkClick("/000002/myteam")} className={styles.dropdownLink}>
                  My Team
                </button>
              </Link>
            </li>
            <li>
              <Link href="/000002/businesscenter" passHref>
                <button onClick={() => handleLinkClick("/000002/businesscenter")} className={styles.dropdownLink}>
                  Business Center
                </button>
              </Link>
            </li>
            <li>
              <Link href="/000002/educationcenter" passHref>
                <button onClick={() => handleLinkClick("/000002/educationcenter")} className={styles.dropdownLink}>
                  Education Center
                </button>
              </Link>
            </li>
            <li>
              <Link href="/000002/charitycenter" passHref>
                <button onClick={() => handleLinkClick("/000002/charitycenter")} className={styles.dropdownLink}>
                  Charity Center
                </button>
              </Link>
            </li>
            {/* Add logout button */}
            <li>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default DropdownMenu;
