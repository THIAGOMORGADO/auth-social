import { Button } from "@/components/button";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const {user} = useUser();
  const {signOut} = useAuth()
  return(
    <View style={styles.container}>
        <Image source={{uri: user?.imageUrl}} style={styles.avatar}/>
      <Text style={styles.text}>Ola, {user?.fullName}</Text>
    
      <Button icon="exit" title="Sair" onPress={() => signOut()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    
  }
})