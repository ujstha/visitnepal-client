import React from "react";
import { CircularProgress } from "@material-ui/core";
import "../assets/css/loader.css";

export function Loader(isLoading) {
  if (isLoading) {
    return (
      <div className="loader">
        <CircularProgress color="primary" />
      </div>
    );
  }
};
