export default function handler(request, response) {
  // Hanya izinkan metode POST
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method Not Allowed" });
  }

  // Ambil kata sandi asli dari Environment Variable yang aman di Vercel
  // Nama variabelnya akan kita set 'SECRET_PASSWORD' di dashboard Vercel
  const correctPassword = process.env.SECRET_PASSWORD;
  const dummyPassword = "Pass123";
  const dummyPasswords = "woahyouregood";

  // Ambil kata sandi yang dikirim dari frontend
  const { password: userInput } = request.body;

  // Lakukan perbandingan di sisi server
  if (userInput === correctPassword) {
    // Kirim respons sukses jika benar
    response.status(200).json({
      success: true,
      message: "Woah You Did It! 3 2 1..",
      redirect: "https://www.youtube.com/watch?v=xvFZjo5PgG0",
    });
  } else if (userInput === dummyPassword) {
    // Kirim respons error dummy
    response.status(401).json({
      success: false,
      message: "What u expect? 😂",
    });
  } else if (userInput === dummyPasswords) {
    // Kirim respons error dummy
    response.status(401).json({
      success: false,
      message: "like i said steganograph 😂",
    });
  } else {
    // Kirim respons error default
    response.status(401).json({
      success: false,
      message: "Not this ❤️",
    });
  }
}
