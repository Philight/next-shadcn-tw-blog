import {
  NextRequest, NextResponse 
} from "next/server"
import User from "@/lib/mongo/models/User"
import connectMongoDB from "@/lib/mongo/DBConnection"
import xss from "xss"
import { CleanUserType } from "@/utils/api/usersApi"

// PUBLIC
// GET USER
export async function GET(req: NextRequest) {
  try {
    const username = req.nextUrl.searchParams.get("username");    

    if (!username) {
      return NextResponse.json(
        { statusText: "Username is required." },
        { status: 400 }
      );
    }

    const sanitizedUsername = xss(username.toString())
    
    await connectMongoDB()

    const user = await User.findOne({ username: sanitizedUsername }).select('-password -_id').lean<CleanUserType | null>();

    if (!user) {
      return NextResponse.json(
        { statusText: "User not found." },
        { status: 404 }
      )
    }

    return NextResponse.json(user, { statusText: 'Fetched user succesfully.', status: 200 })
  } catch (error) {    
    return NextResponse.json(
      { statusText: "There was an error fetching the user." },
      { status: 500 }
    )  
  }  
}