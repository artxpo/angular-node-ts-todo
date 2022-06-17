import { Response, Request } from "express";
import { ITodo } from "../../models/Todo";
import Todo from "../../models/todoSchema";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json(todos);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "name" | "status">;

    const todo: ITodo = new Todo({
      name: body.name,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save().then();
    const allTodos: ITodo[] = await Todo.find();

    res.status(201).json({
      message: "Todo added!",
      todo: newTodo,
      todos: allTodos,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo updated!",
      todo: updateTodo,
      todos: allTodos,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted!",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export { getTodos, addTodo, deleteTodo, updateTodo };
