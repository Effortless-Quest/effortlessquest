"use client"; 
import { useState, useEffect } from "react"; 
import { signOut } from "firebase/auth"; 
import { auth } from "../../../firebase/firebaseConfig"; 
import { useRouter } from "next/router"; 
import Link from "next/link"; 
import Image from "next/image"; 
import styles from "./navigation.module.css";

interface DropdownMenuProps {
  toggleDropdown: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ toggleDropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // To track if it's client-side rendering
  const router = useRouter(); // Initialize the router at the top level

  useEffect(() => {
    setIsClient(true); // Set to true once component is mounted on client side
  }, []); // Empty dependency array means this runs only once after the first render

  const handleButtonClick = () => {
    setIsOpen((prevState) => !prevState);
    toggleDropdown(); // Call the function passed from the parent
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully!");
      if (isClient) {
        router.push("/"); // Redirect to the homepage or login page after logout
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }

    handleButtonClick(); // Close the dropdown after logout
  };

  if (!isClient) {
    return null; // Return nothing during SSR
  }

  
  return (
    <div className={styles.navContainer}> {/* This wraps the entire nav in a floating card */}
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
                  <div className={styles.card}>
                    <Link href="/000002/townhall" legacyBehavior>
                      <a className={styles.dropdownLink} onClick={handleButtonClick}>
                        Town Hall
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.card}>
                    <Link href="/000002/myquest" legacyBehavior>
                      <a className={styles.dropdownLink} onClick={handleButtonClick}>
                        My Quest
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.card}>
                    <Link href="/000002/leaderboards" legacyBehavior>
                      <a className={styles.dropdownLink} onClick={handleButtonClick}>
                        Leaderboards
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.card}>
                    <Link href="/000002/inventioncenter" legacyBehavior>
                      <a className={styles.dropdownLink} onClick={handleButtonClick}>
                        Invention Center
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.card}>
                    <Link href="/000002/myteam" legacyBehavior>
                      <a className={styles.dropdownLink} onClick={handleButtonClick}>
                        My Team
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.card}>
                    <Link href="/000002/businesscenter" legacyBehavior>
                      <a className={styles.dropdownLink} onClick={handleButtonClick}>
                        Business Center
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.card}>
                    <Link href="/000002/educationcenter" legacyBehavior>
                      <a className={styles.dropdownLink} onClick={handleButtonClick}>
                        Education Center
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.card}>
                    <Link href="/000002/charitycenter" legacyBehavior>
                      <a className={styles.dropdownLink} onClick={handleButtonClick}>
                        Charity Center
                      </a>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.card}>
                    <button className={styles.dropdownLink} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
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
