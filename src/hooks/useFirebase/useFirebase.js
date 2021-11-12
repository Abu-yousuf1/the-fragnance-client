import { useEffect, useState } from "react"
import swal from 'sweetalert';
import initializeAuthentication from "../../Pages/Authenticaiton/firebase/firebase.init"
import { getAuth, signOut, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";



initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [err, setErr] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    console.log(isAdmin);
    const auth = getAuth();

    const registration = (email, password, name, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const newUser = { email, displayName: name }
                setUser(newUser)
                saveUser(name, email)
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    swal("Good job!", "Congratulations you are successfully sign up!", "success")
                    history.replace('/')
                })
                    .catch((err) => {
                        setErr(err.message)
                    })
                setErr('')
            })
            .catch((err) => {
                setErr(err.message)
            })
            .finally(() => setIsLoading(false))
    }

    // Login with email password.................
    const signIn = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                swal("Good job!", "Congratulations you are successfully sign in!", "success")
                const destination = location?.state?.from || "/"
                history.push(destination)
                setErr('')
            })
            .catch((err) => {
                setErr(err.message)
            })
            .finally(() => setIsLoading(false))
    }

    // user log out ............................
    const logout = () => {
        swal({
            title: "Are you sure?",
            text: "You went to log Out!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your are successfully log Out!", {
                        icon: "success",
                    });

                    signOut(auth)
                        .then(() => {

                            setErr("")
                        })
                        .catch((error) => {
                            setErr(error.message)
                        })
                        .finally(() => setIsLoading(false))

                } else {
                    swal("Welcome to again!");

                }
            })



    }



    // user observation.............
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
        });
        // return () => unsubscribe;
    }, [])



    // pass user information in database.......... 
    const saveUser = (name, email) => {
        const user = { name, email }
        fetch('http://localhost:5000/user', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }

    // admin verification.........
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => setIsAdmin(data.admin))
    }, [user.email])

    return {
        user,
        err,
        registration,
        signIn,
        isLoading,
        logout,
        isAdmin
    }


}
export default useFirebase;