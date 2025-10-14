import { List } from "../models/list.model.ts";
import { Todo } from "../models/todo.model.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { dateValidator, stringValidator } from "../utils/typeValidation.ts";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description, dueDate, list = "Inbox" } = req.body;

  if (!stringValidator.safeParse(title).success) {
    throw new ApiError(400, "Invalid Type: Invalid input type for the title");
  }

  if (dueDate) {
    if (!dateValidator.safeParse(dueDate).success) {
      throw new ApiError(400, "Invalid Type: Invalid input for the due date");
    }
  }

  if (description) {
    if (!stringValidator.safeParse(description).success) {
      throw new ApiError(
        400,
        "Invalid Type: Invalid input for the description",
      );
    }
  }

  let todoList = null;

  if (list) {
    if (!stringValidator.safeParse(list).success) {
      throw new ApiError(400, "Invalid Type: Invalid input for the list");
    }
    const findList = await List.findOne({
      name: list,
      owner: req.user._id,
    });

    if (findList) {
      todoList = findList;
    }
  }

  let userList;

  if (todoList !== null) {
    userList = todoList;
  } else {
    userList = (await List.findOne({
      name: "Inbox",
      owner: req.user._id,
    })) as any;
  }

  const createdTodo = await Todo.create({
    title,
    description: description || null,
    dueDate,
    owner: req.user._id,
    list: userList._id,
  });

  if (!createdTodo) {
    throw new ApiError(500, "Something went wrong while creating the todo");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdTodo, "Todo created successfully"));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const { title, description, dueDate, list } = req.body;

  if (!todoId) {
    throw new ApiError(400, "Invalid Todo ID");
  }

  const todo = (await Todo.findById(todoId)) as any;

  if (!todo) {
    throw new ApiError(400, "Todo Doesn't Exist");
  }

  if (!todo.owner.equals(req.user._id)) {
    throw new ApiError(401, "Unauthorized request");
  }

  if (title) {
    if (!stringValidator.safeParse(title).success) {
      throw new ApiError(400, "Invalid input for the title");
    }

    todo.title = title;
  }

  if (description) {
    if (!stringValidator.safeParse(description).success) {
      throw new ApiError(400, "Invalid input type for the description");
    }

    todo.description = description;
  }

  if (dueDate) {
    if (!dateValidator.safeParse(dueDate).success) {
      throw new ApiError(400, "Invalid input type for the date");
    }

    todo.dueDate = dueDate;
  }

  if (list) {
    if (!stringValidator.safeParse(list).success) {
      throw new ApiError(400, "Invalid input type for the list");
    }

    const newList = await List.findOne({
      name: list,
      owner: req.user._id,
    });

    if (!newList) {
      throw new ApiError(400, "List doesn't exist");
    }

    todo.list = newList._id;

    await newList.save({ validateBeforeSave: false });
  }

  await todo.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo updated successfully"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    throw new ApiError(400, "Invalid todo ID");
  }

  const todo = (await Todo.findById(todoId)) as any;

  if (!todo) {
    throw new ApiError(400, "Todo doesn't exist");
  }

  if (!todo.owner.equals(req.user._id)) {
    throw new ApiError(401, "Unauthorized request");
  }

  const removalFromList = await List.findByIdAndUpdate(todo.list, {
    $pull: {
      todos: todo._id,
    },
  });

  if (!removalFromList) {
    throw new ApiError(
      500,
      "Something went wrong while removing todo from the list",
    );
  }

  const deletedTodo = await Todo.deleteOne({
    _id: todoId,
  });

  if (!deletedTodo) {
    throw new ApiError(500, "Something went wrong while deleting the todo");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Todo deleted successfully"));
});
const getTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    throw new ApiError(400, "Invalid Todo ID");
  }

  const todo = (await Todo.findById(todoId)) as any;

  if (!todo) {
    throw new ApiError(500, "Something went wrong while fetching the todo");
  }

  if (!todo.owner._id.equals(req.user._id)) {
    throw new ApiError(401, "Unauthorized Request");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, todo, "Todo fetched successfully"));
});
const toggleTodoCompletion = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    throw new ApiError(400, "Invalid Todo ID");
  }

  const todo = (await Todo.findById(todoId)) as any;

  if (!todo) {
    throw new ApiError(400, "Todo Doesn't Exist");
  }

  if (!todo.owner.equals(req.user._id)) {
    throw new ApiError(401, "Unauthorized request");
  }

  const changeState = (prevState: boolean): boolean => !prevState;

  todo.isDone = changeState(todo.isDone);

  let todoState;

  if (todo.isDone === true) {
    todoState = "complete";
  } else {
    todoState = "incomplete";
  }

  await todo.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, todo, `Todo is marked as ${todoState}`));
});
const getAllTodos = asyncHandler(async (req, res) => {
  const { sortType, sortBy: sortByQuery, page = 1, limit = 10 } = req.query;

  const sortBy = (sortByQuery as string) || "createdAt";

  const sortStage = sortType == "asc" ? 1 : -1;

  const userTodos = await Todo.aggregate([
    {
      $match: {
        owner: req.user._id,
        isDone: false,
      },
    },
    {
      $lookup: {
        from: "lists",
        localField: "list",
        foreignField: "_id",
        as: "userList",
      },
    },
    {
      $unwind: "$userList",
    },
    {
      $sort: {
        [sortBy]: sortStage,
      },
    },
    {
      $skip: (Number(page) - 1) * Number(limit),
    },
    {
      $limit: Number(limit),
    },
    {
      $project: {
        id: 1,
        title: 1,
        description: 1,
        idDone: 1,
        dueDate: 1,
        createdAt: 1,
        updatedAt: 1,
        list: 1,
        listName: "$userList.name",
      },
    },
  ]);

  if (!userTodos) {
    throw new ApiError(
      500,
      "Something went wrong while getting the user todos",
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, userTodos, "User todos fetched successfully"));
});
const getCompletedTodos = asyncHandler(async (req, res) => {
  const { sortType, sortBy: sortByQuery, page = 1, limit = 10 } = req.query;
  const sortBy = (sortByQuery as string) || "updatedAt";

  const sortStage = sortType == "asc" ? 1 : -1;

  const userTodos = await Todo.aggregate([
    {
      $match: {
        owner: req.user._id,
        isDone: true,
      },
    },
    {
      $lookup: {
        from: "lists",
        localField: "list",
        foreignField: "_id",
        as: "userList",
      },
    },
    {
      $unwind: "$userList",
    },
    {
      $sort: {
        [sortBy]: sortStage,
      },
    },
    {
      $skip: (Number(page) - 1) * Number(limit),
    },
    {
      $limit: Number(limit),
    },
    {
      $project: {
        id: 1,
        title: 1,
        description: 1,
        idDone: 1,
        dueDate: 1,
        createdAt: 1,
        updatedAt: 1,
        list: 1,
        listName: "$userList.name",
      },
    },
  ]);

  if (!userTodos) {
    throw new ApiError(
      500,
      "Something went wrong while getting the user's completed todos",
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userTodos,
        "User's completed todos fetched successfully",
      ),
    );
});

export {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  toggleTodoCompletion,
  getAllTodos,
  getCompletedTodos,
};
