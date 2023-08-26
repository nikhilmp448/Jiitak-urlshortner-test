import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
	if (localStorage.getItem("token")) {
		return props.children;
	} else {
		return <Navigate to="/login" />;
	}
};

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired, // This validates that 'children' is a node (React node) and is required.
};

export default ProtectedRoute;