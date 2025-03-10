import { Todo } from "../models/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { stringValidator, dateValidator } from "../utils/typeValidation.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";


const createTodo = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!stringValidator.safeParse(title).success) {
    throw new ApiError(400, "Invalid Type: Invalid input type for the title");
  };

  if(dueDate) {
    if (!dateValidator.safeParse(dueDate).success) {
      throw new ApiError(400, "Invalid Type: Invalid input for the due date");
    };
  };

  if (description) {
    if (!stringValidator.safeParse(description).success) {
      throw new ApiError(400, "Invalid Type: Invalid input for the description");
    };
  };

  const createdTodo = await Todo.create({
    title,
    description: description || null,
    dueDate,
    owner: req.user._id
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      todos: createdTodo._id
    }
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
  const { title, description, dueDate } = req.body;

  if(!todoId) {
    throw new ApiError(400, "Invalid Todo ID");
  };

  const todo = await Todo.findOne({
    _id: todoId
  });

  if(title) {
    const validTitle = stringValidator.safeParse(title);

    if(!validTitle.success) {
      throw new ApiError(400, "Invalid input for the title");
    };
  
    todo.title = title;
  };

  if(description) {
    const validDesc = stringValidator.safeParse(description);
    
    if(!validDesc.success) {
      throw new ApiError(400, "Invalid input type for the description");
    };
      
    todo.description = description;
  };

  if(dueDate) {
    const validDate = dateValidator.safeParse(dueDate);

    if(!validDate.success) {
      throw new ApiError(400, "Invalid input type for the date");
    };
    
    todo.dueDate = dueDate;
  };

  await todo.save({validateBeforeSave: false});

  return res
  .status(200)
  .json(
    new ApiResponse(200, todo, "Todo updated successfully")
  );
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  
  if(!todoId) {
    throw new ApiError(400, "Invalid todo ID");
  };

  const todo = await Todo.findOne({
    _id: todoId
  });

  if(!todo) {
    throw new ApiError(400, "Todo doesn't exist")
  };

  const deletedTodo = await Todo.deleteOne({
    _id: todoId
  });

  if(!deletedTodo) {
    throw new ApiError(500, "Something went wrong while deleting the todo");
  };

  return res
  .status(200)
  .json(
    new ApiResponse(200, {}, "Todo deleted successfully")
  );
});

const getTodo = asyncHandler(async (req, res) => {
    const { todoId } = req.params;

    if(!todoId) {
      throw new ApiError(400, "Invalid Todo ID");
    };

    const todo = await Todo.findById(todoId);

    if(!todo) {
      throw new ApiError(500, "Something went wrong while fetching the todo");
    };

    if(!todo.owner._id.equals(req.user._id)) {
      throw new ApiError(401, "Unauthorized Request");
    };

    return res
    .status(200)
    .json(
      new ApiResponse(200, todo, "Todo fetched successfully")
    );
});

export { 
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
};
