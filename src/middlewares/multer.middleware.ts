import multer from "multer";
import path from "path"

const storage  = multer.diskStorage({
    destination : (request , file , callback) => {
        callback( null ,path.resolve('./public/uploads'))
    },
    filename(req, file, callback) {
        callback( null , `${Date.now().toString()}-${file.originalname}`)
    }
})

 export const upload = multer({
    fileFilter(req, file, callback) {
        const mimeType = ["image/jpg" , "image/jpeg" ,"image/png"].includes(file.mimetype)

        if(mimeType){
           return callback(null , true);
        }
        return callback( new Error("Formato invalido, aceites : jpg , jpeg e png"))
    },
    storage :storage
})