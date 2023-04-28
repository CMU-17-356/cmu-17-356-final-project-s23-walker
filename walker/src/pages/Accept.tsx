import styles from "./CoOp.module.css";
import logo from "../assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import handleLogin from "../components/handleLogin";

function Accept(): JSX.Element {
    const navigate = useNavigate();
    const { coop_id } = useParams();
    const handleSubmit = async (event: any) => {
        if (coop_id) {
            event.preventDefault();
            const formData = new FormData(event.target);
            // access the form values using the "get" method of the FormData object
            const email = formData.get("email");
            const password = formData.get("password");
            const person_name = formData.get("name");
            const pet_name = formData.get("pet_name");
            const res = await fetch("/api/users/joincoop", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        email : email,
                        password : password,
                        person_name : person_name,
                        pet_name : pet_name,
                    },
                    coop: coop_id
                }),
            })
            handleLogin(email as string, password as string).then((success) => {
                console.log(success)
                success ? navigate(`/co-op-home/${coop_id}`) : alert('Login failed in accept')
            })
        }
    };
    return (
        <div className={styles.container}>
            <img className={styles.logo} src={logo} alt="Walker logo" />
            <h1 className="subheading">
                Received an Invite to Join a Co-Op? Create Your Account Here!
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
                <button type="submit" className="btn">
                    Create New Account
                </button>
            </form>
        </div>
    );
}
export default Accept;
