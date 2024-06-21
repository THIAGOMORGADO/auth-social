
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Text, View, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Link from "expo-linking"

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const googleOAuth = useOAuth({strategy: "oauth_google" });

  async function onGoogleSignIn() {
    try {
      setIsLoading(true);

      const redirectURL = Link.createURL("/")
      const oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl: redirectURL});

      if(oAuthFlow.authSessionResult?.type === "success") {
        if(oAuthFlow.setActive) {
          await oAuthFlow.setActive({session: oAuthFlow.createdSessionId})
        }
      } else {
        setIsLoading(false);
      }

    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  }

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, [])

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <Button 
        icon="logo-google" 
        title="Entra com conta Google"
        onPress={onGoogleSignIn}
        isLoading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    padding: 32,
    gap: 12,
    
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    
  }
})