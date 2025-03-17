import { List } from "../models/list.model.js";
import { Todo } from "../models/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { stringValidator } from "../utils/typeValidation.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createList = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if(!name) {
        throw new ApiError(400, "Name is required");
    };

    if(!stringValidator.safeParse(name).success) {
        throw new ApiError(400, "Invalid Type: Name must be a string");
    };

    const existingList = await List.findOne({
        name,
        owner: req.user._id
    });

    if(existingList) {
        throw new ApiError(400, "List already exists");
    };

    const list = await List.create({
        name,
        owner: req.user._id
    });

    if(!list) {
        throw new ApiError(500, "Something went wrong while creating the list");
    };

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            list,
            "List created successfully"
        )
    );
});

const deleteList = asyncHandler(async (req, res) => {
    const { listId } = req.params;

    if(!listId) {
        throw new ApiError(400, "Invalid List ID");
    };

    const list = await List.findOne({
        _id: listId
    });

    if(!list) {
        throw new ApiError(400, "List doesn't exist")
    };

    if(!list.owner._id.equals(req.user._id)) {
        throw new ApiError(401, "Unauthorized Request");
    };

    if(list.protected == true) {
        throw new ApiError(400, "This list cannot be deleted");
    };

    const deletedList = await List.deleteOne({
        _id: listId
    });

    if(!deletedList) {
        throw new ApiError(500, "Something went wrong while deleting the list");
    };

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "List deleted successfully"
        )
    );
});

const updateList = asyncHandler(async (req, res) => {
    const { listId } = req.params;
    const { name } = req.body;

    if(!listId) {
        throw new ApiError(400, "Invalid List ID");
    };

    const list = await List.findById(listId);

    if(!list) {
        throw new ApiError(400, "List doesn't exist");
    };

    if(!name) {
        throw new ApiError(400, "Name is required to update");
    };

    if(!stringValidator.safeParse(name).success) {
        throw new ApiError(400, "Invalid Type: Name must be a string")
    };

    if(!list.owner._id.equals(req.user._id)) {
        throw new ApiError(401, "Unauthorized Request");
    };

    if(list.protected == true) {
        throw new ApiError(400, "This list cannot be modified");
    };

    const existingName = await List.findOne({
        name,
        owner: req.user._id
    });

    if(existingName) {
        throw new ApiError(400, "A list with the name already exists in your account");
    };

    list.name = name;

    await list.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(200, list, "List updated successfully")
    );
});

const getList = asyncHandler(async (req, res) => {
    const {listId} = req.params;

    if(!listId) {
        throw new ApiError(400, "Invalid List ID");
    };

    const list = await List.findById(listId);
    
    if(!list) {
      throw new ApiError(400, "Something went wrong while fetching the list");
    };
    
    if(!list.owner._id.equals(req.user._id)) {
      throw new ApiError(401, "Unauthorized Request");
    };
    
    return res
    .status(200)
    .json(
      new ApiResponse(200, list, `${list.name} fetched successfully`)
    );
});

const addTodoToList = asyncHandler(async (req, res) => {
    const { todoId } = req.query;
    const { listId } = req.params;

    const errors = [];

    if(!listId) {
        errors.push('Invalid List ID');
    };

    if(!todoId) {
        errors.push('Invalid Todo ID');
    };

    if(errors.length > 0) {
        throw new ApiError(400, errors);
    };

    const list = await List.findById(listId);

    if(!list) {
        throw new ApiError(400, "Something went wrong while fetching the list");
    };

    if(!list.owner._id.equals(req.user._id)) {
        throw new ApiError(401, "Unauthorized Request");
    };
    
    const todo = await Todo.findById(todoId);

    if(!todo) {
        throw new ApiError(400, "Something went wrong while looking for the todo");
    };

    todo.list = list._id;

    await todo.save({validateBeforeSave: false});
    // const updatedList = await List.findById(listId);

    return res
    .status(200)
    .json(
        new ApiResponse(200, {todo, list}, `Todo successfully added to the list: ${list.name}`)
    );
});

const removeTodoFromList = asyncHandler(async (req, res) => {
    const { todoId } = req.query;
    const { listId } = req.params;

    const errors = [];

    if(!listId) {
        errors.push('Invalid List ID');
    };

    if(!todoId) {
        errors.push('Invalid Todo ID');
    };

    if(errors.length > 0) {
        throw new ApiError(400, errors);
    };

    const list = await List.findById(listId);
    
    if(!list) {
        throw new ApiError(400, "Something went wrong while fetching the list");
    };
    
    
    const todo = await Todo.findById(todoId);
    
    if(!todo) {
        throw new ApiError(400, "Something went wrong while looking for the todo");
    };
    
    const inbox = await List.findOne({
        name: "Inbox",
        owner: req.user._id
    });

    todo.list = inbox._id;

    await todo.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(
        new ApiResponse(200, {list, todo}, `Todo successfully removed from the list: ${list.name} and added back to: ${inbox.name}`)
    );
});

export {
    createList,
    deleteList,
    updateList,
    getList,
    addTodoToList,
    removeTodoFromList
};