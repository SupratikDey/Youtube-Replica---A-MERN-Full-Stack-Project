const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

function Register() {
    return (
        <div>
            <h1>Register</h1>
            <form>
                {/* Here we add value to the searched word stays on bar */}
                <input type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>  
                <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default Register;