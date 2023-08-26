import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoute = (props) => {
	if (localStorage.getItem("token")) {
		return <Navigate to="/" />;
	} else {
		return props.children;
	}
};

PublicRoute.propTypes = {
	children: PropTypes.node.isRequired, // This validates that 'children' is a node (React node) and is required.
};

export default PublicRoute;