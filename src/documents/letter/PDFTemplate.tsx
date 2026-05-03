import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { t } from "../../utils/pdfI18n";

// Standard PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 11,
    lineHeight: 1.6,
    fontFamily: 'Helvetica',
    color: '#1a1a1a',
  },
  header: {
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#eeeeee',
    paddingBottom: 20,
  },
  senderName: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  recipientSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 9,
    color: '#666666',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  recipientName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    marginTop: 10,
    fontSize: 10,
    color: '#444444',
  },
  subject: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginVertical: 20,
    textDecoration: 'underline',
  },
  body: {
    textAlign: 'justify',
  },
  closing: {
    marginTop: 50,
  },
  signature: {
    marginTop: 40,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#000000',
    width: 200,
    paddingTop: 5,
  }
});

interface LetterData {
  sender_name: string;
  recipient_name: string;
  recipient_address: string;
  date: string;
  subject: string;
  body: string;
}

const LetterPDFTemplate = ({ data, settings }: { data: LetterData, settings?: any }) => {
  const primaryColor = settings?.theme?.primaryColor || "#B91C1C";
  const lang = settings?.lang || 'en';
  const isCompact = settings?.layout === 'compact';
  const isModern = settings?.layout === 'modern';
  const isElegant = settings?.layout === 'elegant';

  return (
    <Document>
      <Page size="A4" style={[styles.page, isCompact ? { padding: 40 } : {}]}>
        {/* Header / Sender */}
        <View style={[
          styles.header, 
          { borderBottomColor: primaryColor + '40' }, 
          isCompact ? { marginBottom: 20 } : {},
          isModern ? { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderBottomColor: primaryColor } : {},
          isElegant ? { alignItems: 'center', borderBottomWidth: 0, marginBottom: 60 } : {}
        ]}>
          <View style={isElegant ? { alignItems: 'center' } : {}}>
            <Text style={[
              styles.senderName, 
              { color: primaryColor },
              isElegant ? { fontSize: 24, letterSpacing: 4 } : {}
            ]}>{data.sender_name || 'Sender Name'}</Text>
            {(isModern || isElegant) && <Text style={{ fontSize: 9, color: '#666', letterSpacing: 2 }}>{t('letter.official_correspondence', lang)}</Text>}
          </View>
          {!isElegant && <Text style={[styles.date, isModern ? { marginTop: 0, alignSelf: 'flex-end' } : {}]}>{data.date || new Date().toLocaleDateString()}</Text>}
        </View>

        {/* Recipient & Date */}
        <View style={[
          styles.recipientSection, 
          isCompact ? { marginBottom: 15 } : {},
          isModern ? { backgroundColor: '#F9FAFB', padding: 10, borderRadius: 4 } : {},
          isElegant ? { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 } : {}
        ]}>
          <View>
            <Text style={styles.label}>{t('letter.recipient_name', lang)}:</Text>
            <Text style={[styles.recipientName, isCompact ? { fontSize: 10 } : {}]}>{data.recipient_name || 'Recipient Name'}</Text>
            <Text style={{ fontSize: isCompact ? 8 : 10 }}>{data.recipient_address || 'Recipient Address'}</Text>
          </View>
          {isElegant && <Text style={[styles.date, { marginTop: 0 }]}>{data.date || new Date().toLocaleDateString()}</Text>}
        </View>

        {/* Subject */}
        <View style={[
          isModern ? { marginVertical: 25, paddingLeft: 10, borderLeftWidth: 3, borderLeftColor: primaryColor } : {}
        ]}>
          <Text style={[
            styles.subject, 
            { borderBottomColor: primaryColor, borderBottomWidth: 1, textDecoration: 'none' }, 
            isCompact ? { marginVertical: 10, fontSize: 10 } : {},
            isModern ? { borderBottomWidth: 0, marginVertical: 0 } : {}
          ]}>
            {t('letter.letter_subject', lang)}: {data.subject || t('letter.official_correspondence', lang)}
          </Text>
        </View>

        {/* Body */}
        <Text style={[styles.body, isModern ? { lineHeight: 1.8, fontSize: 11 } : {}, isCompact ? { fontSize: 9 } : {}]}>
          {data.body || 'Letter content goes here...'}
        </Text>

        {/* Closing */}
        <View style={[styles.closing, isCompact ? { marginTop: 25 } : {}]}>
          <Text style={isCompact ? { fontSize: 9 } : {}}>{t('letter.sincerely', lang)}</Text>
          <View style={[
            styles.signature, 
            { borderTopColor: primaryColor }, 
            isCompact ? { marginTop: 20, width: 150 } : {},
            isModern ? { borderTopWidth: 2, width: 180 } : {}
          ]}>
            <Text style={{ fontWeight: 'bold', fontSize: isCompact ? 9 : 11 }}>{data.sender_name}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default LetterPDFTemplate;
