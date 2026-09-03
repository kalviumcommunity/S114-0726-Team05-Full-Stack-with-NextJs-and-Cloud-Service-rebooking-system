import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword
} from "../services/userService.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await getUserProfile(req.user._id);

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await updateUserProfile(
      req.user._id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const {
      currentPassword,
      newPassword
    } = req.body;

    await changeUserPassword(
      req.user._id,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    next(error);
  }
};
