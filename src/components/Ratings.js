import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Progress, Rate } from "antd";

export default class Ratings extends Component {
  render() {
    const { ratings, cities, onChange, onEditChange } = this.props;
    return (
      <Paper elevation={1} className="p-2 px-4">
        <h3 className="mt-3">Ratings</h3>
        <div
          className="d-flex justify-content-center p-3"
          style={{ color: "#888", backgroundColor: "#f9f9f9" }}
        >
          {Number(cities.avg_rating) !== 0 ? (
            <span style={{ fontSize: 40 }}>
              <div className="d-flex justify-content-center">
                <Progress
                  type="circle"
                  percent={Number(cities.avg_rating).toFixed(1) * 2 * 10}
                  format={percent => (
                    <span>
                      <i
                        className="fa fa-star"
                        style={{
                          color: "rgba(245, 197, 24, 1)",
                          fontSize: 15
                        }}
                      ></i>
                      <br />
                      {(percent / 2 / 10).toFixed(1)}
                    </span>
                  )}
                />
              </div>
              {(localStorage.token || sessionStorage.token) &&
                ratings &&
                ratings.rating && (
                  <div style={{ fontSize: 18 }}>
                    You rated : 
                    <Rate
                      defaultValue={ratings.rating}
                      onChange={value => onEditChange(value, ratings.id)}
                    />
                  </div>
                )}
              {(localStorage.token || sessionStorage.token) && !ratings && (
                <div style={{ fontSize: 18 }}>
                  Give rating : <Rate onChange={value => onChange(value)} />
                </div>
              )}
            </span>
          ) : (
            <div className="text-center" style={{ fontSize: 20 }}>
              Not rated yet.
              <br />
              {localStorage.token || sessionStorage.token ? (
                <span style={{ fontSize: 18 }}>
                  Give rating : <Rate onChange={value => onChange(value)} />
                </span>
              ) : (
                <span style={{ fontSize: 18 }}>Login to give rating.</span>
              )}
            </div>
          )}
        </div>
      </Paper>
    );
  }
}
