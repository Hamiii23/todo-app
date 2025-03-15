import { Todo } from "../models/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { stringValidator, dateValidator } from "../utils/typeValidation.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { List } from "../models/list.model.js";


const createTodo = asyncHandler(async (req, res) => {
  const { title, description, dueDate, list } = req.body;

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
  
  if(list) {
    if(!stringValidator.safeParse(list).success) {
      throw new ApiError(400, "Invalid Type: Invalid input for the list");
    };
  };

  const todoList = await List.findOne({
    name: list,
    owner: req.user._id
  });


  let userList;
  
  if(todoList) {
    userList = todoList
  } else {
    userList = await List.findOne({
      name: 'Inbox',
      owner: req.user._id
    });
  };

  const createdTodo = await Todo.create({
    title,
    description: description || null,
    dueDate,
    owner: req.user._id,
    list:  userList._id
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      todos: createdTodo._id
    }
  });

  userList.todos.push(createdTodo);

  await userList.save({validateBeforeSave: false});

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

  if(!todoId) {
    throw new ApiError(400, "Invalid Todo ID");
  };

  const todo = await Todo.findById(todoId);

  if(!todo) {
    throw new ApiError(400, "Todo Doesn't Exist");
  };

  if(!todo.owner.equals(req.user._id)) {
    throw new ApiError(401, "Unauthorized request");
  };

  if(title) {
    if(!stringValidator.safeParse(title).success) {
      throw new ApiError(400, "Invalid input for the title");
    };
  
    todo.title = title;
  };

  if(description) {
    if(!stringValidator.safeParse(description).success) {
      throw new ApiError(400, "Invalid input type for the description");
    };
      
    todo.description = description;
  };

  if(dueDate) {
    if(!dateValidator.safeParse(dueDate).success) {
      throw new ApiError(400, "Invalid input type for the date");
    };
    
    todo.dueDate = dueDate;
  };
  
  if(list) {
    if(!stringValidator.safeParse(list).success) {
      throw new ApiError(400, "Invalid input type for the list");
    };

    const oldListId = todo.list;

    const oldList = await List.findByIdAndUpdate(oldListId, {
      $pull: {
        todos: todoId
      }
    });

    if(!oldList) {
      throw new ApiError(500, "Something went wrong while removing the todo from list")
    };

    const newList = await List.findOne({
      name: list,
      owner: req.user._id
    });

    if(!newList) {
      throw new ApiError(400, "List doesn't exist");
    };

    todo.list = newList._id;

    newList.todos.push(todoId);
    await newList.save({validateBeforeSave: false});
  }

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

  const todo = await Todo.findById(todoId);

  if(!todo) {
    throw new ApiError(400, "Todo doesn't exist")
  };

  if(!todo.owner.equals(req.user._id)) {
    throw new ApiError(401, "Unauthorized request");
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

const toggleTodoCompletion = asyncHandler(async (req, res) => {
    const { todoId } = req.params;

    if(!todoId) {
      throw new ApiError(400, "Invalid Todo ID");
    };

    const todo = await Todo.findById(todoId);

    if(!todo) {
      throw new ApiError(400, "Todo Doesn't Exist");
    };

    if(!todo.owner.equals(req.user._id)) {
      throw new ApiError(401, "Unauthorized request");
    };

    const changeState = (prevState) => !prevState;

    todo.isDone = changeState(todo.isDone);

    let todoState;
    
    if (todo.isDone === true) {
      todoState = 'complete'
    } else {
      todoState = 'incomplete'
    };

    await todo.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
      new ApiResponse(200, todo, `Todo is marked as ${todoState}`)
    );
});

export { 
  createTodo,
  updateTodo,
  deleteTodo,
  getTodo,
  toggleTodoCompletion
};
