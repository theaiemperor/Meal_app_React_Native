import { useLayoutEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../Components/IconButton";
import List from "../Components/List";
import MealDescription from "../Components/MealDescription";
import { MEALS } from "../data/data";
import { addFavorite, removeFavorite } from "../store/redux/favourites";

export default function MealsDetailScreen({ route, navigation }: any) {
  const mealId = route.params.mealId;
  const meal = MEALS.find((item) => item.id === mealId);

  const favouriteMealIds = useSelector(
    (state: { favouriteMeals: { ids: string[] } }) => state.favouriteMeals.ids
  );
  const dispatch = useDispatch();
  const mealIsFavourite = favouriteMealIds.includes(mealId);

  const favouriteButtonHandler = () => {
    if (mealIsFavourite) {
      dispatch(removeFavorite({ id: mealId }));
    } else {
      dispatch(addFavorite({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          color="white"
          icon={mealIsFavourite ? "star" : "star-outline"}
          onPress={favouriteButtonHandler}
        />
      ),
    });
  }, [favouriteButtonHandler, navigation]);

  return (
    <View
      style={Platform.OS === "web" ? styles.webWrapper : styles.defaultWrapper}
    >
      {meal && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: meal.imageUrl }} style={styles.image} />
            </View>
            <Text style={styles.title}>{meal.title}</Text>
            <MealDescription
              complexity={meal.complexity}
              duration={meal.duration}
              affordability={meal.affordability}
            />
          </View>
          <List title="INGREDIENTS" data={meal.ingredients} />
          <List title="STEPS" data={meal.steps} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    alignItems: "center",
  },
  defaultWrapper: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 8,
  },
  mainContainer: {
    borderWidth: 3,
    marginTop: 5,
    borderRadius: 10,
    borderColor: "#180b0b",
    backgroundColor: "#180b0b",
    paddingBottom: 15,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: 200,
    margin: 5,
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
