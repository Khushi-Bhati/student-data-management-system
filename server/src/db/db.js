import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"


const connectdb=async()=>{
    try {

        const connectioninstance=await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(`MONGODB CONNECT !! DB HOST:${connectioninstance.connection.host}`)
        
    } catch (error) {
        console.log("error in mongodb connection is:",error.message)
        process.exit(1)
        
    }
}

export default connectdb;


