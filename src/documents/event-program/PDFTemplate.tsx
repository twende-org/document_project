import React from 'react';
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 11,
    color: "#1F2937",
    fontFamily: "Helvetica",
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 40,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#B91C1C",
    marginBottom: 10
  },
  subHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    fontSize: 10,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 5
  },
  subHeaderItem: {
    marginHorizontal: 8
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 20,
    borderLeftWidth: 2,
    borderLeftStyle: 'solid',
    borderLeftColor: "#F3F4F6",
    paddingLeft: 20,
    position: "relative"
  },
  dot: {
    position: "absolute",
    left: -5,
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B91C1C"
  },
  time: {
    width: 80,
    fontWeight: "bold",
    color: "#B91C1C",
    fontSize: 12
  },
  activity: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 60,
    right: 60,
    textAlign: "center",
    color: "#E5E7EB",
    fontSize: 8,
    textTransform: "uppercase",
    letterSpacing: 4,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: "#F3F4F6",
    paddingTop: 10
  }
});

interface EventItem {
  time: string;
  activity: string;
}

interface EventData {
  eventTitle: string;
  date: string;
  venue: string;
  items: EventItem[];
}

const EventProgramPDFTemplate = ({ data }: { data: EventData }) => {
  const { 
    eventTitle = "Event Program",
    date = "TBA",
    venue = "TBA",
    items = []
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{eventTitle}</Text>
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderItem}>{date}</Text>
            <Text style={{ color: "#B91C1C" }}>|</Text>
            <Text style={styles.subHeaderItem}>{venue}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <View style={styles.dot} />
              <Text style={styles.time}>{item.time || "--:--"}</Text>
              <View style={styles.activity}>
                <Text style={styles.activityTitle}>{item.activity || "Activity"}</Text>
                <Text style={{ fontSize: 9, color: "#9CA3AF" }}>Official Program Item</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>Twende Documents • Event Orchestration Module</Text>
      </Page>
    </Document>
  );
};

export default EventProgramPDFTemplate;
