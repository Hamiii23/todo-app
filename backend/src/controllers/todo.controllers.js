import { Todo } from "../models/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { titleType, descType, dueDateType } from "../utils/typeValidation.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description, dueDate = Date.now().toString() } = req.body;

  if (!titleType.safeParse(title).success) {
    throw new ApiError(400, "Invalid input type for the title");
  }

  if (!dueDateType.safeParse(dueDate).success) {
    throw new ApiError(400, "Invalid input for the due date");
  }

  if (description) {
    if (!descType.safeParse(description).success) {
      throw new ApiError(400, "Invalid input for the description");
    }
  }

  const createdTodo = await Todo.create({
    title,
    description: description || null,
    dueDate,
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

  }

  const todo = await Todo.findOne({
    _id: todoId
  });

  if(title) {
    const validTitle = titleType.safeParse(title);

    if(!validTitle.success) {
      throw new ApiError(400, "Invalid input for the title");
    };
  
    todo.title = title;
  };

  if(description) {
    const validDesc = descType.safeParse(description);
    
    if(!validDesc.success) {
      throw new ApiError(400, "Invalid input type for the description");
    };
      
    todo.description = description;
  };

  if(dueDate) {
    const validDate = dueDateType.safeParse(dueDate);

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

export { 
  createTodo,
  updateTodo
};
