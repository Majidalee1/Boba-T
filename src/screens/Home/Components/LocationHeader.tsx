import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon } from "@rneui/base";
import { DeviceWidth } from "../../../utils/Layouts";
import { colors } from "../../../styles/colors";
import { AppStackParamList } from "../../../navigation/AppNavigator";

interface Props {
  navigation: NavigationProp<AppStackParamList>;
  content?: Record<string, unknown>;
}

export const LocationHeader = (props: Props) => (
  <View>
    <View
      style={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        justifyContent: "space-between",
        width: DeviceWidth,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: DeviceWidth * 0.6,
        }}
      >
        <Icon
          name="heartbeat"
          type="font-awesome"
          size={20}
          color={colors.text_primary}
          onPress={() => console.log("hello")}
        />
        <Text
          h4={true}
          h4Style={{
            fontWeight: "bold",
            elevation: 1,
            paddingHorizontal: 10,
            color: colors.text_primary,
            fontSize: 14,
          }}
        >
          Shop no 123 USA California
        </Text>
      </View>
      {/* Text Button  with label change*/}
      <TouchableOpacity onPress={() => props.navigation.navigate("Store")}>
        <Text
          h4={true}
          h4Style={{
            fontWeight: "bold",
            elevation: 1,
            fontSize: 14,
            color: colors.primary,
          }}
        >
          Change Store
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
