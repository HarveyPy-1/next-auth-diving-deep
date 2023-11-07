import UserForm from "@/components/UserForm";

const CreateUser = () => {
	return (
		<div>
			<p className="text-green-500">Only an Admin can access this page!</p>
			<UserForm />

		</div>
	);
};
export default CreateUser;
