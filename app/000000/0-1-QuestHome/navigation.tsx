"use client";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Link from "next/link"; // Import Link for client-side navigation
import styles from "./navigation.module.css";

interface DropdownMenuProps {
  toggleDropdown: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ toggleDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <nav>
      <button className={styles.dropdownButton} onClick={handleButtonClick}>
        Menu
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          <ul className={styles.dropdownMenu}>
            <li>
              <Link href="/000002/townhall" legacyBehavior>
                <a className={styles.dropdownLink} onClick={handleButtonClick}>
                  Town Hall
                </a>
              </Link>
            </li>
            <li>
              <Link href="/000002/myquest" legacyBehavior>
                <a className={styles.dropdownLink} onClick={handleButtonClick}>
                  My Quest
                </a>
              </Link>
            </li>
            <li>
              <Link href="/000002/leaderboards" legacyBehavior>
                <a className={styles.dropdownLink} onClick={handleButtonClick}>
                  Leaderboards
                </a>
              </Link>
            </li>
            <li>
              <Link href="/000002/inventioncenter" legacyBehavior>
                <a className={styles.dropdownLink} onClick={handleButtonClick}>
                  Invention Center
                </a>
              </Link>
            </li>
            <li>
              <Link href="/000002/myteam" legacyBehavior>
                <a className={styles.dropdownLink} onClick={handleButtonClick}>
                  My Team
                </a>
              </Link>
            </li>
            <li>
              <Link href="/000002/businesscenter" legacyBehavior>
                <a className={styles.dropdownLink} onClick={handleButtonClick}>
                  Business Center
                </a>
              </Link>
            </li>
            <li>
              <Link href="/000002/educationcenter" legacyBehavior>
                <a className={styles.dropdownLink} onClick={handleButtonClick}>
                  Education Center
                </a>
              </Link>
            </li>
            <li>
              <Link href="/000002/charitycenter" legacyBehavior>
                <a className={styles.dropdownLink} onClick={handleButtonClick}>
                  Charity Center
                </a>
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
