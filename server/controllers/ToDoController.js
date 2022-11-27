import ToDo from '../models/ToDoModel.js';

const getToDo = async (req, res) => {
    const todo = await ToDo.find();
    res.send(todo);
}

const addToDo = (req, res) => {
    const { text } = req.body;

    ToDo
        .create({ text })
        .then(() => res.set(201).send("Added Successfully..."))
        .catch((err) => console.log(err));
}

const deleteToDo = (req, res) => {
    const { _id } = req.body;
    ToDo
        .findByIdAndDelete(_id)
        .then(() => res.set(201).send("Deleted Successfully..."))
        .catch((err) => console.log(err));
}

const updateToDo = (req, res) => {
    const { _id, text } = req.body;
    
    ToDo
        .findByIdAndUpdate(_id, { text })
        .then(() => res.set(201).send("Updated Successfully..."))
        .catch((err) => console.log(err));
}

export { getToDo, addToDo, deleteToDo, updateToDo };