const Sequelize=require('sequelize');
const {STRING,TEXT}=Sequelize;
const connect =new Sequelize(process.env.DATABASE_URL||'postgres://localhost/planets')

const Planets=connect.define('planets',{
    name: {
        type: STRING,
        //allowNull: false,
      },
      description: {
        type: TEXT,
       // allowNull: false,
      },
      imageUrl: {
        type: STRING,
      },
    });
  
   const syncAndSeed=async()=>{
    await connect.sync({ force: true });
    const [ Earth, Jupiter, Neptune ,Mars,Uranus,Venus,Mercury,Saturn] =await Promise.all([
        Planets.create({ name: 'Earth',description:'Mauna Kea The highest point of Hawaii',imageUrl:'maunakea.jpg' }),
        Planets.create({ name: 'Jupiter' ,description:'Yosemite National Park',imageUrl:'yosemmite.jpg' }),
        Planets.create({ name: 'Neptune' ,description:'Arches National Park.This is Delicate arch ',imageUrl:'delicatearch.jpg' }),
        Planets.create({ name: 'Mars' ,description:'Monument Valley.',imageUrl:'monumentvalley.jpg' }),
        Planets.create({ name: 'Uranus',description:'Yellowstone National Park.This is Grand Prismatic Spring',imageUrl:'yellowstone.jpg'  }),
        Planets.create({ name: 'Venus' ,description:'Las Vegas',imageUrl:'lasvegas.jpg' }),
        Planets.create({ name: 'Mercury' ,description:'Manhattan.Park Ave',imageUrl:'newyork.jpg' }),
        Planets.create({ name: 'Saturn' ,description:'Manhattan.Park Ave',imageUrl:'newyork.jpg' }),
      ]);

   };

   module.exports={
       models:{
           Planets,
       },
       syncAndSeed
   }