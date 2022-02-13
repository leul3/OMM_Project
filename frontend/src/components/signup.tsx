import React, {Component} from "react";


interface SignupState {
    email: string,
    password: string
}

class Signup extends Component<{}, SignupState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    
    // handles user signup to the system
    // The following resources are used as a reference
    // https://github.com/r-wittmann/DI-project
    // https://stackoverflow.com/questions/59402649/how-can-i-use-history-pushpath-in-react-router-5-1-2-in-stateful-component
    // https://stackoverflow.com/questions/25761811/typescript-cannot-invoke-an-expression-whose-type-lack-of-signature
    handleSubmit = async (e: any) => {
        e.preventDefault();
        // Calls the backend api to signup the user
        
        const response = await fetch("http://localhost:5555/users/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: this.state.email, password: this.state.password})
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
                <h2>Signup</h2>
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
                    <button>SignUp</button>
                </form>
            </>

        )
    }
}

export default (Signup)