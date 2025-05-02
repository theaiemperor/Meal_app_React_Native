import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import CategoryGridTile from "../Components/CategoryGridTile";
import { CATEGORIES } from "../data/data";

export default function CategoryScreen({ navigation }: any) {
  function renderCategoryItem(itemData: ListRenderItemInfo<any>) {
    const pressHandler = () => {
      navigation.navigate("Overview", { categoryId: itemData.item.id });
    };
    return (
      <CategoryGridTile
        title={itemData.item.title}
        bgColor={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
