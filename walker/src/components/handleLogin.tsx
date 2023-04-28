
async function handleLogin (userEmail : string, userPassword : string) : Promise<string | undefined> {
    const BACKEND_URL = process.env.REACT_APP_PROD === "true" ? process.env.REACT_APP_BACKEND_URL_PROD : process.env.REACT_APP_BACKEND_URL_DEV
    const getUser = async (email: string) => {
        const response = await fetch(`${BACKEND_URL}/users/${email}`);
        return response
    };
    const login = fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        }),
    })
    .then(async (res) => {
        const status = res.status
        try {
            const resJson = await res.json()
            if (status === 200) {
                const token = resJson.token as string
                sessionStorage.setItem("token", token);
                const userResponse = await getUser(userEmail)
                const user = await userResponse.json()
                sessionStorage.setItem("user", JSON.stringify(user));
                return user.coop_id
            }
            else {
                console.log(resJson.message)
                return undefined
            }
        }
        catch (e) {
            console.log(e)
            return undefined
        }
    })
    return login
}

export default handleLogin