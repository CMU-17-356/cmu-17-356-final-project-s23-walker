
async function handleLogin (userEmail : string, userPassword : string) : Promise<string | undefined> {
    const getUser = async (email: string) => {
        const response = await fetch(`/api/users/${email}`);
        return response
    };
    const login = fetch("/api/auth/login", {
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