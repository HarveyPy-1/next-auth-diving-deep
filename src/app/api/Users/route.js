import User from "@/lib/db/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// We are not validating emails here. Add that in production builds

export async function POST(req) {
	try {
		const body = await req.json();
		const userData = body.formData;

		// Confirm data exists
		if (!userData?.email || !userData.password) {
			return NextResponse.json(
				{
					message: "All fields are required",
				},
				{ status: 400 }
			);
		}

		// Check for duplicate
		const duplicate = await User.findOne({ email: userData.email.toLowerCase() })
			.lean()
			.exec();

		if (duplicate) {
			return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
		}

		// Encrypt password
		const hashPassword = await bcrypt.hash(userData.password, 10);
		userData.password = hashPassword;

		await User.create(userData);
		return NextResponse.json({ message: "User Created!" }, { status: 201 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	}
}
