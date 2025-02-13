import {
	TouchableOpacity,
	StyleSheet,
	StyleProp,
	ViewStyle,
	TextStyle,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";

interface ButtonProps {
	variant?: "filled" | "outlined" | "ghost";
	size?: "small" | "medium" | "large";
	onPress?: () => void;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	icon?: IconSymbolName;
	iconSize?: number;
	iconColor?: string;
	children?: React.ReactNode;
}

const Button = ({
	variant = "filled",
	size = "medium",
	onPress,
	disabled = false,
	style,
	textStyle,
	icon,
	iconSize = 20,
	iconColor = "#FFFFFF",
	children,
}: ButtonProps) => {
	const isIconButton = !children && icon;

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			style={[
				styles.container,
				styles[variant],
				styles[size],
				isIconButton && styles.iconButton,
				disabled && styles.disabled,
				style,
			]}
		>
			{icon && (
				<IconSymbol
					name={icon}
					size={iconSize}
					color={iconColor}
					style={!isIconButton && styles.icon}
				/>
			)}
			{children && (
				<ThemedText
					style={[styles[`${variant}Text`], styles[`${size}Text`], textStyle]}
				>
					{children}
				</ThemedText>
			)}
		</TouchableOpacity>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		alignSelf: "flex-start",
	},
	small: {
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	medium: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
	large: {
		paddingHorizontal: 20,
		paddingVertical: 14,
	},
	smallText: {
		fontSize: 14,
	},
	mediumText: {
		fontSize: 16,
	},
	largeText: {
		fontSize: 18,
	},
	filled: {
		backgroundColor: "#007AFF", // iOS blue
	},
	filledText: {
		color: "#FFFFFF",
		fontWeight: "600",
	},
	outlined: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#007AFF",
	},
	outlinedText: {
		color: "#007AFF",
		fontWeight: "600",
	},
	ghost: {
		backgroundColor: "transparent",
	},
	ghostText: {
		color: "#007AFF",
		fontWeight: "600",
	},
	iconButton: {
		width: 44,
		height: 44,
		borderRadius: 22,
		padding: 0,
		maxWidth: 44,
	},
	icon: {
		marginRight: 8,
	},
	disabled: {
		opacity: 0.5,
	},
});
