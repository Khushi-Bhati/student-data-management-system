import { v2 as cloudinary } from "cloudinary";
import fs from "fs"



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


const uploadoncloudinary = async (localefilepth) => {
    try {

        if (!localefilepth) return null;

        const response = await cloudinary.uploader.upload(localefilepth, {
            resource_type: "auto",
            


        })

        console.log("File uploaded successfully", response.url)

        fs.unlinkSync(localefilepth)

        return response;



    } catch (error) {
        console.log("error on upload file on cloudinary", error)
        fs.unlinkSync(localefilepth)
        return null

    }
}


export { uploadoncloudinary }


