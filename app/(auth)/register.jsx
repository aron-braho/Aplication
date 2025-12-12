import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { account } from "../../lib/appwrite.js";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onRegister = async () => {
    if (!email || !password || !name) {
      Alert.alert("Missing info", "Please fill in all fields.");
      return;
    }

    try {
      // Create user
      await account.create("unique()", email, password, name);

      // Auto-login
      await account.createEmailPasswordSession(email, password);

      // Redirect to home
      router.replace("/");

    } catch (err) {
      Alert.alert("Error", err?.message || "Something went wrong.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Link href="/login" style={styles.link}>
        Already have an account? <Text style={styles.linkHighlight}>Login</Text>
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#F7F9FC",
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
    color: "#2C3E50",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: "#4B7BE5",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "rgba(75, 123, 229, 0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    color: "#7F8C8D",
  },
  linkHighlight: {
    color: "#4B7BE5",
    fontWeight: "600",
  },
});
