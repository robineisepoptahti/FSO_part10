import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "grey",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortingMenu = ({ selectedSortingMethod, setSelectedSortingMethod }) => {
  return (
    <View style={{ backgroundColor: "grey" }}>
      <Picker
        selectedValue={selectedSortingMethod}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedSortingMethod(itemValue)
        }
      >
        <Picker.Item
          label="Select an item..."
          value="select"
          enabled={false}
          color={"gray"}
        />
        <Picker.Item
          label="Latest repositories"
          value="CREATED_AT"
          color="black"
        />
        <Picker.Item
          label="Highest rated repositories"
          value="RATING_AVERAGE_ASC"
          color="black"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="RATING_AVERAGE_DESC"
          color="black"
        />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  selectedSortingMethod,
  setSelectedSortingMethod,
}) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={() => (
        <SortingMenu
          selectedSortingMethod={selectedSortingMethod}
          setSelectedSortingMethod={setSelectedSortingMethod}
        ></SortingMenu>
      )}
    />
  );
};

const RepositoryList = () => {
  const [selectedSortingMethod, setSelectedSortingMethod] =
    useState("CREATED_AT");
  const orderDirection =
    selectedSortingMethod === "RATING_AVERAGE_ASC" ? "DESC" : "ASC";
  const orderBy =
    selectedSortingMethod === "CREATED_AT" ? "CREATED_AT" : "RATING_AVERAGE";
  const { repositories } = useRepositories(orderBy, orderDirection);

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSortingMethod={selectedSortingMethod}
      setSelectedSortingMethod={setSelectedSortingMethod}
    />
  );
};

export default RepositoryList;
