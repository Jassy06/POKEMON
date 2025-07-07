import React, { JSX } from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// 🔧 Type definitions
type PokemonType = "electric" | "water" | "fire" | "grass" | string;

interface PokemonCardProps {
  name: string;
  image: ImageSourcePropType;
  type?: PokemonType;
  hp: number;
  moves?: string[];
  weaknesses?: string[];
}

// 🔧 Type-safe helper for colors/emojis
const getTypeDetails = (type?: PokemonType): { borderColor: string; emoji: string } => {
  if (!type || typeof type !== "string") {
    return { borderColor: "#A0A0A0", emoji: "❓" };
  }

  switch (type.toLowerCase()) {
    case "electric":
      return { borderColor: "#FFD700", emoji: "⚡️" };
    case "water":
      return { borderColor: "#6493EA", emoji: "💧" };
    case "fire":
      return { borderColor: "#FF5733", emoji: "🔥" };
    case "grass":
      return { borderColor: "#66CC66", emoji: "🌿" };
    default:
      return { borderColor: "#A0A0A0", emoji: "❓" };
  }
}

// ✅ PokemonCard component
function PokemonCard({
  name,
  image,
  type,
  hp,
  moves = [],
  weaknesses = [],
}: PokemonCardProps): JSX.Element {
  const { borderColor, emoji } = getTypeDetails(type);

  return (
    <View style={styles.card}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.hp}>❤️HP: {hp}</Text>
      </View>

      <Image
        source={image}
        accessibilityLabel={`${name} Pokemon`}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.typeContainer}>
        <View style={[styles.badge, { borderColor }]}>
          <Text style={styles.typeEmoji}>{emoji}</Text>
          <Text style={styles.typeText}>{type ?? "Unknown"}</Text>
        </View>
      </View>

      <View style={styles.movesContainer}>
        <Text style={styles.movesText}>Moves: {moves.join(", ")}</Text>
      </View>

      <View style={styles.weaknessContainer}>
        <Text style={styles.weaknessText}>
          Weakness: {weaknesses.join(", ")}
        </Text>
      </View>
    </View>
  );
}

export default function App(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* ✅ Render multiple cards or just one */}
      <PokemonCard
        name="Pikachu"
        image={require("../assets/images/pikachu.png")}
        type="electric"
        hp={100}
        moves={["Thunderbolt", "Quick Attack"]}
        weaknesses={["Ground"]}
      />

      <PokemonCard
        name="Charmander"
         image={require("../assets/images/charmander.png")}
        type="fire"
        hp={100}
        moves={["Ember", "Scratch"]}
        weaknesses={["Water", "Rock"]}
      />

      <PokemonCard
        name="Bulbasaur"
         image={require("../assets/images/bulbasaur.png")}
        type="grass"
        hp={100}
        moves={["Vine Whip", " Power Whip"]}
        weaknesses={["Fire,","Flying","Ice"]}
      />

      <PokemonCard
        name="Squirtle"
         image={require("../assets/images/squirtle.png")}
        type="water"
        hp={100}
        moves={["Tackle", "Water Gun"]}
        weaknesses={["Electric", "Grass "]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 32,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },
  hp: {
    fontSize: 22,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 4,
  },
  typeEmoji: {
    fontSize: 30,
    marginRight: 12,
  },
  typeText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  movesContainer: {
    marginBottom: 12,
  },
  movesText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  weaknessContainer: {
    marginBottom: 8,
  },
  weaknessText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
