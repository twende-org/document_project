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
    marginBottom: 10,
    lineHeight: 1.4,
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
    marginBottom: 2,
    lineHeight: 1.4,
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
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 40
  },
  columnItem: {
    width: '48%',
    marginBottom: 20
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

const EventProgramPDFTemplate = ({ data, settings }: { data: EventData, settings?: any }) => {
  const { 
    eventTitle = "Event Program",
    date = "TBA",
    venue = "TBA",
    items = []
  } = data;

  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const isCompact = settings?.layout === 'compact';
  const isModern = settings?.layout === 'modern';
  const isElegant = settings?.layout === 'elegant';

  return (
    <Document>
      <Page size="A4" style={[styles.page, isCompact ? { padding: 40 } : {}]}>
        <View style={[
          styles.header, 
          isCompact ? { marginBottom: 20 } : {},
          isModern ? { borderBottomWidth: 3, borderBottomColor: primaryColor, paddingBottom: 20, textAlign: 'left' } : {},
          isElegant ? { borderStyle: 'solid', borderTopWidth: 2, borderBottomWidth: 2, borderColor: primaryColor, padding: 30, marginBottom: 60 } : {}
        ]}>
          <Text style={[
            styles.title, 
            { color: primaryColor }, 
            isCompact ? { fontSize: 20 } : {}, 
            isModern ? { fontSize: 32 } : {},
            isElegant ? { fontSize: 36, letterSpacing: 8 } : {}
          ]}>{eventTitle}</Text>
          <View style={[
            styles.subHeader, 
            isModern ? { justifyContent: 'flex-start' } : {},
            isElegant ? { borderTopWidth: 1, borderTopColor: primaryColor + '20', marginTop: 15, paddingTop: 10 } : {}
          ]}>
            <Text style={[styles.subHeaderItem, isModern ? { fontWeight: 'bold', color: '#333' } : {}]}>{date}</Text>
            <Text style={{ color: primaryColor }}>|</Text>
            <Text style={[styles.subHeaderItem, isModern ? { fontWeight: 'bold', color: '#333' } : {}]}>{venue}</Text>
          </View>
        </View>

        <View style={[
          isModern ? { marginTop: 30, borderLeftWidth: 1, borderLeftColor: '#eee' } : {}, 
          isCompact ? styles.itemsContainer : { marginTop: 40, flexDirection: 'column' },
          isElegant ? { marginTop: 0, alignItems: 'center' } : {}
        ]}>

          {items.map((item, idx) => (
            <View key={idx} style={[
              styles.itemRow, 
              isModern ? { marginBottom: 25, borderLeftWidth: 4, borderLeftColor: primaryColor, paddingLeft: 25 } : { marginBottom: 30 }, 
              isCompact ? styles.columnItem : {},
              isElegant ? { borderLeftWidth: 0, paddingLeft: 0, alignItems: 'center', marginBottom: 40 } : {}
            ]}>
              {(!isElegant) && <View style={[styles.dot, { backgroundColor: primaryColor }, isModern ? { left: -6, width: 10, height: 10 } : {}]} />}
              <Text style={[
                styles.time, 
                { color: primaryColor }, 
                isCompact ? { fontSize: 9, width: 50 } : {},
                isModern ? { fontSize: 14, width: 100 } : {},
                isElegant ? { width: 'auto', textAlign: 'center', marginBottom: 5 } : {}
              ]}>
                {item.time || "--:--"}
              </Text>
              <View style={[styles.activity, isElegant ? { alignItems: 'center' } : {}]}>
                <Text style={[
                  styles.activityTitle, 
                  isCompact ? { fontSize: 9, lineHeight: 1.2 } : {}, 
                  isModern ? { fontSize: 16 } : {},
                  isElegant ? { fontSize: 18, letterSpacing: 2 } : {}
                ]}>{item.activity || "Activity"}</Text>
                <Text style={{ fontSize: isCompact ? 6 : 9, color: "#9CA3AF" }}>Official Program Item</Text>

                {isElegant && <View style={{ width: 40, height: 1, backgroundColor: primaryColor + '40', marginTop: 15 }} />}
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
