import 'server-only';
import jwt from 'jsonwebtoken';
import { db } from '@/db/db';
import { eq } from 'drizzle-orm';
import { users } from '@/db/schema';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

const JWT_SECRET =
  process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!!';

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, JWT_SECRET);
  return token;
};

export const getUserFromToken = async (token: {
  name: string;
  value: string;
}) => {
  const payload = jwt.verify(token.value, JWT_SECRET) as { id: string };

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.id),
    columns: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!match) throw new Error('invalid user');

  const correctPW = await comparePW(password, match.password);

  if (!correctPW) {
    throw new Error('invalid user');
  }

  const token = createTokenForUser(match.id);
  const { password: pw, ...user } = match;

  return { user, token };
};

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const existingUser = await getUserbyEmail(email);

  if (existingUser) {
    return {
      message: 'This user already exists',
    };
  }
  const hashedPW = await hashPW(password);

  const rows = await db
    .insert(users)
    .values({ email, password: hashedPW })
    .returning({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt,
    });

  const user = rows[0];
  const token = createTokenForUser(user.id);

  return { message: 'Successfully signed up', user, token };
};

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW);
};

export async function createSession(userToken: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'auth_token',
      value: userToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    });

    return true;
  } catch (e) {
    console.error(e);
  }
}

async function getUserbyEmail(email: string) {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    return existingUser;
  } catch (e) {
    console.error(e);
    return null;
  }
}

// sign up

// const SignUp = async (prevState: any, formData: FormData) => {
//   // Get the users data
//   try {
//     const data = {
//       email: formData.get('email'),
//       password: formData.get('password'),
//       confirmPassword: formData.get('confirmPassword'),
//     };

//     // Validate the data before going to the db

//     const validationResult = SignUpSchema.safeParse(data);
//     if (!validationResult.success) {
//       return {
//         success: false,
//         message: 'Invalid email or password',
//         errors: validationResult.error.flatten().fieldErrors,
//       };
//     }
//     // Need to check if he is present in the db
//     const existingUser = await getUserbyEmail(data.email);

//     if (existingUser) {
//       redirect('signin');
//     }

//     // Need to go and create this use in the database with hashed password

//     const newUser = await createUser(data.email, data.password);

//     // Need to create his token

//     const session = await createSession(newUser.id);
//     return {
//       success: true,
//       message: 'Account created successfully.',
//     };
//   } catch (e) {
//     console.error(e);
//     return {
//       success: false,
//       message: 'Something bad happened',
//       errors: {
//         email: ['Failed to create a user'],
//       },
//     };
//   }
// };

// Need to auto-login after user is created

// Need to create a session for this user and redirect him to the main page

// Sign In

// Get the users data

//

// Validate the data before going to the db

// Need to go to the database and find this user

// Need to verify his password

// Need to create a session for this user and redirect him to the place from where he came

// async function getUserbyEmail(email) {
//   try {
//     const existingUser = await db.query.users.findFirst({
//       where: eq(users.email, email),
//     });
//     return existingUser;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// }

// const hashPassword = async (password) => {
//   hash(password, 10);
// };

// export async function generateJWT(payload) {
//   return await new jose.SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setIssuedAt()
//     .setExpirationTime(JWT_EXPIRATION)
//     .sign(JWT_SECRET);
// }

// async function generateToken(payload) {
//   try {
//     const token = generateJWT(payload);
//   } catch (e) {
//     console.error(e);
//   }
// }

// // Secret key for JWT signing (in a real app, use an environment variable)

// // JWT expiration time
// const JWT_EXPIRATION = '7d'; // 7 days

// async function createUser(email, password) {
//   const hashedPassword = await hashPassword(password);
//   const id = nano(id);
//   const user = await db.insert(users).values({
//     id,
//     email,
//     password: hashedPassword,
//   });

//   return { id, email };
// }

// async function createSession(userId) {
//   try {
//     const token = await generateToken(userId);
//     const cookieStore = await cookies();
//     cookieStore.set({
//       name: 'auth_token',
//       value: token,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 24 * 7, // 1 week
//       path: '/',
//       sameSite: 'lax',
//     });

//     return true;
//   } catch (e) {
//     console.error(e);
//   }
// }

// How to get the current user

// 1. Get the jwt token from the cookie by calling the cookie store and extracting the token by .get()
// 2. Then you need to extract the payload from the token, by using the jwt.verify method to extract the payload (user.id)
// 3. You need to go to the db and get the current user from the db, using the user.id extracted
// 4. You need to return it back.
// 5. So, 2 functions, 1 gets the token, 1 extracts the payload and goes to the db to get the user.
