import express from 'express';
import cors from 'cors';
import ListControl from '../controllers/ListControl.js';
let app = express();
app.use(cors());
app.use(express.json());
app.get('/get-list/:id', ListControl.getList)
app.post('/add-to-list', ListControl.AddToList)
app.delete('/remove-from-list', ListControl.removeFromList)
app.put('/edit-list-item', ListControl.EditListItem)
export default app