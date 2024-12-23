"use client";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./navigation.module.css";

const DropdownMenu = ({ toggleDropdown }: { toggleDropdown: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setIsOpen((prevState) => !prevState);
    toggleDropdown();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully!");
      router.push("/"); // Redirect to the homepage or login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
    handleButtonClick(); // Close the dropdown after logout
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.navheader}>
        <Link href="/" className="logo-link2">
          <Image
            src="/nav-titles/quest-nav.svg"
            alt="Elif Çakmak Logo"
            width={200}
            height={200}
            className={styles.questImage}
          />
        </Link>
        <nav>
          <button className={styles.dropdownButton} onClick={handleButtonClick}>
            Menu
          </button>
          {isOpen && (
            <div className={styles.dropdown}>
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="/000002/townhall" className={styles.dropdownLink} onClick={handleButtonClick}>
                    Town Hall
                  </Link>
                </li>
                <li>
                  <Link href="/000002/myquest" className={styles.dropdownLink} onClick={handleButtonClick}>
                    My Quest
                  </Link>
                </li>
                <li>
                  <Link href="/000002/leaderboards" className={styles.dropdownLink} onClick={handleButtonClick}>
                    Leaderboards
                  </Link>
                </li>
                <li>
                  <Link href="/000002/inventioncenter" className={styles.dropdownLink} onClick={handleButtonClick}>
                    Invention Center
                  </Link>
                </li>
                <li>
                  <Link href="/000002/myteam" className={styles.dropdownLink} onClick={handleButtonClick}>
                    My Team
                  </Link>
                </li>
                <li>
                  <Link href="/000002/businesscenter" className={styles.dropdownLink} onClick={handleButtonClick}>
                    Business Center
                  </Link>
                </li>
                <li>
                  <Link href="/000002/educationcenter" className={styles.dropdownLink} onClick={handleButtonClick}>
                    Education Center
                  </Link>
                </li>
                <li>
                  <Link href="/000002/charitycenter" className={styles.dropdownLink} onClick={handleButtonClick}>
                    Charity Center
                  </Link>
                </li>
                <li>
                  <button className={styles.dropdownLink} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default DropdownMenu;
