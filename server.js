const express=require('express');
const path=require('path');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const db =require('./db');
const {Planets}=db.models
const app=express();


app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/dist',express.static(path.join(__dirname,'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/planets',async(req,res,next)=>{
    try{
       res.send(await Planets.findAll())
    }
    catch(ex){
        next(ex)
    }
})

app.get('/api/planets/:planetId',async (req,res,next)=>{
  try{
    const planet =await Planets.findByPk(req.params.planetId);
    res.json(planet)
  }
  catch (err){
    next(err)
  }
})
app.post('/api/planets', async(req, res, next)=> {
  try {
    const planet = await Planets.create(req.body);
    res.status(201).send(planet);

  }
  catch(ex){
    next(ex);
  }

});


app.delete('/api/planets/:id', async(req, res, next)=> {
  try {
    await Planets.destroy({ where: { id: req.params.id }});
    res.sendStatus(204);

  }
  catch(ex){
    next(ex);
  }

});

const init = async()=> {
    try {
      await db.syncAndSeed();
      const port = process.env.PORT || 3000;
      app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch(ex){
      console.log(ex);
    }
  };
  
  init();