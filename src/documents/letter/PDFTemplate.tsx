import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

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

const LetterPDFTemplate = ({ data }: { data: LetterData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header / Sender */}
      <View style={styles.header}>
        <Text style={styles.senderName}>{data.sender_name || 'Sender Name'}</Text>
        <Text style={styles.date}>{data.date || new Date().toLocaleDateString()}</Text>
      </View>

      {/* Recipient */}
      <View style={styles.recipientSection}>
        <Text style={styles.label}>To:</Text>
        <Text style={styles.recipientName}>{data.recipient_name || 'Recipient Name'}</Text>
        <Text style={{ fontSize: 10 }}>{data.recipient_address || 'Recipient Address'}</Text>
      </View>

      {/* Subject */}
      <Text style={styles.subject}>RE: {data.subject || 'Official Correspondence'}</Text>

      {/* Body */}
      <Text style={styles.body}>
        {data.body || 'Letter content goes here...'}
      </Text>

      {/* Closing */}
      <View style={styles.closing}>
        <Text>Sincerely,</Text>
        <View style={styles.signature}>
          <Text style={{ fontWeight: 'bold' }}>{data.sender_name}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default LetterPDFTemplate;
