import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as fbSignOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../lib/firebase';

export interface UserProfileData {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  spaceRole?: string;
  favoritePlanet?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfileData | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfileData>) => Promise<void>;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Sync or fetch profile from Firestore when user logs in
  const syncUserProfile = async (currentUser: User) => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const data = snap.data() as UserProfileData;
        setProfile(data);
      } else {
        // Create new user profile document in Firestore
        const newProfile: UserProfileData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Kosmik Sayohatchi',
          email: currentUser.email || '',
          photoURL: currentUser.photoURL || '',
          spaceRole: 'Kosmik Tadqiqotchi',
          favoritePlanet: 'Yer (Earth)',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        try {
          await setDoc(userDocRef, newProfile);
          setProfile(newProfile);
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, `users/${currentUser.uid}`);
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // Fallback local representation if Firestore is pending rules or network
      setProfile({
        uid: currentUser.uid,
        displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'Kosmik Sayohatchi',
        email: currentUser.email || '',
        photoURL: currentUser.photoURL || '',
        spaceRole: 'Kosmik Tadqiqotchi',
        favoritePlanet: 'Yer (Earth)',
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncUserProfile(result.user);
      }
    } catch (err: unknown) {
      console.error('Google Sign In Error:', err);
      const errMsg = err instanceof Error ? err.message : 'Google orqali kirishda xatolik yuz berdi';
      setAuthError(errMsg);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      setProfile(null);
    } catch (err: unknown) {
      console.error('Sign Out Error:', err);
    }
  };

  const updateProfileData = async (data: Partial<UserProfileData>) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const updated = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    try {
      await updateDoc(userDocRef, updated);
      setProfile((prev) => (prev ? { ...prev, ...updated } : null));
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const clearAuthError = () => setAuthError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithGoogle,
        signOut,
        updateProfileData,
        isProfileModalOpen,
        setIsProfileModalOpen,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
