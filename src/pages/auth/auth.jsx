
import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./auth.scss"
import { Component } from "react";
// import Home from "../home/Home";
import { useNavigate } from "react-router-dom";

const Spinner = () => {

    return (
        <div>
                <span className="container">
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                </span>
    
        </div>
    );
};


// export default function Auth(props) {
// //   let [authMode, setAuthMode] = useState("signin")

// //   const changeAuthMode = () => {
// //     setAuthMode(authMode === "signin" ? "signup" : "signin")
// //   }
//   const verifyCreds = () => {
//     setAuthMode(authMode === "signin" ? "signup" : "signin")
//   }

// //   if (authMode === "signin") {
//     return (
//       <div className="Auth-form-container">
//         <form className="Auth-form"  onSubmit={this.handleSubmit}>
//           <div className="Auth-form-content">
//             <h1 className="Auth-form-title">REVIEW TRACKER</h1>
//             <h3 className="Auth-form-title">Log In</h3>
//             {/* <div className="text-center">
//               Not registered yet?{" "}
//               <span className="link-primary" onClick={changeAuthMode}>
//                 Sign Up
//               </span>
//             </div> */}
//             <div className="form-group mt-3">
//               <label>Username</label>
//               <input
//                 type="username"
//                 className="form-control mt-1"
//                 placeholder="Enter username"
//               />
//             </div>
//             <div className="form-group mt-3">
//               <label>Password</label>
//               <input
//                 type="password"
//                 className="form-control mt-1"
//                 placeholder="Enter password"
//               />
//             </div>
//             <div className="d-grid gap-2 mt-3">
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </div>
//             {/* <p className="text-center mt-2">
//               Forgot <a href="#">password?</a>
//             </p> */}
//           </div>
//         </form>
//       </div>
//     )
//   }

// //   return (
// //     <div className="Auth-form-container">
// //       <form className="Auth-form">
// //         <div className="Auth-form-content">
// //           <h3 className="Auth-form-title">Sign In</h3>
// //           <div className="text-center">
// //             Already registered?{" "}
// //             <span className="link-primary" onClick={changeAuthMode}>
// //               Sign In
// //             </span>
// //           </div>
// //           <div className="form-group mt-3">
// //             <label>Full Name</label>
// //             <input
// //               type="email"
// //               className="form-control mt-1"
// //               placeholder="e.g Jane Doe"
// //             />
// //           </div>
// //           <div className="form-group mt-3">
// //             <label>Email address</label>
// //             <input
// //               type="email"
// //               className="form-control mt-1"
// //               placeholder="Email Address"
// //             />
// //           </div>
// //           <div className="form-group mt-3">
// //             <label>Password</label>
// //             <input
// //               type="password"
// //               className="form-control mt-1"
// //               placeholder="Password"
// //             />
// //           </div>
// //           <div className="d-grid gap-2 mt-3">
// //             <button type="submit" className="btn btn-primary">
// //               Submit
// //             </button>
// //           </div>
// //           {/* <p className="text-center mt-2">
// //             Forgot <a href="#">password?</a>
// //           </p> */}
// //         </div>
// //       </form>
// //     </div>
// //   )
// // }


class AuthComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            is_user_authorized: false,
            errorText: "",
            loading: false
        };
    }

    handleUsernameChange = (event) => {
        // console.log("username value", value)
        this.setState({
            username: event.target.value
        });
        // console.log("username", this.state.username)
        // console.log("username value", value)
        // console.log("username event", event)
    };

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    submitUser = () => {
        console.log("Submit user", this.state.username, ":", this.state.password)
        this.setState({
            loading: true
        });
        fetch("https://matrik.pythonanywhere.com/user/", {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    loading: false
                });
                console.log("data", data)
                if (data.is_user_authorized) {
                    this.setState({
                        is_user_authorized: true
                    });
                    this.props.navigate('/');
                    // console.log("data user auth", data.is_user_authorized)
                    // console.log("stae user auth", this.state.is_user_authorized)
                }
                else {
                    this.setState({
                        username: "",
                        password: "",
                        errorText: "Username or password is incorrect!"
                    });

                }
            })
            .catch((err) => {
                console.log(err.message);
            });

        // if(this.state.is_user_authorized){
        //     this.props.navigate('/');
        // }
        // else{
        //     this.setState({
        //         username: "",
        //         password: "",
        //         errorText: "Username or password is incorrect!"
        //     });

        // }
    };

    // componentDidUpdate(){
    //     if(this.state.is_user_authorized){
    //         this.props.navigate('/');
    //     }
    //     else{
    //         this.setState({
    //             username: "",
    //             password: "",
    //             errorText: "Username or password is incorrect!"
    //         });

    //     }
    // }

    render() {
        return (
            <div >
                {this.state.loading ?
                <Spinner />
                :
                null
            }
            <div className="Auth-form-container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h1 className="Auth-form-heading">REVIEW TRACKER</h1>
                        <h3 className="Auth-form-title">Log In</h3>
                        <h5 className="error">{this.state.errorText}</h5>
                        {/* <div className="text-center">
                      Not registered yet?{" "}
                      <span className="link-primary" onClick={changeAuthMode}>
                        Sign Up
                      </span>
                    </div> */}
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                name="username"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                name="password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" onClick={this.submitUser}>
                                Submit
                            </button>
                            {/* <input type="submit" value="Submit" /> */}
                        </div>
                        {/* <p className="text-center mt-2">
                      Forgot <a href="#">password?</a>
                    </p> */}
                    </div>
                </div>
            </div>
            {/* // <div>
            //     <form onSubmit={this.submitUser}>
            //         <label>
            //             Name:
            //             <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
            //         </label>
            //         <input type="submit" value="Submit" />
            //     </form>
            // </div> */}
            </div>
        )
    }
}

function Auth(props) {
    let navigate = useNavigate();
    return <AuthComponent {...props} navigate={navigate} />
}

export default Auth