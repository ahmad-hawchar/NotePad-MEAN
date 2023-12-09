import mongoose from "mongoose";
import listSchema from '../model/listSchema.js';
const list = mongoose.model('List', listSchema);
import connection from "../connection.js";
const getList = async (u_Id) => {
    try {
        let Result = await list.find({ userId: u_Id });
        if (Result.length > 0) {
            return Result
        }
        else {
            return false
        }
    }
    catch (e) {
        throw (e)
    }
}
const AddToList = async (u_Id, msg, title, color) => {
    try {
        let Found = await getList(u_Id)
        if (Found != false) {
            const newItem = {
                AddedOn: new Date(),
                textContent: msg,
                WorkedOn: false,
                title: title,
                color: color
            };
            let Result = await list.updateOne({ userId: u_Id }, { $push: { list: newItem } });
            if (Result.modifiedCount > 0) {
                return true
            }
            else {

                return false
            }
        }
        else {
            const newItem = new list({
                userId: u_Id,
                list: [{
                    AddedOn: new Date(),
                    textContent: msg,
                    WorkedOn: false,
                }]
            })
            let temp = await newItem.save();
            return true;
        }
    }
    catch (e) {
        throw (e)
    }
}

const removeFromList = async (u_Id, item_Id) => {
    try {
        let Found = await list.updateOne({ userId: u_Id }, { $pull: { list: { _id: item_Id } } });
        if (Found.modifiedCount > 0) {
            console.log(Found);
            return true;
        }
        else {
            console.log(Found + "test");
            return false;
        }
    }
    catch (e) {
        throw (e)
    }
}

const editListItem = async (u_Id, item_Id, msg, title) => {
    try {
        console.log(msg + "test" + title)
        let Result = await list.updateOne({ userId: u_Id, "list._id": item_Id },
            { $set: { "list.$.textContent": msg, "list.$.title": title } });
        if (Result.modifiedCount > 0) {
            return true
        }
        else {
            //modified count will be 0 if the given msg is the same as the old msg
            //so we check for matches here, we could just check for matchedCount always even tho no 
            //edits were made
            if (Result.matchedCount > 0) {
                return "No changes"
            }
            else {
                return false
            }

        }
    }
    catch (e) {
        throw (e)
    }
}
export default {
    getList,
    AddToList,
    removeFromList,
    editListItem
}