import React, { Component } from "react";
import { Card, CardActionArea, CardMedia, Button } from "@material-ui/core";

export default class Category extends Component {
  render() {
    const { cityCategories, className } = this.props;
    return (
      <>
        {cityCategories.length !== 0 && (
          <div className="mt-2">
            <h2 className="text-center">What to see in Nepal</h2>
            <div className="row mt-3">
              {cityCategories.map((category, index) => {
                return (
                  <div className="col-md-4 mt-3" key={index}>
                    <Card style={{ borderRadius: 0 }} elevation={20}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={category.category_name}
                          className={className}
                          height="250px"
                          image={
                            `${process.env.REACT_APP_IMAGEURL}/cover_images/` +
                            category.category_image
                          }
                          title={category.category_name}
                          key={index}
                        />
                        <div className="card-overlay">
                          <h4>{category.category_name}</h4>
                          <Button
                            size="medium"
                            color="primary"
                            variant="contained"
                            style={{ borderRadius: 0, marginTop: 10 }}
                          >
                            Read More
                          </Button>
                        </div>
                      </CardActionArea>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
}
