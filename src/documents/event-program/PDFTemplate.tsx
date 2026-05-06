import React from 'react';
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { t } from "../../utils/pdfI18n";

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 9,
    color: "#1F2937",
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "#B91C1C",
    marginBottom: 5,
    lineHeight: 1.2,
  },
  subHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    fontSize: 8,
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
    width: 60,
    fontWeight: "bold",
    color: "#B91C1C",
    fontSize: 10
  },
  activity: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 1,
    lineHeight: 1.2,
  },
  dateHeader: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#F3F4F6',
    marginVertical: 20,
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#9CA3AF'
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
  },
  // Elegant Specific Styles
  elegantPage: {
    padding: 50,
    fontFamily: "Times-Roman",
    backgroundColor: "#FFFFFF",
  },
  elegantBorder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderWidth: 1.5,
    borderColor: '#D4AF37',
    borderStyle: 'solid',
  },
  elegantBorderInner: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderWidth: 0.5,
    borderColor: '#D4AF37',
    borderStyle: 'solid',
  },
  elegantTitle: {
    fontFamily: "Times-Bold",
    fontSize: 16,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  elegantSubHeader: {
    fontFamily: 'Times-Roman',
    fontSize: 9,
    letterSpacing: 3,
    color: '#666',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  elegantDivider: {
    width: 60,
    height: 1,
    backgroundColor: '#D4AF37',
    marginVertical: 15,
    alignSelf: 'center',
  },
  elegantTime: {
    fontFamily: 'Times-Italic',
    fontSize: 10,
    color: '#D4AF37',
    marginBottom: 5,
    textAlign: 'center',
  },
  elegantActivity: {
    fontFamily: 'Times-Bold',
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#111',
    width: '100%',
  },
  elegantOrnament: {
    fontSize: 10,
    color: '#D4AF37',
    textAlign: 'center',
    marginVertical: 8,
  }
});


interface EventItem {
  time: string;
  endTime?: string;
  date?: string;
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

  const lang = settings?.lang || 'en';

  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const isCompact = settings?.layout === 'compact';
  const isModern = settings?.layout === 'modern';
  const isElegant = settings?.layout === 'elegant';

  return (
    <Document>
      <Page size="A4" style={[styles.page, isCompact ? { padding: 40 } : {}, isElegant ? styles.elegantPage : {}]}>
        {isElegant && (
          <View style={[styles.elegantBorder, { borderColor: primaryColor }]}>
            <View style={[styles.elegantBorderInner, { borderColor: primaryColor }]} />
          </View>
        )}

        <View style={[
          styles.header, 
          isCompact ? { marginBottom: 20 } : {},
          isModern ? { borderBottomWidth: 3, borderBottomColor: primaryColor, paddingBottom: 20, textAlign: 'left' } : {},
          isElegant ? { marginBottom: 30, marginTop: 10 } : {}
        ]}>
          <Text style={[
            styles.title, 
            { color: isElegant ? "#111" : primaryColor }, 
            isCompact ? { fontSize: 16 } : {}, 
            isModern ? { fontSize: 24 } : {},
            isElegant ? styles.elegantTitle : {}
          ]}>{eventTitle || t('catalog.event_program_title', lang)}</Text>
          
          {isElegant && <View style={[styles.elegantDivider, { backgroundColor: primaryColor }]} />}

          <View style={[
            styles.subHeader, 
            isModern ? { justifyContent: 'flex-start' } : {},
            isElegant ? styles.elegantSubHeader : {}
          ]}>
            <Text style={[styles.subHeaderItem, isModern ? { fontWeight: 'bold', color: '#333' } : {}, isElegant ? { color: '#666' } : {}]}>{t('event.event_date', lang)}: {date}</Text>
            <Text style={{ color: isElegant ? primaryColor : primaryColor }}>{isElegant ? " \u2022 " : "|"}</Text>
            <Text style={[styles.subHeaderItem, isModern ? { fontWeight: 'bold', color: '#333' } : {}, isElegant ? { color: '#666' } : {}]}>{t('event.venue', lang)}: {venue}</Text>
          </View>
        </View>

        <View style={[
          isModern ? { marginTop: 30, borderLeftWidth: 1, borderLeftColor: '#eee' } : {}, 
          isCompact ? styles.itemsContainer : { marginTop: 40, flexDirection: 'column' },
          isElegant ? { marginTop: 0, alignItems: 'center', width: '100%' } : {}
        ]}>

          {items.map((item, idx) => {
            const showDateHeader = item.date && item.date !== date && (idx === 0 || item.date !== items[idx-1].date);
            
            return (
              <React.Fragment key={idx}>
                {showDateHeader && (
                  <View style={[styles.dateHeader, isElegant ? { borderColor: primaryColor + '40', color: primaryColor } : {}]}>
                    <Text>{item.date}</Text>
                  </View>
                )}
                
                <View style={[
                  styles.itemRow, 
                  isModern ? { marginBottom: 15, borderLeftWidth: 4, borderLeftColor: primaryColor, paddingLeft: 25 } : { marginBottom: 15 }, 
                  isCompact ? styles.columnItem : {},
                  isElegant ? { borderLeftWidth: 0, paddingLeft: 0, alignItems: 'center', marginBottom: 12, width: '100%' } : {}
                ]}>
                  {(!isElegant) && <View style={[styles.dot, { backgroundColor: primaryColor }, isModern ? { left: -6, width: 10, height: 10 } : {}]} />}
                  
                  <Text style={[
                    styles.time, 
                    { color: isElegant ? primaryColor : primaryColor }, 
                    isCompact ? { fontSize: 8, width: 60 } : {},
                    isModern ? { fontSize: 12, width: 100 } : {},
                    isElegant ? styles.elegantTime : {}
                  ]}>
                    {item.time || "--:--"} {item.endTime ? `- ${item.endTime}` : ''}
                  </Text>
                  
                  <View style={[styles.activity, isElegant ? { alignItems: 'center' } : {}]}>
                    <Text style={[
                      styles.activityTitle, 
                      isCompact ? { fontSize: 8, lineHeight: 1.1 } : {}, 
                      isModern ? { fontSize: 13 } : {},
                      isElegant ? styles.elegantActivity : {}
                    ]}>{item.activity || "Activity"}</Text>
                    
                    {(!isElegant) && (
                      <Text style={{ fontSize: isCompact ? 6 : 9, color: "#9CA3AF", textTransform: 'uppercase', letterSpacing: 1 }}>{t('event.sequence_service', lang)}</Text>
                    )}

                    {isElegant && idx < items.length - 1 && (
                      <Text style={styles.elegantOrnament}>~</Text>
                    )}
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>


        <Text style={[styles.footer, isElegant ? { color: '#999', fontFamily: 'Times-Roman' } : {}]}>Twende Documents • Event Orchestration Module</Text>
      </Page>
    </Document>
  );
};

export default EventProgramPDFTemplate;
