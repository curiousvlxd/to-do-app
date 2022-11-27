import { Router } from "express";
import { getToDo, addToDo, deleteToDo, updateToDo } from "../controllers/ToDoController.js";

const router = Router();

router.get("/get-todo", getToDo);

router.post("/add-todo", addToDo);

router.post("/delete-todo", deleteToDo);

router.post("/update-todo", updateToDo);

export default router;