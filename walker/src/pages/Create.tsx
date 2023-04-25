import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import logo from "../assets/logo.png";

function Create({
    handleLogin,
}: {
    handleLogin: (email?: string) => void;
}): JSX.Element {
    const navigate = useNavigate();
    const handleSubmit = async (event: any) => {
        console.log(event.target);
        event.preventDefault();
        const formData = new FormData(event.target);

        // access the form values using the "get" method of the FormData object
        const email = formData.get("email");
        const password = formData.get("password");
        const person_name = formData.get("name");
        const pet_name = formData.get("pet_name");
        const group = formData.get("group");

        const response = await fetch("/api/users/createandjoin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email : email,
                password : password,
                person_name : person_name,
                pet_name : pet_name,
                group : group,
            }),
        });
        const data = await response.json();
        console.log(data);
        handleLogin(data.email);
        navigate(`/co-op-home/${data.coop_id}`);
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
