import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useNavigate } from "react-router-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "grey",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortingMenu = ({
  selectedSortingMethod,
  setSelectedSortingMethod,
  searchKeyword,
  setSearchKeyword,
}) => {
  return (
    <View style={{ backgroundColor: "grey" }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchKeyword}
        value={searchKeyword}
        style={{ margin: 15 }}
      />
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

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <SortingMenu
        selectedSortingMethod={props.selectedSortingMethod}
        setSelectedSortingMethod={props.setSelectedSortingMethod}
        searchKeyword={props.searchKeyword}
        setSearchKeyword={props.setSearchKeyword}
      ></SortingMenu>
    );
  };
  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => this.props.navigate(`/repository/${item.id}`)}
          >
            <RepositoryItem item={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const first = 3;

  const navigate = useNavigate();
  const [selectedSortingMethod, setSelectedSortingMethod] =
    useState("CREATED_AT");
  const [searchKeyword, setSearchKeyword] = useState("");
  const orderDirection =
    selectedSortingMethod === "RATING_AVERAGE_ASC" ? "DESC" : "ASC";
  const orderBy =
    selectedSortingMethod === "CREATED_AT" ? "CREATED_AT" : "RATING_AVERAGE";
  const { repositories, fetchMore } = useRepositories(
    orderBy,
    orderDirection,
    searchKeyword,
    first
  );
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSortingMethod={selectedSortingMethod}
      setSelectedSortingMethod={setSelectedSortingMethod}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
