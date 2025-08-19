import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace) {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage /// Is this description correct? I think it should stand "Get the acces token from store"
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:token`);
    return accessToken;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken)
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
