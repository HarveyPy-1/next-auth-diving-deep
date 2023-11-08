import RegisterForm from "./form";

const RegisterPage = () => {
	return (
		<div className="h-screen w-screen flex justify-center items-center bg-slate-100">
			<div className="shadow-xl p-4 bg-white rounded-xl">
				<h1>Register</h1>
        <RegisterForm />
			</div>
		</div>
	);
};
export default RegisterPage;
