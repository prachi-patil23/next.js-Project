import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json(
        {
          message: "JWT secret is not configured",
        },
        {
          status: 500,
        }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `http://localhost:3001/users?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Unable to connect to user server",
        },
        {
          status: 500,
        }
      );
    }

    const users = await response.json();

    if (users.length === 0) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const user = users[0];

    if (user.password !== password) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}