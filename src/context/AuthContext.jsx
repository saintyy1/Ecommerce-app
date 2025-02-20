import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
  onAuthStateChanged,
  signInWithPopup,
  sendEmailVerification,
  applyActionCode
} from "firebase/auth";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // Ensure user data is fresh
        setCurrentUser({ ...user }); // Update state with new emailVerified status
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  async function signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user); // Send email verification
  
      // Sign out immediately after sign-up
      await signOut(auth);
      
      console.log("Sign-up successful! Please verify your email before signing in.");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }

  async function resetPassword(email) {
    try {
      const actionCodeSettings = {
        url: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
        handleCodeInApp: true,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

  async function confirmReset(oobCode, newPassword) {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
    } catch (error) {
      console.error("Error confirming password reset:", error.message);
      throw error;
    }
  }

  const resendVerificationEmail = async (email) => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser);
        alert("Verification email sent. Check your inbox.");
      } catch (error) {
        console.error("Error resending verification email:", error);
      }
    }
  };

  async function applyVerificationCode(oobCode) {
    try {
      if (!oobCode) {
        throw new Error("Invalid or missing verification code.");
      }
  
      await applyActionCode(auth, oobCode); // Apply the verification code
  
      // Sign out to refresh Firebase authentication state
      await signOut(auth);
      console.log("Email verified! Please sign in again.");
  
    } catch (error) {
      console.error("Error verifying email:", error.message);
      throw new Error(error.message || "Invalid or expired verification link.");
    }
  }
  
  
  // Google Sign-In Function
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User signed in with Google!");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    confirmReset,
    signInWithGoogle,
    resendVerificationEmail,
    applyVerificationCode,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
