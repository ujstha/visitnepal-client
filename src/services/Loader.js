import React from "react";
import { LinearProgress, CircularProgress } from "@material-ui/core";
import "../assets/css/loader.css";

export function Loader(isLoading) {
  if (isLoading) {
    return (
      <div className="loader">
        <LinearProgress color="primary" />
      </div>
    );
  }
}

export function CircularLoader(isLoading) {
  if (isLoading) {
    return (
      <div className="circular-loader">
        <CircularProgress color="primary" />
      </div>
    );
  }
}

export function SimpleLoader() {
  return <CircularProgress color="primary" style={{ height: 20, width: 20 }} />;
}
