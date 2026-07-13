const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../model/users");
const mailSender = require("../utils/mailSender");
const passwordUpdated = require("../email/templates/passwordUpdate");

exports.resetPasswordToken = async (req, res) => {
    try {

        // Step 1: Get email from frontend
        const { email } = req.body || {};

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        // Step 2: Check user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Step 3: Generate unique token
        const token = crypto.randomUUID();

        // Step 4: Save token and expiry time
        await User.findOneAndUpdate(
            { email },
            {
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        // Step 5: Create frontend URL
        const url = `http://localhost:3000/update-password/${token}`;

        // Step 6: Send email with the reset link
        await mailSender(
            email,
            "Password Reset Link",
            `<div style="font-family: Arial, sans-serif;">
                <h2>Password Reset Requested</h2>
                <p>Click the link below to reset your password. This link is valid for 5 minutes.</p>
                <a href="${url}">${url}</a>
                <p>If you did not request this, please ignore this email.</p>
            </div>`
        );

        console.log(url);

        // Step 7: Response
        return res.status(200).json({
            success: true,
            message: "Reset Password Link Generated",
            url,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error generating reset link",
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {

        // Step 1: Get data from frontend
        const {
            password,
            confirmPassword,
            token,
        } = req.body || {};

        if (!password || !confirmPassword || !token) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Step 2: Check passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Step 3: Find user using token
        const user = await User.findOne({
            resetPasswordToken: token,
        });

        // Step 4: Check token exists
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid token",
            });
        }

        // Step 5: Check token expiry
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token expired",
            });
        }

        // Step 6: Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 7: Update password
        await User.findByIdAndUpdate(
            user._id,
            {
                password: hashedPassword,

                // Remove token after successful use
                resetPasswordToken: undefined,
                resetPasswordExpires: undefined,
            }
        );

        // Step 8: Send confirmation email (best-effort, don't fail the request if this errors)
        try {
            await mailSender(
                user.email,
                "Password Updated Successfully",
                passwordUpdated(user.firstName)
            );
        } catch (mailError) {
            console.log("could not send password update email", mailError);
        }

        // Step 9: Success response
        return res.status(200).json({
            success: true,
            message: "Password reset successful",
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Unable to reset password",
        });
    }
};
