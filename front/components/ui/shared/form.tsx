import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import {
	UseFormReturn,
	RegisterOptions,
	FieldValues,
	Controller,
	Path,
} from "react-hook-form";
import Button from "./button";
import Input from "./input";

export interface FormFieldConfig<T extends FieldValues> {
	name: keyof T;
	type?: "text" | "password";
	placeholder?: string;
	label?: string;
	rules?: RegisterOptions;
}

interface FormProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	fields: FormFieldConfig<T>[];
	onSubmit: (data: T) => void;
	submitText?: string;
	children?: ReactNode;
	mode?: "login" | "register";
	onModeChange?: (mode: "login" | "register") => void;
}

const Form = <T extends FieldValues>({
	form,
	fields,
	onSubmit,
	submitText = "Submit",
	children,
	mode,
	onModeChange,
}: FormProps<T>) => {
	const { handleSubmit, control } = form;

	return (
		<View style={styles.container}>
			<View style={styles.fieldsContainer}>
				{fields.map((field) => (
					<Controller
						key={String(field.name)}
						control={control}
						name={field.name as Path<T>}
						rules={field.rules as RegisterOptions<T>}
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
			</View>

			{children}

			<View style={styles.buttonContainer}>
				<Button
					onPress={handleSubmit(onSubmit)}
					style={styles.button}
					textStyle={styles.buttonText}
				>
					{submitText}
				</Button>
				{mode && onModeChange && (
					<Button
						variant="outlined"
						textStyle={styles.buttonTextSecondary}
						onPress={() =>
							onModeChange(mode === "login" ? "register" : "login")
						}
						style={styles.buttonSecondary}
					>
						{mode === "login" ? "Sign Up" : "Sign In"}
					</Button>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		gap: 16,
	},
	fieldsContainer: {
		width: "100%",
		gap: 16,
	},
	buttonContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 16,
	},
	button: {
		backgroundColor: "#6366F1",
		minWidth: 120,
	},
	buttonSecondary: {
		minWidth: 120,
		borderColor: "#6366F1",
	},
	buttonTextSecondary: {
		color: "#6366F1",
	},
	buttonText: {
		color: "white",
	},
});

export default Form;
