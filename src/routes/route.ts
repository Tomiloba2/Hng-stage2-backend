import express from "express";
import { createUser, delete_AUser, get_AUser, update_AUser } from "../controllers/userControls.js";

const router = express.Router()

router.post('/', createUser)
router.get('/:id', get_AUser)
router.put('/:id', update_AUser)
router.delete('/:id', delete_AUser)

export default router;