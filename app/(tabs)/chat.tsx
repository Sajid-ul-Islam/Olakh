import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Olakh Assistant</Text>
        <View style={styles.onlineIndicator} />
      </View>

      <ScrollView contentContainerStyle={styles.messages}>
        <View style={styles.bubbleAi}>
          <Text style={styles.bubbleAiText}>
            Hi! Welcome to Olakh. I can help with sizing, recommendations, and orders.
          </Text>
        </View>

        <View style={styles.suggestions}>
          {['Size guide', 'Track order', 'Exchange policy', 'Style advice'].map((s) => (
            <Pressable key={s} style={styles.suggestion}>
              <Text style={styles.suggestionText}>{s}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputRow}>
        <Pressable style={styles.input}>
          <Text style={styles.inputPlaceholder}>Type a message...</Text>
        </Pressable>
        <Pressable style={styles.send}>
          <Ionicons name="send" size={20} color="#fff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, gap: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  onlineIndicator: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2ecc71' },
  messages: { padding: 20, gap: 12 },
  bubbleAi: { backgroundColor: '#fff', padding: 14, borderRadius: 18, borderBottomLeftRadius: 4, maxWidth: '85%' },
  bubbleAiText: { fontSize: 14, color: '#1a1a1a', lineHeight: 20 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  suggestion: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#eee' },
  suggestionText: { fontSize: 13, color: '#666' },
  inputRow: { flexDirection: 'row', padding: 12, gap: 10, borderTopWidth: 1, borderTopColor: '#eee', backgroundColor: '#fff' },
  input: { flex: 1, backgroundColor: '#f5f5f5', borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10, justifyContent: 'center' },
  inputPlaceholder: { color: '#999', fontSize: 14 },
  send: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#1a1a1a', alignItems: 'center', justifyContent: 'center' },
});
