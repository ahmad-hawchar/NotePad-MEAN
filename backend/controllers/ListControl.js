import ListService from '../services/ListService.js';
import dotenv from 'dotenv';
dotenv.config();
const AddToList = async (req, res) => {
    try {
        const { userId, msg, title, color } = req.body
        if (userId && msg) {
            let result = await ListService.AddToList(userId, msg, title, color);
            if (result) {
                res.status(200).send({ success: true, message: "Added successfuly" })
            }
            else {
                res.status(404).send({ success: false, message: "User does not exist" })
            }
        }
        else {
            res.status(400).send({ success: false, message: "bad request, missing critical information" })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send("internal server error")
    }
}

const getList = async (req, res) => {
    try {
        const u_Id = req.params.id;
        if (u_Id) {
            const List = await ListService.getList(u_Id);
            if (List && List[0].list.length > 0) {
                console.log(List)
                res.status(200).send({ success: true, message: List[0] });
            } else {
                console.log(List)
                res.status(200).send({ success: false, message: 'your list is emtpy! Add a new task for it to show up here.' });
            }
        }
        else {
            res.status(400).send({ success: false, message: "bad request, missing critical information" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
const removeFromList = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        if (userId && itemId) {
            let result = await ListService.removeFromList(userId, itemId);
            if (result) {
                res.status(200).send({ success: true, message: "Item removed successfully" })
            }
            else {
                res.status(404).send({ success: true, message: "Item not found! try deleting again" })
            }
        }
        else {
            res.status(400).send("bad request, critical info missing")
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send("internal server error")
    }
}
const EditListItem = async (req, res) => {
    try {
        let { userId, itemId, msg, title } = req.body;
        console.log(req.body)
        if (userId && itemId && msg && title) {
            let result = await ListService.editListItem(userId, itemId, msg, title);
            if (result == true) {
                res.status(200).send({ success: true, message: "task edited successfully" })
            }
            else if (result == "No changes") {
                res.status(200).send({ success: true, message: "No changes were made!" })
            }
            else {
                res.status(404).send({ success: false, message: "Item not found! try again" })
            }
        }
        else {
            res.status(400).send("bad request, missing critical information")
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send("internal server error")
    }
}
export default {
    getList,
    AddToList,
    removeFromList,
    EditListItem
};