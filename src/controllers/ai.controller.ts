import { Request, Response } from "express";
import axios from "axios";



export const genarateContent = async (req: Request, res: Response) => {
    const { text, maxToken } = req.body;

    
    // Axios - npm i axios
    const aiResponse = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent",
    {
      contents: [
        {
          parts: [{ text }]
        }
      ],
      generationConfig: {
        maxOutputTokens: maxToken || 150
      }
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": "AIzaSyCVIREGMoRT4s4uH9zoiDWNn2NJwgSp4B0"
      }
    }
  )

   const genratedContent =
    aiResponse.data?.candidates?.[0]?.content?.[0]?.text ||
    aiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No data";

     console.log(res)

   res.status(200).json({
     data: genratedContent
   })

}

// text - >
//token - word
//can use API or SDK