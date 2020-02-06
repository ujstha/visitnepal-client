import React, { Component } from "react";
import { PhotoSwipeGallery } from "react-photoswipe";
import "react-photoswipe/lib/photoswipe.css";

export default class UserPhotos extends Component {
  getThumbnailContent = item => {
    return <img src={item.thumbnail} alt="thumbnail" />;
  };
  render() {
    const { userImages } = this.props;
    let backdrops = userImages.map(image => ({
      src: `${`${process.env.REACT_APP_IMAGEURL}/profile_images/` +
        image.profile_image}`,
      thumbnail: `${`${process.env.REACT_APP_IMAGEURL}/profile_images/` +
        image.profile_image}`,
      w: 900,
      h: 1200
    }));
    return (
      <>
        <PhotoSwipeGallery
          items={backdrops}
          thumbnailContent={this.getThumbnailContent}
        />
      </>
    );
  }
}
