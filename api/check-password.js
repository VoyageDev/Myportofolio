// congrats u find the easy way !! 
// now try the hard way 🔥

export default function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  
  const correctPassword = process.env.SECRET_PASSWORD;
  const dummyPassword = "Pass123";
  const dummyPasswords = "woahyouregood";

  
  const { password: userInput } = request.body;

  
  if (userInput === correctPassword) {
    // success status
    response.status(200).json({
      success: true,
      message: "Woah You Did It! 3 2 1..",
      redirect: "https://www.youtube.com/watch?v=xvFZjo5PgG0",//pls don't open this
    });
  } else if (userInput === dummyPassword) {
    //  respons error dummy
    response.status(401).json({
      success: false,
      message: "What u expect? 😂",
    });
  } else if (userInput === dummyPasswords) {
    //  respons error dummy
    response.status(401).json({
      success: false,
      message: "steganograph bro😂",
    });
  } else {
    //  respons error default
    response.status(401).json({
      success: false,
      message: "Not this ❤️",
    });
  }
}
