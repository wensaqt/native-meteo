import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { UseFormReturn, Controller } from "react-hook-form";
import Button from "./button";
import Input from "./input";

interface FormFieldConfig {
	name: string;
	type?: "text" | "password";
	placeholder?: string;
	label?: string;
	rules?: object;
}

interface FormProps {
	form: UseFormReturn<any>;
	fields: FormFieldConfig[];
	onSubmit: (data: any) => void;
	submitText?: string;
	children?: ReactNode;
}

const Form = ({
	form,
	fields,
	onSubmit,
	submitText = "Submit",
	children,
}: FormProps) => {
	const { handleSubmit, control } = form;

	return (
		<View style={styles.container}>
			{fields.map((field) => (
				<Controller
					key={field.name}
					control={control}
					name={field.name}
					rules={field.rules}
					render={({ field: { onChange, value } }) => (
						<Input
							type={field.type}
							placeholder={field.placeholder}
							value={value}
							onChangeText={onChange}
						/>
					)}
				/>
			))}

			{children}

			<Button onPress={handleSubmit(onSubmit)}>{submitText}</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		gap: 16,
		alignItems: "center",
	},
});

export default Form;
