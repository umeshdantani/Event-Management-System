import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv  from "dotenv"
import ApiResponse from '../utils/ApiResponse.js';
import User from "../models/user.js";

dotenv.config();

const cookieOptions = {
    domain: "localhost",
    maxAge: 24 * 60 * 60 * 1000,
    // httpOnly: true,
    sameSite: "none",
    secure: true
}

/**
 *  @description Get All Users
 *  @method GET
 */
const getUsers = (req, res) => {
    User.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while finding a users"
            })
        })
}

/**
 *  @description Get User by ID
 *  @method GET
 */
const getUser = (req, res) => {
    const userId = req.user._id; //req.params.id;

    User.findById(userId)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with Id: " + userId })
            } else {
                data.password = undefined;
                res.status(200).send(new ApiResponse(200, data, "Request Successfull"))
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while finding a user with Id: " + userId
            })
        })
}


/**
 *  @description Update User
 *  @method PUT
 */
const updateUser = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const userId = req.params.id;

    User.findByIdAndUpdate(userId, req.body)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found user with id: " + userId });
            else
                res.status(200).send({
                    message: "User updated successfully",
                    data: data
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while updating a user"
            })
        })
}


/**
 *  @description Delete User
 *  @method DELETE
 */
const deleteUser = (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found user with id: " + userId });
            else
                res.status(200).send({ message: "User deleted successfully" });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while deleting a user"
            })
        })
}


/**
 *  @description Create User
 *  @method POST
 */
const register = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const existedUser = await User.findOne({ email: req.body.email })

    if (existedUser) {
        return res.status(409).json(new ApiResponse(409, {}, "User with email already exists"));
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const newUser = new User({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });

    newUser.save()
        .then(data => {
            data = {
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email
            }
            return res.status(201).json(
                new ApiResponse(200, data, "User registered Successfully")
            );
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while creating a user"
            })
        })
}

/**
 *  @description Login User
 *  @method POST
 */
const login = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content can not be emtpy!" });
        return;
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(async (userData) => {
            if (!userData) {
                return res.status(401).json(new ApiResponse(401, [], "Invalid email or password"));
            }
            else {
                const isMatch = await bcrypt.compare(password, userData.password);
                if (isMatch) {
                    const token = jwt.sign(
                        { _id: userData._id, email: userData.email },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "1d" }
                    );
                    let data = {
                        _id: userData._id,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        email: userData.email,
                        token
                    };

                    return res.status(200)
                        .cookie("access_token", token, cookieOptions)
                        .json(new ApiResponse(200, data, "User logged In Successfully"));
                } else
                    return res.status(401).json(new ApiResponse(401, [], "Invalid email or password"));
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error while login a user"
            })
        })
}


/**
 *  @description Logout User
 *  @method DELETE
 */
const logout = (req, res) => {
    return res
        .status(200)
        .clearCookie("access_token", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged Out"))
}

export { getUser, getUsers, updateUser, deleteUser, login, register, logout };