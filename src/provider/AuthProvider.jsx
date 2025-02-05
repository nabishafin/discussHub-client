import React, { createContext, useEffect, useState, } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '@/firebase.init';
import toast from 'react-hot-toast';
import useAxiosPublic from '@/hooks/useAxiosPublic';




export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [gold, setGold] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()


    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // update user profile
    const updateUserProfile = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        });
    };

    // hold user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = {
                    email: currentUser.email
                }

                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }
            setLoading(false);
        });
        return () => unsubscribe();  // Cleanup subscription on unmount
    }, []);


    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout user
    const logOut = async () => {
        setLoading(true)
        return signOut(auth)
    }


    const signInWithGoogle = async () => {

        try {
            setLoading(true); // Set loading state to true

            // Trigger Google sign-in
            const result = await signInWithPopup(auth, googleProvider);

            // Get user information from the result
            const user = result.user;
            const email = user.email; // User's email
            const displayName = user.displayName; // User's display name
            const userInfo = {
                email: email,
                name: displayName,
            };

            // Save user to backend
            await axiosPublic.post('/users', userInfo);
            // Display success message with user info
            toast.success(`Logged in as ${displayName} (${email})`);

            // Redirect after successful sign-in
            window.location.href = "/"

        } catch (error) {
            // Handle the error
            toast.error(error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };



    const authInfo = {
        createUser,
        updateUserProfile,
        signInWithGoogle,
        setUser,
        signIn,
        logOut,
        setSearchTerm,
        setGold,
        user,
        searchTerm,
        gold,
        loading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
