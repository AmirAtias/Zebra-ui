import React from "react";
import { Redirect } from "react-router-dom";
import sendLog from "../../utils/Logger";

export default function withAuth(ComponentToProtect) {
  // eslint-disable-next-line react/display-name
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      fetch("http://localhost:5000/users/checkToken", {
        credentials: "include", // Don't forget to specify this if you need cookies
      })
        .then((res) => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          sendLog("error", err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  };
}
