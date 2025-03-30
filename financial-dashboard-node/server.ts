import dotenv from 'dotenv'
dotenv.config();

import app from "./src/app";
import { AppDataSource } from './src/configs/database.config';

const port = process.env.PORT
AppDataSource.initialize().then(
    ()=>{
        console.log('Database is connected...');
        
        app.listen(port,()=>{
            console.log('App is listening on port '+port);
        });
    }
).catch((err)=>{ 
    console.log(err); 
    
})