import { Dimensions } from "react-native";

export const DeviceHeight = Dimensions.get("window").height;

export const DeviceWidth = Dimensions.get("window").width;

export const isSmallDeviceHeight = DeviceHeight < 700;

export const isSmallDeviceWidth = DeviceWidth < 350;

export const isLargeDeviceHeight = DeviceHeight > 800;

export const DeviceAspectRatio = DeviceHeight / DeviceWidth;

export const spacing = {
  micro: 2,
  tiny: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  extraLarge: 32,
  huge: 48,
  massive: 64,
} as const;

export type Spacing = keyof typeof spacing;
