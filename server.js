const express=require('express');
const ejs=require('ejs');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const Team=require('./model/Team')
mongoose.connect('mongodb://localhost:27017/teaminfo')
const app=express();
app.use(bodyparser.urlencoded({extended : true}))
app.use(express.json())

const port=4000;
app.set('view engine','ejs');
app.get('/',async(req,res)=>{
    const players=await Team.find();
    res.render('index',{players});
})
app.delete('/delete/:id', async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting student" });
    }
});
app.put('/update/:id', async (req, res) => {
    try {
        const { name, position, role } = req.body;
        await Team.findByIdAndUpdate(req.params.id, { name, position, role });
        res.status(200).send({ message: "Updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error updating player" });
    }
});

app.post('/add',async(req,res)=>{
   const {name,position,role}=req.body;
   
   const player=new Team({name,position,role});
   await player.save();
   res.redirect('/')
})
app.listen(port,()=>{console.log(`server successfully work in port ${port}`)});

