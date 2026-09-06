import { View, Text, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const suggestions = ['Size guide', 'Track order', 'Exchange policy', 'Style advice'];

export default function ChatScreen() {
  const { width } = useWindowDimensions();
  const horizontalPadding = Math.max(12, Math.min(20, width * 0.04));
  const isLargeScreen = width > 768;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1a1a1a" />
        </Pressable>
        <View style={styles.headerCenter}>
          <View style={[styles.avatar, { width: isLargeScreen ? 40 : 34, height: isLargeScreen ? 40 : 34, borderRadius: isLargeScreen ? 20 : 17 }]}>
            <Ionicons name="chatbubble-ellipses" size={isLargeScreen ? 20 : 16} color="#fff" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { fontSize: isLargeScreen ? 18 : 15 }]}>Olakh Assistant</Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.messagesScroll}
          contentContainerStyle={[styles.messages, { paddingHorizontal: horizontalPadding }]}
          showsVerticalScrollIndicator={false}
        >
          {/* AI message with avatar */}
          <View style={styles.messageRow}>
            <View style={[styles.aiAvatar, { width: isLargeScreen ? 40 : 32, height: isLargeScreen ? 40 : 32, borderRadius: isLargeScreen ? 20 : 16 }]}>
              <Ionicons name="chatbubble-ellipses" size={isLargeScreen ? 22 : 18} color="#fff" />
            </View>
            <View style={styles.bubbleGroup}>
              <View style={[styles.bubble, { maxWidth: isLargeScreen ? '80%' : '85%' }]}>
                <Text style={[styles.bubbleText, { fontSize: isLargeScreen ? 16 : 14 }]}>
                  Hi! Welcome to Olakh. I can help with sizing, recommendations, and orders.
                </Text>
              </View>
              <Text style={styles.timeText}>Just now</Text>
            </View>
          </View>

          {/* Suggestions */}
          <View style={styles.suggestionsSection}>
            <Text style={styles.suggestionsLabel}>Quick questions</Text>
            <View style={styles.suggestionsRow}>
              {suggestions.map((s) => (
                <Pressable key={s} style={styles.suggestion} onPress={() => {}}>
                  <Text style={[styles.suggestionText, { fontSize: isLargeScreen ? 14 : 12 }]}>{s}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Input bar */}
        <View style={[styles.inputBar, { paddingHorizontal: horizontalPadding }]}>
          <Pressable style={styles.input}>
            <Ionicons name="chatbubble-outline" size={20} color="#999" style={styles.inputIcon} />
            <Text style={styles.inputPlaceholder}>Type a message...</Text>
          </Pressable>
          <Pressable style={styles.attachBtn}>
            <Ionicons name="attach-outline" size={20} color="#999" />
          </Pressable>
          <Pressable style={[styles.sendBtn, { width: isLargeScreen ? 46 : 40, height: isLargeScreen ? 46 : 40, borderRadius: isLargeScreen ? 23 : 20 }]}>
            <Ionicons name="send" size={isLargeScreen ? 24 : 20} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: { padding: 4, marginRight: 4 },
  headerCenter: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  avatar: {
    backgroundColor: '#C49A6C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerText: { justifyContent: 'center' },
  headerTitle: { fontWeight: '700', color: '#1a1a1a' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#2ecc71' },
  onlineText: { fontSize: 11, color: '#2ecc71', fontWeight: '600' },
  placeholder: { width: 32 },
  keyboardView: { flex: 1 },
  messagesScroll: { flex: 1 },
  messages: { paddingBottom: 8 },
  messageRow: { flexDirection: 'row', marginBottom: 16 },
  aiAvatar: {
    backgroundColor: '#C49A6C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  bubbleGroup: { flex: 1, alignItems: 'flex-start' },
  bubble: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleText: { color: '#1a1a1a', lineHeight: 20 },
  timeText: { fontSize: 10, color: '#bbb', marginTop: 4, marginLeft: 2 },
  suggestionsSection: { marginBottom: 8 },
  suggestionsLabel: { fontSize: 11, fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },
  suggestionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  suggestion: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  suggestionText: { color: '#666', fontWeight: '500' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  inputIcon: { marginRight: 4 },
  inputPlaceholder: { color: '#999', fontSize: 14, flex: 1 },
  attachBtn: { padding: 8, marginRight: 4 },
  sendBtn: {
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
});
