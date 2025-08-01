import React, { JSX } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ImageSourcePropType,
  ScrollView,
} from "react-native";

// 🔧 Type definition for known Pokémon types
type PokemonType = "electric" | "water" | "fire" | "grass" | string;

// 🔧 Props for the PokemonCard component
interface PokemonCardProps {
  name: string;
  image: ImageSourcePropType;
  type?: PokemonType;
  hp: number;
  moves?: string[];
  weaknesses?: string[];
}

// 🔧 Safe type-based styling
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

// ✅ Main PokemonCard component
export default function PokemonCard({
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

      {/* ✅ Using local image passed in props */}
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

// ✅ Example usage of the component with a local image
export function App(): JSX.Element {
  return (
    <ScrollView>
      <PokemonCard
        name="Pikachu"
        image={require("./assets/pikachu.png")} // ✅ This is how you import the image
        type="electric"
        hp={100}
        moves={["Thunderbolt", "Quick Attack"]}
        weaknesses={["Ground"]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
