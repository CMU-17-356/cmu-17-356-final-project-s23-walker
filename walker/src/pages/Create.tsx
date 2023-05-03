import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import styles from "./Login.module.css";
import logo from "../assets/logo.png";
import handleLogin from "../components/handleLogin";
import { BACKEND_URL } from "../assets/constants";
import { UserContext } from "../App";

function Create(): JSX.Element {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // access the form values using the "get" method of the FormData object
        const email = formData.get("email");
        const password = formData.get("password");
        const person_name = formData.get("name");
        const pet_name = formData.get("pet_name");
        const group = formData.get("group");

        const response = await fetch(`${BACKEND_URL}/users/createandjoin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                person_name: person_name,
                pet_name: pet_name,
                group: group,
            }),
        });
        response.json().then((data) => {
            handleLogin(email as string, password as string).then((success) => {
                const sessionUser = sessionStorage.getItem("user");
                if (sessionUser) {
                    setUser(JSON.parse(sessionUser));
                }
                success
                    ? navigate(`/co-op-home/${data.coop_id}`)
                    : alert("Login failed in create");
            });
        });
    };

    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="Walker logo" />
            <h1 className="subheading">
                Create a New Walker Pet Care Co-Op Here!
            </h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label className="form-field" htmlFor="email">
                        Email
                    </label>
                    <input
                        placeholder="Add text"
                        type="email"
                        id="email"
                        name="email"
                    />
                </div>
                <div>
                    <label className="form-field" htmlFor="password">
                        Password
                    </label>
                    <input
                        placeholder="Add text"
                        type="password"
                        id="password"
                        name="password"
                    />
                </div>
                <div>
                    <label className="form-field" htmlFor="name">
                        Your Name
                    </label>
                    <input
                        placeholder="Add text"
                        type="text"
                        id="name"
                        name="name"
                    />
                </div>
                <div>
                    <label className="form-field" htmlFor="pet_name">
                        Your Pet's Name
                    </label>
                    <input
                        placeholder="Add text"
                        type="text"
                        id="pet_name"
                        name="pet_name"
                    />
                </div>
                <div>
                    <label className="form-field" htmlFor="group">
                        Group Name
                    </label>
                    <input
                        placeholder="Add text"
                        type="text"
                        id="group"
                        name="group"
                    />
                </div>
                <button type="submit" className="btn">
                    Create New Co-Op
                </button>
            </form>
        </div>
    );
}
export default Create;
