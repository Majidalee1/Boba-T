import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AppStackParamList, TabParamList } from "../../navigation/AppNavigator";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "../../components/Button";
import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

interface Props {
  navigation: NavigationProp<AppStackParamList>;
  route: RouteProp<TabParamList, "ScanOrder">;
}
export const ScanOrder = ({ navigation, route }: Props) => {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string>("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data.toString());
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-small-left" size={24} color="#5A5A5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Order</Text>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanCamera}
      />
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: 30,
        }}
      >
        <Text style={styles.inputLabel}>Enter Manually</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder=""
            style={styles.input}
            value={scannedData}
            onChangeText={setScannedData}
          />
        </View>
      </View>
      <View style={{ paddingBottom: 20 }}>
        <Button title={"Vie Order"} onPress={() => navigation.goBack()} />
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#FBFCFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCFF",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
  backBtn: {
    backgroundColor: "#D3F1FF",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  header: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#5A5A5C",
    fontFamily: fonts.regular,
    fontSize: 18,
    marginRight: 20,
  },
  inputLabel: {
    color: "#5A5A5C",
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 56,
    borderColor: "#CCCCCC",
    borderRadius: 15,
  },
  input: {
    flex: 1,
    color: "#03110A",
    fontSize: 14,
    fontFamily: fonts.medium,
  },
  scanCamera: {
    flex: 1,
    width: "100%",
  },
});
