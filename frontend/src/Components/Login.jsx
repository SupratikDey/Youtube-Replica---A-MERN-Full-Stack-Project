// Creating a seperate header for Login page / sign up page for user

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

function Login() {
    return (
        <div>
            <h1>Sign In</h1>
            <form>
                {/* Here we add value to the searched word stays on bar */}
                <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default Login;