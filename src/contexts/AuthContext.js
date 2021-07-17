import React, { useState, useContext, useEffect } from "react";
import { auth } from "../components/firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();

	function signup(email, password) {
		console.log("email in authContext", email);
		console.log("password in authContext", password);
		return auth.createUserWithEmailAndPassword(email, password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
