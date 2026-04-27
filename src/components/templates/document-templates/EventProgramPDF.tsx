import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/roboto/Roboto-Regular.ttf" },
    { src: "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/roboto/Roboto-Bold.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.6,
    color: "#111827",
    textAlign: "center",
  },
  header: {
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#B91C1C",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#B91C1C",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 5,
    fontWeight: "bold",
  },
  scheduleSection: {
    marginTop: 20,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  scheduleItem: {
    flexDirection: "row",
    marginBottom: 15,
    paddingLeft: 20,
    borderLeftWidth: 2,
    borderLeftColor: "#FEE2E2",
    textAlign: "left",
  },
  dot: {
    position: "absolute",
    left: -5,
    top: 5,
    width: 8,
    height: 8,
    backgroundColor: "#B91C1C",
    borderRadius: 4,
  },
  time: {
    width: 60,
    fontWeight: "bold",
    color: "#B91C1C",
  },
  activity: {
    flex: 1,
    paddingLeft: 10,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 60,
    right: 60,
    textAlign: "center",
    fontSize: 8,
    color: "#9CA3AF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 10,
  }
});

interface EventProgramPDFProps {
  data: {
    eventTitle: string;
    date: string;
    venue: string;
    items: Array<{
      time: string;
      activity: string;
    }>;
  };
}

const EventProgramPDF: React.FC<EventProgramPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.eventTitle || "EVENT PROGRAM"}</Text>
          <Text style={styles.subtitle}>{data.date} | {data.venue}</Text>
        </View>

        <View style={styles.scheduleSection}>
          {data.items.map((item, idx) => (
            <View key={idx} style={styles.scheduleItem}>
              <View style={styles.dot} />
              <Text style={styles.time}>{item.time || "00:00"}</Text>
              <Text style={styles.activity}>{item.activity || "Activity details"}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Thank you for joining us. For more information, visit our website.
        </Text>
      </Page>
    </Document>
  );
};

export default EventProgramPDF;
