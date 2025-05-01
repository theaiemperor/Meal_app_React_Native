import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealItem from "../Components/MealItem";
import { MEALS } from "../data/data";

const EmptyView = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.title}>You have no favorite meals yet.</Text>
    </View>
  );
};

export default function FavouriteScreen() {
  const favouriteMealsIds = useSelector(
    (state: { favouriteMeals: { ids: string[] } }) => state.favouriteMeals.ids
  );
  const favouriteMeal = MEALS.filter((item) =>
    favouriteMealsIds.includes(item.id)
  );

  return (
    <>
      {favouriteMeal.length === 0 ? (
        <EmptyView />
      ) : (
        <ScrollView>
          {favouriteMeal.map((item) => (
            <View key={item.id} style={styles.container}>
              <MealItem key={item.id} data={item} />
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "white",
    padding: 5,
    margin: 5,
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    margin: 20,
  },
});
