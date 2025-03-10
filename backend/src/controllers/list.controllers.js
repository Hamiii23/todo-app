import { List } from "../models/list.model.js";
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

    if(!listId) {
        throw new ApiError(400, "List doesn't exist");
    };

    if(!name) {
        throw new ApiError(400, "Name is required to update");
    };

    if(!stringValidator.safeParse(name).success) {
        throw new ApiError(400, "Invalid Type: Name must be a string")
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
      throw new ApiError(500, "Something went wrong while fetching the list");
    };
    
    if(!list.owner._id.equals(req.user._id)) {
      throw new ApiError(401, "Unauthorized Request");
    };
    
    return res
    .status(200)
    .json(
      new ApiResponse(200, list, "Todo fetched successfully")
    );
});

export {
    createList,
    deleteList,
    updateList,
    getList
}