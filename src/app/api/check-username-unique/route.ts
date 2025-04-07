import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request:Request) {

    await dbConnect();
    try {
        const {searchParams} = new URL(request.url);
        const queryParams = {
            username:searchParams.get('username')
        }
        //valid with zod
        const result = usernameQuerySchema.safeParse(queryParams)
        console.log(result) //always check kya aarha h 


        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [] //checking username ke errors 
            return Response.json({
                success:false,
                message:usernameErrors.length > 0 ? usernameErrors.join(', ') : "Invalid Query Parameter"
            },{status:400})
        }

        const {username} = result.data

        const existingVerifiedUser = await UserModel.findOne({username , isVerified:true})

        if(existingVerifiedUser){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },{status:400})
        }

        return Response.json({
            success:true,
            message:"Username is unique"
        },{status:200})


    } catch (error) {
        console.error("Error Checking Username",error);
        return Response.json({
            success:false,
            message:"Error checking username"
        },{status:500})
    }
}