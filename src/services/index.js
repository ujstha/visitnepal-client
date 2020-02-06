import { Loader, CircularLoader, SimpleLoader } from "./Loader";
import { Toast } from "./Toast";
import {
  UserFunction,
  ResetPassword,
  ResetRole,
  UploadImage,
  UpdateImage,
  logOut
} from "./UserFunction";
import {
  CitiesFunction,
  AddCityImage,
  EditCities,
  EditCityImage,
  DeleteCity,
  DeleteImage
} from "./CitiesFunction";
import {
  GetUser,
  GetUserById,
  GetAllUsers,
  GetUserRole,
  GetUserDetails,
  GetUserImages,
  GetAllUserDetails,
  GetAllUserImages
} from "./UserData";
import {
  GetCities,
  GetCitiesImages,
  GetCityById,
  GetImageByCityId,
  GetRatingByCityId,
  GetAvgRatingByCityId,
  GetCommentByCityId
} from "./CitiesData";
import {
  CommentFunction,
  CommentFunctionEdit,
  DeleteComment,
  DeleteAllComment
} from "./CommentFunction";
import {
  GetRating,
  RatingFunction,
  RatingFunctionEdit
} from "./RatingFunction";
import {
  SlidesFunction,
  UpdateSlideStatus,
  GetSlides,
  GetSlideById,
  EditSlides,
  DeleteSlide
} from "./SlidesFunction";

export {
  logOut,
  GetUserById,
  UserFunction,
  UploadImage,
  UpdateImage,
  ResetPassword,
  ResetRole,
  CitiesFunction,
  AddCityImage,
  EditCities,
  EditCityImage,
  DeleteCity,
  DeleteImage,
  Toast,
  Loader,
  CircularLoader,
  SimpleLoader,
  GetUser,
  GetAllUsers,
  GetUserRole,
  GetUserDetails,
  GetUserImages,
  GetAllUserDetails,
  GetAllUserImages,
  GetCities,
  GetCitiesImages,
  GetCityById,
  GetImageByCityId,
  GetRatingByCityId,
  GetAvgRatingByCityId,
  GetCommentByCityId,
  CommentFunction,
  CommentFunctionEdit,
  DeleteComment,
  DeleteAllComment,
  GetRating,
  RatingFunction,
  RatingFunctionEdit,
  SlidesFunction,
  UpdateSlideStatus,
  GetSlides,
  GetSlideById,
  EditSlides,
  DeleteSlide
};
