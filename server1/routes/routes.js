import express from 'express';
import { displayEvent, addEvent, updateEvent, deleteEvent } from "../controllers/event.controller.js";
import { getUser, getUsers, updateUser, deleteUser, login, register, logout } from "../controllers/user.controller.js";
import verifyToken from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/display-data', displayEvent);

router.post('/add-data', addEvent);

router.put('/update-data/:id', updateEvent);

router.delete('/delete/:id', deleteEvent);


// API - Users

router.get("/api/users", getUsers);

router.get("/api/users/:id", verifyToken, getUser);

router.put("/api/users/:id", updateUser);

router.delete("/api/users/:id", deleteUser);

// API - Auth

router.post("/api/auth/register", register);

router.post("/api/auth/login", login);

router.delete("/api/auth/logout", verifyToken, logout);

export { router };
