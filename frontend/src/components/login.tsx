import React, {Component} from "react";


interface LoginState {
    email: string,
    password: string
}

class Login extends Component<{}, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    
    // handles user login to the system
    // The following resources are used as a reference
    // https://github.com/leul3/DI-project
    // https://stackoverflow.com/questions/59402649/how-can-i-use-history-pushpath-in-react-router-5-1-2-in-stateful-component
    // https://stackoverflow.com/questions/25761811/typescript-cannot-invoke-an-expression-whose-type-lack-of-signature
    handleSubmit = async (e: any) => {
        e.preventDefault();
        // Calls the backend api to login the user
        const response = await fetch("http://localhost:5555/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: this.state.email, password: this.state.password}
            )
        }
    );
        const json = await response.json()

        if (response.ok) {
            window.localStorage.setItem("token", json.token);
            // redirects user to the app / home page
            window.location.href = ('/home');
        } else {
            console.log(json);
        }
    }

    render() {
        return (
            <>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        Email:
                        <input
                            type={"text"}
                            onChange={(e) => this.setState({email: e.target.value})}
                        />
                    </div>
                    <div>
                        Password:
                        <input
                            type={"password"}
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                    </div>
                    <button>Login</button>
                </form>
            </>

        )
    }
}

export default (Login)